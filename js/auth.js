// ────────────────────────────────────────────────
// auth.js — 공통 로그인 상태 및 세션/권한 관리
// ────────────────────────────────────────────────
import { initializeApp, getApps, getApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { firebaseConfig } from "./firebase-init.js";

const app  = getApps().length ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth(app);
const db   = getFirestore(app);

// ✅ 현재 페이지 경로 확인
const path          = window.location.pathname;
const isProductPage = path.includes('/product');
const isContactPage = path.includes('/contact');

// ── 자동 로그아웃 타이머 ────────────────────────
let inactivityTimer;
const INACTIVITY_LIMIT = 30 * 60 * 1000;

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
    window.location.href = '/login/';
}

['mousemove', 'keydown', 'scroll', 'click'].forEach(event => {
    window.addEventListener(event, resetInactivityTimer);
});

// ✅ 탭 복귀 시 타이머 재설정
document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') resetInactivityTimer();
});

// ── 인증 상태 감지 ───────────────────────────────
onAuthStateChanged(auth, async (user) => {
    const userProfileBtn = document.getElementById('userProfileBtn');
    const adminEditBtn   = document.getElementById('adminEditBtn');
    const inboxBtn       = document.getElementById('inboxBtn');

    if (user) {
        resetInactivityTimer();

        // Firestore에서 isAdmin 확인
        let isAdmin = false;
        try {
            const userDoc = await getDoc(doc(db, "users", user.uid));
            if (userDoc.exists() && userDoc.data().isAdmin === true) {
                isAdmin = true;
            }
        } catch (error) {
            console.error("권한 확인 오류:", error);
        }

        // 로그인 아이콘 → 파란색 (로그아웃 버튼으로)
        if (userProfileBtn) {
            userProfileBtn.style.color = '#0071e3';
            userProfileBtn.title       = '로그아웃';
            userProfileBtn.onclick     = async (e) => {
                e.preventDefault();
                if (confirm('로그아웃 하시겠습니까?')) await performLogout();
            };
        }

        // ✅ 관리자 아이콘: 페이지별 표시
        // adminEditBtn(제품 관리) → product 페이지에서만
        // inboxBtn(발주 확인)    → contact 페이지에서만
        if (adminEditBtn) adminEditBtn.style.display = (isAdmin && isProductPage) ? 'inline-block' : 'none';
        if (inboxBtn)     inboxBtn.style.display     = (isAdmin && isContactPage) ? 'inline-block' : 'none';

    } else {
        clearTimeout(inactivityTimer);

        // 로그인 아이콘 → 기본 (로그인 링크)
        if (userProfileBtn) {
            userProfileBtn.style.color = 'rgba(255,255,255,0.8)';
            userProfileBtn.title       = '로그인';
            userProfileBtn.href        = '/login/';
            userProfileBtn.onclick     = null;
        }

        // ✅ 비로그인 상태: 관리자 아이콘 모두 숨김
        if (adminEditBtn) adminEditBtn.style.display = 'none';
        if (inboxBtn)     inboxBtn.style.display     = 'none';

        // ✅ 발주하기 메뉴는 비로그인 상태에서도 항상 표시
        // (contact 페이지 진입 시 로그인 유도 처리는 contact/index.html에서 담당)
    }
});