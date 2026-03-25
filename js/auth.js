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

// ── 세션 설정 ────────────────────────────────────
const SESSION_LIMIT   = 60 * 60 * 1000; // 1시간 (밀리초)
const LOGIN_TIME_KEY  = 'sessionLoginTime';

let sessionTimer;

// 로그인 기준 시간 저장 (최초 로그인 시 1회만)
function initLoginTime() {
    if (!localStorage.getItem(LOGIN_TIME_KEY)) {
        localStorage.setItem(LOGIN_TIME_KEY, Date.now().toString());
    }
}

// 로그인 후 경과 시간 확인
function isSessionExpired() {
    const loginTime = localStorage.getItem(LOGIN_TIME_KEY);
    if (!loginTime) return false;
    return (Date.now() - parseInt(loginTime)) >= SESSION_LIMIT;
}

// 만료까지 남은 시간 계산
function getRemainingTime() {
    const loginTime = localStorage.getItem(LOGIN_TIME_KEY);
    if (!loginTime) return SESSION_LIMIT;
    const elapsed = Date.now() - parseInt(loginTime);
    return Math.max(SESSION_LIMIT - elapsed, 0);
}

async function performLogout() {
    clearTimeout(sessionTimer);
    localStorage.removeItem(LOGIN_TIME_KEY);
    await signOut(auth);
    const depth  = (path.match(/\//g) || []).length - 1;
    const prefix = depth > 1 ? '../' : '';
    window.location.href = prefix + 'login/';
}

// 남은 시간만큼 타이머 설정
function startSessionTimer() {
    clearTimeout(sessionTimer);
    const remaining = getRemainingTime();
    if (remaining <= 0) return;
    sessionTimer = setTimeout(async () => {
        alert('로그인 후 1시간이 경과하여 자동 로그아웃 되었습니다.');
        await performLogout();
    }, remaining);
}

// 탭 복귀 시 만료 여부 재확인
document.addEventListener('visibilitychange', async () => {
    if (document.visibilityState === 'visible' && auth.currentUser) {
        if (isSessionExpired()) {
            alert('로그인 후 1시간이 경과하여 자동 로그아웃 되었습니다.');
            await performLogout();
        }
    }
});

// ── 인증 상태 감지 ───────────────────────────────
onAuthStateChanged(auth, async (user) => {
    const userProfileBtn = document.getElementById('userProfileBtn');
    const adminEditBtn   = document.getElementById('adminEditBtn');
    const inboxBtn       = document.getElementById('inboxBtn');

    if (user) {
        // 페이지 로드 시 만료 확인
        if (isSessionExpired()) {
            alert('로그인 후 1시간이 경과하여 자동 로그아웃 되었습니다.');
            await performLogout();
            return;
        }

        // 로그인 시각 저장 & 타이머 시작
        initLoginTime();
        startSessionTimer();

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

        // 관리자 아이콘: 페이지별 표시
        if (adminEditBtn) adminEditBtn.style.display = (isAdmin && isProductPage) ? 'inline-block' : 'none';
        if (inboxBtn)     inboxBtn.style.display     = (isAdmin && isContactPage) ? 'inline-block' : 'none';

    } else {
        clearTimeout(sessionTimer);
        localStorage.removeItem(LOGIN_TIME_KEY);

        if (userProfileBtn) {
            userProfileBtn.style.color = 'rgba(255,255,255,0.8)';
            userProfileBtn.title       = '로그인';
            userProfileBtn.href        = '/login/';
            userProfileBtn.onclick     = null;
        }

        if (adminEditBtn) adminEditBtn.style.display = 'none';
        if (inboxBtn)     inboxBtn.style.display     = 'none';
    }
});