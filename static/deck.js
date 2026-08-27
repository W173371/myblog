(function () {
  "use strict";

  var raw = document.getElementById("wb-data");
  var data = { articles: [], projectCategories: [] };
  try {
    var parsed = JSON.parse(raw.textContent);
    if (typeof parsed === "string") parsed = JSON.parse(parsed); // 兼容双重编码
    data = parsed;
  } catch (e) { /* ignore */ }

  var articles = data.articles || [];
  var articleCats = data.articleCategories || [];
  var currentArticleFilter = "all";
  var projCats = (data.projectCategories || []).map(function (s) {
    return String(s).toLowerCase();
  });

  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function brief(s) {
    s = String(s == null ? "" : s).replace(/\s+/g, " ").trim();
    if (s.length > 80) s = s.slice(0, 80) + "...";
    return s;
  }

  function matchesProject(cats) {
    if (!cats || !cats.length) return false;
    var lc = cats.map(function (c) { return String(c).toLowerCase(); });
    return projCats.some(function (p) {
      return lc.some(function (c) { return c.indexOf(p) > -1 || p.indexOf(c) > -1; });
    });
  }

  function renderFilterBar() {
    var bar = document.getElementById("filter-articles");
    if (!bar) return;
    var html = '<button class="filter-btn is-active" data-filter="all">全部</button>';
    articleCats.forEach(function (cat) {
      html += '<button class="filter-btn" data-filter="' + esc(cat) + '">' + esc(cat) + "</button>";
    });
    bar.innerHTML = html;
  }

  function applyArticleFilter() {
    var filtered = articles;
    if (currentArticleFilter !== "all") {
      filtered = articles.filter(function (a) {
        var cats = (a.categories || []).map(function (c) { return String(c); });
        return cats.indexOf(currentArticleFilter) > -1;
      });
    }
    renderList("list-articles", "empty-articles", filtered);
  }

  function renderList(ulId, emptyId, items) {
    var ul = document.getElementById(ulId);
    var empty = document.getElementById(emptyId);
    if (!ul) return;
    ul.innerHTML = "";
    if (!items.length) { if (empty) empty.hidden = false; return; }
    if (empty) empty.hidden = true;
    items.forEach(function (a) {
      var li = document.createElement("li");
      li.className = "post-item";
      var link = document.createElement("a");
      link.className = "post-link";
      link.href = esc(a.url);
      link.innerHTML =
        '<span class="post-date">' + esc(a.date) + "</span>" +
        '<span class="post-title">' + esc(a.title) + "</span>" +
        '<span class="post-summary">' + esc(brief(a.summary)) + "</span>" +
        '<span class="post-meta">' + esc(a.readingTime) + " 分钟阅读</span>";
      li.appendChild(link);
      ul.appendChild(li);
    });
  }

  var projects = articles.filter(function (a) { return matchesProject(a.categories); });

  renderFilterBar();
  applyArticleFilter();
  renderList("list-projects", "empty-projects", projects);

  var screens = Array.prototype.slice.call(document.querySelectorAll(".screen"));
  var nav = document.getElementById("deck-nav");

  function resetArticleFilter() {
    currentArticleFilter = "all";
    var buttons = document.querySelectorAll("#filter-articles .filter-btn");
    buttons.forEach(function (b) { b.classList.remove("is-active"); });
    var allBtn = document.querySelector('#filter-articles [data-filter="all"]');
    if (allBtn) allBtn.classList.add("is-active");
  }

  function go(name) {
    screens.forEach(function (s) {
      s.classList.toggle("is-active", s.getAttribute("data-screen") === name);
    });
    if (nav) nav.hidden = name === "home";
    var active = document.querySelector(".screen.is-active");
    if (active) active.scrollTop = 0;
  }

  document.addEventListener("click", function (e) {
    var t = e.target.closest("[data-go]");
    if (t) {
      e.preventDefault();
      var name = t.getAttribute("data-go");
      if (name === "articles") resetArticleFilter();
      go(name);
      return;
    }
    var f = e.target.closest("[data-filter]");
    if (f) {
      e.preventDefault();
      currentArticleFilter = f.getAttribute("data-filter");
      document.querySelectorAll("#filter-articles .filter-btn").forEach(function (b) {
        b.classList.toggle("is-active", b.getAttribute("data-filter") === currentArticleFilter);
      });
      applyArticleFilter();
    }
  });

  document.addEventListener("keydown", function (e) {
    var onHome = !!document.querySelector(".screen--home.is-active");
    if (onHome && (e.key === "Enter" || e.key === " " || e.key === "ArrowRight")) {
      e.preventDefault(); go("directory"); return;
    }
    if (e.key === "h" || e.key === "H") go("home");
    else if (e.key === "m" || e.key === "M") go("directory");
    else if (e.key === "Escape") go("directory");
  });

  go("home");
})();
