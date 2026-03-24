// ────────────────────────────────────────────────
// auth.js — 공통 로그인 상태 및 세션/권한 관리
// ────────────────────────────────────────────────
import { initializeApp, getApps, getApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyCCs0WBQeHiIoJWjbc7IP8GGb7knc9yfJw",
    authDomain: "skycommerce-7fec4.firebaseapp.com",
    projectId: "skycommerce-7fec4",
    storageBucket: "skycommerce-7fec4.firebasestorage.app",
    messagingSenderId: "232403511014",
    appId: "1:232403511014:web:318ebb689d678e998b7d27"
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// ✅ 30분 자동 로그아웃 타이머 로직
let inactivityTimer;
const INACTIVITY_LIMIT = 30 * 60 * 1000; // 30분

function resetInactivityTimer() {
    clearTimeout(inactivityTimer);
    if (auth.currentUser) {
        inactivityTimer = setTimeout(async () => {
            alert('보안을 위해 30분간 활동이 없어 자동 로그아웃 되었습니다.');
            await performLogout();
        }, INACTIVITY_LIMIT);
    }
}

async function performLogout() {
    localStorage.removeItem('loginTime');
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userRole');
    await signOut(auth);
    window.location.href = '../login/';
}

// 사용자 활동 감지 (마우스 이동, 키보드 입력 등)
['mousemove', 'keydown', 'scroll', 'click'].forEach(event => {
    window.addEventListener(event, resetInactivityTimer);
});

onAuthStateChanged(auth, async (user) => {
    const userProfileBtn = document.getElementById('userProfileBtn');
    const adminEditBtn   = document.getElementById('adminEditBtn'); // 제품 관리 버튼
    const inboxBtn       = document.getElementById('inboxBtn');     // 발주 확인 버튼
    const contactLinks   = document.querySelectorAll('a[href*="contact/"]'); 

    if (user) {
        resetInactivityTimer();
        
        // ✅ DB에서 직접 관리자 여부(isAdmin) 확인 (이메일 하드코딩 완전 제거)
        let isAdmin = false;
        try {
            const userDoc = await getDoc(doc(db, "users", user.uid));
            if (userDoc.exists() && userDoc.data().isAdmin === true) {
                isAdmin = true;
            }
        } catch (error) {
            console.error("권한 확인 오류:", error);
        }

        // 프로필 버튼 (로그아웃으로 변경)
        if (userProfileBtn) {
            userProfileBtn.style.color = '#0071e3';
            userProfileBtn.title       = '로그아웃';
            userProfileBtn.onclick     = async (e) => {
                e.preventDefault();
                if (confirm('로그아웃 하시겠습니까?')) await performLogout();
            };
        }

        // 로그인 시 '발주하기' 메뉴 노출
        contactLinks.forEach(link => {
            const liParent = link.closest('li');
            if (liParent) liParent.style.display = '';
            else link.style.display = '';
        });

        // 관리자인 경우에만 상단바의 관리자 아이콘 노출
        if (adminEditBtn) adminEditBtn.style.display = isAdmin ? 'inline-block' : 'none';
        if (inboxBtn)     inboxBtn.style.display = isAdmin ? 'inline-block' : 'none';

    } else {
        clearTimeout(inactivityTimer);
        
        // 비로그인 시 프로필 버튼 (로그인으로 변경)
        if (userProfileBtn) {
            userProfileBtn.style.color = 'rgba(255,255,255,0.8)';
            userProfileBtn.title       = '로그인';
            userProfileBtn.href        = '../login/';
            userProfileBtn.onclick     = null;
        }

        // 비로그인 시 '발주하기' 메뉴 숨김
        contactLinks.forEach(link => {
            const liParent = link.closest('li');
            if (liParent) liParent.style.display = 'none';
            else link.style.display = 'none';
        });
        
        // 관리자 버튼 숨김
        if (adminEditBtn) adminEditBtn.style.display = 'none';
        if (inboxBtn)     inboxBtn.style.display = 'none';
    }
});