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

        // close lightbox if open before page switch
        closeLb();

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

        document.getElementById('nav').classList.toggle('on-dark', page === 'home');

        cur = page;
    };

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
                progress += 0.002;
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
       PORTFOLIO FILTER + LIGHTBOX GALLERY
    ═══════════════════════════════ */
    const galleryItems = Array.from(document.querySelectorAll('.gcell'));
    let activeFilter = 'all';
    let visibleGalleryItems = [...galleryItems];
    let currentGalleryIndex = 0;

    function updateVisibleGalleryItems() {
        visibleGalleryItems = galleryItems.filter(item => {
            return activeFilter === 'all' || item.dataset.c === activeFilter;
        });
    }

    document.querySelectorAll('.cat-btn').forEach(btn => {
        btn.addEventListener('click', function () {
            document.querySelectorAll('.cat-btn').forEach(b => b.classList.remove('on'));
            this.classList.add('on');

            activeFilter = this.dataset.f;

            galleryItems.forEach(item => {
                const show = activeFilter === 'all' || item.dataset.c === activeFilter;
                item.classList.toggle('hide', !show);
            });

            updateVisibleGalleryItems();
            closeLb();
        });
    });

    function showLightboxImage(index) {
        if (!visibleGalleryItems.length) return;

        currentGalleryIndex = (index + visibleGalleryItems.length) % visibleGalleryItems.length;
        const activeItem = visibleGalleryItems[currentGalleryIndex];
        const img = activeItem.querySelector('img');

        document.getElementById('lbimg').src = img.src;
        document.getElementById('lbimg').alt = img.alt || 'Gallery image';
    }

    window.openLb = function (el) {
        updateVisibleGalleryItems();

        const index = visibleGalleryItems.indexOf(el);
        currentGalleryIndex = index >= 0 ? index : 0;

        showLightboxImage(currentGalleryIndex);
        document.getElementById('lb').classList.add('open');
        document.body.style.overflow = 'hidden';
    };

    window.closeLb = function () {
        const lb = document.getElementById('lb');
        lb.classList.remove('open');
        document.body.style.overflow = '';
    };

    window.prevLb = function (e) {
        if (e) e.stopPropagation();
        showLightboxImage(currentGalleryIndex - 1);
    };

    window.nextLb = function (e) {
        if (e) e.stopPropagation();
        showLightboxImage(currentGalleryIndex + 1);
    };

    const lb = document.getElementById('lb');
    if (lb) {
        lb.addEventListener('click', e => {
            if (e.target === lb) closeLb();
        });
    }

    document.addEventListener('keydown', e => {
        const isOpen = document.getElementById('lb')?.classList.contains('open');

        if (!isOpen) return;

        if (e.key === 'Escape') closeLb();
        if (e.key === 'ArrowLeft') prevLb();
        if (e.key === 'ArrowRight') nextLb();
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
