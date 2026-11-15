document.addEventListener('DOMContentLoaded', async function () {
    if (window.lucide) window.lucide.createIcons();

    const isLowPerf = (
        navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4
    ) || (
        navigator.deviceMemory && navigator.deviceMemory < 4
    ) || (
        window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches
    );
    if (isLowPerf) document.body.classList.add('low-perf');

    EyeCare.init();
    UI.initCopyDelegate();
    UI.initGitHubDropdown();

    const leftSidebar  = document.getElementById('left-sidebar');
    const mainContent  = document.getElementById('markdown-content');
    const tocContainer = document.getElementById('toc-container');

    let usedIds = new Set();
    const getUsedIds = function () { return usedIds; };

    const renderer = MD.createRenderer(getUsedIds);
    marked.use({
        renderer: renderer,
        gfm: true,
        breaks: false,
        smartypants: false,
        headerIds: false,
        mangle: false,
    });

    let allPages = [];
    let pageMap = new Map();
    const PAGE_HTML_CACHE = new Map();

    function renderPage(page) {
        usedIds = new Set();

        const cachedHtml = PAGE_HTML_CACHE.get(page.title);
        if (cachedHtml !== undefined) {
            mainContent.innerHTML = cachedHtml;
            UI.renderTOC(tocContainer, mainContent, function (id, a) {
                UI.scrollToHeading(id, mainContent, tocContainer, a);
            });
            UI.setupScrollSpy(mainContent, tocContainer);
            mainContent.scrollTop = 0;
            if (window.lucide) window.lucide.createIcons();
            return;
        }

        mainContent.style.opacity = 0;
        requestAnimationFrame(function () {
            const html = marked.parse(page.rawMarkdown);
            PAGE_HTML_CACHE.set(page.title, html);

            mainContent.innerHTML = html;
            mainContent.querySelectorAll('td code, th code').forEach(function (c) { c.classList.add('inline-code'); });

            UI.renderTOC(tocContainer, mainContent, function (id, a) {
                UI.scrollToHeading(id, mainContent, tocContainer, a);
            });
            UI.setupScrollSpy(mainContent, tocContainer);

            mainContent.scrollTop = 0;
            mainContent.style.opacity = 1;

            if (window.lucide) window.lucide.createIcons();
        });
    }

    document.addEventListener('click', function (e) {
        const a = e.target.closest('.main-content a.anchor-link');
        if (!a) return;
        e.preventDefault();
        const id = decodeURIComponent(a.getAttribute('href').replace(/^#/, ''));
        if (!id) return;
        const target = mainContent.querySelector('#' + CSS.escape(id));
        if (target) {
            const top = target.getBoundingClientRect().top + mainContent.scrollTop - 80;
            mainContent.scrollTo({ top: top, behavior: 'smooth' });
        }
    });

    function goToPage(page) {
        const id = MD.generateId(page.title);
        UI.setActiveNav(leftSidebar, id);
        renderPage(page);
        history.pushState(null, null, '#' + encodeURIComponent(id));
    }

    SearchUI.init(goToPage);

    try {
        const res = await fetch('md/main.md');
        if (!res.ok) throw new Error('加载 md 失败：HTTP ' + res.status);
        const mdText = await res.text();

        allPages = MD.splitPages(mdText);
        if (allPages.length) {
            pageMap = new Map(allPages.map(function (p) { return [MD.generateId(p.title), p]; }));
            SearchUI.buildIndex(allPages);
            UI.renderNav(leftSidebar, allPages, renderPage);

            const hash = decodeURIComponent(location.hash.replace(/^#/, ''));
            const initial = pageMap.get(hash) || allPages[0];
            UI.setActiveNav(leftSidebar, MD.generateId(initial.title));
            renderPage(initial);
        }
    } catch (err) {
        mainContent.innerHTML = '<h1>加载失败</h1><p style="color:#d94a8c;">' + MD.escapeHtml(err.message) + '</p>';
    }
});