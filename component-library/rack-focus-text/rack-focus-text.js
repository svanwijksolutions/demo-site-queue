(function () {
  var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  var A = document.getElementById('rfWordA');
  var B = document.getElementById('rfWordB');
  if (!A || !B) return;

  var raf = 0;
  var t0 = 0;
  var PERIOD = 5200; // ms voor een volledige ademhaling (woord A -> B -> A)

  function ease(x) { return x * x * (3 - 2 * x); }

  var st = { A: {}, B: {} };
  function paint(el, f, key) {
    var s = st[key];
    var blur = Math.round((1 - f) * 14 * 2) / 2; // 0.5px stappen, minder repaint-kosten
    var scale = 1 + (1 - f) * 0.045;
    var bloom = 1 - f;
    if (blur !== s.blur) { el.style.filter = 'blur(' + blur.toFixed(1) + 'px)'; s.blur = blur; }
    el.style.opacity = (0.30 + f * 0.70).toFixed(3);
    el.style.transform = 'scale(' + scale.toFixed(4) + ')';
    var sh = Math.round((2 + f * 10) * 2) / 2;
    if (sh !== s.sh) { el.style.textShadow = '0 0 ' + sh.toFixed(1) + 'px rgba(255,255,255,' + (f * 0.25).toFixed(3) + ')'; s.sh = sh; }
    var bb = Math.round((4 + bloom * 30) * 2) / 2;
    if (bb !== s.bb) { el.style.setProperty('--rf-bloom-blur', bb.toFixed(1) + 'px'); s.bb = bb; }
    el.style.setProperty('--rf-bloom-opacity', (bloom * 0.85).toFixed(3));
  }

  function render(now) {
    var dt = now - t0;
    var p = (dt % PERIOD) / PERIOD;
    var tri = p < 0.5 ? p * 2 : (1 - p) * 2;
    paint(A, ease(tri), 'A');
    paint(B, ease(1 - tri), 'B');
    raf = requestAnimationFrame(render);
  }

  function start() { if (!raf && !reduce) { t0 = performance.now(); raf = requestAnimationFrame(render); } }
  function stop() { cancelAnimationFrame(raf); raf = 0; }
  document.addEventListener('visibilitychange', function () { document.hidden ? stop() : start(); });

  if (reduce) {
    paint(A, 1, 'A');
    paint(B, 0.12, 'B');
  } else {
    start();
  }
})();
