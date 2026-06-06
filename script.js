        // High-priority suppression: catch reported ResizeObserver loop message as early as possible.
        // Some engines emit this non-fatal warning as an uncaught error; handle it at capture phase to avoid console noise.
        window.addEventListener('error', function(ev) {
            try {
                const msgCandidates = [
                    ev && ev.message,
                    ev && ev.error && ev.error.message,
                    ev && ev.error && ev.error.toString && ev.error.toString()
                ];
                for (let i = 0; i < msgCandidates.length; i++) {
                    const m = msgCandidates[i];
                    if (!m) continue;
                    if (/ResizeObserver loop completed with undelivered notifications/i.test(String(m))) {
                        try { ev.preventDefault && ev.preventDefault(); } catch(_) {}
                        try { ev.stopImmediatePropagation && ev.stopImmediatePropagation(); } catch(_) {}
                        return;
                    }
                }
            } catch (_) {}
        }, { capture: true, passive: true });

        window.addEventListener('unhandledrejection', function(ev) {
            try {
                const reason = ev && ev.reason;
                const candidates = [
                    reason && (reason.message || reason.toString && reason.toString()),
                    reason
                ];
                for (let i = 0; i < candidates.length; i++) {
                    if (/ResizeObserver loop completed with undelivered notifications/i.test(String(candidates[i]))) {
                        try { ev.preventDefault && ev.preventDefault(); } catch(_) {}
                        try { ev.stopImmediatePropagation && ev.stopImmediatePropagation(); } catch(_) {}
                        return;
                    }
                }
            } catch (_) {}
        }, { passive: true, capture: true });

        "use strict";

// Função global para detectar dispositivo mobile
window.isMobileOS = function() {
    try {
        const ua = navigator.userAgent || navigator.vendor || window.opera || '';
        return (/android/i.test(ua) && !/windows phone/i.test(ua)) || /iPad|iPhone|iPod/.test(ua);
    } catch (e) {
        return false;
    }
};

        // --- IMPORTAÇÃO E INSTALAÇÃO DO BANCO DE DADOS ---
        import { db } from './db.js';
        window.db = db; // Garante o escopo global imediato do DB para evitar problemas com scripts inline

        // If the DB items were obfuscated (url_enc) decode them into runtime .url fields immediately so
        // downstream code (YouTube detection / requestPlay / normalizeMediaUrl etc.) can read item.url reliably.
        // This covers the case where db.js contains url_enc instead of plain url.
        try {
          if (window.__lumina_deobf && typeof window.__lumina_deobf.decodeDb === 'function' && Array.isArray(window.db)) {
            try { window.__lumina_deobf.decodeDb(window.db); } catch (e) { /* non-blocking */ }
          }
        } catch (e) { /* ignore */ }

        /* Central estável de geração de ID de episódios para evitar colisões entre séries */
        window.getStableEpId = function(seriesId, season, index, ep) {
            try {
                if (!seriesId) return null;
                let rawId = (ep && ep.id && String(ep.id).trim()) ? String(ep.id).trim() : `s${season}-e${index}`;
                rawId = rawId.replace(/^.*::/, '');
                return rawId.startsWith(seriesId + '-') ? rawId : `${seriesId}-${rawId}`;
            } catch (e) {
                return `${seriesId}-s${season}-e${index}`;
            }
        };

        // Normalização de chaves de progresso para migrar IDs curtos antigos
        (function normalizeExistingProgressKeys() {
            try {
                const run = function() {
                    try {
                        if (!window.db || !Array.isArray(window.db) || !window.state || !window.state.progress) return;
                        const prog = window.state.progress || {};
                        const moved = {};
                        const shortMap = {};

                        window.db.forEach(series => {
                            try {
                                if (!series || !series.id || !series.seasons) return;
                                Object.keys(series.seasons || {}).forEach(seasonKey => {
                                    const eps = series.seasons[seasonKey] || [];
                                    for (let i = 0; i < eps.length; i++) {
                                        const ep = eps[i] || {};
                                        const shortId = (ep.id && String(ep.id).trim()) ? String(ep.id).trim() : null;
                                        const canonical = window.getStableEpId ? window.getStableEpId(series.id, seasonKey, i, ep) : `${series.id}-s${seasonKey}-e${i}`;
                                        if (!shortId) continue;
                                        if (!shortMap[shortId]) shortMap[shortId] = new Set();
                                        shortMap[shortId].add(canonical);
                                    }
                                });
                            } catch (_) {}
                        });

                        Object.keys(Object.assign({}, prog)).forEach(k => {
                            try {
                                if (!k || typeof k !== 'string') return;
                                if (k.indexOf('-s') !== -1 && k.split('-s').length > 1 && k.includes('::') === false) return;

                                const candidates = shortMap[k];
                                if (!candidates || candidates.size === 0) return;

                                if (candidates.size === 1) {
                                    const canonical = Array.from(candidates)[0];
                                    if (!prog[canonical]) {
                                        prog[canonical] = Object.assign({}, prog[k]);
                                        try { if (prog[canonical].time != null) prog[canonical].time = Number(prog[canonical].time); } catch(_) {}
                                        try { if (prog[canonical].duration != null) prog[canonical].duration = Number(prog[canonical].duration); } catch(_) {}
                                        try { prog[canonical].timestamp = Number(prog[canonical].timestamp) || Date.now(); } catch(_) { prog[canonical].timestamp = Date.now(); }
                                        moved[k] = canonical;
                                    }
                                    try { delete prog[k]; } catch(_) {}
                                } else {
                                    let chosen = null;
                                    const histKeys = new Set(Object.keys(window.state.history || {}));
                                    for (const c of Array.from(candidates)) {
                                        try {
                                            const sid = c.split('-s')[0];
                                            if (histKeys.has(sid)) { chosen = c; break; }
                                        } catch(_) {}
                                    }
                                    if (!chosen && window.player && window.player.context && window.player.context.seriesId) {
                                        const ctxSid = String(window.player.context.seriesId);
                                        for (const c of Array.from(candidates)) {
                                            try { if (c.indexOf(ctxSid + '-s') === 0) { chosen = c; break; } } catch(_) {}
                                        }
                                    }
                                    if (chosen) {
                                        if (!prog[chosen]) {
                                            prog[chosen] = Object.assign({}, prog[k]);
                                            try { if (prog[chosen].time != null) prog[chosen].time = Number(prog[chosen].time); } catch(_) {}
                                            try { if (prog[chosen].duration != null) prog[chosen].duration = Number(prog[chosen].duration); } catch(_) {}
                                            try { prog[chosen].timestamp = Number(prog[chosen].timestamp) || Date.now(); } catch(_) { prog[chosen].timestamp = Date.now(); }
                                            moved[k] = chosen;
                                        }
                                        try { delete prog[k]; } catch(_) {}
                                    }
                                }
                            } catch (_) {}
                        });

                        window.state.progress = prog;
                        try { localStorage.setItem('lumina_v2_prog', JSON.stringify(prog)); } catch (_) {}
                    } catch (e) {}
                };

                if (document.readyState === 'loading') {
                    document.addEventListener('DOMContentLoaded', () => setTimeout(run, 80));
                } else {
                    setTimeout(run, 80);
                }
            } catch (e) {}
        })();
/* Central stable episode id generator: always include series id as prefix to avoid collisions.
   Produces: "<seriesId>-s<season>-e<index>" or uses ep.id cleaned to ensure series prefix is present. */
window.getStableEpId = function(seriesId, season, index, ep) {
    try {
        if (!seriesId) return null;
        // derive a raw id from ep.id when present, else synthesize s{season}-e{index}
        let rawId = (ep && ep.id && String(ep.id).trim()) ? String(ep.id).trim() : `s${season}-e${index}`;
        // remove any legacy namespace fragments (e.g. "something::s1-e1")
        rawId = rawId.replace(/^.*::/, '');
        // ensure the seriesId is always the absolute prefix
        return rawId.startsWith(seriesId + '-') ? rawId : `${seriesId}-${rawId}`;
    } catch (e) {
        return `${seriesId}-s${season}-e${index}`;
    }
};

// One-time startup normalization to migrate any ambiguous short keys (like "s1-e1") into stable namespaced keys.
// This reduces risk of cross-series contamination for existing localStorage entries.
(function normalizeExistingProgressKeys() {
    try {
        // Run shortly after DOM ready so DB is likely available
        const run = function() {
            try {
                if (!window.db || !Array.isArray(window.db) || !window.state || !window.state.progress) return;
                const prog = window.state.progress || {};
                const moved = {};
                // Build reverse map: shortEpId -> possible canonical ids (series-prefixed)
                const shortMap = {};
                window.db.forEach(series => {
                    try {
                        if (!series || !series.id || !series.seasons) return;
                        Object.keys(series.seasons || {}).forEach(seasonKey => {
                            const eps = series.seasons[seasonKey] || [];
                            for (let i = 0; i < eps.length; i++) {
                                const ep = eps[i] || {};
                                const shortId = (ep.id && String(ep.id).trim()) ? String(ep.id).trim() : null;
                                const canonical = window.getStableEpId ? window.getStableEpId(series.id, seasonKey, i, ep) : `${series.id}-s${seasonKey}-e${i}`;
                                if (!shortId) continue;
                                if (!shortMap[shortId]) shortMap[shortId] = new Set();
                                shortMap[shortId].add(canonical);
                            }
                        });
                    } catch (_) {}
                });

                // Move unambiguous short keys into canonical ones
                Object.keys(Object.assign({}, prog)).forEach(k => {
                    try {
                        if (!k || typeof k !== 'string') return;
                        // skip already namespaced keys that clearly contain the series prefix pattern
                        if (k.indexOf('-s') !== -1 && k.split('-s').length > 1 && k.includes('::') === false) return;
                        const candidates = shortMap[k];
                        if (!candidates || candidates.size === 0) return;
                        if (candidates.size === 1) {
                            const canonical = Array.from(candidates)[0];
                            if (!prog[canonical]) {
                                prog[canonical] = Object.assign({}, prog[k]);
                                // normalize numeric fields
                                try { if (prog[canonical].time != null) prog[canonical].time = Number(prog[canonical].time); } catch(_) {}
                                try { if (prog[canonical].duration != null) prog[canonical].duration = Number(prog[canonical].duration); } catch(_) {}
                                try { prog[canonical].timestamp = Number(prog[canonical].timestamp) || Date.now(); } catch(_) { prog[canonical].timestamp = Date.now(); }
                                moved[k] = canonical;
                            }
                            try { delete prog[k]; } catch(_) {}
                        } else {
                            // Ambiguous mapping: attempt disambiguation by history / player context
                            let chosen = null;
                            const histKeys = new Set(Object.keys(window.state.history || {}));
                            for (const c of Array.from(candidates)) {
                                try {
                                    const sid = c.split('-s')[0];
                                    if (histKeys.has(sid)) { chosen = c; break; }
                                } catch(_) {}
                            }
                            if (!chosen && window.player && window.player.context && window.player.context.seriesId) {
                                const ctxSid = String(window.player.context.seriesId);
                                for (const c of Array.from(candidates)) {
                                    try { if (c.indexOf(ctxSid + '-s') === 0) { chosen = c; break; } } catch(_) {}
                                }
                            }
                            if (chosen) {
                                if (!prog[chosen]) {
                                    prog[chosen] = Object.assign({}, prog[k]);
                                    try { if (prog[chosen].time != null) prog[chosen].time = Number(prog[chosen].time); } catch(_) {}
                                    try { if (prog[chosen].duration != null) prog[chosen].duration = Number(prog[chosen].duration); } catch(_) {}
                                    try { prog[chosen].timestamp = Number(prog[chosen].timestamp) || Date.now(); } catch(_) { prog[chosen].timestamp = Date.now(); }
                                    moved[k] = chosen;
                                }
                                try { delete prog[k]; } catch(_) {}
                            }
                            // If still ambiguous, leave original key untouched to avoid wrong migration.
                        }
                    } catch (_) {}
                });

                // Persist the normalized map back to state and localStorage
                try {
                    window.state.progress = prog;
                    try { localStorage.setItem('lumina_v2_prog', JSON.stringify(prog)); } catch (_) {}
                } catch (_) {}
                // small console hint for debugging (non-critical)
                try { if (Object.keys(moved).length) console.info('Lumina: normalized progress keys', moved); } catch(_) {}
            } catch (e) {}
        };

        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => setTimeout(run, 80));
        } else {
            setTimeout(run, 80);
        }
    } catch (e) {}
})();
        // Helper: reliably restore mouse visibility across the app (removes accidental hide class)
        function restoreMouseVisibility() {
            try {
                // only remove the class from the player modal to avoid hiding the cursor site-wide
                try { document.getElementById('player-modal')?.classList.remove('lumina-hide-mouse'); } catch(_) {}
            } catch (e) {}
        }

        // Ensure non-DB images load eagerly and use async decoding; DB cover images (movie/series) will be lazy-loaded.
        (function(){
            // Dynamic placeholder generator: returns a placehold.co URL with title text and a stable color per id.
            // Produces predictable readable placeholders (background + foreground) and URL-encodes text.
            function luminaPlaceholder(title, id) {
                try {
                    const palette = [
                        '0b132b','1f2833','0f1720','041726','101820',
                        '7c3aed','f97316','06b6d4','34d399','f59e0b',
                        'ef4444','db2777','06b6d4','f59e0b','60a5fa'
                    ];
                    // stable pick based on id/title hash
                    const key = String(id || title || '').toLowerCase();
                    let h = 0;
                    for (let i = 0; i < key.length; i++) h = (h * 31 + key.charCodeAt(i)) >>> 0;
                    const bg = palette[h % palette.length] || '000000';
                    // choose foreground for contrast: dark backgrounds -> FFFFFF, lighter -> 000000
                    const darkCandidates = new Set(['0b132b','1f2833','0f1720','041726','101820','7c3aed','0b132b']);
                    const fg = darkCandidates.has(bg) ? 'FFFFFF' : '000000';
                    const safeTitle = String(title || 'Lumina').slice(0, 32).replace(/\s+/g, '+');
                    const txt = encodeURIComponent(safeTitle);
                    // return placehold.co image URL (600x400)
                    return `https://placehold.co/600x400/${bg}/${fg}?text=${txt}`;
                } catch (e) {
                    return 'fiveicon.png';
                }
            }

            // keep legacy constant for code paths that expect a simple name; prefer using luminaPlaceholder when possible
            const PLACEHOLDER_LOCAL = luminaPlaceholder('Lumina','placeholder');

            function setEagerForExistingImgs() {
                try {
                    document.querySelectorAll('img').forEach(img => {
                        try {
                            // If this img is marked as a DB cover (data-db-cover="1"), leave it lazy so covers defer loading
                            const isDbCover = img.getAttribute('data-db-cover') === '1';
                            if (!isDbCover) {
                                if (!img.hasAttribute('loading')) img.setAttribute('loading', 'eager');
                            } else {
                                // ensure DB covers are lazy by default for performance
                                if (!img.hasAttribute('loading')) img.setAttribute('loading', 'lazy');
                            }
                            // keep decoding async for performance where supported
                            if (!img.hasAttribute('decoding')) img.setAttribute('decoding', 'async');
                            // If image has no effective source, ensure a local placeholder so it renders immediately
                            if ((!img.getAttribute('src') || img.getAttribute('src') === '') && (!img.getAttribute('data-src') || img.getAttribute('data-src') === '')) {
                                img.setAttribute('src', PLACEHOLDER_LOCAL);
                            }
                        } catch(_) {}
                    });
                } catch(_) {}
            }

            // Apply as soon as DOM is ready, and observe new images inserted later to keep them non-lazy except DB covers
            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', () => {
                    setEagerForExistingImgs();
                    // observe future image additions
                    const mo = new MutationObserver((mut) => {
                        for (const m of mut) {
                            if (m.type === 'childList' && m.addedNodes && m.addedNodes.length) {
                                m.addedNodes.forEach(node => {
                                    try {
                                        if (node && node.nodeType === 1) {
                                            if (node.tagName && node.tagName.toLowerCase() === 'img') {
                                                const img = node;
                                                const isDbCover = img.getAttribute('data-db-cover') === '1';
                                                if (!isDbCover) {
                                                    if (!img.hasAttribute('loading')) img.setAttribute('loading','eager');
                                                } else {
                                                    if (!img.hasAttribute('loading')) img.setAttribute('loading','lazy');
                                                }
                                                if (!img.hasAttribute('decoding')) img.setAttribute('decoding','async');
                                                if ((!img.getAttribute('src') || img.getAttribute('src') === '') && (!img.getAttribute('data-src') || img.getAttribute('data-src') === '')) {
                                                    img.setAttribute('src', PLACEHOLDER_LOCAL);
                                                }
                                            } else {
                                                node.querySelectorAll && node.querySelectorAll('img').forEach(i => {
                                                    try {
                                                        const isDbCover = i.getAttribute('data-db-cover') === '1';
                                                        if (!isDbCover) {
                                                            if (!i.hasAttribute('loading')) i.setAttribute('loading','eager');
                                                        } else {
                                                            if (!i.hasAttribute('loading')) i.setAttribute('loading','lazy');
                                                        }
                                                        if (!i.hasAttribute('decoding')) i.setAttribute('decoding','async');
                                                        if ((!i.getAttribute('src') || i.getAttribute('src') === '') && (!i.getAttribute('data-src') || i.getAttribute('data-src') === '')) {
                                                            i.setAttribute('src', PLACEHOLDER_LOCAL);
                                                        }
                                                    } catch(_) {}
                                                });
                                            }
                                        }
                                    } catch(_) {}
                                });
                            } else if (m.type === 'attributes' && m.target && m.target.tagName && m.target.tagName.toLowerCase() === 'img') {
                                try {
                                    const img = m.target;
                                    const isDbCover = img.getAttribute('data-db-cover') === '1';
                                    if (!isDbCover) {
                                        if (!img.hasAttribute('loading')) img.setAttribute('loading', 'eager');
                                    } else {
                                        if (!img.hasAttribute('loading')) img.setAttribute('loading', 'lazy');
                                    }
                                    if (!img.hasAttribute('decoding')) img.setAttribute('decoding', 'async');
                                    if ((!img.getAttribute('src') || img.getAttribute('src') === '') && (!img.getAttribute('data-src') || img.getAttribute('data-src') === '')) {
                                        img.setAttribute('src', PLACEHOLDER_LOCAL);
                                    }
                                } catch(_) {}
                            }
                        }
                    });
                    try { mo.observe(document.body, { childList: true, subtree: true, attributes: true, attributeFilter: ['src'] }); } catch(_) {}
                });
            } else {
                setEagerForExistingImgs();
                const mo = new MutationObserver((mut) => {
                    for (const m of mut) {
                        if (m.type === 'childList' && m.addedNodes && m.addedNodes.length) {
                            m.addedNodes.forEach(node => {
                                try {
                                    if (node && node.nodeType === 1) {
                                        if (node.tagName && node.tagName.toLowerCase() === 'img') {
                                            const img = node;
                                            const isDbCover = img.getAttribute('data-db-cover') === '1';
                                            if (!isDbCover) {
                                                if (!img.hasAttribute('loading')) img.setAttribute('loading','eager');
                                            } else {
                                                if (!img.hasAttribute('loading')) img.setAttribute('loading','lazy');
                                            }
                                            if (!img.hasAttribute('decoding')) img.setAttribute('decoding','async');
                                            if ((!img.getAttribute('src') || img.getAttribute('src') === '') && (!img.getAttribute('data-src') || img.getAttribute('data-src') === '')) {
                                                img.setAttribute('src', PLACEHOLDER_LOCAL);
                                            }
                                        } else {
                                            node.querySelectorAll && node.querySelectorAll('img').forEach(i => {
                                                try {
                                                    const isDbCover = i.getAttribute('data-db-cover') === '1';
                                                    if (!isDbCover) {
                                                        if (!i.hasAttribute('loading')) i.setAttribute('loading','eager');
                                                    } else {
                                                        if (!i.hasAttribute('loading')) i.setAttribute('loading','lazy');
                                                    }
                                                    if (!i.hasAttribute('decoding')) i.setAttribute('decoding','async');
                                                    if ((!i.getAttribute('src') || i.getAttribute('src') === '') && (!i.getAttribute('data-src') || i.getAttribute('data-src') === '')) {
                                                        i.setAttribute('src', PLACEHOLDER_LOCAL);
                                                    }
                                                } catch(_) {}
                                            });
                                        }
                                    }
                                } catch(_) {}
                            });
                        } else if (m.type === 'attributes' && m.target && m.target.tagName && m.target.tagName.toLowerCase() === 'img') {
                            try {
                                const img = m.target;
                                const isDbCover = img.getAttribute('data-db-cover') === '1';
                                if (!isDbCover) {
                                    if (!img.hasAttribute('loading')) img.setAttribute('loading', 'eager');
                                } else {
                                    if (!img.hasAttribute('loading')) img.setAttribute('loading', 'lazy');
                                }
                                if (!img.hasAttribute('decoding')) img.setAttribute('decoding', 'async');
                                if ((!img.getAttribute('src') || img.getAttribute('src') === '') && (!img.getAttribute('data-src') || img.getAttribute('data-src') === '')) {
                                    img.setAttribute('src', PLACEHOLDER_LOCAL);
                                }
                            } catch(_) {}
                        }
                    }
                });
                try { mo.observe(document.body, { childList: true, subtree: true, attributes: true, attributeFilter: ['src'] }); } catch(_) {}
            }
        })();

        // Auto-hide splash: fade and remove after intro completes (safeguard)
        (function(){
            const splash = document.getElementById('splash-screen');
            if (!splash) return;
            // remove splash after animations complete (~5.2s). Keep fallback to 7s for slow devices.
            const REMOVE_DELAY = 5200;
            const FINAL_FALLBACK = 7200;
            const doRemove = () => {
                try {
                    splash.style.transition = 'opacity 420ms ease, visibility 420ms';
                    splash.style.opacity = '0';
                    splash.style.visibility = 'hidden';
                    setTimeout(() => {
                        try { splash.remove(); document.body.style.overflow = ''; } catch(_) {}
                    }, 480);
                } catch(e) { try { splash.remove(); document.body.style.overflow = ''; } catch(_) {} }
            };
            setTimeout(doRemove, REMOVE_DELAY);
            setTimeout(() => { if (document.getElementById('splash-screen')) doRemove(); }, FINAL_FALLBACK);

            // prevent background scroll while splash present
            document.body.style.overflow = 'hidden';
        })();

        // --- DATABASE ---
        // The DB has been moved to a separate module file (db.js). Paste your full db array into db.js as `export const db = [ ... ];`
            
        // --- LINK OBFUSCATION (inline DB shielding) ---
        // Move any cleartext 'url' fields into 'url_enc' using a simple XOR+base64 encoder so links are not present in plain text
        (function(){
            try {
                const ENCKEY = 'lumina_enc_key_v1';

                const toUtf8 = (s) => new TextEncoder().encode(String(s || ''));
                const fromUtf8 = (u8) => new TextDecoder().decode(u8);
                const base64FromU8 = (u8) => {
                    let binary = '';
                    const chunkSize = 0x8000;
                    for (let i = 0; i < u8.length; i += chunkSize) {
                        binary += String.fromCharCode.apply(null, Array.from(u8.subarray(i, i + chunkSize)));
                    }
                    return btoa(binary);
                };
                const u8FromBase64 = (b64) => {
                    const bin = atob(String(b64));
                    const u8 = new Uint8Array(bin.length);
                    for (let i = 0; i < bin.length; i++) u8[i] = bin.charCodeAt(i);
                    return u8;
                };
                const xorBytes = (u8, key) => {
                    const k = toUtf8(String(key || 'lumina_default_key'));
                    const out = new Uint8Array(u8.length);
                    for (let i = 0; i < u8.length; i++) out[i] = u8[i] ^ k[i % k.length];
                    return out;
                };
                function encodeStr(str, key) {
                    try {
                        const u8 = toUtf8(String(str || ''));
                        const x = xorBytes(u8, key || ENCKEY);
                        return base64FromU8(x);
                    } catch (e) { return ''; }
                }
                function decodeStr(enc, key) {
                    try {
                        if (!enc) return '';
                        const u8 = u8FromBase64(String(enc));
                        const x = xorBytes(u8, key || ENCKEY);
                        return fromUtf8(x);
                    } catch (e) { return ''; }
                }

                // helper to obfuscate urls in an object (recursive for seasons/episodes)
                function obfuscateItemUrls(item) {
                    try {
                        if (!item || typeof item !== 'object') return;
                        // top-level url -> url_enc
                        if (item.url && typeof item.url === 'string' && item.url.trim()) {
                            try { item.url_enc = encodeStr(item.url, ENCKEY); } catch(_) { item.url_enc = ''; }
                            try { delete item.url; } catch(_) {}
                        }

                        // seasons -> episodes -> url and subtitles[].src
                        if (item.seasons && typeof item.seasons === 'object') {
                            Object.keys(item.seasons).forEach(s => {
                                const arr = item.seasons[s] || [];
                                if (Array.isArray(arr)) {
                                    arr.forEach(ep => {
                                        if (!ep || typeof ep !== 'object') return;
                                        // episode url
                                        if (ep.url && typeof ep.url === 'string' && ep.url.trim()) {
                                            try { ep.url_enc = encodeStr(ep.url, ENCKEY); } catch(_) { ep.url_enc = ''; }
                                            try { delete ep.url; } catch(_) {}
                                        }
                                        // subtitles array: obfuscate each subtitle.src -> src_enc
                                        if (Array.isArray(ep.subtitles)) {
                                            ep.subtitles.forEach(sub => {
                                                try {
                                                    if (sub && typeof sub.src === 'string' && sub.src.trim()) {
                                                        try { sub.src_enc = encodeStr(sub.src, ENCKEY); } catch(_) { sub.src_enc = ''; }
                                                        try { delete sub.src; } catch(_) {}
                                                    }
                                                } catch(_) {}
                                            });
                                        }
                                    });
                                }
                            });
                        }

                        // also obfuscate any nested url fields (defensive)
                        Object.keys(item).forEach(k => {
                            try {
                                const v = item[k];
                                if (v && typeof v === 'object') obfuscateItemUrls(v);
                            } catch(_) {}
                        });
                    } catch (e) {}
                }

                // run obfuscation on the inline 'db' so the rest of the script does not contain cleartext urls
                try {
                    if (Array.isArray(window.db)) {
                        window.db.forEach(i => {
                            try { obfuscateItemUrls(i); } catch(_) {}
                        });
                    }
                } catch (e) {}
                
                // expose lightweight decode helper for runtime use by ensureDB / player flow
                window.__lumina_deobf = {
                    key: ENCKEY,
                    decode: decodeStr,
                    encode: encodeStr,
                    decodeDb: function(dbArr) {
                        try {
                            if (!Array.isArray(dbArr)) return;
                            dbArr.forEach(item => {
                                try {
                                    if (item && typeof item === 'object') {
                                        // restore top-level url if missing
                                        if (!item.url && item.url_enc) {
                                            try { item.url = decodeStr(item.url_enc, ENCKEY); } catch(_) { item.url = ''; }
                                        }
                                        if (item.seasons && typeof item.seasons === 'object') {
                                            Object.keys(item.seasons).forEach(s => {
                                                const arr = item.seasons[s] || [];
                                                if (Array.isArray(arr)) {
                                                    arr.forEach(ep => {
                                                        if (ep && !ep.url && ep.url_enc) {
                                                            try { ep.url = decodeStr(ep.url_enc, ENCKEY); } catch(_) { ep.url = ''; }
                                                        }
                                                    });
                                                }
                                            });
                                        }
                                    }
                                } catch(_) {}
                            });
                        } catch (e) {}
                    }
                };
            } catch (e) {
                // silent
            }

            // Ensure any inline store created at parse-time is decoded and restored into runtime window.db immediately.
            try {
                if (window.__lumina_deobf && typeof window.__lumina_deobf.decodeDb === 'function') {
                    const store = window.__db_store || window.db || null;
                    if (Array.isArray(store)) {
                        try { window.__lumina_deobf.decodeDb(store); window.db = store; }
                        catch (_) { window.db = window.db || []; }
                    } else {
                        // if no inline store, attempt to decode any existing window.db (defensive)
                        try { window.__lumina_deobf.decodeDb(window.db || []); } catch (_) {}
                    }
                }
            } catch (_) {}
        })();

        // --- DATABASE LAZY LOADER & OBFUSCATION ---
        (function(){
            try {
                // keep an immediate in-memory copy in a private slot, then clear the global 'db' reference so it isn't trivially available after JS runs
                // (the original inline db remains in source but is removed from window to make casual copy/paste harder)
                try { window.__db_store = window.db || null; } catch(_) { window.__db_store = null; }

                // ensureDB: returns the current db (prefers server-fetched obfuscated JSON if available), and populates window.db when resolved
                window.ensureDB = async function ensureDB() {
                    try {
                        // if already populated with real objects, return immediately
                        if (Array.isArray(window.db) && window.db.length > 0 && !window.__db_fetched) return window.db;
                        // try to fetch a non-cached DB JSON (server-side file /db.json). Network-first to avoid stale embedded links in client cache
                        try {
                            const res = await fetch('/db.json', { cache: 'no-store', credentials: 'same-origin' });
                            if (res && res.ok) {
                                const j = await res.json();
                                if (Array.isArray(j)) {
                                    // decode any obfuscated urls before installing into runtime store
                                    try {
                                        if (window.__lumina_deobf && typeof window.__lumina_deobf.decodeDb === 'function') {
                                            window.__lumina_deobf.decodeDb(j);
                                        }
                                    } catch(_) {}
                                    window.__db_store = j;
                                }
                            }
                        } catch (e) {
                            // network failed: keep any __db_store that may have been copied from the inline db at load-time
                        }
                        // install the store into the runtime db reference and mark fetched (so we don't re-fetch on subsequent calls unless explicitly desired)
                        window.db = Array.isArray(window.__db_store) ? window.__db_store : (window.db || []);



                        window.__db_fetched = true;
                        return window.db;
                    } catch (e) {
                        // on any error, ensure window.db exists as a safe empty array
                        try { window.db = window.db || []; } catch(_) { window.db = []; }
                        return window.db;
                    }
                };

                // light-weight helper: protect direct assignments to window.db by replacing with getter that yields empty array until ensureDB runs
                try {
                    if (!window.db || (Array.isArray(window.db) && window.db.length === 0)) {
                        Object.defineProperty(window, '__db_guard', { value: true, writable: false, configurable: false });
                    }
                } catch (e) { /* ignore defineProperty errors */ }
            } catch (e) {
                /* silent fallback */
            }
        })();

        // --- STATE & LOCAL STORAGE ---
        // NOTE: do not purge user data on startup so favorites/progress persist across sessions.
        // (Previous behavior removed stored v2 keys which prevented saving/restore.)

        let state = {
            favorites: JSON.parse(localStorage.getItem('lumina_v2_favs')) || [],
            progress: JSON.parse(localStorage.getItem('lumina_v2_prog')) || {}, 
            history: JSON.parse(localStorage.getItem('lumina_v2_hist')) || {}, 
            tab: 'home',
            searchQuery: '',
            pendingVideo: null,
            // persisted global volume (0.0 - 1.0)
            volume: (function(){
                try {
                    var v = localStorage.getItem('lumina_volume_v1');
                    if (v === null || typeof v === 'undefined') return 1;
                    var n = Number(v);
                    return isNaN(n) ? 1 : Math.max(0, Math.min(1, n));
                } catch (e) { return 1; }
            })()
        };

        // Background timer control helpers:
        // Pause non-essential background activity when video playback is active to avoid
        // continual DOM updates/timers from starving rendering during long sessions.
        function stopHeroRotate() {
            try { if (typeof __heroRotateTimer !== 'undefined' && __heroRotateTimer) { clearInterval(__heroRotateTimer); __heroRotateTimer = null; } } catch(err) {}
        }
        function startHeroRotate() {
            try {
                // don't start if already running
                if (typeof __heroRotateTimer !== 'undefined' && __heroRotateTimer) return;
                __heroRotateTimer = setInterval(() => {
                    try {
                        heroIndex = (heroIndex + 1) % db.length;
                        // if current tab is home, update only hero area for performance
                        if (state.tab === 'home') updateHeroCard();
                    } catch (e) { /* safe guard */ }
                }, 10000);
            } catch (e) {}
        }

        function stopBadgeTimer() {
            try { if (window.__lumina_badge_timer) { clearInterval(window.__lumina_badge_timer); window.__lumina_badge_timer = null; } } catch(e){}
        }
        function startBadgeTimer() {
            try {
                if (window.__lumina_badge_timer) return;
                window.__lumina_badge_timer = setInterval(rotateTagsTick, typeof BADGE_ROTATE_INTERVAL !== 'undefined' ? BADGE_ROTATE_INTERVAL : 8000);
            } catch(e){}
        }

        // globally pause/resume background activity (safe no-op when already in desired state)
        function pauseBackgroundActivity() {
            try {
                stopHeroRotate();
                stopBadgeTimer();
                // also pause the home session rotator so Continue Assistindo isn't affected
                try { stopHomeRotator(); } catch(e){}
                // any other repeating background tasks could be paused here if needed
            } catch(e) {}
        }
        function resumeBackgroundActivity() {
            try {
                startHeroRotate();
                startBadgeTimer();
                // resume gentle home session rotation when app is active
                try { startHomeRotator(); } catch(e){}
            } catch(e) {}
        }

        //
        // Home sessions gentle rotator: cycles visible items in home carousels smoothly
        //
        (function(){
            // internal state
            window.__home_rotator = { timer: null, interval: 20000, step: 1, lastShift: 0, running: false };

            function pickRotatedList(source, offset, count) {
                if (!Array.isArray(source) || source.length === 0) return [];
                const out = [];
                const len = source.length;
                for (let i = 0; i < Math.min(count, len); i++) {
                    out.push(source[(offset + i) % len]);
                }
                return out;
            }

            function fadeReplaceGrid(gridEl, items) {
                try {
                    if (!gridEl) return;
                    // gentle fade-out -> swap -> fade-in
                    gridEl.style.transition = 'opacity 420ms ease';
                    gridEl.style.opacity = '0';
                    setTimeout(() => {
                        try {
                            gridEl.innerHTML = '';
                            // render new items into grid using existing helper
                            render16by9CatalogCards(items, gridEl);
                        } catch (e) {}
                        // fade-in
                        requestAnimationFrame(() => {
                            gridEl.style.opacity = '1';
                        });
                    }, 420);
                } catch (e) {}
            }

            window.rotateHomeSessions = function rotateHomeSessions() {
                try {
                    // Safety guards: avoid doing any DOM work when page hidden, details modal or player are open,
                    // or when a heavy task is already running. This prevents layout thrash and reduces crash risk.
                    if (document.visibilityState === 'hidden') return;
                    const detailsModal = document.getElementById('details-modal');
                    const playerModal = document.getElementById('player-modal');
                    if ((detailsModal && !detailsModal.classList.contains('hidden')) || (playerModal && !playerModal.classList.contains('hidden'))) return;

                    // Prevent overlapping execution: ensure minimum gap between runs (defensive throttle)
                    const s = window.__home_rotator;
                    const now = performance.now();
                    if (!s._lastRun) s._lastRun = 0;
                    if (now - s._lastRun < Math.max(800, (s.interval || 60000) - 1200)) {
                        // Too soon since last run — bail out to avoid work stacking
                        return;
                    }
                    s._lastRun = now;

                    // Update the rotation index in-memory only (cheap) and defer DOM updates to idle time
                    const step = s.step || 1;
                    s.lastShift = (s.lastShift + step) % Math.max(1, db.length || 1);

                    // Prepare update tasks: only compute slices now (fast), schedule DOM swap on idle/frame
                    const tasks = [];

                    // Catalog (main Trends grid)
                    const catalogGrid = document.getElementById('catalog-grid');
                    if (catalogGrid) {
                        const items = pickRotatedList(db, s.lastShift, 16);
                        tasks.push(() => fadeReplaceGrid(catalogGrid, items));
                    }

                    // Novidades
                    const newGrid = document.getElementById('section-new-grid');
                    if (newGrid) {
                        const items = pickRotatedList(db, s.lastShift + 3, 8);
                        tasks.push(() => fadeReplaceGrid(newGrid, items));
                    }

                    // Comédias (category-based)
                    const comedyGrid = document.getElementById('section-comedy-grid');
                    if (comedyGrid) {
                        const pool = db.filter(i => (i.category || '').toLowerCase().includes('comédia') || (i.category || '').toLowerCase().includes('comedia'));
                        const items = pickRotatedList(pool.length ? pool : db, s.lastShift + 6, 8);
                        tasks.push(() => fadeReplaceGrid(comedyGrid, items));
                    }

                    // Recomendados para você: build pool from user's favorites genres; fallback to rating-based
                    const recoGrid = document.getElementById('section-reco-grid');
                    if (recoGrid) {
                        try {
                            const favGenres = new Set();
                            (state.favorites || []).forEach(fid => {
                                try {
                                    const f = db.find(d => d.id === fid);
                                    if (!f || !f.category) return;
                                    f.category.split(/[,\/]| e | & /i).forEach(g => {
                                        const ng = String(g || '').toLowerCase().trim();
                                        if (ng) favGenres.add(ng);
                                    });
                                } catch(_) {}
                            });

                            let pool = [];
                            if (favGenres.size > 0) {
                                const favArr = Array.from(favGenres);
                                pool = db.filter(item => {
                                    try {
                                        const cat = (item.category || '').toLowerCase();
                                        if (favArr.some(g => g && cat.includes(g))) return true;
                                        const title = (item.title || '').toLowerCase();
                                        if (item.tags && item.tags.some(t => favArr.some(g => String(t).toLowerCase().includes(g)))) return true;
                                        if (favArr.some(g => title.includes(g))) return true;
                                        return false;
                                    } catch (e) { return false; }
                                });
                            }

                            if (!Array.isArray(pool) || pool.length < 6) pool = db.slice().sort((a,b) => (b.ratings?.imdb||0) - (a.ratings?.imdb||0));
                            const items = pickRotatedList(pool.length ? pool : db, s.lastShift + 9, 8);
                            tasks.push(() => fadeReplaceGrid(recoGrid, items));
                        } catch (err) {
                            const pool = db.slice().sort((a,b) => (b.ratings?.imdb||0) - (a.ratings?.imdb||0));
                            const items = pickRotatedList(pool, s.lastShift + 9, 8);
                            tasks.push(() => fadeReplaceGrid(recoGrid, items));
                        }
                    }

                    // Run DOM updates opportunistically using requestIdleCallback if available, otherwise a requestAnimationFrame fallback.
                    const runUpdates = () => {
                        try {
                            // run one task at a time to keep frames light
                            for (let i = 0; i < tasks.length; i++) {
                                try { tasks[i](); } catch (_) {}
                            }
                        } catch (e) { /* ignore */ }
                    };

                    if (typeof requestIdleCallback === 'function') {
                        requestIdleCallback(() => {
                            // Re-check visibility and modals right before mutating DOM to avoid wasted work
                            if (document.visibilityState === 'hidden') return;
                            if ((detailsModal && !detailsModal.classList.contains('hidden')) || (playerModal && !playerModal.classList.contains('hidden'))) return;
                            runUpdates();
                        }, { timeout: 900 });
                    } else {
                        // Use RAF as a safe fallback: perform updates in next frame
                        requestAnimationFrame(() => {
                            if (document.visibilityState === 'hidden') return;
                            if ((detailsModal && !detailsModal.classList.contains('hidden')) || (playerModal && !playerModal.classList.contains('hidden'))) return;
                            runUpdates();
                        });
                    }
                } catch (e) {
                    // ignore rotation errors and avoid noisy logs in production
                    try { console.warn && console.warn('rotateHomeSessions error', e); } catch(_) {}
                }
            };

            window.startHomeRotator = function startHomeRotator() {
                try {
                    const s = window.__home_rotator;
                    if (s.running) return;
                    s.running = true;
                    // run initially after a slight delay to let initial render settle
                    s.timer = setInterval(() => {
                        try { window.rotateHomeSessions(); } catch(e){};
                    }, s.interval);
                    // do a first gentle tick after 750ms so user sees initial content then rotation
                    setTimeout(() => { try { window.rotateHomeSessions(); } catch(e){} }, 750);
                } catch (e) {}
            };

            window.stopHomeRotator = function stopHomeRotator() {
                try {
                    const s = window.__home_rotator;
                    if (s.timer) { clearInterval(s.timer); s.timer = null; }
                    s.running = false;
                } catch (e) {}
            };

            // keep the rotator paused while playback is active by listening for player open/close signals
            // start automatically when the script loads but actual start is controlled by resumeBackgroundActivity()
            // expose functions globally for testing/debugging.
        })();

        // Small safe DOM utility (named 'doom' per request) to avoid crashes when querying elements
        const doom = (sel, root = document) => {
            try { return root.querySelector(sel); } catch (e) { return null; }
        };
        const doomAll = (sel, root = document) => {
            try { return Array.from(root.querySelectorAll(sel)); } catch (e) { return []; }
        };

        // Convenience wrappers to make code clearer and slightly faster (fewer lookups and safer calls)
        // byId / bySel reduce repeated string building and centralize null-safety.
        const byId = (id) => doom('#' + id);
        const bySel = (sel, root) => doom(sel, root);
        const allSel = (sel, root) => doomAll(sel, root);

        // Small helper to safely set innerHTML without throwing when node missing
        const safeSetHTML = (id, html) => {
            const el = byId(id);
            if (el) el.innerHTML = html;
        };

        // Safe event attach (no-op when element missing)
        const safeOn = (id, evt, fn) => {
            const el = byId(id);
            if (el && typeof fn === 'function') el.addEventListener(evt, fn);
        };

        // Debounced + capped localStorage writer to avoid flooding storage and crashing the page.
        // This version merges with existing stored progress to prevent accidental regressions
        // (never overwrite a newer/further progress entry with an older/empty one).
        let __saveProgressTimer = null;

        // Immediate flush helper: writes current state.progress and state.history to localStorage synchronously.
        // Trim a localStorage JSON-object-like entry by removing oldest items based on timestamp,
        // keeping the newest `keepCount` entries. Returns true if trimming performed.
        function trimLocalStorageByTimestamp(key, keepCount = 150) {
            try {
                const raw = localStorage.getItem(key);
                if (!raw) return false;
                const obj = JSON.parse(raw || '{}');
                if (!obj || typeof obj !== 'object') return false;
                const entries = Object.entries(obj);
                if (entries.length <= keepCount) return false;

                // Sort by timestamp (desc) then keep the newest keepCount entries
                entries.sort((a, b) => {
                    const ta = (a[1] && a[1].timestamp) || 0;
                    const tb = (b[1] && b[1].timestamp) || 0;
                    return tb - ta;
                });
                const kept = Object.fromEntries(entries.slice(0, keepCount));
                try {
                    localStorage.setItem(key, JSON.stringify(kept));
                    return true;
                } catch (e) {
                    // If still fails, attempt to delete even more aggressively (keepCount halved) once
                    try {
                        const smaller = Object.fromEntries(entries.slice(0, Math.floor(keepCount / 2)));
                        localStorage.setItem(key, JSON.stringify(smaller));
                        return true;
                    } catch (_) { return false; }
                }
            } catch (e) {
                return false;
            }
        }

        // Flush current in-memory progress/history into localStorage with quota-aware trimming.
        function flushProgressNow() {
            try {
                // read current stored snapshot to merge safely (best-effort)
                let stored = {};
                try {
                    const raw = localStorage.getItem('lumina_v2_prog');
                    if (raw) stored = JSON.parse(raw) || {};
                } catch (e) {
                    stored = {};
                }

                // Merge algorithm (same as debounced saver) to avoid regressions
                const merged = Object.assign({}, stored);
                const now = Date.now();
                const incoming = state.progress || {};
                Object.keys(incoming).forEach(id => {
                    try {
                        const inc = incoming[id] || {};
                        const prev = merged[id] || {};
                        const prevTime = (typeof prev.time === 'number') ? prev.time : (prev.time ? Number(prev.time) : -1);
                        const incTime = (typeof inc.time === 'number') ? inc.time : (inc.time ? Number(inc.time) : -1);
                        const prevTs = prev.timestamp || 0;
                        const incTs = inc.timestamp || now;

                        let keep = prev;
                        if (incTs > prevTs) {
                            keep = inc;
                        } else if (incTs === prevTs) {
                            if (incTime >= 0 && prevTime >= 0) keep = (incTime >= prevTime) ? inc : prev;
                            else keep = incTime >= 0 ? inc : prev;
                        } else {
                            if (incTime >= 0 && prevTime < 0) keep = inc;
                            else keep = prev;
                        }

                        const out = Object.assign({}, prev, inc, keep);
                        out.timestamp = Math.max(prevTs || 0, incTs || now);
                        if (out.time != null) out.time = Number(out.time);
                        if (out.duration != null) out.duration = Number(out.duration);

                        merged[id] = out;
                    } catch (e) {
                        merged[id] = incoming[id];
                    }
                });

                // Cap entries to most recent 200 in-memory
                const entries = Object.entries(merged || {});
                let final = merged;
                if (entries.length > 200) {
                    entries.sort((a, b) => {
                        const ta = (a[1] && a[1].timestamp) || 0;
                        const tb = (b[1] && b[1].timestamp) || 0;
                        return tb - ta;
                    });
                    final = Object.fromEntries(entries.slice(0, 200));
                }

                // SANITIZE: ensure we never persist progress that equals or exceeds the duration,
                // and avoid auto-marking items completed by clamping time to at most (duration - 1s).
                try {
                    const sanitized = Object.assign({}, final || {});
                    Object.keys(sanitized).forEach(k => {
                        try {
                            const entry = sanitized[k];
                            if (!entry || typeof entry !== 'object') return;

                            // Normalize numeric fields to numbers when present
                            if (entry.time != null) entry.time = Number(entry.time);
                            if (entry.duration != null) entry.duration = Number(entry.duration);

                            const dur = (typeof entry.duration === 'number' && entry.duration > 0) ? Number(entry.duration) : null;
                            const tim = (typeof entry.time === 'number') ? Number(entry.time) : null;

                            if (dur !== null && tim !== null) {
                                // Always ensure persisted time is strictly less than duration by a 1s safety margin.
                                // This prevents transient near-EOF reports from being treated as full completion.
                                const safeMax = Math.max(0, dur - 1);
                                if (tim >= dur || tim > safeMax) {
                                    entry.time = Math.min(tim, safeMax);
                                }
                            }

                            // Never persist a 'completed' flag automatically; UI/explicit user action decides completion.
                            if (Object.prototype.hasOwnProperty.call(entry, 'completed')) {
                                try { delete entry.completed; } catch(_) {}
                            }

                            // Ensure timestamp is numeric
                            if (entry.timestamp != null) entry.timestamp = Number(entry.timestamp) || Date.now();

                            sanitized[k] = entry;
                        } catch(_) {}
                    });

                    // Attempt to write sanitized progress + history to localStorage; on quota errors trim older entries and retry.
                    try {
                        localStorage.setItem('lumina_v2_prog', JSON.stringify(sanitized));
                    } catch (e) {
                        // If quota exceeded, attempt to trim existing stored entries first
                        try {
                            const trimmed = trimLocalStorageByTimestamp('lumina_v2_prog', 120);
                            if (trimmed) {
                                // try again
                                localStorage.setItem('lumina_v2_prog', JSON.stringify(sanitized));
                            } else {
                                // last resort: try to write a reduced snapshot with only the most recent 100 entries
                                try {
                                    const reduced = Object.fromEntries(entries.slice(0, 100));
                                    localStorage.setItem('lumina_v2_prog', JSON.stringify(reduced));
                                    final = reduced;
                                } catch (_) {
                                    // give up gracefully (don't clear everything)
                                }
                            }
                        } catch (_) {
                            // give up gracefully
                        }
                    }
                } catch (sanitizeErr) {
                    // If sanitization unexpectedly fails, fall back to original write attempt (best-effort)
                    try {
                        localStorage.setItem('lumina_v2_prog', JSON.stringify(final));
                    } catch (e) {
                        try {
                            trimLocalStorageByTimestamp('lumina_v2_prog', 120);
                            localStorage.setItem('lumina_v2_prog', JSON.stringify(final));
                        } catch (_) {}
                    }
                }

                try {
                    localStorage.setItem('lumina_v2_hist', JSON.stringify(state.history || {}));
                } catch (e) {
                    // histogram/history may be large; try trimming progress first and retry history
                    try {
                        trimLocalStorageByTimestamp('lumina_v2_prog', 120);
                        localStorage.setItem('lumina_v2_hist', JSON.stringify(state.history || {}));
                    } catch (_) {
                        // As a last fallback try to write a minimal empty history (avoid removing progress)
                        try { localStorage.setItem('lumina_v2_hist', JSON.stringify({})); } catch (_) {}
                    }
                }

                // reflect the merged snapshot back into memory so subsequent operations use same data
                state.progress = final;
            } catch (e) {
                // best-effort fallback: try direct write of in-memory objects
                try { localStorage.setItem('lumina_v2_prog', JSON.stringify(state.progress || {})); } catch (_) {}
                try { localStorage.setItem('lumina_v2_hist', JSON.stringify(state.history || {})); } catch (_) {}
            }
        }

        // Debounced saver (keeps previous behavior for frequent updates)
        function saveProgressData() {
            if (__saveProgressTimer) clearTimeout(__saveProgressTimer);
            __saveProgressTimer = setTimeout(() => {
                try { flushProgressNow(); } catch (e) {}
                __saveProgressTimer = null;
            }, 300);
        }

        // Reliable periodic autosave: low-overhead background timer that flushes progress regularly.
        // Guarded so it does nothing when there's no meaningful progress state or when a previous flush is in-flight.
        (function setupAutosaveLoop() {
            try {
                if (window.__lumina_autosave_installed) return;
                window.__lumina_autosave_installed = true;

                // Call flushProgressNow only when there is something to save and not more often than 500ms.
                let autosavePending = false;
                let lastAutosave = 0;
                const MIN_INTERVAL = 500; // ms

                const maybeFlush = () => {
                    try {
                        // Fast checks to avoid expensive JSON operations frequently
                        const hasProgress = state && state.progress && Object.keys(state.progress || {}).length > 0;
                        if (!hasProgress) return;
                        const now = Date.now();
                        if (autosavePending) return;
                        if (now - lastAutosave < MIN_INTERVAL) return;
                        autosavePending = true;
                        // schedule microtask to flush (coalesces many small writes into one)
                        setTimeout(() => {
                            try {
                                flushProgressNow();
                                lastAutosave = Date.now();
                            } catch (e) {
                                // fall back to debounced saver if flush fails
                                try { saveProgressData(); } catch (_) {}
                            } finally { autosavePending = false; }
                        }, 0);
                    } catch (e) { autosavePending = false; }
                };

                // Start a gentle interval to call maybeFlush — this is resilient when other event handlers fail.
                window.__lumina_autosave_interval = setInterval(() => {
                    try { maybeFlush(); } catch (_) {}
                }, MIN_INTERVAL);

                // Also trigger on key lifecycle events to maximize chance of saving
                ['visibilitychange','pagehide','beforeunload','unload'].forEach(evt => {
                    try {
                        window.addEventListener(evt, () => {
                            try {
                                // immediate best-effort synchronous attempts on pagehide/beforeunload
                                if (evt === 'beforeunload' || evt === 'pagehide' || evt === 'unload') {
                                    try { if (window.player && typeof window.player.saveProgress === 'function') { window.player.saveProgress(); } } catch(_) {}
                                    try { flushProgressNow(); } catch (_) { saveProgressData(); }
                                    return;
                                }
                                // otherwise try a quick maybeFlush
                                maybeFlush();
                            } catch(_) {}
                        }, { passive: true });
                    } catch (_) {}
                });

                // ensure we attempt to flush when state.progress is mutated by common helpers (monkey-patch saveProgressData caller points)
                const origSave = saveProgressData;
                saveProgressData = function() {
                    try { origSave && origSave(); } catch(_) {}
                    try { maybeFlush(); } catch(_) {}
                };

            } catch (e) {
                // fail silently if autosave installation fails
            }
        })();

        // helper: detect if URL is direct video file (or youtube embed)
        let __youtubeApiLoaded = false;
        let __youtubeApiLoading = false;
        function loadYouTubeAPIIfNeeded() {
            if(__youtubeApiLoaded || __youtubeApiLoading) return;
            __youtubeApiLoading = true;
            var tag = document.createElement('script');
            tag.src = "https://www.youtube.com/iframe_api";
            tag.async = true;
            document.head.appendChild(tag);
            // The API sets window.onYouTubeIframeAPIReady; we'll mark loaded when available
            window.onYouTubeIframeAPIReady = function() {
                __youtubeApiLoaded = true;
                __youtubeApiLoading = false;
            };
        }
        // Best-effort helper: try to click YouTube's "Pular anúncio" or similar skip buttons inside any iframe we can access.
        // This will silently fail on cross-origin iframes (most YouTube embeds), but for same-origin or permissive hosts
        // it will attempt to click `.ytp-ad-skip-button` or other common selectors. Called periodically only while a YT player is active.
        function attemptClickYTSkip() {
            try {
                // Look for any iframes that look like YouTube embeds
                const iframes = Array.from(document.querySelectorAll('#player-media-wrapper iframe, iframe[src*="youtube.com"], iframe[src*="youtu.be"], #yt-player iframe'));
                for (const ifr of iframes) {
                    try {
                        // try to access contentWindow.document; if cross-origin this will throw and be caught
                        const doc = ifr.contentDocument || (ifr.contentWindow && ifr.contentWindow.document);
                        if (!doc) continue;
                        // common selectors for skip ad / skip button and for other skip affordances
                        const selCandidates = [
                            '.ytp-ad-skip-button.ytp-button',
                            '.ytp-ad-skip-button',
                            '.ytp-ad-overlay-close-button',
                            '.ytp-ad-overlay-toggle-button',
                            '.ytp-player-content .ytp-ad-skip-button'
                        ];
                        for (const s of selCandidates) {
                            try {
                                const btn = doc.querySelector(s);
                                if (btn) {
                                    // attempt to click and provide lightweight feedback
                                    try { btn.click(); } catch(_) { try { btn.dispatchEvent(new MouseEvent('click', { bubbles: true })); } catch(_) {} }
                                    try { showToast('Tentando pular anúncio...', 1400); } catch(_) {}
                                    return true;
                                }
                            } catch(_) {}
                        }
                        // also try to send a generic click to known region (bottom-right ad overlay) if selector fails
                        try {
                            const region = doc.querySelector('.ytp-ad-player-overlay, .ytp-ad-overlay-slot');
                            if (region) {
                                try { region.click(); } catch(_) {}
                                try { showToast('Interagindo com anúncio (tentativa)...', 1200); } catch(_) {}
                                return true;
                            }
                        } catch(_) {}
                    } catch (_) {
                        // cross-origin iframe - ignore
                        continue;
                    }
                }
            } catch (e) {
                // silent
            }
            return false;
        }

        // Ensure PiP/volume/mute controls are hidden for YouTube embeds (called when YT player or YT iframe is created)
        function hideYouTubePlayerControls() {
            try {
                const pip = document.getElementById('pip-btn');
                const vol = document.getElementById('volume-bar');
                const mute = document.getElementById('mute-btn');
                const pipImg = document.querySelector('#pip-btn img');
                if (pip) { pip.style.display = 'none'; pip.setAttribute('aria-hidden','true'); }
                if (pipImg) { pipImg.style.display = 'none'; }
                if (vol) { vol.style.display = 'none'; vol.setAttribute('aria-hidden','true'); }
                if (mute) { mute.style.display = 'none'; mute.setAttribute('aria-hidden','true'); }
                // also ensure PiP icon won't be visible via keep-visible class fallback
                try { document.querySelectorAll('.keep-visible').forEach(el => { if (el.id === 'pip-btn' || el === pip) el.style.display = 'none'; }); } catch(_) {}
            } catch (e) { /* silent */ }
        }

        function isDirectVideo(url) {
            if(!url) return false;
            try {
                const u = url.split('?')[0].toLowerCase();
                if (/\.(mp4|webm|m3u8|mov|ogg)$/i.test(u)) return true;
                // treat raw youtube embed links as non-direct (handled specially via YT API elsewhere)
                return false;
            } catch (e) { return false; }
        }

        // Normalize a variety of common embed/host patterns to playable URLs.
        // Accepts either a string or an episode object (with url / url_enc). Returns a best-effort direct URL or original input.
        function normalizeMediaUrl(srcOrEp) {
            try {
                let raw = '';
                if (!srcOrEp) return '';
                if (typeof srcOrEp === 'string') raw = String(srcOrEp).trim();
                else if (typeof srcOrEp === 'object') {
                    if (srcOrEp.url && String(srcOrEp.url).trim()) raw = String(srcOrEp.url).trim();
                    else if (srcOrEp.url_enc && window.__lumina_deobf && typeof window.__lumina_deobf.decode === 'function') {
                        raw = window.__lumina_deobf.decode(srcOrEp.url_enc, window.__lumina_deobf.key) || '';
                    } else raw = String(srcOrEp.url || '').trim();
                } else {
                    raw = String(srcOrEp || '');
                }
                if (!raw) return '';

                const u = raw.trim();

                // Google Drive file preview -> direct download / streaming endpoint
                // patterns: /file/d/FILEID/..., /open?id=FILEID
                try {
                    const m = u.match(/\/file\/d\/([a-zA-Z0-9_-]{10,})/i) || u.match(/[?&]id=([a-zA-Z0-9_-]{10,})/i);
                    if (m && m[1]) {
                        // use Google drive "uc?export=download&id=" which is more usable for <video>
                        return `https://drive.google.com/uc?export=download&id=${m[1]}`;
                    }
                } catch (_) {}

                // Dropbox shared links -> transform to dl.dropboxusercontent.com raw downloadable link
                try {
                    const dropboxMatch = u.match(/https?:\/\/(www\.)?dropbox\.com\/s\/([a-zA-Z0-9]+)\/(.+?)(\?.*)?$/i);
                    if (dropboxMatch) {
                        // preserve path token and filename if present
                        return u.replace('www.dropbox.com', 'dl.dropboxusercontent.com').replace('?dl=0', '');
                    }
                    // also handle dl.dropbox redirect patterns already present: keep as-is
                } catch (_) {}

                // YouTube watch / share -> embed URL (we let YT API handle embed vs direct)
                try {
                    const ytEmbed = u.match(/(?:youtube\.com\/watch\?v=|youtube\.com\/embed\/|youtu\.be\/)([A-Za-z0-9_-]{6,})/i);
                    if (ytEmbed && ytEmbed[1]) {
                        return `https://www.youtube.com/embed/${ytEmbed[1]}?enablejsapi=1&rel=0&playsinline=1`;
                    }
                } catch (_) {}

                // embedplay / tokyvideo / playerflixapi - return same URL (these are usually embed pages handled by iframe)
                try {
                    if (/embedplay\.icu|tokyvideo\.com|playerflixapi\.com|embedplay\.icu/i.test(u)) return u;
                } catch (_) {}

                // Odycdn / player.odycdn.com HLS/mp4 direct: leave as-is
                try {
                    if (/odycdn\.com|player\.odycdn\.com|rumble\.com/i.test(u)) return u;
                } catch (_) {}

                // If url already looks like a direct media file (mp4/m3u8/webm/mov) return it
                try {
                    const clean = u.split('#')[0].split('?')[0];
                    if (/\.(mp4|webm|m3u8|mov|ogg)$/i.test(clean)) return u;
                } catch (_) {}

                // special-case Google Drive "uc?export=download" already formed -> return as-is
                if (/drive\.google\.com\/uc\?export=download/i.test(u)) return u;

                // Fallback: return original string
                return u;
            } catch (e) {
                return (typeof srcOrEp === 'string') ? srcOrEp : (srcOrEp && srcOrEp.url) ? srcOrEp.url : '';
            }
        }
        function isYouTubeEmbed(url) {
            if(!url) return false;
            try {
                return /youtube\.com\/embed\/|youtu\.be\/|youtube\.com\/watch\?v=/.test(url);
            } catch(e) { return false; }
        }

        // --- CORE UI ---
        // rotating hero index to cycle top highlight periodically
        let heroIndex = 0;
        let __heroRotateTimer = null;
        async function init() { 
            // ensure database loaded lazily and not left on global scope for casual scraping
            try { await ensureDB(); } catch(_) { /* proceed even if ensureDB fails */ }

            renderView();
            insertLegalFooter();
            // handle incoming share links via query string (ensure we have a DB for mapping)
            try { await handleSharedQuery && handleSharedQuery(); } catch(e) {}
            // start rotation: change hero every 10s (use helper to allow pausing during playback)
            startHeroRotate();
        }

        // Smooth tab switching with light fade/slide and render debounce to avoid layout thrash
        let __switchTabTimer = null;
        function switchTab(tab, clearSearch = true) {
            // Lightweight "doom" navigation: unload previous view's heavy DOM and only render the new tab on demand.
            try {
                if (state.tab === tab && clearSearch) return;
                const prevTab = state.tab;
                state.tab = tab;

                if (clearSearch) {
                    state.searchQuery = '';
                    const dSearch = doom('#desktop-search');
                    if (dSearch) dSearch.value = '';
                }

                // Update Desktop Nav
                const dTabs = {
                    'home': doom('#tab-home-desktop'),
                    'favorites': doom('#tab-fav-desktop')
                };
                Object.keys(dTabs).forEach(k => {
                    const el = dTabs[k];
                    if (el) el.className = k === tab ? 'text-white font-medium text-sm transition-all' : 'text-white/50 hover:text-white font-medium text-sm transition-all';
                });

                // Update Mobile Nav
                const mTabs = {
                    'home': { el: doom('#tab-home-mobile'), icon: 'ph-house' },
                    'search': { el: doom('#tab-search-mobile'), icon: 'ph-magnifying-glass' },
                    'favorites': { el: doom('#tab-fav-mobile'), icon: 'ph-bookmark-simple' }
                };
                Object.keys(mTabs).forEach(k => {
                    const entry = mTabs[k];
                    if (entry.el) {
                        const isActive = k === tab;
                        entry.el.className = `flex flex-col items-center gap-1 w-16 transition-all ${isActive ? 'text-white scale-110' : 'text-white/40 hover:text-white'}`;
                        const iconEl = entry.el.querySelector('i');
                        if (iconEl) iconEl.className = `${isActive ? 'ph-fill' : 'ph'} ${entry.icon} text-2xl mb-0.5`;
                    }
                });

                const container = doom('#main-content');
                if (!container) return;

                // Exit animation for previous view
                container.classList.add('tab-exit');

                // Minimal unload: remove large DOM subtrees, stop timers and listeners tied to previous view
                try {
                    // fire global cleanup to stop background timers and release heavy refs
                    try { window.luminaCleanup && window.luminaCleanup(); } catch(_) {}
                    // remove player/details heavy nodes if they are not needed
                    try {
                        const details = doom('#details-modal');
                        if (details && !details.classList.contains('hidden')) {
                            // close details to free listeners and inner DOM
                            closeDetails && closeDetails();
                        }
                    } catch (_) {}
                    try {
                        const pmod = doom('#player-modal');
                        if (pmod && !pmod.classList.contains('hidden')) {
                            // fully close the player to release media and blobs
                            closePlayer && closePlayer();
                        }
                    } catch (_) {}

                    // Remove any large injected sections (trend carousels, grids) to keep only the container
                    // We preserve the main container element but clear its contents before rendering the new tab.
                    // Also revoke any objectURLs created by resilient loader to avoid leaks.
                    try {
                        // revoke created object URLs on imgs
                        document.querySelectorAll('img.__resilient_object_url').forEach(img => {
                            try { if (img.__resilient_object_url) { URL.revokeObjectURL(img.__resilient_object_url); img.__resilient_object_url = null; } } catch(_) {}
                        });
                    } catch (_) {}

                    // detach delegated listeners that tie to previous content (defensive)
                    try { document.removeEventListener('lumina-ensure-legal-footer', insertLegalFooter); } catch(_) {}
                } catch (e) {
                    // non-fatal
                }

                // After a short delay run the render for the requested tab (gives exit animation a moment)
                if (__switchTabTimer) clearTimeout(__switchTabTimer);
                __switchTabTimer = setTimeout(() => {
                    try {
                        // Completely clear previous content (doom helper ensures safe queries)
                        try { container.innerHTML = ''; } catch (_) { while (container.firstChild) container.removeChild(container.firstChild); }

                        // Render only the requested tab (renderView already does selective rendering)
                        renderView();

                        // Insert lightweight footer for current view only
                        insertLegalFooter && insertLegalFooter();

                        // Force reflow to allow enter transitions, then animate in
                        container.classList.remove('tab-exit');
                        container.classList.add('tab-enter');
                        void container.offsetHeight;
                        container.classList.add('tab-enter-active');

                        setTimeout(() => {
                            try { container.classList.remove('tab-enter', 'tab-enter-active'); } catch(_) {}
                        }, 350);

                        // garbage-collect hints: schedule a microtask to remove detached nodes and call cleanup again
                        Promise.resolve().then(() => {
                            try { window.luminaCleanup && window.luminaCleanup(); } catch(_) {}
                        });
                    } catch (err) {
                        console.warn('switchTab render error', err);
                    } finally {
                        __switchTabTimer = null;
                        // scroll to top of app area explicitly
                        try { window.scrollTo({ top: 0, behavior: 'auto' }); } catch(_) {}
                    }
                }, 180);
            } catch (ex) {
                console.warn('switchTab fatal', ex);
            }
        }

        // Debounced search to avoid excessive renders while typing
        let __searchDebounce = null;
        function handleSearch(query) {
            state.searchQuery = query;
            if (__searchDebounce) clearTimeout(__searchDebounce);
            __searchDebounce = setTimeout(() => {
                if (query.trim().length > 0) {
                    if (state.tab !== 'search') switchTab('search', false);
                    else renderView();
                } else {
                    switchTab('home');
                }
                __searchDebounce = null;
            }, 1000);
        }

        function renderView() {
            const container = document.getElementById('main-content');
            container.innerHTML = ''; 
            try { container.scrollTo({ top: 0, behavior: 'auto' }); } catch(e) { container.scrollTop = 0; }
            
            if (state.tab === 'search') {
                // normalize function: strip diacritics and collapse non-alphanum to single space for safer comparisons
                const normalizeText = function(s) {
                    if (!s) return '';
                    return String(s).toLowerCase()
                        .normalize('NFKD').replace(/[\u0300-\u036f]/g,'')
                        .replace(/[^a-z0-9]+/g,' ')
                        .trim();
                };

                // simple Levenshtein distance for fuzzy tolerances
                const levenshtein = function(a, b) {
                    if (a === b) return 0;
                    const an = a ? a.length : 0;
                    const bn = b ? b.length : 0;
                    if (an === 0) return bn;
                    if (bn === 0) return an;
                    const matrix = [];
                    for (let i = 0; i <= bn; i++) { matrix[i] = [i]; }
                    for (let j = 0; j <= an; j++) { matrix[0][j] = j; }
                    for (let i = 1; i <= bn; i++) {
                        for (let j = 1; j <= an; j++) {
                            const cost = b.charAt(i-1) === a.charAt(j-1) ? 0 : 1;
                            matrix[i][j] = Math.min(
                                matrix[i-1][j] + 1,
                                matrix[i][j-1] + 1,
                                matrix[i-1][j-1] + cost
                            );
                        }
                    }
                    return matrix[bn][an];
                };

                const rawQuery = (state.searchQuery || '').trim();
                const nQuery = normalizeText(rawQuery);

                // If query is empty, show no results and prompt (keeps behavior consistent)
                if (!nQuery) {
                    container.innerHTML = `
                        <div class="pt-24 md:pt-32 px-6 md:px-16 min-h-screen animate-fade-in">
                            
                            <!-- Mobile Search Input (Visible only on mobile) -->
                            <div class="relative w-full mb-8 md:hidden">
                                <i class="ph ph-magnifying-glass absolute left-4 top-1/2 -translate-y-1/2 text-white/50 text-xl"></i>
                                <input type="text" id="mobile-search" placeholder="Buscar filmes e séries..." class="w-full bg-surface border border-white/10 rounded-full py-3.5 pl-12 pr-4 text-white focus:outline-none focus:border-accent transition-colors placeholder:text-white/30 text-sm" oninput="handleSearch(this.value)" value="${state.searchQuery}" autofocus>
                            </div>

                            <div class="flex flex-col items-center justify-center py-12 text-center">
                                <i class="ph ph-magnifying-glass text-4xl text-white/20 mb-4"></i>
                                <h2 class="text-lg font-medium text-white mb-1">Comece a digitar para buscar</h2>
                                <p class="text-white/50 text-sm">Digite o nome de filmes, séries ou gêneros para pesquisar por títulos.</p>
                            </div>
                        </div>
                    `;
                    // focus mobile input if present
                    setTimeout(() => {
                        try { const mInput = document.getElementById('mobile-search'); if (mInput && window.innerWidth < 768) mInput.focus(); } catch(_) {}
                    }, 120);
                } else {
                    // First: try an exact title match (ignores accents, case, multiple spaces) and if found include any obvious sequels/variants.
                    // This makes an exact search return the matched title plus related numbered/variant entries available in the DB.
                    const exactMatch = db.find(item => {
                        try {
                            const t = normalizeText(item.title || item.originalTitle || '');
                            // also allow exact match against normalized originalTitle or id
                            const o = normalizeText(item.originalTitle || '');
                            const idnorm = normalizeText(item.id || '');
                            return (t === nQuery) || (o === nQuery) || (idnorm === nQuery);
                        } catch (e) { return false; }
                    });

                    // Helper: given a base normalized title, find likely sequels/variants in the DB (e.g., "Pânico 2", "Pânico 3", "Pânico: O Retorno", "Pânico II")
                    function findSequels(baseNorm) {
                        if (!baseNorm) return [];
                        // candidate rules:
                        // - title includes baseNorm but is not identical (covers "Title 2", "Title: Subtitle", "Title - Part 2")
                        // - title ends with roman numerals or trailing digits after base (II, III, 2, 3)
                        const romanPattern = '\\b(?:ii|iii|iv|v|vi|vii|viii|ix|x)\\b';
                        const digitPattern = '\\b\\d{1,2}\\b';
                        const sequels = [];
                        const seen = new Set();
                        db.forEach(d => {
                            try {
                                if (!d || !d.title) return;
                                const cand = normalizeText(d.title || d.originalTitle || '');
                                if (!cand) return;
                                if (cand === baseNorm) return; // skip exact same
                                // contains base (covers "Base 2", "Base: Subtitle")
                                if (cand.indexOf(baseNorm) !== -1) {
                                    if (!seen.has(d.id)) { sequels.push(d); seen.add(d.id); }
                                    return;
                                }
                                // "Base II" or "Base 2" style matches
                                const pattern = new RegExp('^' + baseNorm.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&') + '(?:[\\s:\\-–—]+(?:' + romanPattern + '|' + digitPattern + ')).*$', 'i');
                                if (pattern.test(d.title || '')) {
                                    if (!seen.has(d.id)) { sequels.push(d); seen.add(d.id); }
                                    return;
                                }
                                // suffix matches like "(Year)" or " - Subtitle" where base appears at start
                                const altPattern = new RegExp('^' + baseNorm.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&') + '[\\s:\\-–—].*', 'i');
                                if (altPattern.test(cand)) {
                                    if (!seen.has(d.id)) { sequels.push(d); seen.add(d.id); }
                                    return;
                                }
                            } catch (_) {}
                        });
                        return sequels;
                    }

                    let results = [];
                    if (exactMatch) {
                        // include the exact match first
                        results.push(exactMatch);
                        try {
                            const baseNorm = (normalizeText(exactMatch.title || exactMatch.originalTitle || exactMatch.id || ''));
                            const sequels = findSequels(baseNorm);
                            // append sequels (deduplicated) so user sees the original plus follow-ups
                            sequels.forEach(s => {
                                if (!results.find(r => r.id === s.id)) results.push(s);
                            });
                            // also include items that share clear tags (e.g., explicit franchise/tag) up to 8 total
                            if (results.length < 8 && exactMatch.tags && exactMatch.tags.length) {
                                const tagSet = new Set((exactMatch.tags||[]).map(t=>String(t||'').toLowerCase()));
                                db.forEach(d => {
                                    if (results.length >= 8) return;
                                    if (d.id === exactMatch.id) return;
                                    try {
                                        const dtags = (d.tags||[]).map(t=>String(t||'').toLowerCase());
                                        if (dtags.some(t => tagSet.has(t)) && !results.find(r=>r.id===d.id)) results.push(d);
                                    } catch(_) {}
                                });
                            }
                        } catch (_) {}
                    } else {
                        // Fuzzy / broad search: preserve previous tolerant behavior but slightly more forgiving:
                        // - ignore accents/case/spaces via normalizeText
                        // - token-wise fuzzy matching with ~30% tolerance per token
                        results = db.filter(item => {
                            try {
                                const title = normalizeText(item.title || item.originalTitle || '');
                                const category = normalizeText(item.category || '');
                                // direct contains match on normalized strings (ignores accents and punctuation)
                                if (title.includes(nQuery) || category.includes(nQuery)) return true;

                                // allow small typos: compute token-wise distance; accept if small relative to token length
                                const qTokens = nQuery.split(/\s+/).filter(Boolean);
                                const tTokens = title.split(/\s+/).filter(Boolean);
                                for (let qt of qTokens) {
                                    for (let tt of tTokens) {
                                        const dist = levenshtein(qt, tt);
                                        const maxAllowed = Math.max(1, Math.floor(tt.length * 0.30)); // allow ~30% char typos (min 1)
                                        if (dist <= maxAllowed) return true;
                                    }
                                }

                                // also allow partial starts (user typed beginning of a token)
                                for (let qt of qTokens) {
                                    if (tTokens.some(tt => tt.startsWith(qt))) return true;
                                }

                                return false;
                            } catch (e) { return false; }
                        });
                    }

                    // Render results
                    container.innerHTML = `
                        <div class="pt-24 md:pt-32 px-6 md:px-16 min-h-screen animate-fade-in">
                            
                            <!-- Mobile Search Input (Visible only on mobile) -->
                            <div class="relative w-full mb-8 md:hidden">
                                <i class="ph ph-magnifying-glass absolute left-4 top-1/2 -translate-y-1/2 text-white/50 text-xl"></i>
                                <input type="text" id="mobile-search" placeholder="Buscar filmes e séries..." class="w-full bg-surface border border-white/10 rounded-full py-3.5 pl-12 pr-4 text-white focus:outline-none focus:border-accent transition-colors placeholder:text-white/30 text-sm" oninput="handleSearch(this.value)" value="${state.searchQuery}" autofocus>
                            </div>

                            <h1 class="text-2xl md:text-3xl font-display font-bold text-white mb-2">Busca</h1>
                            <p class="text-white/50 text-sm mb-8">Resultados para "${state.searchQuery}"</p>
                            
                            ${results.length === 0 ? `
                                <div class="flex flex-col items-center justify-center py-20 text-center">
                                    <i class="ph ph-magnifying-glass text-4xl text-white/20 mb-4"></i>
                                    <h2 class="text-lg font-medium text-white mb-1">Nenhum resultado</h2>
                                    <p class="text-white/50 text-sm">Tente buscar por outro título ou gênero.</p>
                                </div>
                            ` : `
                                <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6" id="search-grid"></div>
                            `}
                        </div>
                    `;
                    
                    if(results.length > 0) render16by9CatalogCards(results, document.getElementById('search-grid'));
                }

                // Focus mobile input if it's rendered
                const mInput = document.getElementById('mobile-search');
                if (mInput && window.innerWidth < 768 && !state.searchQuery) mInput.focus();

            } else if (state.tab === 'home') {
                const continueItems = getContinueWatching().filter(it => {
                    try {
                        // If the continue-watching entry has a history object with null/invalid season/episode/id, drop it
                        if (!it || !it._hist) return true;
                        const h = it._hist;
                        if (h.s == null || h.e == null) return false;
                        // require a stable episode id (epId) to be present and non-empty
                        if (!h.epId || String(h.epId).trim() === '') return false;
                        return true;
                    } catch (e) {
                        return true;
                    }
                });

                // Record series ids that currently appear in Continue Watching (persisted set), used to avoid cross-series progress contamination.
                try {
                    function _readSeenSeriesSet() {
                        try { return JSON.parse(localStorage.getItem('lumina_seen_continue_series_v1') || '[]'); } catch (_) { return []; }
                    }
                    function _writeSeenSeriesSet(arr) {
                        try { localStorage.setItem('lumina_seen_continue_series_v1', JSON.stringify(Array.from(new Set(arr || [])))); } catch (_) {}
                    }
                    function recordContinueSeries(items) {
                        try {
                            if (!Array.isArray(items)) return;
                            const existing = _readSeenSeriesSet();
                            items.forEach(it => {
                                try { if (it && it.type === 'serie' && it.id) existing.push(it.id); } catch(_) {}
                            });
                            _writeSeenSeriesSet(existing);
                        } catch (_) {}
                    }
                    // call to persist current continue list
                    try { recordContinueSeries(continueItems); } catch(_) {}
                } catch(_) {}
                const heroItem = db[heroIndex] || db[0]; 
                
                let html = `
                    <div class="relative w-full h-[75vh] md:h-[85vh] flex items-end pb-12 md:pb-24 pt-32 px-6 md:px-16 animate-fade-in group cursor-pointer" onclick="openDetails('${heroItem.id}')">
                        <div class="absolute inset-0 bg-surface">
                            <img loading="lazy" decoding="async" data-db-cover="1" src="${heroItem.cover}" class="w-full h-full object-cover opacity-50 hero-cover-no-scale" onload="this.classList.add('loaded')">
                            <div class="absolute inset-0 fade-right"></div>
                            <div class="absolute inset-0 fade-bottom"></div>
                        </div>
                        
                        <div class="relative z-10 w-full max-w-2xl">
                            <span class="inline-block px-3 py-1 mb-4 text-[10px] font-bold tracking-widest uppercase text-black bg-white rounded-sm">${heroItem.type === 'serie' ? 'Série' : 'Filme'}</span>
                            <h1 class="font-display text-4xl md:text-6xl font-bold text-white mb-4 leading-tight">${heroItem.title}</h1>
                            <p class="text-white/60 text-sm mb-3"></p>
                            <p class="text-white/70 text-sm md:text-base mb-8 line-clamp-3 md:line-clamp-none max-w-xl">${heroItem.description}</p>
                            
                            <div class="flex items-center gap-3">
                                <button onclick="event.stopPropagation(); openDetails('${heroItem.id}')" class="bg-white text-black px-8 py-3.5 rounded-full font-semibold text-sm hover:bg-gray-200 transition-colors flex items-center gap-2">
                                    <i class="ph-fill ph-play text-lg"></i> Detalhes
                                </button>
                                <button onclick="toggleFav(event, '${heroItem.id}')" class="w-12 h-12 rounded-full glass flex items-center justify-center text-white hover:bg-white/10 transition-colors">
                                    <i class="${state.favorites.includes(heroItem.id) ? 'ph-fill ph-check text-accent' : 'ph ph-plus'} text-xl"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                `;

                if(continueItems.length > 0) {
                    html += `
                        <div class="px-6 md:px-16 -mt-10 relative z-20 mb-12 animate-slide-up session-wrap" style="animation-delay: 0.1s">
                            <div class="flex items-center justify-between mb-4">
                                <h2 class="text-lg font-display font-medium text-white">Continuar Assistindo</h2>
                                <!-- mobile toggle omitted for continue (always open on mobile) -->
                            </div>

                            <div class="relative">
                                <button class="session-arrow left" aria-label="scroll-left" onclick="scrollCards('continue-grid', -1)">
                                    <i class="ph ph-caret-left text-2xl"></i>
                                </button>
                                <div id="continue-grid" class="session-scroll hide-scroll session-body"></div>
                                <button class="session-arrow right" aria-label="scroll-right" onclick="scrollCards('continue-grid', 1)">
                                    <i class="ph ph-caret-right text-2xl"></i>
                                </button>
                            </div>

                        </div>
                    `;
                }

                html += `
                    <div class="px-6 md:px-16 relative z-20 mb-20 animate-slide-up session-wrap ${window.innerWidth <= 767 ? 'mobile-collapsed' : ''}" style="animation-delay: 0.2s" id="section-trends">
                        <div class="flex items-center justify-between mb-4">
                            <h2 class="text-lg font-display font-medium text-white">Tendências</h2>
                            <!-- mobile toggle button -->
                            <button class="mobile-toggle-btn md:hidden" onclick="toggleSectionMobile('section-trends')">
                                <i class="ph ph-caret-down text-white/60"></i>
                                <span class="text-white/70 text-sm">Abrir</span>
                            </button>
                        </div>

                        <div class="relative session-body">
                            <button class="session-arrow left" aria-label="trends-left" onclick="scrollCards('catalog-grid', -1)">
                                <i class="ph ph-caret-left text-2xl"></i>
                            </button>
                            <div id="catalog-grid" class="session-scroll grid-auto-fit"></div>
                            <button class="session-arrow right" aria-label="trends-right" onclick="scrollCards('catalog-grid', 1)">
                                <i class="ph ph-caret-right text-2xl"></i>
                            </button>
                        </div>
                    </div>
                `;

                container.innerHTML = html;

                if(continueItems.length > 0) renderContinueCards(continueItems, document.getElementById('continue-grid'));
                render16by9CatalogCards(db, document.getElementById('catalog-grid'));

                // Inject additional curated sessions below Trends (Novidades, Comédias, Recomendados)
                insertAdditionalSections();

            } else if (state.tab === 'favorites') {
                const favData = db.filter(item => state.favorites.includes(item.id));
                container.innerHTML = `
                    <div class="pt-24 md:pt-32 px-6 md:px-16 min-h-screen animate-fade-in">
                        <h1 class="text-2xl md:text-3xl font-display font-bold text-white mb-8">Minha Lista</h1>
                        ${favData.length === 0 ? `
                            <div class="flex flex-col items-center justify-center py-20 text-center">
                                <div class="w-20 h-20 rounded-full glass flex items-center justify-center mb-6">
                                    <i class="ph ph-bookmark-simple text-3xl text-white/30"></i>
                                </div>
                                <h2 class="text-xl font-medium text-white mb-2">Sua lista está vazia</h2>
                                <p class="text-white/50 text-sm">Adicione filmes e séries para assistir mais tarde.</p>
                            </div>
                        ` : `
                            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6" id="fav-grid"></div>
                        `}
                    </div>
                `;
                if(favData.length > 0) render16by9CatalogCards(favData, document.getElementById('fav-grid'));
            }
        }

        function getContinueWatching() {
            // Return a stable, deterministic list of items the user actually started watching.
            // Rules:
            //  - Only include films/episodes with a reliable progress record (time >= 2s) OR explicit embed marker.
            //  - Do not treat entries as "watched" just because duration exists; require an explicit completed flag if caller set it.
            //  - For series prefer an explicit history entry (most-recent episode) and fall back to per-episode progress only when it clearly indicates started playback.
            const items = [];
            const now = Date.now();

            // Helper: decide if a per-item progress is meaningful to surface
            // Raised threshold to 5s to avoid false positives where very short/erroneous progress marks episodes as "continue watching".
            const meaningfulProgress = (prog) => {
                if (!prog || typeof prog !== 'object') return false;
                // Embed markers are meaningful (iframe/embedded player started)
                if (prog.embed === true) return true;
                // Must have a numeric time (seconds) and be beyond a small threshold to avoid false positives
                // Increased from 2s -> 5s to prevent transient/erroneous marks for newly added DB entries.
                if (typeof prog.time === 'number' && prog.time >= 5) {
                    // If duration is known, require that time is at least 5s and not equal to duration (avoid auto-complete)
                    if (typeof prog.duration === 'number' && prog.duration > 0) {
                        // treat as meaningful if not essentially at EOF; small epsilon for safety
                        return prog.time < (prog.duration - 3) || Math.abs(prog.time - prog.duration) > 0.5;
                    }
                    return true;
                }
                return false;
            };

            // Films: only surface when film progress is meaningful
            try {
                db.forEach(i => {
                    if (!i || i.type !== 'filme') return;
                    const key = (i.id_ep && String(i.id_ep).trim()) ? i.id_ep : (i.id || null);
                    if (!key) return;
                    const prog = state.progress && state.progress[key] ? state.progress[key] : null;
                    if (!prog) return;
                    if (!meaningfulProgress(prog)) return;
                    const safeProg = Object.assign({}, prog);
                    safeProg.timestamp = Number(safeProg.timestamp) || now;
                    items.push(Object.assign({}, i, { _prog: safeProg }));
                });
            } catch (e) {
                // defensive: ignore film pass errors
            }

            // Series: prefer explicit history entry (most-recent watched ep); include only if history timestamp or episode progress meaningful
            try {
                db.forEach(series => {
                    if (!series || series.type !== 'serie') return;
                    const hist = (state.history && state.history[series.id]) ? state.history[series.id] : null;
                    if (hist && hist.timestamp) {
                        // if history points to an episode id that has meaningful progress, prefer that progress record
                        const progFromHist = (hist.epId && state.progress && state.progress[hist.epId]) ? state.progress[hist.epId] : null;
                        const safeProg = progFromHist && meaningfulProgress(progFromHist)
                            ? Object.assign({}, progFromHist, { timestamp: Number(progFromHist.timestamp) || Number(hist.timestamp) || now })
                            : { timestamp: Number(hist.timestamp) || now, embed: !!(progFromHist && progFromHist.embed) };
                        items.push(Object.assign({}, series, { _prog: safeProg, _hist: hist }));
                        return;
                    }

                    // No explicit history entry: scan for any per-episode progress that clearly indicates a started episode
                    try {
                        const seasonKeys = Object.keys(series.seasons || {});
                        let found = null;
                        for (const s of seasonKeys) {
                            const eps = Array.isArray(series.seasons[s]) ? series.seasons[s] : [];
                            for (let idx = 0; idx < eps.length; idx++) {
                                const ep = eps[idx];
                                if (!ep) continue;
                                // stable episode id fallback if ep.id missing
                                const epId = window.getStableEpId(series.id, s, idx, ep);
                                const prog = (state.progress && state.progress[epId]) ? state.progress[epId] : null;
                                if (!prog) continue;
                                if (meaningfulProgress(prog)) {
                                    found = { epId, prog: Object.assign({}, prog) };
                                    break;
                                }
                            }
                            if (found) break;
                        }
                        if (found) {
                            found.prog.timestamp = Number(found.prog.timestamp) || now;
                            items.push(Object.assign({}, series, { _prog: found.prog, _hist: { s: null, e: null, epId: found.epId, timestamp: found.prog.timestamp } }));
                        }
                    } catch (inner) {
                        // ignore per-series scanning errors
                    }
                });
            } catch (e) {
                // ignore series pass errors
            }

            // Sort deterministically by timestamp desc; items without timestamp treated as oldest
            items.sort((a, b) => {
                const ta = (a._prog && Number(a._prog.timestamp)) || 0;
                const tb = (b._prog && Number(b._prog.timestamp)) || 0;
                if (tb === ta) {
                    // tie-breaker: prefer series over films (so continuing shows stays prominent), then title alphabetical
                    const taType = a.type || '';
                    const tbType = b.type || '';
                    if (taType !== tbType) return (tbType === 'serie') ? 1 : -1;
                    const aTitle = (a.title || '').toLowerCase();
                    const bTitle = (b.title || '').toLowerCase();
                    return aTitle < bTitle ? -1 : (aTitle > bTitle ? 1 : 0);
                }
                return tb - ta;
            });

            return items;
        }

        // Reset any episode-level progress for a given series if that series has never been in Continue Watching
        // or is not currently present in Continue Watching (use persisted "seen" set to decide).
        function resetSeriesProgressIfNotSeen(seriesId) {
            try {
                if (!seriesId) return false;
                // read persisted set
                const seen = (function() { try { return JSON.parse(localStorage.getItem('lumina_seen_continue_series_v1') || '[]'); } catch (_) { return []; } })();
                // If seriesId is in seen set, do nothing
                if (Array.isArray(seen) && seen.indexOf(seriesId) !== -1) return false;
                // Also consider current continue watching list: if present now, do nothing
                const currentContinue = getContinueWatching();
                if (Array.isArray(currentContinue) && currentContinue.find(i => i && i.id === seriesId)) return false;

                // Otherwise, iterate DB episodes for that series and remove progress entries that look like episode progress
                const series = (window.db || []).find(s => s && s.id === seriesId);
                if (!series || !series.seasons) return false;
                Object.keys(series.seasons || {}).forEach(seasonKey => {
                    const eps = series.seasons[seasonKey] || [];
                    for (let idx = 0; idx < eps.length; idx++) {
                        try {
                            const ep = eps[idx];
                            const stableId = (ep && ep.id && String(ep.id).trim()) ? ep.id : `${seriesId}-s${seasonKey}-e${idx}`;
                            const prog = state.progress && state.progress[stableId];
                            if (prog) {
                                // Only remove progress entries that indicate playback (time > 2s or embed flag)
                                const t = Number(prog.time || 0);
                                const embedFlag = prog.embed === true;
                                if (embedFlag || t > 2) {
                                    try { delete state.progress[stableId]; } catch(_) {}
                                }
                            }
                        } catch (_) {}
                    }
                });

                // persist trimmed progress and return true to indicate action taken
                try { flushProgressNow(); } catch (_) { saveProgressData(); }
                return true;
            } catch (e) { return false; }
        }

        // Hook: when opening a details page for a series, enforce reset if it was never/now not in Continue Watching.
        // This ensures no stray watched flags exist for series a user never actually started.
        const __origOpenDetails = window.openDetails;
        window.openDetails = function(id) {
            try {
                // find series entry
                const item = (window.db || []).find(d => d && d.id === id);
                if (item && item.type === 'serie') {
                    // If this series is neither currently in continue nor previously seen, clear any watched markers
                    try { resetSeriesProgressIfNotSeen(id); } catch(_) {}
                }
            } catch (_) {}
            // call original behavior
            try { return __origOpenDetails && __origOpenDetails(id); } catch (e) { try { __origOpenDetails(id); } catch(_) {} }
        };

        function getAgeBadge(rating) {
            let color = 'bg-surface text-white border border-white/10';
            if(rating === 'L') color = 'bg-green-600/20 text-green-400 border border-green-600/30';
            if(rating === '10') color = 'bg-blue-600/20 text-blue-400 border border-blue-600/30';
            if(rating === '12') color = 'bg-yellow-600/20 text-yellow-400 border border-yellow-600/30';
            if(rating === '14') color = 'bg-orange-600/20 text-orange-400 border border-orange-600/30';
            if (rating === 'A6') color = 'badge-a6'; // A6 = não recomendado para menores de 6 anos
            if(['16','18'].includes(rating)) color = 'bg-red-600/20 text-red-400 border border-red-600/30';
            return `<span class="${color} text-[10px] font-bold px-1.5 py-0.5 rounded-sm">${rating}</span>`;
        }

        // Tag appearance probability: each tag has a 25% chance to be hidden when rendering cards,
        // creating a subtle dynamic effect where tags sometimes appear/disappear.
        // Use a per-render pseudo-random decision (no persistent seed) so flipping feels dynamic.
        function tagShouldShow(tag) {
            try {
                if (!tag) return false;
                // 25% chance to hide => show when random >= 0.25
                return Math.random() >= 0.25;
            } catch (e) {
                return true;
            }
        }

        // Format category strings: replace commas with " / " and normalize multiple separators
        function formatCategory(cat) {
            try {
                if (!cat) return '';
                // replace commas and multiple separators with a single " / ", trim whitespace
                return String(cat)
                    .replace(/\s*,\s*/g, ' / ')
                    .replace(/\s*\/\s*/g, ' / ')
                    .replace(/\s*&\s*/g, ' / ')
                    .replace(/\s+,\s+/g, ' / ')
                    .replace(/\s+/g, ' ')
                    .replace(/\s*\/\s*/g, ' / ')
                    .trim();
            } catch (e) { return String(cat || ''); }
        }

        // Horizontal Scroll Cards for "Continue Watching"
        function renderContinueCards(data, container) {
            data.forEach(item => {
                const card = document.createElement('div');
                card.className = 'w-64 md:w-80 shrink-0 hover-card cursor-pointer group';
                card.onclick = () => openDetails(item.id);
                
                // defensive: handle missing _prog or duration to avoid NaN and ensure visible fraction is correct
                const progTime = item._prog && typeof item._prog.time === 'number' ? item._prog.time : 0;
                const progDur = item._prog && typeof item._prog.duration === 'number' ? item._prog.duration : 0;
                const pct = progDur > 0 ? Math.min(100, (progTime / progDur) * 100) : (progTime > 0 ? 2 : 0);
                const subtitle = item._hist ? `T${item._hist.s} : E${item._hist.e+1}` : 'Continuar filme';

                card.innerHTML = `
                    <div class="aspect-video relative rounded-xl overflow-hidden bg-surface mb-3 border border-white/5">
                        <img src="${item.cover}" class="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-500" onload="this.classList.add('loaded')">
                        <div class="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors"></div>
                        <div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <div class="w-12 h-12 rounded-full glass flex items-center justify-center text-white shadow-lg transform scale-75 group-hover:scale-100 transition-all duration-300">
                                <i class="ph-fill ph-play text-xl ml-0.5"></i>
                            </div>
                        </div>
                        <div class="absolute bottom-0 left-0 w-full h-1 bg-white/10 z-20">
                            <div class="h-full bg-accent" style="width: ${pct}%"></div>
                        </div>
                    </div>
                    <div class="px-1">
                        <h3 class="text-white font-medium text-sm truncate">${item.title}</h3>
                        <p class="text-white/50 text-[11px] mt-0.5">${subtitle}</p>
                    </div>
                `;
                container.appendChild(card);
            });
        }

        // Grid 16:9 Cards for Catalog & Search
        function render16by9CatalogCards(data, container) {
            data.forEach(item => {
                const card = document.createElement('div');
                card.className = 'hover-card cursor-pointer group relative';
                card.onclick = () => openDetails(item.id);
                
                card.innerHTML = `
                    <div class="aspect-video relative rounded-xl md:rounded-2xl overflow-hidden bg-surface mb-3 border border-white/5">
                        <img loading="lazy" decoding="async" data-db-cover="1" src="${item.cover}" class="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-500" onload="this.classList.add('loaded')">
                        <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        
                        <!-- Play Icon Hover -->
                        <div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <div class="w-12 h-12 rounded-full glass flex items-center justify-center text-white shadow-lg transform scale-75 group-hover:scale-100 transition-all duration-300">
                                <i class="ph-fill ph-play text-xl ml-0.5"></i>
                            </div>
                        </div>
                    </div>
                    <div class="px-1">
                        <h3 class="text-white font-medium text-sm truncate">${item.title}</h3>
                        <div class="flex items-center gap-2 mt-0.5">
                            ${getAgeBadge(item.ageRating)}
                            <p class="text-white/40 text-[11px] truncate">${formatCategory(item.category)}</p>
                        </div>
                    </div>
                `;
                container.appendChild(card);
            });
        }

        function toggleFav(event, id) {
            try {
                event && event.stopPropagation && event.stopPropagation();
            } catch(_) {}
            try {
                const index = state.favorites.indexOf(id);
                const becameRemoved = index > -1;
                if (becameRemoved) state.favorites.splice(index, 1);
                else state.favorites.push(id);
            } catch (e) {
                // guard: ensure favorites is always an array
                state.favorites = state.favorites && Array.isArray(state.favorites) ? state.favorites : [];
                if (!state.favorites.includes(id)) state.favorites.push(id);
            }

            // Immediate persistent write with quota-safe fallback and flush to progress/history as well.
            try {
                // Write favorites
                try { localStorage.setItem('lumina_v2_favs', JSON.stringify(state.favorites)); } catch (err) {
                    try { localStorage.removeItem('lumina_v2_favs'); localStorage.setItem('lumina_v2_favs', JSON.stringify(state.favorites)); } catch (_) {}
                }
                // Also trigger an immediate progress/history flush to ensure correlated UI state persists
                try { flushProgressNow(); } catch (_) { try { saveProgressData(); } catch(_) {} }
            } catch (_) {}

            // Visual feedback: animate the button(s)
            const animateButton = (btn) => {
                try {
                    if(!btn) return;
                    btn.classList.remove('pop-anim');
                    // force reflow to restart animation
                    void btn.offsetWidth;
                    btn.classList.add('pop-anim');
                    setTimeout(() => btn.classList.remove('pop-anim'), 420);
                } catch(_) {}
            };

            // Update any fav button inside details modal if open
            try {
                const modal = document.getElementById('details-modal');
                const isFavNow = state.favorites.includes(id);
                if (modal && !modal.classList.contains('hidden')) {
                    const favBtn = document.getElementById(`fav-btn-${id}`);
                    if (favBtn) {
                        favBtn.innerHTML = `<i class="${isFavNow ? 'ph-fill ph-check text-accent' : 'ph ph-plus'} text-xl"></i>`;
                        animateButton(favBtn);
                    }
                }

                // Also update global UI quick-controls where present
                const existBtns = document.querySelectorAll(`#fav-btn-${id}`);
                existBtns.forEach(b => {
                    try { b.innerHTML = `<i class="${state.favorites.includes(id) ? 'ph-fill ph-check text-accent' : 'ph ph-plus'} text-xl"></i>`; animateButton(b); } catch(_) {}
                });

                // Re-render view small-scope to reflect favorites change immediately
                try {
                    if (!modal || modal.classList.contains('hidden')) {
                        // light refresh: if we're on favorites tab, re-render; else update lists minimally
                        if (state.tab === 'favorites') renderView();
                        else {
                            // update small areas: fav-grid and any visible cards with matching id
                            const favGrid = document.getElementById('fav-grid');
                            if (favGrid) {
                                favGrid.innerHTML = '';
                                const favData = db.filter(item => state.favorites.includes(item.id));
                                render16by9CatalogCards(favData, favGrid);
                            }
                        }
                    }
                } catch (_) {}
            } catch (_) {}
        }

        // --- SHARE VIA QUERY STRING ---
        function buildShareLinkForContext(itemId, context = {}) {
            // create a human-friendly slug for sharing (prefer explicit id; fall back to normalized title)
            const normalize = (s) => {
                if (!s) return '';
                return String(s).toLowerCase()
                    .normalize('NFKD').replace(/[\u0300-\u036f]/g, '') // remove diacritics
                    .replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
            };

            try {
                const base = window.location.origin + window.location.pathname;
                const url = new URL(base);

                // prefer original id (if looks like a good slug), otherwise normalize title-like strings
                const raw = String(itemId || '');
                const candidate = raw.length > 0 && /^[a-z0-9\-\_]+$/i.test(raw) ? raw : normalize(raw);
                // if itemId equals a DB id, use it; otherwise attempt to map to DB title
                let finalSlug = candidate;
                try {
                    const found = db.find(i => i.id === raw || normalize(i.id) === normalize(raw) || normalize(i.title) === normalize(raw) || normalize(i.originalTitle) === normalize(raw));
                    if (found && found.id) finalSlug = found.id;
                } catch(_) {}

                url.searchParams.set('share', finalSlug);

                if (context && typeof context.season !== 'undefined' && context.season !== null) url.searchParams.set('s', String(context.season));
                if (context && typeof context.episode !== 'undefined' && context.episode !== null) url.searchParams.set('e', String(context.episode));
                // Friendly URL - do not encode unnecessary characters in the slug
                return url.toString();
            } catch (e) {
                try {
                    const url = new URL(window.location.href);
                    url.searchParams.set('share', String(itemId));
                    if (context.season != null) url.searchParams.set('s', String(context.season));
                    if (context.episode != null) url.searchParams.set('e', String(context.episode));
                    return url.toString();
                } catch (_) {
                    return window.location.href;
                }
            }
        }

        async function copyToClipboard(text) {
            try {
                if (navigator.clipboard && navigator.clipboard.writeText) {
                    await navigator.clipboard.writeText(text);
                    return true;
                } else {
                    // fallback
                    const ta = document.createElement('textarea');
                    ta.value = text; ta.style.position = 'fixed'; ta.style.left = '-9999px';
                    document.body.appendChild(ta); ta.select();
                    document.execCommand('copy'); ta.remove();
                    return true;
                }
            } catch (e) {
                return false;
            }
        }

        function shareItemById(id, context = {}) {
            const link = buildShareLinkForContext(id, context);

            // Prefer native share dialog when available; share only the URL (no title/text)
            if (navigator.share) {
                try {
                    navigator.share({ url: link }).then(() => {
                        try { history.replaceState(null, '', link); } catch(_) {}
                    }).catch(async () => {
                        // on failure or cancel, silently copy the link to clipboard and give minimal button feedback
                        const ok = await copyToClipboard(link);
                        const btn = document.getElementById(`share-btn-${id}`);
                        if (ok && btn) {
                            const prev = btn.innerHTML;
                            btn.innerText = 'Copiado!';
                            setTimeout(() => { if (btn) btn.innerHTML = prev; }, 1400);
                        }
                        try { history.replaceState(null, '', link); } catch(_) {}
                    });
                } catch (e) {
                    // fallback: attempt to copy the link to clipboard (no alerts or modals)
                    copyToClipboard(link).then(ok => {
                        const btn = document.getElementById(`share-btn-${id}`);
                        if (ok && btn) {
                            const prev = btn.innerHTML;
                            btn.innerText = 'Copiado!';
                            setTimeout(() => { if (btn) btn.innerHTML = prev; }, 1400);
                        }
                        try { history.replaceState(null, '', link); } catch(_) {}
                    });
                }
            } else {
                // If Web Share API not available, just copy link to clipboard silently and show minimal button feedback
                copyToClipboard(link).then(ok => {
                    const btn = document.getElementById(`share-btn-${id}`);
                    if (ok && btn) {
                        const prev = btn.innerHTML;
                        btn.innerText = 'Copiado!';
                        setTimeout(() => { if (btn) btn.innerHTML = prev; }, 1400);
                    }
                    try { history.replaceState(null, '', link); } catch(_) {}
                });
            }
        }



        // on app init, check for share query and open corresponding details (supports s/e for series)
        function handleSharedQuery() {
            try {
                const params = new URLSearchParams(window.location.search || window.location.hash.replace('#','?'));
                const shareRaw = params.get('share');
                if (!shareRaw) return;

                const shareId = decodeURIComponent(String(shareRaw)).trim();

                // Normalization helper to compare slugs/titles
                const normalize = (s) => {
                    if (!s) return '';
                    return String(s).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
                };

                // Try direct id match first (most common)
                let item = db.find(i => i.id === shareId);

                // If not found, try normalized-id (in case user passed title or slight variant)
                if (!item) {
                    const normTarget = normalize(shareId);
                    item = db.find(i => normalize(i.id) === normTarget || normalize(i.title) === normTarget || normalize(i.originalTitle) === normTarget);
                }

                if (!item) return;

                // If season/episode query present, apply to history so details modal shows correct "continuar" and selection
                const sRaw = params.get('s'), eRaw = params.get('e');
                const s = sRaw != null ? parseInt(sRaw, 10) : null;
                const e = eRaw != null ? parseInt(eRaw, 10) : null;

                if (item.type === 'serie' && s !== null && !isNaN(s) && e !== null && !isNaN(e)) {
                    const seasonArr = item.seasons && item.seasons[s] ? item.seasons[s] : [];
                    const ep = seasonArr[e] || seasonArr[0] || null;
                    // ensure a stable episode id even when source lacks an explicit id (use seriesId-s{season}-e{episode})
                    const epId = ep && ep.id ? ep.id : (ep ? `${item.id}-s${s}-e${e}` : null);
                    state.history[item.id] = { s: s, e: e, epId: epId, timestamp: Date.now() };
                }

                // Ensure UI is ready: open home and then details; small delay to let initial render finish
                switchTab('home', false);
                setTimeout(() => {
                    try { openDetails(item.id); } catch (err) { /* silent */ }
                }, 250);

                // Remove share query parameters after a short delay so the URL becomes normal (user asked for 2s)
                setTimeout(() => {
                    try {
                        const cur = new URL(window.location.href);
                        cur.searchParams.delete('share');
                        cur.searchParams.delete('s');
                        cur.searchParams.delete('e');
                        const newPath = cur.pathname + (cur.search && cur.search !== '?' ? cur.search : '');
                        history.replaceState(null, '', newPath);
                    } catch (e) { /* silent */ }
                }, 2000);
            } catch (e) { /* fail silently */ }
        }



        // --- DETAILS MODAL ---
        // Render a compact "Relacionados" section inside the details modal for the given item object.
        function renderRelatedItems(item) {
            try {
                if (!item || !item.id) return;
                // Do not render the related/recommendations block for series pages (keep series details focused)
                if (item.type === 'serie') return;
                const container = document.getElementById('details-content');
                if (!container) return;

                // Remove any previous related section for this item
                const prev = document.getElementById(`related-section-${item.id}`);
                if (prev) prev.remove();

                // Build candidates: same category tokens and shared tags (exclude the current item)
                const normalize = s => (String(s || '').toLowerCase());
                const categoryTokens = (item.category || '').split(/[,\/]| e | & /i).map(t => normalize(t).trim()).filter(Boolean);
                const tagSet = new Set((item.tags || []).map(t => normalize(t)));

                // Try to detect sequels explicitly: look for other items whose title/originalTitle contains the current title
                const baseTitle = (item.title || item.originalTitle || '').replace(/[^a-z0-9\s]/ig, '').trim().toLowerCase();
                const potentialSequels = db.filter(d => {
                    if (!d || !d.id || d.id === item.id) return false;
                    const t = ((d.title || '') + ' ' + (d.originalTitle || '')).toLowerCase();
                    // match "Base Title 2", "Base Title II", "Base Title: The Sequel", or "Base Title (Year)" heuristics
                    if (baseTitle && t.indexOf(baseTitle) !== -1 && t !== baseTitle) return true;
                    return false;
                });

                // Fallback: build scored candidate list by category/tag similarity and rating
                const scored = db
                    .filter(d => d && d.id && d.id !== item.id && d.title)
                    .map(d => {
                        let score = 0;
                        try {
                            const dCats = (d.category || '').toLowerCase();
                            categoryTokens.forEach(t => { if (t && dCats.includes(t)) score += 3; });
                            (d.tags || []).forEach(t => { if (t && tagSet.has(normalize(t))) score += 2; });
                            if (d.ratings && d.ratings.imdb) score += Math.min(4, Math.floor((d.ratings.imdb || 0) / 2));
                        } catch (_) {}
                        return { item: d, score: score || 1 };
                    });

                // Sort scored candidates descending
                scored.sort((a,b) => b.score - a.score);

                // Build final candidates: place explicit sequels first (de-duplicated), then top scored items up to 8 total
                const seqIds = new Set();
                potentialSequels.forEach(s => { if (s && s.id) seqIds.add(s.id); });
                const candidates = [];

                // push sequels first preserving original order
                for (const s of potentialSequels) {
                    if (candidates.length >= 8) break;
                    if (s && s.id && s.cover) candidates.push(s);
                }

                // then fill from scored list skipping duplicates
                for (const s of scored) {
                    if (candidates.length >= 8) break;
                    if (!s || !s.item) continue;
                    if (s.item.id === item.id) continue;
                    if (candidates.find(c => c.id === s.item.id)) continue;
                    if (!s.item.cover) continue;
                    candidates.push(s.item);
                }

                if (!candidates || candidates.length === 0) return;

                // Create related block using responsive behavior: horizontal scroller on mobile to avoid overlap, grid on desktop
                const wrap = document.createElement('div');
                wrap.id = `related-section-${item.id}`;
                // smaller top margin on mobile (mt-4) and original spacing on md+ (md:mt-8)
                wrap.className = 'px-6 md:px-16 mt-4 md:mt-8 mb-12 session-wrap';
                wrap.innerHTML = `
                    <div class="flex items-center justify-between mb-4">
                        <h3 class="font-display text-lg font-medium text-white">Relacionados</h3>
                        <!-- hide this helper text on small screens -->
                        <span class="hidden md:inline text-white/60 text-sm">Sugestões parecidas com ${item.title}</span>
                    </div>

                    <div class="relative">
                        <button class="session-arrow left md:hidden" aria-label="related-left-${item.id}" onclick="(function(){ const el=document.getElementById('related-grid-${item.id}'); if(el) el.scrollBy({left:-Math.max(240, el.clientWidth*0.7), behavior:'smooth'}); })()">
                            <i class="ph ph-caret-left text-2xl"></i>
                        </button>

                        <div id="related-grid-${item.id}" class="session-scroll hide-scroll flex gap-3" role="list"></div>

                        <button class="session-arrow right md:hidden" aria-label="related-right-${item.id}" onclick="(function(){ const el=document.getElementById('related-grid-${item.id}'); if(el) el.scrollBy({left:Math.max(240, el.clientWidth*0.7), behavior:'smooth'}); })()">
                            <i class="ph ph-caret-right text-2xl"></i>
                        </button>
                    </div>
                `;

                // Insert the related block immediately before the episodes container (so on mobile it appears closer to the play button);
                // if episodes container isn't present, append at the end as before.
                const episodesContainer = document.getElementById(`episodes-container-${item.id}`);
                if (episodesContainer && episodesContainer.parentNode) {
                    // insert before the episodes parent so the related cards sit directly above the episodes list
                    episodesContainer.parentNode.parentNode.insertBefore(wrap, episodesContainer.parentNode);
                } else {
                    container.appendChild(wrap);
                }

                // Choose layout based on viewport width: mobile => horizontal scroller, desktop => responsive grid
                const grid = document.getElementById(`related-grid-${item.id}`);
                if (!grid) return;

                const isMobile = window.innerWidth <= 767;

                if (isMobile) {
                    // horizontal scroller: use existing session-scroll styles for touch-friendly swipe
                    grid.className = 'session-scroll hide-scroll flex gap-3';
                    // render as compact session-card items for consistent layout and non-overlapping stacking
                    candidates.forEach(c => {
                        try {
                            const card = document.createElement('div');
                            card.className = 'w-56 shrink-0 hover-card cursor-pointer group session-card';
                            card.onclick = () => openDetails(c.id);
                            const cover = c.cover || 'fiveicon.png';
                            const imgOnError = `this.onerror=null;this.src='fiveicon.png';this.classList.add('loaded');`;
                            card.innerHTML = `
                                <div class="aspect-video relative rounded-xl overflow-hidden bg-surface mb-3 border border-white/5">
                                    <img loading="lazy" decoding="async" data-db-cover="1" src="${cover}" onerror="${imgOnError}" class="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-500" onload="this.classList.add('loaded')">
                                    <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                </div>
                                <div class="px-1">
                                    <h3 class="text-white font-medium text-sm truncate">${c.title}</h3>
                                    <div class="flex items-center gap-2 mt-1">
                                        ${getAgeBadge(c.ageRating)}
                                        <p class="text-white/40 text-[11px] truncate">${formatCategory(c.category)}</p>
                                    </div>
                                </div>
                            `;
                            grid.appendChild(card);
                        } catch (_) {}
                    });
                } else {
                    // Desktop/tablet: use grid layout with up to 4 columns
                    grid.className = 'grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3';
                    try {
                        render16by9CatalogCards(candidates, grid);
                    } catch (err) {
                        // fallback minimal render
                        candidates.forEach(c => {
                            try {
                                const card = document.createElement('div');
                                card.className = 'cursor-pointer group session-card';
                                card.onclick = () => openDetails(c.id);
                                const cover = c.cover || 'fiveicon.png';
                                card.innerHTML = `
                                    <div class="aspect-video relative rounded-xl overflow-hidden bg-surface mb-3 border border-white/5">
                                        <img loading="lazy" decoding="async" data-db-cover="1" src="${cover}" class="w-full h-full object-cover opacity-85 group-hover:scale-105 transition-transform duration-400" onload="this.classList.add('loaded')">
                                        <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                    </div>
                                    <div class="mt-2">
                                        <h4 class="text-white text-sm font-medium truncate">${c.title}</h4>
                                        <p class="text-white/50 text-xs truncate mt-0.5">${c.year || ''} • ${c.type || ''}</p>
                                    </div>
                                `;
                                grid.appendChild(card);
                            } catch(_) {}
                        });
                    }
                }

                // Ensure no overlapping by forcing repaint and setting accessible attributes
                try {
                    grid.setAttribute('role', 'list');
                    Array.from(grid.children || []).forEach(ch => ch.setAttribute('role', 'listitem'));
                    // small reflow to prevent overlapping in some mobile engines
                    void grid.offsetHeight;
                } catch (_) {}
            } catch (e) {
                // non-blocking: ignore related render failures
                console.warn('renderRelatedItems failed', e);
            }
        }

        function openDetails(id) {
            const item = db.find(i => i.id === id);
            if (!item) return;
            // Pause home session rotation while details modal is open to avoid background DOM work
            try { stopHomeRotator(); } catch (e) {}

            // Ensure main viewport and content are at the top when opening details (use immediate jump to avoid race conditions)
            try {
                // Robust immediate scroll-to-top for document
                try { window.scrollTo(0, 0); } catch (_) {}
                try { document.documentElement.scrollTop = 0; } catch (_) {}
                try { document.body.scrollTop = 0; } catch (_) {}

                // If the main content container exists, ensure it is scrolled to top and is visible
                const mc = document.getElementById('main-content');
                if (mc) {
                    try { mc.scrollTop = 0; } catch (_) {}
                    try { mc.scrollTo && mc.scrollTo({ top: 0, behavior: 'auto' }); } catch (_) {}
                    // also bring the container into view for embedded contexts
                    try { mc.scrollIntoView && mc.scrollIntoView({ behavior: 'auto', block: 'start' }); } catch (_) {}
                } else {
                    // fallback: ensure document root at top
                    try { window.scrollTo(0, 0); } catch (_) {}
                }
            } catch (_) {}

            const modal = document.getElementById('details-modal');
            const content = document.getElementById('details-content');
            const isFav = state.favorites.includes(id);

            let playBtnLogic = '';
            let playBtnText = 'Assistir';
            let progressPct = 0;
            
            // prepare play parameters as real variables (avoid executing string-built code)
            let urlToPlay = '';
            let titleToPlay = '';
            let ctxObj = null;

            if (item.type === 'filme') {
                // some films use id_ep while others use id — use id_ep if present, otherwise fallback to item.id
                const filmKey = item.id_ep || item.id;
                const prog = state.progress[filmKey];
                // Treat completed markers as resumable: if a film was previously marked completed we show "Continuar" and preserve progress
                if (prog && (prog.completed === true || (prog.time > 5 && prog.time < prog.duration - 5))) {
                    playBtnText = 'Continuar';
                    // prefer showing 100% when explicitly completed; otherwise compute percentage safely
                    if (prog.completed && prog.duration) progressPct = 100;
                    else if (prog && prog.duration) progressPct = (prog.time / prog.duration) * 100;
                    else progressPct = (prog && prog.time) ? Math.min(100, (prog.time / (prog.duration || prog.time || 1)) * 100) : 0;
                }
                // For films adapt: if link is not direct video then pass it as embed
                urlToPlay = item.url;
                titleToPlay = item.title;
                // ensure the context uses the same key that saveProgressData and player use
                // ensure we always have a stable id for progress storage: prefer filmKey, otherwise derive from URL
                ctxObj = { type: 'filme', id: filmKey || ('url:' + encodeURIComponent(item.url || '')), trigger: 0, url: item.url };
            } else {
                const hist = state.history[item.id];
                let sToPlay = hist ? hist.s : '1';
                let eToPlay = hist ? hist.e : 0;
                // ensure season and episode exist safely
                const seasonArr = item.seasons && item.seasons[sToPlay] ? item.seasons[sToPlay] : [];
                const ep = seasonArr[eToPlay] || seasonArr[0] || { id: '', title: '', url: '' };

                const prog = state.progress[ep.id];
                if(prog && prog.time > 5 && prog.time < prog.duration - 5) progressPct = (prog.time / prog.duration) * 100;
                if(hist) playBtnText = `Continuar T${sToPlay}:E${eToPlay+1}`;

                const nextE = (seasonArr && eToPlay + 1 < seasonArr.length) ? seasonArr[eToPlay+1] : null;
                const nextContext = nextE && nextE.url ? { url: nextE.url, title: `T${sToPlay}:E${eToPlay+2} - ${nextE.title}`, s: sToPlay, e: eToPlay+1 } : null;
                urlToPlay = ep.url;
                titleToPlay = `T${sToPlay}:E${eToPlay+1} - ${ep.title}`;
                // if episode lacks an explicit id (some entries are empty), fall back to a URL-derived key so progress is tracked
                // prefer explicit id; if missing create stable generated id so embedded/mp4 episodes use consistent keys
                let baseEpId = (ep && ep.id && String(ep.id).trim()) ? ep.id : `s${sToPlay}-e${eToPlay}`;
                // Garante que o ID da série sempre faça parte do ID do episódio
                const stableEpId = baseEpId.includes(item.id) ? baseEpId : `${item.id}-${baseEpId}`;
                ctxObj = { 
                    type: 'serie',
                    seriesId: item.id,
                    seriesTitle: item.title,
                    season: sToPlay,
                    episode: eToPlay,
                    id: stableEpId,
                    trigger: item.nextEpisodeTrigger || 0,
                    nextEp: nextContext,
                    url: ep.url,
                    // include subtitles from episode metadata so the player can attach them
                    subtitles: (ep && Array.isArray(ep.subtitles)) ? ep.subtitles : [],
                    // pass intro metadata (if present) so the player can show skip button for the full intro window
                    introStart: (ep && typeof ep.introStart !== 'undefined') ? Number(ep.introStart) : 0,
                    introDuration: (ep && typeof ep.introDuration !== 'undefined') ? Number(ep.introDuration) : 0
                };
            }

            // Build metadata mapping for details pages (keeps db untouched; adds production/distribution/studio/rights where provided)
            const metaMap = {
                'espiritos-na-escola': { production: 'AwesomenessTV', distribution: 'Paramount+', studio: 'CBS Studios', original: 'School Spirits (2023)' },
                'diario-banana-1': { creator: 'Jeff Kinney', franchiseRights: 'Wimpy Kid, Inc.', linkedTo: 'The Walt Disney Company' },
                'diario-banana-2': { creator: 'Jeff Kinney', franchiseRights: 'Wimpy Kid, Inc.', linkedTo: 'The Walt Disney Company' },
                'diario-banana-3': { creator: 'Jeff Kinney', franchiseRights: 'Wimpy Kid, Inc.', linkedTo: 'The Walt Disney Company' },
                'stranger-things': { productionAndRights: 'Netflix' },
                'divertida-mente-1': { production: 'Pixar Animation Studios', property: 'The Walt Disney Company' },
                'divertida-mente-2': { production: 'Pixar Animation Studios', property: 'The Walt Disney Company' },
                'luca': { production: 'Pixar Animation Studios', property: 'The Walt Disney Company' },
                'soul': { production: 'Pixar Animation Studios', property: 'The Walt Disney Company' },
                'super-mario-2023': { production: 'Illumination', brandRights: 'Nintendo', distribution: 'Universal Pictures' },
                'heartstopper': { source: 'Obra de Alice Oseman', productionAndDistribution: 'Netflix' },
                'jujutsu-execucao': { mangaPublisher: 'Shueisha', animeStudio: 'MAPPA' },
                'fnaf-nightmare': { franchiseCreator: 'Scott Cawthon', production: 'Blumhouse Productions', distribution: 'Universal Pictures' },
                'fnaf-2': { franchiseCreator: 'Scott Cawthon', production: 'Blumhouse Productions', distribution: 'Universal Pictures' },
                'spider-verse-pt': { production: 'Sony Pictures', characterOwner: 'Marvel Entertainment' },
                'spiderman-far-from-home-pt': { production: 'Sony Pictures', characterOwner: 'Marvel Entertainment' },
                'topgun-maverick': { productionAndDistribution: 'Paramount Pictures' },
                'outer-banks': { productionAndRights: 'Netflix' },
                'south-park-panderverso': { production: 'MTV Entertainment Studios', distribution: 'Paramount+' }
            };

            const meta = metaMap[item.id] || {};
            const buildMetaHtml = () => {
                const lines = [];
                if (meta.original) lines.push(`<div class="text-xs text-white/50 mb-1"><strong>Original:</strong> ${meta.original}</div>`);
                if (meta.production) lines.push(`<div class="text-xs text-white/50 mb-1"><strong>Produção:</strong> ${meta.production}</div>`);
                if (meta.productionAndRights) lines.push(`<div class="text-xs text-white/50 mb-1"><strong>Produção/Direitos:</strong> ${meta.productionAndRights}</div>`);
                if (meta.distribution) lines.push(`<div class="text-xs text-white/50 mb-1"><strong>Distribuição:</strong> ${meta.distribution}</div>`);
                if (meta.studio) lines.push(`<div class="text-xs text-white/50 mb-1"><strong>Estúdio responsável:</strong> ${meta.studio}</div>`);
                if (meta.brandRights) lines.push(`<div class="text-xs text-white/50 mb-1"><strong>Direitos da marca:</strong> ${meta.brandRights}</div>`);
                if (meta.franchiseRights) lines.push(`<div class="text-xs text-white/50 mb-1"><strong>Direitos da franquia:</strong> ${meta.franchiseRights}</div>`);
                if (meta.creator) lines.push(`<div class="text-xs text-white/50 mb-1"><strong>Obra criada por:</strong> ${meta.creator}</div>`);
                if (meta.linkedTo) lines.push(`<div class="text-xs text-white/50 mb-1"><strong>Ligado a:</strong> ${meta.linkedTo}</div>`);
                if (meta.productionAndDistribution) lines.push(`<div class="text-xs text-white/50 mb-1"><strong>Produção/Distribuição:</strong> ${meta.productionAndDistribution}</div>`);
                if (meta.source) lines.push(`<div class="text-xs text-white/50 mb-1"><strong>Fonte:</strong> ${meta.source}</div>`);
                if (meta.mangaPublisher) lines.push(`<div class="text-xs text-white/50 mb-1"><strong>Mangá publicado por:</strong> ${meta.mangaPublisher}</div>`);
                if (meta.animeStudio) lines.push(`<div class="text-xs text-white/50 mb-1"><strong>Anime produzido por:</strong> ${meta.animeStudio}</div>`);
                if (meta.franchiseCreator) lines.push(`<div class="text-xs text-white/50 mb-1"><strong>Franquia criada por:</strong> ${meta.franchiseCreator}</div>`);
                if (meta.property) lines.push(`<div class="text-xs text-white/50 mb-1"><strong>Propriedade:</strong> ${meta.property}</div>`);
                if (meta.characterOwner) lines.push(`<div class="text-xs text-white/50 mb-1"><strong>Personagem pertence a:</strong> ${meta.characterOwner}</div>`);
                return lines.join('');
            };

            // Build meta HTML: include known metaMap entries AND any credits/production fields present on the item itself
            const metaHtml = (() => {
                const lines = [];
                // include mapped meta first (keeps curated info)
                if (meta.original) lines.push(`<div class="text-xs text-white/50 mb-1"><strong>Original:</strong> ${meta.original}</div>`);
                if (meta.production) lines.push(`<div class="text-xs text-white/50 mb-1"><strong>Produção:</strong> ${meta.production}</div>`);
                if (meta.productionAndRights) lines.push(`<div class="text-xs text-white/50 mb-1"><strong>Produção/Direitos:</strong> ${meta.productionAndRights}</div>`);
                if (meta.distribution) lines.push(`<div class="text-xs text-white/50 mb-1"><strong>Distribuição:</strong> ${meta.distribution}</div>`);
                if (meta.studio) lines.push(`<div class="text-xs text-white/50 mb-1"><strong>Estúdio responsável:</strong> ${meta.studio}</div>`);
                if (meta.brandRights) lines.push(`<div class="text-xs text-white/50 mb-1"><strong>Direitos da marca:</strong> ${meta.brandRights}</div>`);
                if (meta.franchiseRights) lines.push(`<div class="text-xs text-white/50 mb-1"><strong>Direitos da franquia:</strong> ${meta.franchiseRights}</div>`);
                if (meta.creator) lines.push(`<div class="text-xs text-white/50 mb-1"><strong>Obra criada por:</strong> ${meta.creator}</div>`);
                if (meta.linkedTo) lines.push(`<div class="text-xs text-white/50 mb-1"><strong>Ligado a:</strong> ${meta.linkedTo}</div>`);
                if (meta.productionAndDistribution) lines.push(`<div class="text-xs text-white/50 mb-1"><strong>Produção/Distribuição:</strong> ${meta.productionAndDistribution}</div>`);
                if (meta.source) lines.push(`<div class="text-xs text-white/50 mb-1"><strong>Fonte:</strong> ${meta.source}</div>`);
                if (meta.mangaPublisher) lines.push(`<div class="text-xs text-white/50 mb-1"><strong>Mangá publicado por:</strong> ${meta.mangaPublisher}</div>`);
                if (meta.animeStudio) lines.push(`<div class="text-xs text-white/50 mb-1"><strong>Anime produzido por:</strong> ${meta.animeStudio}</div>`);
                if (meta.franchiseCreator) lines.push(`<div class="text-xs text-white/50 mb-1"><strong>Franquia criada por:</strong> ${meta.franchiseCreator}</div>`);
                if (meta.property) lines.push(`<div class="text-xs text-white/50 mb-1"><strong>Propriedade:</strong> ${meta.property}</div>`);
                if (meta.characterOwner) lines.push(`<div class="text-xs text-white/50 mb-1"><strong>Personagem pertence a:</strong> ${meta.characterOwner}</div>`);

                // Now include any explicit fields present on the item (credits/producer/distributor/cast/director)
                if (item.production) lines.push(`<div class="text-xs text-white/50 mb-1"><strong>Produção:</strong> ${item.production}</div>`);
                if (item.producer) lines.push(`<div class="text-xs text-white/50 mb-1"><strong>Produtor(es):</strong> ${Array.isArray(item.producer) ? item.producer.join(', ') : item.producer}</div>`);
                if (item.distributor) lines.push(`<div class="text-xs text-white/50 mb-1"><strong>Distribuidora:</strong> ${item.distributor}</div>`);
                if (item.productionNote) lines.push(`<div class="text-xs text-white/50 mb-1"><strong>Nota de produção:</strong> ${item.productionNote}</div>`);
                if (item.director) lines.push(`<div class="text-xs text-white/50 mb-1"><strong>Direção:</strong> ${Array.isArray(item.director) ? item.director.join(', ') : item.director}</div>`);
                if (item.writer) lines.push(`<div class="text-xs text-white/50 mb-1"><strong>Roteiro:</strong> ${Array.isArray(item.writer) ? item.writer.join(', ') : item.writer}</div>`);
                if (item.cast && Array.isArray(item.cast) && item.cast.length) lines.push(`<div class="text-xs text-white/50 mb-1"><strong>Elenco:</strong> ${item.cast.join(', ')}</div>`);
                if (item.rights) lines.push(`<div class="text-xs text-white/50 mb-1"><strong>Direitos:</strong> ${item.rights}</div>`);

                return lines.join('');
            })();

            // Build an optional "Veja na ..." button for films and series, and compute a mobile-friendly shortened category display.
            let externalBtnHtml = '';
            let displayCategory = '';
            try {
                const isMobileView = (typeof window !== 'undefined' && window.innerWidth <= 767);
                // mobile: show only the first genre (no " / ..."), desktop: full formatted category
                const fullCat = formatCategory(item.category);
                const firstGenre = String(fullCat || '').split(' / ')[0] || '';
                displayCategory = isMobileView ? (firstGenre || '') : fullCat;

                // Build "Veja na ..." for both films and series when an external link exists
                if (item.type === 'filme' || item.type === 'serie') {
                    const link = window.externalLinks && window.externalLinks[item.id];
                    if (link) {
                        const detectService = (u) => {
                            try {
                                const l = (u || '').toLowerCase();
                                if (l.includes('netflix.com')) return 'Netflix';
                                if (l.includes('primevideo') || l.includes('primevideo.com')) return 'Prime Video';
                                if (l.includes('disneyplus') || l.includes('disneyplus.com')) return 'Disney+';
                                if (l.includes('globoplay')) return 'Globoplay';
                                if (l.includes('paramountplus') || l.includes('paramountplus.com')) return 'Paramount+';
                                if (l.includes('youtube.com') || l.includes('youtu.be')) return 'YouTube';
                                if (l.includes('hbomax') || l.includes('hbomax.com')) return 'HBO Max';
                                if (l.includes('crunchyroll')) return 'Crunchyroll';
                                try { return new URL(u).hostname.replace('www.',''); } catch(_) { return 'Plataforma'; }
                            } catch (_) { return 'Plataforma'; }
                        };
                        const svc = detectService(link);

                        // choose correct preposition: use 'no' for YouTube (masculine), 'na' for others by default (HBO Max stays 'na')
                        const preposition = svc === 'YouTube' ? 'no' : 'na';

                        // Mobile: provide a larger, touch-friendly full-width pill below the title for easier tapping
                        if (isMobileView) {
                            // For YouTube we want "Veja no YouTube", for HBO Max "Veja na HBO Max", others default to "Veja na X"
                            const label = svc === 'YouTube' ? `Veja no ${svc}` : `Veja na ${svc}`;
                            externalBtnHtml = `<a href="${link}" target="_blank" rel="noopener noreferrer" onclick="event.stopPropagation();" class="w-full block mt-3 text-center text-sm font-semibold px-4 py-3 rounded-xl bg-gradient-to-r from-accent to-purple-400 text-black hover:opacity-95 transition-colors">${label}</a>`;
                        } else {
                            // Desktop: compact inline pill
                            const label = svc === 'YouTube' ? `Veja no ${svc}` : `Veja na ${svc}`;
                            externalBtnHtml = `<a href="${link}" target="_blank" rel="noopener noreferrer" onclick="event.stopPropagation();" class="ml-3 text-sm md:ml-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/8 text-[#9f7aea] transition-colors"><span>${label}</span><i class="ph ph-arrow-up-right text-xs"></i></a>`;
                        }
                    }
                } else {
                    externalBtnHtml = '';
                }
            } catch (err) {
                externalBtnHtml = '';
                displayCategory = formatCategory(item.category);
            }

            content.innerHTML = `
                <button id="close-details-btn" class="fixed top-6 right-6 z-[100] w-10 h-10 rounded-full glass flex items-center justify-center text-white hover:bg-white/10 transition-colors">
                    <i class="ph ph-x text-lg"></i>
                </button>

                <div class="relative w-full h-[60vh] bg-surface">
                    <img loading="lazy" decoding="async" data-db-cover="1" src="${item.cover}" class="absolute inset-0 w-full h-full object-cover opacity-50 hero-cover-no-scale" onload="this.classList.add('loaded')">
                    <div class="absolute inset-0 fade-bottom"></div>
                </div>

                <!-- Info block: on desktop keep it in-flow (relative) to avoid overlay clipping/position bugs; mobile still stacks -->
                <div class="md:relative md:bottom-auto md:left-auto md:w-full md:p-16 p-6 relative z-10">
                    <div class="max-w-3xl md:mx-16 animate-slide-up bg-transparent">
                        <h1 class="font-display text-4xl md:text-5xl font-bold text-white mb-3">${item.title}</h1>
                        
                        <div class="flex items-center gap-3 text-sm font-medium text-white/60 mb-6">
                            ${getAgeBadge(item.ageRating)}
                            <span>${item.year}</span>
                            <span>•</span>
                            <span>${displayCategory}</span>
                            <!-- place "Veja na ..." next to the genre for both filmes and series on mobile/desktop -->
                            ${externalBtnHtml ? `<span class="ml-2 hidden md:inline">${externalBtnHtml}</span><span class="md:hidden ml-2">${externalBtnHtml}</span>` : ''}
                        </div>

                        <p class="text-white/80 text-sm md:text-base leading-relaxed mb-4 font-light">${item.description}</p>

                        ${metaHtml ? `<div class="mb-6 p-3 rounded-lg bg-black/30 border border-white/5">${metaHtml}</div>` : ''}

                        <div class="flex items-center gap-4">
                            <button id="play-btn-${item.id}" class="bg-white text-black px-8 py-3 rounded-full font-semibold text-sm hover:bg-gray-200 transition-colors flex items-center gap-2 relative overflow-hidden group">
                                <i class="ph-fill ph-play text-lg"></i> ${playBtnText}
                                ${progressPct > 0 ? `
                                    <div class="absolute bottom-0 left-0 h-1 bg-black/20 w-full">
                                        <div class="h-full bg-accent" style="width: ${progressPct}%"></div>
                                    </div>
                                ` : ''}
                            </button>
                            <button id="fav-btn-${item.id}" onclick="toggleFav(event, '${item.id}')" class="w-12 h-12 rounded-full glass flex items-center justify-center text-white hover:bg-white/10 transition-colors">
                                <i class="${isFav ? 'ph-fill ph-check text-accent' : 'ph ph-plus'} text-xl"></i>
                            </button>
                            <button id="share-btn-${item.id}" class="w-12 h-12 rounded-full glass flex items-center justify-center text-white hover:bg-white/10 transition-colors" title="Compartilhar">
                                <i class="ph ph-share-network text-xl"></i>
                            </button>
                            <!-- Mobile-only: toggle global orientation prompt on/off (saves to localStorage; applies to all items) -->

                        </div>
                    </div>
                </div>

                <div class="px-6 md:px-16 pt-8 max-w-5xl mx-auto">
                    ${item.type === 'serie' ? generateSeasonsHTML(item) : '<div class="h-20"></div>'}
                </div>
            `;

            // ensure details content scrolls to top when opened
            try { const detailsEl = document.getElementById('details-content'); if (detailsEl) detailsEl.scrollTo({ top: 0, behavior: 'auto' }); } catch(e) { if (detailsEl) detailsEl.scrollTop = 0; }
            // attach close handler safely using doom
            const closeBtn = doom(`#close-details-btn`);
            if (closeBtn) closeBtn.onclick = closeDetails;

            // Ensure the favorite button in the details modal reliably calls toggleFav (avoid relying on inline onclick)
            try {
                const favBtnEl = doom(`#fav-btn-${item.id}`);
                if (favBtnEl) {
                    // Remove any inline handler to avoid duplication and attach a robust listener
                    try { favBtnEl.removeAttribute && favBtnEl.removeAttribute('onclick'); } catch(_) {}
                    favBtnEl.addEventListener('click', function(ev){
                        try { ev && ev.stopPropagation && ev.stopPropagation(); } catch(_) {}
                        try { toggleFav && toggleFav(ev, item.id); } catch (_) {}
                    }, { passive: true });
                }
            } catch (e) {}

            // attach play handler lazily (only exposing the url when user clicks)
            const playBtn = doom(`#play-btn-${item.id}`);
            if (playBtn) {
                playBtn.addEventListener('click', (ev) => {
                    ev.stopPropagation();
                    try {
                        // call requestPlay using the prepared variables (closure) to avoid string-eval issues
                        if (typeof urlToPlay === 'string' && urlToPlay.trim() !== '') {
                            requestPlay(urlToPlay, titleToPlay || item.title, ctxObj);
                        }
                    } catch (e) { /* safe guard */ }
                });
            }

            // attach share handler programmatically to avoid inline JS referencing local "item" in global scope
            try {
                const shareBtn = doom(`#share-btn-${item.id}`);
                if (shareBtn) {
                    shareBtn.onclick = (ev) => {
                        ev.stopPropagation();
                        // use real runtime values (avoid string-template placeholders)
                        const histLocal = state.history[item.id];
                        if (item.type === 'serie' && histLocal) {
                            shareItemById(item.id, { season: histLocal.s, episode: histLocal.e });
                        } else {
                            shareItemById(item.id);
                        }
                    };
                }
            } catch(e) { /* silent */ }

            // Orientation toggle (mobile-only) - global setting persisted and applied to all items
            try {
                const orientBtn = doom(`#orient-toggle-${item.id}`);
                if (orientBtn) {
                    const renderState = () => {
                        const disabled = getOrientationDisabled();
                        orientBtn.innerHTML = disabled
                            ? `<i class="ph-fill ph-device-mobile text-accent text-lg"></i>`
                            : `<i class="ph ph-device-mobile text-white text-lg"></i>`;
                        // Clarify that the toggle disables BOTH orientation prompts (landscape and portrait)
                        orientBtn.title = disabled ? 'Ajustes de orientação desativados (paisagem + retrato)' : 'Ajustes de orientação ativados (paisagem + retrato)';
                    };
                    renderState();
                    orientBtn.onclick = (ev) => {
                        ev.stopPropagation();
                        const now = !getOrientationDisabled();
                        setOrientationDisabled(now);
                        renderState();
                        // small visual feedback
                        orientBtn.classList.remove('pop-anim');
                        void orientBtn.offsetWidth;
                        orientBtn.classList.add('pop-anim');
                        // re-render views so other UI updates reflect change
                        renderView();
                    };
                }
            } catch(e) { /* silent */ }

            document.body.style.overflow = 'hidden';
            // make modal visible
            modal.classList.remove('hidden');

            // reset scroll positions so the modal content always opens at its top (title, cover and play button visible)
            try { modal.scrollTop = 0; } catch(_) {}
            try {
                const dc = document.getElementById('details-content');
                if (dc) {
                    // ensure content scrolled to top and focused (helps in some embed/iframe contexts)
                    try { dc.scrollTop = 0; } catch(_) {}
                    try { dc.scrollTo && dc.scrollTo({ top: 0, behavior: 'auto' }); } catch(_) {}
                    try { dc.focus && dc.focus(); } catch(_) {}
                }
            } catch(_) {}

            requestAnimationFrame(() => {
                modal.classList.remove('opacity-0');
                // final safety: bring the details-content to the start of the viewport
                try { const dc = document.getElementById('details-content'); if (dc) dc.scrollIntoView && dc.scrollIntoView({ behavior: 'auto', block: 'start' }); } catch(_) {}
            });

            // Render a Related section under the details UI (non-blocking)
            try {
                // Attempt to find the item object (safe guard) and then render related items
                const itemObj = db.find(d => d && d.id === id);
                if (itemObj) {
                    // slight delay to ensure details DOM nodes are present and stable
                    setTimeout(() => {
                        try { renderRelatedItems(itemObj); } catch(_) {}
                    }, 120);
                }
            } catch (_) {}
        }

        // --- FUNÇÕES DE CONTROLE DO CARROSSEL ---
        window.selectSeasonCard = function(idx) {
            if(window.activeSeasonIdx === idx) {
                const seasonName = window.seasonKeys[idx];
                loadSeason(window.currentSeriesId, seasonName);
                return;
            }
            window.activeSeasonIdx = idx;
            updateSeasonUI();
        };

        window.navigateSeason = function(dir) {
            if(dir === -1) {
                window.activeSeasonIdx = window.activeSeasonIdx > 0 ? window.activeSeasonIdx - 1 : window.totalSeasons - 1;
            } else {
                window.activeSeasonIdx = window.activeSeasonIdx < window.totalSeasons - 1 ? window.activeSeasonIdx + 1 : 0;
            }
            updateSeasonUI();
        };

        window.updateSeasonUI = function() {
            const total = window.totalSeasons;
            for(let i = 0; i < total; i++) {
                const card = document.getElementById(`season-card-${i}`);
                const dot = document.getElementById(`season-dot-${i}`);
                if(!card) continue;

                const textEl = card.querySelector('h2');
                const indicator = card.querySelector('.indicator-text');

                let pos = 'hidden';
                let offset = window.innerWidth < 768 ? 90 : 65;
                let dirMult = 0;
                
                if (i === window.activeSeasonIdx) {
                    pos = 'center';
                } else if (i === (window.activeSeasonIdx - 1 + total) % total && total > 1) {
                    pos = 'left'; dirMult = -1;
                } else if (i === (window.activeSeasonIdx + 1) % total && total > 1) {
                    pos = 'right'; dirMult = 1;
                }

                if (pos === 'center') {
                    card.style.transform = 'translateX(0) scale(1.06)';
                    card.style.zIndex = '30';
                    card.style.opacity = '1';
                    card.style.filter = 'blur(0px)';
                    card.classList.add('border-purple-500/50', 'card-active-shadow');
                    card.classList.remove('border-white/5');
                    if (indicator) indicator.style.opacity = '1';
                    if (textEl) { textEl.classList.add('text-purple-300', 'font-normal'); textEl.classList.remove('text-white/90', 'font-light'); }
                    if (dot) { dot.classList.remove('bg-white/20', 'w-1.5'); dot.classList.add('bg-purple-400', 'w-8', 'shadow-[0_0_12px_#a855f7]'); }
                } else if (pos === 'left' || pos === 'right') {
                    const rotation = dirMult * 2;
                    card.style.transform = `translateX(${dirMult * offset}%) scale(0.85) rotate(${rotation}deg)`;
                    card.style.zIndex = '10';
                    card.style.opacity = '0.35';
                    card.style.filter = 'blur(3px)';
                    card.classList.remove('border-purple-500/50', 'card-active-shadow');
                    card.classList.add('border-white/5');
                    if (indicator) indicator.style.opacity = '0';
                    if (textEl) { textEl.classList.remove('text-purple-300', 'font-normal'); textEl.classList.add('text-white/90', 'font-light'); }
                    if (dot) { dot.classList.add('bg-white/20', 'w-1.5'); dot.classList.remove('bg-purple-400', 'w-8', 'shadow-[0_0_12px_#a855f7]'); }
                } else {
                    card.style.transform = `translateX(0) scale(0.5)`;
                    card.style.zIndex = '0';
                    card.style.opacity = '0';
                    if (dot) { dot.classList.add('bg-white/20', 'w-1.5'); dot.classList.remove('bg-purple-400', 'w-8', 'shadow-[0_0_12px_#a855f7]'); }
                }
            }
        };



        function generateSeasonsHTML(item) {
            const seasonsList = Object.keys(item.seasons);
            const hist = state.history[item.id];
            const activeSeason = hist ? hist.s.toString() : seasonsList[0];
            
            // Estado Global para o carrossel
            window.currentSeriesId = item.id;
            window.totalSeasons = seasonsList.length;
            window.seasonKeys = seasonsList;
            window.activeSeasonIdx = seasonsList.indexOf(activeSeason) !== -1 ? seasonsList.indexOf(activeSeason) : 0;

            let cardsHTML = seasonsList.map((s, idx) => {
                // Pega a capa do primeiro episódio da temporada, se não tiver, usa a da série
                const epCapa = (item.seasons[s] && item.seasons[s][0] && item.seasons[s][0].cover) ? item.seasons[s][0].cover : item.cover;
                
                return `
                <div id="season-card-${idx}" onclick="(function(){ try { loadSeason('${item.id}', '${s}'); openEpisodesModal('${s}'); } catch(_){} })()" class="season-card absolute w-[82vw] max-w-[280px] md:max-w-[360px] aspect-[16/10] rounded-[2rem] glass-panel cursor-pointer transition-all duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)] flex flex-col items-center justify-end pb-8 overflow-hidden group border border-white/5" data-index="${idx}">
                    <div class="absolute inset-0 z-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105 opacity-60" style="background-image: url('${epCapa}');"></div>
                    <div class="absolute inset-0 z-10 bg-gradient-to-t from-[#09090b] via-[#09090b]/60 to-transparent"></div>
                    <div class="z-20 text-center px-4 flex flex-col items-center gap-2">
                        <h2 class="text-white/90 text-sm md:text-base font-light tracking-[0.3em] uppercase transition-colors duration-500 group-hover:text-white">Temporada ${s}</h2>
                        <span class="text-xs text-purple-300 opacity-0 transition-opacity duration-300 -translate-y-2 group-hover:translate-y-0 indicator-text font-medium tracking-wide"></span>
                    </div>
                </div>`;
            }).join('');

            let dotsHTML = seasonsList.map((s, idx) => {
                return `<span id="season-dot-${idx}" onclick="selectSeasonCard(${idx})" class="w-1.5 h-1.5 rounded-full bg-white/20 transition-all duration-500 cursor-pointer hover:bg-white/40"></span>`;
            }).join('');

            let html = `
            <div class="animate-fade-in pb-12" style="animation-delay: 0.2s">
                <div class="flex justify-between items-center mb-4">
                     <h3 class="font-display text-xl font-medium text-white">Temporadas</h3>
                </div>
                
                <div class="relative w-full h-[35vh] md:h-[40vh] flex flex-col justify-center items-center mt-2 mb-4" id="season-carousel-container">
                    ${seasonsList.length > 1 ? `
                    <button onclick="navigateSeason(-1)" aria-label="Temporada Anterior" class="glass-button absolute left-0 md:left-4 w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center text-white/70 z-40 active:scale-95 focus:outline-none">
                        <i class="ph ph-caret-left text-xl"></i>
                    </button>
                    <button onclick="navigateSeason(1)" aria-label="Próxima Temporada" class="glass-button absolute right-0 md:right-4 w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center text-white/70 z-40 active:scale-95 focus:outline-none">
                        <i class="ph ph-caret-right text-xl"></i>
                    </button>
                    ` : ''}

                    <div class="relative w-full h-full flex justify-center items-center overflow-hidden" id="season-cards-wrapper">
                        ${cardsHTML}
                    </div>
                </div>
                
                ${seasonsList.length > 1 ? `
                <div class="w-full flex flex-col items-center gap-4 z-10 mb-8">
                    <div class="flex items-center gap-3" id="season-dots-wrapper">
                        ${dotsHTML}
                    </div>
                </div>
                ` : '<div class="mb-8"></div>'}
            </div>
            `;

            setTimeout(() => { 
                updateSeasonUI(); 

                // Attach interactive behavior after DOM insertion: first click recenters a non-central card, second click (when it's centered) opens the modal.
                try {
                    const container = document.getElementById('season-cards-wrapper');
                    if (!container) return;
                    // bind handlers for each card by index
                    const cards = Array.from(container.querySelectorAll('[id^="season-card-"]'));
                    cards.forEach((card) => {
                        try {
                            const idxAttr = card.getAttribute('data-index');
                            const idx = (idxAttr !== null) ? Number(idxAttr) : parseInt((card.id || '').replace('season-card-',''), 10);
                            if (card.__lumina_season_bound) return;
                            card.__lumina_season_bound = true;
                            card.addEventListener('click', (ev) => {
                                try {
                                    ev && ev.stopPropagation && ev.stopPropagation();
                                    // If clicked card is already central -> open modal
                                    if (window.activeSeasonIdx === idx) {
                                        // open modal for this season only if central
                                        try { openEpisodesModal && openEpisodesModal(window.seasonKeys[idx]); } catch(_) {}
                                        return;
                                    }
                                    // Otherwise move this card to center (set active index and update UI smoothly)
                                    try {
                                        window.activeSeasonIdx = idx;
                                        updateSeasonUI && updateSeasonUI();
                                        // also trigger a small focus/tactile hint (pop animation) on the newly centered card
                                        try {
                                            card.style.transition = 'transform 420ms cubic-bezier(0.16,1,0.3,1), box-shadow 420ms';
                                            card.classList.add('card-active-shadow');
                                            setTimeout(() => { card.classList.remove('card-active-shadow'); }, 520);
                                        } catch(_) {}
                                    } catch(_) {}
                                } catch(_) {}
                            }, { passive: true });
                        } catch(_) {}
                    });
                } catch(_) {}
            }, 50);
            return html;
        }

        // Load episodes for a specific season on-demand; this reduces DB and memory pressure.
        function loadSeason(itemId, seasonNum) {
            const item = db.find(i => i.id === itemId);
            if (!item) return;
            const episodes = item.seasons[seasonNum] || [];
            const container = doom(`#episodes-container-${itemId}`);
            if(!container) return;

            // Build episode list lazily (images set with loading=lazy)
            container.innerHTML = episodes.map((ep, index) => {
                const isAvailable = ep.url && ep.url.trim() !== '';
                // use a stable episode id fallback when ep.id is missing so progress and history persist correctly
                const stableEpId = (ep && ep.id && String(ep.id).trim()) ? ep.id : (ep && ep.url ? `${item.id}-s${seasonNum}-e${index}` : `${item.id}-s${seasonNum}-e${index}`);
                const prog = state.progress[stableEpId];
                const pct = (prog && prog.duration) ? Math.min(100, (prog.time / prog.duration) * 100) : (prog && prog.time ? Math.min(100, (prog.time / (prog.time + 60)) * 100) : 0);
                
                const nextE = index + 1 < episodes.length ? episodes[index+1] : null;
                const nextContext = nextE && nextE.url ? { url: nextE.url, title: `T${seasonNum}:E${index+2} - ${nextE.title}`, s: seasonNum, e: index+1 } : null;
                const ctx = { type: 'serie', seriesId: item.id, seriesTitle: item.title, season: seasonNum, episode: index, id: stableEpId, trigger: item.nextEpisodeTrigger || 0, nextEp: nextContext, url: ep.url, introStart: ep.introStart || 0, introDuration: ep.introDuration || 0 };
                const ctxStr = JSON.stringify(ctx).replace(/"/g, '&quot;');
                const titleStr = `T${seasonNum}:E${index+1} - ${String(ep.title || '').replace(/'/g, "\\'")}`;

                return `
                    <div onclick="${isAvailable ? `requestPlay('${ep.url}', '${titleStr}', ${ctxStr})` : ''}" 
                         class="group flex gap-4 p-3 rounded-2xl transition-colors duration-300 ${isAvailable ? 'cursor-pointer hover:bg-elevated' : 'opacity-50'}">
                        
                        <div class="relative w-32 md:w-40 aspect-video rounded-xl overflow-hidden bg-surface shrink-0 border border-white/5">
                            <img loading="lazy" decoding="async" data-db-cover="1" data-src="${(ep && ep.cover) ? ep.cover : (item.cover || 'fiveicon.png')}" src="${(ep && ep.cover) ? ep.cover : (item.cover || 'fiveicon.png')}" onerror="this.onerror=null;this.src='fiveicon.png';this.classList.add('loaded');" class="w-full h-full object-cover opacity-70 group-hover:scale-105 transition-transform duration-500" onload="this.classList.add('loaded')">
                            <div class="absolute inset-0 flex items-center justify-center">
                                ${isAvailable ? `
                                    <div class="w-10 h-10 rounded-full glass flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity scale-90 group-hover:scale-100 shadow-md">
                                        <i class="ph-fill ph-play text-white"></i>
                                    </div>
                                ` : ''}
                            </div>
                            ${pct > 0 ? `
                                <div class="absolute bottom-0 left-0 w-full h-1 bg-black/40">
                                    <div class="h-full bg-accent" style="width: ${pct}%"></div>
                                </div>
                            ` : ''}
                        </div>
                        
                        <div class="flex flex-col justify-center py-1 flex-1 min-w-0">
                            <div class="flex justify-between items-start mb-1">
                                <h4 class="text-white font-medium text-sm md:text-base truncate pr-4">${index+1}. ${ep.title}</h4>
                                ${pct > 90 ? '<i class="ph-fill ph-check-circle text-white/30 text-lg"></i>' : ''}
                            </div>
                            <span class="text-xs text-white/40">Episódio ${index+1}</span>
                        </div>
                    </div>
                `;
            }).join('');
        }

        function changeSeason(itemId, seasonNum) {
            const item = db.find(i => i.id === itemId);
            const episodes = item.seasons[seasonNum];
            const container = document.getElementById('episodes-container');
            if(!container) return;

            container.innerHTML = episodes.map((ep, index) => {
                const isAvailable = ep.url && ep.url.trim() !== '';
                // stable id fallback so progress mapping works even when ep.id missing
                const stableEpId = (ep && ep.id && String(ep.id).trim()) ? ep.id : (ep && ep.url ? `${item.id}-s${seasonNum}-e${index}` : `${item.id}-s${seasonNum}-e${index}`);
                const prog = state.progress[stableEpId];
                const pct = (prog && prog.duration) ? Math.min(100, (prog.time / prog.duration) * 100) : (prog && prog.time ? Math.min(100, (prog.time / (prog.time + 60)) * 100) : 0);
                
                const nextE = index + 1 < episodes.length ? episodes[index+1] : null;
                const nextContext = nextE && nextE.url ? { url: nextE.url, title: `T${seasonNum}:E${index+2} - ${nextE.title}`, s: seasonNum, e: index+1 } : null;
                const ctx = { type: 'serie', seriesId: item.id, seriesTitle: item.title, season: seasonNum, episode: index, id: stableEpId, trigger: item.nextEpisodeTrigger || 0, nextEp: nextContext, url: ep.url, introStart: ep.introStart || 0, introDuration: ep.introDuration || 0 };
                const ctxStr = JSON.stringify(ctx).replace(/"/g, '&quot;');
                const titleStr = `T${seasonNum}:E${index+1} - ${String(ep.title || '').replace(/'/g, "\\'")}`;

                return `
                    <div onclick="${isAvailable ? `requestPlay('${ep.url}', '${titleStr}', ${ctxStr})` : ''}" 
                         class="group flex gap-4 p-3 rounded-2xl transition-colors duration-300 ${isAvailable ? 'cursor-pointer hover:bg-elevated' : 'opacity-50'}">
                        
                        <div class="relative w-32 md:w-40 aspect-video rounded-xl overflow-hidden bg-surface shrink-0 border border-white/5">
                            <img src="${ep.cover ? ep.cover : (item.cover || 'fiveicon.png')}" class="w-full h-full object-cover opacity-70 group-hover:scale-105 transition-transform duration-500" onload="this.classList.add('loaded')">
                            <div class="absolute inset-0 flex items-center justify-center">
                                ${isAvailable ? `
                                    <div class="w-10 h-10 rounded-full glass flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity scale-90 group-hover:scale-100 shadow-md">
                                        <i class="ph-fill ph-play text-white"></i>
                                    </div>
                                ` : ''}
                            </div>
                            ${pct > 0 ? `
                                <div class="absolute bottom-0 left-0 w-full h-1 bg-black/40">
                                    <div class="h-full bg-accent" style="width: ${pct}%"></div>
                                </div>
                            ` : ''}
                        </div>
                        
                        <div class="flex flex-col justify-center py-1 flex-1 min-w-0">
                            <div class="flex justify-between items-start mb-1">
                                <h4 class="text-white font-medium text-sm md:text-base truncate pr-4">${index+1}. ${ep.title}</h4>
                                ${pct > 90 ? '<i class="ph-fill ph-check-circle text-white/30 text-lg"></i>' : ''}
                            </div>
                            <span class="text-xs text-white/40">Episódio ${index+1}</span>
                        </div>
                    </div>
                `;
            }).join('');
        }

        function closeDetails() {
            const modal = document.getElementById('details-modal');
            if (!modal) return;
            // start hide transition
            modal.classList.add('opacity-0');

            // capture reference to content element outside try blocks so it's always defined in cleanup scope
            const content = document.getElementById('details-content');

            setTimeout(() => {
                try {
                    // hide modal
                    modal.classList.add('hidden');

                    // Unload details content and any attached listeners to free memory
                    if (content) {
                        try {
                            // Remove season select listeners if any
                            doomAll('select[id^="season-select-"]', content).forEach(s => { try { s.onchange = null; } catch(_) {} });
                        } catch(_) {}
                        try { content.innerHTML = ''; } catch(_) { content.textContent = ''; }
                    }

                    // Remove any pending references
                    state.pendingVideo = null;

                    // Attempt to flush progress/history safely
                    try {
                        if (window.player && typeof window.player.saveProgress === 'function') {
                            try { window.player.saveProgress(); } catch(_) {}
                        }
                        try { flushProgressNow(); } catch(_) {}
                    } catch (_) {}

                    // Resume home/session rotator after details modal closes to restart gentle background updates
                    try { startHomeRotator(); } catch (e) {}

                    // Re-render main view to refresh UI
                    try { renderView(); } catch(_) {}

                    // restore body scroll (only if no other modal is open)
                    try {
                        const playerModal = document.getElementById('player-modal');
                        if (playerModal && !playerModal.classList.contains('hidden')) {
                            // keep body overflow hidden if player still open
                        } else {
                            document.body.style.overflow = '';
                        }
                    } catch(_) { document.body.style.overflow = ''; }
                } catch (err) {
                    // best-effort fallback cleanup if anything throws
                    try { if (content) { content.innerHTML = ''; } } catch(_) {}
                    try { state.pendingVideo = null; } catch(_) {}
                    try { document.body.style.overflow = ''; } catch(_) {}
                    try { startHomeRotator(); } catch(_) {}
                }
            }, 500);
        }

        // --- PLAYER LOGIC (supports direct video files and embed URLs) ---
        function requestPlay(url, title, context) {
            // Fast path: open player immediately to reduce perceived latency, and perform any network probing asynchronously (non-blocking).
            try {
                if (window.__lumina_sanitized) {
                    showToast('Mídia removida por segurança. Recarregue a página para restaurar.');
                    return;
                }
            } catch (e) {}

            // Immediately open player to improve UX responsiveness
            try {
                openPlayer(url, title, context);
            } catch (e) {
                // fallback: still attempt openPlayer even on error
                try { openPlayer(url, title, context); } catch (_) {}
            }

            // Fire-and-forget background probe to warm CDN / primary sources and record diagnostics (will not block UI)
            (async () => {
                try {
                    const probeUrl = async (testUrl, timeoutMs = 7000) => {
                        if (!testUrl) return false;
                        try {
                            const controller = new AbortController();
                            const to = setTimeout(() => controller.abort(), timeoutMs);
                            const res = await fetch(testUrl, { method: 'GET', headers: { 'Range': 'bytes=0-65535' }, mode: 'cors', credentials: 'omit', cache: 'no-store', signal: controller.signal }).catch(() => null);
                            clearTimeout(to);
                            return !!res && (res.status === 206 || res.status === 200 || res.type === 'opaque');
                        } catch (e) { return false; }
                    };

                    // Try primary source if provided in context (non-blocking)
                    let primary = null;
                    try {
                        if (context && context.primaryUrl) primary = context.primaryUrl;
                        else if (context && context.type === 'serie' && context.seriesId) {
                            const series = db.find(d => d.id === context.seriesId);
                            if (series) {
                                const seasonArr = series.seasons && series.seasons[context.season] ? series.seasons[context.season] : [];
                                const ep = seasonArr[context.episode] || null;
                                if (ep && ep.primaryUrl) primary = ep.primaryUrl;
                            }
                        }
                    } catch (_) {}

                    if (primary) {
                        // warm primary quickly
                        await probeUrl(primary, 6000);
                    }
                    // also warm fallback URL (longer timeout for slow CDNs)
                    await probeUrl(url, 12000);
                } catch (_) {
                    // ignore background probe errors
                }
            })();

            // keep the existing orientation/modal behavior (non-blocking)

        }

                // orientation handlers removed

        /* Hide PiP & volume controls for non-.mp4/.m3u8 playback sources — allow HLS (.m3u8) to keep PiP & audio controls visible */
function hideControlsForNonMp4(url) {
    try {
        // treat .mp4 and .m3u8 as media types that may safely show PiP/volume controls
        const isMediaFile = typeof url === 'string' && /\.(mp4|m3u8)(\?|$)/i.test(url);
        const pip = document.getElementById('pip-btn');
        const vol = document.getElementById('volume-bar');
        const mute = document.getElementById('mute-btn');
        const volGroup = document.querySelector('.group\\/vol');
        if (!isMediaFile) {
            if (pip) { pip.style.display = 'none'; pip.setAttribute('aria-hidden', 'true'); pip.classList.add('hidden'); }
            if (vol) { vol.style.display = 'none'; vol.setAttribute('aria-hidden', 'true'); vol.classList.add('hidden'); }
            if (mute) { mute.style.display = 'none'; mute.setAttribute('aria-hidden', 'true'); mute.classList.add('hidden'); }
            if (volGroup) { volGroup.style.display = 'none'; volGroup.setAttribute('aria-hidden', 'true'); volGroup.classList.add('hidden'); }
            // ensure CSS-level enforcement for stubborn UAs
            try {
                if (!document.getElementById('lumina-hide-nonmp4-style')) {
                    const s = document.createElement('style');
                    s.id = 'lumina-hide-nonmp4-style';
                    s.textContent = '#player-modal.non-mp4 #pip-btn, #player-modal.non-mp4 #volume-bar, #player-modal.non-mp4 #mute-btn, #player-modal.non-mp4 .group\\/vol { display: none !important; visibility: hidden !important; opacity: 0 !important; pointer-events: none !important; width: 0 !important; height: 0 !important; }';
                    document.head.appendChild(s);
                }
            } catch (_) {}
            // tag modal for CSS rules elsewhere
            try { document.getElementById('player-modal')?.classList.add('non-mp4'); } catch(_) {}
        } else {
            // restore visibility if needed (for mp4 and m3u8)
            if (pip) { pip.style.display = ''; pip.removeAttribute('aria-hidden'); pip.classList.remove('hidden'); }
            if (vol) { vol.style.display = ''; vol.removeAttribute('aria-hidden'); vol.classList.remove('hidden'); }
            if (mute) { mute.style.display = ''; mute.removeAttribute('aria-hidden'); mute.classList.remove('hidden'); }
            if (volGroup) { volGroup.style.display = ''; volGroup.removeAttribute('aria-hidden'); volGroup.classList.remove('hidden'); }
            try { document.getElementById('player-modal')?.classList.remove('non-mp4'); } catch(_) {}
        }
    } catch (e) { /* non-blocking */ }
}

const player = {
            vid: null, iframe: null, uiTimeout: null, saveInterval: null, context: null, nextPromptShown: false, isSeeking: false, isEmbed: false, preferredRate: 1,
            
            _cleanupBeforeInit: function() {
                // fully tear down any previous player instance/state to avoid mixing metadata between plays
                try {
                    if (this.loadTimeout) { clearTimeout(this.loadTimeout); this.loadTimeout = null; }
                    if (this.saveInterval) { clearInterval(this.saveInterval); this.saveInterval = null; }
                    if (this.ytSaveInterval) { clearInterval(this.ytSaveInterval); this.ytSaveInterval = null; }

                    // clear idle timer if set
                    try { if (this._idleTimer) { clearTimeout(this._idleTimer); this._idleTimer = null; } } catch(_) {}

                    if (this.ytPlayer && typeof this.ytPlayer.destroy === 'function') {
                        try { this.ytPlayer.destroy(); } catch(_) {}
                        this.ytPlayer = null;
                    }

                    if (this.vid) {
                        try {
                            this.vid.pause();
                            this.vid.removeAttribute && this.vid.removeAttribute('src');
                            this.vid.load && this.vid.load();
                        } catch (_) {}
                        try { this.vid.src = ''; } catch(_) {}
                        this.vid = null;
                    }

                    if (this.iframe) {
                        try { this.iframe.src = 'about:blank'; } catch(_) {}
                        this.iframe = null;
                    }

                    // clear any leftover DOM controls bound handlers that might reference old player
                    try {
                        const progBar = document.getElementById('progress-bar');
                        const fill = document.getElementById('progress-fill');
                        if (progBar) { progBar.oninput = null; progBar.onchange = null; progBar.value = 0; }
                        if (fill) fill.style.width = '0%';
                        const tc = document.getElementById('time-current');
                        const td = document.getElementById('time-duration');
                        if (tc) tc.innerText = '00:00';
                        if (td) td.innerText = '00:00';
                    } catch(_) {}

                    // reset state flags
                    this.context = null;
                    this.nextPromptShown = false;
                    this.isSeeking = false;
                    this.isEmbed = false;
                    this.isYouTube = false;
                    this.preferredRate = this.preferredRate || 1;

                    // Reset the one-time restore marker so subsequent player instances will attempt resume again
                    try { this._restoredOnce = false; } catch(_) {}

                    // ensure skip-intro UI hidden between plays (guarded)
                    try {
                        const skipBtn = document.getElementById('skip-intro-btn');
                        if (skipBtn) skipBtn.style.display = 'none';
                    } catch (e) {}

                    // ensure UI shows default paused state
                    try { updatePlayBtns(true); updateVolIcon(); } catch(_) {}
                } catch (_) {}
            },

            init: function(url, title, context) {
                // defensively tear down any previous playback artifacts before initializing a new one
                try { this._cleanupBeforeInit(); } catch(_) {}
                this.context = context; this.nextPromptShown = false; this.isSeeking = false;
                // Hide PiP and volume controls when the chosen source is not an .mp4 (apply early so UI is correct before rendering)
                try { hideControlsForNonMp4(url); } catch(_) {}
                // Persist initial history/progress entry when starting playback so "Continuar Assistindo" updates immediately.
                try {
                    if (this.context && this.context.type === 'serie' && this.context.seriesId) {
                        state.history[this.context.seriesId] = {
                            s: this.context.season,
                            e: this.context.episode,
                            epId: this.context.id,
                            timestamp: Date.now()
                        };
                        // write to storage (debounced inside saveProgressData)
                        saveProgressData();
                    } else if (this.context && this.context.type === 'filme' && this.context.id) {
                        // ensure a placeholder progress record exists for films (helps continue list and safe saves)
                        state.progress[this.context.id] = state.progress[this.context.id] || { time: 0, duration: 0, timestamp: Date.now() };
                        saveProgressData();
                    }
                } catch (e) { /* non-blocking */ }
                const modal = document.getElementById('player-modal');
                modal.classList.remove('hidden'); modal.classList.add('flex');
                // ensure cursor is visible while player is open
                try { document.documentElement.classList.remove('lumina-hide-mouse'); document.body.classList.remove('lumina-hide-mouse'); } catch(_) {}
                setTimeout(() => modal.classList.remove('opacity-0'), 10);
                document.body.style.overflow = 'hidden';

                // Mobile-only: close player when user taps outside the player area while player is active (not idle).
                // Attach a capture-phase touchstart so we see touches before embedded iframes/controls steal them.
                try {
                    // guard: only run on touch devices
                    if (isMobileOS && typeof isMobileOS === 'function' && isMobileOS()) {
                        // ensure we don't double-bind
                        if (!player._outsideTouchBound) {
                            player._outsideTouchBound = true;
                            player._outsideTouchHandler = function(e) {
                                try {
                                    // ensure player object and wrapper exist
                                    const wrapper = document.getElementById('player-media-wrapper');
                                    const ui = document.querySelector('.player-ui');
                                    const modalEl = document.getElementById('player-modal');
                                    if (!modalEl || modalEl.classList.contains('hidden')) return;

                                    // If UI is idle (controls hidden), do not trigger immediate close per spec
                                    // idle is represented by wrapper having class 'player-idle' (used elsewhere)
                                    const isIdle = (wrapper && wrapper.classList.contains && wrapper.classList.contains('player-idle'));
                                    if (isIdle) return;

                                    // If the touch target is inside the player area or UI controls, ignore
                                    const tgt = e.target;
                                    if (!tgt) return;
                                    if (tgt.closest && (tgt.closest('#player-media-wrapper') || tgt.closest('.player-ui') || tgt.closest('#player-modal'))) {
                                        // touched inside player or its UI; ignore
                                        return;
                                    }

                                    // At this point this is a touch outside the player on mobile while player active+not idle -> close player
                                    try {
                                        // Small safeguard: stop propagation to avoid conflicting handlers
                                        e.stopPropagation && e.stopPropagation();
                                        e.preventDefault && e.preventDefault();
                                    } catch(_) {}

                                    // call player.close() safely
                                    try { if (player && typeof player.close === 'function') player.close(); } catch(_) {}
                                } catch (_) {}
                            };
                            // Use capture=true so this runs before other handlers and avoids interference with controls
                            document.addEventListener('touchstart', player._outsideTouchHandler, { passive: false, capture: true });
                        }
                    }
                } catch (err) {
                    // non-fatal: don't break player on errors
                    console.warn('outsideTouch handler bind failed', err);
                }

                // start hidden — visibility will be managed dynamically while playing (shown only during intro window)
                try {
                    const skipBtn = document.getElementById('skip-intro-btn');
                    if (skipBtn) skipBtn.style.display = 'none';
                } catch (e) {}

                const wrapper = document.getElementById('player-media-wrapper');
                wrapper.innerHTML = ''; // clear previous

                // Determine embed vs native video. For One Piece series, force native video playback
                this.isEmbed = !isDirectVideo(url);

                // Setup a load watchdog to close player if no playable media starts (YouTube/embed/native).
                // Dropbox-hosted sources can be slower; allow up to 16s for Dropbox URLs, otherwise default to 7s.
                try {
                    // clear any previous load timeout
                    if (this.loadTimeout) { clearTimeout(this.loadTimeout); this.loadTimeout = null; }

                    // Determine appropriate timeout: longer on mobile and for slow CDNs (Dropbox) to reduce premature failures.
                    // Special-case: episodes 2..8 (indices 1..7) of season 1 for series 'one-piece-live' get an extended window.
                    // Defaults: desktop 7s, mobile 20s; Dropbox/slow CDNs get a 30s watchdog to avoid premature auto-close.
                    let watchdogDelay = 7000;
                    try {
                        const lower = String(url || '').toLowerCase();
                        const isMobileDevice = (function(){ try { const ua = navigator.userAgent || navigator.vendor || ''; return (/android/i.test(ua) && !/windows phone/i.test(ua)) || /iPad|iPhone|iPod/.test(ua); } catch(e){ return false; } })();

                        // Base by device
                        watchdogDelay = isMobileDevice ? 20000 : 7000;

                        // One Piece S1 episodes 2..8 deserve extra time on both platforms
                        try {
                            const isOnePiece = this.context && this.context.seriesId === 'one-piece-live';
                            const seasonStr = this.context && (typeof this.context.season !== 'undefined') ? String(this.context.season) : null;
                            const episodeIdx = (typeof this.context !== 'undefined' && typeof this.context.episode !== 'undefined') ? Number(this.context.episode) : NaN;
                            if (isOnePiece && seasonStr === '1' && !isNaN(episodeIdx) && episodeIdx >= 1 && episodeIdx <= 7) {
                                watchdogDelay = Math.max(watchdogDelay, 15000);
                            }
                        } catch (inner) { /* ignore */ }

                        // Dropbox and similar CDNs can be slow => bump to 30s to allow slower responses (includes dl.dropboxusercontent.com)
                        if (lower.includes('dropbox.com') || lower.includes('dropboxusercontent.com') || lower.includes('odycdn.com') || lower.includes('player.odycdn.com')) {
                            watchdogDelay = 30000;
                        }
                    } catch (e) { /* ignore and use default */ }

                    // If this playback is for Heartstopper, disable the load watchdog so episodes wait indefinitely.
                    let disableWatchdogForThisContext = false;
                    try {
                        if (this.context && this.context.seriesId && String(this.context.seriesId) === 'heartstopper') {
                            disableWatchdogForThisContext = true;
                        }
                    } catch (_) {}

                    if (!disableWatchdogForThisContext) {
                        this.loadTimeout = setTimeout(() => {
                            try {
                                // Determine if playback has started for different types
                                let started = false;
                                // Native video started?
                                if (this.vid && !this.vid.paused && this.vid.currentTime > 0) started = true;
                                // YouTube started?
                                if (!started && this.isYouTube && this.ytPlayer && typeof this.ytPlayer.getPlayerState === 'function') {
                                    try { started = (this.ytPlayer.getPlayerState() === YT.PlayerState.PLAYING); } catch(_) {}
                                }
                                // iframe embed: best-effort check for same-origin ready state (rare); otherwise consider not started
                                if (!started && this.iframe) {
                                    // if iframe loaded to something other than about:blank, treat as started
                                    try { if (this.iframe.src && !this.iframe.src.includes('about:blank')) started = true; } catch(_) {}
                                }

                                if (!started) {
                                    try { showToast('Falha ao carregar o vídeo — fechando o player.'); } catch(_) {}
                                    try { this.close(); } catch(_) { player.close && player.close(); }
                                }
                            } catch (_) {}
                            finally {
                                // Ensure retry timer is cleared when the watchdog completes
                                try { if (this._loadRetryTimer) { clearInterval(this._loadRetryTimer); this._loadRetryTimer = null; } } catch(_) {}
                                try { if (this.loadTimeout) { clearTimeout(this.loadTimeout); this.loadTimeout = null; } } catch(_) {}
                            }
                        }, watchdogDelay);
                    } else {
                        // no watchdog for Heartstopper context
                        this.loadTimeout = null;
                    }

                    // If this is a Dropbox-hosted link, use an adaptive, Dropbox-tuned warmup + progressive-range/full fetch pipeline
                    try {
                        const lowerUrl = String(url || '').toLowerCase();
                        if (lowerUrl.includes('dropbox.com')) {
                            // Dropbox can be high-latency and sometimes requires fetching more than a small range to make the player happy.
                            // Strategy:
                            // 1) Try small-range warmups (0-64KB) with exponential backoff.
                            // 2) If small ranges don't yield usable blob data within attempts, attempt a full optimized fetch (with retries).
                            // 3) When a blob is obtained, createObjectURL and swap into video.src for reliable playback and seeking.
                            const baseRttMs = 160;
                            const jitter = () => Math.floor(Math.random() * 120) - 60;
                            const maxWarmupAttempts = 5;
                            const maxFullFetchAttempts = 3;
                            let warmupAttempts = 0;
                            let fullFetchAttempts = 0;

                            if (this._dropboxRetryTimer) { clearTimeout(this._dropboxRetryTimer); this._dropboxRetryTimer = null; }

                            const tryRangeWarmup = async () => {
                                warmupAttempts++;
                                try {
                                    const controller = new AbortController();
                                    const timeoutMs = Math.min(45000, Math.round((baseRttMs * Math.pow(1.8, warmupAttempts)) + 900 + jitter()));
                                    const to = setTimeout(() => controller.abort(), timeoutMs);
                                    const res = await fetch(url, {
                                        method: 'GET',
                                        headers: { 'Range': 'bytes=0-65535' },
                                        mode: 'cors',
                                        credentials: 'omit',
                                        cache: 'no-store',
                                        signal: controller.signal
                                    }).catch(()=>null);
                                    clearTimeout(to);

                                    if (res && (res.status === 206 || res.status === 200 || res.type === 'opaque')) {
                                        const blob = await res.blob().catch(()=>null);
                                        if (blob && blob.size > 16) {
                                            const objectUrl = URL.createObjectURL(blob);
                                            if (this.vid) {
                                                try { this.vid.pause(); } catch(_) {}
                                                try { this.vid.src = objectUrl; this.vid.load && this.vid.load(); } catch(_) {}
                                            } else {
                                                this.__dropbox_object_url = objectUrl;
                                            }
                                            if (this._dropboxRetryTimer) { clearTimeout(this._dropboxRetryTimer); this._dropboxRetryTimer = null; }
                                            if (this.loadTimeout) { clearTimeout(this.loadTimeout); this.loadTimeout = null; }
                                            return true;
                                        }
                                    }
                                } catch (_) { /* ignore and retry */ }

                                if (warmupAttempts < maxWarmupAttempts) {
                                    const delay = Math.round(baseRttMs * Math.pow(1.9, warmupAttempts) + 200 + jitter());
                                    this._dropboxRetryTimer = setTimeout(() => { tryRangeWarmup().catch(()=>{}); }, delay);
                                    return false;
                                }

                                // Warmup failed enough times -> escalate to full optimized fetch attempts
                                tryFullFetch();
                                return false;
                            };

                            const tryFullFetch = async () => {
                                fullFetchAttempts++;
                                try {
                                    // progressive full fetch: try to fetch as blob with larger timeout; if it stalls try again with longer timeout.
                                    const controller = new AbortController();
                                    const timeoutMs = Math.min(120000, Math.round(8000 * Math.pow(1.9, fullFetchAttempts)) + jitter());
                                    const to = setTimeout(() => controller.abort(), timeoutMs);
                                    // Use no-cache to avoid stale copies; allow CORS mode first
                                    let res = null;
                                    try { res = await fetch(url, { method: 'GET', mode: 'cors', credentials: 'omit', cache: 'no-store', signal: controller.signal }); } catch(_) {
                                        try { res = await fetch(url, { method: 'GET', mode: 'no-cors', credentials: 'omit', cache: 'no-store', signal: controller.signal }); } catch(_) { res = null; }
                                    }
                                    clearTimeout(to);

                                    if (res && (res.ok || res.type === 'opaque')) {
                                        // If a streaming response is available, try to stream into a blob progressively to avoid keeping the full response in memory twice.
                                        try {
                                            const reader = res.body && res.body.getReader ? res.body.getReader() : null;
                                            if (reader) {
                                                // accumulate chunks with a controlled max buffer to avoid long GC spikes; create blob at the end.
                                                const chunks = [];
                                                let received = 0;
                                                let done = false;
                                                const streamTimeout = 120000; // max stream time
                                                const streamStart = Date.now();
                                                while (!done) {
                                                    const r = await reader.read().catch(()=>({ done: true }));
                                                    if (r && r.value) {
                                                        chunks.push(r.value);
                                                        received += r.value.length || r.value.byteLength || 0;
                                                    }
                                                    if (r && r.done) { done = true; break; }
                                                    // safety: if streaming takes too long, abort and fallback to simple blob()
                                                    if ((Date.now() - streamStart) > streamTimeout) { try { reader.cancel(); } catch(_){}; done = true; break; }
                                                }
                                                // build blob
                                                const blob = new Blob(chunks, { type: res.headers && res.headers.get ? (res.headers.get('content-type') || 'video/mp4') : 'video/mp4' });
                                                if (blob && blob.size > 1024) {
                                                    const objectUrl = URL.createObjectURL(blob);
                                                    if (this.vid) {
                                                        try { this.vid.pause(); } catch(_) {}
                                                        try { this.vid.src = objectUrl; this.vid.load && this.vid.load(); } catch(_) {}
                                                    } else {
                                                        this.__dropbox_object_url = objectUrl;
                                                    }
                                                    if (this._dropboxRetryTimer) { clearTimeout(this._dropboxRetryTimer); this._dropboxRetryTimer = null; }
                                                    if (this.loadTimeout) { clearTimeout(this.loadTimeout); this.loadTimeout = null; }
                                                    return true;
                                                }
                                            } else {
                                                // no streaming reader available: fallback to blob()
                                                const blob = await res.blob().catch(()=>null);
                                                if (blob && blob.size > 1024) {
                                                    const objectUrl = URL.createObjectURL(blob);
                                                    if (this.vid) {
                                                        try { this.vid.pause(); } catch(_) {}
                                                        try { this.vid.src = objectUrl; this.vid.load && this.vid.load(); } catch(_) {}
                                                    } else {
                                                        this.__dropbox_object_url = objectUrl;
                                                    }
                                                    if (this._dropboxRetryTimer) { clearTimeout(this._dropboxRetryTimer); this._dropboxRetryTimer = null; }
                                                    if (this.loadTimeout) { clearTimeout(this.loadTimeout); this.loadTimeout = null; }
                                                    return true;
                                                }
                                            }
                                        } catch (streamErr) {
                                            // streaming failed, but we may retry
                                        }
                                    }
                                } catch (_) { /* ignore */ }

                                // schedule retry if attempts remain
                                if (fullFetchAttempts < maxFullFetchAttempts) {
                                    const delay = Math.round(3000 * Math.pow(2, fullFetchAttempts) + jitter());
                                    this._dropboxRetryTimer = setTimeout(() => { tryFullFetch().catch(()=>{}); }, delay);
                                    return false;
                                }

                                // final fallback: leave original URL as-is (browser will try network)
                                if (this.loadTimeout) { clearTimeout(this.loadTimeout); this.loadTimeout = null; }
                                return false;
                            };

                            // start warmup first
                            tryRangeWarmup().catch(()=>{});
                        }
                    } catch (err) {
                        // non-blocking: continue without special Dropbox handling
                    }
                } catch (_) {}

                // If it's an embed, attempt to detect YouTube and use the YT IFrame API to integrate with our custom UI.
                if(this.isEmbed) {
                    // prefer YouTube API for youtube embeds to allow custom controls and progress tracking
                    if (isYouTubeEmbed(url)) {
                        loadYouTubeAPIIfNeeded();
                        // prepare container for YT player
                        const ytDiv = document.createElement('div');
                        ytDiv.id = 'yt-player';
                        ytDiv.className = 'w-full h-full';
                        wrapper.appendChild(ytDiv);

                        // show UI (we will wire controls to YT player)
                        const ui = document.querySelector('.player-ui');
                        if(ui) ui.style.display = '';

                        document.getElementById('player-loading').classList.remove('hidden');
                        dismissNextEp(true);

                        // create a small YT wrapper object; actual player created when API ready
                        this.isYouTube = true;
                        // hide PiP button for YouTube embeds to avoid offering PiP where it doesn't work reliably
                        try { const pipBtn = document.getElementById('pip-btn'); if (pipBtn) { pipBtn.style.display = 'none'; pipBtn.setAttribute('aria-hidden','true'); } } catch(_) {}
                        // also hide mute/volume controls when using YouTube iframe (they don't map reliably)
                        try {
                            const muteBtn = document.getElementById('mute-btn');
                            const volBar = document.getElementById('volume-bar');
                            if (muteBtn) { muteBtn.style.display = 'none'; muteBtn.setAttribute('aria-hidden','true'); }
                            if (volBar) { volBar.style.display = 'none'; volBar.setAttribute('aria-hidden','true'); }
                        } catch(_) {}
                        this.ytPlayer = null;
                        this.ytSaveInterval = null;

                        // start a periodic, best-effort skip-attempt loop while YT player is active (cleared on teardown)
                        try {
                            if (this._ytSkipInterval) { clearInterval(this._ytSkipInterval); this._ytSkipInterval = null; }
                            this._ytSkipInterval = setInterval(() => {
                                try {
                                    // only run attempts while player modal visible and YT flagged
                                    const pm = document.getElementById('player-modal');
                                    if (pm && pm.classList.contains('hidden')) return;
                                    attemptClickYTSkip();
                                } catch(_) {}
                            }, 800);
                        } catch(_) {}

                        // Attach idle show/hide handlers for YouTube embeds (mirror native player behaviour)
                        try {
                            // avoid double-binding
                            if (!this._ytIdleBound) {
                                this._ytIdleBound = true;
                                const wrapperEl = document.getElementById('player-media-wrapper') || document.getElementById('custom-player-container');
                                const uiEl = document.querySelector('.player-ui');
                                const idleMs = 5000;
                                let idleTimer = null;
                                const clearIdle = () => { try { if (idleTimer) { clearTimeout(idleTimer); idleTimer = null; } } catch(_){} };
                                const scheduleHide = () => {
                                    clearIdle();
                                    // only hide when playing
                                    let playing = false;
                                    try { playing = (this.ytPlayer && typeof this.ytPlayer.getPlayerState === 'function' && this.ytPlayer.getPlayerState() === 1); } catch(_) { playing = false; }
                                    if (!playing) return;
                                    idleTimer = setTimeout(() => {
                                        try {
                                            if (wrapperEl) wrapperEl.classList.add('player-idle');
                                            if (uiEl) { uiEl.style.pointerEvents = 'none'; uiEl.style.opacity = '0'; }
                                        } catch(_) {}
                                    }, idleMs);
                                };
                                const showControls = () => {
                                    try {
                                        if (wrapperEl) wrapperEl.classList.remove('player-idle');
                                        if (uiEl) { uiEl.style.pointerEvents = ''; uiEl.style.opacity = ''; }
                                        scheduleHide();
                                    } catch(_) {}
                                };
                                const onInteraction = (e) => {
                                    try { showControls(); } catch(_) {}
                                };
                                // bind lightweight handlers
                                ['pointermove','pointerdown','touchstart','mousemove'].forEach(evt => {
                                    try { document.addEventListener(evt, onInteraction, { passive: true }); } catch(_) {}
                                });
                                // Also schedule hide on state change (play) from YT events later when player becomes available.
                                // Start initial schedule when YT player ready
                                const ytReadyTicker = setInterval(() => {
                                    try {
                                        if (this.ytPlayer && typeof this.ytPlayer.getPlayerState === 'function') {
                                            clearInterval(ytReadyTicker);
                                            // initial schedule and also observe state changes
                                            scheduleHide();
                                            // listen to YT state changes to reschedule/hide appropriately
                                            if (typeof YT !== 'undefined' && YT && YT.Player) {
                                                // attach via onStateChange provided earlier in YT Player config; but also poll as fallback
                                                const poll = setInterval(() => {
                                                    try {
                                                        if (!this.ytPlayer || typeof this.ytPlayer.getPlayerState !== 'function') return;
                                                        const st = this.ytPlayer.getPlayerState();
                                                        if (st === 1) scheduleHide(); // playing
                                                        if (st === 2) { clearIdle(); if (wrapperEl) wrapperEl.classList.remove('player-idle'); if (uiEl) { uiEl.style.pointerEvents = ''; uiEl.style.opacity = ''; } }
                                                    } catch(_) {}
                                                }, 900);
                                                this._ytIdlePoll = poll;
                                            }
                                        }
                                    } catch(_) {}
                                }, 300);
                            }
                        } catch(_) {}

                         // decide autoplay behavior: allow autoplay on desktop, require user interaction on mobile
 const allowAutoplay = !isMobileOS();
 const createYT = () => {
                            // extract video id from several possible formats
                            const extractId = (u) => {
                                try {
                                    // handle embed form
                                    const mEmbed = u.match(/youtube\.com\/embed\/([a-zA-Z0-9_\-]+)/);
                                    if (mEmbed && mEmbed[1]) return mEmbed[1];
                                    const mWatch = u.match(/[?&]v=([a-zA-Z0-9_\-]+)/);
                                    if (mWatch && mWatch[1]) return mWatch[1];
                                    const mShort = u.match(/youtu\.be\/([a-zA-Z0-9_\-]+)/);
                                    if (mShort && mShort[1]) return mShort[1];
                                    return null;
                                } catch(e) { return null; }
                            };
                            const vidId = extractId(url);
                            if (!vidId) {
                                // fallback: try to normalize into a proper embed URL to avoid being stuck on the thumbnail
                                const tryExtract = (u) => {
                                    try {
                                        const mEmbed = u.match(/(?:embed\/|\/v\/)([a-zA-Z0-9_\-]+)/);
                                        if (mEmbed && mEmbed[1]) return mEmbed[1];
                                        const mWatch = u.match(/[?&]v=([a-zA-Z0-9_\-]+)/);
                                        if (mWatch && mWatch[1]) return mWatch[1];
                                        const mShort = u.match(/youtu\.be\/([a-zA-Z0-9_\-]+)/);
                                        if (mShort && mShort[1]) return mShort[1];
                                        return null;
                                    } catch (e) { return null; }
                                };
                                const fallbackId = tryExtract(url);
                                const iframe = document.createElement('iframe');
                                if (fallbackId) {
                                    // build robust embed URL with autoplay/muted/playsinline and JS API enabled
                                    const embedSrc = `https://www.youtube.com/embed/${fallbackId}?autoplay=${allowAutoplay ? 1 : 0}&playsinline=1&enablejsapi=1&rel=0`;
                                    iframe.src = embedSrc;
                                } else {
                                    // last-resort: use original URL but append autoplay and playsinline (do not force mute)
                                    const sep = url.includes('?') ? '&' : '?';
                                    iframe.src = url + sep + `autoplay=${allowAutoplay ? 1 : 0}&playsinline=1`;
                                }
                                // ensure PiP/fullscreen/autoplay allowed and restrict popups/navigation
                                iframe.setAttribute('allow', 'autoplay; fullscreen; picture-in-picture; encrypted-media');
                                iframe.setAttribute('referrerpolicy', 'no-referrer');
                                iframe.setAttribute('loading', 'lazy');
                                iframe.allowFullscreen = true;
                                iframe.className = 'w-full h-full';
                                wrapper.innerHTML = '';
                                wrapper.appendChild(iframe);
                                // hide loading once iframe is considered loaded (best-effort)
                                iframe.addEventListener('load', () => {
                                    try { document.getElementById('player-loading').classList.add('hidden'); } catch(_) {}
                                }, { once: true });
                                return;
                            }

                            // create YT Player
                            this.ytPlayer = new YT.Player('yt-player', {
                                videoId: vidId,
                                playerVars: {
                                    autoplay: 1,
                                    controls: 0,
                                    disablekb: 1,
                                    modestbranding: 1,
                                    rel: 0,
                                    fs: 0,
                                    iv_load_policy: 3,
                                    playsinline: 1,
                                    enablejsapi: 1,
                                    // request unmuted autoplay and attempt immediate resume/unmute to start audio without click
                                    mute: 0
                                },
                                events: {
                                    onReady: (e) => {
                                        try { hideYouTubePlayerControls(); } catch(_) {}
                                        const loadingEl = document.getElementById('player-loading');
                                        if (loadingEl) loadingEl.classList.add('hidden');
                                        try { if (player && player.loadTimeout) { clearTimeout(player.loadTimeout); player.loadTimeout = null; } } catch(_) {}

                                        // ensure iframe allow attributes include autoplay & playsinline & picture-in-picture for best chance
                                        try {
                                            const iframeNode = document.querySelector('#yt-player iframe');
                                            if (iframeNode) {
                                                const allow = (iframeNode.getAttribute('allow') || '');
                                                const needed = ['autoplay', 'playsinline', 'picture-in-picture', 'fullscreen', 'encrypted-media'];
                                                let combined = allow;
                                                needed.forEach(flag => { if (!new RegExp(flag, 'i').test(combined)) combined += '; ' + flag; });
                                                iframeNode.setAttribute('allow', combined.replace(/;;+/g,';'));
                                                iframeNode.setAttribute('allowfullscreen', '');
                                            }
                                        } catch(_) {}

                                        // Try to start audible playback aggressively:
                                        // 1) resume AudioContext if present
                                        // 2) attempt unMute + setVolume + play immediately
                                        // 3) if blocked, repeatedly try unMute+play for a short burst (best-effort)
                                        try {
                                            // Try to resume audio context to satisfy some autoplay policies
                                            try {
                                                if (window.AudioContext || window.webkitAudioContext) {
                                                    const C = window.AudioContext || window.webkitAudioContext;
                                                    if (!window.__lumina_audio_ctx) window.__lumina_audio_ctx = new C();
                                                    try { window.__lumina_audio_ctx.resume && window.__lumina_audio_ctx.resume(); } catch(_) {}
                                                }
                                            } catch(_) {}

                                            // Ensure YT player is unmuted and at full volume
                                            try { e.target.unMute && e.target.unMute(); } catch(_) {}
                                            try { e.target.setVolume && e.target.setVolume(100); } catch(_) {}

                                            // Attempt to play now; many browsers will allow autoplay if audio playback is initiated successfully.
                                            try { e.target.playVideo && e.target.playVideo(); } catch(_) {}

                                            // Start a short burst of retries to overcome transient autoplay race conditions.
                                            // This loop will attempt unMute+play up to ~8 times spaced over ~5s.
                                            let retryCount = 0;
                                            const maxRetries = 8;
                                            const retryInterval = 600;
                                            const retryHandle = setInterval(() => {
                                                try {
                                                    retryCount++;
                                                    // try to unmute and play
                                                    try { e.target.unMute && e.target.unMute(); } catch(_) {}
                                                    try { e.target.setVolume && e.target.setVolume(100); } catch(_) {}
                                                    try { e.target.playVideo && e.target.playVideo(); } catch(_) {}
                                                    // if playing, stop retries
                                                    try {
                                                        const st = (player && player.ytPlayer && typeof player.ytPlayer.getPlayerState === 'function') ? player.ytPlayer.getPlayerState() : null;
                                                        if (st === 1) { clearInterval(retryHandle); return; }
                                                    } catch(_) {}
                                                    if (retryCount >= maxRetries) clearInterval(retryHandle);
                                                } catch(_) { clearInterval(retryHandle); }
                                            }, retryInterval);
                                            // ensure retries are cleared after a timeout as well
                                            setTimeout(() => { try { clearInterval(retryHandle); } catch(_) {} }, Math.min(12000, maxRetries * retryInterval + 500));
                                        } catch(_) {}

                                        // Unmute on first user gesture as an additional safety (keeps behavior stable)
                                        const unmuteOnce = () => {
                                            try {
                                                if (player && player.ytPlayer && typeof player.ytPlayer.unMute === 'function') {
                                                    try { player.ytPlayer.unMute(); } catch(_) {}
                                                    try { player.ytPlayer.setVolume && player.ytPlayer.setVolume(100); } catch(_) {}
                                                } else {
                                                    const iframeNode = document.querySelector('#yt-player iframe');
                                                    if (iframeNode && iframeNode.contentWindow) {
                                                        try { iframeNode.contentWindow.postMessage('{"event":"command","func":"unMute","args":""}', '*'); } catch(_) {}
                                                    }
                                                }
                                            } catch(_) {}
                                            try { document.removeEventListener('pointerdown', unmuteOnce); document.removeEventListener('touchstart', unmuteOnce); } catch(_) {}
                                        };
                                        try { document.addEventListener('pointerdown', unmuteOnce, { once: true, passive: true }); document.addEventListener('touchstart', unmuteOnce, { once: true, passive: true }); } catch(_) {}

                                        // apply preferred playback rate when available (defer slightly)
                                        try {
                                            if (player && typeof player.preferredRate === 'number' && e.target.setPlaybackRate) {
                                                setTimeout(() => { try { e.target.setPlaybackRate(player.preferredRate); } catch(_) {} }, 120);
                                            }
                                        } catch(_) {}

                                        updatePlayBtns(false);

                                        // restore saved progress if present
                                        try {
                                            if (player && player.context && player.context.id) {
                                                const prog = state.progress[player.context.id];
                                                if (prog && prog.time && prog.duration) {
                                                    try { player.ytPlayer && player.ytPlayer.seekTo && player.ytPlayer.seekTo(prog.time, true); } catch(_) {}
                                                }
                                            }
                                        } catch(_) {}

                                        // start interval to update UI, manage skip-intro visibility and save progress
                                        this.ytSaveInterval = setInterval(() => {
                                            if (!this.ytPlayer || typeof this.ytPlayer.getCurrentTime !== 'function') return;
                                            const cur = this.ytPlayer.getCurrentTime();
                                            const dur = this.ytPlayer.getDuration() || 0;
                                            if (!isNaN(dur) && dur > 0) {
                                                const pct = (cur / dur) * 100;
                                                const progBar = document.getElementById('progress-bar');
                                                const fill = document.getElementById('progress-fill');
                                                if (progBar) try { progBar.value = pct; } catch(e) {}
                                                if (fill) try { fill.style.width = pct + '%'; } catch(e) {}
                                                const tc = document.getElementById('time-current');
                                                const td = document.getElementById('time-duration');
                                                if (tc) tc.innerText = formatTime(cur);
                                                if (td) td.innerText = formatTime(dur);
                                            }
                                            try { if (typeof player.updateSkipIntroVisibility === 'function') player.updateSkipIntroVisibility(cur); } catch(_) {}
                                            try { if (typeof player.checkNextTrigger === 'function') player.checkNextTrigger(); } catch(_) {}
                                            if (this.context && this.context.id && typeof cur === 'number' && !isNaN(cur)) {
                                                state.progress[this.context.id] = { time: cur, duration: this.ytPlayer.getDuration() || 0, timestamp: Date.now() };
                                                if (this.context.type === 'serie') state.history[this.context.seriesId] = { s: this.context.season, e: this.context.episode, epId: this.context.id, timestamp: Date.now() };
                                                saveProgressData();
                                            }
                                        }, 500);
                                    },
                                    onStateChange: (e) => {
                                        if (e.data === YT.PlayerState.PLAYING) {
                                            updatePlayBtns(false);
                                            try { if (player && player.loadTimeout) { clearTimeout(player.loadTimeout); player.loadTimeout = null; } } catch(_) {}
                                        }
                                        if (e.data === YT.PlayerState.PAUSED) updatePlayBtns(true);
                                        if (e.data === YT.PlayerState.ENDED) {
                                            updatePlayBtns(true);
                                            if (this.context && this.context.nextEp) playNextEpisode();
                                        }
                                    }
                                }
                            });
                        };

                        // if API already ready, create immediately, else poll until ready.
                        // If API does not become available within 3s, fall back to a resilient iframe embed
                        // that still updates player UI (title/series) so YouTube content always shows.
                        (function ensureYTorFallback() {
                            if (typeof YT !== 'undefined' && YT && YT.Player) {
                                try { createYT(); } catch(_) { /* fallback below if createYT throws */ }
                                return;
                            }
                            let waited = 0;
                            const interval = 150;
                            const maxWait = 3000;
                            const waitForYT = setInterval(() => {
                                waited += interval;
                                if (typeof YT !== 'undefined' && YT && YT.Player) {
                                    clearInterval(waitForYT);
                                    try { createYT(); } catch (err) {
                                        clearInterval(waitForYT);
                                        // if createYT throws for any reason fallback to iframe
                                        createIframeFallback();
                                    }
                                    return;
                                }
                                if (waited >= maxWait) {
                                    clearInterval(waitForYT);
                                    // API didn't arrive in time -> create resilient iframe fallback
                                    createIframeFallback();
                                }
                            }, interval);

                            function createIframeFallback() {
                                try {
                                    // ensure we didn't already place an iframe
                                    if (document.getElementById('yt-player-iframe')) return;
                                    // build a conservative embed URL: ensure enablejsapi so some postMessage control is possible,
                                    // playsinline and modestbranding to keep UX consistent
                                    const vidId = (function extractId(u){
                                        try {
                                            const mEmbed = (url||'').match(/youtube\.com\/embed\/([a-zA-Z0-9_\-]+)/);
                                            if (mEmbed && mEmbed[1]) return mEmbed[1];
                                            const mWatch = (url||'').match(/[?&]v=([a-zA-Z0-9_\-]+)/);
                                            if (mWatch && mWatch[1]) return mWatch[1];
                                            const mShort = (url||'').match(/youtu\.be\/([a-zA-Z0-9_\-]+)/);
                                            if (mShort && mShort[1]) return mShort[1];
                                            return null;
                                        } catch (e) { return null; }
                                    })(url);

                                    const iframe = document.createElement('iframe');
                                    iframe.id = 'yt-player-iframe';
                                    iframe.className = 'w-full h-full';
                                    // build src
                                    let embedSrc = url;
                                    if (vidId) {
                                        embedSrc = `https://www.youtube.com/embed/${vidId}?rel=0&enablejsapi=1&playsinline=1&modestbranding=1`;
                                    } else {
                                        // append enablejsapi if possible
                                        embedSrc = (url.indexOf('?') === -1) ? (url + '?enablejsapi=1&playsinline=1') : (url + '&enablejsapi=1&playsinline=1');
                                    }
                                    iframe.src = embedSrc;
                                    iframe.setAttribute('allow', 'autoplay; fullscreen; picture-in-picture; encrypted-media; accelerometer; gyroscope');
                                    iframe.setAttribute('referrerpolicy', 'no-referrer');
                                    iframe.allowFullscreen = true;

                                    // place iframe into wrapper
                                    wrapper.innerHTML = '';
                                    wrapper.appendChild(iframe);

                                    // Update UI: hide loading when iframe loads, set titles/series meta and ensure controls state is sane
                                    iframe.addEventListener('load', () => {
                                        try {
                                            document.getElementById('player-loading')?.classList.add('hidden');
                                            // ensure UI title elements reflect provided title/context even when YT API isn't used
                                            try {
                                                if (title && document.getElementById('player-ep-title')) document.getElementById('player-ep-title').innerText = title;
                                                if (context && context.seriesTitle && document.getElementById('player-series-title')) {
                                                    document.getElementById('player-series-title').innerText = context.seriesTitle;
                                                    document.getElementById('player-series-title').classList.remove('hidden');
                                                } else {
                                                    document.getElementById('player-series-title')?.classList.add('hidden');
                                                }
                                            } catch(_) {}
                                            // mark player state so other code paths know it's a YouTube flow (but without YT API)
                                            player.isYouTube = true;
                                            player.iframe = iframe;
                                            player.ytPlayer = null;
                                            // hide PiP / native-volume controls for non-native YT flows
                                            try { hideYouTubePlayerControls(); } catch(_) {}
                                            // ensure play/pause UI reflects an initial paused state (user must interact to play)
                                            updatePlayBtns(true);
                                        } catch(_) {}
                                    }, { once: true });

                                    // small timeout: if iframe doesn't load in a reasonable time, hide loading to avoid blank screen
                                    setTimeout(() => {
                                        try { document.getElementById('player-loading')?.classList.add('hidden'); } catch(_) {}
                                    }, 4200);
                                } catch (e) {
                                    // last-resort: hide loader and leave wrapper empty to avoid blocking UI
                                    try { document.getElementById('player-loading')?.classList.add('hidden'); } catch(_) {}
                                }
                            }
                        })();

                        // wire existing UI controls to YT player actions (center play button, bottom play, progress bar, volume)
                        const wireYTControls = () => {
                            const center = document.getElementById('center-play-btn');
                            const bottom = document.getElementById('bottom-play-btn');
                            const progBar = document.getElementById('progress-bar');
                            const volEl = document.getElementById('volume-bar');
                            if (center) center.onclick = () => {
                                if (!this.ytPlayer) return;
                                const stateYT = this.ytPlayer.getPlayerState();
                                if (stateYT === YT.PlayerState.PLAYING) {
                                    this.ytPlayer.pauseVideo();
                                } else {
                                    // unmute before playing to restore audio after user interaction
                                    try { this.ytPlayer.unMute && this.ytPlayer.unMute(); } catch(_) {}
                                    try { this.ytPlayer.setVolume && this.ytPlayer.setVolume(100); } catch(_) {}
                                    this.ytPlayer.playVideo && this.ytPlayer.playVideo();
                                }
                            };
                            if (bottom) bottom.onclick = () => {
                                if (!this.ytPlayer) return;
                                const stateYT = this.ytPlayer.getPlayerState();
                                if (stateYT === YT.PlayerState.PLAYING) {
                                    this.ytPlayer.pauseVideo();
                                } else {
                                    try { this.ytPlayer.unMute && this.ytPlayer.unMute(); } catch(_) {}
                                    try { this.ytPlayer.setVolume && this.ytPlayer.setVolume(100); } catch(_) {}
                                    this.ytPlayer.playVideo && this.ytPlayer.playVideo();
                                }
                            };
                            if (progBar) {
                                progBar.oninput = (e) => {
                                    const dur = this.ytPlayer && this.ytPlayer.getDuration ? this.ytPlayer.getDuration() : 0;
                                    if (!dur) return;
                                    const targetTime = (e.target.value / 100) * dur;
                                    if (this.ytPlayer && this.ytPlayer.seekTo) {
                                        this.ytPlayer.seekTo(targetTime, true);
                                    }
                                };
                            }
                            if (volEl) {
                                volEl.oninput = (e) => {
                                    try {
                                        const v = parseFloat(e.target.value);
                                        if (this.ytPlayer && this.ytPlayer.setVolume) {
                                            this.ytPlayer.setVolume(Math.round((v||1) * 100));
                                        }
                                    } catch(_) {}
                                    updateVolIcon();
                                };
                            }
                        };
                        // call wiring now (functions will guard if ytPlayer is not yet ready)
                        wireYTControls();
                    } else {
                        // If embed URL points to a direct video file (mp4/webm/mov etc.), treat it as a native video and use our custom player.
                        if (isDirectVideo(url)) {
                            // create native video element (reuse the native pipeline so controls/progress/history work)
                            this.vid = document.createElement('video');
                            this.vid.id = 'main-video';
                            this.vid.className = 'w-full h-full object-contain';
                            this.vid.playsInline = true;

                            // Adaptive preload decision: choose 'metadata' or 'none' based on heuristics
                            (function applyAdaptivePreload(vid, srcUrl) {
                                try {
                                    const isMobile = (function(){ try { const ua = navigator.userAgent || navigator.vendor || ''; return (/android/i.test(ua) && !/windows phone/i.test(ua)) || /iPad|iPhone|iPod/.test(ua); } catch(e){ return false; } })();
                                    const slowHostHint = /dropbox\.com|odycdn\.com|player.odycdn\.com|drive\.google\.com/i.test(String(srcUrl||''));
                                    // default strategy: mobile & slow host -> prefer 'none' (delay fetch); desktop & fast host -> 'metadata'
                                    let choice = (isMobile && slowHostHint) ? 'none' : 'metadata';
                                    // if connection API suggests poor network prefer 'none' to avoid heavy prefetch
                                    try {
                                        if (navigator.connection && typeof navigator.connection.effectiveType === 'string') {
                                            const t = navigator.connection.effectiveType || '';
                                            if (/2g|slow-2g|3g/.test(t)) choice = 'none';
                                            if (/4g/.test(t) && !slowHostHint) choice = 'metadata';
                                        }
                                    } catch(_) {}
                                    vid.preload = choice;
                                    // Store chosen preload for later toggles
                                    vid.dataset.luminaPreload = choice;
                                    // attach src but do not force load beyond choice; browsers honor preload hint
                                    vid.src = srcUrl;
                                } catch (e) {
                                    try { vid.preload = 'metadata'; vid.src = srcUrl; } catch(_) {}
                                }
                            })(this.vid, url);

                            // Attempt to play immediately; if blocked by autoplay policy, mute and retry, but tell the user.
                            (async () => {
                                // Try to start audible playback using several fallbacks:
                                // 1) direct play()
                                // 2) resume AudioContext and retry play()
                                // 3) muted fallback only as last resort (but we won't rely on it)
                                const tryPlayUnmuted = async (attempt = 0) => {
                                    try {
                                        // ensure playsInline & autoplay hints are present
                                        try { this.vid.playsInline = true; this.vid.setAttribute && this.vid.setAttribute('playsinline',''); } catch(_) {}
                                        // attempt to play normally (unmuted)
                                        this.vid.muted = false;
                                        const p = this.vid.play();
                                        if (p && typeof p.then === 'function') {
                                            await p;
                                        }
                                        return true;
                                    } catch (e) {
                                        // attempt to resume Web Audio context (some browsers allow audio after AC resume on user gesture)
                                        try {
                                            if (window.AudioContext || window.webkitAudioContext) {
                                                const C = window.AudioContext || window.webkitAudioContext;
                                                if (!window.__lumina_audio_ctx) window.__lumina_audio_ctx = new C();
                                                try { await window.__lumina_audio_ctx.resume(); } catch(_) {}
                                            }
                                        } catch(_) {}
                                        // small exponential backoff retry a few times
                                        if (attempt < 3) {
                                            await new Promise(r => setTimeout(r, 300 + attempt * 250));
                                            return tryPlayUnmuted(attempt + 1);
                                        }
                                        return false;
                                    }
                                };

                                try {
                                    const ok = await tryPlayUnmuted(0);
                                    if (!ok) {
                                        // last-resort: attempt muted autoplay only to get playback started, but notify user we prefer audible playback
                                        try {
                                            this.vid.muted = true;
                                            await this.vid.play().catch(()=>{});
                                            showToast('Reprodução iniciada; toque na tela para ativar o áudio.', 3000);
                                        } catch (_) {
                                            try { showToast('Toque na tela para ativar o áudio', 2800); } catch(_) {}
                                        }
                                    }
                                } catch (_) {
                                    try { showToast('Toque na tela para ativar o áudio', 2800); } catch(_) {}
                                }
                            })();

                            // Unmute on first user interaction (pointer/touch) to restore expected audio behavior.
                            const _unmuteOnce = () => {
                                try {
                                    // prefer a reasonable default volume when unmuting
                                    this.vid.muted = false;
                                    this.vid.volume = Math.max(0.5, this.vid.volume || 1);
                                } catch(_) {}
                                document.removeEventListener('pointerdown', _unmuteOnce);
                                document.removeEventListener('touchstart', _unmuteOnce);
                            };
                            document.addEventListener('pointerdown', _unmuteOnce, { once: true, passive: true });
                            document.addEventListener('touchstart', _unmuteOnce, { once: true, passive: true });
                            // apply preferred rate immediately so setSpeed updates persist when video is created later
                            try { 
                                this.vid.playbackRate = (typeof player !== 'undefined' && typeof player.preferredRate === 'number') ? player.preferredRate : 1;
                                this.vid.defaultPlaybackRate = this.vid.playbackRate;
                            } catch(_) {}
                            wrapper.appendChild(this.vid);

                            // ensure UI visible and functional
                            const ui = document.querySelector('.player-ui');
                            if (ui) ui.style.display = '';
                            // show core controls
                            const progEl = document.getElementById('progress-bar');
                            const centerBtn = document.getElementById('center-play-btn');
                            const bottomBtn = document.getElementById('bottom-play-btn');
                            if (progEl) progEl.style.display = '';
                            if (centerBtn) centerBtn.style.display = '';
                            if (bottomBtn) bottomBtn.style.display = '';

                            // Ensure volume controls are visible for native video playback
                            try {
                                const volEl = document.getElementById('volume-bar');
                                const muteBtn = document.getElementById('mute-btn');
                                const pipBtn = document.getElementById('pip-btn');
                                if (volEl) { volEl.style.display = ''; volEl.removeAttribute('aria-hidden'); }
                                if (muteBtn) { muteBtn.style.display = ''; muteBtn.removeAttribute('aria-hidden'); }
                                // keep PiP visibility as-is (we hide PiP for YouTube elsewhere)
                                if (pipBtn && pipBtn.style.display === 'none') { /* preserve hidden for YT */ }
                            } catch (_) {}

                            document.getElementById('player-loading').classList.remove('hidden');
                            dismissNextEp(true);
                            this.setupEvents(); this.restoreProgress();

                            // attempt autoplay while muted (unmute later on interaction if allowed)
                            this.vid.play().catch(e => {});

                            // mark as non-embed so saveProgress runs normally
                            this.isEmbed = false;
                        } else {
                            // Non-YouTube embed: show a plain iframe and hide the custom player chrome
                            // Create an iframe for the embed, but for certain series (One Piece) attempt to resolve a final .mp4 target:
                            this.iframe = document.createElement('iframe');
                            this.iframe.src = url;
                            try {
                                const lower = String(url || '').toLowerCase();
                                const isToky = /tokyvideo\.com/i.test(lower);
                                const isPlayerflix = /playerflixapi\.com/i.test(lower);
                                if (isPlayerflix) {
                                    this.iframe.setAttribute('allow', 'autoplay; fullscreen; picture-in-picture');
                                    this.iframe.setAttribute('referrerpolicy', 'no-referrer');
                                } else if (isToky) {
                                    this.iframe.setAttribute('sandbox', 'allow-scripts allow-same-origin');
                                    this.iframe.setAttribute('allow', 'autoplay; fullscreen');
                                    this.iframe.setAttribute('referrerpolicy', 'no-referrer');
                                } else {
                                    this.iframe.setAttribute('sandbox', 'allow-scripts allow-same-origin');
                                    this.iframe.setAttribute('allow', 'autoplay; fullscreen; picture-in-picture');
                                    this.iframe.setAttribute('referrerpolicy', 'no-referrer');
                                }
                            } catch (e) {
                                try { this.iframe.setAttribute('allow', 'autoplay; fullscreen; picture-in-picture'); } catch(_) {}
                                try { this.iframe.setAttribute('referrerpolicy', 'no-referrer'); } catch(_) {}
                            }
                            this.iframe.allowFullscreen = true;
                            this.iframe.className = 'w-full h-full';
                            wrapper.appendChild(this.iframe);

                            // Improve idle responsiveness for embeds (YouTube or other cross-origin iframes)
                            // Attach element-level pointer/mouse enter/move listeners on the iframe element itself
                            // (these fire on the iframe element even if its content is cross-origin).
                            try {
                                const iframeEl = this.iframe;
                                const showControlsFn = () => { try { player && player._showControls && player._showControls(); } catch(_){} };
                                iframeEl.addEventListener('mouseenter', showControlsFn, { passive: true });
                                iframeEl.addEventListener('mousemove', showControlsFn, { passive: true });
                                iframeEl.addEventListener('pointermove', showControlsFn, { passive: true });
                                // also ensure a tap on the iframe element reveals controls on mobile
                                iframeEl.addEventListener('touchstart', showControlsFn, { passive: true });
                            } catch (err) {
                                // non-fatal: continue without iframe listeners
                            }

                            // If this is the One Piece series and the embed may redirect to a .mp4, try to resolve the final URL.
                            // If we can determine a final .mp4, replace iframe with a native <video> to enable accurate progress tracking.
                            (async () => {
                                try {
                                    const isOnePiece = (context && context.seriesId === 'one-piece-live');
                                    if (!isOnePiece) {
                                        // normal embeds: treat iframe load as success (watchdog canceled below)
                                        this.iframe.addEventListener('load', () => {
                                            try { const pl = document.getElementById('player-loading'); if (pl) pl.classList.add('hidden'); if (player && player.loadTimeout) { clearTimeout(player.loadTimeout); player.loadTimeout = null; } } catch(_) {}
                                        }, { once: true });
                                        return;
                                    }

                                    // Attempt to follow redirects and detect a final .mp4 URL.
                                    // Use HEAD first, then GET fallback. Not all endpoints allow CORS; fail gracefully if blocked.
                                    async function tryResolveFinal(urlToCheck) {
                                        try {
                                            // try HEAD with redirect follow to obtain final response.url
                                            const head = await fetch(urlToCheck, { method: 'HEAD', redirect: 'follow', cache: 'no-store' });
                                            if (head && head.ok) {
                                                const final = head.url || urlToCheck;
                                                if (final && final.match(/\.mp4(\?|$)/i)) return final;
                                                // Some servers don't expose final via HEAD; try GET but avoid downloading body
                                            }
                                        } catch (e) { /* ignore CORS or network errors */ }

                                        try {
                                            const get = await fetch(urlToCheck, { method: 'GET', redirect: 'follow', cache: 'no-store' });
                                            if (get && (get.ok || get.type === 'opaque')) {
                                                // If CORS allowed, get.url will reflect final redirect; if opaque, we can't read body but url may still be present.
                                                const final = get.url || urlToCheck;
                                                if (final && final.match(/\.mp4(\?|$)/i)) return final;
                                            }
                                        } catch (e) { /* ignore */ }

                                        return null;
                                    }

                                    // Poll for a short window: some embeds perform delayed redirects (AJAX or timed).
                                    const START = Date.now();
                                    const MAX_WAIT = 14000; // wait up to 14s for redirect -> mp4
                                    const INTERVAL = 1200;
                                    let resolved = null;

                                    // first immediate attempt
                                    resolved = await tryResolveFinal(url).catch(()=>null);
                                    if (resolved) {
                                        // swap to native video immediately
                                    } else {
                                        // poll periodically while iframe may be performing redirects
                                        while (!resolved && (Date.now() - START) < MAX_WAIT) {
                                            await new Promise(r => setTimeout(r, INTERVAL));
                                            resolved = await tryResolveFinal(url).catch(()=>null);
                                        }
                                    }

                                    if (resolved) {
                                        // Replace iframe with native <video> for full playback integration and accurate progress/save.
                                        try {
                                            // remove iframe safely
                                            try { this.iframe.src = 'about:blank'; } catch(_) {}
                                            try { this.iframe.remove(); } catch(_) {}

                                            // create video element and append
                                            this.vid = document.createElement('video');
                                            this.vid.id = 'main-video';
                                            this.vid.className = 'w-full h-full object-contain';
                                            this.vid.playsInline = true;
                                            this.vid.preload = 'metadata';
                                            this.vid.autoplay = true;
                                            this.vid.muted = false;
                                            this.vid.volume = 1;
                                            // store resolved URL in base64 to avoid exposing plain link in markup
                                            try {
                                                this.vid.dataset.srcB64 = btoa(String(resolved || ''));
                                                setTimeout(() => { try { this.vid.src = atob(this.vid.dataset.srcB64); } catch(_) { this.vid.src = resolved; } }, 20);
                                            } catch (e) {
                                                this.vid.src = resolved;
                                            }

                                            // attach to wrapper
                                            wrapper.appendChild(this.vid);

                                            // attach subtitles if provided in context
                                            try { attachSubtitlesToVideo(this.vid, (this.context && this.context.subtitles) ? this.context.subtitles : []); } catch(_) {}

                                            // hide loading when loaded and cancel watchdog
                                            this.vid.addEventListener('playing', () => {
                                                try { const pl = document.getElementById('player-loading'); if (pl) pl.classList.add('hidden'); if (player && player.loadTimeout) { clearTimeout(player.loadTimeout); player.loadTimeout = null; } } catch(_) {}
                                            }, { once: true });

                                            // wire up the same native event handlers and restore any progress metadata
                                            this.setupEvents && this.setupEvents();
                                            this.restoreProgress && this.restoreProgress();

                                            // ensure player flags reflect native playback
                                            this.isEmbed = false;
                                            this.isYouTube = false;

                                            // try to play (catch autoplay restrictions)
                                            try { const p = this.vid.play(); if (p && typeof p.catch === 'function') p.catch(()=>{}); } catch(_) {}
                                        } catch (swapErr) {
                                            // fallback: if swap fails, keep iframe and treat as embed
                                            try { this.iframe.addEventListener('load', () => { try { const pl = document.getElementById('player-loading'); if (pl) pl.classList.add('hidden'); if (player && player.loadTimeout) { clearTimeout(player.loadTimeout); player.loadTimeout = null; } } catch(_) {} }, { once: true }); } catch(_) {}
                                        }
                                    } else {
                                        // couldn't resolve to mp4 within timeout: treat iframe as normal embed and hide loading on load
                                        try { this.iframe.addEventListener('load', () => { try { const pl = document.getElementById('player-loading'); if (pl) pl.classList.add('hidden'); if (player && player.loadTimeout) { clearTimeout(player.loadTimeout); player.loadTimeout = null; } } catch(_) {} }, { once: true }); } catch(_) {}
                                    }
                                } catch (e) {
                                    // ensure we don't block player startup - fallback to normal iframe behavior
                                    try { this.iframe.addEventListener('load', () => { try { const pl = document.getElementById('player-loading'); if (pl) pl.classList.add('hidden'); if (player && player.loadTimeout) { clearTimeout(player.loadTimeout); player.loadTimeout = null; } } catch(_) {} }, { once: true }); } catch(_) {}
                                }
                            })();

                            const exitBtn = document.createElement('button');
                            exitBtn.id = 'embed-exit-btn';
                            exitBtn.className = 'absolute top-4 left-4 z-30 w-10 h-10 rounded-full glass flex items-center justify-center text-white hover:bg-white/10 transition-colors';
                            exitBtn.innerHTML = '<i class="ph ph-arrow-left text-lg"></i>';
                            exitBtn.onclick = () => { closePlayer(); };
                            wrapper.appendChild(exitBtn);

                            const ui = document.querySelector('.player-ui');
                            if(ui) ui.style.display = 'none';
                            const prompt = document.getElementById('next-ep-prompt');
                            if(prompt) prompt.classList.add('hidden');

                            document.getElementById('player-loading').classList.add('hidden');

                            try {
                                if (context && context.type === 'filme' && context.id) {
                                    state.progress[context.id] = { embed: true, timestamp: Date.now() };
                                    saveProgressData();
                                } else if (context && context.type === 'serie' && context.seriesId) {
                                    state.history[context.seriesId] = { s: context.season, e: context.episode, epId: context.id, timestamp: Date.now() };
                                    saveProgressData();
                                }
                            } catch (e) { /* ignore storage errors */ }
                        }
                    }
                } else {
                    // use native video - set autoplay + muted to satisfy browser autoplay policies
                    this.vid = document.createElement('video');
                    this.vid.id = 'main-video';
                    this.vid.className = 'w-full h-full object-contain';
                    this.vid.playsInline = true;
                    this.vid.preload = 'metadata';
                    this.vid.autoplay = true;
                    // Prefer start unmuted; if autoplay with sound is blocked, gracefully fall back to muted autoplay and notify user.
                    this.vid.muted = false;
                    this.vid.volume = (typeof state.volume === 'number') ? state.volume : 1;
                    // encode the url to base64 on the element and decode shortly after to keep markup free of plaintext link
                    try {
                        this.vid.dataset.srcB64 = btoa(String(url || ''));
                        setTimeout(() => { try { this.vid.src = atob(this.vid.dataset.srcB64); } catch(_) { this.vid.src = url; } }, 20);
                    } catch (e) {
                        this.vid.src = url;
                    }

                    (async () => {
                        try {
                            await this.vid.play();
                        } catch (err) {
                            try {
                                // Autoplay with sound was blocked — keep audio enabled and prompt user interaction instead of forcing mute
                                showToast('Toque na tela para ativar o áudio', 2800);
                            } catch (_) {}
                        }
                    })();

                    const _unmuteOnce = () => {
                        try {
                            this.vid.muted = false;
                            this.vid.volume = Math.max(0.5, this.vid.volume || 1);
                        } catch(_) {}
                        document.removeEventListener('pointerdown', _unmuteOnce);
                        document.removeEventListener('touchstart', _unmuteOnce);
                    };
                    document.addEventListener('pointerdown', _unmuteOnce, { once: true, passive: true });
                    document.addEventListener('touchstart', _unmuteOnce, { once: true, passive: true });
                    // ensure playback rate reflects user's chosen speed immediately
                    try {
                        this.vid.playbackRate = (typeof player !== 'undefined' && typeof player.preferredRate === 'number') ? player.preferredRate : 1;
                        this.vid.defaultPlaybackRate = this.vid.playbackRate;
                    } catch(_) {}
                    wrapper.appendChild(this.vid);

                    // attach subtitles if provided in context
                    try { attachSubtitlesToVideo(this.vid, (this.context && this.context.subtitles) ? this.context.subtitles : []); } catch(_) {}

                    // ensure UI visible and functional
                    const ui = document.querySelector('.player-ui');
                    if(ui) ui.style.display = '';
                    document.getElementById('progress-bar').style.display = '';
                    document.getElementById('center-play-btn').style.display = '';
                    document.getElementById('bottom-play-btn').style.display = '';

                    document.getElementById('player-loading').classList.remove('hidden');
                    dismissNextEp(true);
                    this.setupEvents(); this.restoreProgress();

                    // attempt autoplay while muted (unmute later on interaction if allowed)
                    this.vid.play().catch(e => {});
                }

                document.getElementById('player-ep-title').innerText = title;
                const sTitle = document.getElementById('player-series-title');
                // Show series title when available; for films display "Filme" above the title
                if (context && context.seriesTitle) {
                    sTitle.innerText = context.seriesTitle;
                    sTitle.classList.remove('hidden');
                } else if (context && context.type === 'filme') {
                    sTitle.innerText = 'Filme';
                    sTitle.classList.remove('hidden');
                } else {
                    sTitle.classList.add('hidden');
                }

                // Request fullscreen automatically only for Android PWAs; do NOT force fullscreen on desktop or iOS.
                try {
                    function isAndroidDevice() {
                        try {
                            const ua = navigator.userAgent || navigator.vendor || '';
                            return /android/i.test(ua) && !/windows phone/i.test(ua);
                        } catch (e) { return false; }
                    }

                    if (document.documentElement.requestFullscreen) {
                        const inPwa = isInPWA();
                        // Only request fullscreen when running as an Android PWA.
                        if (inPwa && isAndroidDevice()) {
                            modal.requestFullscreen().catch(() => {});
                        }
                        // Do not request fullscreen on desktop or iOS PWAs.
                    }
                } catch(_) {
                    /* ignore fullscreen errors */
                }

                // pause background activity while player is active to avoid heavy periodic UI updates during long playback
                try { pauseBackgroundActivity(); } catch(_) {}
                // Only set save interval for native video (increase frequency to improve sync)
                if(!this.isEmbed) this.saveInterval = setInterval(() => this.saveProgress(), 500);
            },
            
            restoreProgress: function() {
                // Restore saved position reliably and only resume playback after a confirmed seek.
                if (!this.vid) return;
                if (!this.context || !this.context.id) return;
                if (this._restoredOnce) return;
                const prog = state.progress[this.context.id];
                // Only restore when there's meaningful saved progress (>5s) to avoid jumping on first play
                if (!prog || typeof prog.time !== 'number' || prog.time <= 5) return;

                // Helper to perform a defensive seek and return a Promise that resolves when seek is reflected.
                const performSeek = (targetSeconds) => {
                    return new Promise((resolve) => {
                        try {
                            if (!this.vid) return resolve(false);
                            const dur = (!isNaN(this.vid.duration) && Number(this.vid.duration) > 0) ? Number(this.vid.duration) : 0;
                            let t = Number(targetSeconds) || 0;
                            if (dur > 0) t = Math.max(0, Math.min(t, Math.max(0, dur - 0.5)));
                            else t = Math.max(0, t);

                            // If current time is already past saved time by >1s, skip seeking.
                            const current = (typeof this.vid.currentTime === 'number') ? this.vid.currentTime : 0;
                            if (current > t + 1) return resolve(true);

                            let settled = false;
                            const onSeeked = () => {
                                if (settled) return;
                                settled = true;
                                cleanup();
                                // verify approx equality (within 1s) and resolve
                                const now = (this.vid && typeof this.vid.currentTime === 'number') ? this.vid.currentTime : 0;
                                resolve(Math.abs(now - t) <= 1.1);
                            };
                            const onError = () => {
                                if (settled) return;
                                settled = true;
                                cleanup();
                                resolve(false);
                            };

                            let timer = null;
                            const cleanup = () => {
                                try { if (this.vid) { this.vid.removeEventListener('seeked', onSeeked); this.vid.removeEventListener('error', onError); } } catch(_) {}
                                if (timer) { clearTimeout(timer); timer = null; }
                            };

                            // Listen for seeked event and set a conservative fallback timeout.
                            try { this.vid.addEventListener('seeked', onSeeked); this.vid.addEventListener('error', onError); } catch(_) {}
                            try { this.vid.currentTime = t; } catch (err) {
                                // if immediate assignment fails, attempt delayed assignment
                                setTimeout(() => { try { if (this.vid) this.vid.currentTime = t; } catch(_) {} }, 60);
                            }
                            // Fallback: if seeked doesn't fire within a reasonable time, check currentTime and resolve
                            timer = setTimeout(() => {
                                if (settled) return;
                                settled = true;
                                cleanup();
                                const now = (this.vid && typeof this.vid.currentTime === 'number') ? this.vid.currentTime : 0;
                                resolve(Math.abs(now - t) <= 1.5);
                            }, 9000); // 9s fallback for slow resources (Dropbox etc.)
                        } catch (e) { resolve(false); }
                    });
                };

                const tryRestoreAndPlay = async () => {
                    try {
                        // Wait for metadata to be ready to allow reliable seeking
                        if (!(this.vid.readyState > 0 && !isNaN(this.vid.duration))) {
                            // wait up to a longer timeout for metadata
                            await new Promise((r) => {
                                let done = false;
                                const onMeta = () => { if (done) return; done = true; cleanupMeta(); r(); };
                                const cleanupMeta = () => {
                                    try { this.vid.removeEventListener('loadedmetadata', onMeta); } catch(_) {}
                                    if (metaTimer) clearTimeout(metaTimer);
                                };
                                try { this.vid.addEventListener('loadedmetadata', onMeta); } catch(_) {}
                                const metaTimer = setTimeout(() => { if (done) return; done = true; cleanupMeta(); r(); }, 16000);
                            });
                        }

                        // attempt the seek and wait for confirmation
                        const ok = await performSeek(prog.time);
                        // mark as restored regardless to avoid repeated seeks; still update progress flag
                        this._restoredOnce = true;
                        try {
                            const ex = state.progress[this.context.id] || {};
                            ex._restored = true;
                            state.progress[this.context.id] = ex;
                            saveProgressData();
                        } catch(_) {}

                        // Only auto-play if seek succeeded and the element isn't already far ahead
                        try {
                            const now = (this.vid && typeof this.vid.currentTime === 'number') ? this.vid.currentTime : 0;
                            const shouldPlay = ok && (prog.time - now <= 1.5);
                            if (shouldPlay) {
                                // try to play, swallowing promise rejections and showing user prompt if blocked
                                const p = this.vid.play();
                                if (p && typeof p.catch === 'function') p.catch(() => {
                                    // autoplay blocked: keep paused and show lightweight toast hint to user
                                    showToast('Toque para ativar o áudio/continuar a reprodução', 2200);
                                });
                            }
                        } catch (e) {
                            // if any play attempt fails, do nothing (user can press play)
                        }
                    } catch (e) {
                        // fallback: one last best-effort seek attempt without awaiting
                        try { this.vid.currentTime = prog.time; } catch(_) {}
                        this._restoredOnce = true;
                    }
                };

                // Kick off restore flow but don't block other startup work
                try { tryRestoreAndPlay(); } catch(_) {}
            },

            saveProgress: function() {
                // Only update progress/history for the currently-playing context to avoid contaminating other series' episodes.
                try {
                    if (!this.context || !this.context.id) return;

                    let cur = 0, dur = 0, hasTime = false;

                    if (this.isYouTube && this.ytPlayer && typeof this.ytPlayer.getCurrentTime === 'function') {
                        try { cur = Number(this.ytPlayer.getCurrentTime()) || 0; dur = Number(this.ytPlayer.getDuration()) || 0; hasTime = !isNaN(cur); } catch(_) { hasTime = false; }
                    } else if (this.vid) {
                        try { cur = Number(this.vid.currentTime) || 0; dur = (!isNaN(this.vid.duration) && Number(this.vid.duration) > 0) ? Number(this.vid.duration) : 0; hasTime = true; } catch(_) { hasTime = false; }
                    } else {
                        hasTime = false;
                    }

                    const safeCur = hasTime ? (dur > 0 ? Math.max(0, Math.min(cur, Math.max(0, dur - 0.5))) : Math.max(0, cur)) : 0;
                    let ctxId = String(this.context.id);
                    try {
                        if (this.context.type === 'serie' && this.context.seriesId) {
                            const sid = String(this.context.seriesId);
                            if (!ctxId.startsWith(sid + '::')) ctxId = `${sid}::${ctxId}`;
                        }
                    } catch (_) {}

                    // ONLY mutate the single entry for the active context id and its series history.
                    try {
                        const prev = state.progress[ctxId] || {};
                        if (hasTime) {
                            // avoid regressing: keep the larger time when timestamps are equal or older
                            const prevTime = (typeof prev.time === 'number') ? prev.time : -1;
                            const nowTs = Date.now();
                            if (prevTime > 0 && prevTime > safeCur && prev.timestamp && prev.timestamp > nowTs - 2000) {
                                // if previous time is more recent within a small race window, keep prev (avoid overwrite by concurrent writes)
                                state.progress[ctxId] = Object.assign({}, prev, { timestamp: nowTs });
                            } else {
                                state.progress[ctxId] = { time: safeCur, duration: dur || (prev.duration || 0), timestamp: nowTs };
                            }
                        } else {
                            // mark as embed-started without touching other entries
                            state.progress[ctxId] = Object.assign({}, prev, { embed: true, timestamp: Date.now() });
                        }

                        if (this.context.type === 'serie' && this.context.seriesId) {
                            const sid = String(this.context.seriesId);
                            state.history[sid] = {
                                s: this.context.season,
                                e: this.context.episode,
                                epId: this.context.id,
                                timestamp: Date.now()
                            };
                        }
                    } catch (e) {
                        // fallback: ensure the single entry exists
                        state.progress[ctxId] = state.progress[ctxId] || { timestamp: Date.now() };
                    }

                    // Persist only - do not iterate or merge other series entries here.
                    try { saveProgressData(); } catch(_) {}
                } catch (err) {
                    // best-effort safe fallback
                    try {
                        if (this.context && this.context.id) {
                            state.progress[this.context.id] = state.progress[this.context.id] || { embed: true, timestamp: Date.now() };
                            try { saveProgressData(); } catch(_) {}
                        }
                    } catch(_) {}
                }
            },

            close: function() {
                // common cleanup
                clearInterval(this.saveInterval); clearTimeout(this.uiTimeout);
                if (this.loadTimeout) { clearTimeout(this.loadTimeout); this.loadTimeout = null; }
                this.saveInterval = null;

                if(this.vid) {
                    // Save progress before tearing down native video (save then force immediate flush)
                    try { this.saveProgress(); } catch(_) {}
                    try { flushProgressNow(); } catch(_) {}
                    try { this.vid.pause(); } catch(_) {}
                    try { this.vid.removeAttribute && this.vid.removeAttribute('src'); } catch(_) {}
                    try { this.vid.load && this.vid.load(); } catch(_) {}
                    this.vid = null;
                }
                if(this.iframe) {
                    // nothing to save for embed itself here (progress for embeds handled earlier where possible)
                    try { this.iframe.remove(); } catch(_) {}
                    this.iframe = null;
                    // remove embed exit button if present
                    const eb = document.getElementById('embed-exit-btn');
                    if(eb) try { eb.remove(); } catch(_) {}
                }

                // cleanup global handlers
                window.onkeydown = null;

                const wrapper = document.getElementById('player-media-wrapper');
                if (wrapper) wrapper.innerHTML = '';

                // remove mobile outside-touch listener if bound
                try {
                    if (player && player._outsideTouchBound && player._outsideTouchHandler) {
                        document.removeEventListener('touchstart', player._outsideTouchHandler, true);
                        player._outsideTouchBound = false;
                        player._outsideTouchHandler = null;
                    }
                } catch (_) {}

                // restore UI elements
                const ui = document.querySelector('.player-ui');
                if(ui) ui.style.display = '';
                const pb = document.getElementById('progress-bar');
                if(pb) pb.style.display = '';
                const cp = document.getElementById('center-play-btn');
                if(cp) cp.style.display = '';
                const bp = document.getElementById('bottom-play-btn');
                if(bp) bp.style.display = '';

                // resume background timers that were paused when playback began
                try { resumeBackgroundActivity(); } catch(_) {}

                // Ensure progress/state persisted and UI updates immediately when player closes
                try {
                    // Force immediate flush to localStorage so Continue cards and progress bars reflect latest values
                    try { flushProgressNow(); } catch(_) {}
                    // re-render the main view so "Continuar Assistindo" and episode progress bars update instantly
                    try { renderView(); } catch(_) {}
                } catch(_) {}

                const modal = document.getElementById('player-modal');
                if (modal) modal.classList.add('opacity-0');
                // add class to hide mouse after modal begins close animation
                try { document.documentElement.classList.add('lumina-hide-mouse'); document.body.classList.add('lumina-hide-mouse'); } catch(_) {}
                setTimeout(() => {
                    if (modal) {
                        modal.classList.add('hidden'); modal.classList.remove('flex');
                    }
                    // restore body overflow only when no other modal is open
                    if(document.getElementById('details-modal') && document.getElementById('details-modal').classList.contains('hidden')) {
                        document.body.style.overflow = '';
                    }
                    try { if(document.fullscreenElement) document.exitFullscreen().catch(e=>e); } catch(_) {}

                    // If episodes modal was open before the player, reopen it (restore series + season) and clear the marker
                    try {
                        const prev = window.__lumina_prev_episodes_modal;
                        if (prev && prev.seriesId) {
                            // restore currentSeriesId so openEpisodesModal knows which series to render
                            try { window.currentSeriesId = prev.seriesId; } catch(_) {}
                            // call openEpisodesModal with the stored season (guarded)
                            try {
                                // small delay so the player hide animation finishes before the modal opens
                                setTimeout(() => {
                                    try {
                                        if (typeof openEpisodesModal === 'function') openEpisodesModal(prev.season || '1');
                                    } catch(_) {}
                                }, 180);
                            } catch(_) {}
                            // clear the marker to avoid reopening repeatedly
                            try { window.__lumina_prev_episodes_modal = null; } catch(_) {}
                        }
                    } catch(_) {}

                    // Ensure rotate prompt shows if player was closed via player.close() path
                    try { showRotateAfterClose(); } catch (e) {}
                }, 500);
            },

            setupEvents: function() {
                // Only wire advanced interaction handlers for native <video> instances
                // Ensure the real src is set only at playback time: if a base64 placeholder exists, decode it now to avoid exposing the plain URL earlier.
                try {
                    if (this.vid && !this.vid.src && this.vid.dataset && this.vid.dataset.srcB64) {
                        try {
                            // decode and attach src only when the player is being prepared for interaction
                            this.vid.src = atob(String(this.vid.dataset.srcB64));
                            // remove the base64 dataset entry to avoid leaving encoded data in DOM attributes (keeps only the actual src after assignment)
                            try { delete this.vid.dataset.srcB64; } catch(_) {}
                            // allow browser to fetch metadata if needed
                            try { this.vid.load && this.vid.load(); } catch(_) {}
                        } catch (_) {
                            // if decoding fails, leave dataset intact but do not set plaintext src
                        }
                    }
                } catch (_) {}

                if (this.isEmbed || !this.vid) return;
                const container = document.getElementById('custom-player-container');
                const progBar = document.getElementById('progress-bar');
                const fill = document.getElementById('progress-fill');

                // defensive guards: ensure DOM nodes exist
                try { if (progBar) progBar.value = 0; } catch(e) {}
                try { if (fill) fill.style.width = '0%'; } catch(e) {}
                updatePlayBtns(true);

                // Unified show/hide controls helpers (exposed so external listeners can call)
                const ui = document.querySelector('.player-ui');

                // Robust idle timer: show controls on user interaction, hide after idleTimeoutMs of inactivity.
                // On mobile, we want the player to assume idle automatically after 5s of no sustained touch input,
                // even if a button/control currently has focus (controls selected do not prevent idle).
                const idleTimeoutMs = 5000; // increased to 5s per mobile UX requirement
                const clearIdleTimer = () => {
                    try { if (this._idleTimer) { clearTimeout(this._idleTimer); this._idleTimer = null; } } catch(_) {}
                };
                const scheduleHide = () => {
                    try {
                        clearIdleTimer();
                        // Always schedule the idle timer; when it fires we check playback state and hide only if playing.
                        this._idleTimer = setTimeout(() => {
                            try {
                                const isPlayingNow = (this.isYouTube ? (this.ytPlayer && typeof this.ytPlayer.getPlayerState === 'function' && this.ytPlayer.getPlayerState() === 1)
                                                                      : (this.vid && !this.vid.paused));
                                if (!isPlayingNow) return;
                                const wrapper = document.getElementById('player-media-wrapper') || document.getElementById('custom-player-container');
                                if (wrapper) wrapper.classList.add('player-idle');
                                if (ui) { ui.style.pointerEvents = 'none'; ui.style.opacity = '0'; }
                            } catch(_) {}
                        }, idleTimeoutMs);
                    } catch(_) {}
                };
                const showControls = () => {
                    try {
                        const wrapper = document.getElementById('player-media-wrapper') || document.getElementById('custom-player-container');
                        if (!ui || !wrapper) return;
                        wrapper.classList.remove('player-idle');
                        ui.style.opacity = '';
                        ui.style.pointerEvents = '';
                        // reset auto-hide timer
                        clearIdleTimer();
                        scheduleHide();
                    } catch (e) {}
                };
                const hideControls = () => {
                    try {
                        const wrapper = document.getElementById('player-media-wrapper') || document.getElementById('custom-player-container');
                        if (!ui || !wrapper) return;
                        wrapper.classList.add('player-idle');
                        ui.style.pointerEvents = 'none';
                        ui.style.opacity = '0';
                        clearIdleTimer();
                    } catch (e) {}
                };
                const toggleControlsVisibility = () => {
                    try {
                        const wrapper = document.getElementById('player-media-wrapper') || document.getElementById('custom-player-container');
                        if (!ui || !wrapper) return;
                        const hidden = wrapper.classList.contains('player-idle') || ui.style.opacity === '0';
                        if (hidden) showControls(); else hideControls();
                    } catch (e) {}
                };

                // Ensure primary play/pause buttons call unified toggle
                try {
                    const centerBtn = document.getElementById('center-play-btn');
                    if (centerBtn) centerBtn.onclick = () => togglePlay();
                    const bottomBtn = document.getElementById('bottom-play-btn');
                    if (bottomBtn) bottomBtn.onclick = () => togglePlay();
                } catch (e) {}

                // Interaction handler that shows controls on user interaction, but does NOT prevent the idle timeout from hiding them:
                // i.e., any interaction will reveal controls, but after idleTimeoutMs they will auto-hide even if a control has focus.
                let interactionDebounce = null;
                const onUserInteraction = (ev) => {
                    try {
                        // Show controls for this interaction.
                        showControls();
                        // We deliberately do NOT block scheduleHide when a control/button is focused.
                        // Debounce quick continuous events to avoid thrash.
                        if (interactionDebounce) clearTimeout(interactionDebounce);
                        interactionDebounce = setTimeout(() => { interactionDebounce = null; }, 120);
                    } catch (err) { /* ignore */ }
                };

                // Attach pointer/mouse/touch listeners to wrapper, container and document to ensure events are captured.
                // Also ensure YouTube embed interactions bubble to these handlers by listening at document level.
                try {
                    const mediaWrap = document.getElementById('player-media-wrapper') || container;

                    // Prefer pointer events for unified handling; attach several event types to be robust across UAs.
                    ['pointermove','pointerdown','pointerup','mousemove','touchstart','touchmove','touchend'].forEach(evtName => {
                        try {
                            const opts = { passive: true };
                            mediaWrap.addEventListener(evtName, onUserInteraction, opts);
                            container.addEventListener(evtName, onUserInteraction, opts);
                            // attach on document to catch interactions that occur inside cross-origin iframes (best-effort)
                            document.addEventListener(evtName, onUserInteraction, opts);
                        } catch(_) {}
                    });

                    // Taps: toggle only when tapping outside player UI; quick taps inside UI show controls but do not block idle hiding.
                    const onTapToggle = (ev) => {
                        try {
                            const target = ev && ev.target;
                            if (target && (target.closest && target.closest('.player-ui, button, input, select, textarea, a'))) {
                                // Tap landed inside UI: reveal controls (already done by onUserInteraction) but do not toggle
                                return;
                            }
                            // Toggle controls visibility for outside taps
                            toggleControlsVisibility();
                        } catch(_) {}
                    };
                    mediaWrap.addEventListener('pointerup', onTapToggle, { passive: true });
                    container.addEventListener('pointerup', onTapToggle, { passive: true });
                    document.addEventListener('pointerup', onTapToggle, { passive: true });

                    // Ensure scheduleHide gets called on startup so YouTube embeds also auto-hide after idleTimeoutMs.
                    scheduleHide();
                } catch (e) {
                    // best-effort: ignore attach failures
                }

                // Keyboard handlers
                window.onkeydown = (e) => {
                    const pm = document.getElementById('player-modal');
                    if(!pm || pm.classList.contains('hidden')) return;
                    showControls();
                    if(e.code === 'Space') { e.preventDefault(); togglePlay(); }
                    if(e.code === 'ArrowRight') skipVideo(10);
                    if(e.code === 'ArrowLeft') skipVideo(-10);
                };

                // Native video event wiring
                this.vid.onplaying = () => {
                    const pl = document.getElementById('player-loading');
                    if (pl) pl.classList.add('hidden');
                    updatePlayBtns(false);
                    try { if (player && player.loadTimeout) { clearTimeout(player.loadTimeout); player.loadTimeout = null; } } catch(_) {}
                };
                this.vid.onwaiting = () => { const pl = document.getElementById('player-loading'); if(pl) pl.classList.remove('hidden'); };
                this.vid.onpause = () => {
                    updatePlayBtns(true);
                    showControls(); // keep controls visible on pause
                    try { this.saveProgress(); } catch(_) {}
                };

                this.vid.ontimeupdate = () => {
                    if (!this.vid) return;
                    if (this.vid.readyState < 1) {
                        const tc = document.getElementById('time-current');
                        if (tc) tc.innerText = formatTime(0);
                        return;
                    }

                    if (!this.isSeeking && !isNaN(this.vid.duration) && this.vid.duration > 0) {
                        const pct = (this.vid.currentTime / this.vid.duration) * 100;
                        if (progBar) try { progBar.value = pct || 0; } catch(e) {}
                        if (fill) try { fill.style.width = `${pct}%`; } catch(e) {}
                    }

                    const tc = document.getElementById('time-current');
                    if (tc) tc.innerText = formatTime(this.vid.currentTime || 0);
                    try { if (typeof player.updateSkipIntroVisibility === 'function') player.updateSkipIntroVisibility(this.vid.currentTime); } catch(_) {}
                    try { this.checkNextTrigger(); } catch (e) {}
                };

                this.vid.onloadedmetadata = () => { const td = document.getElementById('time-duration'); if(td) td.innerText = formatTime(this.vid.duration); };
                this.vid.onended = () => {
                    try {
                        // If explicit nextEp exists, use playNextEpisode. Otherwise, if at the last episode of the season,
                        // attempt to advance to the first episode of the next season (if available).
                        if (this.context && this.context.nextEp) {
                            playNextEpisode();
                            return;
                        }
                        if (this.context && this.context.type === 'serie' && this.context.seriesId) {
                            const seriesData = db.find(i => i.id === this.context.seriesId);
                            if (seriesData && typeof this.context.season !== 'undefined' && typeof this.context.episode !== 'undefined') {
                                const sNum = Number(this.context.season);
                                const eIdx = Number(this.context.episode);
                                const seasonArr = (seriesData.seasons && seriesData.seasons[sNum]) ? seriesData.seasons[sNum] : [];
                                // if this was the last episode in the season, check next season for first ep
                                if (eIdx + 1 >= seasonArr.length) {
                                    const nextSeasonNum = String(sNum + 1);
                                    const nextSeasonArr = seriesData.seasons && seriesData.seasons[nextSeasonNum] ? seriesData.seasons[nextSeasonNum] : null;
                                    if (nextSeasonArr && nextSeasonArr.length > 0) {
                                        const firstEp = nextSeasonArr[0];
                                        const stableEpId = (firstEp && firstEp.id) ? firstEp.id : `${seriesData.id}-s${nextSeasonNum}-e0`;
                                        // prepare full context and start next season's first episode
                                        const fullContext = {
                                            type: 'serie',
                                            seriesId: seriesData.id,
                                            seriesTitle: seriesData.title,
                                            season: nextSeasonNum,
                                            episode: 0,
                                            id: stableEpId,
                                            trigger: seriesData.nextEpisodeTrigger || 0,
                                            nextEp: (nextSeasonArr.length > 1) ? { url: nextSeasonArr[1].url, title: `T${nextSeasonNum}:E2 - ${nextSeasonArr[1].title}`, s: nextSeasonNum, e: 1 } : null,
                                            url: firstEp.url
                                        };
                                        // init player for next season first episode
                                        player.init(firstEp.url, `T${nextSeasonNum}:E1 - ${firstEp.title}`, fullContext);
                                        // update season UI if open
                                        try { changeSeason(seriesData.id, nextSeasonNum); } catch(_) {}
                                        return;
                                    }
                                }
                            }
                        }
                        // fallback: no next episode found
                        // wait 2s then close with a subtle animation when there is truly no next episode
                        setTimeout(() => {
                            try { closePlayerAnimated(); } catch (_) { try { closePlayer(); } catch (_) {} }
                        }, 2000);
                    } catch (e) {
                        // ignore errors and do nothing
                    }
                };

                if (progBar) {
                    // Improved scrub/seek handling:
                    // - Use pointer events so scrubbing doesn't cause play()/pause() race conditions
                    // - Pause the video when user starts scrubbing, set target time while dragging, then seek once released
                    // - Resume playback only if it was playing before the scrub, and swallow play() promise rejections
                    let wasPlayingBeforeScrub = false;
                    let pendingTargetPct = null;

                    const updateFill = (pct) => {
                        try { if (fill) fill.style.width = `${pct}%`; } catch (_) {}
                    };

                    // input updates visual feedback immediately but does not perform an intrusive seek
                    progBar.addEventListener('input', (e) => {
                        try {
                            const pct = Number(e.target.value) || 0;
                            pendingTargetPct = pct;
                            this.isSeeking = true;
                            updateFill(pct);
                        } catch (_) {}
                    }, { passive: true });

                    // When user starts interacting with the thumb, record playing state and pause to avoid play/pause races
                    progBar.addEventListener('pointerdown', (e) => {
                        try {
                            if (!this.vid) return;
                            wasPlayingBeforeScrub = !this.vid.paused;
                            // do not call pause() here to avoid play()/pause() race conditions that can
                            // generate unhandled promise rejections and freeze playback; actual pause/resume
                            // is handled after the seek on pointerup.
                            try { if (e && e.target && typeof e.target.setPointerCapture === 'function') e.target.setPointerCapture(e.pointerId); } catch(_) {}
                        } catch(_) {}
                    }, { passive: true });

                    // On pointerup (release), compute final target and perform a single seek operation, then resume if needed.
                    progBar.addEventListener('pointerup', (e) => {
                        try {
                            if (!this.vid) { this.isSeeking = false; pendingTargetPct = null; return; }
                            const pct = (pendingTargetPct != null) ? pendingTargetPct : (Number(e.target.value) || 0);
                            const dur = this.vid.duration || 0;
                            const targetTime = (!isNaN(dur) && dur > 0) ? (pct / 100) * dur : 0;

                            // Pause to create a stable seek environment
                            let wasPlayingBeforeScrub = false;
                            try { wasPlayingBeforeScrub = !this.vid.paused; } catch(_) { wasPlayingBeforeScrub = false; }
                            try { if (wasPlayingBeforeScrub) this.vid.pause(); } catch(_) {}

                            // Single guarded seek: listen for 'seeked' and fallback to timeout
                            let settled = false;
                            const cleanupSeek = () => {
                                try { this.vid.removeEventListener('seeked', onSeeked); } catch(_) {}
                                try { this.vid.removeEventListener('error', onError); } catch(_) {}
                                if (seekWatchdog) clearTimeout(seekWatchdog);
                            };
                            const onSeeked = () => {
                                if (settled) return;
                                settled = true;
                                cleanupSeek();
                                afterSeek(true);
                            };
                            const onError = () => {
                                if (settled) return;
                                settled = true;
                                cleanupSeek();
                                afterSeek(false);
                            };
                            const SEEK_WATCHDOG = 9000;
                            const seekWatchdog = setTimeout(() => {
                                if (settled) return;
                                settled = true;
                                cleanupSeek();
                                // best-effort check: treat as success if currentTime close to target
                                const now = (this.vid && typeof this.vid.currentTime === 'number') ? this.vid.currentTime : 0;
                                afterSeek(Math.abs(now - targetTime) <= 1.5);
                            }, SEEK_WATCHDOG);

                            this.vid.addEventListener('seeked', onSeeked);
                            this.vid.addEventListener('error', onError);

                            try { this.vid.currentTime = targetTime; } catch (err) {
                                // micro retry if initial assignment fails
                                setTimeout(() => { try { if (this.vid) this.vid.currentTime = targetTime; } catch(_) {} }, 60);
                            }

                            // Immediate UI feedback
                            requestAnimationFrame(() => {
                                try {
                                    const tc = document.getElementById('time-current');
                                    const td = document.getElementById('time-duration');
                                    if (tc) tc.innerText = formatTime(targetTime);
                                    if (td && !isNaN(dur)) td.innerText = formatTime(dur);
                                    updateFill(pct);
                                } catch (_) {}
                            });

                            // finalize: update progress and resume if appropriate
                            const afterSeek = (ok) => {
                                try {
                                    this.isSeeking = false;
                                    pendingTargetPct = null;

                                    // update progress atomically
                                    try {
                                        if (player.context && player.context.id) {
                                            const pid = player.context.id;
                                            state.progress[pid] = state.progress[pid] || {};
                                            state.progress[pid].time = ok ? targetTime : (state.progress[pid].time || targetTime);
                                            state.progress[pid].duration = (!isNaN(dur) && dur > 0) ? dur : (state.progress[pid].duration || 0);
                                            state.progress[pid].timestamp = Date.now();
                                            if (player.context.type === 'serie' && player.context.seriesId) {
                                                state.history[player.context.seriesId] = { s: player.context.season, e: player.context.episode, epId: player.context.id, timestamp: Date.now() };
                                            }
                                            saveProgressData();
                                        }
                                    } catch (_) {}

                                    // resume only if it was playing before the scrub
                                    setTimeout(() => {
                                        try {
                                            if (wasPlayingBeforeScrub && this.vid) {
                                                const p = this.vid.play();
                                                if (p && typeof p.catch === 'function') p.catch(()=>{});
                                            }
                                        } catch (_) {}
                                    }, 80);
                                } catch (_) {}
                            };

                            try { if (e && e.target && typeof e.target.releasePointerCapture === 'function') e.target.releasePointerCapture(e.pointerId); } catch(_) {}
                        } catch (_) {
                            this.isSeeking = false;
                            pendingTargetPct = null;
                        }
                    }, { passive: true });

                    // Also support keyboard change events (accessible): perform the seek and keep previous play state behavior
                    progBar.addEventListener('change', (e) => {
                        try {
                            if (!this.vid) return;
                            const pct = Number(e.target.value) || 0;
                            const dur = this.vid.duration || 0;
                            const targetTime = (!isNaN(dur) && dur > 0) ? (pct / 100) * dur : 0;

                            const wasPlaying = !this.vid.paused;
                            try { this.vid.pause(); } catch(_) {}
                            try { this.vid.currentTime = targetTime; } catch (err) { setTimeout(()=>{ try{ this.vid.currentTime = targetTime; }catch(_){} }, 60); }
                            requestAnimationFrame(() => updateFill(pct));
                            // resume if it was playing
                            setTimeout(() => { try { if (wasPlaying) this.vid.play().catch(()=>{}); } catch(_){} }, 30);
                        } catch (_) {}
                    }, { passive: true });
                }

                const volEl = document.getElementById('volume-bar');
                if (volEl) {
                    volEl.oninput = (e) => {
                        if (!this.vid) return;
                        this.vid.volume = e.target.value; this.vid.muted = (e.target.value == 0); updateVolIcon();
                    };
                }

                // Ensure controls show initially and auto-hide when playing
                showControls();

                // expose helpers for external debugging if needed
                this._showControls = showControls;
                this._hideControls = hideControls;
            },

            checkNextTrigger: function() {
                // support native video and YouTube iframe players for next-episode prompt
                if (!this.context || this.nextPromptShown) return;

                let cur = 0, dur = 0;
                try {
                    if (this.isYouTube && this.ytPlayer && typeof this.ytPlayer.getCurrentTime === 'function' && typeof this.ytPlayer.getDuration === 'function') {
                        cur = Number(this.ytPlayer.getCurrentTime()) || 0;
                        dur = Number(this.ytPlayer.getDuration()) || 0;
                    } else if (this.vid) {
                        cur = Number(this.vid.currentTime) || 0;
                        dur = Number(this.vid.duration) || 0;
                    } else {
                        return;
                    }
                } catch (e) {
                    return;
                }

                // require a valid numeric duration and a positive trigger value
                // If context.trigger is missing (common for YouTube embeds), fall back to the series' configured nextEpisodeTrigger.
                let trigger = Number(this.context && this.context.trigger) || 0;
                try {
                    if ((!trigger || trigger <= 0) && this.context && this.context.seriesId) {
                        const seriesForTrigger = (window.db || []).find(d => d && d.id === this.context.seriesId);
                        if (seriesForTrigger && typeof seriesForTrigger.nextEpisodeTrigger !== 'undefined') {
                            trigger = Number(seriesForTrigger.nextEpisodeTrigger) || trigger;
                        }
                    }
                } catch (_) { /* ignore fallback errors */ }
                if (isNaN(dur) || dur <= 0 || trigger <= 0) return;

                if (dur - cur <= trigger) {
                    this.nextPromptShown = true;

                    // Mark episode as "considered finished" when near the trigger without stopping playback:
                    // set progress time to duration (or dur - 0.5 for safety) and flag completed, then persist.
                    try {
                        const safeTime = Math.max(0, Math.max(0, dur - 0.5));
                        if (this.context && this.context.id) {
                            // First determine if there's actually a next episode (across seasons)
                            const seriesDataTmp = db.find(i => i.id === this.context.seriesId);
                            let nextContextTmp = this.context.nextEp || null;
                            try {
                                if (!nextContextTmp && seriesDataTmp && typeof this.context.season !== 'undefined' && typeof this.context.episode !== 'undefined') {
                                    const sNumTmp = Number(this.context.season);
                                    const eIdxTmp = Number(this.context.episode);
                                    const seasonArrTmp = (seriesDataTmp.seasons && seriesDataTmp.seasons[sNumTmp]) ? seriesDataTmp.seasons[sNumTmp] : [];
                                    if (eIdxTmp + 1 >= seasonArrTmp.length) {
                                        const nextSeasonNumTmp = String(sNumTmp + 1);
                                        const nextSeasonArrTmp = seriesDataTmp.seasons && seriesDataTmp.seasons[nextSeasonNumTmp] ? seriesDataTmp.seasons[nextSeasonNumTmp] : null;
                                        if (nextSeasonArrTmp && nextSeasonArrTmp.length > 0) {
                                            const firstEpTmp = nextSeasonArrTmp[0];
                                            const stableEpIdTmp = (firstEpTmp && firstEpTmp.id) ? firstEpTmp.id : `${seriesDataTmp.id}-s${nextSeasonNumTmp}-e0`;
                                            nextContextTmp = { url: firstEpTmp.url, title: `T${nextSeasonNumTmp}:E1 - ${firstEpTmp.title}`, s: nextSeasonNumTmp, e: 0, id: stableEpIdTmp };
                                        }
                                    }
                                }
                            } catch (_) {}

                            // If this was the absolute last episode of the series (no nextContextTmp), keep stored progress/history but avoid removing it;
                            // instead just update the last-seen timestamp so Continue-watching entries are not auto-removed.
                            if (!nextContextTmp && this.context.type === 'serie') {
                                try {
                                    // update timestamp only, do NOT delete progress/history or mark as "completed"
                                    if (state.progress && state.progress[this.context.id]) {
                                        state.progress[this.context.id].timestamp = Date.now();
                                    } else {
                                        state.progress[this.context.id] = { time: safeTime, duration: dur, timestamp: Date.now() };
                                    }
                                    if (state.history && state.history[this.context.seriesId]) {
                                        state.history[this.context.seriesId].timestamp = Date.now();
                                    } else {
                                        state.history[this.context.seriesId] = { s: this.context.season, e: this.context.episode, epId: this.context.id, timestamp: Date.now() };
                                    }
                                    saveProgressData();
                                } catch (_) {}
                            } else {
                                // Not the final series ep: update last time/duration/timestamp but do NOT set a 'completed' flag.
                                state.progress[this.context.id] = state.progress[this.context.id] || {};
                                state.progress[this.context.id].time = safeTime;
                                state.progress[this.context.id].duration = dur;
                                // DO NOT set a 'completed' flag so the UI never treats items as fully watched automatically.
                                state.progress[this.context.id].timestamp = Date.now();
                                // update series history timestamp (do not set history.completed)
                                if (this.context.type === 'serie' && this.context.seriesId) {
                                    state.history[this.context.seriesId] = {
                                        s: this.context.season,
                                        e: this.context.episode,
                                        epId: this.context.id,
                                        timestamp: Date.now()
                                    };
                                }
                                // persist (debounced)
                                saveProgressData();
                            }
                        }
                    } catch (e) {
                        // silent fallback - do not interrupt playback
                    }

                    // Build nextEp prompt: if explicit nextEp exists use it; otherwise, if this is the last episode of season,
                    // try to locate the next season's first episode and use that as nextEp so player can jump to next season automatically.
                    const seriesData = db.find(i => i.id === this.context.seriesId);
                    let nextContext = this.context.nextEp || null;
                    try {
                        if (!nextContext && seriesData && typeof this.context.season !== 'undefined' && typeof this.context.episode !== 'undefined') {
                            const sNum = Number(this.context.season);
                            const eIdx = Number(this.context.episode);
                            const seasonArr = (seriesData.seasons && seriesData.seasons[sNum]) ? seriesData.seasons[sNum] : [];
                            // if this is last episode in current season, check for next season's first ep
                            if (eIdx + 1 >= seasonArr.length) {
                                const nextSeasonNum = String(sNum + 1);
                                const nextSeasonArr = seriesData.seasons && seriesData.seasons[nextSeasonNum] ? seriesData.seasons[nextSeasonNum] : null;
                                if (nextSeasonArr && nextSeasonArr.length > 0) {
                                    const firstEp = nextSeasonArr[0];
                                    const stableEpId = (firstEp && firstEp.id) ? firstEp.id : `${seriesData.id}-s${nextSeasonNum}-e0`;
                                    nextContext = { url: firstEp.url, title: `T${nextSeasonNum}:E1 - ${firstEp.title}`, s: nextSeasonNum, e: 0, id: stableEpId };
                                    // also set a lightweight nextEp on the player.context for UI consistency
                                    try { this.context.nextEp = nextContext; } catch(_) {}
                                }
                            }
                        }
                    } catch (_) {
                        // ignore errors, proceed with whatever nextContext we have
                    }

                    if (nextContext) {
                        const prompt = document.getElementById('next-ep-prompt');
                        document.getElementById('next-ep-title').innerText = (nextContext.title || '').split(' - ')[1] || nextContext.title || '';
                        const seriesCover = seriesData ? seriesData.cover : '';
                        if (seriesCover) document.getElementById('next-ep-img').src = seriesCover;
                        prompt.classList.remove('hidden');
                        requestAnimationFrame(() => prompt.classList.remove('opacity-0', 'translate-y-4'));
                    }
                }
            },

            // Show/hide the skip-intro button based on current playback time and the intro window in context.
            // Accepts an optional currentTime param (seconds). If not provided, it will query the active player.
            updateSkipIntroVisibility: function(currentTime) {
                try {
                    const skipBtn = document.getElementById('skip-intro-btn');
                    if (!skipBtn) return;

                    // Must have context with intro metadata
                    if (!this.context || (typeof this.context.introStart === 'undefined' && typeof this.context.introDuration === 'undefined')) {
                        skipBtn.style.display = 'none';
                        return;
                    }

                    const introStart = Number(this.context.introStart || 0);
                    const introDur = Number(this.context.introDuration || 0);
                    if (introStart <= 0 || introDur <= 0) {
                        skipBtn.style.display = 'none';
                        return;
                    }

                    // Determine current time if not supplied
                    let cur = typeof currentTime === 'number' ? currentTime : 0;
                    if (typeof currentTime !== 'number') {
                        try {
                            if (this.isYouTube && this.ytPlayer && typeof this.ytPlayer.getCurrentTime === 'function') {
                                cur = Number(this.ytPlayer.getCurrentTime()) || 0;
                            } else if (this.vid) {
                                cur = Number(this.vid.currentTime) || 0;
                            }
                        } catch (_) { cur = 0; }
                    }

                    // Show the button during the full intro interval and hide outside it.
                    const introEnd = introStart + introDur;
                    if (cur >= introStart && cur <= introEnd) {
                        skipBtn.style.display = '';
                    } else {
                        skipBtn.style.display = 'none';
                    }
                } catch (e) {
                    // fail-safe: hide on errors
                    try { document.getElementById('skip-intro-btn').style.display = 'none'; } catch(_) {}
                }
            }
        };

        function openPlayer(url, title, context) {
    try {
        // If the episodes modal is open, remember which series/season was open and close it before opening the player
        try {
            const epOverlay = document.getElementById('episodes-modal-overlay');
            if (epOverlay && !epOverlay.classList.contains('hidden')) {
                // Capture current visible series id and season if available
                try {
                    const activeSeriesId = window.currentSeriesId || null;
                    // Try to read active season from the modal title
                    let activeSeason = null;
                    try {
                        const titleEl = document.getElementById('episodes-modal-title');
                        if (titleEl && titleEl.textContent) {
                            const m = String(titleEl.textContent).match(/Temporada\s*(\d+)/i);
                            if (m) activeSeason = m[1];
                        }
                    } catch(_) {}
                    // store for restore after player close
                    window.__lumina_prev_episodes_modal = { seriesId: activeSeriesId, season: activeSeason };
                } catch(_) {
                    window.__lumina_prev_episodes_modal = null;
                }
                try { closeEpisodesModal(); } catch (_) {}
            } else {
                // ensure previous marker cleared when no modal open
                window.__lumina_prev_episodes_modal = window.__lumina_prev_episodes_modal || null;
            }
        } catch(_) {}
    } catch (_) {}
    try { player.init(url, title, context); } catch (_) { /* fail-safe */ }
}
        // New: subtle animated close helper — applies a gentle transform/opacity before calling the actual close routine.
        function closePlayerAnimated() {
            try {
                const modal = document.getElementById('player-modal');
                if (!modal) {
                    try { closePlayer(); } catch (_) {}
                    return;
                }
                try {
                    // do not hide the cursor here — restore it explicitly to avoid lingering hidden state
                    try { restoreMouseVisibility(); } catch(_) {}
                    modal.style.transition = 'opacity 420ms ease, transform 320ms cubic-bezier(0.16,1,0.3,1)';
                    modal.style.transform = 'scale(0.995)';
                    modal.style.opacity = '0';
                } catch (_) {}
                setTimeout(() => {
                    try { closePlayer(); } catch (_) {}
                    try { modal.style.transition = ''; modal.style.transform = ''; modal.style.opacity = ''; } catch (_) {}
                }, 520);
            } catch (e) {
                try { closePlayer(); } catch (_) {}
            }
        }

        function closePlayer() {
            // Close player cleanup (safe-guarded)
            try {
                // prefer the player's close if available
                try { if (player && typeof player.close === 'function') player.close(); }
                catch (err) { try { player && player.close && player.close(); } catch(_) {} }
            } catch (e) { /* ignore */ }

            // Ensure keyboard handlers cleared
            try { window.onkeydown = null; } catch(_) {}

            // Immediately persist any remaining progress/history and update UI synchronously so "Continuar Assistindo"
            // reflects the most recent state as soon as the player is closed.
            try {
                // best-effort save via player's saveProgress
                try { if (window.player && typeof window.player.saveProgress === 'function') window.player.saveProgress(); } catch(_) {}

                // FLUSH: write progress/history to localStorage synchronously to avoid debounce delay
                try {
                    // prefer the debounced saver, but force write now to guarantee resume correctness
                    if (typeof state !== 'undefined') {
                        try { localStorage.setItem('lumina_v2_prog', JSON.stringify(state.progress || {})); } catch(_) {}
                        try { localStorage.setItem('lumina_v2_hist', JSON.stringify(state.history || {})); } catch(_) {}
                    } else {
                        try { saveProgressData(); } catch(_) {}
                    }
                } catch(_) {
                    try { saveProgressData(); } catch(_) {}
                }

                // Re-render immediately so UI (continue cards / episode bars) reflect the just-saved progress
                try { renderView(); } catch(_) {}
            } catch (e) { /* ignore */ }

            // Show rotate-to-vertical modal after closing the player unless the user disabled orientation prompts
            try {
                // Respect global orientation-disable toggle: if disabled, skip showing this prompt
                if (getOrientationDisabled && getOrientationDisabled()) {
                    // restore body overflow and exit early
                    if (document.getElementById('player-modal').classList.contains('hidden') && document.getElementById('details-modal').classList.contains('hidden')) {
                        document.body.style.overflow = '';
                    }
                    return;
                }

                // Only show rotate/vertical prompt on Android or iOS mobile OS (avoid showing on desktop)
                if (!isMobileOS()) {
                    // ensure body overflow restored for non-mobile environments
                    if (document.getElementById('player-modal').classList.contains('hidden') && document.getElementById('details-modal').classList.contains('hidden')) {
                        document.body.style.overflow = '';
                    }
                    return;
                }

                const modal = document.getElementById('rotate-vertical-modal');
                if (!modal) return;

                // populate dynamic hint based on current orientation
                const hint = modal.querySelector('.rotate-hint');
                if (hint) {
                    const isPortrait = window.innerHeight > window.innerWidth;
                    hint.innerText = isPortrait ? 'Você está em modo retrato — gire para assistir em tela cheia.' : 'Fechou o player — gire seu dispositivo para voltar à navegação vertical.';
                }

                // make it visible with entrance animation
                modal.classList.remove('hidden');
                modal.classList.add('flex');
                // small delay to trigger transition
                setTimeout(() => {
                    modal.classList.remove('opacity-0');
                    modal.classList.add('scale-100');
                }, 12);

                // prevent background scroll while prompt visible
                document.body.style.overflow = 'hidden';

                // attach a one-time resize listener: if user rotates back to portrait, hide prompt
                const onRotateBack = () => {
                    if (window.innerHeight > window.innerWidth) {
                        dismissRotateVertical();
                        window.removeEventListener('resize', onRotateBack);
                    }
                };
                window.addEventListener('resize', onRotateBack);
            } catch (e) { /* silent */ }
        }

        // expose closePlayer to global scope so inline onclick handlers work in module environment
        try { window.closePlayer = closePlayer; } catch (e) {}

        
        function togglePlay() {
            // unified play/pause for native video and YouTube iframe player with robust promise handling
            try {
                if (player.isYouTube && player.ytPlayer && typeof player.ytPlayer.getPlayerState === 'function') {
                    const st = player.ytPlayer.getPlayerState();
                    // YT states: 1 playing, 2 paused, 0 ended
                    if (st === YT.PlayerState.PLAYING) {
                        try { player.ytPlayer.pauseVideo(); } catch(_) {}
                        updatePlayBtns(true);
                    } else {
                        try { player.ytPlayer.playVideo(); } catch(_) {}
                        updatePlayBtns(false);
                    }
                    return;
                }
            } catch (e) { /* failover to native */ }

            if (player.vid) {
                try {
                    if (player.vid.paused) {
                        // call play and swallow any promise rejection to avoid unhandledRejection when a pause occurs immediately
                        const p = player.vid.play();
                        if (p && typeof p.then === 'function') p.catch(() => {});
                        updatePlayBtns(false);
                    } else {
                        try { player.vid.pause(); } catch(_) {}
                        updatePlayBtns(true);
                    }
                } catch (err) {
                    // last-resort: avoid throwing from toggle
                    try { player.vid && player.vid.pause && player.vid.pause(); } catch(_) {}
                    updatePlayBtns(true);
                }
            }
        }

        function skipVideo(s) {
            // Reliable skip: pause first, compute/clamp target, perform a single seek, update UI, save progress, then resume playback.
            const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
            try {
                // Handle YouTube (via API) first
                if (player.isYouTube && player.ytPlayer && typeof player.ytPlayer.getCurrentTime === 'function') {
                    const cur = Number(player.ytPlayer.getCurrentTime()) || 0;
                    const dur = Number(player.ytPlayer.getDuration()) || 0;
                    let target = cur + Number(s || 0);
                    if (isNaN(target)) target = cur;
                    target = clamp(target, 0, dur > 0 ? dur : target);

                    // Pause/ensure stable state before seeking
                    try { player.ytPlayer.pauseVideo && player.ytPlayer.pauseVideo(); } catch (_) {}

                    // Single seek call
                    try { player.ytPlayer.seekTo && player.ytPlayer.seekTo(target, true); } catch (_) {}

                    // Update UI immediately
                    requestAnimationFrame(() => {
                        try {
                            const tc = document.getElementById('time-current');
                            const td = document.getElementById('time-duration');
                            const progBar = document.getElementById('progress-bar');
                            const fill = document.getElementById('progress-fill');
                            if (tc) tc.innerText = formatTime(target);
                            if (td && dur) td.innerText = formatTime(dur);
                            if (progBar && dur > 0) progBar.value = (target / dur) * 100;
                            if (fill && dur > 0) fill.style.width = ((target / dur) * 100) + '%';
                        } catch (_) {}
                    });

                    // Save progress snapshot and then resume playback (swallow promise rejections)
                    try {
                        if (player.context && player.context.id) {
                            state.progress[player.context.id] = state.progress[player.context.id] || {};
                            state.progress[player.context.id].time = target;
                            state.progress[player.context.id].duration = dur || (state.progress[player.context.id].duration || 0);
                            state.progress[player.context.id].timestamp = Date.now();
                            if (player.context.type === 'serie' && player.context.seriesId) {
                                state.history[player.context.seriesId] = { s: player.context.season, e: player.context.episode, epId: player.context.id, timestamp: Date.now() };
                            }
                            saveProgressData();
                            try { if (player && typeof player.saveProgress === 'function') player.saveProgress(); } catch(_) {}
                        }
                    } catch (_) {}

                    // Resume after tiny delay to allow seek to settle
                    setTimeout(() => {
                        try { player.ytPlayer.playVideo && player.ytPlayer.playVideo(); } catch (_) {}
                    }, 120);

                    return;
                }
            } catch (e) {
                // fallback to native
            }

            // Native HTMLVideoElement path
            try {
                const vid = player.vid;
                if (!vid) return;
                // Pause first to avoid race conditions
                let wasPlaying = false;
                try { wasPlaying = !vid.paused; } catch (_) { wasPlaying = false; }
                try { if (wasPlaying) vid.pause(); } catch (_) {}

                const cur = Number(vid.currentTime) || 0;
                const dur = (!isNaN(vid.duration) && Number(vid.duration) > 0) ? Number(vid.duration) : NaN;
                let target = cur + Number(s || 0);
                if (isNaN(target)) target = cur;
                if (target < 0) target = 0;
                if (!isNaN(dur) && dur > 0) target = clamp(target, 0, dur);

                // Perform a single, defensive seek
                try {
                    vid.currentTime = target;
                } catch (err) {
                    // retry once shortly after if immediate assignment fails
                    setTimeout(() => { try { if (player.vid) player.vid.currentTime = target; } catch(_) {} }, 60);
                }

                // Update UI immediately
                requestAnimationFrame(() => {
                    try {
                        const tc = document.getElementById('time-current');
                        const td = document.getElementById('time-duration');
                        const progBar = document.getElementById('progress-bar');
                        const fill = document.getElementById('progress-fill');
                        if (tc) tc.innerText = formatTime(target);
                        if (td && !isNaN(dur)) td.innerText = formatTime(dur);
                        if (progBar && !isNaN(dur) && dur > 0) progBar.value = (target / dur) * 100;
                        if (fill && !isNaN(dur) && dur > 0) fill.style.width = ((target / dur) * 100) + '%';
                    } catch (_) {}
                });

                // Update in-memory progress and schedule save
                try {
                    if (player.context && player.context.id) {
                        const pid = player.context.id;
                        const prev = state.progress[pid] || {};
                        const prevTime = (typeof prev.time === 'number') ? prev.time : -1;
                        if (prevTime >= 0 && target < prevTime - 1) {
                            prev.timestamp = Date.now();
                            state.progress[pid] = prev;
                        } else {
                            state.progress[pid] = state.progress[pid] || {};
                            state.progress[pid].time = target;
                            state.progress[pid].duration = (!isNaN(dur) && dur > 0) ? dur : (state.progress[pid].duration || 0);
                            state.progress[pid].timestamp = Date.now();
                        }
                        if (player.context.type === 'serie' && player.context.seriesId) {
                            state.history[player.context.seriesId] = { s: player.context.season, e: player.context.episode, epId: player.context.id, timestamp: Date.now() };
                        }
                        saveProgressData();
                    }
                } catch (_) {}

                // Resume playback only if it was playing before and after a slight delay for the seek to settle
                setTimeout(() => {
                    try { if (wasPlaying) { const p = vid.play(); if (p && typeof p.catch === 'function') p.catch(()=>{}); } } catch (_) {}
                }, 140);
            } catch (e) {
                // swallow errors to avoid breaking UI
            }
        }

        function setSpeed(r) {
            // normalize input and persist chosen rate
            const rate = Number(r) || 1;
            player.preferredRate = rate;
            const btn = document.getElementById('speed-btn');
            if (btn) btn.innerText = rate + 'x';

            // update menu visual selection
            const menu = document.getElementById('speed-menu');
            if (menu) {
                Array.from(menu.querySelectorAll('button[data-speed]')).forEach(b => {
                    if (Number(b.getAttribute('data-speed')) === rate) {
                        b.classList.add('text-accent', 'font-semibold');
                    } else {
                        b.classList.remove('text-accent', 'font-semibold');
                    }
                });
            }

            // apply to YouTube player if present (guarded) — ensure we try even when setSpeed is called before YT ready
            try {
                if (player && player.isYouTube) {
                    // attempt to set on the API player if available
                    if (player.ytPlayer && typeof player.ytPlayer.setPlaybackRate === 'function') {
                        try { player.ytPlayer.setPlaybackRate(player.preferredRate); } catch (err) { /* ignore */ }
                    } else {
                        // if API not yet ready, schedule a short retry to apply rate when it arrives
                        const retryId = setInterval(() => {
                            try {
                                if (player.ytPlayer && typeof player.ytPlayer.setPlaybackRate === 'function') {
                                    try { player.ytPlayer.setPlaybackRate(player.preferredRate); } catch(_) {}
                                    clearInterval(retryId);
                                }
                            } catch (_) { clearInterval(retryId); }
                        }, 250);
                        // safety clear after a few attempts
                        setTimeout(() => clearInterval(retryId), 5000);
                    }
                }
            } catch (e) { /* ignore */ }

            // apply to native video if present
            try {
                if (player.vid) {
                    try { player.vid.playbackRate = player.preferredRate; } catch (_) {}
                }
            } catch (e) { /* ignore */ }
        }

        // Speed menu: open/close behavior so mouse clicks don't close it immediately.
        (function(){
            const wrapper = document.getElementById('speed-control-wrapper');
            const btn = document.getElementById('speed-btn');
            const menu = document.getElementById('speed-menu');
            const progressBar = document.getElementById('progress-bar');

            if (!btn || !menu) return;

            // helpers to disable/enable progress interactions while the speed menu is open
            const disableProgressInteractions = () => {
                try {
                    if (progressBar) {
                        // visually keep it but prevent pointer events and keyboard focus
                        progressBar.style.pointerEvents = 'none';
                        progressBar.setAttribute('aria-hidden', 'true');
                        progressBar.tabIndex = -1;
                    }
                } catch(_) {}
            };
            const enableProgressInteractions = () => {
                try {
                    if (progressBar) {
                        progressBar.style.pointerEvents = '';
                        progressBar.removeAttribute('aria-hidden');
                        // remove forced tabindex only if not explicitly set elsewhere
                        try { progressBar.removeAttribute('tabindex'); } catch(_) {}
                    }
                } catch(_) {}
            };

            // Toggle menu on button click
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const isOpen = !menu.classList.contains('hidden');
                if (isOpen) {
                    menu.classList.add('hidden');
                    btn.setAttribute('aria-expanded', 'false');
                    enableProgressInteractions();
                } else {
                    menu.classList.remove('hidden');
                    btn.setAttribute('aria-expanded', 'true');
                    // when menu opens, disable progress interactions to avoid accidental seeks
                    disableProgressInteractions();
                }
            }, { passive: true });

            // Delegate clicks inside menu to setSpeed and keep menu open briefly for feedback then close
            menu.addEventListener('click', (e) => {
                e.stopPropagation();
                const target = e.target.closest('button[data-speed]');
                if (!target) return;
                const s = Number(target.getAttribute('data-speed')) || 1;
                // Prevent the immediate next pointerup on the progress bar from causing an unintended seek
                try {
                    window.__lumina_ignore_next_pointerup = true;
                    // Clear the flag shortly after to avoid stale state
                    setTimeout(() => { try { window.__lumina_ignore_next_pointerup = false; } catch(_) {} }, 250);
                } catch (_) {}
                setSpeed(s);
                // keep menu visible very briefly then close to show feedback
                setTimeout(() => { 
                    menu.classList.add('hidden'); 
                    btn.setAttribute('aria-expanded', 'false'); 
                    // re-enable progress interactions after menu closes
                    enableProgressInteractions();
                }, 220);
            });

            // Close menu when clicking outside or pressing Escape
            document.addEventListener('click', () => { 
                if (!menu.classList.contains('hidden')) { 
                    menu.classList.add('hidden'); 
                    btn.setAttribute('aria-expanded','false'); 
                    enableProgressInteractions();
                } 
            }, { passive: true });
            document.addEventListener('keydown', (e) => { 
                if (e.key === 'Escape' && !menu.classList.contains('hidden')) { 
                    menu.classList.add('hidden'); 
                    btn.setAttribute('aria-expanded','false'); 
                    enableProgressInteractions();
                } 
            });

            // initialize label from stored preferredRate if available
            try {
                if (player && typeof player.preferredRate === 'number') setSpeed(player.preferredRate);
                else setSpeed(1);
            } catch(_) { setSpeed(1); }
        })();
        function toggleMute() { 
            if(player.vid) { 
                player.vid.muted = !player.vid.muted; 
                document.getElementById('volume-bar').value = player.vid.muted ? 0 : player.vid.volume || 1;
                updateVolIcon(); 
            } 
        }
        function toggleFullscreen() {
            try {
                // prefer player modal -> player media wrapper -> document element
                const modalEl = document.getElementById('player-modal');
                const mediaWrap = document.getElementById('player-media-wrapper');
                const targets = [modalEl, mediaWrap, document.documentElement];

                const isCurrentlyFS = () => {
                    try {
                        return document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement || null;
                    } catch (_) { return null; }
                };

                const requestOn = async (el) => {
                    if (!el) return Promise.reject(new Error('No element'));
                    if (el.requestFullscreen) return el.requestFullscreen();
                    if (el.webkitRequestFullscreen) return el.webkitRequestFullscreen();
                    if (el.mozRequestFullScreen) return el.mozRequestFullScreen();
                    if (el.msRequestFullscreen) return el.msRequestFullscreen();
                    return Promise.reject(new Error('Fullscreen not supported'));
                };

                const exitFS = async () => {
                    if (document.exitFullscreen) return document.exitFullscreen();
                    if (document.webkitExitFullscreen) return document.webkitExitFullscreen();
                    if (document.mozCancelFullScreen) return document.mozCancelFullScreen();
                    if (document.msExitFullscreen) return document.msExitFullscreen();
                    return Promise.reject(new Error('Exit fullscreen not supported'));
                };

                // If already fullscreen -> exit
                const current = isCurrentlyFS();
                if (current) {
                    exitFS().catch(() => {}); // fail silently
                    return;
                }

                // Try each preferred target until one succeeds
                (async () => {
                    for (let i = 0; i < targets.length; i++) {
                        const t = targets[i];
                        if (!t) continue;
                        try {
                            await requestOn(t);
                            // mark successful request and return
                            return;
                        } catch (e) {
                            // try next target
                            continue;
                        }
                    }
                    // As a last resort, try a CSS-based "pseudo-fullscreen" by toggling a class on html
                    try {
                        document.documentElement.classList.toggle('lumina-pseudo-fullscreen');
                        // keep body overflow hidden so layout behaves like fullscreen
                        if (document.documentElement.classList.contains('lumina-pseudo-fullscreen')) document.body.style.overflow = 'hidden';
                        else document.body.style.overflow = '';
                    } catch (_) {}
                })();
            } catch (err) {
                try { console.warn('toggleFullscreen error', err); } catch(_) {}
            }
        }

        // Skip intro: seeks past saved intro metadata (works for native video and YouTube iframe)
        function skipIntro() {
            try {
                if (!player || !player.context) {
                    showToast('Nenhum episódio com abertura disponível.');
                    return;
                }
                const start = Number(player.context.introStart || 0);
                const dur = Number(player.context.introDuration || 0);
                if (!start || !dur) {
                    showToast('Nenhum dado de abertura encontrado para este episódio.');
                    return;
                }
                const target = start + dur;
                // YouTube
                if (player.isYouTube && player.ytPlayer && typeof player.ytPlayer.seekTo === 'function') {
                    try { player.ytPlayer.seekTo(target, true); showToast('Abertura pulada.'); } catch (_) { showToast('Falha ao pular abertura.'); }
                    return;
                }
                // native video
                if (player.vid) {
                    try { player.vid.currentTime = target; showToast('Abertura pulada.'); } catch (e) { showToast('Falha ao pular abertura.'); }
                    return;
                }
                // iframe fallback: cannot seek reliably
                showToast('Não é possível pular abertura neste tipo de embed.');
            } catch (e) {
                console.warn('skipIntro failed', e);
                showToast('Erro ao tentar pular abertura.');
            }
        }

        // Picture-in-Picture toggle for native video (graceful non-blocking fallback)
        async function togglePiP() {
            try {
                // 1) Prefer native HTMLVideoElement for PiP when available
                const vidEl = (player && player.vid) ? player.vid : document.querySelector('#main-video');
                if (vidEl && typeof vidEl.requestPictureInPicture === 'function') {
                    try {
                        if (document.pictureInPictureElement === vidEl) {
                            await document.exitPictureInPicture();
                        } else {
                            await vidEl.requestPictureInPicture();
                        }
                        return;
                    } catch (err) {
                        // continue to other fallbacks if native PiP fails
                        console.warn('Native PiP failed, falling back to iframe attempts', err);
                    }
                }

                // 2) If playing via YouTube API, try the YT iframe node for PiP (best-effort)
                try {
                    if (player && player.isYouTube) {
                        const ytIframe = document.querySelector('#yt-player iframe, #player-media-wrapper iframe[src*="youtube.com"]');
                        if (ytIframe) {
                            // ensure allow attribute includes picture-in-picture for best compatibility
                            const cur = (ytIframe.getAttribute('allow') || '');
                            if (!/picture-in-picture/i.test(cur)) {
                                try { ytIframe.setAttribute('allow', (cur + '; autoplay; picture-in-picture; fullscreen').replace(/;;+/g,';')); } catch(_) {}
                            }
                            if (typeof ytIframe.requestPictureInPicture === 'function') {
                                try {
                                    if (document.pictureInPictureElement === ytIframe) await document.exitPictureInPicture();
                                    else await ytIframe.requestPictureInPicture();
                                    return;
                                } catch (err) {
                                    // some browsers block cross-origin iframe PiP; fallback below
                                    console.warn('YT iframe.requestPictureInPicture failed', err);
                                }
                            }
                        }
                    }
                } catch (ytErr) {
                    console.warn('YT iframe PiP attempt failed', ytErr);
                }

                // 3) Try iframe-based PiP for other embeds (generic)
                const possibleIframes = Array.from(document.querySelectorAll('#player-media-wrapper iframe'));
                for (const ifr of possibleIframes) {
                    try {
                        if (!ifr) continue;
                        const curAllow = (ifr.getAttribute('allow') || '');
                        if (!/picture-in-picture/i.test(curAllow)) {
                            try { ifr.setAttribute('allow', (curAllow + '; picture-in-picture').replace(/;;+/g,';')); } catch(_) {}
                        }
                        if (typeof ifr.requestPictureInPicture === 'function') {
                            if (document.pictureInPictureElement === ifr) {
                                await document.exitPictureInPicture();
                            } else {
                                await ifr.requestPictureInPicture();
                            }
                            return;
                        }
                    } catch (inner) {
                        console.warn('iframe PiP attempt failed for one iframe, trying next', inner);
                    }
                }

                // 4) Fallback: inform the user PiP isn't available for this embed (clear guidance)
                if (document.pictureInPictureEnabled) {
                    showToast('PiP não disponível para este tipo de embed (alguns iframes/YouTube não permitem PiP).', 3200);
                } else {
                    showToast('Picture-in-Picture não suportado neste navegador.', 2200);
                }
            } catch (e) {
                console.warn('togglePiP overall failed', e);
                showToast('Não foi possível ativar PiP.');
            }
        }

        // small ephemeral toast helper (non-blocking feedback for PiP/fallbacks)
        function showToast(msg, duration = 2200) {
            try {
                let t = document.getElementById('lumina-toast');
                if (!t) {
                    t = document.createElement('div');
                    t.id = 'lumina-toast';
                    t.style.position = 'fixed';
                    t.style.left = '50%';
                    t.style.transform = 'translateX(-50%)';
                    t.style.bottom = '18px';
                    t.style.zIndex = '99999';
                    t.style.padding = '10px 14px';
                    t.style.background = 'rgba(0,0,0,0.7)';
                    t.style.color = 'white';
                    t.style.borderRadius = '12px';
                    t.style.fontSize = '13px';
                    t.style.backdropFilter = 'blur(6px)';
                    t.style.boxShadow = '0 8px 30px rgba(0,0,0,0.55)';
                    document.body.appendChild(t);
                }
                t.innerText = msg;
                t.style.opacity = '1';
                // reset hide timer
                if (t._hideTimer) clearTimeout(t._hideTimer);
                t._hideTimer = setTimeout(() => {
                    t.style.transition = 'opacity 260ms ease';
                    t.style.opacity = '0';
                    setTimeout(() => {
                        try { t.remove(); } catch(_) {}
                    }, 300);
                }, duration);
            } catch (e) { /* ignore */ }
        }

        // Google Cast integration: load sender SDK and provide openCast / playOnTV helpers
        (function(){
            // Insert Cast SDK script tag (non-blocking)
            const castScriptUrl = "https://www.gstatic.com/cv/js/sender/v1/cast_sender.js?loadCastFramework=1";
            if (!document.querySelector(`script[src="${castScriptUrl}"]`)) {
                const s = document.createElement('script');
                s.src = castScriptUrl;
                s.async = true;
                document.head.appendChild(s);
            }

            // Exposed helper to open Cast chooser and then load current media
            window.openCast = function() {
                try {
                    // If Cast SDK not yet available, show a non-blocking toast instead of opening legal modal
                    if (!window.cast || !window.cast.framework) {
                        showToast('Cast SDK indisponível neste dispositivo.');
                        return;
                    }
                    // ensure SDK initialized
                    initializeCast();
                    // request a session (this will show the native picker)
                    const ctx = cast.framework.CastContext.getInstance();
                    ctx.requestSession().then(() => {
                        // after session is created, attempt to play current media on TV
                        playOnTV();
                    }).catch(() => {
                        // user cancelled or session failed; notify lightly
                        showToast('Sessão Cast não iniciada.');
                    });
                } catch (e) {
                    // fallback UX: show toast
                    showToast('Não foi possível iniciar o Cast.');
                }
            };

            // safe initializer called by the SDK callback or on demand
            window.initializeCast = function() {
                try {
                    if (!window.cast || !window.cast.framework) return;
                    const ctx = cast.framework.CastContext.getInstance();
                    // avoid re-setting options repeatedly
                    if (!ctx._lumina_cast_initialized) {
                        ctx.setOptions({
                            receiverApplicationId: chrome.cast.media.DEFAULT_MEDIA_RECEIVER_APP_ID,
                            autoJoinPolicy: chrome.cast.AutoJoinPolicy.ORIGIN_SCOPED
                        });
                        ctx._lumina_cast_initialized = true;
                    }
                } catch (e) { /* ignore init errors */ }
            };

            // The SDK calls this when available
            window['__onGCastApiAvailable'] = function(isAvailable) {
                if (isAvailable) {
                    try { initializeCast(); } catch (e) {}
                }
            };

            // Play current player media on TV (uses player.context.url or native video src)
            window.playOnTV = async function() {
                try {
                    if (!window.cast || !window.cast.framework) {
                        // Cast SDK not available — do not open legal modal; provide non-blocking feedback
                        showToast('Cast não disponível neste dispositivo.');
                        return;
                    }
                    const ctx = cast.framework.CastContext.getInstance();
                    const session = ctx.getCurrentSession();
                    if (!session) {
                        // no session: open chooser first
                        try {
                            await ctx.requestSession();
                        } catch (e) {
                            // user cancelled or session failed — just notify
                            showToast('Sessão Cast não iniciada.');
                            return;
                        }
                    }

                    const finalSession = ctx.getCurrentSession();
                    if (!finalSession) {
                        showToast('Nenhuma sessão Cast ativa.');
                        return;
                    }

                    // determine a usable media URL and MIME type
                    let mediaUrl = null;
                    let mime = 'video/mp4';

                    if (player && player.context && player.context.url) mediaUrl = player.context.url;
                    else {
                        const vid = player && player.vid ? player.vid : document.querySelector('#main-video');
                        if (vid && (vid.currentSrc || vid.src)) {
                            mediaUrl = vid.currentSrc || vid.src;
                            // attempt to infer mime from extension
                            const ext = (mediaUrl.split('?')[0].split('.').pop() || '').toLowerCase();
                            if (ext === 'webm') mime = 'video/webm';
                            if (ext === 'm3u8') mime = 'application/x-mpegURL';
                        }
                    }

                    if (!mediaUrl) {
                        showToast('Nenhuma mídia disponível para transmitir.');
                        return;
                    }

                    // build MediaInfo and LoadRequest
                    const mediaInfo = new chrome.cast.media.MediaInfo(mediaUrl, mime);
                    // optional metadata
                    if (player && player.context) {
                        mediaInfo.metadata = new chrome.cast.media.GenericMediaMetadata();
                        mediaInfo.metadata.title = (player && player.context && (player.context.seriesTitle || player.context.title)) || document.getElementById('player-ep-title')?.innerText || '';
                        mediaInfo.metadata.subtitle = (player && player.context && (player.context.seriesTitle || '')) || '';
                        // poster
                        let poster = null;
                        if (player && player.context && player.context.seriesId) {
                            const seriesData = db.find(i => i.id === player.context.seriesId);
                            poster = seriesData ? seriesData.cover : null;
                        }
                        if (!poster && db && db.length) {
                            // fallback to hero or first in DB
                            poster = (db.find(i => i.id === (player && player.context && player.context.seriesId)) || db[0]).cover;
                        }
                        if (poster) mediaInfo.metadata.images = [{ url: poster }];
                    }

                    const request = new chrome.cast.media.LoadRequest(mediaInfo);
                    finalSession.loadMedia(request).then(() => {
                        // optional: notify user briefly
                        showToast('Reproduzindo na TV');
                    }).catch((err) => {
                        console.warn('Cast load failed', err);
                        showToast('Não foi possível reproduzir na TV.');
                    });
                } catch (e) {
                    console.warn('playOnTV failed', e);
                    // always avoid opening legal modal from the Cast flow; show a gentle toast instead
                    showToast('Erro ao tentar transmitir na TV.');
                }
            };
        })();
        // AirPlay helper: on iOS/Safari call webkitShowPlaybackTargetPicker on the currently playing video element
        window.playOnAirPlay = function() {
            try {
                // find the active native video element used by the player
                const vid = (player && player.vid) ? player.vid : document.querySelector('#main-video');
                if (!vid) {
                    showToast('Nenhum vídeo ativo para AirPlay.');
                    return;
                }
                // webkitShowPlaybackTargetPicker triggers the native AirPlay target picker in Safari/iOS
                if (typeof vid.webkitShowPlaybackTargetPicker === 'function') {
                    vid.webkitShowPlaybackTargetPicker();
                } else {
                    showToast('AirPlay não disponível neste dispositivo.');
                }
            } catch (e) {
                console.warn('AirPlay failed', e);
                showToast('Não foi possível abrir o AirPlay.');
            }
        };

        function updatePlayBtns(p) {
            const i = p ? 'ph-play' : 'ph-pause';
            const center = document.getElementById('center-play-btn');
            const bottom = document.getElementById('bottom-play-btn');
            if(center) center.innerHTML = `<i class="ph-fill ${i}"></i>`;
            if(bottom) bottom.innerHTML = `<i class="ph-fill ${i} text-2xl"></i>`;
        }
        function updateVolIcon() {
            const b = document.getElementById('mute-btn');
            const v = player.vid;
            if(!v) { b.innerHTML = '<i class="ph-fill ph-speaker-high text-xl"></i>'; return; }
            if(v.muted || v.volume === 0) b.innerHTML = '<i class="ph-fill ph-speaker-x text-xl text-white/50"></i>';
            else if(v.volume < 0.5) b.innerHTML = '<i class="ph-fill ph-speaker-low text-xl"></i>';
            else b.innerHTML = '<i class="ph-fill ph-speaker-high text-xl"></i>';
        }
        function formatTime(s) {
            if (isNaN(s)) return "00:00";
            const h = Math.floor(s / 3600), m = Math.floor((s % 3600) / 60), sec = Math.floor(s % 60);
            return h > 0 ? `${h}:${m.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}` : `${m.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
        }

        // Attach subtitle <track> elements to a video element from an array of subtitle descriptors.
        // Each descriptor: { src, kind, srclang, label, default }
        // Improved: create VTT blobs when needed and ensure textTracks mode is set reliably once tracks are ready.
        async function attachSubtitlesToVideo(videoEl, subs) {
            try {
                if (!videoEl || !subs || !Array.isArray(subs)) return;
                // Remove existing tracks first
                try {
                    const existing = Array.from(videoEl.querySelectorAll('track'));
                    existing.forEach(t => t.remove());
                } catch(_) {}

                for (const s of subs) {
                    try {
                        if (!s || !s.src) continue;

                        // If the incoming src looks like .srt, convert it to VTT blob and use an object URL
                        let trackSrc = s.src;
                        try {
                            if (/\.srt(\?|$)/i.test(s.src)) {
                                // fetch SRT and convert to VTT in-memory
                                const res = await fetch(s.src, { cache: 'no-store' }).catch(()=>null);
                                if (res && res.ok) {
                                    const srtText = await res.text().catch(()=>'');
                                    const vtt = 'WEBVTT\n\n' + srtText.replace(/\r+/g,'').replace(/(\d+):(\d+):(\d+),(\d+)/g, '$1:$2:$3.$4');
                                    const blob = new Blob([vtt], { type: 'text/vtt' });
                                    trackSrc = URL.createObjectURL(blob);
                                }
                            }
                        } catch(_) {
                            // fallback: use original src
                            trackSrc = s.src;
                        }

                        const tr = document.createElement('track');
                        tr.kind = s.kind || 'subtitles';
                        tr.src = trackSrc;
                        if (s.srclang) tr.srclang = s.srclang;
                        if (s.label) tr.label = s.label;
                        if (s.default) tr.default = true;
                        // append track; many browsers only populate textTracks after adding to DOM
                        videoEl.appendChild(tr);

                        // Wait until the browser has processed the track element, then ensure the mode on the textTrack is set.
                        const ensureMode = () => {
                            try {
                                const tracks = videoEl.textTracks || [];
                                for (let i = 0; i < tracks.length; i++) {
                                    const tt = tracks[i];
                                    // match by label or srclang or kind
                                    if ((s.label && tt.label === s.label) || (s.srclang && tt.language && tt.language.toLowerCase().indexOf(String(s.srclang).toLowerCase())!==-1) || tt.kind === (s.kind || 'subtitles')) {
                                        try {
                                            // Force visible: we set to 'showing' to ensure captions appear in UI,
                                            // but respect explicit default=false by still enabling display programmatically.
                                            tt.mode = 'showing';
                                        } catch(_) {
                                            // some engines require setting on the track element after a tiny delay
                                            setTimeout(() => { try { tt.mode = 'showing'; } catch(_) {} }, 120);
                                        }
                                    }
                                }
                                // Also ensure our captions toggle/button exists and reflects visible state
                                try { 
                                    if (typeof ensureCaptionsButton === 'function') ensureCaptionsButton(videoEl); 
                                    const btn = document.getElementById('lumina-captions-btn');
                                    if (btn) btn.style.display = ''; // make sure the button is visible
                                    // mark button as active visually when showing
                                    try { if (btn) btn.style.background = 'linear-gradient(90deg,#8b5cf6,#7c3aed)'; } catch(_) {}
                                } catch(_) {}
                            } catch(_) {}
                        };

                        // If track.readyState available, wait for load; otherwise schedule short fallback
                        try {
                            if (typeof tr.readyState !== 'undefined') {
                                tr.addEventListener('load', () => { try { ensureMode(); } catch(_) {} }, { once: true });
                                // small timeout fallback
                                setTimeout(() => { try { ensureMode(); } catch(_) {} }, 300);
                            } else {
                                setTimeout(() => { try { ensureMode(); } catch(_) {} }, 350);
                            }
                        } catch(_) {
                            setTimeout(() => { try { ensureMode(); } catch(_) {} }, 350);
                        }
                    } catch(_) {}
                }

                // final safety: if there are now textTracks, set first portuguese or first track to showing after short delay
                try {
                    setTimeout(() => {
                        try {
                            const tracks = videoEl.textTracks || [];
                            if (!tracks || tracks.length === 0) return;
                            // prefer pt-BR or pt
                            let chosen = null;
                            for (let i=0;i<tracks.length;i++) {
                                const tt = tracks[i];
                                if (tt.language && /pt/i.test(tt.language)) { chosen = tt; break; }
                            }
                            if (!chosen) chosen = tracks[0];
                            if (chosen) {
                                try { chosen.mode = 'showing'; } catch(_) { setTimeout(()=>{ try{ chosen.mode='showing'; }catch(_){} },120); }
                            }
                            // ensure UI captions button present
                            try { if (typeof ensureCaptionsButton === 'function') ensureCaptionsButton(videoEl); } catch(_) {}
                        } catch(_) {}
                    }, 420);
                } catch(_) {}

            } catch (e) {
                console.warn('attachSubtitlesToVideo error', e);
            }
        }

        function dismissNextEp(instant = false) {
            const prompt = document.getElementById('next-ep-prompt');
            prompt.classList.add('opacity-0', 'translate-y-4');
            setTimeout(() => prompt.classList.add('hidden'), instant ? 0 : 500);
        }

        function playNextEpisode() {
            if(!player.context || !player.context.nextEp) return;
            if(!player.isEmbed) player.saveProgress();
            
            const nextCtx = player.context.nextEp;
            const seriesData = db.find(i => i.id === player.context.seriesId);
            const epData = seriesData.seasons[nextCtx.s][nextCtx.e];
            
            const nNextE = nextCtx.e + 1 < seriesData.seasons[nextCtx.s].length ? seriesData.seasons[nextCtx.s][nextCtx.e+1] : null;
            const newNextCtx = nNextE && nNextE.url ? { url: nNextE.url, title: `T${nextCtx.s}:E${nextCtx.e+2} - ${nNextE.title}`, s: nextCtx.s, e: nextCtx.e+1 } : null;
            
            let baseEpId = epData.id ? epData.id : `s${nextCtx.s}-e${nextCtx.e}`;
            const stableEpId = baseEpId.includes(seriesData.id) ? baseEpId : `${seriesData.id}-${baseEpId}`;

            const fullContext = {
                type: 'serie', seriesId: seriesData.id, seriesTitle: seriesData.title,
                season: nextCtx.s, episode: nextCtx.e, id: stableEpId,
                trigger: seriesData.nextEpisodeTrigger || 0, nextEp: newNextCtx, url: epData.url,
                subtitles: (epData && Array.isArray(epData.subtitles)) ? epData.subtitles : []
            };

            dismissNextEp(true); if(player.vid) player.vid.pause();
            player.init(epData.url, nextCtx.title, fullContext);
            changeSeason(seriesData.id, nextCtx.s);
        }

        // helper: scroll a session horizontally with clamping and center-snap on mobile
        function scrollCards(containerId, dir = 1) {
            const el = document.getElementById(containerId);
            if (!el) return;
            const children = Array.from(el.children).filter(n => n.nodeType === 1);
            if (!children.length) return;

            // compute sizes and current index based on center alignment
            const containerWidth = el.clientWidth || Math.max(window.innerWidth * 0.8, 320);
            // find the child whose center is closest to container center
            const centerX = el.scrollLeft + containerWidth / 2;
            const childCenters = children.map(c => (c.offsetLeft + c.offsetWidth / 2));
            // current centered index
            let currentIdx = 0;
            let bestDiff = Infinity;
            for (let i = 0; i < childCenters.length; i++) {
                const d = Math.abs(childCenters[i] - centerX);
                if (d < bestDiff) { bestDiff = d; currentIdx = i; }
            }

            // target index after moving dir steps
            let targetIdx = currentIdx + (dir > 0 ? 1 : -1);
            // clamp within bounds
            targetIdx = Math.max(0, Math.min(children.length - 1, targetIdx));

            // compute target scrollLeft so the chosen child is centered
            const child = children[targetIdx];
            const targetScroll = Math.max(0, Math.round(child.offsetLeft + (child.offsetWidth - containerWidth) / 2));

            // scroll smoothly to center the card
            el.scrollTo({ left: targetScroll, behavior: 'smooth' });

            // update arrows immediately (they reflect ability to move further)
            updateSessionArrows(containerId);

            // set up a snap-after-scroll for manual swipes too (debounced)
            if (el.__snapTimer) clearTimeout(el.__snapTimer);
            el.__snapTimer = setTimeout(() => {
                try {
                    snapContainerToNearest(el);
                    updateSessionArrows(containerId);
                } catch (_) {}
            }, 260);
        }

        // Snap the container to the nearest child so one card stays centered (used after manual scroll)
        function snapContainerToNearest(el) {
            if (!el) return;
            const children = Array.from(el.children).filter(n => n.nodeType === 1);
            if (!children.length) return;
            const containerWidth = el.clientWidth || Math.max(window.innerWidth * 0.8, 320);
            const centerX = el.scrollLeft + containerWidth / 2;
            let bestIdx = 0; let bestDiff = Infinity;
            children.forEach((c, i) => {
                const cCenter = c.offsetLeft + c.offsetWidth / 2;
                const d = Math.abs(cCenter - centerX);
                if (d < bestDiff) { bestDiff = d; bestIdx = i; }
            });
            const target = children[bestIdx];
            const targetScroll = Math.max(0, Math.round(target.offsetLeft + (target.offsetWidth - containerWidth) / 2));
            el.scrollTo({ left: targetScroll, behavior: 'smooth' });
        }

        // Update left/right arrow visibility/interaction for a session scroller (disable when at ends)
        function updateSessionArrows(containerId) {
            const el = document.getElementById(containerId);
            if (!el) return;
            const wrap = el.closest('.session-wrap') || document.getElementById(containerId + '-wrap') || el.parentElement;
            if (!wrap) return;

            const leftBtn = wrap.querySelector('.session-arrow.left');
            const rightBtn = wrap.querySelector('.session-arrow.right');

            const children = Array.from(el.children).filter(n => n.nodeType === 1);
            if (!children.length) {
                if (leftBtn) { leftBtn.style.pointerEvents = 'none'; leftBtn.style.opacity = '0.18'; }
                if (rightBtn) { rightBtn.style.pointerEvents = 'none'; rightBtn.style.opacity = '0.18'; }
                return;
            }

            // determine which child is currently centered
            const containerWidth = el.clientWidth || Math.max(window.innerWidth * 0.8, 320);
            const centerX = el.scrollLeft + containerWidth / 2;
            let currentIdx = 0; let bestDiff = Infinity;
            for (let i = 0; i < children.length; i++) {
                const c = children[i];
                const cCenter = c.offsetLeft + c.offsetWidth / 2;
                const d = Math.abs(cCenter - centerX);
                if (d < bestDiff) { bestDiff = d; currentIdx = i; }
            }

            // enable/disable
            if (leftBtn) {
                if (currentIdx <= 0) { leftBtn.style.pointerEvents = 'none'; leftBtn.style.opacity = '0.18'; }
                else { leftBtn.style.pointerEvents = ''; leftBtn.style.opacity = ''; }
            }
            if (rightBtn) {
                if (currentIdx >= children.length - 1) { rightBtn.style.pointerEvents = 'none'; rightBtn.style.opacity = '0.18'; }
                else { rightBtn.style.pointerEvents = ''; rightBtn.style.opacity = ''; }
            }
        }

        // attach scroll snapping listeners to dynamic session scrollers so manual swipes also snap and arrow states update
        (function attachSessionScrollSnapObservers() {
            try {
                const observer = new MutationObserver((mutations) => {
                    // whenever session-scroll nodes appear, attach listeners
                    const candidates = Array.from(document.querySelectorAll('.session-scroll'));
                    candidates.forEach(el => {
                        if (el.__lumina_snap_attached) return;
                        el.__lumina_snap_attached = true;
                        // on scroll, debounce snap and update arrows
                        let t = null;
                        el.addEventListener('scroll', () => {
                            if (t) clearTimeout(t);
                            // update arrows live for better feedback
                            try { updateSessionArrows(el.id || (el.getAttribute('id') || '')); } catch(_) {}
                            t = setTimeout(() => {
                                try { snapContainerToNearest(el); updateSessionArrows(el.id || (el.getAttribute('id') || '')); } catch(_) {}
                            }, 220);
                        }, { passive: true });

                        // initialize arrow state for existing scrollers
                        try { updateSessionArrows(el.id || (el.getAttribute('id') || '')); } catch(_) {}
                    });
                });

                if (document && document.body) {
                    observer.observe(document.body, { childList: true, subtree: true });
                    // run once immediately to bind existing elements
                    setTimeout(() => {
                        const initial = Array.from(document.querySelectorAll('.session-scroll'));
                        initial.forEach(el => {
                            if (el.__lumina_snap_attached) return;
                            el.__lumina_snap_attached = true;
                            let t = null;
                            el.addEventListener('scroll', () => {
                                if (t) clearTimeout(t);
                                try { updateSessionArrows(el.id || (el.getAttribute('id') || '')); } catch(_) {}
                                t = setTimeout(() => {
                                    try { snapContainerToNearest(el); updateSessionArrows(el.id || (el.getAttribute('id') || '')); } catch(_) {}
                                }, 220);
                            }, { passive: true });
                            try { updateSessionArrows(el.id || (el.getAttribute('id') || '')); } catch(_) {}
                        });
                    }, 80);
                }
            } catch (e) {
                // non-fatal
            }

            // Also update arrows on resize/orientation change
            window.addEventListener('resize', () => {
                try { Array.from(document.querySelectorAll('.session-scroll')).forEach(el => updateSessionArrows(el.id || (el.getAttribute('id') || ''))); } catch(_) {}
            }, { passive: true });
        })();

        // mobile: toggle collapse sections with smooth max-height + caret rotation animation
        window.toggleSectionMobile = function(sectionId) {
            const sec = document.getElementById(sectionId);
            if (!sec) return;
            const body = sec.querySelector('.session-body');
            const btn = sec.querySelector('.mobile-toggle-btn');
            const isCollapsed = sec.classList.contains('mobile-collapsed');

            // Prepare button content and rotated caret element
            if (btn) {
                // ensure structure: <i class="caret ..."></i><span>...</span>
                const open = isCollapsed; // we're about to open when collapsed
                btn.innerHTML = `<i class="ph caret ${open ? 'ph-caret-up' : 'ph-caret-down'} text-white/60"></i><span class="text-white/70 text-sm">${open ? 'Fechar' : 'Abrir'}</span>`;
            }

            // Animate max-height for smooth collapse/expand
            if (!body) {
                sec.classList.toggle('mobile-collapsed');
                return;
            }

            if (isCollapsed) {
                // OPEN: remove collapsed class so CSS allows big max-height; set explicit max-height from scrollHeight for transition
                sec.classList.remove('mobile-collapsed');
                const fullH = body.scrollHeight;
                body.style.maxHeight = fullH + 'px';
                // after transition ends, clear inline max-height to be flexible
                setTimeout(() => { body.style.maxHeight = ''; }, 400);
            } else {
                // CLOSE: set current height then animate to 0
                const curH = body.scrollHeight;
                body.style.maxHeight = curH + 'px';
                // next frame collapse
                requestAnimationFrame(() => {
                    body.style.maxHeight = '0px';
                    // after transition complete, mark as collapsed to apply final styles
                    setTimeout(() => {
                        sec.classList.add('mobile-collapsed');
                    }, 360);
                });
            }
        }

                // When rendering card lists, ensure items are wrapped as session-card to keep side-by-side layout
        const origRender16by9 = render16by9CatalogCards;
        render16by9CatalogCards = function(data, container) {
            if (!container) return;
            // Always render cards as session-card so trends match Continue Watching sizing
            const useSessionCard = true;
            
            data.forEach(item => {
                const card = document.createElement('div');
                card.className = useSessionCard ? 'hover-card cursor-pointer group relative session-card' : 'hover-card cursor-pointer group relative';
                card.onclick = () => openDetails(item.id);

                // build tags badges HTML if present
                // Only show a single badge per item (use first tag when present) and map it to a colorful class.
                // Suppress badges when rendering inside the favorites grid (fav-grid)
                const tag = (item.tags && Array.isArray(item.tags) && item.tags.length) ? item.tags[0] : null;
                const tagToClass = (t) => {
                    if (!t) return 'badge-gray';
                    const key = String(t).toLowerCase().trim();

                    // support "Take 1" .. "Take 8" (and variants like "take1", "take-3")
                    const takeMatch = key.match(/take[\s\-]*(\d+)/i);
                    if (takeMatch) {
                        let idx = parseInt(takeMatch[1], 10) || 1;
                        idx = Math.max(1, Math.min(8, idx)); // clamp 1..8
                        return `badge-take${idx}`;
                    }

                    // curated keyword -> badge mapping (wider palette and friendlier tints)
                    if (/lan(ç|c)amento|lançamento|lancamento|novo|estreia/i.test(key)) return 'badge-indigo';
                    if (/popular|em alta|destaque|top|hit/i.test(key)) return 'badge-rose';
                    if (/nova temporada|temporada/i.test(key)) return 'badge-amber';
                    if (/novo episodio|novo episódio|episodio|episódio|episódio novo/i.test(key)) return 'badge-cyan';
                    if (/exclusivo|exclusiva/i.test(key)) return 'badge-pink';
                    if (/comédia|comedia|família|aventura|família/i.test(key)) return 'badge-emerald';
                    if (/animação|animação|animaçao|anima/i.test(key)) return 'badge-teal';
                    if (/ação|acao|aventura/i.test(key)) return 'badge-orange';
                    if (/série|serie|temporada/i.test(key)) return 'badge-indigo';
                    if (/recomendado|recomendação|recomendado para você/i.test(key)) return 'badge-blue';
                    // fallback
                    return 'badge-gray';
                };

                // Determine whether to show badges: hide on favorites grid
                let tagsHtml = '';
                try {
                    const suppressBadges = container && (container.id === 'fav-grid' || container.closest && container.closest('#fav-grid'));
                    if (!suppressBadges && tag && tagShouldShow(tag)) {
                        tagsHtml = `<div class="card-badge ${tagToClass(tag)}">${String(tag)}</div>`;
                    } else {
                        tagsHtml = '';
                    }
                } catch (e) {
                    // On any error default to showing the tag (but still obey chance)
                    if (tag && tagShouldShow(tag)) tagsHtml = `<div class="card-badge ${tagToClass(tag)}">${String(tag)}</div>`;
                    else tagsHtml = '';
                }

                // ensure stable cover and onerror fallback that preserves aspect ratio/size
                const coverSrc = (item.cover && item.cover.trim()) ? item.cover : 'fiveicon.png';
                const imgOnError = `this.onerror=null;this.src='fiveicon.png';this.classList.add('loaded');this.style.objectFit='cover';`;

                // Provide both src and data-src so the resilient loader and browsers have a stable source to fetch from.
                // determine progress for this item if exists (try multiple key variants)
                let pct = 0;
                try {
                    // attempt to find a progress entry for common keys (item.id, item.id_ep, stable episodic keys)
                    const searchKeys = [];
                    if (item.id) searchKeys.push(String(item.id));
                    if (item.id_ep) searchKeys.push(String(item.id_ep));
                    // try to detect first-episode stable id pattern for series cards (best-effort)
                    if (item.seasons && Object.keys(item.seasons).length) {
                        const firstSeason = Object.keys(item.seasons)[0];
                        const firstEp = (item.seasons[firstSeason] && item.seasons[firstSeason][0]) ? item.seasons[firstSeason][0] : null;
                        if (firstEp && firstEp.id) searchKeys.push(String(firstEp.id));
                    }
                    // also check state.progress for keys that end with item.id (legacy tolerant)
                    if (window.state && window.state.progress) {
                        const keys = Object.keys(window.state.progress);
                        keys.forEach(k => {
                            try {
                                if (!k) return;
                                if (item.id && String(k).includes(String(item.id))) searchKeys.push(k);
                            } catch(_) {}
                        });
                    }
                    // find first matching progress
                    let foundProg = null;
                    for (const k of (searchKeys || [])) {
                        if (!k) continue;
                        const p = (window.state && window.state.progress && window.state.progress[k]) ? window.state.progress[k] : null;
                        if (p) { foundProg = p; break; }
                    }
                    if (foundProg && typeof foundProg === 'object') {
                        const t = Number(foundProg.time || 0);
                        const d = Number(foundProg.duration || 0);
                        if (d > 0) pct = Math.min(100, (t / d) * 100);
                        else if (t > 0) pct = Math.min(100, (t / (t + 60)) * 100);
                        if (!isFinite(pct) || pct < 0) pct = 0;
                        if (pct > 100) pct = 100;
                    }
                } catch (_) { pct = 0; }

                // watched class and check badge when pct > 90
                const watchedClass = pct > 90 ? 'is-watched' : '';
                const checkBadgeHtml = pct > 90 ? `<div class="watched-check-badge" title="Assistido"><svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"><path d="M20 6L9 17l-5-5"></path></svg></div>` : '';
                const progressHtml = pct > 0 ? `<div class="progress-bar-container"><div class="progress-bar-fill" style="width:${pct}%;"></div></div>` : '';

                card.className = card.className + ' ' + watchedClass;

                card.innerHTML = `
                    <div class="aspect-video relative rounded-xl md:rounded-2xl overflow-hidden bg-surface mb-3 border border-white/5">
                        <img loading="lazy" decoding="async" data-db-cover="1" data-src="${coverSrc}" src="${coverSrc}" onerror="${imgOnError}" class="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-500" onload="this.classList.add('loaded')">
                        <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        
                        <!-- Play Icon Hover -->
                        <div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <div class="w-12 h-12 rounded-full glass flex items-center justify-center text-white shadow-lg transform scale-75 group-hover:scale-100 transition-all duration-300">
                                <i class="ph-fill ph-play text-xl ml-0.5"></i>
                            </div>
                        </div>
                        ${tagsHtml}
                        ${checkBadgeHtml}
                        ${progressHtml}
                    </div>
                    <div class="px-1">
                        <h3 class="text-white font-medium text-sm truncate">${item.title}</h3>
                        <div class="flex items-center gap-2 mt-1">
                            ${getAgeBadge(item.ageRating)}
                            <p class="text-white/40 text-[11px] truncate">${formatCategory(item.category)}</p>
                        </div>
                    </div>
                `;
                container.appendChild(card);
            });
        };

        // ensure continue items render as session-card too
        const origRenderContinue = renderContinueCards;
        renderContinueCards = function(data, container) {
            if(!container) return;
            data.forEach(item => {
                const card = document.createElement('div');
                card.className = 'w-64 md:w-80 shrink-0 hover-card cursor-pointer group session-card';
                card.onclick = () => openDetails(item.id);
                
                const pct = Math.min(100, ((item._prog && item._prog.time && item._prog.duration) ? (item._prog.time / item._prog.duration) * 100 : ((item._prog && item._prog.time) ? Math.min(100, (item._prog.time / (item._prog.time + 60)) * 100) : 0)));
                const subtitle = item._hist ? `T${item._hist.s} : E${item._hist.e+1}` : 'Continuar filme';
                const watchedClass = pct > 90 ? 'is-watched' : '';
                const checkBadgeHtml = pct > 90 ? `<div class="watched-check-badge" title="Assistido"><svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"><path d="M20 6L9 17l-5-5"></path></svg></div>` : '';
                const progressHtml = pct > 0 ? `<div class="progress-bar-container"><div class="progress-bar-fill" style="width:${pct}%;"></div></div>` : '';

                card.className = card.className + ' ' + watchedClass;

                card.innerHTML = `
                    <div class="aspect-video relative rounded-xl overflow-hidden bg-surface mb-3 border border-white/5">
                        <img loading="lazy" decoding="async" data-db-cover="1" src="${item.cover}" class="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-500" onload="this.classList.add('loaded')">
                        <div class="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors"></div>
                        <div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <div class="w-12 h-12 rounded-full glass flex items-center justify-center text-white shadow-lg transform scale-75 group-hover:scale-100 transition-all duration-300">
                                <i class="ph-fill ph-play text-xl ml-0.5"></i>
                            </div>
                        </div>
                        ${checkBadgeHtml}
                        ${progressHtml}
                    </div>
                    <div class="px-1">
                        <h3 class="text-white font-medium text-sm truncate">${item.title}</h3>
                        <p class="text-white/50 text-[11px] mt-0.5">${subtitle}</p>
                    </div>
                `;
                container.appendChild(card);
            });
        };

        // Add extra Home sessions (lazy: use small filters). Appends sections after trends.
        function insertAdditionalSections() {
            try {
                const container = document.getElementById('main-content');
                if(!container || state.tab !== 'home') return;

                // Build a set of IDs to avoid repeating hero + continue items
                const heroId = db[0] ? db[0].id : null;
                const continueIds = getContinueWatching().map(i => i.id);
                const exclude = new Set([heroId, ...continueIds].filter(Boolean));

                // helper to pick items excluding those in exclude set
                const pick = (source, count = 8) => {
                    const out = [];
                    for (let i = 0; i < source.length && out.length < count; i++) {
                        if (!exclude.has(source[i].id)) {
                            out.push(source[i]);
                            exclude.add(source[i].id); // ensure we don't repeat between new sections
                        }
                    }
                    return out;
                };

                const wrap = document.createElement('div');
                wrap.className = 'px-6 md:px-16 relative z-20 mb-20 animate-slide-up';

                // Novidades: pick starting a bit later to reduce duplication with top of catalog
                const novidades = pick(db.slice(4).concat(db.slice(0,4)), 8);
                // Comédias: filter by category then pick excluding already used
                const comediasPool = db.filter(i => (i.category || '').toLowerCase().includes('comédia'));
                const comedias = pick(comediasPool, 8);
                // Recomendados: high-rated first, then pick excluding used
                const recomendadosPool = db.filter(i => i.ratings && i.ratings.imdb).sort((a,b)=> (b.ratings.imdb||0)-(a.ratings.imdb||0));
                const recomendados = pick(recomendadosPool.length ? recomendadosPool : db, 8);

                const isMobile = window.innerWidth <= 767;

                const buildSection = (title, id, items) => {
                    const sec = document.createElement('div');
                    // start collapsed on mobile for smoother one-screen UX
                    sec.className = 'mb-10 session-wrap relative' + (isMobile ? ' mobile-collapsed' : '');
                    // assign an explicit id to the outer section so the mobile toggle targets the wrapper (fixes mobile toggles)
                    sec.id = `${id}-wrap`;
                    sec.innerHTML = `
                        <div class="flex items-center justify-between mb-4">
                            <h2 class="text-lg font-display font-medium text-white">${title}</h2>
                            <!-- mobile toggle button -->
                            <button class="mobile-toggle-btn md:hidden" onclick="toggleSectionMobile('${id}-wrap')">
                                <i class="ph ph-caret-down text-white/60"></i>
                                <span class="text-white/70 text-sm">Abrir</span>
                            </button>
                        </div>
                        <div class="relative session-body">
                            <button class="session-arrow left" aria-label="${id}-left" onclick="scrollCards('${id}', -1)">
                                <i class="ph ph-caret-left text-2xl"></i>
                            </button>
                            <div id="${id}" class="session-scroll grid-auto-fit"></div>
                            <button class="session-arrow right" aria-label="${id}-right" onclick="scrollCards('${id}', 1)">
                                <i class="ph ph-caret-right text-2xl"></i>
                            </button>
                        </div>
                    `;
                    wrap.appendChild(sec);
                    render16by9CatalogCards(items, sec.querySelector(`#${id}`));
                };

                buildSection('Novidades', 'section-new-grid', novidades);
                buildSection('Comédias', 'section-comedy-grid', comedias);
                buildSection('Recomendados para você', 'section-reco-grid', recomendados);

                // append after the trends section if present, otherwise at end
                const trends = document.getElementById('section-trends');
                if(trends && trends.parentNode) trends.parentNode.insertBefore(wrap, trends.nextSibling);
                else container.appendChild(wrap);
            } catch(e) { /* fail silently */ }
        }

        // insert a small legal button and a "Surpreenda-me" pill at the end of Home and Search views (mobile-friendly & inside content)
        function insertLegalFooter() {
            try {
                const container = document.getElementById('main-content');
                if (!container) return;
                // remove any existing injected area to avoid duplicates
                const prev = document.getElementById('legal-footer-inserted');
                if (prev) prev.remove();

                // only show inside Home and Search
                if (state.tab !== 'home' && state.tab !== 'search') return;

                // Do NOT show the footer on mobile when viewing the Search tab
                if (state.tab === 'search' && window.innerWidth <= 767) return;

                // create a compact footer with two side-by-side pill buttons
                const wrapper = document.createElement('div');
                wrapper.id = 'legal-footer-inserted';
                wrapper.className = 'px-6 md:px-16 mt-6 mb-8 flex gap-3 items-center justify-center md:justify-start';

                // improved visual: left small hint and right action pills
                const leftInfo = document.createElement('div');
                leftInfo.className = 'hidden md:flex items-center gap-3 text-white/60 text-sm';
                leftInfo.innerHTML = `<i class="ph ph-gavel text-xl text-white/30"></i><span>Projeto de demonstração • Conteúdo de terceiros</span>`;

                const pills = document.createElement('div');
                pills.className = 'flex gap-3 flex-wrap';

                const legalBtn = document.createElement('button');
                legalBtn.className = 'glass px-4 py-2 rounded-full text-xs text-white/90 hover:text-white transition-colors flex items-center gap-2';
                legalBtn.innerHTML = `<i class="ph ph-file-text text-sm"></i><span>Aviso Legal</span>`;
                legalBtn.onclick = (e) => { e.stopPropagation(); openLegal2(); };

                const surpriseBtn = document.createElement('button');
                surpriseBtn.id = 'surprise-btn';
                surpriseBtn.className = 'bg-accent px-4 py-2 rounded-full text-xs font-semibold text-black hover:bg-accentHover transition-colors flex items-center gap-2';
                surpriseBtn.innerHTML = `<i class="ph ph-dice text-sm"></i><span>Surpreenda-me</span>`;
                surpriseBtn.onclick = (e) => { e.stopPropagation(); surpriseMe(); };

                pills.appendChild(surpriseBtn);
                pills.appendChild(legalBtn);

                wrapper.appendChild(leftInfo);
                wrapper.appendChild(pills);

                // append to container (end of content visible area)
                container.appendChild(wrapper);

                // small animation hint on first insert for discoverability
                requestAnimationFrame(() => {
                    try {
                        wrapper.style.opacity = '0';
                        wrapper.style.transform = 'translateY(6px)';
                        wrapper.style.transition = 'opacity 360ms ease, transform 360ms cubic-bezier(0.16,1,0.3,1)';
                        requestAnimationFrame(() => { wrapper.style.opacity = '1'; wrapper.style.transform = 'translateY(0)'; });
                        setTimeout(() => { wrapper.style.transition = ''; wrapper.style.opacity = ''; wrapper.style.transform = ''; }, 520);
                    } catch (e) {}
                });
            } catch (e) { /* silent */ }
        }

        // Surpreenda-me: pick a random item weighted by user's favorite genres/history and play it immediately.
        function surpriseMe() {
            try {
                // Build preferred genre set from favorites and history
                const favGenres = new Set();
                (state.favorites || []).forEach(fid => {
                    try {
                        const f = db.find(d => d.id === fid);
                        if (!f || !f.category) return;
                        f.category.split(/[,\/]| e | & /i).forEach(g => {
                            const ng = String(g || '').toLowerCase().trim();
                            if (ng) favGenres.add(ng);
                        });
                    } catch(_) {}
                });

                // also include genres from recently watched history items
                Object.keys(state.history || {}).forEach(seriesId => {
                    try {
                        const h = state.history[seriesId];
                        const s = db.find(d => d.id === seriesId);
                        if (!s || !s.category) return;
                        s.category.split(/[,\/]| e | & /i).forEach(g => {
                            const ng = String(g || '').toLowerCase().trim();
                            if (ng) favGenres.add(ng);
                        });
                    } catch(_) {}
                });

                // Build candidate pool: prefer items matching any preferred genre, fallback to whole DB
                let pool = [];
                if (favGenres.size > 0) {
                    const arr = Array.from(favGenres);
                    pool = db.filter(item => {
                        try {
                            const cat = (item.category || '').toLowerCase();
                            return arr.some(g => g && cat.includes(g));
                        } catch (e) { return false; }
                    });
                }
                if (!Array.isArray(pool) || pool.length === 0) {
                    // fallback: include recently viewed items and then everything
                    const recentIds = Object.keys(state.history || {}).sort((a,b) => {
                        const ta = (state.history[a] && state.history[a].timestamp) || 0;
                        const tb = (state.history[b] && state.history[b].timestamp) || 0;
                        return tb - ta;
                    });
                    pool = recentIds.map(id => db.find(d => d.id === id)).filter(Boolean);
                    if (pool.length < 6) pool = pool.concat(db.filter(i => !pool.includes(i))).slice(0, Math.max(8, db.length));
                }

                // choose a random item from pool (weighted slightly by matching tags / popularity)
                const scored = pool.map(item => {
                    let score = 1;
                    try { if (item.tags && item.tags.includes('Lançamento')) score += 2; } catch(_) {}
                    try { if (item.ratings && item.ratings.imdb) score += Math.min(3, Math.floor((item.ratings.imdb || 0) / 3)); } catch(_) {}
                    return { item, score };
                });
                const total = scored.reduce((s, x) => s + (x.score || 1), 0) || 1;
                let pick = Math.random() * total;
                let chosen = scored[0].item;
                for (const s of scored) {
                    pick -= s.score;
                    if (pick <= 0) { chosen = s.item; break; }
                }

                if (!chosen) {
                    showToast('Não foi possível encontrar algo agora. Tente novamente.', 2000);
                    return;
                }

                // If chosen is a film: play its url; if series: prefer user's last watched episode or first ep
                if (chosen.type === 'filme') {
                    if (!chosen.url) {
                        showToast('Desculpe, a mídia selecionada não está disponível.', 2000);
                        return;
                    }
                    // build context similar to openDetails/requestPlay expectations
                    const filmKey = chosen.id_ep || chosen.id;
                    const ctx = { type: 'filme', id: filmKey || ('url:' + encodeURIComponent(chosen.url)), url: chosen.url };
                    // ensure we're on home tab so player resources are available
                    switchTab('home', false);
                    setTimeout(() => requestPlay(chosen.url, chosen.title, ctx), 180);
                    return;
                } else if (chosen.type === 'serie') {
                    // determine season/episode: prefer history entry
                    const hist = state.history[chosen.id];
                    let s = hist ? hist.s : null;
                    let e = hist ? hist.e : null;
                    if (s == null) {
                        // pick first non-empty season
                        const seasons = Object.keys(chosen.seasons || {});
                        if (seasons.length) s = seasons[0];
                        else s = '1';
                        e = 0;
                    }
                    const seasonArr = chosen.seasons && chosen.seasons[s] ? chosen.seasons[s] : (chosen.seasons ? chosen.seasons[Object.keys(chosen.seasons)[0]] : []);
                    const ep = (seasonArr && seasonArr[e]) ? seasonArr[e] : (seasonArr && seasonArr[0]) ? seasonArr[0] : null;
                    if (!ep || !ep.url) {
                        // fallback: find any episode with a url
                        let found = null;
                        if (chosen.seasons) {
                            for (const ss of Object.keys(chosen.seasons)) {
                                const arr = chosen.seasons[ss] || [];
                                for (let ix=0; ix<arr.length; ix++) {
                                    if (arr[ix] && arr[ix].url) { found = { s: ss, e: ix, ep: arr[ix] }; break; }
                                }
                                if (found) break;
                            }
                        }
                        if (!found) {
                            showToast('Episódio não disponível para reprodução.', 2000);
                            return;
                        }
                        s = found.s; e = found.e; 
                        ep = found.ep;
                    }
                    const stableEpId = window.getStableEpId(chosen.id, s, e, ep);
                    const ctx = { type: 'serie', seriesId: chosen.id, seriesTitle: chosen.title, season: s, episode: e, id: stableEpId, trigger: chosen.nextEpisodeTrigger || 0, url: ep.url, subtitles: (ep && Array.isArray(ep.subtitles)) ? ep.subtitles : [], introStart: ep.introStart || 0, introDuration: ep.introDuration || 0 };
                    switchTab('home', false);
                    setTimeout(() => requestPlay(ep.url, `T${s}:E${Number(e)+1} - ${ep.title}`, ctx), 220);
                    return;
                } else {
                    showToast('Tipo de item desconhecido.', 1600);
                }
            } catch (e) {
                console.warn('surpriseMe failed', e);
                showToast('Erro ao escolher um item. Tente novamente.', 2000);
            }
        }

        // expose init on load (robust startup with graceful error handling and guaranteed listeners)
        (function robustInit() {
            // Lightweight startup: render UI but avoid starting periodic/expensive tasks until user interacts.
            const safeInit = () => {
                try {
                    // If an inline obfuscated DB was stored during parsing, decode it here before any render so links are available at runtime.
                    try {
                        if (window.__lumina_deobf && typeof window.__lumina_deobf.decodeDb === 'function') {
                            // prefer the in-memory copy created earlier (__db_store) or fallback to any existing window.db
                            const store = window.__db_store || window.db || null;
                            if (Array.isArray(store)) {
                                try { window.__lumina_deobf.decodeDb(store); } catch(_) {}
                                try { window.db = store; } catch(_) {}
                            } else {
                                try { window.db = window.db || []; } catch(_) {}
                            }
                        }
                    } catch (e) {
                        // non-blocking: continue even if decode fails
                        console.warn('DB decode at safeInit failed', e);
                    }

                    // Attach nav listeners immediately
                    try { attachNavTabListeners(); } catch (e) { console.warn('attachNavTabListeners failed', e); }

                    // Render UI and insert lightweight footer so page is interactive fast
                    try { renderView(); insertLegalFooter(); } catch (e) { console.warn('initial render failed', e); }

                    // Load DB and minimal init without starting rotators/badge timers
                    (async () => {
                        try {
                            await ensureDB();
                        } catch (_) {}
                        // Do not start heavy rotators until user engages — let init() finish light work
                        try { init(); } catch (e) { console.warn('init() caught', e); }
                    })();
                } catch (err) {
                    console.error('Lumina safeInit failed:', err);
                    try {
                        state.tab = state.tab || 'home';
                        renderView();
                        insertLegalFooter();
                    } catch (e2) { console.error('fallback render failed', e2); }
                }
            };

            // Start heavy background tasks only after a first real user gesture to avoid CPU spikes on load and prevent background timers from running on backgrounded tabs.
            const startDeferredBackgroundWork = () => {
                try {
                    // Run once and remove listeners
                    window.removeEventListener('pointerdown', startDeferredBackgroundWork);
                    window.removeEventListener('touchstart', startDeferredBackgroundWork);
                    window.removeEventListener('click', startDeferredBackgroundWork);

                    // Detect mobile devices to avoid starting CPU/network-heavy periodic tasks on phones
                    const mobile = (function(){
                        try {
                            const ua = navigator.userAgent || navigator.vendor || '';
                            return (/android/i.test(ua) && !/windows phone/i.test(ua)) || /iPad|iPhone|iPod/.test(ua);
                        } catch (e) { return false; }
                    })();

                    // On mobile, start only the lightweight rotator at a much lower frequency and defer badge rotations.
                    if (mobile) {
                        try {
                            // start a very gentle home rotator (longer interval) to keep UI alive without heating CPU
                            if (!window.__home_rotator) window.__home_rotator = { timer: null, interval: 60000, step: 1, running: false };
                            try { startHomeRotator(); } catch (_) {}
                        } catch (_) {}
                        // request notifications init (still user-driven) but do not auto-start badge or hero timers
                        try { if (typeof initBadgesAndNotifications === 'function') initBadgesAndNotifications(); } catch (_) {}
                    } else {
                        // Desktop/tablet: normal behavior
                        try { startHeroRotate(); } catch (_) {}
                        try { startHomeRotator(); } catch (_) {}
                        try { startBadgeTimer(); } catch (_) {}
                        try { if (typeof initBadgesAndNotifications === 'function') initBadgesAndNotifications(); } catch (_) {}
                    }
                } catch (e) { console.warn('startDeferredBackgroundWork failed', e); }
            };

            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', safeInit);
            } else {
                setTimeout(safeInit, 16);
            }

            // Defer starting periodic heavy tasks until user interacts; this reduces startup CPU and avoids background throttling issues.
            window.addEventListener('pointerdown', startDeferredBackgroundWork, { passive: true, once: true });
            window.addEventListener('touchstart', startDeferredBackgroundWork, { passive: true, once: true });
            window.addEventListener('click', startDeferredBackgroundWork, { passive: true, once: true });

            // Also protect against runtime errors that could break subsequent interactions
            window.addEventListener('error', (ev) => {
                console.error('Runtime error captured:', ev.error || ev.message, ev.filename + ':' + ev.lineno);
            }, { passive: true });

            window.addEventListener('unhandledrejection', (ev) => {
                console.warn('Unhandled promise rejection captured:', ev.reason);
            });
        })();

        // Ensure navigation buttons reliably call switchTab by attaching safe event listeners and focus mobile search when opening Search tab
        function attachNavTabListeners() {
            try {
                const mapping = {
                    'tab-home-desktop': 'home',
                    'tab-fav-desktop': 'favorites',
                    'tab-home-mobile': 'home',
                    'tab-search-mobile': 'search',
                    'tab-fav-mobile': 'favorites'
                };
                Object.keys(mapping).forEach(id => {
                    const el = document.getElementById(id);
                    if (!el) return;
                    // avoid adding duplicate listeners
                    if (!el.__lumina_nav_bound) {
                        el.addEventListener('click', (ev) => {
                            ev.preventDefault();
                            try { 
                                // use the global switchTab override to ensure immediate UI refresh
                                window.switchTab && window.switchTab(mapping[id]); 
                                // if user opened the mobile Search tab, focus the mobile search input after render to improve discoverability
                                if (mapping[id] === 'search') {
                                    setTimeout(() => {
                                        try {
                                            const mInput = document.getElementById('mobile-search');
                                            if (mInput) {
                                                mInput.focus({ preventScroll: true });
                                                try { mInput.setSelectionRange && mInput.setSelectionRange(mInput.value.length, mInput.value.length); } catch(_) {}
                                            }
                                        } catch(_) {}
                                    }, 260);
                                }
                            } catch (_) {}
                        }, { passive: true });
                        el.__lumina_nav_bound = true;
                    }
                });
            } catch (e) { /* silent */ }
        }
        // Attach once DOM is interactive to cover all render timing
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', attachNavTabListeners);
        } else {
            setTimeout(attachNavTabListeners, 50);
        }

        // Expose handleSearch to global scope so inline oninput handlers can call it
        try { window.handleSearch = handleSearch; } catch (_) {}


// Override flushProgressNow to enforce per-context atomic saves and prevent cross-series contamination
window.flushProgressNow = function() {
  try {
    const progKey = 'lumina_v2_prog';
    const histKey = 'lumina_v2_hist';
    // load safely
    const safeParse = (s) => { try { return JSON.parse(s||'{}'); } catch(e){ return {}; } };

    // If a player context exists, persist only that context's progress + its series history snapshot
    const ctx = (window.player && window.player.context) ? window.player.context : null;
    if (ctx && ctx.id) {
      const outgoingProg = {};
      const outgoingHist = {};

      // prefer canonical id for progress keys
      const activeId = String(ctx.id);

      // take current in-memory progress for active id if present
      if (window.state && window.state.progress && window.state.progress[activeId]) {
        outgoingProg[activeId] = Object.assign({}, window.state.progress[activeId]);
        outgoingProg[activeId].timestamp = Number(outgoingProg[activeId].timestamp) || Date.now();
        if (outgoingProg[activeId].time != null) outgoingProg[activeId].time = Number(outgoingProg[activeId].time);
        if (outgoingProg[activeId].duration != null) outgoingProg[activeId].duration = Number(outgoingProg[activeId].duration);
        // never include an automatic 'completed' flag
        try { delete outgoingProg[activeId].completed; } catch(_) {}
      } else {
        // ensure at least a minimal placeholder exists to avoid creating empty lists with unrelated entries
        outgoingProg[activeId] = { time: 0, duration: 0, timestamp: Date.now() };
      }

      // For series, ensure we persist only the relevant series history entry
      if (ctx.type === 'serie' && ctx.seriesId) {
        const sid = String(ctx.seriesId);
        outgoingHist[sid] = Object.assign({}, (window.state && window.state.history && window.state.history[sid]) || {
          s: ctx.season, e: ctx.episode, epId: activeId, timestamp: Date.now()
        });
        outgoingHist[sid].timestamp = Number(outgoingHist[sid].timestamp) || Date.now();
      } else {
        // keep existing history as-is for non-series but minimize size: keep at most 50 most recent entries
        const existing = safeParse(localStorage.getItem(histKey));
        const entries = Object.entries(existing || {});
        entries.sort((a,b) => (b[1].timestamp||0)-(a[1].timestamp||0));
        const limited = Object.fromEntries(entries.slice(0,50));
        Object.assign(outgoingHist, limited);
      }

      // Write with quota-aware fallbacks
      try {
        localStorage.setItem(progKey, JSON.stringify(outgoingProg));
      } catch (e) {
        try { localStorage.removeItem(progKey); localStorage.setItem(progKey, JSON.stringify({ [activeId]: outgoingProg[activeId] })); }
        catch(_) {}
      }
      try {
        localStorage.setItem(histKey, JSON.stringify(outgoingHist));
      } catch (e) {
        try { localStorage.removeItem(histKey); localStorage.setItem(histKey, JSON.stringify(outgoingHist)); }
        catch(_) {}
      }

      // mirror minimal snapshot back into memory to keep UI consistent
      try {
        window.state = window.state || {};
        window.state.progress = window.state.progress || {};
        // remove any other in-memory progress entries to avoid UI confusion
        Object.keys(window.state.progress).forEach(k => { if (k !== activeId) delete window.state.progress[k]; });
        window.state.progress[activeId] = outgoingProg[activeId];
        if (ctx.type === 'serie' && ctx.seriesId) {
          window.state.history = window.state.history || {};
          window.state.history[ctx.seriesId] = outgoingHist[ctx.seriesId];
        }
      } catch(_) {}

      return;
    }

    // No active context: fall back to safe global merge trimmed by timestamp, keeping newest 200 entries
    const storedProgAll = safeParse(localStorage.getItem(progKey));
    const incoming = (window.state && window.state.progress) ? window.state.progress : {};
    const merged = Object.assign({}, storedProgAll);
    Object.keys(incoming).forEach(id => {
      try {
        const inc = incoming[id] || {};
        const prev = merged[id] || {};
        const prevTs = Number(prev.timestamp) || 0;
        const incTs = Number(inc.timestamp) || Date.now();
        if (incTs >= prevTs) merged[id] = Object.assign({}, prev, inc, { timestamp: incTs });
      } catch(_) {}
    });

    // trim to most recent 200
    const entries = Object.entries(merged || {});
    if (entries.length > 200) {
      entries.sort((a,b) => (b[1].timestamp||0)-(a[1].timestamp||0));
      const kept = Object.fromEntries(entries.slice(0,200));
      try { localStorage.setItem(progKey, JSON.stringify(kept)); } catch (e) {
        try { localStorage.setItem(progKey, JSON.stringify(Object.fromEntries(entries.slice(0,100)))); } catch(_) {}
      }
    } else {
      try { localStorage.setItem(progKey, JSON.stringify(merged)); } catch (e) {
        // as last resort, try trimming existing stored entries then write
        try {
          const raw = localStorage.getItem(progKey);
          if (raw) {
            const obj = safeParse(raw);
            const e2 = Object.entries(obj).sort((a,b)=> (b[1].timestamp||0)-(a[1].timestamp||0)).slice(0,100);
            localStorage.setItem(progKey, JSON.stringify(Object.fromEntries(e2)));
          } else {
            localStorage.setItem(progKey, JSON.stringify(merged));
          }
        } catch(_) {}
      }
    }

    // history: keep newest 200 entries as well
    const storedHistAll = safeParse(localStorage.getItem(histKey));
    const incomingHist = (window.state && window.state.history) ? window.state.history : {};
    const mergedHist = Object.assign({}, storedHistAll);
    Object.keys(incomingHist).forEach(k => {
      try {
        const inc = incomingHist[k] || {};
        const prev = mergedHist[k] || {};
        const prevTs = Number(prev.timestamp) || 0;
        const incTs = Number(inc.timestamp) || Date.now();
        if (incTs >= prevTs) mergedHist[k] = Object.assign({}, prev, inc, { timestamp: incTs });
      } catch(_) {}
    });
    const he = Object.entries(mergedHist || {});
    if (he.length > 200) {
      he.sort((a,b)=> (b[1].timestamp||0)-(a[1].timestamp||0));
      try { localStorage.setItem(histKey, JSON.stringify(Object.fromEntries(he.slice(0,200)))); } catch (_) {
        try { localStorage.setItem(histKey, JSON.stringify(Object.fromEntries(he.slice(0,100)))); } catch(_) {}
      }
    } else {
      try { localStorage.setItem(histKey, JSON.stringify(mergedHist)); } catch(_) {}
    }
  } catch (err) {
    // best effort fallback: try direct save and avoid throwing
    try { localStorage.setItem('lumina_v2_prog', JSON.stringify(window.state && window.state.progress || {})); } catch(_) {}
    try { localStorage.setItem('lumina_v2_hist', JSON.stringify(window.state && window.state.history || {})); } catch(_) {}
  }
};

        // Override switchTab to immediately refresh UI and force render updates to avoid stale info across navigations.
        (function(){
            const originalSwitch = window.switchTab;
            window.switchTab = function(tab, clearSearch = true) {
                try {
                    // Keep state changes deterministic
                    const prevTab = state.tab;
                    state.tab = tab;

                    if (clearSearch) {
                        state.searchQuery = '';
                        const dSearch = document.getElementById('desktop-search');
                        if (dSearch) dSearch.value = '';
                    }

                    // Update nav visuals synchronously
                    try {
                        const desktopMap = { home: 'tab-home-desktop', favorites: 'tab-fav-desktop' };
                        Object.keys(desktopMap).forEach(k => {
                            const el = document.getElementById(desktopMap[k]);
                            if (!el) return;
                            el.className = (k === tab) ? 'text-white font-medium text-sm transition-all' : 'text-white/50 hover:text-white font-medium text-sm transition-all';
                        });

                        const mobileMap = { home: '#tab-home-mobile', search: '#tab-search-mobile', favorites: '#tab-fav-mobile' };
                        Object.keys(mobileMap).forEach(k => {
                            const entry = document.querySelector(mobileMap[k]);
                            if (!entry) return;
                            const isActive = k === tab;
                            entry.className = `flex flex-col items-center gap-1 w-16 transition-all ${isActive ? 'text-white scale-110' : 'text-white/40 hover:text-white'}`;
                            const iconEl = entry.querySelector('i');
                            if (iconEl) {
                                const iconMap = { home: 'ph-house', search: 'ph-magnifying-glass', favorites: 'ph-bookmark-simple' };
                                iconEl.className = `${isActive ? 'ph-fill' : 'ph'} ${iconMap[k] || 'ph-house'} text-2xl mb-0.5`;
                            }
                        });
                    } catch (e) {}

                    // Immediately stop heavy background rotators while we re-render to avoid race conditions
                    try { stopHomeRotator(); stopBadgeTimer(); } catch(_) {}

                    // Synchronous render to ensure UI is up-to-date now (prevents stale data flashes)
                    try { renderView(); insertLegalFooter && insertLegalFooter(); } catch (e) {}

                    // Gentle reflow and light enter animation for smoother transition
                    try {
                        const container = document.getElementById('main-content');
                        if (container) {
                            container.classList.add('tab-exit');
                            setTimeout(() => {
                                try {
                                    container.classList.remove('tab-exit');
                                    container.classList.add('tab-enter');
                                    void container.offsetWidth;
                                    container.classList.add('tab-enter-active');
                                    setTimeout(() => container.classList.remove('tab-enter', 'tab-enter-active'), 350);
                                } catch(_) {}
                            }, 80);
                        }
                    } catch (_) {}

                    // Resume non-essential background tasks after a short delay (gives render a moment to settle)
                    setTimeout(() => { try { resumeBackgroundActivity(); startHomeRotator(); } catch(_) {} }, 450);

                    // If original switchTab existed and did extra behavior, call it defensively but ignore its DOM manipulations
                    try { if (typeof originalSwitch === 'function') originalSwitch(tab, clearSearch); } catch(_) {}
                } catch (err) {
                    // On error fallback to original to avoid breaking navigation
                    try { if (typeof originalSwitch === 'function') originalSwitch(tab, clearSearch); } catch(_) {}
                }
            };
        })();

        // Ensure progress is flushed when the user navigates away or the page is hidden
        window.addEventListener('beforeunload', () => {
            try { if (window.player && typeof window.player.saveProgress === 'function') window.player.saveProgress(); } catch (_) {}
        }, { passive: true });

        // Also handle pagehide/visibilitychange to better capture mobile cases (background / tab switches)
        window.addEventListener('pagehide', () => {
            try { if (window.player && typeof window.player.saveProgress === 'function') window.player.saveProgress(); } catch (_) {}
        }, { passive: true });

        document.addEventListener('visibilitychange', () => {
            if (document.visibilityState === 'hidden') {
                try { if (window.player && typeof window.player.saveProgress === 'function') window.player.saveProgress(); } catch (_) {}
                try { flushProgressNow(); } catch(_) {}
            }
        }, { passive: true });

        // --- LEGAL / DISCLAIMER HANDLERS ---

// Enforce exclusive progress saving: wrap player's saveProgress so only the currently-playing context keeps very-recent timestamps,
// pruning any other progress entries updated within a short window to prevent simultaneous cross-series/film saves.
(function(){
  function wrapSaveProgress() {
    try {
      if (!window.player || typeof window.player.saveProgress !== 'function') return;
      if (window.player.__lumina_saveWrapped) return;
      const origSave = window.player.saveProgress.bind(window.player);
      window.player.saveProgress = function() {
        try {
          // run original save first
          origSave();

          // If we don't have a current context id, just flush normally.
          const ctxId = (this && this.context && this.context.id) ? this.context.id : null;
          if (!ctxId) {
            try { flushProgressNow(); } catch(_) { saveProgressData(); }
            return;
          }

          // Short safety window: remove other progress entries that were updated in the last N ms (likely concurrent)
          const now = Date.now();
          const windowMs = 5000; // 5 seconds
          try {
            const prog = state.progress || {};
            Object.keys(prog).forEach(key => {
              try {
                if (key === ctxId) return;
                const entry = prog[key];
                if (entry && entry.timestamp && (now - Number(entry.timestamp) <= windowMs)) {
                  try { delete state.progress[key]; } catch(_) {}
                }
              } catch(_) {}
            });
          } catch(_) {}

          // Persist immediately (use existing quota-safe flush)
          try { flushProgressNow(); } catch (e) { try { saveProgressData(); } catch(_) {} }
        } catch (err) {
          try { origSave(); } catch(_) {}
        }
      };
      window.player.__lumina_saveWrapped = true;
    } catch (e) {
      // silent
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', wrapSaveProgress);
  } else {
    setTimeout(wrapSaveProgress, 80);
  }
})();
        // Robust modal open/close that queries DOM at call time (avoids init-order failures)
        (function(){
            // helper to check reduced motion preference at runtime
            function prefersReducedMotion() {
                try { return window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches; } catch(e) { return false; }
            }

            // open legal modal (safe lookup each call)
            window.openLegal = function() {
                const modal = document.getElementById('legal-modal');
                if (!modal) return;
                const inner = modal.querySelector('[data-legal-card]');
                if (!inner) return;

                // reset classes/states
                modal.classList.remove('hidden', 'modal-closing');
                // Prepare starting styles for animation (reduced motion respected)
                if (!prefersReducedMotion()) {
                    inner.style.transition = '';
                    inner.style.transform = 'translateY(8px) scale(0.98)';
                    inner.style.opacity = '0';
                } else {
                    inner.style.transition = 'none';
                    inner.style.transform = 'none';
                    inner.style.opacity = '1';
                }

                // ensure overlay visibility after paint
                requestAnimationFrame(() => {
                    modal.classList.add('modal-open');
                    document.body.style.overflow = 'hidden';
                    // focus first actionable element for accessibility
                    const first = modal.querySelector('button, [href], input, select, textarea');
                    if (first) first.focus();
                });
            };

            // close legal modal with transitionend safety and fallback timeout
            window.closeLegal = function() {
                const modal = document.getElementById('legal-modal');
                if (!modal) return;
                const inner = modal.querySelector('[data-legal-card]');
                if (!inner) return;

                modal.classList.remove('modal-open');
                modal.classList.add('modal-closing');

                const cleanClose = () => {
                    modal.classList.add('hidden');
                    modal.classList.remove('modal-closing');
                    document.body.style.overflow = '';
                };

                // listen transitionend once if possible
                const onEnd = (e) => {
                    if (e && e.target !== inner) return;
                    inner.removeEventListener('transitionend', onEnd);
                    cleanClose();
                };

                if (!prefersReducedMotion()) {
                    inner.addEventListener('transitionend', onEnd);
                    // safety fallback
                    setTimeout(() => {
                        try { inner.removeEventListener('transitionend', onEnd); } catch(_) {}
                        cleanClose();
                    }, 520);
                } else {
                    cleanClose();
                }
            };

            // global Escape handler (queries modal state at runtime)
            document.addEventListener('keydown', (ev) => {
                if (ev.key === 'Escape') {
                    const modal = document.getElementById('legal-modal');
                    if (modal && !modal.classList.contains('hidden')) window.closeLegal();
                }
            });
        })();

        // Runtime unmute enforcement: ensure no playback instance remains muted (native video or YouTube iframe)
        (function(){
            // Try to unmute any player as soon as it appears, and again briefly after initialization.
            function ensureUnmuted() {
                try {
                    // Native video element used by Lumina player
                    const vid = (window.player && window.player.vid) ? window.player.vid : document.querySelector('#main-video');
                    if (vid) {
                        try {
                            // If browser forbids autoplay with sound, do not force-enabled audio; but ensure muted flag is false
                            if (vid.muted) vid.muted = false;
                            // restore a reasonable default volume if at zero
                            if (typeof vid.volume === 'number' && vid.volume === 0) vid.volume = 1;
                        } catch(_) {}
                    }

                    // YouTube API player: unmute via API when available
                    try {
                        if (window.player && window.player.isYouTube && window.player.ytPlayer) {
                            const ytp = window.player.ytPlayer;
                            try { if (typeof ytp.unMute === 'function') ytp.unMute(); } catch(_) {}
                            try { if (typeof ytp.setVolume === 'function') ytp.setVolume(100); } catch(_) {}
                        } else {
                            // If YT iframe exists, attempt to set allow attributes and unmute via postMessage when possible
                            const ytIframe = document.querySelector('#yt-player iframe, #player-media-wrapper iframe[src*="youtube.com"]');
                            if (ytIframe) {
                                try {
                                    // request that the iframe include autoplay/playsinline and picture-in-picture allowances
                                    const allow = (ytIframe.getAttribute('allow') || '');
                                    if (!/autoplay/i.test(allow) || !/playsinline/i.test(allow)) {
                                        ytIframe.setAttribute('allow', (allow + '; autoplay; playsinline; picture-in-picture; fullscreen').replace(/;;+/g,';'));
                                    }
                                } catch(_) {}
                            }
                        }
                    } catch(_) {}
                } catch(_) {}
            }

            // Run immediately and several times shortly after load to catch late-initialized players
            try {
                ensureUnmuted();
                // schedule retries to catch players created a bit later
                setTimeout(ensureUnmuted, 300);
                setTimeout(ensureUnmuted, 1200);
                setTimeout(ensureUnmuted, 4200);
            } catch(_) {}

            // Also react to DOM mutations for dynamic player insertion: unmute when relevant nodes appear
            try {
                const mo = new MutationObserver((mutations) => {
                    for (const m of mutations) {
                        if (m.addedNodes && m.addedNodes.length) {
                            for (const n of m.addedNodes) {
                                try {
                                    if (n && n.nodeType === 1) {
                                        const tag = (n.tagName || '').toLowerCase();
                                        if (tag === 'video' || tag === 'iframe' || n.id === 'yt-player' || n.id === 'main-video' || n.querySelector && (n.querySelector('video') || n.querySelector('iframe'))) {
                                            try { ensureUnmuted(); } catch(_) {}
                                        }
                                    }
                                } catch(_) {}
                            }
                        }
                    }
                });
                mo.observe(document.body, { childList: true, subtree: true });
            } catch(_) {}
        })();

        // --- Blogger links: prevent opening new tabs and allow in-page interactive full-screen iframe ---
        (function(){
            // Create an overlay iframe container for blogger interactions
            function ensureBloggerOverlay() {
                let ov = document.getElementById('blogger-overlay');
                if (ov) return ov;
                ov = document.createElement('div');
                ov.id = 'blogger-overlay';
                ov.style.position = 'fixed';
                ov.style.inset = '0';
                ov.style.zIndex = '999999';
                ov.style.background = 'rgba(0,0,0,0.92)';
                ov.style.display = 'none';
                ov.style.justifyContent = 'center';
                ov.style.alignItems = 'center';
                ov.innerHTML = `
                    <div style="position:relative;width:100%;height:100%;">
                        <button id="blogger-overlay-close" aria-label="Fechar" style="position:absolute;z-index:60;right:14px;top:14px;background:rgba(255,255,255,0.06);border:none;color:#fff;padding:10px;border-radius:10px;backdrop-filter:blur(6px);">Fechar</button>
                        <iframe id="blogger-overlay-iframe" src="about:blank" style="width:100%;height:100%;border:0;border-radius:0;" allow="camera; microphone; autoplay; clipboard-read; clipboard-write; geolocation; encrypted-media;"></iframe>
                    </div>
                `;
                document.body.appendChild(ov);
                document.getElementById('blogger-overlay-close').addEventListener('click', closeBloggerOverlay, { passive: true });
                // allow ESC to close
                document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeBloggerOverlay(); }, { passive: true });
                return ov;
            }

            function openBloggerOverlay(url) {
                try {
                    const ov = ensureBloggerOverlay();
                    const iframe = document.getElementById('blogger-overlay-iframe');
                    // set src in a safe way (assign only when opening)
                    try { iframe.src = url; } catch(_) { iframe.src = url; }
                    ov.style.display = 'flex';
                    // prevent background scroll
                    document.body.style.overflow = 'hidden';
                } catch (e) {}
            }
            function closeBloggerOverlay() {
                try {
                    const ov = document.getElementById('blogger-overlay');
                    if (!ov) return;
                    const iframe = document.getElementById('blogger-overlay-iframe');
                    try { iframe.src = 'about:blank'; } catch(_) {}
                    ov.style.display = 'none';
                    document.body.style.overflow = '';
                } catch (e) {}
            }

            // Intercept all blogger links and convert them to in-page opens; also prevent target blank
            function processBloggerAnchors(root = document) {
                try {
                    const anchors = Array.from(root.querySelectorAll('a[href*="blogger.com"]'));
                    anchors.forEach(a => {
                        try {
                            // mark processed
                            if (a.dataset.__luminaBlogger === '1') return;
                            a.dataset.__luminaBlogger = '1';

                            // force same-window navigation prevention and remove target=_blank
                            try { a.removeAttribute('target'); } catch(_) {}
                            try { a.setAttribute('rel','noopener'); } catch(_) {}

                            // Allow pointer interactions but intercept default navigation to open in overlay
                            a.addEventListener('click', function(ev){
                                try {
                                    ev.preventDefault();
                                    ev.stopPropagation();
                                    const href = a.getAttribute('href');
                                    if (!href) return;
                                    // normalize blogger video path suggestions: allow direct video endpoints too
                                    const allowed = href;
                                    // open overlay iframe so the user can interact with the entire page in-place
                                    openBloggerOverlay(allowed);
                                } catch (e) {}
                            }, { passive: false });

                            // also prevent any middle-click / auxclick from opening new tab
                            a.addEventListener('auxclick', function(ev){
                                try {
                                    // button 1 = middle click; prevent new tab
                                    if (ev.button === 1) {
                                        ev.preventDefault(); ev.stopPropagation();
                                        const href = a.getAttribute('href');
                                        if (href) openBloggerOverlay(href);
                                    }
                                } catch (e) {}
                            }, { passive: false });

                            // ensure links remain keyboard accessible: Enter opens overlay
                            a.addEventListener('keydown', function(ev){
                                try {
                                    if (ev.key === 'Enter') {
                                        ev.preventDefault(); ev.stopPropagation();
                                        const href = a.getAttribute('href');
                                        if (href) openBloggerOverlay(href);
                                    }
                                } catch (e) {}
                            }, { passive: false });

                        } catch (inner) {}
                    });
                } catch (e) {}
            }

            // Observe DOM changes to bind to dynamically inserted blogger links
            const moB = new MutationObserver((mutations) => {
                for (const m of mutations) {
                    if (m.type === 'childList' && m.addedNodes && m.addedNodes.length) {
                        m.addedNodes.forEach(node => {
                            try {
                                if (node.nodeType !== 1) return;
                                if (node.tagName && node.tagName.toLowerCase() === 'a' && node.href && node.href.includes('blogger.com')) {
                                    processBloggerAnchors(document);
                                } else {
                                    // scan subtree
                                    processBloggerAnchors(node);
                                }
                            } catch(_) {}
                        });
                    } else if (m.type === 'attributes' && m.target && m.target.tagName && m.target.tagName.toLowerCase() === 'a') {
                        try { processBloggerAnchors(document); } catch(_) {}
                    }
                }
            });
            try { moB.observe(document.body, { childList: true, subtree: true, attributes: true, attributeFilter: ['href'] }); } catch(e){}

            // Initial pass
            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', () => setTimeout(() => processBloggerAnchors(document), 80));
            } else {
                setTimeout(() => processBloggerAnchors(document), 80);
            }
        })();

        /* ======= Subtitles helper: auto-convert SRT -> VTT, attach track and show captions toggle when video element appears ======= */
        (function(){
            // URL for the SRT provided (Espíritos na Escola - S01E01)
            const LUMINA_SRT_URL = 'https://raw.githubusercontent.com/Utters-Apps/Captions/9ac0d1b142f6c2f77af7f300af1dd279a323cf61/School.Spirits.2023.S01E01.My.So-Called.Death.720p.AMZN.WEB-DL.DDP5.1.H.264-NTb.srt';

            // Convert SRT text to VTT
            function convertSRTtoVTT(srt) {
                if (!srt) return 'WEBVTT\n\n';
                return 'WEBVTT\n\n' + srt.replace(/\r+/g,'').replace(/(\d+):(\d+):(\d+),(\d+)/g, '$1:$2:$3.$4');
            }

            // Create and attach VTT track to a video element; returns the created track element
            async function attachSRTasVTT(videoEl, srtUrl, label = 'Português (BR)') {
            if (!videoEl || !srtUrl) return null;
            try {
                // Fetch as ArrayBuffer and decode explicitly as UTF-8 to preserve accents/special chars across origins/encodings.
                const res = await fetch(srtUrl, { cache: 'no-store' });
                if (!res || !res.ok) return null;
                let srtText = '';
                try {
                    // prefer arrayBuffer + TextDecoder('utf-8') to avoid mojibake
                    const buf = await res.arrayBuffer();
                    srtText = new TextDecoder('utf-8').decode(new Uint8Array(buf));
                    // Basic sanity: if decoded text looks empty, fallback to text()
                    if (!srtText || /^\s*$/.test(srtText)) {
                        srtText = await res.text().catch(() => '');
                    }
                } catch (decodeErr) {
                    // fallback: try text() if arrayBuffer/decoder failed (best-effort)
                    try { srtText = await res.text().catch(() => ''); } catch (_) { srtText = ''; }
                }

                const vttText = convertSRTtoVTT(srtText);
                const blob = new Blob([vttText], { type: 'text/vtt' });
                const vttUrl = URL.createObjectURL(blob);

                // remove any existing similar track for safety
                try {
                    const existing = Array.from(videoEl.querySelectorAll('track')).find(t => t.label === label || t.srclang === 'pt-BR');
                    if (existing) existing.remove();
                } catch (_) {}

                const track = document.createElement('track');
                track.kind = 'subtitles';
                track.label = label;
                track.srclang = 'pt-BR';
                track.src = vttUrl;
                // do not force default; user toggles
                track.default = false;
                videoEl.appendChild(track);

                // ensure the browser sees the track and set mode defensively
                try { track.mode = 'disabled'; } catch (_) {}
                // After a short delay ensure the corresponding TextTrack is set to 'showing' when appropriate by toggles
                setTimeout(() => {
                    try {
                        const tracks = videoEl.textTracks || [];
                        for (let i = 0; i < tracks.length; i++) {
                            const tt = tracks[i];
                            if ((label && tt && tt.label === label) || (tt && /pt/i.test(tt.language))) {
                                try { tt.mode = 'disabled'; } catch (_) {}
                            }
                        }
                    } catch (_) {}
                }, 200);

                return track;
            } catch (e) {
                console.warn('attachSRTasVTT failed', e);
                return null;
            }
        }

            // Add a captions toggle button into the player UI near other controls (if not already present)
            function ensureCaptionsButton(videoEl) {
                try {
                    if (!videoEl) return;
                    const playerUi = document.querySelector('.player-ui .flex.justify-between') || document.querySelector('.player-ui');
                    if (!playerUi) return;

                    // don't duplicate button
                    if (document.getElementById('lumina-captions-btn')) return;

                    // build button element
                    const btn = document.createElement('button');
                    btn.id = 'lumina-captions-btn';
                    btn.className = 'w-10 h-10 rounded-full glass flex items-center justify-center text-white hover:bg-white/10 transition-colors';
                    btn.title = 'Legendas';
                    btn.style.minWidth = '40px';
                    btn.style.marginLeft = '6px';
                    btn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/><path d="M7 10h10M7 14h6"/></svg>';

                    // find controls container (right side) and insert before fullscreen button if present
                    const controlsRow = document.querySelector('.player-ui .flex.justify-between') || document.querySelector('.player-ui');
                    if (controlsRow) {
                        // try insert near bottom-right controls container
                        const rightGroup = document.querySelector('.player-ui .flex.items-center.gap-6') || document.querySelector('.player-ui .flex.justify-between > div:last-child');
                        if (rightGroup) rightGroup.insertBefore(btn, rightGroup.firstChild);
                        else playerUi.appendChild(btn);
                    } else document.querySelector('.player-ui').appendChild(btn);

                    // Toggle behavior: enable/disable first available PT-BR track
                    btn.addEventListener('click', (e) => {
                        e.stopPropagation();
                        try {
                            const tracks = Array.from(videoEl.querySelectorAll('track'));
                            if (!tracks.length) {
                                // no track present: try to attach default SRT source (only for the known ep)
                                attachSRTasVTT(videoEl, LUMINA_SRT_URL).then(track => {
                                    if (!track) { showToast && showToast('Falha ao carregar legendas.'); return; }
                                    try { track.mode = 'showing'; btn.style.background = 'linear-gradient(90deg,#8b5cf6,#7c3aed)'; } catch(_) {}
                                });
                                return;
                            }
                            // prefer Portuguese track if present
                            let target = tracks.find(t => /pt/i.test(t.srclang)) || tracks[0];
                            if (!target) return;
                            // toggle between showing and disabled
                            try {
                                if (target.mode === 'showing') { target.mode = 'disabled'; btn.style.background = ''; }
                                else { target.mode = 'showing'; btn.style.background = 'linear-gradient(90deg,#8b5cf6,#7c3aed)'; }
                            } catch (err) {
                                // some browsers require setting mode after track is ready, try after short delay
                                setTimeout(() => {
                                    try { target.mode = (target.mode === 'showing') ? 'disabled' : 'showing'; } catch(_) {}
                                }, 120);
                            }
                        } catch (err) {
                            console.warn('captions toggle failed', err);
                        }
                    }, { passive: true });
                } catch (e) { console.warn('ensureCaptionsButton failed', e); }
            }

            // Observe #player-media-wrapper for video elements being inserted and auto-attach subtitles & button for Espíritos na Escola S01E01
            const observeWrapper = () => {
                try {
                    const wrapper = document.getElementById('player-media-wrapper');
                    if (!wrapper) return;
                    const mo = new MutationObserver((mutations) => {
                        for (const m of mutations) {
                            if (m.addedNodes && m.addedNodes.length) {
                                m.addedNodes.forEach(async node => {
                                    try {
                                        if (node.nodeType !== 1) return;
                                        if (node.tagName && node.tagName.toLowerCase() === 'video') {
                                            const videoEl = node;
                                            // If the current player.context references espíritos-na-escola S01E1, attach subtitles automatically
                                            try {
                                                const ctx = window.player && window.player.context;
                                                const matchEp = ctx && ((ctx.seriesId === 'espiritos-na-escola' && String(ctx.season) === '1' && Number(ctx.episode) === 0) || (ctx.id && String(ctx.id).includes('S_S_1_1')));
                                                if (matchEp) {
                                                    // Attach and ensure captions toggle
                                                    const tr = await attachSRTasVTT(videoEl, LUMINA_SRT_URL, 'Português (BR)');
                                                    ensureCaptionsButton(videoEl);
                                                    // Show captions automatically (nice UX) after track loads
                                                    if (tr) {
                                                        try { tr.mode = 'showing'; document.getElementById('lumina-captions-btn') && (document.getElementById('lumina-captions-btn').style.background = 'linear-gradient(90deg,#8b5cf6,#7c3aed)'); } catch(_) {}
                                                    }
                                                } else {
                                                    // For any other video, still provide captions button if tracks appear later by observing track additions
                                                    ensureCaptionsButton(videoEl);
                                                }
                                            } catch (e) { console.warn('auto-attach subtitle logic error', e); }
                                        }
                                        // Also handle cases where an iframe is replaced by a resolved mp4 and a <video> is nested inside
                                        if (node.querySelectorAll) {
                                            const nestedVideo = node.querySelector('video');
                                            if (nestedVideo) {
                                                const videoEl = nestedVideo;
                                                ensureCaptionsButton(videoEl);
                                                // also attempt to auto-attach for espirits first ep if player context matches
                                                try {
                                                    const ctx = window.player && window.player.context;
                                                    const matchEp = ctx && ((ctx.seriesId === 'espiritos-na-escola' && String(ctx.season) === '1' && Number(ctx.episode) === 0) || (ctx.id && String(ctx.id).includes('S_S_1_1')));
                                                    if (matchEp) {
                                                        await attachSRTasVTT(videoEl, LUMINA_SRT_URL, 'Português (BR)');
                                                        try { videoEl.querySelector && (document.getElementById('lumina-captions-btn') && (document.getElementById('lumina-captions-btn').style.background = 'linear-gradient(90deg,#8b5cf6,#7c3aed)')); } catch(_) {}
                                                    }
                                                } catch (e) {}
                                            }
                                        }
                                    } catch (_) {}
                                });
                            }
                        }
                    });
                    mo.observe(wrapper, { childList: true, subtree: true });

                    // also do a quick pass for any video already present
                    const existing = wrapper.querySelector('video');
                    if (existing) {
                        ensureCaptionsButton(existing);
                        // attach automatically if current context is the specific episode
                        (async () => {
                            try {
                                const ctx = window.player && window.player.context;
                                const matchEp = ctx && ((ctx.seriesId === 'espiritos-na-escola' && String(ctx.season) === '1' && Number(ctx.episode) === 0) || (ctx.id && String(ctx.id).includes('S_S_1_1')));
                                if (matchEp) {
                                    await attachSRTasVTT(existing, LUMINA_SRT_URL, 'Português (BR)');
                                    try { document.getElementById('lumina-captions-btn') && (document.getElementById('lumina-captions-btn').style.background = 'linear-gradient(90deg,#8b5cf6,#7c3aed)'); } catch(_) {}
                                }
                            } catch(_) {}
                        })();
                    }
                } catch (e) { console.warn('observeWrapper failed', e); }
            };

            // run when DOM ready
            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', observeWrapper);
            } else observeWrapper();
        })();


// Robust attachSRTasVTT override: detects common encodings and converts SRT -> VTT without producing replacement-char mojibake.
// Exposed globally as window.attachSRTasVTT for runtime use.
window.attachSRTasVTT = async function attachSRTasVTT(videoEl, srtUrl, label = 'Português (BR)') {
    try {
        if (!videoEl || !srtUrl) return null;

        async function fetchArrayBuffer(url) {
            try {
                const res = await fetch(url, { cache: 'no-store', credentials: 'omit' });
                if (!res || !res.ok) return null;
                return await res.arrayBuffer().catch(()=>null);
            } catch (e) { return null; }
        }

        const hasReplacementChar = (str) => {
            if (!str) return false;
            return /\uFFFD/.test(str) || / /.test(str);
        };

        const tryDecode = (u8, enc) => {
            try { return new TextDecoder(enc, { fatal: false }).decode(u8); }
            catch (e) {
                try { return new TextDecoder(enc === 'utf-8' ? 'iso-8859-1' : 'utf-8').decode(u8); }
                catch (_) { return ''; }
            }
        };

        const buf = await fetchArrayBuffer(srtUrl);
        if (!buf) return null;
        const u8 = new Uint8Array(buf);

        // 1) Prefer UTF-8
        let srtText = tryDecode(u8, 'utf-8');

        // 2) If replacement characters detected, try windows-1252 then iso-8859-1
        if (hasReplacementChar(srtText)) {
            const win1252 = tryDecode(u8, 'windows-1252');
            if (!hasReplacementChar(win1252) && win1252.trim().length > 0) srtText = win1252;
            else {
                const latin1 = tryDecode(u8, 'iso-8859-1');
                if (!hasReplacementChar(latin1) && latin1.trim().length > 0) srtText = latin1;
                else srtText = win1252.length > srtText.length ? win1252 : srtText;
            }
        }

        // 3) Check for UTF-16 BOM and decode if present
        try {
            if (u8.length >= 2) {
                const bom0 = u8[0], bom1 = u8[1];
                if ((bom0 === 0xFE && bom1 === 0xFF) || (bom0 === 0xFF && bom1 === 0xFE)) {
                    try { srtText = new TextDecoder('utf-16').decode(u8); } catch (_) {}
                }
            }
        } catch (_) {}

        // 4) Last-resort: iso-8859-1 fallback if still broken
        if (hasReplacementChar(srtText)) {
            try { const iso = tryDecode(u8, 'iso-8859-1'); if (iso && iso.replace(/\s/g,'').length > 0) srtText = iso; } catch(_) {}
        }

        // Convert SRT to VTT preserving timestamps and line breaks
        const vtt = 'WEBVTT\n\n' + srtText.replace(/\r+/g,'').replace(/(\d+):(\d+):(\d+),(\d+)/g, '$1:$2:$3.$4');

        const blob = new Blob([vtt], { type: 'text/vtt;charset=utf-8' });
        const vttUrl = URL.createObjectURL(blob);

        try {
            const existing = Array.from(videoEl.querySelectorAll('track')).find(t => t.label === label || /pt/i.test(t.srclang || ''));
            if (existing) existing.remove();
        } catch (_) {}

        const track = document.createElement('track');
        track.kind = 'subtitles';
        track.label = label;
        track.srclang = 'pt-BR';
        track.src = vttUrl;
        track.default = false;
        videoEl.appendChild(track);

        // Ensure track is recognized and set to showing (with small delay to account for browser processing)
        setTimeout(() => {
            try {
                const tracks = videoEl.textTracks || [];
                for (let i = 0; i < tracks.length; i++) {
                    const tt = tracks[i];
                    if ((tt.label && tt.label === label) || (tt.language && /pt/i.test(tt.language))) {
                        try { tt.mode = 'showing'; } catch (_) { setTimeout(()=>{ try{ tt.mode = 'showing'; }catch(_){} }, 120); }
                    }
                }
                try { if (typeof ensureCaptionsButton === 'function') ensureCaptionsButton(videoEl); } catch (_) {}
                const btn = document.getElementById('lumina-captions-btn');
                if (btn) try { btn.style.background = 'linear-gradient(90deg,#8b5cf6,#7c3aed)'; } catch (_) {}
            } catch (_) {}
        }, 240);

        return track;
    } catch (e) {
        console.warn('attachSRTasVTT robust override failed', e);
        return null;
    }
};

/* ===== Lumina: Per-series progress snapshot & contamination guard =====
   - Creates a snapshot of "same-numbered" episodes across all series when the user begins playback of a series.
   - Verifies and restores/cleans any unintended cross-series progress contamination on key events:
     progress flush, episode change, player close, returning to home, pagehide/unload, and end-of-episode.
   - Guarantees progress is tied to seriesId + season + episode (never only to episode number).
*/

(function(){
    // snapshot map: latest snapshot keyed by currentSeriesId (or global 'last')
    window.__lumina_progress_snapshots = {
        // structure:
        // lastKey: { ts: <timestamp>, sourceSeriesId: '...', season: 'N', episodeIndex: X, entries: { '<seriesId>|<season>|<epId>': { state:'data'|'epempty', time, duration, pct, seriesId, epId, raw } } }
    };

    // Helper to build stable episode lookup for a given series, season and episode index
    function getEpisodeByIndex(series, seasonKey, episodeIndex) {
        try {
            if (!series || !series.seasons) return null;
            const seasonArr = series.seasons[seasonKey] || series.seasons[String(seasonKey)] || null;
            if (!Array.isArray(seasonArr)) return null;
            return seasonArr[episodeIndex] || null;
        } catch (e) { return null; }
    }

    // Build snapshot when playing a series: collect for every series the episode at same season & episode index
    window.createProgressSnapshotForSameNumber = function(context) {
        try {
            if (!context || context.type !== 'serie') return null;
            const seasonKey = String(context.season);
            const episodeIndex = Number(context.episode);
            const sourceSeriesId = String(context.seriesId || 'unknown');
            const snapshot = { ts: Date.now(), sourceSeriesId, season: seasonKey, episodeIndex, entries: {} };

            (window.db || []).forEach(series => {
                try {
                    if (!series || !series.id) return;
                    const ep = getEpisodeByIndex(series, seasonKey, episodeIndex);
                    if (!ep) {
                        // Mark explicit absence (no episode at that index)
                        snapshot.entries[`${series.id}|${seasonKey}|__noep__`] = { state: 'noep', seriesId: series.id, season: seasonKey, epId: null };
                        return;
                    }
                    // determine stable episode id used in progress store: prefer ep.id if present, else generated stable id
                    const stableEpId = (ep.id && String(ep.id).trim()) ? ep.id : `${series.id}-s${seasonKey}-e${episodeIndex}`;
                    const prog = state.progress && state.progress[stableEpId] ? state.progress[stableEpId] : null;
                    if (prog && typeof prog === 'object' && (prog.time || prog.embed || prog.timestamp)) {
                        const time = Number(prog.time || 0);
                        const duration = Number(prog.duration || 0);
                        const pct = (duration > 0) ? Math.round((time / duration) * 10000) / 100 : (prog.time ? 100 : 0);
                        snapshot.entries[`${series.id}|${seasonKey}|${stableEpId}`] = {
                            state: 'data',
                            time: time,
                            duration: duration,
                            pct: pct,
                            seriesId: series.id,
                            epId: stableEpId,
                            raw: JSON.parse(JSON.stringify(prog || {}))
                        };
                    } else {
                        snapshot.entries[`${series.id}|${seasonKey}|${stableEpId}`] = {
                            state: 'epempty',
                            seriesId: series.id,
                            epId: stableEpId,
                            season: seasonKey
                        };
                    }
                } catch (_) {}
            });

            // store snapshot as latest
            window.__lumina_progress_snapshots.last = snapshot;
            return snapshot;
        } catch (e) {
            console.warn('createProgressSnapshotForSameNumber failed', e);
            return null;
        }
    };

    // Helper that restores a snapshot entry (either data or epempty)
    function restoreSnapshotEntry(ent) {
        try {
            if (!ent || !ent.seriesId) return;
            const pid = ent.epId;
            if (ent.state === 'data' && ent.raw) {
                // restore exact saved object into state.progress
                state.progress[pid] = Object.assign({}, ent.raw);
                // ensure numeric fields are numbers
                if (state.progress[pid].time != null) state.progress[pid].time = Number(state.progress[pid].time);
                if (state.progress[pid].duration != null) state.progress[pid].duration = Number(state.progress[pid].duration);
                if (!state.progress[pid].timestamp) state.progress[pid].timestamp = Date.now();
                // update history if this was part of a series and history incorrectly overwritten
                try {
                    if (ent.seriesId && state.history && state.history[ent.seriesId]) {
                        // keep history as originally saved in snapshot raw if present
                        // if raw had no history, do not remove history here (non-destructive)
                    }
                } catch (_) {}
            } else if (ent.state === 'epempty') {
                // remove any progress created erroneously
                try {
                    if (state.progress && state.progress[pid]) delete state.progress[pid];
                } catch (_) {}
                // ensure no history points to this episode
                try {
                    const hist = state.history && state.history[ent.seriesId];
                    if (hist && hist.epId === pid) delete state.history[ent.seriesId];
                } catch (_) {}
            } else if (ent.state === 'noep') {
                // nothing to restore
            }
        } catch (e) { console.warn('restoreSnapshotEntry error', e); }
    }

    // Compare snapshot against current state and restore contaminated entries.
    window.verifyAndRestoreProgressSnapshots = function(reason, currentContext) {
        try {
            const snap = window.__lumina_progress_snapshots.last;
            if (!snap || !snap.entries) return { restored: false, reason: 'no-snapshot' };

            const contaminated = [];
            Object.keys(snap.entries).forEach(key => {
                try {
                    const ent = snap.entries[key];
                    if (!ent || !ent.seriesId) return;
                    // key may include __noep__, handle accordingly
                    if (ent.state === 'noep') return;

                    const pid = ent.epId;
                    const currentProg = state.progress && state.progress[pid] ? state.progress[pid] : null;

                    if (ent.state === 'epempty') {
                        // If snapshot was empty and now there's progress -> contamination
                        const nowHas = currentProg && (typeof currentProg.time === 'number' && currentProg.time > 1 || currentProg.embed);
                        if (nowHas) {
                            contaminated.push({ kind: 'epempty->tainted', entry: ent, pid });
                        }
                    } else if (ent.state === 'data') {
                        // If snapshot had data, but now the stored progress differs from snapshot raw in a way that indicates overwrite
                        if (!currentProg) {
                            // totally lost: treat as change but not contamination from current playback; still restore
                            contaminated.push({ kind: 'data->missing', entry: ent, pid });
                        } else {
                            // compare time and duration and key continuity fields
                            const prevTime = Number(ent.time || 0);
                            const prevDur = Number(ent.duration || 0);
                            const nowTime = Number(currentProg.time || 0);
                            const nowDur = Number(currentProg.duration || 0);
                            // If the nowTime differs significantly from snapshot AND matches the current playing context's progress,
                            // it's likely contaminated by the active playback. We'll treat any difference as suspicious and restore.
                            const timeChanged = Math.abs(nowTime - prevTime) > 1.5 && !(Math.abs(nowTime - prevTime) <= 0.5);
                            const durationChanged = Math.abs(nowDur - prevDur) > 0.5;
                            if (timeChanged || durationChanged) {
                                contaminated.push({ kind: 'data->changed', entry: ent, pid, now: { time: nowTime, duration: nowDur } });
                            }
                        }
                    }
                } catch (_) {}
            });

            if (contaminated.length === 0) return { restored: false, reason: 'clean', contaminated: 0 };

            // Restore each contaminated entry according to snapshot
            contaminated.forEach(c => {
                try {
                    restoreSnapshotEntry(c.entry);
                } catch (_) {}
            });

            // Persist changes and re-render UI to remove contaminated "Continue Watching"
            try {
                flushProgressNow();
            } catch (_) { try { saveProgressData(); } catch(_) {} }

            try {
                // Re-render Continue and view parts to avoid contaminated entries showing up
                renderView();
            } catch (_) {}

            return { restored: true, reason: reason || 'verify', count: contaminated.length, details: contaminated };
        } catch (e) {
            console.warn('verifyAndRestoreProgressSnapshots failed', e);
            return { restored: false, error: String(e) };
        }
    };

    // Wrap player.init to create snapshot when starting a series playback
    try {
        if (window.player && typeof window.player.init === 'function') {
            const origInit = window.player.init.bind(window.player);
            window.player.init = function(url, title, context) {
                try {
                    if (context && context.type === 'serie') {
                        try { window.createProgressSnapshotForSameNumber(context); } catch(_) {}
                    }
                } catch(_) {}
                return origInit(url, title, context);
            };
        }
    } catch (e) { console.warn('wrap player.init failed', e); }

    // Wrap player.close to trigger a verification pass when player closes
    try {
        if (window.player && typeof window.player.close === 'function') {
            const origClose = window.player.close.bind(window.player);
            window.player.close = function() {
                try { const ctx = window.player && window.player.context; const reason = 'player.close'; origClose(); try { setTimeout(()=>window.verifyAndRestoreProgressSnapshots(reason, ctx), 120); } catch(_) {} } catch (e) { try{ origClose(); }catch(_){} }
            };
        }
    } catch (e) { console.warn('wrap player.close failed', e); }

    // Wrap flushProgressNow to run verification after progress persisted
    try {
        if (typeof flushProgressNow === 'function') {
            const origFlush = flushProgressNow.bind(window);
            window.flushProgressNow = function() {
                try {
                    const before = window.__lumina_progress_snapshots && window.__lumina_progress_snapshots.last;
                    origFlush();
                    // run verification asynchronously (give flush a moment)
                    try { setTimeout(() => { window.verifyAndRestoreProgressSnapshots('flushProgressNow'); }, 60); } catch(_) {}
                } catch (e) { try { origFlush(); } catch(_) {} }
            };
        }
    } catch (e) { console.warn('wrap flushProgressNow failed', e); }

    // Hook into requestPlay flow: ensure snapshot created when user requests playing a series (redundant/defensive)
    try {
        const origRequestPlay = window.requestPlay;
        window.requestPlay = function(url, title, context) {
            try { if (context && context.type === 'serie') window.createProgressSnapshotForSameNumber(context); } catch(_) {}
            return origRequestPlay && origRequestPlay(url, title, context);
        };
    } catch (_) {}

    // Listen to important lifecycle events to trigger verification:
    // - beforeunload / pagehide: verify and restore if needed (ensures corruption cleaned before unload)
    // - visibilitychange -> when returning to visible trigger verify
    // - when switching to home tab -> verify
    // - when an episode ends -> player.ontimeupdate/onended call already triggers checkNextTrigger; we also verify on ended
    window.addEventListener('beforeunload', function(){ try { window.verifyAndRestoreProgressSnapshots('beforeunload'); } catch(_) {} }, { passive: true });
    window.addEventListener('pagehide', function(){ try { window.verifyAndRestoreProgressSnapshots('pagehide'); } catch(_) {} }, { passive: true });
    document.addEventListener('visibilitychange', function(){ try { if (document.visibilityState === 'visible') window.verifyAndRestoreProgressSnapshots('visibility:visible'); } catch(_) {} }, { passive: true });

    // ensure switchTab triggers verification when returning to home
    try {
        const origSwitchTab = window.switchTab;
        window.switchTab = function(tab, clearSearch) {
            try {
                const prev = state.tab;
                const res = origSwitchTab && origSwitchTab(tab, clearSearch);
                // If moving to home or away from player, verify after a short delay
                if (tab === 'home' || prev === 'home') {
                    try { setTimeout(() => window.verifyAndRestoreProgressSnapshots('switchTab', window.player && window.player.context), 160); } catch(_) {}
                }
                return res;
            } catch (e) { return origSwitchTab && origSwitchTab(tab, clearSearch); }
        };
    } catch (e) {}

    // Also verify on player end-of-media (ensure contamination from end/nextEp flows is caught)
    try {
        const origOnEnded = function(){};
        // If player exists, wrap its onended handler if available
        if (window.player) {
            const vp = window.player;
            // best-effort: monkey-patch player.vid.onended when video element is available
            const attachEndWatcher = () => {
                try {
                    const vid = vp.vid || document.querySelector('#main-video');
                    if (!vid) return;
                    if (vid.__lumina_end_bound) return;
                    vid.__lumina_end_bound = true;
                    vid.addEventListener('ended', function(){ try { setTimeout(()=>window.verifyAndRestoreProgressSnapshots('ended'), 80); } catch(_){} }, { passive: true });
                } catch (e) {}
            };
            // attempt now and also observe mutations to attach later
            setTimeout(attachEndWatcher, 120);
            const mo = new MutationObserver(() => attachEndWatcher());
            try { mo.observe(document.getElementById('player-media-wrapper') || document.body, { childList: true, subtree: true }); } catch(_) {}
        }
    } catch (e) {}

    // Public debug helper
    window.__lumina_restore_snapshot_now = function() {
        try {
            const snap = window.__lumina_progress_snapshots.last;
            if (!snap) return false;
            Object.values(snap.entries).forEach(ent => {
                try { restoreSnapshotEntry(ent); } catch(_) {}
            });
            flushProgressNow();
            renderView();
            return true;
        } catch (e) { return false; }
    };
// ==========================================================================
// INTEGRAÇÃO: NOVO MODAL CINEMÁTICO DE EPISÓDIOS (CORRIGIDO)
// ==========================================================================

let isEpModalAnimating = false;

window.openEpisodesModal = function(seasonName) {
    if (isEpModalAnimating) return;
    isEpModalAnimating = true;

    const overlay = document.getElementById('episodes-modal-overlay');
    const container = document.getElementById('episodes-modal-container');
    const listEl = document.getElementById('episodes-modal-list');
    const title = document.getElementById('episodes-modal-title');

    if (!overlay || !container || !listEl || !title) {
        isEpModalAnimating = false;
        return;
    }

    // Atualiza o título do modal
    title.textContent = `Temporada ${seasonName}`;

    // Garante que os episódios sejam carregados ANTES de exibir o modal
    if (window.currentSeriesId) {
        // render episodes into the episodes modal using a safe DOM-binding approach
        const seriesItem = (window.db || []).find(d => d && d.id === window.currentSeriesId);
        if (seriesItem) window.renderEpisodesList(seriesItem, seasonName);
    }

    // Exibe o modal
    overlay.classList.remove('hidden');
    
    // Força um reflow do navegador para garantir que a animação CSS funcione
    void overlay.offsetWidth;
    
    overlay.classList.remove('opacity-0', 'pointer-events-none');
    container.classList.remove('opacity-0', 'translate-y-12', 'scale-[0.98]');

    // Remove as classes de invisibilidade dos episódios com um efeito cascata (stagger)
    const items = listEl.querySelectorAll('.ep-item');
    requestAnimationFrame(() => {
        items.forEach((item, index) => {
            item.style.transitionDelay = `${index * 50}ms`;
            item.classList.remove('opacity-0', 'translate-y-8');
        });
    });

    setTimeout(() => { isEpModalAnimating = false; }, 600);
};

window.closeEpisodesModal = function() {
    if (isEpModalAnimating) return;
    isEpModalAnimating = true;

    const overlay = document.getElementById('episodes-modal-overlay');
    const container = document.getElementById('episodes-modal-container');
    const items = document.querySelectorAll('.ep-item');

    // Esconde os itens rapidamente
    items.forEach((item) => {
        item.style.transitionDelay = '0ms'; 
        item.classList.add('opacity-0', 'translate-y-8');
    });

    container.classList.add('opacity-0', 'translate-y-12', 'scale-[0.98]');
    overlay.classList.add('opacity-0', 'pointer-events-none');

    setTimeout(() => {
        overlay.classList.add('hidden');
        isEpModalAnimating = false;
    }, 500);
};

// Eventos globais para fechar o modal
document.addEventListener('DOMContentLoaded', () => {
    const overlay = document.getElementById('episodes-modal-overlay');
    
    overlay.addEventListener('mousedown', (e) => {
        if (e.target === overlay) closeEpisodesModal();
    });
    
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !overlay.classList.contains('hidden')) {
            closeEpisodesModal();
        }
    });
});

(function(){
window.loadSeason = function(itemId, seasonNum) {
    try {
        const item = (window.db || []).find(d => d && d.id === itemId);
        
        // CORREÇÃO: Busca o contêiner correto do novo modal de episódios
        const container = document.getElementById('episodes-modal-list') || 
                          document.getElementById(`episodes-container-${itemId}`) || 
                          document.getElementById('episodes-container');
        
        if (!container || !item) return;
        container.innerHTML = '';
        
        const episodes = (item.seasons && item.seasons[seasonNum]) ? item.seasons[seasonNum] : [];
        if (!episodes.length) {
            container.innerHTML = '<p class="text-white/50 text-center py-12">Nenhum episódio disponível para esta temporada.</p>';
            return;
        }

        const frag = document.createDocumentFragment();

        // HELPER ROBUSTO: Procura a chave de progresso correta para evitar pct zerado
        const findProgressForEp = (stableId) => {
            try {
                if (!stableId || !window.state || !window.state.progress) return null;
                const progMap = window.state.progress;
                if (progMap[stableId]) return progMap[stableId];
                const candidates = [
                    `${itemId}-${stableId}`,
                    `${itemId}::${stableId}`,
                    `${stableId}`
                ];
                for (const c of candidates) {
                    if (progMap[c]) return progMap[c];
                }
                const keys = Object.keys(progMap || {});
                for (const k of keys) {
                    if (k && k.endsWith(stableId)) return progMap[k];
                }
            } catch (_) {}
            return null;
        };

        episodes.forEach((ep, index) => {
            let realUrl = '';
            try {
                realUrl = normalizeMediaUrl(ep);
            } catch (_) { realUrl = (ep && ep.url) ? ep.url : ''; }

            const available = !!(realUrl && String(realUrl).trim().length > 0);
            
            let stableEpId = `${itemId}-s${seasonNum}-e${index}`;
            if (typeof window.getStableEpId === 'function') {
                try { stableEpId = window.getStableEpId(itemId, seasonNum, index, ep); } catch(_) {}
            } else if (window.g && typeof window.g.getStableEpId === 'function') {
                try { stableEpId = window.g.getStableEpId(itemId, seasonNum, index, ep); } catch(_) {}
            }

            // CALCULA A PORCENTAGEM DE PROGRESSO CORRETAMENTE
            let pct = 0;
            try {
                const prog = findProgressForEp(stableEpId);
                if (prog && typeof prog === 'object') {
                    const t = Number(prog.time || 0);
                    const d = Number(prog.duration || 0);
                    if (d > 0) pct = Math.min(100, (t / d) * 100);
                    else if (t > 0) pct = Math.min(100, (t / (t + 60)) * 100);
                    if (!isFinite(pct) || pct < 0) pct = 0;
                    if (pct > 100) pct = 100;
                }
            } catch (e) { pct = 0; }

            const row = document.createElement('div');
            row.className = 'ep-item group flex gap-4 p-3 rounded-2xl transition-colors duration-300';
            if (available) row.className += ' cursor-pointer hover:bg-white/[0.03]';
            else row.className += ' opacity-50';

            let cover = 'fiveicon.png';
            try {
                if (ep && ep.cover && String(ep.cover).trim()) {
                    cover = String(ep.cover).trim();
                } else {
                    const seasonFirst = (item.seasons && item.seasons[seasonNum] && item.seasons[seasonNum][0]) ? item.seasons[seasonNum][0] : null;
                    if (seasonFirst && seasonFirst.cover && String(seasonFirst.cover).trim()) {
                        cover = String(seasonFirst.cover).trim();
                    } else if (item && item.cover && String(item.cover).trim()) {
                        cover = String(item.cover).trim();
                    }
                }
            } catch (_) { cover = 'fiveicon.png'; }

            // HTML: CRIA OS CHECKS ASSISTIDOS CASO PASSE DE 95%
            const checkOverlay = (pct >= 90) ? `<div class="absolute top-2 right-2 z-30 flex items-center justify-center w-8 h-8 rounded-full bg-white/10 border border-white/20 text-accent backdrop-blur-md shadow-[0_0_10px_rgba(0,0,0,0.5)]"><i class="ph-fill ph-check-circle text-lg"></i></div>` : '';
            const checkBadge = (pct > 95) ? `<i class="ph-fill ph-check-circle text-accent text-lg shrink-0 drop-shadow-[0_0_8px_rgba(139,92,246,0.4)]" title="Assistido"></i>` : '';

            row.innerHTML = `
                <div class="relative w-32 md:w-40 aspect-video rounded-xl overflow-hidden bg-zinc-900 shrink-0 border border-white/5" style="background-image: url('${cover}'); background-size: cover; background-position: center;">
                    ${checkOverlay}
                    ${available ? `<div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/30"><div class="w-10 h-10 rounded-full glass flex items-center justify-center text-white"><i class="ph-fill ph-play text-white"></i></div></div>` : ''}
                    ${pct > 0 ? `<div class="absolute bottom-0 left-0 w-full h-1 bg-black/60 z-20"><div class="h-full bg-accent shadow-[0_0_8px_rgba(139,92,246,0.8)] transition-all duration-300" style="width:${pct}%"></div></div>` : ''}
                </div>
                <div class="flex flex-col justify-center py-1 flex-1 min-w-0">
                    <div class="flex justify-between items-start mb-1">
                        <h4 class="text-white font-medium text-sm md:text-base truncate pr-4">${index+1}. ${ep.title || 'Episódio'}</h4>
                        ${checkBadge}
                    </div>
                    <span class="text-xs text-zinc-500">Episódio ${index+1}</span>
                    ${ep.description ? `<p class="text-xs text-white/50 mt-1 line-clamp-2">${ep.description}</p>` : ''}
                </div>
            `;

            if (available) {
                row.addEventListener('click', () => {
                    const nextE = (index + 1 < episodes.length) ? episodes[index + 1] : null;
                    let nextRealUrl = '';
                    try {
                        if (nextE && nextE.url && String(nextE.url).trim()) nextRealUrl = String(nextE.url).trim();
                        else if (nextE && nextE.url_enc && window.__lumina_deobf && typeof window.__lumina_deobf.decode === 'function') {
                            try { nextRealUrl = window.__lumina_deobf.decode(nextE.url_enc, window.__lumina_deobf.key) || ''; } catch(_) { nextRealUrl = ''; }
                        }
                    } catch(_) { nextRealUrl = (nextE && nextE.url) ? nextE.url : ''; }

                    const nextContext = nextRealUrl ? { url: nextRealUrl, title: `T${seasonNum}:E${index+2} - ${nextE.title}`, s: seasonNum, e: index+1 } : null;
                    const ctx = {
                        type: 'serie',
                        seriesId: item.id,
                        seriesTitle: item.title,
                        season: seasonNum,
                        episode: index,
                        id: stableEpId,
                        trigger: item.nextEpisodeTrigger || 0,
                        nextEp: nextContext,
                        url: realUrl,
                        subtitles: ep.subtitles || [],
                        introStart: ep.introStart || 0,
                        introDuration: ep.introDuration || 0
                    };
                    
                    try { 
                        window.requestPlay(realUrl, `T${seasonNum}:E${index+1} - ${ep.title || 'Episódio'}`, ctx); 
                    } catch(_) {}
                }, { passive: true });
            }
            frag.appendChild(row);
        });

        container.appendChild(frag);
    } catch (err) {
        console.warn('loadSeason simplified failed', err);
    }
};
/* Safe renderer for episode cards: builds DOM nodes and assigns click handlers programmatically to avoid
   JS interpolation issues and broken inline onclick attributes. */
window.renderEpisodesList = async function(seriesItem, seasonKey) {
    try {
        // Ensure DB is available and any obfuscated urls/ids are decoded before computing progress
        try { await ensureDB(); } catch(_) {}
        if (!seriesItem || !seasonKey) return;
        const episodesContainer = document.getElementById('episodes-modal-list') ||
                                   document.getElementById(`episodes-container-${seriesItem.id}`) ||
                                   document.getElementById('episodes-container');
        if (!episodesContainer) return;
        episodesContainer.innerHTML = '';

        const episodes = (seriesItem.seasons && seriesItem.seasons[seasonKey]) ? seriesItem.seasons[seasonKey] : [];
        const frag = document.createDocumentFragment();

        // helper: robustly find progress entry for an episode by checking several key variants and suffix matches
        const findProgressForEp = (stableId) => {
            try {
                if (!stableId || !window.state || !window.state.progress) return null;
                const progMap = window.state.progress;
                // exact match first
                if (progMap[stableId]) return progMap[stableId];
                // common namespaced forms
                const candidates = [
                    `${seriesItem.id}-${stableId}`,
                    `${seriesItem.id}::${stableId}`,
                    `${stableId}`, // try plain again defensively
                ];
                for (const c of candidates) {
                    if (progMap[c]) return progMap[c];
                }
                // last resort: find any key that endsWith the stableId (covers legacy collisions)
                const keys = Object.keys(progMap || {});
                for (const k of keys) {
                    if (k && k.endsWith(stableId)) return progMap[k];
                }
            } catch (_) {}
            return null;
        };

        episodes.forEach((ep, index) => {
            const card = document.createElement('div');
            card.className = 'group flex gap-4 p-3 rounded-2xl transition-colors duration-300';
            
            // graceful available indicator
            const realUrl = (ep && ep.url) ? String(ep.url).trim() : (ep && ep.url_enc && window.__lumina_deobf ? window.__lumina_deobf.decode(ep.url_enc, window.__lumina_deobf.key) : '');
            const available = !!realUrl;

            if (available) card.classList.add('cursor-pointer', 'hover:bg-white/[0.03]');
            else card.classList.add('opacity-50');

            // Cover fallback: episode -> first ep of season -> series cover -> placeholder
            let cover = 'fiveicon.png';
            try {
                if (ep && ep.cover) cover = ep.cover;
                else {
                    const first = (seriesItem.seasons && seriesItem.seasons[seasonKey] && seriesItem.seasons[seasonKey][0]) ? seriesItem.seasons[seasonKey][0] : null;
                    if (first && first.cover) cover = first.cover;
                    else if (seriesItem.cover) cover = seriesItem.cover;
                }
            } catch(_) { cover = 'fiveicon.png'; }

            // stable episode id (consistent)
            let stableEpId = `${seriesItem.id}-s${seasonKey}-e${index}`;
            try { if (typeof window.getStableEpId === 'function') stableEpId = window.getStableEpId(seriesItem.id, seasonKey, index, ep); } catch(_) {}

            // compute progress robustly using helper
            let pct = 0;
            try {
                const prog = findProgressForEp(stableEpId);
                if (prog && typeof prog === 'object') {
                    const t = Number(prog.time || 0);
                    const d = Number(prog.duration || 0);
                    if (d > 0) pct = Math.min(100, (t / d) * 100);
                    else if (t > 0) pct = Math.min(100, (t / (t + 60)) * 100);
                    // ensure numeric and bounded
                    if (!isFinite(pct) || pct < 0) pct = 0;
                    if (pct > 100) pct = 100;
                }
            } catch (e) { pct = 0; }

            // build check icon html when >95%
            const checkHtml = (pct >= 90) ? `<div class="watched-check-badge" title="Assistido"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"></path></svg></div>` : '';

            // populate inner HTML
            card.innerHTML = `
                <div class="relative w-32 md:w-40 aspect-video rounded-xl overflow-hidden bg-zinc-900 shrink-0 border border-white/5">
                    <img loading="lazy" decoding="async" data-db-cover="1" src="${cover}" class="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-300" onerror="this.onerror=null;this.src='fiveicon.png';">
                    ${checkHtml}
                    ${available ? `<div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/30"><div class="w-10 h-10 rounded-full glass flex items-center justify-center text-white"><i class="ph-fill ph-play text-white"></i></div></div>` : ''}
                    
                    ${pct > 0 ? `
                        <div class="absolute bottom-0 left-0 w-full h-1 bg-black/60 z-20">
                            <div class="h-full bg-accent shadow-[0_0_8px_rgba(139,92,246,0.8)] transition-all duration-300" style="width: ${pct}%"></div>
                        </div>
                    ` : ''}
                </div>
                
                <div class="flex flex-col justify-center py-1 flex-1 min-w-0">
                    <div class="flex justify-between items-start mb-1">
                        <h4 class="text-white font-medium text-sm md:text-base truncate pr-4">${index+1}. ${ep.title || `Episódio ${index+1}`}</h4>
                        ${pct > 95 ? '<i class="ph-fill ph-check-circle text-accent text-lg shrink-0 drop-shadow-[0_0_8px_rgba(139,92,246,0.4)]" title="Assistido"></i>' : ''}
                    </div>
                    <span class="text-xs text-zinc-500">Episódio ${index+1}</span>
                    ${ep.description ? `<p class="text-xs text-white/50 mt-1 line-clamp-2">${ep.description}</p>` : ''}
                </div>
            `;

            // click handler: programmatic, safe
            if (available) {
                card.addEventListener('click', (ev) => {
                    try {
                        ev && ev.stopPropagation && ev.stopPropagation();

                        // update history minimal
                        try {
                            state.history = state.history || {};
                            state.history[seriesItem.id] = { s: parseInt(seasonKey, 10), e: index, epId: stableEpId, timestamp: Date.now() };
                            saveProgressData();
                        } catch(_) {}

                        const nextEp = (seriesItem.seasons && seriesItem.seasons[seasonKey] && seriesItem.seasons[seasonKey][index+1]) ? seriesItem.seasons[seasonKey][index+1] : null;
                        const nextRealUrl = nextEp ? ((nextEp.url && nextEp.url.trim()) ? nextEp.url : (nextEp.url_enc && window.__lumina_deobf ? window.__lumina_deobf.decode(nextEp.url_enc, window.__lumina_deobf.key) : '')) : null;
                        const nextContext = nextRealUrl ? { url: nextRealUrl, title: `T${seasonKey}:E${index+2} - ${nextEp.title}`, s: seasonKey, e: index+1 } : null;

                        const ctx = {
                            type: 'serie',
                            seriesId: seriesItem.id,
                            seriesTitle: seriesItem.title,
                            season: seasonKey,
                            episode: index,
                            id: stableEpId,
                            trigger: seriesItem.nextEpisodeTrigger || 0,
                            nextEp: nextContext,
                            url: realUrl,
                            subtitles: ep.subtitles || [],
                            introStart: ep.introStart || 0,
                            introDuration: ep.introDuration || 0
                        };

                        if (typeof requestPlay === 'function') {
                            requestPlay(realUrl, `T${seasonKey}:E${index+1} - ${ep.title || 'Episódio'}`, ctx);
                        } else if (typeof openPlayer === 'function') {
                            openPlayer(realUrl, `T${seasonKey}:E${index+1} - ${ep.title || 'Episódio'}`, ctx);
                        } else {
                            console.warn('Nenhuma função de reprodução disponível (requestPlay/openPlayer).');
                        }
                    } catch (err) {
                        console.error('Erro ao tentar reproduzir o episódio:', err);
                    }
                }, { passive: true });
            }

            frag.appendChild(card);
        });

        episodesContainer.appendChild(frag);
    } catch (err) {
        console.warn('renderEpisodesList error', err);
    }
};

window.toggleFav = typeof toggleFav === 'function' ? toggleFav : (window.toggleFav || function(){});
window.toggleFullscreen = typeof toggleFullscreen === 'function' ? toggleFullscreen : (window.toggleFullscreen || function(){});
window.togglePiP = typeof togglePiP === 'function' ? togglePiP : (window.togglePiP || function(){});
window.toggleMute = typeof toggleMute === 'function' ? toggleMute : (window.toggleMute || function(){});
window.closePlayer = typeof closePlayer === 'function' ? closePlayer : (window.closePlayer || function(){});
window.openPlayer = typeof openPlayer === 'function' ? openPlayer : (window.openPlayer || function(){});
// Ensure skipIntro is available globally for inline onclick handlers (button uses onclick="skipIntro()")
window.skipIntro = typeof skipIntro === 'function' ? skipIntro : (window.skipIntro || function(){});

// Run any toggleFav calls queued earlier by the safe fallback inserted in the <head>
// This ensures inline onclick="toggleFav(...)" used before the module loads will be executed now.
try {
  if (Array.isArray(window.__lumina_deferredToggleFavCalls) && window.__lumina_deferredToggleFavCalls.length) {
    const calls = window.__lumina_deferredToggleFavCalls.slice();
    // clear the queue to avoid double-processing
    try { window.__lumina_deferredToggleFavCalls.length = 0; } catch(_) {}
    setTimeout(() => {
      try {
        calls.forEach(c => {
          try {
            // call the real implementation if available, otherwise keep using the fallback
            if (typeof window.toggleFav === 'function') {
              // emulate an event object minimal shape for compatibility
              const fakeEvent = (function(){
                try {
                  const e = new Event('click', { bubbles: true, cancelable: true });
                  e._deferred = true;
                  e.stopPropagation = function(){ try { Event.prototype.stopPropagation.call(this); } catch(_) {} };
                  return e;
                } catch(_) { return { _deferred: true, stopPropagation: function(){} }; }
              })();
              window.toggleFav(fakeEvent, c.id);
            }
          } catch(_) {}
        });
      } catch(_) {}
    }, 30);
  }
} catch(_) {}

// Ensure key action helpers used by inline onclick attributes are always available on window
try {
  if (typeof openDetails === 'function') window.openDetails = openDetails;
  else window.openDetails = window.openDetails || function(id){ /* noop safe fallback */ };

  if (typeof toggleFav === 'function') window.toggleFav = toggleFav;
  else window.toggleFav = window.toggleFav || function(ev, id){ /* noop safe fallback */ };
} catch (e) {
  // defensive fallback if any of the assignments fail
  window.openDetails = window.openDetails || function(){};
  window.toggleFav = window.toggleFav || function(){};
}

})();
})();

// Expose functions defined inside this module to the global scope so inline onclick handlers (in HTML) can call them.
try {
  window.scrollCards = typeof scrollCards === 'function' ? scrollCards : window.scrollCards || function(){};
  window.toggleSectionMobile = typeof toggleSectionMobile === 'function' ? toggleSectionMobile : window.toggleSectionMobile || function(){};

  // Ensure next-episode helpers are exposed safely for inline onclicks
  try {
    window.playNextEpisode = typeof playNextEpisode === 'function' ? function(){ try { return playNextEpisode(); } catch(e){ console.warn('playNextEpisode wrapper error', e); } } : (window.playNextEpisode || function(){});
    window.dismissNextEp = typeof dismissNextEp === 'function' ? function(){ try { return dismissNextEp(); } catch(e){ console.warn('dismissNextEp wrapper error', e); } } : (window.dismissNextEp || function(){});
    // Expose skipVideo globally so inline onclick attributes can call it without ReferenceError
    window.skipVideo = typeof skipVideo === 'function' ? function(s){ try { return skipVideo(s); } catch(e){ console.warn('skipVideo wrapper error', e); } } : (window.skipVideo || function(){});
  } catch (e) {
    // silent fallback if environment prevents assignment
    try { window.playNextEpisode = window.playNextEpisode || function(){}; } catch(_) {}
    try { window.dismissNextEp = window.dismissNextEp || function(){}; } catch(_) {}
    try { window.skipVideo = window.skipVideo || function(){}; } catch(_) {}
  }
} catch (e) {
  // silent fallback
}
