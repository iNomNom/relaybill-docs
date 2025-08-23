const theme = {
    init() {
        const savedTheme = localStorage.getItem('relaybill-theme');
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const initialTheme = savedTheme || (systemPrefersDark ? 'dark' : 'light');
        this.setTheme(initialTheme);
        this.bindEvents();
    },
    setTheme(newTheme) {
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('relaybill-theme', newTheme);
        const themeToggle = document.getElementById('theme-toggle');
        if (themeToggle) {
            const icon = themeToggle.querySelector('.material-symbols-rounded');
            if (icon) {
                icon.textContent = newTheme === 'dark' ? 'dark_mode' : 'light_mode';
            }
        }
        window.dispatchEvent(new CustomEvent('themeChanged', { detail: { theme: newTheme } }));
    },
    toggle() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        this.setTheme(newTheme);
    },
    bindEvents() {
        document.addEventListener('click', (e) => {
            if (e.target.closest('#theme-toggle')) {
                this.toggle();
            }
        });
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
            if (!localStorage.getItem('relaybill-theme')) {
                this.setTheme(e.matches ? 'dark' : 'light');
            }
        });
    }
};
const pageManager = {
    init() {
        this.renderHeader();
        this.renderFooter();
        this.bindGlobalEvents();
        this.initScrollSpy();
    },
    renderHeader() {
        const headerContainer = document.getElementById('header-container');
        if (headerContainer) {
            const header = ui.createHeader();
            headerContainer.appendChild(header);
        }
    },
    renderFooter() {
        const footerContainer = document.getElementById('footer-container');
        if (footerContainer) {
            const footer = ui.createFooter();
            footerContainer.appendChild(footer);
        }
    },
    bindGlobalEvents() {
        document.addEventListener('click', (e) => {
            const link = e.target.closest('a[href^="#"]');
            if (link) {
                e.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
        document.addEventListener('click', (e) => {
            const button = e.target.closest('.btn');
            if (button && button.href && !button.href.startsWith('#')) {
                button.style.opacity = '0.7';
                button.style.pointerEvents = 'none';
                setTimeout(() => {
                    button.style.opacity = '';
                    button.style.pointerEvents = '';
                }, 2000);
            }
        });
    },
    initScrollSpy() {
        const navLinks = document.querySelectorAll('.nav-link');
        const sections = document.querySelectorAll('.page-section');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.getAttribute('id');
                    navLinks.forEach(link => {
                        link.removeAttribute('aria-current');
                        if (link.getAttribute('href') === `#${id}`) {
                            link.setAttribute('aria-current', 'page');
                        }
                    });
                }
            });
        }, { rootMargin: "-40% 0px -60% 0px" }); 
        sections.forEach(section => observer.observe(section));
    }
};
const utils = {
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },
    throttle(func, limit) {
        let inThrottle;
        return function () {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    },
    toTitleCase(str) {
        return str.replace(/\w\S*/g, (txt) => {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        });
    },
    createElement(tag, attributes = {}, innerHTML = '') {
        const element = document.createElement(tag);
        Object.entries(attributes).forEach(([key, value]) => {
            element.setAttribute(key, value);
        });
        if (innerHTML) {
            element.innerHTML = innerHTML;
        }
        return element;
    },
    showNotification(message, type = 'info', duration = 3000) {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.style.cssText = `
                    position: fixed;
                    top: 20px;
                    right: 20px;
                    background: var(--surface);
                    color: var(--on-surface);
                    padding: 1rem 1.5rem;
                    border-radius: 12px;
                    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
                    border-left: 4px solid var(--${type === 'error' ? 'error' : type === 'success' ? 'success' : 'primary'});
                    z-index: 1000;
                    transform: translateX(100%);
                    transition: transform 0.3s ease;
                `;
        notification.textContent = message;
        document.body.appendChild(notification);
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 10);
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, duration);
    }
};
const search = {
    init() {
        this.createSearchOverlay();
        this.bindEvents();
    },
    createSearchOverlay() {
        const overlay = document.createElement('div');
        overlay.id = 'search-overlay';
        overlay.style.cssText = `
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: rgba(0,0,0,0.5);
                    backdrop-filter: blur(4px);
                    z-index: 1000;
                    display: none;
                    align-items: flex-start;
                    justify-content: center;
                    padding-top: 10vh;
                `;
        overlay.innerHTML = `
                    <div style="
                        background: var(--surface);
                        border-radius: 16px;
                        padding: 2rem;
                        width: 90%;
                        max-width: 600px;
                        box-shadow: 0 8px 32px rgba(0,0,0,0.2);
                    ">
                        <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 1.5rem;">
                            <span class="material-symbols-rounded" style="color: var(--primary);">search</span>
                            <input type="text" id="search-input" placeholder="Search documentation..." style="
                                flex: 1;
                                border: none;
                                outline: none;
                                font-size: 1.125rem;
                                background: transparent;
                                color: var(--on-surface);
                            ">
                            <button id="search-close" style="
                                background: none;
                                border: none;
                                color: var(--on-surface-variant);
                                cursor: pointer;
                                padding: 0.5rem;
                                border-radius: 50%;
                            ">
                                <span class="material-symbols-rounded">close</span>
                            </button>
                        </div>
                        <div id="search-results"></div>
                    </div>
                `;
        document.body.appendChild(overlay);
    },
    bindEvents() {
        document.addEventListener('keydown', (e) => {
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault();
                this.show();
            }
            if (e.key === 'Escape') {
                this.hide();
            }
        });
        const overlay = document.getElementById('search-overlay');
        const searchInput = document.getElementById('search-input');
        const searchClose = document.getElementById('search-close');
        if (overlay && searchInput && searchClose) {
            overlay.addEventListener('click', (e) => {
                if (e.target === overlay) {
                    this.hide();
                }
            });
            searchClose.addEventListener('click', () => {
                this.hide();
            });
            searchInput.addEventListener('input', utils.debounce((e) => {
                this.performSearch(e.target.value);
            }, 300));
        }
    },
    show() {
        const overlay = document.getElementById('search-overlay');
        const searchInput = document.getElementById('search-input');
        if (overlay && searchInput) {
            overlay.style.display = 'flex';
            searchInput.focus();
        }
    },
    hide() {
        const overlay = document.getElementById('search-overlay');
        if (overlay) {
            overlay.style.display = 'none';
        }
    },
    performSearch(query) {
        const resultsContainer = document.getElementById('search-results');
        if (!resultsContainer || !query.trim()) {
            resultsContainer.innerHTML = '';
            return;
        }
        const mockResults = [
            { title: 'Getting Started with RelayBill', url: '#getting-started', excerpt: 'Learn how to set up and configure RelayBill for automated SMS reminders.' },
            { title: 'Customer Management', url: '#features', excerpt: 'Manage your customer database and track service expiration dates.' },
            { title: 'SMS Reminder Logic', url: '#reminder-logic', excerpt: 'Understand how the automated reminder system works.' },
            { title: 'Troubleshooting Common Issues', url: '#troubleshooting', excerpt: 'Solutions for common problems and error messages.' }
        ];
        const filteredResults = mockResults.filter(result =>
            result.title.toLowerCase().includes(query.toLowerCase()) ||
            result.excerpt.toLowerCase().includes(query.toLowerCase())
        );
        resultsContainer.innerHTML = filteredResults.map(result => `
                    <a href="${result.url}" style="
                        display: block;
                        padding: 1rem;
                        border-radius: 8px;
                        text-decoration: none;
                        color: var(--on-surface);
                        transition: background-color 0.2s ease;
                        margin-bottom: 0.5rem;
                    " onmouseover="this.style.backgroundColor='var(--surface-variant)'" onmouseout="this.style.backgroundColor='transparent'">
                        <h4 style="margin: 0 0 0.5rem 0; color: var(--primary);">${result.title}</h4>
                        <p style="margin: 0; font-size: 0.875rem; color: var(--on-surface-variant);">${result.excerpt}</p>
                    </a>
                `).join('');
        if (filteredResults.length === 0) {
            resultsContainer.innerHTML = '<p style="text-align: center; color: var(--on-surface-variant); padding: 2rem;">No results found</p>';
        }
    }
};
const performanceMonitor = {
    init() {
        this.measurePageLoad();
        this.observeInteractions();
    },
    measurePageLoad() {
        window.addEventListener('load', () => {
            const loadTime = window.performance.now();
            console.log(`Page loaded in ${Math.round(loadTime)}ms`);
        });
    },
    observeInteractions() {
        document.addEventListener('click', (e) => {
            const button = e.target.closest('.btn');
            if (button) {
                console.log('Button clicked:', button.textContent.trim());
            }
        });
        document.addEventListener('click', (e) => {
            const link = e.target.closest('a[href]');
            if (link && !link.href.startsWith('#')) {
                console.log('Navigation to:', link.href);
            }
        });
    }
};
const app = {
    init() {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.start());
        } else {
            this.start();
        }
    },
    start() {
        theme.init();
        pageManager.init();
        ui.init();
        search.init();
        performanceMonitor.init();
        window.addEventListener('error', (e) => {
            console.error('Global error:', e.error);
            utils.showNotification('An error occurred. Please refresh the page.', 'error');
        });
        window.addEventListener('unhandledrejection', (e) => {
            console.error('Unhandled promise rejection:', e.reason);
            utils.showNotification('An error occurred. Please refresh the page.', 'error');
        });
        console.log('RelayBill Documentation App initialized');
    }
};
app.init();