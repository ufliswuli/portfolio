let switchToggle = document.getElementById('toggle');

if (switchToggle) {
    switchToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        if (document.body.classList.contains('dark-mode')) {
            switchToggle.setAttribute('fill', '#f1c40f');
        } else {
            switchToggle.setAttribute('fill', '#333');
        }
    });
}

const centerInner = document.querySelector('main section.center .center-inner');
const containers = centerInner ? centerInner.querySelectorAll('.container') : document.querySelectorAll('main section.center .container');
const navLinks = document.querySelectorAll('main section.navbar nav ul li a');

function setActiveById(id) {
    containers.forEach(c => {
        if (c.id === id) c.classList.add('active');
        else c.classList.remove('active');
    });
}

navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (!href || !href.startsWith('#')) return;
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const id = href.slice(1);
        const target = document.getElementById(id);
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'center' });
            setActiveById(id);
            navLinks.forEach(l => l.classList.toggle('active', l.getAttribute('href') === '#' + id));
            history.replaceState(null, '', '#' + id);
        }
    });
});

if (containers.length > 0) {
    const observerOptions = { root: centerInner || null, threshold: 0.6 };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.id;
                setActiveById(id);
                navLinks.forEach(l => l.classList.toggle('active', l.getAttribute('href') === '#' + id));
            }
        });
    }, observerOptions);

    containers.forEach(c => observer.observe(c));
}