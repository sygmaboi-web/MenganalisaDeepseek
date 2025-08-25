// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Intersection Observer untuk animasi scroll
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

// Menyembunyikan cards di awal dan mengamatinya untuk animasi
document.querySelectorAll('.card, .detection-item').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'all 0.6s ease';
    observer.observe(card);
});

// Efek glitch pada title saat hover
const title = document.querySelector('.hero h1');
let glitchTimeout;

title.addEventListener('mouseenter', () => {
    title.style.animation = 'none';
    let glitchCount = 0;
    const glitchInterval = setInterval(() => {
        title.style.transform = `translate(${Math.random() * 4 - 2}px, ${Math.random() * 4 - 2}px)`;
        title.style.textShadow = `
            ${Math.random() * 10 - 5}px ${Math.random() * 10 - 5}px 0 #ff00ff,
            ${Math.random() * 10 - 5}px ${Math.random() * 10 - 5}px 0 #00ffff
        `;
        glitchCount++;
        if (glitchCount > 10) {
            clearInterval(glitchInterval);
            title.style.transform = 'translate(0, 0)';
            title.style.textShadow = '';
            title.style.animation = 'textShimmer 3s ease-in-out infinite';
        }
    }, 100);
});

// Fungsi untuk menambahkan efek loading pada cards
function addLoadingEffect() {
    const cards = document.querySelectorAll('.card');
    cards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
        card.classList.add('fade-in');
    });
}

// Fungsi untuk mengatur navbar aktif berdasarkan scroll
function setActiveNavItem() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

// Event listener untuk scroll
window.addEventListener('scroll', setActiveNavItem);

// Fungsi untuk menambahkan efek parallax pada background
function addParallaxEffect() {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('[data-parallax]');
    
    parallaxElements.forEach(element => {
        const rate = scrolled * -0.5;
        element.style.transform = `translateY(${rate}px)`;
    });
}

// Event listener untuk parallax
window.addEventListener('scroll', addParallaxEffect);

// Fungsi untuk menambahkan efek typing pada judul
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Fungsi untuk menambahkan counter animasi
function animateCounters() {
    const counters = document.querySelectorAll('[data-count]');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-count'));
        let count = 0;
        const increment = target / 100;
        
        const updateCounter = () => {
            if (count < target) {
                count += increment;
                counter.textContent = Math.ceil(count);
                setTimeout(updateCounter, 20);
            } else {
                counter.textContent = target;
            }
        };
        
        updateCounter();
    });
}

// Fungsi untuk menambahkan efek particles (opsional)
function createParticles() {
    const particleContainer = document.createElement('div');
    particleContainer.className = 'particles';
    particleContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: -1;
    `;
    
    document.body.appendChild(particleContainer);
    
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: 2px;
            height: 2px;
            background: #00ffff;
            border-radius: 50%;
            animation: float ${Math.random() * 10 + 5}s linear infinite;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            opacity: ${Math.random() * 0.5 + 0.2};
        `;
        particleContainer.appendChild(particle);
    }
}

// CSS untuk animasi float particles
const floatAnimation = `
    @keyframes float {
        0% {
            transform: translateY(0px) rotate(0deg);
            opacity: 1;
        }
        100% {
            transform: translateY(-1000px) rotate(360deg);
            opacity: 0;
        }
    }
`;

// Menambahkan animasi ke stylesheet
const styleSheet = document.createElement('style');
styleSheet.textContent = floatAnimation;
document.head.appendChild(styleSheet);

// Event listener untuk DOMContentLoaded
document.addEventListener('DOMContentLoaded', function() {
    // Inisialisasi semua fungsi
    addLoadingEffect();
    setActiveNavItem();
    
    // Opsi untuk menambahkan particles (uncomment jika ingin digunakan)
    // createParticles();
    
    console.log('Deep Fake AI Website loaded successfully!');
});

// Fungsi untuk menambahkan efek hover pada detection items
document.querySelectorAll('.detection-item').forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.05)';
        this.style.transition = 'transform 0.3s ease';
    });
    
    item.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
    });
});

// Fungsi untuk menambahkan efek ripple pada click
function addRippleEffect(event) {
    const button = event.currentTarget;
    const ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        background: radial-gradient(circle, rgba(0,255,255,0.3) 0%, transparent 70%);
        border-radius: 50%;
        transform: scale(0);
        animation: ripple 0.6s linear;
        pointer-events: none;
    `;
    
    button.style.position = 'relative';
    button.style.overflow = 'hidden';
    button.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// CSS untuk animasi ripple
const rippleAnimation = `
    @keyframes ripple {
        to {
            transform: scale(2);
            opacity: 0;
        }
    }
`;

// Menambahkan animasi ripple ke stylesheet
const rippleStyleSheet = document.createElement('style');
rippleStyleSheet.textContent = rippleAnimation;
document.head.appendChild(rippleStyleSheet);

// Menambahkan efek ripple ke semua cards
document.querySelectorAll('.card, .detection-item').forEach(item => {
    item.addEventListener('click', addRippleEffect);
});