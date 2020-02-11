; (function () {
  function computedFont() {
    var deviceW = document.documentElement.clientWidth || document.body.clientWidth;

    if (deviceW > 750) return;

    document.documentElement.style.fontSize = deviceW / 7.5 + 'px';
  }
  window.addEventListener('resize', computedFont, false);
  computedFont();
}());
