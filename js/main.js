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
        const header = document.querySelector('header');
        const nav = document.querySelector('nav');
        
        // 모바일 메뉴 버튼 생성
        const mobileMenuBtn = document.createElement('div');
        mobileMenuBtn.className = 'mobile-menu-btn';
        mobileMenuBtn.innerHTML = '<span></span><span></span><span></span>';
        header.querySelector('.container').insertBefore(mobileMenuBtn, nav);
        
        // 모바일 메뉴 토글 이벤트
        mobileMenuBtn.addEventListener('click', function() {
            this.classList.toggle('active');
            nav.classList.toggle('active');
        });

        // 모바일 메뉴 스타일 추가
        const style = document.createElement('style');
        style.textContent = `
            @media (max-width: 768px) {
                nav {
                    display: none;
                    width: 100%;
                }
                nav.active {
                    display: block;
                }
                nav ul {
                    flex-direction: column;
                    align-items: center;
                }
                nav ul li {
                    margin: 10px 0;
                }
                .mobile-menu-btn {
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    width: 30px;
                    height: 20px;
                    cursor: pointer;
                }
                .mobile-menu-btn span {
                    display: block;
                    width: 100%;
                    height: 2px;
                    background-color: #4e73df;
                    transition: all 0.3s ease;
                }
                .mobile-menu-btn.active span:nth-child(1) {
                    transform: translateY(9px) rotate(45deg);
                }
                .mobile-menu-btn.active span:nth-child(2) {
                    opacity: 0;
                }
                .mobile-menu-btn.active span:nth-child(3) {
                    transform: translateY(-9px) rotate(-45deg);
                }
            }
            @media (min-width: 769px) {
                .mobile-menu-btn {
                    display: none;
                }
            }
        `;
        document.head.appendChild(style);
    };

    // 화면 크기에 따라 모바일 메뉴 생성
    if (window.innerWidth <= 768) {
        createMobileMenu();
    }

    window.addEventListener('resize', function() {
        if (window.innerWidth <= 768 && !document.querySelector('.mobile-menu-btn')) {
            createMobileMenu();
        }
    });

    // 스크롤 애니메이션
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.feature-item, .about-content, .about-image, .testimonial-item');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        elements.forEach(element => {
            observer.observe(element);
        });

        // 애니메이션 스타일 추가
        const style = document.createElement('style');
        style.textContent = `
            .feature-item, .about-content, .about-image, .testimonial-item {
                opacity: 0;
                transform: translateY(30px);
                transition: opacity 0.6s ease, transform 0.6s ease;
            }
            .feature-item.animate, .about-content.animate, .about-image.animate, .testimonial-item.animate {
                opacity: 1;
                transform: translateY(0);
            }
            .feature-item:nth-child(2) {
                transition-delay: 0.2s;
            }
            .feature-item:nth-child(3) {
                transition-delay: 0.4s;
            }
            .feature-item:nth-child(4) {
                transition-delay: 0.6s;
            }
        `;
        document.head.appendChild(style);
    };

    animateOnScroll();

    // 부드러운 스크롤 기능
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
});