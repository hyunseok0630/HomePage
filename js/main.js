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

    // 언어 전환 기능
    const languageSelector = document.querySelector('.language-selector');
    if (languageSelector) {
        const languageLinks = languageSelector.querySelectorAll('a');
        
        // 언어 데이터 - 실제 프로젝트에서는 더 많은 텍스트가 포함될 수 있습니다
        const translations = {
            'kr': {
                // 공통 네비게이션
                'home': '홈',
                'about': '회사소개',
                'services': '서비스',
                'portfolio': '포트폴리오',
                'contact': '문의하기',
                
                // 인덱스 페이지
                'hero_title': '세상의 혁신을 가장 먼저, <br>당신의 일상으로',
                'hero_desc': '최신 AR 글래스부터 프리미엄 생활가전까지, 전 세계에서 엄선한 혁신 제품을 믿을 수 있는 품질과 합리적인 가격으로 제공합니다',
                'cta_button': '문의하기',
                'features_title': '주요 서비스',
                'global_sourcing': '글로벌 소싱',
                'product_distribution': '제품 유통',
                'brand_marketing': '브랜드 마케팅',
                'customer_support': '고객 지원',
                'about_title': '회사 소개',
                'learn_more': '더 알아보기',
                'testimonials': '고객 후기',
                'cta_heading': '함께 성장할 준비가 되셨나요?',
                'cta_text': '지금 바로 문의하시고 비즈니스 성장의 기회를 잡으세요.',
                'footer_slogan': '혁신적인 솔루션으로 비즈니스의 성공을 돕습니다',
                'shortcuts': '바로가기',
                'contact_info': '연락처',
                'social_media': '소셜 미디어',
                'copyright': '© 2025 SKY Commerce. All Rights Reserved.',
                
                // 회사소개 페이지
                'about_page_title': '회사소개',
                'who_we_are': '우리는 누구인가요?',
                'mission': '미션',
                'vision': '비전',
                'company_history': '회사 연혁',
                
                // 서비스 페이지
                'services_page_title': '서비스',
                'our_services': '우리의 전문 서비스',
                
                // 포트폴리오 페이지
                'portfolio_page_title': '포트폴리오',
                'our_projects': '우리의 프로젝트',
                'all': '전체',
                'view_details': '자세히 보기',
                
                // 문의하기 페이지
                'contact_page_title': '문의하기',
                'contact_information': '연락처 정보',
                'address': '주소',
                'phone': '전화',
                'email': '이메일',
                'send_message': '메시지 보내기',
                'your_name': '이름',
                'your_email': '이메일',
                'subject': '제목',
                'message': '메시지',
                'send': '보내기'
            },
            'en': {
                // 공통 네비게이션
                'home': 'Home',
                'about': 'About Us',
                'services': 'Services',
                'portfolio': 'Portfolio',
                'contact': 'Contact',
                
                // 인덱스 페이지
                'hero_title': 'Bringing Innovation to Your Daily Life',
                'hero_desc': 'From the latest AR glasses to premium home appliances, we provide innovative products from around the world with reliable quality and reasonable prices.',
                'cta_button': 'Contact Us',
                'features_title': 'Our Services',
                'global_sourcing': 'Global Sourcing',
                'product_distribution': 'Product Distribution',
                'brand_marketing': 'Brand Marketing',
                'customer_support': 'Customer Support',
                'about_title': 'About Us',
                'learn_more': 'Learn More',
                'testimonials': 'Testimonials',
                'cta_heading': 'Ready to Grow Together?',
                'cta_text': 'Contact us now and seize the opportunity for business growth.',
                'footer_slogan': 'Helping your business succeed with innovative solutions',
                'shortcuts': 'Quick Links',
                'contact_info': 'Contact Info',
                'social_media': 'Social Media',
                'copyright': '© 2025 SKY Commerce. All Rights Reserved.',
                
                // 회사소개 페이지
                'about_page_title': 'About Us',
                'who_we_are': 'Who We Are',
                'mission': 'Mission',
                'vision': 'Vision',
                'company_history': 'Company History',
                
                // 서비스 페이지
                'services_page_title': 'Services',
                'our_services': 'Our Professional Services',
                
                // 포트폴리오 페이지
                'portfolio_page_title': 'Portfolio',
                'our_projects': 'Our Projects',
                'all': 'All',
                'view_details': 'View Details',
                
                // 문의하기 페이지
                'contact_page_title': 'Contact Us',
                'contact_information': 'Contact Information',
                'address': 'Address',
                'phone': 'Phone',
                'email': 'Email',
                'send_message': 'Send Message',
                'your_name': 'Your Name',
                'your_email': 'Your Email',
                'subject': 'Subject',
                'message': 'Message',
                'send': 'Send'
            }
        };
        
        // 현재 언어 설정 (기본값: 한국어)
        let currentLang = 'kr';
        
        // 언어 변경 함수
        function changeLanguage(lang) {
            currentLang = lang;
            
            // 활성 언어 표시 업데이트
            languageLinks.forEach(link => {
                if (link.getAttribute('data-lang') === lang) {
                    link.classList.add('active');
                } else {
                    link.classList.remove('active');
                }
            });
            
            // 네비게이션 메뉴 업데이트
            const navItems = document.querySelectorAll('nav ul li a');
            navItems.forEach((item, index) => {
                const keys = ['home', 'about', 'services', 'portfolio', 'contact'];
                if (index < keys.length) {
                    item.textContent = translations[lang][keys[index]];
                }
            });
            
            // 현재 페이지 확인
            const currentPage = window.location.pathname.split('/').pop();
            
            // 페이지별 번역 적용
            if (currentPage === '' || currentPage === 'index.html') {
                // 인덱스 페이지 번역
                translateIndexPage(lang);
            } else if (currentPage === 'about.html') {
                // 회사소개 페이지 번역
                translateAboutPage(lang);
            } else if (currentPage === 'services.html') {
                // 서비스 페이지 번역
                translateServicesPage(lang);
            } else if (currentPage === 'portfolio.html') {
                // 포트폴리오 페이지 번역
                translatePortfolioPage(lang);
            } else if (currentPage === 'contact.html') {
                // 문의하기 페이지 번역
                translateContactPage(lang);
            }
            
            // 공통 푸터 번역
            translateFooter(lang);
            
            // 로컬 스토리지에 언어 설정 저장
            localStorage.setItem('preferredLanguage', lang);
        }
        
        // 인덱스 페이지 번역 함수
        function translateIndexPage(lang) {
            const heroTitle = document.querySelector('.hero h1');
            const heroDesc = document.querySelector('.hero p');
            const heroBtn = document.querySelector('.hero .btn');
            
            if (heroTitle) heroTitle.innerHTML = translations[lang]['hero_title'];
            if (heroDesc) heroDesc.textContent = translations[lang]['hero_desc'];
            if (heroBtn) heroBtn.textContent = translations[lang]['cta_button'];
            
            // 기타 섹션 업데이트
            const featuresTitle = document.querySelector('.features .section-title');
            if (featuresTitle) featuresTitle.textContent = translations[lang]['features_title'];
            
            // 특징 항목 업데이트
            const featureTitles = document.querySelectorAll('.feature-item h3');
            const featureKeys = ['global_sourcing', 'product_distribution', 'brand_marketing', 'customer_support'];
            
            featureTitles.forEach((title, index) => {
                if (index < featureKeys.length) {
                    title.textContent = translations[lang][featureKeys[index]];
                }
            });
            
            // 회사 소개 미리보기 섹션
            const aboutTitle = document.querySelector('.about-preview .section-title');
            const aboutBtn = document.querySelector('.about-preview .btn');
            
            if (aboutTitle) aboutTitle.textContent = translations[lang]['about_title'];
            if (aboutBtn) aboutBtn.textContent = translations[lang]['learn_more'];
            
            // 고객 후기 섹션
            const testimonialTitle = document.querySelector('.testimonials .section-title');
            if (testimonialTitle) testimonialTitle.textContent = translations[lang]['testimonials'];
            
            // CTA 섹션
            const ctaHeading = document.querySelector('.cta h2');
            const ctaText = document.querySelector('.cta p');
            const ctaBtn = document.querySelector('.cta .btn');
            
            if (ctaHeading) ctaHeading.textContent = translations[lang]['cta_heading'];
            if (ctaText) ctaText.textContent = translations[lang]['cta_text'];
            if (ctaBtn) ctaBtn.textContent = translations[lang]['cta_button'];
        }
        
        // 회사소개 페이지 번역 함수
        function translateAboutPage(lang) {
            // 페이지 헤더 제목
            const pageTitle = document.querySelector('.page-header h1');
            if (pageTitle) pageTitle.textContent = translations[lang]['about_page_title'];
            
            // 섹션 제목들
            const sectionTitles = document.querySelectorAll('.section-title');
            if (sectionTitles.length > 0) {
                if (sectionTitles[0]) sectionTitles[0].textContent = translations[lang]['who_we_are'];
                if (sectionTitles.length > 1 && sectionTitles[1]) sectionTitles[1].textContent = translations[lang]['company_history'];
            }
            
            // 미션과 비전 제목
            const missionTitle = document.querySelector('.mission-box h3');
            const visionTitle = document.querySelector('.vision-box h3');
            
            if (missionTitle) {
                const missionIcon = missionTitle.querySelector('i');
                missionTitle.innerHTML = '';
                if (missionIcon) missionTitle.appendChild(missionIcon);
                missionTitle.innerHTML += ' ' + translations[lang]['mission'];
            }
            
            if (visionTitle) {
                const visionIcon = visionTitle.querySelector('i');
                visionTitle.innerHTML = '';
                if (visionIcon) visionTitle.appendChild(visionIcon);
                visionTitle.innerHTML += ' ' + translations[lang]['vision'];
            }
        }
        
        // 서비스 페이지 번역 함수
        function translateServicesPage(lang) {
            // 페이지 헤더 제목
            const pageTitle = document.querySelector('.page-header h1');
            if (pageTitle) pageTitle.textContent = translations[lang]['services_page_title'];
            
            // 섹션 제목
            const sectionTitle = document.querySelector('.section-title');
            if (sectionTitle) sectionTitle.textContent = translations[lang]['our_services'];
            
            // 서비스 항목 제목
            const serviceTitles = document.querySelectorAll('.service-content h3');
            const serviceKeys = ['global_sourcing', 'product_distribution', 'brand_marketing', 'customer_support'];
            
            serviceTitles.forEach((title, index) => {
                if (index < serviceKeys.length) {
                    title.textContent = translations[lang][serviceKeys[index]];
                }
            });
        }
        
        // 포트폴리오 페이지 번역 함수
        function translatePortfolioPage(lang) {
            // 페이지 헤더 제목
            const pageTitle = document.querySelector('.page-header h1');
            if (pageTitle) pageTitle.textContent = translations[lang]['portfolio_page_title'];
            
            // 섹션 제목
            const sectionTitle = document.querySelector('.section-title');
            if (sectionTitle) sectionTitle.textContent = translations[lang]['our_projects'];
            
            // 필터 버튼
            const filterBtns = document.querySelectorAll('.filter-btn');
            const filterKeys = ['all', 'global_sourcing', 'product_distribution', 'brand_marketing', 'customer_support'];
            
            filterBtns.forEach((btn, index) => {
                if (index < filterKeys.length) {
                    btn.textContent = translations[lang][filterKeys[index]];
                }
            });
            
            // 포트폴리오 항목 링크
            const portfolioLinks = document.querySelectorAll('.portfolio-link');
            portfolioLinks.forEach(link => {
                link.textContent = translations[lang]['view_details'];
            });
        }
        
        // 문의하기 페이지 번역 함수
        function translateContactPage(lang) {
            // 페이지 헤더 제목
            const pageTitle = document.querySelector('.page-header h1');
            if (pageTitle) pageTitle.textContent = translations[lang]['contact_page_title'];
            
            // 연락처 정보 제목
            const contactInfoTitle = document.querySelector('.contact-info h3');
            if (contactInfoTitle) contactInfoTitle.textContent = translations[lang]['contact_information'];
            
            // 연락처 항목 제목
            const contactItemTitles = document.querySelectorAll('.contact-item-content h4');
            const contactKeys = ['address', 'phone', 'email'];
            
            contactItemTitles.forEach((title, index) => {
                if (index < contactKeys.length) {
                    title.textContent = translations[lang][contactKeys[index]];
                }
            });
            
            // 메시지 폼 제목 및 필드
            const formTitle = document.querySelector('.contact-form h3');
            if (formTitle) formTitle.textContent = translations[lang]['send_message'];
            
            const nameLabel = document.querySelector('label[for="name"]');
            const emailLabel = document.querySelector('label[for="email"]');
            const subjectLabel = document.querySelector('label[for="subject"]');
            const messageLabel = document.querySelector('label[for="message"]');
            const submitBtn = document.querySelector('.contact-form button[type="submit"]');
            
            if (nameLabel) nameLabel.textContent = translations[lang]['your_name'];
            if (emailLabel) emailLabel.textContent = translations[lang]['your_email'];
            if (subjectLabel) subjectLabel.textContent = translations[lang]['subject'];
            if (messageLabel) messageLabel.textContent = translations[lang]['message'];
            if (submitBtn) submitBtn.textContent = translations[lang]['send'];
        }
        
        // 공통 푸터 번역 함수
        function translateFooter(lang) {
            // 푸터 슬로건
            const footerSlogan = document.querySelector('.footer-logo p');
            if (footerSlogan) footerSlogan.textContent = translations[lang]['footer_slogan'];
            
            // 푸터 섹션 제목
            const footerTitles = document.querySelectorAll('.footer-content h4');
            const footerKeys = ['shortcuts', 'contact_info', 'social_media'];
            
            footerTitles.forEach((title, index) => {
                if (index < footerKeys.length) {
                    title.textContent = translations[lang][footerKeys[index]];
                }
            });
            
            // 푸터 링크
            const footerLinks = document.querySelectorAll('.footer-links ul li a');
            const linkKeys = ['home', 'about', 'services', 'portfolio', 'contact'];
            
            footerLinks.forEach((link, index) => {
                if (index < linkKeys.length) {
                    link.textContent = translations[lang][linkKeys[index]];
                }
            });
        }
        
        // 언어 선택 이벤트 리스너
        languageLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const lang = this.getAttribute('data-lang');
                changeLanguage(lang);
            });
        });
        
        // 저장된 언어 설정 불러오기
        const savedLang = localStorage.getItem('preferredLanguage');
        if (savedLang && (savedLang === 'kr' || savedLang === 'en')) {
            changeLanguage(savedLang);
        }
    }

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