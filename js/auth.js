// ────────────────────────────────────────────────
// auth.js — 모든 페이지 공통 로그인 상태 관리
// ────────────────────────────────────────────────
import { initializeApp }
    from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut }
    from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyCCs0WBQeHiIoJWjbc7IP8GGb7knc9yfJw",
    authDomain: "skycommerce-7fec4.firebaseapp.com",
    projectId: "skycommerce-7fec4",
    storageBucket: "skycommerce-7fec4.firebasestorage.app",
    messagingSenderId: "232403511014",
    appId: "1:232403511014:web:318ebb689d678e998b7d27"
};

const app  = initializeApp(firebaseConfig);
const auth = getAuth(app);

onAuthStateChanged(auth, (user) => {
    const userProfileBtn = document.getElementById('userProfileBtn');
    const adminEditBtn   = document.getElementById('adminEditBtn');
    const inboxBtn       = document.getElementById('inboxBtn');

    if (user) {
        // ★ 아이콘 파란색
        if (userProfileBtn) {
            userProfileBtn.style.color = '#0071e3';
            userProfileBtn.title       = '로그아웃';
            userProfileBtn.href        = '#';
            userProfileBtn.onclick     = async (e) => {
                e.preventDefault();
                if (!confirm('로그아웃 하시겠습니까?')) return;
                localStorage.removeItem('loginTime');
                localStorage.removeItem('isLoggedIn');
                localStorage.removeItem('userRole');
                await signOut(auth);
                window.location.reload();
            };
        }
        // 관리자 전용 버튼 표시
        if (adminEditBtn) adminEditBtn.style.display = 'inline-block';
        if (inboxBtn)     inboxBtn.style.display     = 'inline-block';

    } else {
        // ★ 아이콘 기본색
        if (userProfileBtn) {
            userProfileBtn.style.color = 'rgba(255,255,255,0.8)';
            userProfileBtn.title       = '로그인';
            userProfileBtn.href        = 'login.html';
            userProfileBtn.onclick     = null;
        }
        // 관리자 전용 버튼 숨김
        if (adminEditBtn) adminEditBtn.style.display = 'none';
        if (inboxBtn)     inboxBtn.style.display     = 'none';
    }
});
