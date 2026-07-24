(function () {
  var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  var btn = document.querySelector('.sd-btn');
  if (!btn || reduce) return;

  var timer = null;
  var lit = false;
  function loop() {
    lit = !lit;
    btn.classList.toggle('is-lit', lit);
    timer = setTimeout(loop, lit ? 2200 : 1300);
  }
  function stop() { clearTimeout(timer); }
  document.addEventListener('visibilitychange', function () { document.hidden ? stop() : loop(); });
  setTimeout(loop, 600);
})();
