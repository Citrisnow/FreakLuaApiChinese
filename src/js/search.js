(function (global) {
    'use strict';

    let pages = [];
    let inputEl, resultsEl, wrapEl;
    let hits = [];
    let activeIdx = -1;
    let onSelectCb = null;
    let lastQuery = '';
    let lastRe = null;

    function stripMd(s) {
        return s
            .replace(/```[\s\S]*?```/g, ' ')
            .replace(/`[^`]*`/g, ' ')
            .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ')
            .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
            .replace(/^#+\s*/gm, '')
            .replace(/[*_~>]/g, ' ')
            .replace(/\s+/g, ' ')
            .trim();
    }

    function buildIndex(rawPages) {
        pages = rawPages.map(function (p) {
            const plain = stripMd(p.rawMarkdown);
            return {
                title: p.title,
                rawMarkdown: p.rawMarkdown,
                textPlain: plain,
                titleLower: p.title.toLowerCase(),
                textLower: plain.toLowerCase(),
            };
        });
    }

    function search(query) {
        const q = query.trim().toLowerCase();
        if (!q) return [];
        const out = [];
        for (let i = 0; i < pages.length; i++) {
            const p = pages[i];
            const titleIdx = p.titleLower.indexOf(q);
            const textIdx = p.textLower.indexOf(q);
            if (titleIdx < 0 && textIdx < 0) continue;

            let snippet = '';
            if (textIdx >= 0) {
                const start = Math.max(0, textIdx - 40);
                const end = Math.min(p.textLower.length, textIdx + q.length + 60);
                snippet = (start > 0 ? '…' : '') + p.textLower.slice(start, end) + (end < p.textLower.length ? '…' : '');
            }
            out.push({
                page: p,
                titleMatch: titleIdx >= 0,
                snippet: snippet,
                score: (titleIdx >= 0 ? 100 : 0) + (textIdx >= 0 ? 10 : 0),
            });
        }
        out.sort(function (a, b) { return b.score - a.score; });
        return out.length > 12 ? out.slice(0, 12) : out;
    }

    function getHighlightRe(q) {
        if (q === lastQuery && lastRe) return lastRe;
        lastQuery = q;
        const escapedQ = q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        lastRe = new RegExp('(' + escapedQ + ')', 'ig');
        return lastRe;
    }

    function highlightText(text, q) {
        if (!q) return MD.escapeHtml(text);
        return MD.escapeHtml(text).replace(getHighlightRe(q), '<mark>$1</mark>');
    }

    let renderRafId = 0;
    function scheduleRender(query) {
        if (renderRafId) cancelAnimationFrame(renderRafId);
        renderRafId = requestAnimationFrame(function () {
            renderRafId = 0;
            renderResults(query);
        });
    }

    function renderResults(query) {
        hits = search(query);
        activeIdx = hits.length ? 0 : -1;

        if (!query.trim()) {
            resultsEl.classList.remove('show');
            resultsEl.textContent = '';
            wrapEl.classList.remove('open');
            return;
        }

        if (!hits.length) {
            resultsEl.textContent = '';
            const empty = document.createElement('div');
            empty.className = 'search-empty';
            empty.textContent = '没有找到 "' + query + '"';
            resultsEl.appendChild(empty);
            resultsEl.classList.add('show');
            wrapEl.classList.add('open');
            return;
        }

        const frag = document.createDocumentFragment();
        for (let i = 0; i < hits.length; i++) {
            const h = hits[i];
            const div = document.createElement('div');
            div.className = 'search-hit' + (i === activeIdx ? ' active' : '');
            div.dataset.idx = i;

            const pageLine = document.createElement('div');
            pageLine.className = 'hit-page';
            pageLine.innerHTML = highlightText(h.page.title, query);
            div.appendChild(pageLine);

            if (!h.titleMatch) {
                const titleLine = document.createElement('div');
                titleLine.className = 'hit-title';
                titleLine.textContent = h.page.title;
                div.appendChild(titleLine);
            }

            if (h.snippet) {
                const snip = document.createElement('div');
                snip.className = 'hit-snippet';
                snip.innerHTML = highlightText(h.snippet, query);
                div.appendChild(snip);
            }
            frag.appendChild(div);
        }
        resultsEl.textContent = '';
        resultsEl.appendChild(frag);
        resultsEl.classList.add('show');
        wrapEl.classList.add('open');
    }

    function pick(idx) {
        const h = hits[idx];
        if (!h) return;
        close();
        if (onSelectCb) onSelectCb(h.page);
    }

    function close() {
        resultsEl.classList.remove('show');
        wrapEl.classList.remove('open');
        inputEl.value = '';
        activeIdx = -1;
    }

    function moveActive(dir) {
        if (!hits.length) return;
        activeIdx = (activeIdx + dir + hits.length) % hits.length;
        const items = resultsEl.children;
        for (let i = 0; i < items.length; i++) {
            items[i].classList.toggle('active', i === activeIdx);
        }
        if (items[activeIdx]) items[activeIdx].scrollIntoView({ block: 'nearest' });
    }

    function init(onSelect) {
        wrapEl = document.getElementById('nav-search');
        inputEl = document.getElementById('search-input');
        resultsEl = document.getElementById('search-results');
        if (!wrapEl || !inputEl) return;
        onSelectCb = onSelect;

        inputEl.addEventListener('input', function () { scheduleRender(inputEl.value); });

        inputEl.addEventListener('keydown', function (e) {
            if (e.key === 'ArrowDown') { e.preventDefault(); moveActive(1); }
            else if (e.key === 'ArrowUp') { e.preventDefault(); moveActive(-1); }
            else if (e.key === 'Enter') { e.preventDefault(); if (activeIdx >= 0) pick(activeIdx); }
            else if (e.key === 'Escape') { close(); inputEl.blur(); }
        });

        document.addEventListener('click', function (e) {
            if (!wrapEl.contains(e.target)) {
                resultsEl.classList.remove('show');
                wrapEl.classList.remove('open');
            }
        });

        resultsEl.addEventListener('mousedown', function (e) {
            const hit = e.target.closest('.search-hit');
            if (!hit) return;
            e.preventDefault();
            pick(Number(hit.dataset.idx));
        });

        document.addEventListener('keydown', function (e) {
            const tag = document.activeElement && document.activeElement.tagName;
            if (e.key === '/' && document.activeElement !== inputEl && !/^(INPUT|TEXTAREA|SELECT)$/.test(tag)) {
                e.preventDefault();
                inputEl.focus();
                inputEl.select();
            }
        });
    }

    global.SearchUI = { init, buildIndex, close };
})(window);