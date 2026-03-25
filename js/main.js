document.addEventListener('DOMContentLoaded', () => {

    /* ═══════════════════════════════════════
       1. 헤더 — 스크롤 시 배경 진하게
    ═══════════════════════════════════════ */
    const header = document.getElementById('main-header');

    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 10) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });

        header.addEventListener('mouseenter', () => header.classList.add('hovered'));
        header.addEventListener('mouseleave', () => header.classList.remove('hovered'));
    }


    /* ═══════════════════════════════════════
       2. 오버레이 — 스크롤 시 더 어둡게
    ═══════════════════════════════════════ */
    const heroOverlay = document.getElementById('heroOverlay');

    if (heroOverlay) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 30) {
                heroOverlay.classList.add('scrolled');
            } else {
                heroOverlay.classList.remove('scrolled');
            }
        });
    }


    /* ═══════════════════════════════════════
       3. 햄버거 메뉴
    ═══════════════════════════════════════ */
    const hamburger  = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobileMenu');

    if (hamburger && mobileMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('open');
            mobileMenu.classList.toggle('open');
        });

        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('open');
                mobileMenu.classList.remove('open');
            });
        });
    }

});