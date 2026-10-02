const currentYear = new Date().getFullYear();
const yearElement = document.getElementById('year');
if (yearElement) {
    yearElement.textContent = currentYear;
}

const body = document.body;
const savedTheme = localStorage.getItem('portfolio-theme');
const preferredTheme = savedTheme || (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');

const applyTheme = (theme) => {
    body.setAttribute('data-theme', theme);
    const toggle = document.querySelector('.theme-toggle__icon');
    if (toggle) {
        toggle.textContent = theme === 'dark' ? '☀' : '☾';
    }
};

applyTheme(preferredTheme);

document.querySelectorAll('.theme-toggle').forEach((button) => {
    button.addEventListener('click', () => {
        const nextTheme = body.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        localStorage.setItem('portfolio-theme', nextTheme);
        applyTheme(nextTheme);
    });
});

const counters = document.querySelectorAll('[data-count]');
const speed = 80;

if (counters.length) {
    counters.forEach((counter) => {
        const updateCount = () => {
            const target = Number(counter.getAttribute('data-count'));
            const current = Number(counter.innerText);
            const increment = target / speed;

            if (current < target) {
                counter.innerText = Math.ceil(current + increment);
                setTimeout(updateCount, 30);
            } else {
                counter.innerText = target;
            }
        };

        updateCount();
    });
}

const portfolioModal = document.getElementById('portfolioModal');

function openModal(title, desc, images) {
    if (!portfolioModal) return;

    document.getElementById('modalTitle').innerText = title;
    document.getElementById('modalDesc').innerText = desc;

    const gallery = document.getElementById('modalGallery');
    gallery.innerHTML = '';

    images.forEach((image) => {
        const img = document.createElement('img');
        img.src = image;
        img.alt = title;
        gallery.appendChild(img);
    });

    portfolioModal.style.display = 'block';
    portfolioModal.setAttribute('aria-hidden', 'false');
}

if (portfolioModal) {
    const closeButton = document.querySelector('.close');
    const backButton = document.querySelector('.modal-back');

    const closePortfolioModal = () => {
        portfolioModal.style.display = 'none';
        portfolioModal.setAttribute('aria-hidden', 'true');
    };

    if (closeButton) {
        closeButton.addEventListener('click', closePortfolioModal);
    }

    if (backButton) {
        backButton.addEventListener('click', closePortfolioModal);
    }

    window.addEventListener('click', (event) => {
        if (event.target === portfolioModal) {
            closePortfolioModal();
        }
    });
}

const projectCards = document.querySelectorAll('.asset-card');

if (projectCards.length) {
    projectCards.forEach((card) => {
        const text = (card.textContent || '').toLowerCase();
        const categories = new Set();

        if (/(camera|cctv|surveillance|ptz|solar|video|monitor)/.test(text)) {
            categories.add('cctv');
        }

        if (/(network|switch|router|poe|cabinet|rack|lan|wan|wireless|connectivity|data)/.test(text)) {
            categories.add('networking');
        }

        if (/(software|it|system|automation|business|digital|technology|consult|support|platform)/.test(text)) {
            categories.add('it-tech');
        }

        if (/(biometric|access|entry|fence|perimeter|safety|security)/.test(text)) {
            categories.add('security');
        }

        if (/(maintenance|service|support|site|installation|field|testing|setup|deployment)/.test(text)) {
            categories.add('support');
        }

        if (/(biometric|entry|lock|access)/.test(text)) {
            categories.add('access-control');
        }

        card.dataset.category = Array.from(categories).join(' ');
        card.style.cursor = 'pointer';

        card.addEventListener('click', () => {
            const title = card.querySelector('h3')?.textContent.trim() || 'Project detail';
            const description = card.querySelector('p')?.textContent.trim() || 'Project showcase';
            const image = card.querySelector('img')?.src || '';

            if (image) {
                openModal(title, description, [image]);
            }
        });
    });
}

const form = document.getElementById('serviceForm');
if (form) {
    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const payload = {
            name: event.target.name.value,
            email: event.target.email.value,
            service: event.target.service.value,
            message: event.target.message.value,
        };

        console.log('Project request submitted:', payload);
        alert('Thank you! Your request has been submitted successfully.');
        form.reset();
    });
}

const filterButtons = document.querySelectorAll('.filter-btn');
const assetCards = document.querySelectorAll('.asset-card');

if (filterButtons.length && assetCards.length) {
    filterButtons.forEach((button) => {
        button.addEventListener('click', () => {
            const selectedFilter = button.dataset.filter;

            filterButtons.forEach((btn) => {
                btn.classList.toggle('active', btn === button);
            });

            assetCards.forEach((card) => {
                const selectedCategories = (card.dataset.category || '').split(/\s+/).filter(Boolean);
                const matches = selectedFilter === 'all' || selectedCategories.includes(selectedFilter);
                card.style.display = matches ? '' : 'none';
            });
        });
    });
}

const coBrandingButton = document.querySelector('.co-branding-trigger');

if (coBrandingButton) {
    coBrandingButton.addEventListener('click', () => {
        const image = coBrandingButton.dataset.coBrandImage;
        const title = coBrandingButton.dataset.coBrandTitle || 'Co-branding';
        const desc = coBrandingButton.dataset.coBrandDesc || 'Partnership image';

        openModal(title, desc, [image]);
    });
}
