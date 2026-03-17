document.addEventListener('DOMContentLoaded', function() {
    // 1. 시네마틱 스크롤 제어 로직 (메인/서브페이지 분기 처리)
    const header = document.getElementById('main-header');
    const heroContent = document.getElementById('hero-content');
    const videoOverlay = document.getElementById('video-overlay');

    function handleScroll() {
        // 현재 페이지에 비디오 히어로 섹션이 있는지 확인 (메인 페이지 판별)
        const isMainPage = document.querySelector('.video-hero') !== null;

        if (isMainPage) {
            // [메인 페이지] 스크롤 시에만 나타나도록 처리
            if (window.scrollY > 10) {
                if (header) header.classList.add('scrolled');
                if (heroContent) heroContent.classList.add('scrolled');
                if (videoOverlay) videoOverlay.classList.add('scrolled');
            } else {
                if (header) header.classList.remove('scrolled');
                if (heroContent) heroContent.classList.remove('scrolled');
                if (videoOverlay) videoOverlay.classList.remove('scrolled');
            }
        } else {
            // [서브 페이지] 스크롤과 상관없이 항상 상단 바 표시!
            if (header) header.classList.add('scrolled');
        }
    }

    // 스크롤 이벤트 리스너 등록
    window.addEventListener('scroll', handleScroll);
    
    // 페이지 첫 로드 시에도 현재 스크롤 위치 및 페이지 종류 확인하여 반영
    handleScroll();

    // 2. 로그인 상태에 따른 우측 User 아이콘 제어
    if(typeof checkLoginStatus === 'function') {
        checkLoginStatus();
    }
});

// 로그인 상태 체크
function checkLoginStatus() {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const userProfileBtn = document.getElementById('userProfileBtn');

    if (userProfileBtn) {
        if (isLoggedIn) {
            userProfileBtn.style.color = '#0071e3'; 
            userProfileBtn.title = '로그아웃';
            
            userProfileBtn.addEventListener('click', function(e) {
                e.preventDefault();
                if(confirm('로그아웃 하시겠습니까?')) {
                    localStorage.removeItem('isLoggedIn');
                    localStorage.removeItem('userRole');
                    alert('로그아웃 되었습니다.');
                    window.location.reload(); 
                }
            });
        } else {
            userProfileBtn.style.color = 'rgba(255, 255, 255, 0.8)';
            userProfileBtn.title = '로그인';
            userProfileBtn.href = 'login.html';
        }
    }
}