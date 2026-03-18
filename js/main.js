// ────────────────────────────────────────────────
// main.js — 헤더 + 햄버거 메뉴 + 자동 로그아웃
// ────────────────────────────────────────────────

const LOGOUT_TIMEOUT = 60 * 60 * 1000; // 1시간

// ────────────────────────────────────────────────
// ⏱ 자동 로그아웃 체크 (페이지 로드마다 실행)
// ────────────────────────────────────────────────
(function checkAutoLogout() {
    const loginTime = parseInt(localStorage.getItem('loginTime') || '0', 10);
    if (!loginTime) return;

    const elapsed = Date.now() - loginTime;

    if (elapsed >= LOGOUT_TIMEOUT) {
        // 즉시 로그아웃
        localStorage.removeItem('loginTime');
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('userRole');
        alert('⏰ 로그인 세션이 만료되었습니다.\n다시 로그인해 주세요.');
        window.location.href = 'login.html';
        return;
    }

    // 남은 시간 후 자동 로그아웃
    const remaining = LOGOUT_TIMEOUT - elapsed;
    setTimeout(() => {
        localStorage.removeItem('loginTime');
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('userRole');
        alert('⏰ 로그인 세션이 만료되었습니다.\n다시 로그인해 주세요.');
        window.location.href = 'login.html';
    }, remaining);
})();

// ────────────────────────────────────────────────
// 🍔 햄버거 메뉴 토글
// ────────────────────────────────────────────────
const hamburger  = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
        const isOpen = mobileMenu.classList.toggle('open');
        hamburger.classList.toggle('open', isOpen);
    });
    mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('open');
            hamburger.classList.remove('open');
        });
    });
}

// ────────────────────────────────────────────────
// 📌 헤더 표시 처리
// ────────────────────────────────────────────────
const header      = document.getElementById('main-header');
const isIndexPage = document.querySelector('.video-hero') !== null;

// 서브 페이지 → 항상 표시
if (!isIndexPage && header) {
    header.classList.add('scrolled');
}

// index.html 전용
if (isIndexPage && header) {

    // 상단 호버 트리거 영역
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
