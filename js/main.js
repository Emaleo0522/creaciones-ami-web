// Creaciones AMI - JavaScript with GSAP Animations

// Initialize GSAP
gsap.registerPlugin(ScrollTrigger);

// DOM Elements
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const contactForm = document.getElementById('contact-form');

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initAnimations();
    initMobileMenu();
    initContactForm();
    loadGalleryItems();
    updateWhatsAppLinks();
    updateAboutStats();
});

// GSAP Animations
function initAnimations() {
    // Hero Section Animation - Animated Title with Scissors
    const heroTl = gsap.timeline();
    
    // Scissors animation
    heroTl.to('.scissors-left', {
        duration: 0.8,
        x: 0,
        rotation: 0,
        opacity: 1,
        ease: 'back.out(1.7)'
    })
    .to('.title-left', {
        duration: 0.6,
        opacity: 1,
        x: 0,
        ease: 'power2.out'
    }, '-=0.3')
    .to('.title-right', {
        duration: 0.6,
        opacity: 1,
        x: 0,
        ease: 'power2.out'
    }, '-=0.2')
    .to('.scissors-right', {
        duration: 0.8,
        x: 0,
        rotation: 0,
        opacity: 1,
        ease: 'back.out(1.7)'
    }, '-=0.4')
    .from('.hero-subtitle', {
        duration: 0.8,
        y: 50,
        opacity: 0,
        ease: 'power2.out'
    }, '-=0.3')
    .from('.hero-location, .hero-shipping', {
        duration: 0.6,
        y: 30,
        opacity: 0,
        stagger: 0.2,
        ease: 'power2.out'
    }, '-=0.2')
    .from('.hero-buttons .btn', {
        duration: 0.8,
        scale: 0,
        opacity: 0,
        stagger: 0.2,
        ease: 'back.out(1.7)'
    }, '-=0.1')
    .to('.whatsapp-cta', {
        duration: 0.8,
        scale: 1,
        opacity: 1,
        ease: 'back.out(1.7)'
    }, '-=0.8');

    // Floating elements animation
    gsap.to('.float-item', {
        duration: 3,
        y: '-20px',
        repeat: -1,
        yoyo: true,
        ease: 'power2.inOut',
        stagger: 0.5
    });

    // Navbar animation on scroll
    gsap.to('.header', {
        scrollTrigger: {
            trigger: '.hero',
            start: 'bottom top',
            toggleActions: 'play none none reverse'
        },
        duration: 0.3,
        backgroundColor: 'rgba(255, 255, 255, 0.98)',
        backdropFilter: 'blur(15px)',
        ease: 'power2.out'
    });

    // Products cards animation
    gsap.from('.producto-card', {
        scrollTrigger: {
            trigger: '.productos-grid',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        },
        duration: 0.8,
        y: 100,
        opacity: 0,
        stagger: 0.2,
        ease: 'power3.out'
    });

    // Gallery items animation
    gsap.from('.gallery-item', {
        scrollTrigger: {
            trigger: '.gallery-grid',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        },
        duration: 0.6,
        scale: 0,
        opacity: 0,
        stagger: 0.1,
        ease: 'back.out(1.7)'
    });

    // Gallery titles animation
    gsap.from('.gallery-subtitle', {
        scrollTrigger: {
            trigger: '.gallery-subtitle',
            start: 'top 85%',
            toggleActions: 'play none none reverse'
        },
        duration: 0.8,
        y: 30,
        opacity: 0,
        ease: 'power2.out'
    });

    gsap.from('.gallery-section-title', {
        scrollTrigger: {
            trigger: '.gallery-section-title',
            start: 'top 85%',
            toggleActions: 'play none none reverse'
        },
        duration: 0.6,
        scale: 0,
        opacity: 0,
        stagger: 0.3,
        ease: 'back.out(1.7)'
    });

    // About section animation
    gsap.from('.about-text > *', {
        scrollTrigger: {
            trigger: '.about-content',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        },
        duration: 0.8,
        x: -100,
        opacity: 0,
        stagger: 0.2,
        ease: 'power3.out'
    });

    // Enhanced about placeholder animation
    gsap.set('.about-placeholder', {
        scale: 0,
        rotationY: -180,
        rotationX: 45,
        opacity: 0
    });

    gsap.to('.about-placeholder', {
        scrollTrigger: {
            trigger: '.about-content',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        },
        duration: 1.2,
        scale: 1,
        rotationY: 0,
        rotationX: 0,
        opacity: 1,
        ease: 'power3.out'
    });

    // Continuous floating animation
    gsap.to('.about-placeholder', {
        y: -10,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: 'power2.inOut',
        delay: 1.5
    });

    // Interactive 3D movement on mouse move
    document.querySelector('.about-placeholder')?.addEventListener('mousemove', (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        gsap.to('.about-placeholder', {
            duration: 0.3,
            rotationY: x / 10,
            rotationX: -y / 10,
            ease: 'power2.out'
        });
    });

    // Reset on mouse leave
    document.querySelector('.about-placeholder')?.addEventListener('mouseleave', () => {
        gsap.to('.about-placeholder', {
            duration: 0.6,
            rotationY: 0,
            rotationX: 0,
            ease: 'power2.out'
        });
    });

    // WhatsApp float button - appears after hero
    gsap.to('.whatsapp-float', {
        scrollTrigger: {
            trigger: '.productos',
            start: 'top 90%',
            toggleActions: 'play none none reverse'
        },
        duration: 0.8,
        opacity: 1,
        scale: 1,
        ease: 'back.out(1.7)'
    });

    // Stats counter animation
    gsap.from('.stat-number', {
        scrollTrigger: {
            trigger: '.stats',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        },
        duration: 2,
        textContent: 0,
        snap: { textContent: 1 },
        stagger: 0.2,
        ease: 'power2.out',
        onUpdate: function() {
            const statNumbers = document.querySelectorAll('.stat-number');
            const values = ['1000', '277', '100%'];
            statNumbers.forEach((stat, index) => {
                if (index === 0) {
                    stat.textContent = Math.round(this.progress() * 1000) + '+';
                } else if (index === 2) {
                    stat.textContent = Math.round(this.progress() * 100) + '%';
                } else {
                    stat.textContent = Math.round(this.progress() * parseInt(values[index]));
                }
            });
        }
    });

    // Contact form animation
    gsap.from('.contact-form', {
        scrollTrigger: {
            trigger: '.contacto',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        },
        duration: 0.8,
        x: 100,
        opacity: 0,
        ease: 'power3.out'
    });

    gsap.from('.contact-info > *', {
        scrollTrigger: {
            trigger: '.contacto',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        },
        duration: 0.6,
        x: -50,
        opacity: 0,
        stagger: 0.1,
        ease: 'power2.out'
    });

    // Section titles animation
    gsap.from('.section-title', {
        scrollTrigger: {
            trigger: '.section-title',
            start: 'top 85%',
            toggleActions: 'play none none reverse'
        },
        duration: 0.8,
        y: 50,
        opacity: 0,
        ease: 'power3.out'
    });

    // Product card hover effects - Using CSS transitions instead
    // The hover effects are now handled by CSS for better performance
}

