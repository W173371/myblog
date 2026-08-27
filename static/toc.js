(function () {
  var toc = document.getElementById("TableOfContents");
  if (!toc) return;

  var links = Array.prototype.slice.call(toc.querySelectorAll('a[href^="#"]'));
  if (!links.length) return;

  var items = links
    .map(function (a) {
      var raw = a.getAttribute("href").slice(1);
      var id = raw;
      try { id = decodeURIComponent(raw); } catch (e) { /* keep raw */ }
      var el = document.getElementById(id) || document.getElementById(raw);
      return el ? { link: a, el: el } : null;
    })
    .filter(Boolean);

  if (!items.length) return;

  var current = null;
  var ticking = false;

  function update() {
    ticking = false;
    var offset = 130;
    var found = items[0];
    for (var i = 0; i < items.length; i++) {
      if (items[i].el.getBoundingClientRect().top <= offset) found = items[i];
    }
    if (found === current) return;
    if (current) current.link.classList.remove("is-active");
    found.link.classList.add("is-active");
    current = found;

    var side = document.querySelector(".toc-side");
    if (side && side.scrollHeight > side.clientHeight) {
      var lt = found.link.offsetTop;
      if (lt < side.scrollTop || lt > side.scrollTop + side.clientHeight - 40) {
        side.scrollTop = lt - side.clientHeight / 2;
      }
    }
  }

  function onScroll() {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(update);
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);
  update();
})();
