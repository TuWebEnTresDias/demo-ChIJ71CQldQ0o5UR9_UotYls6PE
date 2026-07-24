/* ===========================
   PRIDE CAFE - JavaScript
   Interactividad y animaciones
   =========================== */

document.addEventListener('DOMContentLoaded', function() {
    // ===========================
    // HEADER SCROLL EFFECT
    // ===========================
    const header = document.getElementById('header');
    let lastScroll = 0;
    
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 50) {
            header.classList.add('header--scrolled');
        } else {
            header.classList.remove('header--scrolled');
        }
        
        lastScroll = currentScroll;
    });
    
    // ===========================
    // MOBILE MENU
    // ===========================
    const hamburger = document.getElementById('hamburger');
    const mainNav = document.getElementById('mainNav');
    
    if (hamburger && mainNav) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('header__hamburger--active');
            mainNav.classList.toggle('header__nav--active');
            document.body.style.overflow = mainNav.classList.contains('header__nav--active') ? 'hidden' : '';
        });
        
        // Cerrar menú al hacer clic en un enlace
        const navLinks = mainNav.querySelectorAll('.header__nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('header__hamburger--active');
                mainNav.classList.remove('header__nav--active');
                document.body.style.overflow = '';
            });
        });
    }
    
    // ===========================
    // MENU TABS
    // ===========================
    const menuTabs = document.querySelectorAll('.menu__tab');
    const menuCategories = document.querySelectorAll('.menu__category');
    
    menuTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const targetId = this.getAttribute('data-tab');
            
            // Remover clase activa de todos los tabs y categorías
            menuTabs.forEach(t => t.classList.remove('menu__tab--active'));
            menuCategories.forEach(c => c.classList.remove('menu__category--active'));
            
            // Agregar clase activa al tab clickeado y su categoría
            this.classList.add('menu__tab--active');
            const targetCategory = document.getElementById(targetId);
            if (targetCategory) {
                targetCategory.classList.add('menu__category--active');
            }
        });
    });
    
    // ===========================
    // SCROLL ANIMATIONS (Intersection Observer)
    // ===========================
    const animateElements = document.querySelectorAll('[data-animate]');
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                observer.unobserve(entry.target);
            }
        });
    };
    
    const observer = new IntersectionObserver(observerCallback, observerOptions);
    
    animateElements.forEach(element => {
        observer.observe(element);
    });
    
    // ===========================
    // SMOOTH SCROLL FOR ANCHOR LINKS
    // ===========================
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = header.offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // ===========================
    // WHATSAPP FORM SUBMISSION
    // ===========================
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name').value;
            const phone = document.getElementById('phone').value;
            const message = document.getElementById('message').value;
            const details = document.getElementById('details').value;
            
            // Mapear valores del select a mensajes legibles
            const messageMap = {
                'reserva': 'Reservar mesa',
                'pedido': 'Pedido para llevar',
                'consulta': 'Consulta general',
                'evento': 'Organizar un evento',
                'otro': 'Otra consulta'
            };
            
            const messageText = messageMap[message] || message;
            
            // Construir mensaje de WhatsApp
            let whatsappMessage = `Hola Pride Cafe! Soy ${name}.\n`;
            whatsappMessage += `Mi consulta es sobre: ${messageText}.\n`;
            
            if (details) {
                whatsappMessage += `Detalles: ${details}\n`;
            }
            
            whatsappMessage += `Mi número de contacto: ${phone}`;
            
            // Codificar el mensaje para URL
            const encodedMessage = encodeURIComponent(whatsappMessage);
            
            // Redirigir a WhatsApp
            const whatsappUrl = `https://wa.me/5491144442959?text=${encodedMessage}`;
            window.open(whatsappUrl, '_blank');
            
            // Resetear formulario
            contactForm.reset();
        });
    }
    
    // ===========================
    // GALLERY HOVER EFFECT
    // ===========================
    const galleryItems = document.querySelectorAll('.gallery__item');
    
    galleryItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.zIndex = '10';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.zIndex = '';
        });
    });
    
    // ===========================
    // WHATSAPP FLOAT ANIMATION ON LOAD
    // ===========================
    const whatsappFloat = document.getElementById('whatsappFloat');
    
    if (whatsappFloat) {
        // Animación de entrada después de 2 segundos
        setTimeout(() => {
            whatsappFloat.style.opacity = '1';
            whatsappFloat.style.transform = 'scale(1)';
        }, 2000);
    }
    
    // ===========================
    // ACTIVE NAV LINK ON SCROLL
    // ===========================
    const sections = document.querySelectorAll('section[id]');
    
    function updateActiveNavLink() {
        const scrollPosition = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                // Remover clase activa de todos los enlaces
                document.querySelectorAll('.header__nav-link').forEach(link => {
                    link.classList.remove('header__nav-link--active');
                });
                
                // Agregar clase activa al enlace correspondiente
                const activeLink = document.querySelector(`.header__nav-link[href="#${sectionId}"]`);
                if (activeLink) {
                    activeLink.classList.add('header__nav-link--active');
                }
            }
        });
    }
    
    window.addEventListener('scroll', updateActiveNavLink);
    
    // ===========================
    // PARALLAX EFFECT ON HERO (subtle)
    // ===========================
    const heroImg = document.querySelector('.hero__bg-img');
    
    if (heroImg) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const rate = scrolled * 0.3;
            
            if (scrolled < window.innerHeight) {
                heroImg.style.transform = `scale(1.05) translateY(${rate}px)`;
            }
        });
    }
    
    // ===========================
    // MENU ITEMS STAGGER ANIMATION
    // ===========================
    function staggerMenuItems() {
        const activeCategory = document.querySelector('.menu__category--active');
        if (activeCategory) {
            const items = activeCategory.querySelectorAll('.menu__item');
            items.forEach((item, index) => {
                item.style.animationDelay = `${index * 0.1}s`;
            });
        }
    }
    
    // Ejecutar cuando cambie el tab
    menuTabs.forEach(tab => {
        tab.addEventListener('click', staggerMenuItems);
    });
    
    // ===========================
    // TESTIMONIALS AUTO-ROTATE (optional enhancement)
    // ===========================
    let currentTestimonial = 0;
    const testimonials = document.querySelectorAll('.testimonial');
    
    function rotateTestimonials() {
        if (window.innerWidth < 768 && testimonials.length > 0) {
            testimonials.forEach((t, i) => {
                if (i === currentTestimonial) {
                    t.style.opacity = '1';
                    t.style.transform = 'translateX(0)';
                } else {
                    t.style.opacity = '0.5';
                    t.style.transform = 'translateX(-20px)';
                }
            });
            
            currentTestimonial = (currentTestimonial + 1) % testimonials.length;
        }
    }
    
    // Auto-rotate every 5 seconds on mobile
    if (window.innerWidth < 768) {
        setInterval(rotateTestimonials, 5000);
    }
    
    // ===========================
    // LOADING ANIMATION
    // ===========================
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
        
        // Trigger initial animations
        setTimeout(() => {
            const heroContent = document.querySelector('.hero__content');
            if (heroContent) {
                heroContent.style.opacity = '1';
                heroContent.style.transform = 'translateY(0)';
            }
        }, 100);
    });
    
    console.log('🌈 Pride Cafe landing page loaded successfully!');
});