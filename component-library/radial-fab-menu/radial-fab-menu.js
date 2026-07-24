(function () {
  var fab = document.querySelector('.rfab');
  if (!fab) return;
  var main = fab.querySelector('.rfab-main');
  var items = fab.querySelectorAll('.rfab-item');

  function setOpen(open) {
    fab.classList.toggle('rfab--open', open);
    main.setAttribute('aria-expanded', String(open));
    items.forEach(function (it) { it.setAttribute('tabindex', open ? '0' : '-1'); });
  }
  main.addEventListener('click', function (e) {
    e.stopPropagation();
    setOpen(!fab.classList.contains('rfab--open'));
  });
  document.addEventListener('click', function (e) {
    if (!fab.contains(e.target)) setOpen(false);
  });
  fab.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') setOpen(false);
  });
})();
