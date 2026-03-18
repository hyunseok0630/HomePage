document.addEventListener('DOMContentLoaded', function() {

    const header      = document.getElementById('main-header');
    const heroContent = document.getElementById('hero-content');
    const videoOverlay = document.getElementById('video-overlay');

    function handleScroll() {
        const isMainPage = document.querySelector('.video-hero') !== null;
        if (isMainPage) {
            if (window.scrollY > 10) {
                if (header)      header.classList.add('scrolled');
                if (heroContent) heroContent.classList.add('scrolled');
                if (videoOverlay) videoOverlay.classList.add('scrolled');
            } else {
                if (header)      header.classList.remove('scrolled');
                if (heroContent) heroContent.classList.remove('scrolled');
                if (videoOverlay) videoOverlay.classList.remove('scrolled');
            }
        } else {
            if (header) header.classList.add('scrolled');
        }
    }

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    // 햄버거 메뉴
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

function checkLoginStatus() {
    const isLoggedIn    = localStorage.getItem('isLoggedIn') === 'true';
    const userProfileBtn = document.getElementById('userProfileBtn');

    if (userProfileBtn) {
        if (isLoggedIn) {
            userProfileBtn.style.color = '#0071e3';
            userProfileBtn.title = '로그아웃';
            userProfileBtn.addEventListener('click', function(e) {
                e.preventDefault();
                if (confirm('로그아웃 하시겠습니까?')) {
                    localStorage.removeItem('isLoggedIn');
                    localStorage.removeItem('userRole');
                    alert('로그아웃 되었습니다.');
                    window.location.reload();
                }
            });
        } else {
            userProfileBtn.style.color = 'rgba(255,255,255,0.8)';
            userProfileBtn.title = '로그인';
            userProfileBtn.href  = '/login/';   // ✅ 절대경로로 수정
        }
    }
}