// Mobile menu functionality
function initMobileMenu() {
    if (!hamburger || !navMenu) return;

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        
        if (navMenu.classList.contains('active')) {
            gsap.fromTo(navMenu, 
                { opacity: 0, y: -20 },
                { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out' }
            );
        }
    });

    // Close menu when clicking on a link
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            gsap.to(window, {
                duration: 1,
                scrollTo: target,
                ease: 'power2.inOut'
            });
        }
    });
});

// Contact form functionality
function initContactForm() {
    if (!contactForm) return;

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Animate submit button
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        gsap.to(submitBtn, {
            duration: 0.2,
            scale: 0.95,
            yoyo: true,
            repeat: 1,
            ease: 'power2.inOut'
        });

        // Get form data
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);
        
        // Create structured WhatsApp message
        const mensaje = createWhatsAppMessage(data);
        
        // Get WhatsApp number from admin settings or use default
        const whatsappSettings = JSON.parse(localStorage.getItem('whatsappSettings') || '{"number": "5492604201185"}');
        const whatsappNumber = whatsappSettings.number || '5492604201185';
        
        // Open WhatsApp with the message
        const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(mensaje)}`;
        window.open(whatsappURL, '_blank');
        
        // Reset form
        setTimeout(() => {
            contactForm.reset();
        }, 500);
    });
}

// Create structured WhatsApp message
function createWhatsAppMessage(data) {
    const categorias = {
        'baby-shower': 'Baby Shower',
        'material-educativo': 'Material Educativo',
        'personajes': 'Personajes Temáticos',
        'recursos-didacticos': 'Recursos Didácticos',
        'toppers': 'Toppers & Decoraciones',
        'libros-sensoriales': 'Libros Sensoriales',
        'otro': 'Otro'
    };

    const mensaje = `🎨 *NUEVO PEDIDO - CREACIONES AMI*

