// ────────────────────────────────────────────────
// main.js — 헤더 스크롤 + 호버 표시
// ────────────────────────────────────────────────

const header = document.getElementById('main-header');

// index.html 여부 판단 (비디오 히어로가 있는 페이지만 index)
const isIndexPage = document.querySelector('.video-hero') !== null;

// ────────────────────────────────────────────────
// 서브 페이지 (about, product, contact, login 등)
// → 헤더 항상 표시, 스크롤 이벤트 없음
// ────────────────────────────────────────────────
if (!isIndexPage && header) {
    header.classList.add('scrolled');
    // 여기서 종료 — 아래 index 전용 코드 실행 안 함
}

// ────────────────────────────────────────────────
// index.html 전용 처리
// ────────────────────────────────────────────────
if (isIndexPage && header) {

    // ── 1. 상단 호버 트리거 영역 ──
    const hoverTrigger = document.createElement('div');
    hoverTrigger.id = 'header-hover-trigger';
    hoverTrigger.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 80px;
        z-index: 999;
        pointer-events: auto;
    `;
    document.body.appendChild(hoverTrigger);

    // 트리거 진입 → 헤더 표시
    hoverTrigger.addEventListener('mouseenter', () => {
        header.classList.add('hovered');
    });

    // 트리거 이탈 → 헤더 쪽으로 간 경우가 아니면 숨김
    hoverTrigger.addEventListener('mouseleave', (e) => {
        if (header.contains(e.relatedTarget) || e.relatedTarget === header) return;
        if (!header.classList.contains('scrolled')) {
            header.classList.remove('hovered');
        }
    });

    // 헤더 이탈 → 스크롤 표시 상태 아니면 숨김
    header.addEventListener('mouseleave', () => {
        if (!header.classList.contains('scrolled')) {
            header.classList.remove('hovered');
        }
    });

    // ── 2. 스크롤 감지 ──
    const heroContent  = document.querySelector('.hero-content');
    const videoOverlay = document.querySelector('.video-overlay');

    function handleScroll() {
        const scrollY = window.scrollY;

        // 스크롤 80px 이상 → 헤더 고정 표시
        if (scrollY > 80) {
            header.classList.add('scrolled');
        } else {
            // 80px 미만으로 올라오면 scroll 클래스만 제거
            // (hover 상태는 유지)
            header.classList.remove('scrolled');
        }

        // 히어로 콘텐츠 / 오버레이 페이드
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
    handleScroll(); // 초기 실행 (새로고침 시 스크롤 위치 반영)
}
