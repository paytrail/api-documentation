(function () {
  const CONFIG = {
    appName: 'Documentation',
    logo: '',
    mainElementSelector: 'main',
  };

  const install = function (hook, vm) {
    const opts = vm.config.mobileHeader || CONFIG;
    CONFIG.appName = opts.appName || CONFIG.appName;
    CONFIG.logo = opts.logo || CONFIG.logo;
    CONFIG.mainElementSelector = opts.mainElementSelector || CONFIG.mainElementSelector;

    hook.mounted(function () {
      const el = document.createElement('div');
      el.id = 'mobile-header';

      const link = document.createElement('a');
      link.textContent = CONFIG.appName;
      link.href = '/';
      link.classList.add('mobile-app-name-link');

      if (CONFIG.logo) {
        const img = document.createElement('img');
        img.src = CONFIG.logo;
        link.prepend(img);
      }

      el.append(link);
      document.querySelector(CONFIG.mainElementSelector).prepend(el);
    });
  };

  $docsify.plugins = [].concat(install, $docsify.plugins);
})();