👤 *Cliente:* ${data.nombre}
📱 *WhatsApp:* ${data.whatsapp}
📂 *Categoría:* ${categorias[data.categoria] || data.categoria}

💭 *Descripción del pedido:*
${data.mensaje}

---
📍 *Enviado desde:* creacionesami.com
⏰ *Fecha:* ${new Date().toLocaleDateString('es-AR')} - ${new Date().toLocaleTimeString('es-AR')}`;

    return mensaje;
}

// Media files arrays
const images = [
    'assets/gallery/495481936_17869546068360446_4321890648862777476_n.webp',
    'assets/gallery/500252526_17871779073360446_7923867554632101391_n.webp',
    'assets/gallery/500424849_17871779412360446_7347147921063245909_n.webp',
    'assets/gallery/515820675_17877820587360446_2413955756290613320_n.webp',
    'assets/gallery/517721253_17878137654360446_5927085289899163555_n.webp',
    'assets/gallery/526301283_17880956070360446_9076310641475082024_n.webp',
    'assets/gallery/526392698_17880956067360446_2314655669405267939_n.webp',
    'assets/gallery/Instagram highlights stories 17936682401968585.webp'
];

const videos = [
    'assets/videos/Instagram highlights stories 17936682401968585 (1).mp4',
    'assets/videos/Instagram highlights stories 17936682401968585 (2).mp4',
    'assets/videos/Instagram highlights stories 17936682401968585.mp4',
    'assets/videos/Instagram highlights stories 18292519975218790.mp4',
    'assets/videos/Lectómetro que eligió Gise para fluidez lectora 📖💕Gracias 🫂 por cada pedido!.mp4',
    'assets/videos/Un pequeño ya está disfrutando su libro sensorial!📕💡📚Gracias Carla!Tamaño A4 en tela y goma E.mp4',
    'assets/videos/AQO_dHGDjQM0EzQW0vPSlS2X5jB3Mo7_GKGaRpFF1uRnzbQehKCaVXajNYzfSbxk3i4olhwDZq06R6U0XJfHCXOMKuDi1jbw.mp4'
];

let currentImageIndex = 0;

// Load gallery items
function loadGalleryItems() {
    loadImageGallery();
    loadVideoGallery();
}

// Load Image Gallery with Lightbox
function loadImageGallery() {
    const imageGallery = document.getElementById('image-gallery');
    if (!imageGallery) return;

    // Load from admin panel (localStorage) first, then static images
    const adminGalleryItems = JSON.parse(localStorage.getItem('amiGalleryItems') || '[]');
    const adminImages = adminGalleryItems.filter(item => 
        item.category === 'imagenes' && item.published !== false
    );
    
    // Combine admin images with static images
    const allImages = [...adminImages.map(item => ({...item, source: 'admin'})), 
                      ...images.map(src => ({ url: src, title: 'Creación', source: 'static' }))];
    
    allImages.forEach((item, index) => {
        const galleryItem = document.createElement('div');
        galleryItem.className = 'gallery-item';
        
        const imgSrc = item.url || item.file || item;
        const imgTitle = item.title || `Creación AMIS ${index + 1}`;
        
        galleryItem.innerHTML = `
            <img src="${imgSrc}" alt="${imgTitle}" loading="lazy">
        `;
        
        // Add click event for lightbox
        galleryItem.addEventListener('click', () => openLightbox(index, allImages));
        
        imageGallery.appendChild(galleryItem);
    });

    // GSAP Animation for image gallery
    gsap.set('.image-gallery .gallery-item', { opacity: 0, scale: 0 });
    
    gsap.to('.image-gallery .gallery-item', {
        scrollTrigger: {
            trigger: '.image-gallery',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        },
        opacity: 1,
        scale: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: 'back.out(1.7)'
    });
}

// Load Video Gallery with Preview
function loadVideoGallery() {
    const mainVideo = document.getElementById('mainVideo');
    const thumbnailContainer = document.getElementById('videoThumbnails');
    if (!mainVideo || !thumbnailContainer) return;

    // Load from admin panel (localStorage) first, then static videos  
    const adminGalleryItems = JSON.parse(localStorage.getItem('amiGalleryItems') || '[]');
    const adminVideos = adminGalleryItems.filter(item => 
        item.category === 'videos' && item.published !== false
    );
    
    // Combine admin videos with static videos
    const allVideos = [...adminVideos.map(item => ({...item, source: 'admin'})), 
                      ...videos.map(src => ({ url: src, title: 'Video', source: 'static' }))];
    
    // Set first video as main (if any videos exist)
    if (allVideos.length > 0) {
        const firstVideo = allVideos[0];
        mainVideo.src = firstVideo.url || firstVideo.file || firstVideo;
    }
    
    allVideos.forEach((item, index) => {
        const thumbContainer = document.createElement('div');
        thumbContainer.className = `video-thumb ${index === 0 ? 'active' : ''}`;
        
        const thumb = document.createElement('video');
        const videoSrc = item.url || item.file || item;
        thumb.src = videoSrc;
        thumb.muted = true;
        thumb.preload = 'metadata';
        
        thumbContainer.appendChild(thumb);
        
        thumbContainer.addEventListener('click', () => {
            mainVideo.src = videoSrc;
            
            // Update active thumbnail
            document.querySelectorAll('.video-thumb').forEach(t => t.classList.remove('active'));
            thumbContainer.classList.add('active');
            
            // Animation for main video change
            gsap.fromTo(mainVideo, 
                { opacity: 0, scale: 0.9 }, 
                { opacity: 1, scale: 1, duration: 0.5, ease: 'power2.out' }
            );
        });
        
        thumbnailContainer.appendChild(thumbContainer);
    });

    // GSAP Animation for video gallery
    gsap.set('.video-thumbnails .video-thumb', { opacity: 0, y: 50 });
    
    gsap.to('.video-thumbnails .video-thumb', {
        scrollTrigger: {
            trigger: '.video-gallery-preview',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        },
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power2.out'
    });

    gsap.fromTo('.main-video', 
        { opacity: 0, scale: 0.8 },
        {
            scrollTrigger: {
                trigger: '.video-gallery-preview',
                start: 'top 85%',
                toggleActions: 'play none none reverse'
            },
            opacity: 1,
            scale: 1,
            duration: 0.8,
            ease: 'power2.out'
        }
    );
}

// Lightbox functionality
let currentImageList = []; // Store current image list for navigation

function openLightbox(index, imagesList = null) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightbox-image');
    const currentImageSpan = document.getElementById('current-image');
    const totalImagesSpan = document.getElementById('total-images');
    
    // Use provided image list or fallback to static images
    currentImageList = imagesList || images.map(src => ({ url: src, title: 'Creación', source: 'static' }));
    
    currentImageIndex = index;
    const currentImage = currentImageList[currentImageIndex];
    const imageSrc = currentImage.url || currentImage.file || currentImage;
    
    lightboxImage.src = imageSrc;
    lightboxImage.alt = currentImage.title || `Creación AMIS ${currentImageIndex + 1}`;
    currentImageSpan.textContent = currentImageIndex + 1;
    totalImagesSpan.textContent = currentImageList.length;
    
    lightbox.style.display = 'block';
    
    // GSAP animation for lightbox open
    gsap.fromTo(lightbox, 
        { opacity: 0 },
        { opacity: 1, duration: 0.3 }
    );
    
    gsap.fromTo(lightboxImage,
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.4, ease: 'back.out(1.7)' }
    );
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    
    gsap.to(lightbox, {
        opacity: 0,
        duration: 0.3,
        onComplete: () => {
            lightbox.style.display = 'none';
        }
    });
}

function changeImage(direction) {
    const lightboxImage = document.getElementById('lightbox-image');
    const currentImageSpan = document.getElementById('current-image');
    
    if (direction === 'next') {
        currentImageIndex = (currentImageIndex + 1) % currentImageList.length;
    } else {
        currentImageIndex = (currentImageIndex - 1 + currentImageList.length) % currentImageList.length;
    }
    
    // Animation for image change
    gsap.to(lightboxImage, {
        opacity: 0,
        scale: 0.8,
        duration: 0.2,
        onComplete: () => {
            const currentImage = currentImageList[currentImageIndex];
            const imageSrc = currentImage.url || currentImage.file || currentImage;
            
            lightboxImage.src = imageSrc;
            lightboxImage.alt = currentImage.title || `Creación AMIS ${currentImageIndex + 1}`;
            currentImageSpan.textContent = currentImageIndex + 1;
            
            gsap.to(lightboxImage, {
                opacity: 1,
                scale: 1,
                duration: 0.3,
                ease: 'power2.out'
            });
        }
    });
}

// Initialize lightbox event listeners
document.addEventListener('DOMContentLoaded', () => {
    // Close lightbox
    document.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
    document.getElementById('lightbox').addEventListener('click', (e) => {
        if (e.target.id === 'lightbox') closeLightbox();
    });
    
    // Navigation buttons
    document.querySelector('.lightbox-prev').addEventListener('click', () => changeImage('prev'));
    document.querySelector('.lightbox-next').addEventListener('click', () => changeImage('next'));
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (document.getElementById('lightbox').style.display === 'block') {
            if (e.key === 'Escape') closeLightbox();
            if (e.key === 'ArrowLeft') changeImage('prev');
            if (e.key === 'ArrowRight') changeImage('next');
        }
    });
});

// Intersection Observer for lazy loading and animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
        }
    });
}, observerOptions);

// Observe elements for animations
document.querySelectorAll('.producto-card, .gallery-item, .section-title').forEach(el => {
    observer.observe(el);
});

// Parallax effect for hero background
gsap.to('.hero', {
    scrollTrigger: {
        trigger: '.hero',
        start: 'top top',
        end: 'bottom top',
        scrub: true
    },
    backgroundPosition: '50% 100%',
    ease: 'none'
});

// Add loading animation
window.addEventListener('load', () => {
    gsap.to('.loading', {
        duration: 0.5,
        opacity: 0,
        onComplete: () => {
            const loading = document.querySelector('.loading');
            if (loading) loading.remove();
        }
    });
});

// Button click animations
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
        // Create ripple effect
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            border-radius: 50%;
            background: rgba(255,255,255,0.5);
            transform: scale(0);
            animation: ripple 0.6s linear;
            left: ${x}px;
            top: ${y}px;
            width: ${size}px;
            height: ${size}px;
        `;
        
        this.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    });
});

