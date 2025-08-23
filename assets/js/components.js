window.ui = {};
ui.createHeader = function () {
    const header = document.createElement('header');
    header.className = 'header';
    header.innerHTML = `
                <div class="container">
                    <div class="header-content">
                        <div class="logo-section">
                            <a href="index.html" style="text-decoration: none;">
                                <img src="assets/img/logo_wide.png" alt="RelayBill" class="logo" onerror="this.style.display='none'; this.nextElementSibling.style.display='block';">
                                <h2 style="display:none; color: var(--primary); margin: 0;">RelayBill</h2>
                            </a>
                        </div>
                        <nav class="nav">
                            <ul class="nav-links">
                                <li><a href="index.html" class="nav-link">Home</a></li>
                                <li><a href="getting-started.html" class="nav-link">Getting Started</a></li>
                                <li><a href="features.html" class="nav-link">Features</a></li>
                                <li><a href="advanced.html" class="nav-link">Advanced</a></li>
                                <li><a href="faq.html" class="nav-link">FAQ</a></li>
                            </ul>
                            <button class="mobile-nav-toggle" aria-label="Toggle navigation">
                                <span class="material-symbols-rounded">menu</span>
                            </button>
                            <button id="theme-toggle" class="theme-toggle" aria-label="Toggle theme">
                                <span class="material-symbols-rounded">light_mode</span>
                            </button>
                        </nav>
                    </div>
                </div>
            `;
    try {
        const current = (window.location.pathname.split('/').pop() || 'index.html').toLowerCase();
        const links = header.querySelectorAll('.nav-link');
        links.forEach(link => {
            const href = (link.getAttribute('href') || '').toLowerCase();
            if (href === current) {
                link.setAttribute('aria-current', 'page');
            }
        });
    } catch (e) {
    }
    return header;
};
ui.createFooter = function () {
    const footer = document.createElement('footer');
    footer.className = 'footer';
    footer.innerHTML = `
                <div class="container">
                    <p>&copy; 2024 RelayBill Documentation. Built with Material Design principles.</p>
                </div>
            `;
    return footer;
};
ui.createSectionHeader = function (title, subtitle, iconName) {
    const section = document.createElement('div');
    section.className = 'section-header';
    section.innerHTML = `
                <div class="icon-box">
                    <span class="material-symbols-rounded">${iconName}</span>
                </div>
                <div class="section-header-content">
                    <h2>${title}</h2>
                    <p>${subtitle}</p>
                </div>
            `;
    return section;
};
ui.createPageHeader = function (title, subtitle, iconName, gradient = 'primary') {
    const header = document.createElement('div');
    header.className = 'page-header';
    const gradientMap = {
        'primary': 'linear-gradient(135deg, var(--primary), var(--tertiary))',
        'secondary': 'linear-gradient(135deg, var(--secondary), var(--primary))',
        'success': 'linear-gradient(135deg, var(--success), var(--secondary))',
        'warning': 'linear-gradient(135deg, var(--warning), var(--primary))'
    };
    header.innerHTML = `
                <div style="background: ${gradientMap[gradient] || gradientMap.primary}; padding: 3rem 2rem; border-radius: 16px; text-align: center; color: white; margin-bottom: 2rem; position: relative; overflow: hidden;">
                    <div style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; background: rgba(255,255,255,0.1); backdrop-filter: blur(10px);"></div>
                    <div style="position: relative; z-index: 1;">
                        <div style="width: 80px; height: 80px; border-radius: 50%; background: rgba(255,255,255,0.2); margin: 0 auto 1.5rem; display: flex; align-items: center; justify-content: center; backdrop-filter: blur(10px);">
                            <span class="material-symbols-rounded" style="font-size: 40px; color: white;">${iconName}</span>
                        </div>
                        <h1 style="margin: 0 0 1rem 0; font-size: 2.5rem; font-weight: 700; text-shadow: 0 2px 4px rgba(0,0,0,0.3);">${title}</h1>
                        <p style="margin: 0; font-size: 1.2rem; opacity: 0.9; max-width: 600px; margin: 0 auto; text-shadow: 0 1px 2px rgba(0,0,0,0.2);">${subtitle}</p>
                    </div>
                </div>
            `;
    return header;
};
ui.createFeatureCard = function (iconName, title, description, link = null) {
    const card = document.createElement('div');
    card.className = 'feature-card fade-in';
    if (link) {
        card.style.cursor = 'pointer';
        card.addEventListener('click', () => {
            window.location.href = link;
        });
    }
    card.innerHTML = `
                <div class="icon-box">
                    <span class="material-symbols-rounded">${iconName}</span>
                </div>
                <h3>${title}</h3>
                <p>${description}</p>
                ${link ? '<div class="card-arrow"><span class="material-symbols-rounded">arrow_forward</span></div>' : ''}
            `;
    return card;
};
ui.createWarningBanner = function (title, message, type = 'warning') {
    const banner = document.createElement('div');
    banner.className = `warning-banner warning-banner-${type}`;
    const iconMap = {
        'warning': 'warning',
        'error': 'error',
        'info': 'info',
        'success': 'check_circle'
    };
    banner.innerHTML = `
                <div class="warning-banner-icon">
                    <span class="material-symbols-rounded">${iconMap[type] || 'info'}</span>
                </div>
                <div class="warning-banner-content">
                    <h4>${title}</h4>
                    <div>${message}</div>
                </div>
            `;
    return banner;
};
ui.createAccordion = function (items) {
    const accordion = document.createElement('div');
    accordion.className = 'accordion';
    items.forEach((item, index) => {
        const accordionItem = document.createElement('div');
        accordionItem.className = 'accordion-item';
        accordionItem.innerHTML = `
                    <div class="accordion-header" onclick="ui.toggleAccordion(this)">
                        <h3>${item.title}</h3>
                        <span class="material-symbols-rounded accordion-icon">expand_more</span>
                    </div>
                    <div class="accordion-content">
                        <div class="accordion-content-inner">
                            ${item.content}
                        </div>
                    </div>
                `;
        accordion.appendChild(accordionItem);
    });
    return accordion;
};
ui.toggleAccordion = function (header) {
    const item = header.parentElement;
    const content = item.querySelector('.accordion-content');
    const isActive = item.classList.contains('active');
    const allItems = item.parentElement.querySelectorAll('.accordion-item');
    allItems.forEach(otherItem => {
        if (otherItem !== item) {
            otherItem.classList.remove('active');
        }
    });
    if (isActive) {
        item.classList.remove('active');
    } else {
        item.classList.add('active');
    }
};
ui.createStepCard = function (stepNumber, title, description, iconName) {
    const card = document.createElement('div');
    card.className = 'card fade-in';
    card.style.textAlign = 'center';
    card.innerHTML = `
                <div class="icon-box" style="margin-bottom: 1.5rem;">
                    <span class="material-symbols-rounded">${iconName}</span>
                </div>
                <h3>${title}</h3>
                <p>${description}</p>
            `;
    return card;
};
ui.createCardWithHeader = function(icon, title, content, iconColor = 'var(--primary)', titleColor = 'var(--on-surface)', iconBg = 'var(--primary-container)') {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
        <div class="card-header">
            <div class="icon-box" style="background: ${iconBg};">
                <span class="material-symbols-rounded" style="color: ${iconColor};">${icon}</span>
            </div>
            <h3 style="color: ${titleColor};">${title}</h3>
        </div>
        ${content}
    `;
    return card;
};
ui.createFAQIconBox = function(icon, title, description, colorVariant = 'primary', badge = null) {
    const colors = ['primary', 'secondary', 'tertiary', 'success', 'warning', 'error'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    const finalColor = colorVariant === 'random' ? randomColor : colorVariant;
    const badgeHtml = badge ? `<div class="faq-icon-box-badge">${badge}</div>` : '';
    return `
        <div class="faq-icon-box color-${finalColor}">
            <div class="faq-icon-box-header">
                <div class="faq-icon-box-header-icon">
                    <span class="material-symbols-rounded">${icon}</span>
                </div>
                <div class="faq-icon-box-content">
                    ${badgeHtml}
                    <h4 class="faq-icon-box-title">${title}</h4>
                </div>
            </div>
            <p class="faq-icon-box-description">${description}</p>
        </div>
    `;
};
ui.createFAQGrid = function(items) {
    return `
        <div class="faq-grid">
            ${items.join('')}
        </div>
    `;
};
ui.createFAQStepCard = function(number, icon, title, description) {
    return `
        <div class="faq-step-card">
            <div class="faq-step-number">${number}</div>
            <div class="faq-step-icon">
                <span class="material-symbols-rounded">${icon}</span>
            </div>
            <h4 class="faq-step-title">${title}</h4>
            <p class="faq-step-description">${description}</p>
        </div>
    `;
};
ui.createFAQStepsGrid = function(steps) {
    return `
        <div class="faq-steps-grid">
            ${steps.join('')}
        </div>
    `;
};
ui.createFAQInfoItem = function(icon, title, text, variant = 'info') {
    return `
        <div class="faq-info-box variant-${variant}">
            <div class="faq-info-box-icon">
                <span class="material-symbols-rounded">${icon}</span>
            </div>
            <div class="faq-info-box-content">
                <h5 class="faq-info-box-title">${title}</h5>
                <p class="faq-info-box-text">${text}</p>
            </div>
        </div>
    `;
};
ui.createFAQInfoGrid = function(items) {
    return `
        <div class="faq-info-container">
            ${items.join('')}
        </div>
    `;
};
ui.createFAQSolutionBox = function(icon, title, description) {
    return `
        <div class="faq-solution-box">
            <div class="faq-solution-icon">
                <span class="material-symbols-rounded">${icon}</span>
            </div>
            <h4 class="faq-solution-title">${title}</h4>
            <p class="faq-solution-description">${description}</p>
        </div>
    `;
};
ui.createFAQCard = function(content, variant = 'default') {
    return `
        <div class="faq-icon-box">
            ${content}
        </div>
    `;
};
ui.createFAQAction = function(icon, title, description, variant = 'primary') {
    return ui.createFAQIconBox(icon, title, description, variant === 'primary' ? 'random' : variant);
};
ui.createFAQInfoBox = function(icon, text, variant = 'info') {
    return `
        <div class="faq-info-box variant-${variant}">
            <div class="faq-info-box-icon">
                <span class="material-symbols-rounded">${icon}</span>
            </div>
            <div class="faq-info-box-content">
                <div class="faq-info-box-text">${text}</div>
            </div>
        </div>
    `;
};
ui.createFAQSolution = function(icon, title, description, variant = 'primary') {
    return ui.createFAQSolutionBox(icon, title, description);
};
ui.createInfoCard = function (iconName, title, content, variant = 'default') {
    const card = document.createElement('div');
    card.className = 'card';
    let iconColor = 'var(--primary)';
    let bgColor = 'var(--primary-container)';
    if (variant === 'success') {
        iconColor = 'var(--success)';
        bgColor = 'rgba(76, 175, 80, 0.1)';
    } else if (variant === 'warning') {
        iconColor = 'var(--warning)';
        bgColor = 'rgba(255, 152, 0, 0.1)';
    } else if (variant === 'error') {
        iconColor = 'var(--error)';
        bgColor = 'rgba(211, 47, 47, 0.1)';
    }
    card.innerHTML = `
                <div style="display: flex; align-items: flex-start; gap: 1rem;">
                    <div style="
                        width: 40px; 
                        height: 40px; 
                        border-radius: 10px; 
                        background-color: ${bgColor}; 
                        display: flex; 
                        align-items: center; 
                        justify-content: center;
                        flex-shrink: 0;
                    ">
                        <span class="material-symbols-rounded" style="color: ${iconColor}; font-size: 20px;">${iconName}</span>
                    </div>
                    <div>
                        <h4 style="margin: 0 0 0.5rem 0; color: var(--on-surface);">${title}</h4>
                        <div style="color: var(--on-surface-variant);">${content}</div>
                    </div>
                </div>
            `;
    return card;
};
ui.createCodeBlock = function (code, language = '') {
    const pre = document.createElement('pre');
    const codeElement = document.createElement('code');
    if (language) {
        codeElement.className = `language-${language}`;
    }
    codeElement.textContent = code;
    pre.appendChild(codeElement);
    return pre;
};
ui.createButton = function (text, type = 'filled', iconName = null, href = null, onclick = null) {
    const element = href ? document.createElement('a') : document.createElement('button');
    element.className = `btn btn-${type}`;
    if (href) {
        element.href = href;
    }
    if (onclick) {
        element.onclick = onclick;
    }
    const iconHtml = iconName ? `<span class="material-symbols-rounded">${iconName}</span>` : '';
    element.innerHTML = `${iconHtml}${text}`;
    return element;
};
ui.createHeroSection = function (title, subtitle, description, primaryAction, secondaryAction) {
    const hero = document.createElement('section');
    hero.className = 'hero-section fade-in';
    const primaryBtn = primaryAction ? `<a href="${primaryAction.href}" class="btn btn-filled">
                <span class="material-symbols-rounded">${primaryAction.icon}</span>
                ${primaryAction.text}
            </a>` : '';
    const secondaryBtn = secondaryAction ? `<a href="${secondaryAction.href}" class="btn btn-outlined">
                <span class="material-symbols-rounded">${secondaryAction.icon}</span>
                ${secondaryAction.text}
            </a>` : '';
    hero.innerHTML = `
                <div class="icon-box bounce" style="margin: 0 auto 2rem; width: 80px; height: 80px; border-radius: 20px;">
                    <span class="material-symbols-rounded" style="font-size: 40px;">bolt</span>
                </div>
                <h1>${title}</h1>
                <p class="subtitle">${subtitle}</p>
                <p style="max-width: 600px; margin: 0 auto 2rem;">${description}</p>
                <div class="hero-actions">
                    ${primaryBtn}
                    ${secondaryBtn}
                </div>
            `;
    return hero;
};
ui.createIconList = function (items) {
    const list = document.createElement('div');
    list.style.display = 'flex';
    list.style.flexDirection = 'column';
    list.style.gap = '1rem';
    const iconColors = [
        { bg: 'var(--primary-container)', icon: 'var(--primary)' },
        { bg: 'var(--secondary-container)', icon: 'var(--secondary)' },
        { bg: 'var(--tertiary-container)', icon: 'var(--tertiary)' },
        { bg: 'var(--success-container)', icon: 'var(--success)' },
        { bg: 'var(--warning-container)', icon: 'var(--warning)' }
    ];
    items.forEach((item, index) => {
        const listItem = document.createElement('div');
        listItem.className = 'icon-list-item';
        const colorScheme = iconColors[index % iconColors.length];
        listItem.innerHTML = `
                    <div style="
                        width: 36px; 
                        height: 36px; 
                        border-radius: 10px; 
                        background-color: ${colorScheme.bg}; 
                        display: flex; 
                        align-items: center; 
                        justify-content: center;
                        flex-shrink: 0;
                        border: 1px solid ${colorScheme.icon}20;
                    ">
                        <span class="material-symbols-rounded" style="color: ${colorScheme.icon}; font-size: 18px;">${item.icon}</span>
                    </div>
                    <div style="flex: 1;">
                        <strong style="color: var(--on-surface); font-size: 0.95rem;">${item.title}</strong>
                        <div style="color: var(--on-surface-variant); font-size: 0.875rem; margin-top: 0.25rem; line-height: 1.4;">${item.description}</div>
                    </div>
                `;
        list.appendChild(listItem);
    });
    return list;
};
ui.createTitledCodeBlock = function(title, code, variant = 'primary') {
    const container = document.createElement('div');
    const codeEscaped = code.replace(/</g, "&lt;").replace(/>/g, "&gt;");
    container.innerHTML = `
        <h4 style="margin: 1.5rem 0 1rem 0; color: var(--${variant});">${title}</h4>
        <pre style="background: var(--surface-variant); padding: 1rem; border-radius: 8px; font-size: 0.875rem; line-height: 1.4; border-left: 4px solid var(--${variant});"><code>${codeEscaped}</code></pre>
    `;
    return container;
};
ui.createChecklistCard = function(number, title, description, variant = 'primary') {
    const card = document.createElement('div');
    card.className = 'card';
    card.style.background = `var(--${variant}-container)`;
    card.style.borderColor = `var(--${variant})`;
    card.innerHTML = `
        <div class="card-header" style="display: flex; align-items: center; gap: 1rem;">
            <div class="card-icon" style="background: var(--${variant}); color: var(--on-${variant}); width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; flex-shrink: 0;">${number}</div>
            <div class="card-content">
                <h4 class="card-title" style="color: var(--on-${variant}-container); margin: 0;">${title}</h4>
            </div>
        </div>
        <p class="card-description" style="color: var(--on-${variant}-container); margin: 0.75rem 0 0 0;">${description}</p>
    `;
    return card;
};
ui.createBorderedIconListItem = function(icon, text, variant = 'primary') {
    const item = document.createElement('div');
    item.style.cssText = `
        display: flex; 
        align-items: flex-start; 
        gap: 1rem; 
        padding: 1rem; 
        background: var(--${variant}-container); 
        border-radius: 8px; 
        border-left: 4px solid var(--${variant});
    `;
    item.innerHTML = `
        <span class="material-symbols-rounded" style="color: var(--${variant}); font-size: 20px;">${icon}</span>
        <div>${text}</div>
    `;
    return item;
};
ui.createDetailGridCard = function(icon, title, items, variant = 'primary') {
    const card = document.createElement('div');
    card.style.cssText = `
        padding: 1.25rem; 
        background: var(--${variant}-container); 
        border-radius: 12px; 
        border: 1px solid var(--${variant});
    `;
    const itemsHtml = items.map(item => `<div>${item}</div>`).join('');
    card.innerHTML = `
        <div style="display: flex; align-items: center; gap: 0.75rem; margin-bottom: 1rem;">
            <span class="material-symbols-rounded" style="color: var(--${variant}); font-size: 24px;">${icon}</span>
            <strong style="color: var(--${variant}); font-size: 1.1rem;">${title}</strong>
        </div>
        <div style="display: flex; flex-direction: column; gap: 0.75rem;">
            ${itemsHtml}
        </div>
    `;
    return card;
};
ui.createTimelineStep = function(stepText, title, description, variant = 'primary') {
    const step = document.createElement('div');
    step.style.cssText = `
        text-align: center; 
        padding: 1.5rem; 
        background: var(--${variant}-container); 
        border-radius: 12px; 
        border: 1px solid var(--${variant});
    `;
    let gradient = '';
    let color = 'white';
    switch(variant) {
        case 'primary': gradient = 'linear-gradient(135deg, var(--primary), var(--tertiary))'; break;
        case 'warning': gradient = 'linear-gradient(135deg, var(--warning), var(--error))'; break;
        default: gradient = 'var(--outline)'; color = 'var(--on-surface-variant)'; break;
    }
    step.innerHTML = `
        <div style="width: 80px; height: 80px; border-radius: 50%; background: ${gradient}; margin: 0 auto 1rem; display: flex; align-items: center; justify-content: center; color: ${color}; font-weight: 700; font-size: 1.5rem;">${stepText}</div>
        <h4 style="color: var(--${variant}); margin-bottom: 1rem;">${title}</h4>
        <div style="font-size: 0.875rem; line-height: 1.4;">${description}</div>
    `;
    return step;
};
ui.createDbTableCard = function(icon, title, fields, variant = 'primary') {
    const card = document.createElement('div');
    card.style.cssText = `
        margin-bottom: 1.5rem; 
        padding: 1.25rem; 
        background: var(--${variant}-container); 
        border-radius: 12px; 
        border: 1px solid var(--${variant});
    `;
    const fieldsHtml = fields.map(field => `<span style="background: var(--surface); padding: 0.5rem 0.75rem; border-radius: 6px; font-size: 0.875rem; border: 1px solid var(--outline-variant);">${field}</span>`).join('');
    card.innerHTML = `
        <div style="display: flex; align-items: center; gap: 0.75rem; margin-bottom: 1rem;">
            <span class="material-symbols-rounded" style="color: var(--${variant}); font-size: 24px;">${icon}</span>
            <strong style="color: var(--${variant}); font-size: 1.1rem;">${title}</strong>
        </div>
        <div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
            ${fieldsHtml}
        </div>
    `;
    return card;
};
ui.createDetailBox = function(icon, title, content, variant = 'secondary') {
    const box = document.createElement('div');
    box.style.cssText = `
        padding: 0.75rem; 
        background: var(--surface); 
        border-radius: 8px; 
        border: 1px solid var(--outline-variant);
    `;
    box.innerHTML = `
        <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.25rem;">
            <span class="material-symbols-rounded" style="color: var(--${variant}); font-size: 16px;">${icon}</span>
            <strong style="font-size: 0.875rem;">${title}</strong>
        </div>
        <span style="font-size: 0.875rem; color: var(--on-surface-variant);">${content}</span>
    `;
    return box;
};
ui.createSimpleInfoBox = function(icon, title, description, variant = 'primary') {
    const box = document.createElement('div');
    box.style.cssText = `
        display: flex; 
        align-items: flex-start; 
        gap: 0.75rem; 
        padding: 1rem; 
        background: var(--${variant}-container); 
        border-radius: 8px;
    `;
    box.innerHTML = `
        <span class="material-symbols-rounded" style="color: var(--${variant}); font-size: 20px;">${icon}</span>
        <div>
            <strong>${title}</strong>
            <p style="margin: 0.5rem 0 0 0; color: var(--on-surface-variant); font-size: 0.875rem;">${description}</p>
        </div>
    `;
    return box;
};
ui.initMobileNav = function (header) {
    if (!header) {
        console.warn('Header element not found for mobile navigation');
        return;
    }
    const mobileToggle = header.querySelector('.mobile-nav-toggle');
    const navLinks = header.querySelector('.nav-links');
    if (!mobileToggle || !navLinks) {
        console.warn('Mobile navigation elements not found');
        return;
    }
    const updateMobileClass = () => {
        if (window.innerWidth <= 768) {
            navLinks.classList.add('mobile-nav');
        } else {
            navLinks.classList.remove('mobile-nav');
            navLinks.classList.remove('active');
        }
    };
    updateMobileClass();
    mobileToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        navLinks.classList.toggle('active');
    });
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.nav')) {
            navLinks.classList.remove('active');
        }
    });
    window.addEventListener('resize', () => {
        updateMobileClass();
        if (window.innerWidth > 768) {
            navLinks.classList.remove('active');
        }
    });
};
ui.initScrollAnimations = function () {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    document.querySelectorAll('.card, .feature-card, .accordion-item').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
};
ui.init = function () {
    const header = document.querySelector('header');
    if (header) {
        ui.initMobileNav(header);
    }
    setTimeout(() => {
        ui.initScrollAnimations();
    }, 100);
};