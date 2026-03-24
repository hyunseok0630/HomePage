document.addEventListener('DOMContentLoaded', function() {
    const header       = document.getElementById('main-header');
    const heroContent  = document.getElementById('hero-content');
    const videoOverlay = document.getElementById('video-overlay');

    // --- 1. 스크롤 이벤트 처리 ---
    function handleScroll() {
        const isMainPage = document.querySelector('.video-hero') !== null;
        if (isMainPage) {
            if (window.scrollY > 10) {
                if (header)       header.classList.add('scrolled');
                if (heroContent)  heroContent.classList.add('scrolled');
                if (videoOverlay) videoOverlay.classList.add('scrolled');
            } else {
                if (header)       header.classList.remove('scrolled');
                if (heroContent)  heroContent.classList.remove('scrolled');
                if (videoOverlay) videoOverlay.classList.remove('scrolled');
            }
        } else {
            // 서브페이지는 항상 헤더가 보이도록 처리
            if (header) header.classList.add('scrolled');
        }
    }

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    // ✅ --- 2. 마우스 상단 호버(접근) 이벤트 처리 추가 ---
    document.addEventListener('mousemove', function(e) {
        const isMainPage = document.querySelector('.video-hero') !== null;
        
        // 메인 페이지(index)이면서 스크롤이 최상단(10px 이하)에 있을 때만 작동
        if (isMainPage && window.scrollY <= 10) {
            // 마우스 Y 좌표가 85px 이하 (헤더 높이 근처)로 올라가면
            if (e.clientY <= 85) {
                if (header) header.classList.add('hovered');
            } else {
                // 마우스가 다시 아래로 내려가면
                if (header) header.classList.remove('hovered');
            }
        }
    });

    // --- 3. 햄버거 메뉴 처리 ---
    const hamburger  = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobileMenu');
    
    if (hamburger && mobileMenu) {
        hamburger.addEventListener('click', function() {
            mobileMenu.classList.toggle('open');
            hamburger.classList.toggle('open');
        });
        
        document.addEventListener('click', function(e) {
            if (!hamburger.contains(e.target) && !mobileMenu.contains(e.target)) {
                mobileMenu.classList.remove('open');
                hamburger.classList.remove('open');
            }
        });
    }
});