// Add CSS for ripple animation
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .btn {
        position: relative;
        overflow: hidden;
    }
`;
document.head.appendChild(style);

// Update WhatsApp links with admin panel settings
function updateWhatsAppLinks() {
    const whatsappSettings = JSON.parse(localStorage.getItem('whatsappSettings') || '{"number": "5492604201185", "message": "¡Hola! Me interesa hacer un pedido de goma eva 💕"}');
    const whatsappNumber = whatsappSettings.number || '5492604201185';
    const whatsappMessage = whatsappSettings.message || '¡Hola! Me interesa hacer un pedido de goma eva 💕';
    
    // Update all WhatsApp links
    document.querySelectorAll('a[href*="wa.me"]').forEach(link => {
        link.href = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;
    });
}

// Update About Us statistics with admin panel settings
function updateAboutStats() {
    const statsData = JSON.parse(localStorage.getItem('aboutStats') || '{"creaciones": 1000, "clientes": 277}');
    
    // Update the statistics numbers in the DOM
    const creacionesElement = document.querySelector('.stat:nth-child(1) .stat-number');
    const clientesElement = document.querySelector('.stat:nth-child(2) .stat-number');
    
    if (creacionesElement) {
        creacionesElement.textContent = statsData.creaciones + '+';
    }
    if (clientesElement) {
        clientesElement.textContent = statsData.clientes;
    }
}