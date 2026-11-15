(function (global) {
    'use strict';

    function createRipple(event, element) {
        const rect = element.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const ripple = document.createElement('span');
        ripple.className = 'ripple';
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = (event.clientX - rect.left - size / 2) + 'px';
        ripple.style.top = (event.clientY - rect.top - size / 2) + 'px';
        element.appendChild(ripple);
        setTimeout(function () { ripple.remove(); }, 600);
    }

    let copyHandlerBound = false;
    function initCopyDelegate() {
        if (copyHandlerBound) return;
        copyHandlerBound = true;
        document.addEventListener('click', function (e) {
            const btn = e.target.closest('[data-copy]');
            if (!btn) return;
            const pre = btn.closest('pre');
            if (!pre) return;
            const codeEl = pre.querySelector('.code-content');
            if (!codeEl) return;
            const text = codeEl.textContent;
            function done() {
                const orig = btn.innerHTML;
                btn.innerHTML = '<i data-lucide="check"></i> Copied!';
                if (global.lucide) global.lucide.createIcons();
                setTimeout(function () {
                    btn.innerHTML = orig;
                    if (global.lucide) global.lucide.createIcons();
                }, 2000);
            }
            function fallback() {
                const ta = document.createElement('textarea');
                ta.value = text;
                ta.style.position = 'fixed'; ta.style.opacity = '0';
                document.body.appendChild(ta);
                ta.select();
                try { document.execCommand('copy'); done(); } catch (err) {}
                document.body.removeChild(ta);
            }
            if (navigator.clipboard && navigator.clipboard.writeText) {
                navigator.clipboard.writeText(text).then(done).catch(fallback);
            } else { fallback(); }
        });
    }

    let ghHandlerBound = false;
    function initGitHubDropdown() {
        if (ghHandlerBound) return;
        ghHandlerBound = true;
        const wrap = document.getElementById('gh-dropdown');
        const toggle = document.getElementById('gh-toggle');
        if (!wrap || !toggle) return;
        toggle.addEventListener('click', function (e) { e.stopPropagation(); wrap.classList.toggle('open'); });
        document.addEventListener('click', function (e) { if (!wrap.contains(e.target)) wrap.classList.remove('open'); });
        document.addEventListener('keydown', function (e) { if (e.key === 'Escape') wrap.classList.remove('open'); });
        wrap.querySelectorAll('.gh-item').forEach(function (item) {
            item.addEventListener('click', function () { wrap.classList.remove('open'); });
        });
    }

    function renderNav(container, pages, onSelect) {
        const frag = document.createDocumentFragment();
        const group = document.createElement('div');
        group.className = 'nav-group';
        const titleEl = document.createElement('div');
        titleEl.className = 'nav-group-title';
        titleEl.innerHTML = '<i data-lucide="chevron-down"></i> DOCUMENTATION';
        group.appendChild(titleEl);

        for (let i = 0; i < pages.length; i++) {
            const page = pages[i];
            const id = MD.generateId(page.title);
            const a = document.createElement('a');
            a.className = 'nav-item';
            a.textContent = page.title;
            a.dataset.id = id;
            a.href = '#' + encodeURIComponent(id);
            a.addEventListener('click', function (e) {
                e.preventDefault();
                createRipple(e, a);
                container.querySelectorAll('.nav-item').forEach(function (n) { n.classList.remove('active'); });
                a.classList.add('active');
                onSelect(page);
                history.pushState(null, null, a.getAttribute('href'));
            });
            group.appendChild(a);
        }
        frag.appendChild(group);
        container.innerHTML = '';
        container.appendChild(frag);
        if (global.lucide) global.lucide.createIcons();
    }

    function setActiveNav(container, id) {
        container.querySelectorAll('.nav-item').forEach(function (n) { n.classList.toggle('active', n.dataset.id === id); });
    }

    function collectOutline(mainContent) {
        const list = [];
        mainContent.querySelectorAll('h3[id]').forEach(function (h) { list.push({ id: h.id, title: h.textContent.trim() }); });
        return list;
    }

    function renderTOC(tocContainer, mainContent, onNavigate) {
        tocContainer.innerHTML = '';
        const outlines = collectOutline(mainContent);
        if (!outlines.length) return;

        const ul = document.createElement('ul');
        ul.className = 'toc-list';
        const frag = document.createDocumentFragment();
        for (let i = 0; i < outlines.length; i++) {
            const o = outlines[i];
            const li = document.createElement('li');
            const a = document.createElement('a');
            a.href = '#' + encodeURIComponent(o.id);
            a.dataset.id = o.id;
            a.textContent = o.title;
            a.title = o.title;
            if (i === 0) a.classList.add('active');
            a.addEventListener('click', function (e) {
                e.preventDefault();
                createRipple(e, a);
                onNavigate(o.id, a);
            });
            li.appendChild(a);
            frag.appendChild(li);
        }
        ul.appendChild(frag);
        tocContainer.appendChild(ul);
    }

    let ticking = false;
    let autoScrolling = false;
    let scrollTimer = null;
    let cachedHeadings = [];

    function setupScrollSpy(mainContent, tocContainer) {
        if (mainContent._spyHandler) mainContent.removeEventListener('scroll', mainContent._spyHandler);
        cachedHeadings = Array.prototype.slice.call(mainContent.querySelectorAll('h3[id]'));
        mainContent._spyHandler = function () {
            if (autoScrolling) return;
            if (!ticking) {
                requestAnimationFrame(function () { updateSpy(tocContainer); ticking = false; });
                ticking = true;
            }
        };
        mainContent.addEventListener('scroll', mainContent._spyHandler, { passive: true });
        updateSpy(tocContainer);
    }

    function updateSpy(tocContainer) {
        if (!cachedHeadings.length) return;
        const offset = 100;
        let currentId = cachedHeadings[0].id;
        for (let i = 0; i < cachedHeadings.length; i++) {
            if (cachedHeadings[i].getBoundingClientRect().top <= offset) currentId = cachedHeadings[i].id;
            else break;
        }
        const links = tocContainer.querySelectorAll('a');
        for (let i = 0; i < links.length; i++) links[i].classList.toggle('active', links[i].dataset.id === currentId);
    }

    function scrollToHeading(id, mainContent, tocContainer, tocLink) {
        const el = mainContent.querySelector('#' + CSS.escape(id));
        if (!el) return;
        tocContainer.querySelectorAll('a').forEach(function (a) { a.classList.remove('active'); });
        if (tocLink) tocLink.classList.add('active');
        autoScrolling = true;
        clearTimeout(scrollTimer);
        const top = el.getBoundingClientRect().top + mainContent.scrollTop - 80;
        mainContent.scrollTo({ top: top, behavior: 'smooth' });
        scrollTimer = setTimeout(function () { autoScrolling = false; updateSpy(tocContainer); }, 600);
    }

    global.UI = {
        createRipple, initCopyDelegate, initGitHubDropdown,
        renderNav, setActiveNav, renderTOC, setupScrollSpy, scrollToHeading
    };
})(window);