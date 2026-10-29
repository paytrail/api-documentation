(function () {
  const CONFIG = {
    sidebarGroups: {},
    sidebarTitles: {},
    pagesWithOpenSidebarGroups: [],
  };

  let anchorScrollFrame = null;

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

  // Fix scroll when clicking anchor link that is on URL
  //
  // When url has /#/?id=example and user scrolls away and then clicks Example from sidebar
  // default docsify behavior doesn't scroll anymore
  function handleSidebarClickForCurrentAnchorScroll(event, configTopMargin) {
    if (event.defaultPrevented) return;
    if (!(event.target instanceof Element)) return;

    // Preserve opening links in another tab/window.
    if (event.button !== 0 || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) {
      return;
    }

    const link = event.target.closest('a.section-link');
    if (!link || link.target === '_blank') return;

    const url = new URL(link.href);

    // Changed URLs are handled normally by Docsify.
    if (url.href !== window.location.href) return;

    const queryStart = url.hash.indexOf('?');
    if (queryStart === -1) return;

    const params = new URLSearchParams(url.hash.slice(queryStart + 1));
    const id = params.get('id');
    const heading = id && document.getElementById(id);
    if (!heading) return;

    event.preventDefault();
    event.stopPropagation();

    // Preserve the normal mobile behavior after selecting a section.
    if (window.innerWidth <= 600) {
      document.body.classList.remove('close');
    }

    const topMargin = Number(configTopMargin) || 0;
    const top = heading.getBoundingClientRect().top + window.scrollY - topMargin;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (anchorScrollFrame !== null) {
      cancelAnimationFrame(anchorScrollFrame);
      anchorScrollFrame = null;
    }

    const targetTop = Math.max(0, top);
    if (reduceMotion) {
      window.scrollTo({ top: targetTop, behavior: 'instant' });
      return;
    }

    const startTop = window.scrollY;
    const startTime = performance.now();
    const duration = 200;

    function animateScroll(now) {
      const progress = Math.min((now - startTime) / duration, 1);
      const easedProgress = 1 - Math.pow(1 - progress, 3);

      window.scrollTo({
        top: startTop + (targetTop - startTop) * easedProgress,
        behavior: 'instant',
      });

      anchorScrollFrame = progress < 1 ? requestAnimationFrame(animateScroll) : null;
    }

    anchorScrollFrame = requestAnimationFrame(animateScroll);
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

        const syncExpanded = () => toggle.setAttribute('aria-expanded', String(isExpanded(li)));

        if (renderOpen) {
          li.classList.add('open');
          li.classList.remove('closed');
        }
        syncExpanded();

        toggle.addEventListener('click', function (event) {
          event.preventDefault();
          event.stopPropagation();

          const expanded = isExpanded(li);

          li.classList.remove('soft-open');
          li.classList.toggle('open', !expanded);
          li.classList.toggle('closed', expanded);
          syncExpanded();
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
          syncExpanded();
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
      sidebar.addEventListener('click', function (event) {
        handleSidebarClickForCurrentAnchorScroll(event, vm.config.topMargin);
      });
    });
  };

  $docsify.plugins = [].concat(install, $docsify.plugins || []);
})();
