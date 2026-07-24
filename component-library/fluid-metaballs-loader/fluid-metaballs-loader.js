(function () {
  var balls = document.querySelectorAll('.fm-ball');
  if (!balls.length) return;
  function sync() {
    var state = document.hidden ? 'paused' : 'running';
    balls.forEach(function (n) { n.style.animationPlayState = state; });
  }
  document.addEventListener('visibilitychange', sync);
  sync();
})();
