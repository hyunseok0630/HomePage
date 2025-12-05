document.addEventListener('DOMContentLoaded', function() {
    // 스크롤 시 헤더 스타일 변경
    const header = document.querySelector('header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.style.backgroundColor = '#ffffff';
            header.style.boxShadow = '0 4px 10px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.backgroundColor = '#ffffff';
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.05)';
        }
    });

    // 모바일 메뉴 토글 기능
    const createMobileMenu = () => {
        const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
        const mobileMenu = document.querySelector('.mobile-menu');
        const overlay = document.querySelector('.overlay');
        
        if (mobileMenuBtn && mobileMenu && overlay) {
            mobileMenuBtn.addEventListener('click', function() {
                mobileMenu.classList.toggle('active');
                overlay.classList.toggle('active');
                document.body.classList.toggle('menu-open');
            });
            
            overlay.addEventListener('click', function() {
                mobileMenu.classList.remove('active');
                overlay.classList.remove('active');
                document.body.classList.remove('menu-open');
            });
            
            // 모바일 메뉴 내 링크 클릭 시 메뉴 닫기
            const mobileMenuLinks = mobileMenu.querySelectorAll('a');
            mobileMenuLinks.forEach(link => {
                link.addEventListener('click', function() {
                    mobileMenu.classList.remove('active');
                    overlay.classList.remove('active');
                    document.body.classList.remove('menu-open');
                });
            });
        }
    };
    
    createMobileMenu();
    
    // 스크롤 애니메이션
    const scrollToSection = () => {
        const links = document.querySelectorAll('a[href^="#"]');
        
        links.forEach(link => {
            link.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                
                if (href !== '#') {
                    e.preventDefault();
                    const targetSection = document.querySelector(href);
                    
                    if (targetSection) {
                        window.scrollTo({
                            top: targetSection.offsetTop - 80,
                            behavior: 'smooth'
                        });
                    }
                }
            });
        });
    };
    
    scrollToSection();
    
    // 스크롤 시 요소 페이드인 애니메이션
    const fadeInOnScroll = () => {
        const fadeElements = document.querySelectorAll('.fade-in');
        
        const fadeIn = () => {
            fadeElements.forEach(element => {
                const elementTop = element.getBoundingClientRect().top;
                const elementVisible = 150;
                
                if (elementTop < window.innerHeight - elementVisible) {
                    element.classList.add('active');
                }
            });
        };
        
        window.addEventListener('scroll', fadeIn);
        fadeIn(); // 초기 로드 시 실행
    };
    
    fadeInOnScroll();

    const navMenuInit = document.querySelector('.nav-menu');
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (navMenuInit && !isLoggedIn) navMenuInit.style.visibility = 'hidden';
    
    const resetMenuState = () => {
        const navMenuEl = document.querySelector('.nav-menu');
        const hamburgerEl = document.querySelector('.hamburger');
        const overlayEl = document.querySelector('.overlay');
        const mobileMenuEl = document.querySelector('.mobile-menu');
        if (navMenuEl) navMenuEl.classList.remove('active');
        if (hamburgerEl) hamburgerEl.classList.remove('active');
        if (overlayEl) overlayEl.classList.remove('active');
        if (mobileMenuEl) mobileMenuEl.classList.remove('active');
        document.body.classList.remove('menu-open');
    };
    
    resetMenuState();
    window.addEventListener('resize', resetMenuState);
    
    // 로그인 상태 확인 및 메뉴 업데이트
    checkLoginStatus();
    const navMenuShow = document.querySelector('.nav-menu');
    if (navMenuShow) navMenuShow.style.visibility = 'visible';
});

// 모바일 메뉴 토글
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger) {
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
}

// 모바일 메뉴 항목 클릭 시 메뉴 닫기
const navLinks = document.querySelectorAll('.nav-menu a');
navLinks.forEach(link => {
    link.addEventListener('click', function() {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// 스크롤 시 페이드인 애니메이션
function fadeInOnScroll() {
    const elements = document.querySelectorAll('.fade-in');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('active');
        }
    });
}

window.addEventListener('scroll', fadeInOnScroll);
window.addEventListener('load', fadeInOnScroll);

// 로그인 상태 관리 함수
function checkLoginStatus() {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const navMenu = document.querySelector('.nav-menu');

    if (navMenu) {
        // 중복 방지를 위해 기존 항목 모두 제거
        const existingAuthBtns = navMenu.querySelectorAll('.auth-btn-item');
        existingAuthBtns.forEach(btn => btn.remove());

        const loginItem = document.createElement('li');
        loginItem.className = 'auth-btn-item';
        
        if (isLoggedIn) {
            // 로그아웃 버튼
            const logoutLink = document.createElement('a');
            logoutLink.href = "#";
            logoutLink.textContent = "로그아웃";
            logoutLink.style.color = "#e74a3b"; // 로그아웃은 빨간색 계열로 구분
            logoutLink.addEventListener('click', function(e) {
                e.preventDefault();
                if(confirm('로그아웃 하시겠습니까?')) {
                    localStorage.removeItem('isLoggedIn');
                    localStorage.removeItem('userRole');
                    alert('로그아웃 되었습니다.');
                    window.location.href = 'index.html';
                }
            });
            loginItem.appendChild(logoutLink);
        } else {
            // 로그인 버튼
            const loginLink = document.createElement('a');
            loginLink.href = "login.html";
            loginLink.textContent = "로그인";
            loginItem.appendChild(loginLink);
        }
        navMenu.appendChild(loginItem);
    }
}
