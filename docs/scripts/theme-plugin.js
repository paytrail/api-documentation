(function () {
  function initSiteScripts() {
    var themeBtn = document.getElementById('theme-switcher');

    document.addEventListener('keydown', function (e) {
      const target = e.target;
      const isTyping = target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable;
      const isWithModifier = e.ctrlKey || e.metaKey || e.altKey || e.shiftKey;

      if (!isTyping && e.key === 't' && !isWithModifier) {
        toggleTheme();
      }
    });

    function toggleTheme() {
      themeBtn.classList.add('animate');

      const html = document.documentElement;
      const nextTheme = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      html.setAttribute('data-theme', nextTheme);
      localStorage.setItem('site-theme', nextTheme);

      const metaThemeColor = nextTheme === 'light' ? '#fff' : '#15151f';
      const themeColorEl = document.querySelector('meta[name="theme-color"]');
      if (themeColorEl) document.querySelector('meta[name="theme-color"]').setAttribute('content', metaThemeColor);
    }

    themeBtn.addEventListener('click', toggleTheme);
  }

  var install = function (hook, vm) {
    hook.init(initSiteScripts);
  };

  $docsify.plugins = [].concat(install, $docsify.plugins);
})();
