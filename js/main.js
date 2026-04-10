document.addEventListener('DOMContentLoaded', () => {
    // 1. Loader
    const loader = document.getElementById('loader');
    if (loader) {
        setTimeout(() => {
            document.body.classList.add('loaded');
        }, 500); // Visually pleasing delay
    }

    // 2. Theme and RTL Toggle
    const themeToggleBtns = document.querySelectorAll('.theme-toggle-btn');
    const rtlToggleBtn = document.getElementById('rtl-toggle');
    const mobRtlToggleBtn = document.getElementById('mob-rtl-toggle');

    // Theme logic
    const currentTheme = localStorage.getItem('theme') || 'light';
    if (currentTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
        themeToggleBtns.forEach(btn => btn.innerHTML = '<i class="bi bi-sun"></i>');
    }

    // RTL Logic
    const currentRtl = localStorage.getItem('rtl') === 'true';
    if (currentRtl) {
        document.documentElement.setAttribute('dir', 'rtl');
    }

    const toggleRtl = () => {
        const html = document.documentElement;
        const isRtl = html.getAttribute('dir') === 'rtl';
        if (isRtl) {
            html.removeAttribute('dir');
            localStorage.setItem('rtl', 'false');
        } else {
            html.setAttribute('dir', 'rtl');
            localStorage.setItem('rtl', 'true');
        }
    };
    if (rtlToggleBtn) rtlToggleBtn.addEventListener('click', toggleRtl);
    if (mobRtlToggleBtn) mobRtlToggleBtn.addEventListener('click', toggleRtl);

    themeToggleBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
            if (isDark) {
                document.documentElement.setAttribute('data-theme', 'light');
                localStorage.setItem('theme', 'light');
                themeToggleBtns.forEach(b => b.innerHTML = '<i class="bi bi-moon"></i>');
            } else {
                document.documentElement.setAttribute('data-theme', 'dark');
                localStorage.setItem('theme', 'dark');
                themeToggleBtns.forEach(b => b.innerHTML = '<i class="bi bi-sun"></i>');
            }
        });
    });

    // 3. Sticky Header
    const header = document.querySelector('.site-header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    // 4. Scroll Animations (Intersection Observer)
    const animateElements = document.querySelectorAll('.animate-up, .animate-fade');
    if (animateElements.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

        animateElements.forEach(el => observer.observe(el));
    }

    // 5. Active Navigation Highlighting
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link, .dropdown-item');
    const path = window.location.pathname;
    const page = path.split('/').pop() || 'index.html';

    navLinks.forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href');
        if (href === page || (page === '' && href === 'index.html')) {
            link.classList.add('active');
            if (link.classList.contains('dropdown-item')) {
                const dropdownToggle = link.closest('.dropdown').querySelector('.dropdown-toggle');
                if (dropdownToggle) dropdownToggle.classList.add('active');
            }
        }
    });

    // 6. Back to Top Button
    const backToTop = document.getElementById('backToTop');
    if (backToTop) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        });

        backToTop.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // 7. Counters Animation
    const counters = document.querySelectorAll('.counter-val');
    if (counters.length > 0) {
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = parseInt(entry.target.getAttribute('data-target'));
                    let count = 0;
                    const duration = 2000;
                    const increment = target / (duration / 16); // 60fps

                    const updateCounter = () => {
                        count += increment;
                        if (count < target) {
                            entry.target.innerText = Math.ceil(count);
                            requestAnimationFrame(updateCounter);
                        } else {
                            entry.target.innerText = target;
                        }
                    };
                    updateCounter();
                    counterObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        counters.forEach(counter => counterObserver.observe(counter));
    }
});
