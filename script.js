document.addEventListener("DOMContentLoaded", () => {

    /* ═══════════════════════════════
       HERO SLIDESHOW
    ═══════════════════════════════ */
    let slide = 0;
    const imgs = document.querySelectorAll('.hero-img');
    const dots = document.querySelectorAll('.hdot');

    window.setSlide = function (n) {
        imgs[slide].classList.remove('show');
        dots[slide].classList.remove('on');
        slide = n;
        imgs[slide].classList.add('show');
        dots[slide].classList.add('on');
    };

    if (imgs.length > 0) {
        setInterval(() => {
            setSlide((slide + 1) % imgs.length);
        }, 5000);
    }

    /* ═══════════════════════════════
       NAVIGATION
    ═══════════════════════════════ */
    let cur = 'home';

    window.go = function (page) {
        if (page === cur) return;

        const prev = document.getElementById('pg-' + cur);
        if (prev) prev.classList.remove('active');

        setTimeout(() => {
            const next = document.getElementById('pg-' + page);
            if (!next) return;
            next.classList.add('active');
            next.scrollTop = 0;
        }, 200);

        document.querySelectorAll('.nav-links a').forEach(a => {
            a.classList.toggle('active', a.dataset.p === page);
        });

        /* Nav appearance: transparent only on home */
        document.getElementById('nav').classList.toggle('on-dark', page === 'home');

        cur = page;
    };

    /* Set initial state */
    document.getElementById('nav').classList.add('on-dark');

    /* ═══════════════════════════════
       MOBILE MENU TOGGLE
    ═══════════════════════════════ */
    window.toggleMenu = function () {
        const menu = document.getElementById('mobMenu');
        const ham = document.getElementById('ham');
        menu.classList.toggle('open');
        ham.classList.toggle('active');
    };

    window.closeMob = function () {
        document.getElementById('mobMenu').classList.remove('open');
        document.getElementById('ham').classList.remove('active');
    };

    /* Close mobile menu on orientation change */
    window.addEventListener('orientationchange', () => {
        setTimeout(closeMob, 300);
    });

    /* ═══════════════════════════════
       STAT COUNTERS
    ═══════════════════════════════ */
    function runCounters() {
        document.querySelectorAll('.strip-n').forEach(el => {
            const target = +el.dataset.t;
            let progress = 0;

            function tick() {
                progress += 0.018;
                const ease = 1 - Math.pow(1 - Math.min(progress, 1), 3);
                const value = Math.round(target * ease);

                el.textContent = value + (target >= 98 ? '%' : '+');

                if (progress < 1) requestAnimationFrame(tick);
            }

            requestAnimationFrame(tick);
        });
    }

    setTimeout(runCounters, 500);

    /* ═══════════════════════════════
       PORTFOLIO FILTER
    ═══════════════════════════════ */
    document.querySelectorAll('.cat-btn').forEach(btn => {
        btn.addEventListener('click', function () {
            document.querySelectorAll('.cat-btn').forEach(b => b.classList.remove('on'));
            this.classList.add('on');

            const f = this.dataset.f;

            document.querySelectorAll('.gcell').forEach(c => {
                const show = f === 'all' || c.dataset.c === f;
                c.style.opacity = show ? '1' : '0.15';
                c.style.transition = 'opacity 0.35s';
            });
        });
    });

    /* ═══════════════════════════════
       LIGHTBOX
    ═══════════════════════════════ */
    window.openLb = function (el) {
        const src = el.querySelector('img').src;
        document.getElementById('lbimg').src = src;
        document.getElementById('lb').classList.add('open');
        document.body.style.overflow = 'hidden';
    };

    window.closeLb = function () {
        document.getElementById('lb').classList.remove('open');
        document.body.style.overflow = '';
    };

    document.getElementById('lb').addEventListener('click', e => {
        if (e.target === document.getElementById('lb')) closeLb();
    });

    document.addEventListener('keydown', e => {
        if (e.key === 'Escape') closeLb();
    });

    /* ═══════════════════════════════
       CONTACT FORM
    ═══════════════════════════════ */
    window.handleForm = function (e) {
        const btn = e.currentTarget;
        const orig = btn.textContent;
        btn.textContent = 'Sent ✓';
        btn.style.background = '#2d7a3a';
        btn.disabled = true;

        setTimeout(() => {
            btn.textContent = orig;
            btn.style.background = '';
            btn.disabled = false;
        }, 3000);
    };

    /* ═══════════════════════════════
       REVIEW SLIDER
    ═══════════════════════════════ */
    const reviewSlides = document.querySelectorAll('.review-slide');
    const reviewDots = document.querySelectorAll('.rdot');
    let reviewIndex = 0;

    function showReview(n) {
        if (!reviewSlides.length) return;

        reviewSlides[reviewIndex].classList.remove('active');
        if (reviewDots[reviewIndex]) reviewDots[reviewIndex].classList.remove('active');

        reviewIndex = (n + reviewSlides.length) % reviewSlides.length;

        reviewSlides[reviewIndex].classList.add('active');
        if (reviewDots[reviewIndex]) reviewDots[reviewIndex].classList.add('active');
    }

    window.goReview = function (n) { showReview(n); };

    if (reviewSlides.length > 1) {
        setInterval(() => showReview(reviewIndex + 1), 5000);
    }

});
