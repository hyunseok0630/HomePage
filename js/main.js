document.addEventListener('DOMContentLoaded', function () {

    // ═══════════════════════════════════════
    // 1. 스크롤 제어 (헤더 / 히어로)
    // ═══════════════════════════════════════
    const header      = document.getElementById('main-header');
    const heroContent = document.getElementById('hero-content');
    const videoOverlay = document.getElementById('video-overlay');

    function handleScroll() {
        const isMainPage = document.querySelector('.video-hero') !== null;
        if (isMainPage) {
            const scrolled = window.scrollY > 10;
            header?.classList.toggle('scrolled', scrolled);
            heroContent?.classList.toggle('scrolled', scrolled);
            videoOverlay?.classList.toggle('scrolled', scrolled);
        } else {
            header?.classList.add('scrolled');
        }
    }
    window.addEventListener('scroll', handleScroll);
    handleScroll();

    // ═══════════════════════════════════════
    // 2. 햄버거 메뉴
    // ═══════════════════════════════════════
    const hamburger  = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobileMenu');

    if (hamburger && mobileMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('open');
            mobileMenu.classList.toggle('open');
        });
        document.addEventListener('click', (e) => {
            if (!hamburger.contains(e.target) && !mobileMenu.contains(e.target)) {
                hamburger.classList.remove('open');
                mobileMenu.classList.remove('open');
            }
        });
    }

    // ═══════════════════════════════════════
    // 3. 자동 로그아웃 (Firebase signOut 포함)
    // ═══════════════════════════════════════
    const AUTO_LOGOUT_MS = 2 * 60 * 60 * 1000; // 2시간 (밀리초)

    async function firebaseSignOut() {
        try {
            // Firebase가 로드된 경우에만 signOut 호출
            const { getAuth, signOut } = await import(
                "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js"
            );
            const { initializeApp, getApps, getApp } = await import(
                "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js"
            );
            const firebaseConfig = {
                apiKey: "AIzaSyCCs0WBQeHiIoJWjbc7IP8GGb7knc9yfJw",
                authDomain: "skycommerce-7fec4.firebaseapp.com",
                projectId: "skycommerce-7fec4",
                storageBucket: "skycommerce-7fec4.firebasestorage.app",
                messagingSenderId: "232403511014",
                appId: "1:232403511014:web:318ebb689d678e998b7d27"
            };
            const app  = getApps().length ? getApp() : initializeApp(firebaseConfig);
            const auth = getAuth(app);
            await signOut(auth); // ★ 실제 Firebase 로그아웃
        } catch (e) {
            console.warn("Firebase signOut 실패:", e);
        }
    }

    async function performAutoLogout(reason = '자동') {
        localStorage.removeItem('loginTime');
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('userRole');
        await firebaseSignOut(); // ★ 반드시 Firebase도 로그아웃
        alert(`⏱ 시간이 오래되어 로그아웃됩니다.`);
        window.location.href = 'login.html';
    }

    function checkAutoLogout() {
        const loginTime = localStorage.getItem('loginTime');
        if (!loginTime) return;
        const elapsed = Date.now() - parseInt(loginTime, 10);
        if (elapsed >= AUTO_LOGOUT_MS) {
            performAutoLogout();
        }
    }

    // 페이지 로드 시 즉시 확인
    checkAutoLogout();

    // 1분마다 주기적으로 확인
    setInterval(checkAutoLogout, 60 * 1000);

});
