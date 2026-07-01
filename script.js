// Smooth scroll to section
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
}

// Handle form submission - Send to WhatsApp
function handleSubmit(event) {
    event.preventDefault();
    
    const form = event.target;
    const name = form.querySelector('input[name="name"]').value;
    const email = form.querySelector('input[name="email"]').value;
    const phone = form.querySelector('input[name="phone"]').value;
    const service = form.querySelector('select[name="service"]').value;
    const message = form.querySelector('textarea[name="message"]').value;
    
    // Create WhatsApp message
    const whatsappMessage = `🔔 طلب خدمة تنظيف جديد

👤 الاسم: ${name}
📧 البريد الإلكتروني: ${email}
📱 الهاتف: ${phone}
🧹 الخدمة: ${service}
💬 الرسالة: ${message}

تم الإرسال من موقع خادمات في الرياض`;
    
    const encodedMessage = encodeURIComponent(whatsappMessage);
    // Replace with your actual WhatsApp number
    const whatsappURL = `https://wa.me/966582446236?text=${encodedMessage}`;
    
    // Show confirmation and open WhatsApp
    alert('شكرا لطلبك! سيتم تحويلك إلى واتساب لتأكيد الحجز.');
    window.open(whatsappURL, '_blank');
    
    // Reset form
    form.reset();
}

// Add scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all service cards, pricing cards, and testimonial cards
document.querySelectorAll('.service-card, .pricing-card, .testimonial-card, .feature-box, .team-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});

// Add active state to nav links based on scroll position
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (pageYOffset >= sectionTop - 60) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Add animation to hero on page load
window.addEventListener('load', () => {
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.opacity = '1';
    }
});

// Log page view for analytics
console.log('Website loaded: خادمات في الرياض');
console.log('Ready to serve Riyadh with professional cleaning services');
