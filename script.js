document.addEventListener("DOMContentLoaded", () => {

    /* HERO SLIDESHOW */
    let slide = 0;
    const imgs = document.querySelectorAll('.hero-img');
    const dots = document.querySelectorAll('.hdot');

    function setSlide(n) {
        imgs[slide].classList.remove('show');
        dots[slide].classList.remove('on');
        slide = n;
        imgs[slide].classList.add('show');
        dots[slide].classList.add('on');
    }

    setInterval(() => {
        if (imgs.length > 0) {
            setSlide((slide + 1) % imgs.length);
        }
    }, 5000);


    /* NAVIGATION */
    let cur = 'home';

    window.go = function (page) {
        if (page === cur) return;

        const prev = document.getElementById('pg-' + cur);
        prev.classList.remove('active');

        setTimeout(() => {
            const next = document.getElementById('pg-' + page);
            next.classList.add('active');
            next.scrollTop = 0;
        }, 200);

        document.querySelectorAll('.nav-links a').forEach(a => {
            a.classList.toggle('active', a.dataset.p === page);
        });

        const nav = document.getElementById('nav');
        nav.classList.toggle('light', page !== 'home');

        cur = page;
    }

    window.toggleMenu = function () {
        const menu = document.getElementById('mobMenu');
        const ham = document.getElementById('ham');
      
        menu.classList.toggle('open');
        ham.classList.toggle('active');
    }


    /* MOBILE MENU */
    window.closeMob = function () {
        document.getElementById('mobMenu').classList.remove('open');
    }


    /* COUNTERS */
    function runCounters() {
        document.querySelectorAll('.strip-n').forEach(el => {
            const t = +el.dataset.t;
            let c = 0;
            const s = t / 55;

            const id = setInterval(() => {
                c += s;
                if (c >= t) {
                    el.textContent = t + (t >= 98 ? '%' : '+');
                    clearInterval(id);
                } else {
                    el.textContent = Math.floor(c) + (t >= 98 ? '%' : '+');
                }
            }, 20);
        });
    }

    setTimeout(runCounters, 500);


    /* PORTFOLIO FILTER */
    document.querySelectorAll('.cat-btn').forEach(btn => {
        btn.addEventListener('click', function () {
            document.querySelectorAll('.cat-btn').forEach(b => b.classList.remove('on'));
            this.classList.add('on');

            const f = this.dataset.f;

            document.querySelectorAll('.gcell').forEach(c => {
                const show = f === 'all' || c.dataset.c === f;
                c.style.opacity = show ? '1' : '0.15';
            });
        });
    });


    /* LIGHTBOX */
    window.openLb = function (el) {
        document.getElementById('lbimg').src =
            el.querySelector('img').src.replace('w=700', 'w=1400');
        document.getElementById('lb').classList.add('open');
    }

    window.closeLb = function () {
        document.getElementById('lb').classList.remove('open');
    }

    document.getElementById('lb').addEventListener('click', e => {
        if (e.target === document.getElementById('lb')) closeLb();
    });

    document.addEventListener('keydown', e => {
        if (e.key === 'Escape') closeLb();
    });


    /* FORM */
    window.handleForm = function (e) {
        const b = e.currentTarget;
        b.textContent = 'Sent ✓';
        b.style.background = '#2d7a3a';

        setTimeout(() => {
            b.textContent = 'Send Enquiry';
            b.style.background = '';
        }, 3000);
    }
    
/* ===== REVIEW SLIDER ===== */

const reviewSlides = document.querySelectorAll('.review-slide');
const reviewDots = document.querySelectorAll('.rdot');

let reviewIndex = 0;

function showReview(n) {
    reviewSlides[reviewIndex].classList.remove('active');
    reviewDots[reviewIndex].classList.remove('active');
  
    reviewIndex = n;
  
    requestAnimationFrame(() => {
      reviewSlides[reviewIndex].classList.add('active');
      reviewDots[reviewIndex].classList.add('active');
    });
}

// manual click
window.goReview = function(n) {
  showReview(n);
}

// auto slide
setInterval(() => {
    showReview((reviewIndex + 1) % reviewSlides.length);
  }, 5000); // slower = smoother feel

});