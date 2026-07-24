(function () {
  var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  var text = 'GOLVEN~'; // pas aan naar het gewenste woord (4 tot 8 tekens werkt het best)
  var host = document.getElementById('wsText');
  if (!host) return;

  var spans = [];
  for (var i = 0; i < text.length; i++) {
    var s = document.createElement('span');
    s.textContent = text[i] === ' ' ? ' ' : text[i];
    host.appendChild(s);
    spans.push(s);
  }
  if (reduce) return;

  var t = 0, raf = 0;
  var AMPLITUDE_Y = 26;
  var ROTATION_DEG = 10;
  var SPEED = 0.06;
  var PHASE_OFFSET = 0.55;

  function frame() {
    t += SPEED;
    for (var i = 0; i < spans.length; i++) {
      var ph = t - i * PHASE_OFFSET;
      var sinVal = Math.sin(ph);
      var y = sinVal * AMPLITUDE_Y;
      var rot = Math.cos(ph) * ROTATION_DEG;
      spans[i].style.transform = 'translateY(' + y.toFixed(2) + 'px) rotate(' + rot.toFixed(2) + 'deg)';
    }
    raf = requestAnimationFrame(frame);
  }

  function start() { if (!raf) raf = requestAnimationFrame(frame); }
  function stop() { cancelAnimationFrame(raf); raf = 0; }
  document.addEventListener('visibilitychange', function () { document.hidden ? stop() : start(); });
  start();
})();
