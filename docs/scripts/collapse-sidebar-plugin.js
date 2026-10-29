(function () {
  const CONFIG = {
    sidebarGroups: {},
    sidebarTitles: {},
    pagesWithOpenSidebarGroups: [],
  };

  function isExpanded(li) {
    if (li.classList.contains('closed')) return false;
    if (li.classList.contains('soft-open')) {
      const isActive = li.classList.contains('active') || li.querySelector('.active');
      return !!isActive;
    }
    if (li.classList.contains('open')) return true;

    return false;
  }

  function handleSidebarClickForMobile(event) {
    if (window.innerWidth > 600) return;
    if (!(event.target instanceof Element)) return;

    // Collapse/expand buttons: keep sidebar open
    if (event.target.closest('.sidebar-toggle-children, .page-toggle')) {
      event.stopPropagation();
      return;
    }

    // Main page links: navigate without closing sidebar
    if (event.target.closest('.sidebar-nav > ul > li > a')) {
      event.stopPropagation();

      const currentPageNavItem = event.target.closest('.sidebar-nav > ul > li');
      currentPageNavItem.classList.toggle('collapse');

      // route chnage
      if (!event.target.closest('.sidebar-nav > ul > li:has(.app-sub-sidebar) > a')) {
        window.scrollTo(0, 0);
      }
      return;
    }

    // Prevent closing sidebar click when it's not a link
    if (event.target.closest('.sidebar-nav') && !event.target.closest('.sidebar-nav a')) {
      event.stopPropagation();
      return;
    }
  }

  const install = function (hook, vm) {
    const opts = vm.config.collapseSidebar || CONFIG;
    CONFIG.sidebarGroups = opts.sidebarGroups || CONFIG.sidebarGroups;
    CONFIG.sidebarTitles = opts.sidebarTitles || CONFIG.sidebarTitles;
    CONFIG.pagesWithOpenSidebarGroups = opts.pagesWithOpenSidebarGroups || CONFIG.pagesWithOpenSidebarGroups;

    hook.doneEach(function () {
      const root = document.querySelector('.sidebar-nav > ul');
      if (!root) return;

      // Docsify adds heading navigation to the current page's list item.
      const nav = root.querySelector(':scope > li > ul.app-sub-sidebar');
      if (!nav || nav.dataset.enhanced) return;

      nav.dataset.enhanced = 'true';

      const renderOpen = CONFIG.pagesWithOpenSidebarGroups.includes(vm.route.path);
      // Move H3 lists inside their preceding H2 <li>
      Array.from(nav.children).forEach((li) => {
        const children = li.nextElementSibling;

        if (li.tagName !== 'LI' || !children || children.tagName !== 'UL') {
          return;
        }

        li.classList.add('has-children');
        li.appendChild(children);

        const toggle = document.createElement('button');
        toggle.type = 'button';
        toggle.className = 'sidebar-toggle-children';
        toggle.setAttribute('aria-label', 'Toggle ' + li.querySelector(':scope > a').textContent);

        if (renderOpen) {
          li.classList.add('open');
          li.classList.remove('closed');
          toggle.setAttribute('aria-expanded', 'true');
        }

        toggle.addEventListener('click', function (event) {
          event.preventDefault();
          event.stopPropagation();

          const expanded = isExpanded(li);

          li.classList.remove('soft-open');
          li.classList.toggle('open', !expanded);
          li.classList.toggle('closed', expanded);
          toggle.setAttribute('aria-expanded', String(!expanded));
        });

        li.insertBefore(toggle, children);

        // create wrapper for animating submenus
        const wrapper = document.createElement('div');
        wrapper.className = 'sidebar-submenu';

        const inner = document.createElement('div');
        inner.className = 'sidebar-submenu-inner';

        li.insertBefore(wrapper, children);
        wrapper.appendChild(inner);
        inner.appendChild(children);

        // Soft open when clicking link
        li.querySelector(':scope > a').addEventListener('click', function (event) {
          const shouldClose = li.classList.contains('active') && isExpanded(li);

          // Clear existing soft opens
          document.querySelectorAll('.sidebar .soft-open').forEach((el) => el.classList.remove('soft-open'));

          li.classList.toggle('soft-open', !shouldClose);
          li.classList.remove('open');
          li.classList.remove('closed');
        });
      });

      // Insert group labels before selected H2 headings
      (CONFIG.sidebarGroups[vm.route.path] || []).forEach(function (group) {
        const link = Array.from(nav.querySelectorAll(':scope > li > a')).find((a) =>
          a.getAttribute('href')?.endsWith('?id=' + group.start),
        );

        if (!link) return;

        const label = document.createElement('li');
        label.className = 'sidebar-group-label';
        label.textContent = group.label;

        nav.insertBefore(label, link.parentNode);
      });

      // Render side bar title
      const sidebarTitle = CONFIG.sidebarTitles[vm.route.path];
      if (sidebarTitle) {
        const li = nav.querySelector(':scope > li');

        if (!li) return;

        const label = document.createElement('li');
        label.className = 'sidebar-group-label sidebar-title';
        label.textContent = sidebarTitle;

        nav.insertBefore(label, li);
      }

      // Create sidebar page navigation toggle
      const currentPageNavItem = document.querySelector('.sidebar-nav > ul > li:has(.app-sub-sidebar)');
      if (!currentPageNavItem) return;

      const subnav = currentPageNavItem.querySelector(':scope > ul.app-sub-sidebar');
      if (!subnav || currentPageNavItem.querySelector(':scope > .page-toggle')) return;

      const link = currentPageNavItem.querySelector(':scope > a');
      if (!link) return;

      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'page-toggle';
      button.setAttribute('aria-label', 'Toggle ' + link.textContent);
      button.setAttribute('aria-expanded', 'true');

      button.addEventListener('click', function (event) {
        event.preventDefault();
        event.stopPropagation();

        const collapsed = currentPageNavItem.classList.toggle('collapse');
        button.setAttribute('aria-expanded', String(!collapsed));
      });

      currentPageNavItem.insertBefore(button, subnav);

      const wrapper = document.createElement('div');
      wrapper.className = 'sidebar-page-submenu';

      const inner = document.createElement('div');
      inner.className = 'sidebar-page-submenu-inner';

      currentPageNavItem.appendChild(wrapper);
      wrapper.appendChild(inner);
      inner.appendChild(subnav);
    });

    hook.mounted(function () {
      const sidebar = document.querySelector('.sidebar');
      if (!sidebar) return;

      sidebar.addEventListener('click', handleSidebarClickForMobile);
    });
  };

  $docsify.plugins = [].concat(install, $docsify.plugins || []);
})();
