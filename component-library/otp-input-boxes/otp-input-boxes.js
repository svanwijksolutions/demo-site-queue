(function () {
  var row = document.getElementById('otpRow');
  if (!row) return;
  var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  var N = 4;
  var cells = [];

  for (var i = 0; i < N; i++) {
    var c = document.createElement('div');
    c.className = 'otp-cell';
    var caret = document.createElement('span');
    caret.className = 'otp-caret';
    var d = document.createElement('span');
    d.className = 'otp-digit';
    c.appendChild(caret);
    c.appendChild(d);
    row.appendChild(c);
    cells.push({ c: c, d: d });
  }

  function setActive(i) {
    cells.forEach(function (o, j) { o.c.classList.toggle('is-active', j === i); });
  }
  function fill(i) {
    var o = cells[i];
    o.d.textContent = Math.floor(Math.random() * 10);
    o.d.style.transform = 'translateY(0)';
    o.d.style.opacity = '1';
  }
  function clearAll() {
    cells.forEach(function (o) { o.d.style.transform = 'translateY(120%)'; o.d.style.opacity = '0'; });
  }

  if (reduce) {
    cells.forEach(function (o, i) { fill(i); });
    return;
  }

  var running = true, timer = 0, pos = 0, phase = 'filling';
  function frame() {
    if (!running) return;
    timer++;
    if (phase === 'filling') {
      setActive(pos);
      if (timer > 34) { timer = 0; fill(pos); pos++; if (pos >= N) { phase = 'done'; setActive(-1); } }
    } else if (phase === 'done') {
      if (timer > 60) { timer = 0; phase = 'clearing'; }
    } else {
      clearAll(); phase = 'filling'; pos = 0; timer = 0;
    }
    requestAnimationFrame(frame);
  }
  document.addEventListener('visibilitychange', function () {
    running = !document.hidden;
    if (running) requestAnimationFrame(frame);
  });
  requestAnimationFrame(frame);
})();
