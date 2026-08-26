(function () {
  "use strict";

  var raw = document.getElementById("wb-data");
  var data = { articles: [], projectCategories: [] };
  try { data = JSON.parse(raw.textContent); } catch (e) { /* ignore */ }

  var articles = data.articles || [];
  var projCats = (data.projectCategories || []).map(function (s) {
    return String(s).toLowerCase();
  });

  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  function matchesProject(cats) {
    if (!cats || !cats.length) return false;
    var lc = cats.map(function (c) { return String(c).toLowerCase(); });
    return projCats.some(function (p) {
      return lc.some(function (c) { return c.indexOf(p) > -1 || p.indexOf(c) > -1; });
    });
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
        '<span class="post-summary">' + esc(a.summary) + "</span>" +
        '<span class="post-meta">' + esc(a.readingTime) + " 分钟阅读</span>";
      li.appendChild(link);
      ul.appendChild(li);
    });
  }

  var projects = articles.filter(function (a) { return matchesProject(a.categories); });

  renderList("list-articles", "empty-articles", articles);
  renderList("list-projects", "empty-projects", projects);

  var screens = Array.prototype.slice.call(document.querySelectorAll(".screen"));
  var nav = document.getElementById("deck-nav");

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
    if (t) { e.preventDefault(); go(t.getAttribute("data-go")); }
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
