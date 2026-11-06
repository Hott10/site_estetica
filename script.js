// script.js

// 1. Mudança de estilo no Header ao fazer scroll
const header = document.getElementById('header');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// 2. Rolagem suave (Smooth Scroll) para links internos
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if(targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        
        if(targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 70, // Ajuste devido ao header fixo
                behavior: 'smooth'
            });
        }
    });
});

// 3. Animação de entrada dos elementos na rolagem da página (Intersection Observer)
const revealElements = document.querySelectorAll('.reveal');

const revealOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px"
};

const revealOnScroll = new IntersectionObserver(function(entries, observer) {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        
        entry.target.style.opacity = 1;
        entry.target.style.transform = "translateY(0)";
        observer.unobserve(entry.target);
    });
}, revealOptions);

revealElements.forEach(el => {
    // Configuração inicial via JS para evitar esconder elementos se o JS falhar
    el.style.opacity = 0;
    el.style.transform = "translateY(30px)";
    el.style.transition = "all 0.6s ease-out";
    revealOnScroll.observe(el);
});

// =========================================
// FAQ Accordion Interativo
// =========================================
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    
    question.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        
        // Opcional: Fecha todas as outras abas ao abrir uma nova (comportamento premium)
        faqItems.forEach(otherItem => {
            otherItem.classList.remove('active');
        });

        // Se a aba clicada não estava ativa, ela abre
        if (!isActive) {
            item.classList.add('active');
        }
    });
});