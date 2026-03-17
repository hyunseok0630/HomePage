const header = document.getElementById('main-header');
const isIndexPage = document.querySelector('.video-hero') !== null;

// ── 햄버거 메뉴 토글 ──
const hamburger  = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
        const isOpen = mobileMenu.classList.toggle('open');
        hamburger.classList.toggle('open', isOpen);
    });
    // 메뉴 링크 클릭 시 닫기
    mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('open');
            hamburger.classList.remove('open');
        });
    });
}

// ── 서브 페이지: 헤더 항상 표시 ──
if (!isIndexPage && header) {
    header.classList.add('scrolled');
}

// ── index.html 전용 ──
if (isIndexPage && header) {

    // 상단 호버 트리거
    const hoverTrigger = document.createElement('div');
    hoverTrigger.id = 'header-hover-trigger';
    hoverTrigger.style.cssText = `
        position: fixed; top: 0; left: 0;
        width: 100%; height: 80px;
        z-index: 999; pointer-events: auto;
    `;
    document.body.appendChild(hoverTrigger);

    hoverTrigger.addEventListener('mouseenter', () => {
        header.classList.add('hovered');
    });
    hoverTrigger.addEventListener('mouseleave', (e) => {
        if (header.contains(e.relatedTarget) || e.relatedTarget === header) return;
        if (!header.classList.contains('scrolled')) header.classList.remove('hovered');
    });
    header.addEventListener('mouseleave', () => {
        if (!header.classList.contains('scrolled')) header.classList.remove('hovered');
    });

    // 스크롤 감지
    const heroContent  = document.querySelector('.hero-content');
    const videoOverlay = document.querySelector('.video-overlay');

    function handleScroll() {
        const scrollY = window.scrollY;
        if (scrollY > 80) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        if (heroContent && videoOverlay) {
            if (scrollY > 50) {
                heroContent.classList.add('scrolled');
                videoOverlay.classList.add('scrolled');
            } else {
                heroContent.classList.remove('scrolled');
                videoOverlay.classList.remove('scrolled');
            }
        }
    }

    window.addEventListener('scroll', handleScroll);
    handleScroll();
}
