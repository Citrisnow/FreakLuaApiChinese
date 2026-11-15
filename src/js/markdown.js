(function (global) {
    'use strict';

    const HTML_ESCAPE_RE = /[&<>"']/g;
    const HTML_ESCAPES = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };
    function escapeHtml(s) {
        return String(s).replace(HTML_ESCAPE_RE, function (c) { return HTML_ESCAPES[c]; });
    }

    function generateId(text, usedIds) {
        let base = String(text).trim().toLowerCase().replace(/\s+/g, '-').replace(/[^\w\u4e00-\u9fa5\-]/g, '');
        if (!base) base = 'section';
        if (!usedIds) return base;
        let id = base, n = 1;
        while (usedIds.has(id)) id = `${base}-${n++}`;
        usedIds.add(id);
        return id;
    }

    function registerFreakLua() {
        if (!global.hljs) return;
        if (global.hljs.getLanguage('freak-lua')) return;

        const freakLua = {
            name: 'freak-lua',
            aliases: ['freak', 'flua'],
            keywords: {
                keyword: 'and break do else elseif end false for function goto if in local nil not or repeat return then true until while self',
                built_in: 'print type pairs ipairs tostring tonumber assert error pcall xpcall require setmetatable getmetatable rawget rawset rawequal rawlen select next unpack',
                literal: 'true false nil'
            },
            contains: [
                global.hljs.COMMENT('--\\[\\[', '\\]\\]'),
                global.hljs.COMMENT('--', '$'),
                { className: 'built_in', begin: /\b(?:math|string|table|io|os|coroutine|debug|utf8|package)\b(?=\.)/ },
                {
                    begin: /\b([A-Za-z_]\w*)(:)([A-Za-z_]\w*)\b/,
                    returnBegin: true,
                    contains: [
                        { className: 'api-object', begin: /^[A-Za-z_]\w*/, end: /(?=:)/, excludeEnd: true },
                        { className: 'api-colon', begin: /:/, end: /(?=[A-Za-z_])/, excludeEnd: true },
                        { className: 'api-method', begin: /[A-Za-z_]\w*$/ }
                    ]
                },
                { className: 'api-global', begin: /\b[A-Z][A-Za-z0-9_]*(?=\s*\()/, relevance: 0 },
                { className: 'string', begin: /'/, end: /'/, contains: [{ begin: /\\[\s\S]/ }] },
                { className: 'string', begin: /"/, end: /"/, contains: [{ begin: /\\[\s\S]/ }] },
                { className: 'string', begin: /\[\[/, end: /\]\]/ },
                { className: 'number', begin: /\b\d+(\.\d+)?\b/ }
            ]
        };
        global.hljs.registerLanguage('freak-lua', function () { return freakLua; });
    }

    const LANG_ALIAS = {
        lua: 'freak-lua', freak: 'freak-lua', flua: 'freak-lua',
        js: 'javascript', ts: 'typescript', py: 'python',
        sh: 'bash', shell: 'bash', zsh: 'bash',
        yml: 'yaml', md: 'markdown', txt: 'plaintext',
        'c++': 'cpp', cs: 'csharp', rs: 'rust',
    };
    function normalizeLang(lang) {
        const k = String(lang || '').toLowerCase().trim();
        return LANG_ALIAS[k] || k || 'plaintext';
    }

    const HIGHLIGHT_CACHE = new Map();
    const HIGHLIGHT_CACHE_MAX = 80;
    function highlight(code, lang) {
        const normalized = normalizeLang(lang);
        if (!global.hljs) return escapeHtml(code);
        const key = normalized + '\u0000' + code;
        const cached = HIGHLIGHT_CACHE.get(key);
        if (cached !== undefined) return cached;

        let result;
        try {
            result = global.hljs.highlight(code, { language: normalized, ignoreIllegals: true }).value;
        } catch (e) {
            try { result = global.hljs.highlightAuto(code).value; }
            catch (e2) { result = escapeHtml(code); }
        }
        if (HIGHLIGHT_CACHE.size >= HIGHLIGHT_CACHE_MAX) {
            HIGHLIGHT_CACHE.delete(HIGHLIGHT_CACHE.keys().next().value);
        }
        HIGHLIGHT_CACHE.set(key, result);
        return result;
    }

    function createRenderer(getUsedIds) {
        const renderer = new marked.Renderer();
        renderer.heading = function (textOrToken, level) {
            let html, lvl;
            if (typeof textOrToken === 'object' && textOrToken !== null) {
                html = this.parser.parseInline(textOrToken.tokens);
                lvl = textOrToken.depth;
            } else { html = textOrToken; lvl = level; }
            const plain = String(html).replace(/<[^>]+>/g, '');
            const id = generateId(plain, getUsedIds());
            return `<h${lvl} id="${id}">${html}</h${lvl}>\n`;
        };
        renderer.code = function (codeOrToken, infostring) {
            let text, lang;
            if (typeof codeOrToken === 'object' && codeOrToken !== null) { text = codeOrToken.text; lang = codeOrToken.lang; }
            else { text = codeOrToken; lang = infostring; }
            text = text == null ? '' : String(text);
            const normalized = normalizeLang(lang);

            const lines = text.replace(/\n$/, '').split('\n');
            let lineNumbers = '';
            for (let i = 1; i <= lines.length; i++) lineNumbers += '<span>' + i + '</span>';
            const body = highlight(text, normalized);

            return '<pre>'
                + '<div class="code-header">'
                + '<div class="lang"><span class="dot"></span>' + normalized + '</div>'
                + '<button class="copy-btn" data-copy type="button"><i data-lucide="copy"></i> Copy</button>'
                + '</div>'
                + '<div class="code-body">'
                + '<div class="line-numbers">' + lineNumbers + '</div>'
                + '<code class="code-content hljs language-' + normalized + '">' + body + '</code>'
                + '</div></pre>\n';
        };
        renderer.codespan = function (codeOrToken) {
            const text = typeof codeOrToken === 'object' && codeOrToken !== null ? codeOrToken.text : codeOrToken;
            return '<code class="inline-code">' + escapeHtml(text) + '</code>';
        };
        renderer.table = function (headerOrToken, body) {
            let headerHtml, bodyHtml;
            if (typeof headerOrToken === 'object' && headerOrToken !== null) {
                headerHtml = headerOrToken.header.map(function (cell) { return '<th>' + this.parser.parseInline(cell.tokens) + '</th>'; }, this).join('');
                bodyHtml = headerOrToken.rows.map(function (row) { return '<tr>' + row.map(function (cell) { return '<td>' + this.parser.parseInline(cell.tokens) + '</td>'; }, this).join('') + '</tr>'; }, this).join('');
            } else { headerHtml = headerOrToken; bodyHtml = body; }
            return '<div class="table-wrap"><table><thead><tr>' + headerHtml + '</tr></thead><tbody>' + bodyHtml + '</tbody></table></div>\n';
        };
        renderer.blockquote = function (quoteOrToken) {
            const inner = typeof quoteOrToken === 'object' && quoteOrToken !== null ? this.parser.parse(quoteOrToken.tokens) : quoteOrToken;
            return '<blockquote>' + inner + '</blockquote>\n';
        };
        renderer.link = function (hrefOrToken, title, text) {
            let href, t, inner;
            if (typeof hrefOrToken === 'object' && hrefOrToken !== null) { href = hrefOrToken.href || ''; t = hrefOrToken.title; inner = this.parser.parseInline(hrefOrToken.tokens); }
            else { href = hrefOrToken || ''; t = title; inner = text || ''; }
            const isHash = href.charAt(0) === '#';
            const isExternal = /^https?:\/\//i.test(href);
            const titleAttr = t ? ' title="' + escapeHtml(t) + '"' : '';
            const extra = isExternal ? ' target="_blank" rel="noopener noreferrer"' : '';
            const cls = isHash ? ' class="anchor-link"' : '';
            return '<a href="' + escapeHtml(href) + '"' + titleAttr + extra + cls + '>' + inner + '</a>';
        };
        renderer.image = function (hrefOrToken, title, text) {
            let href, t, alt;
            if (typeof hrefOrToken === 'object' && hrefOrToken !== null) { href = hrefOrToken.href || ''; t = hrefOrToken.title; alt = hrefOrToken.text || ''; }
            else { href = hrefOrToken || ''; t = title; alt = text || ''; }
            return '<img src="' + escapeHtml(href) + '" alt="' + escapeHtml(alt) + '"' + (t ? ' title="' + escapeHtml(t) + '"' : '') + ' loading="lazy">';
        };
        return renderer;
    }

    const SEPARATOR = /^\s*---\s*$/m;
    const PAGE_TITLE = /^##\s+(.+)$/m;
    function splitPages(mdText) {
        const pages = mdText.split(SEPARATOR);
        const navData = [];
        for (let i = 0; i < pages.length; i++) {
            const pageText = pages[i];
            if (!pageText.trim()) continue;
            const m = pageText.match(PAGE_TITLE);
            if (!m) continue;
            const title = m[1].trim();
            const rawMarkdown = pageText.replace(/^##\s+(.+)$/m, '# $1');
            navData.push({ title: title, rawMarkdown: rawMarkdown });
        }
        return navData;
    }

    registerFreakLua();

    global.MD = {
        escapeHtml, generateId, normalizeLang, highlight, createRenderer, splitPages
    };
})(window);