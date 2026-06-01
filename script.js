(function () {
    'use strict';

    /* ---------- mobile menu ---------- */
    const header = document.querySelector('.site_header');
    const burger = document.querySelector('.burger');
    const navLinks = document.querySelectorAll('.nav_list a');

    if (burger && header) {
        burger.addEventListener('click', function () {
            const isOpen = header.classList.toggle('is_open');
            burger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
            burger.setAttribute('aria-label', isOpen ? 'Закрыть меню' : 'Открыть меню');
            document.body.style.overflow = isOpen ? 'hidden' : '';
        });
        navLinks.forEach(function (a) {
            a.addEventListener('click', function () {
                if (header.classList.contains('is_open')) {
                    header.classList.remove('is_open');
                    burger.setAttribute('aria-expanded', 'false');
                    document.body.style.overflow = '';
                }
            });
        });
    }

    /* ---------- fade-in on scroll ---------- */
    const fadeTargets = [
        '.hero_text',
        '.hero_media',
        '.section_head',
        '.gas_card',
        '.dubovka_spec',
        '.region_card',
        '.region_total',
        '.work_tile',
        '.process_step',
        '.service_card',
        '.about_text',
        '.about_facts li',
        '.doc_item',
        '.regalia_card',
        '.contact_text',
        '.contact_form'
    ];

    const nodes = document.querySelectorAll(fadeTargets.join(','));
    nodes.forEach(function (el, i) {
        el.classList.add('fade_in_up');
        const siblings = el.parentElement ? Array.prototype.indexOf.call(el.parentElement.children, el) : 0;
        const delay = Math.min(siblings * 90, 540);
        el.style.setProperty('--fd', delay + 'ms');
    });

    if ('IntersectionObserver' in window) {
        const io = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is_visible');
                    io.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

        nodes.forEach(function (el) { io.observe(el); });
    } else {
        nodes.forEach(function (el) { el.classList.add('is_visible'); });
    }

    /* ---------- counters in numbers section ---------- */
    const counters = document.querySelectorAll('.region_num[data-target]');
    function animateCounter(el) {
        const target = parseInt(el.dataset.target, 10);
        const duration = 1600;
        const start = performance.now();
        function step(now) {
            const p = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - p, 3);
            const value = Math.round(target * eased);
            el.textContent = value.toLocaleString('ru-RU') + (p === 1 ? '+' : '');
            if (p < 1) requestAnimationFrame(step);
        }
        requestAnimationFrame(step);
    }

    if ('IntersectionObserver' in window) {
        const cio = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                    cio.unobserve(entry.target);
                }
            });
        }, { threshold: 0.4 });
        counters.forEach(function (el) { cio.observe(el); });
    } else {
        counters.forEach(function (el) {
            el.textContent = (parseInt(el.dataset.target, 10)).toLocaleString('ru-RU') + '+';
        });
    }

    /* ---------- pause videos when offscreen (perf) ---------- */
    const videos = document.querySelectorAll('video');
    if ('IntersectionObserver' in window) {
        const vio = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                const v = entry.target;
                if (entry.isIntersecting) {
                    if (v.paused) { v.play().catch(function () { /* autoplay blocked */ }); }
                } else {
                    if (!v.paused) v.pause();
                }
            });
        }, { threshold: 0.15 });
        videos.forEach(function (v) { vio.observe(v); });
    }

    /* ---------- contact form ---------- */
    const form = document.querySelector('.contact_form');
    const submit = document.querySelector('.form_submit');
    if (form && submit) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();
            const original = submit.value;
            submit.value = 'Заявка отправлена ✓';
            submit.style.background = '#0a8a3c';
            submit.style.boxShadow = '0 14px 30px -10px rgba(10,138,60,.55)';
            form.reset();
            setTimeout(function () {
                submit.value = original;
                submit.style.background = '';
                submit.style.boxShadow = '';
            }, 3200);
        });
    }
})();
