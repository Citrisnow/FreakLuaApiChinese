(function (global) {
    'use strict';

    const KEY_STATE = 'eyeCareMode';
    const NIGHT_START = 18;
    const NIGHT_END = 7;
    let timer = null;

    function isNightNow() {
        const h = new Date().getHours();
        return h >= NIGHT_START || h < NIGHT_END;
    }

    function getMode() {
        return localStorage.getItem(KEY_STATE) || 'auto';
    }

    function apply() {
        const mode = getMode();
        const on = mode === 'on' || (mode === 'auto' && isNightNow());
        document.body.classList.toggle('eye-care', on);

        const btn = document.getElementById('eye-care-btn');
        if (btn) {
            btn.classList.toggle('on', on);
            if (mode === 'auto') {
                btn.title = on ? '护眼模式：自动（夜间已开启）' : '护眼模式：自动（夜间 18:00–07:00 开启）';
            } else if (mode === 'on') {
                btn.title = '护眼模式：强制开启';
            } else {
                btn.title = '护眼模式：强制关闭';
            }
        }
    }

    function init() {
        apply();
        timer = setInterval(apply, 30 * 60 * 1000);

        const btn = document.getElementById('eye-care-btn');
        if (btn) {
            btn.addEventListener('click', function () {
                const cur = getMode();
                const next = cur === 'auto' ? 'on' : cur === 'on' ? 'off' : 'auto';
                localStorage.setItem(KEY_STATE, next);
                apply();
            });
        }

        window.addEventListener('focus', apply, { passive: true });
    }

    global.EyeCare = { init, apply, isNightNow, getMode };
})(window);