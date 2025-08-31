// Gallery Test - GSAP Animations for Creaciones AMI
gsap.registerPlugin(ScrollTrigger);

// Media files from Creaciones AMI
const images = [
    'assets/gallery/495481936_17869546068360446_4321890648862777476_n.webp',
    'assets/gallery/500252526_17871779073360446_7923867554632101391_n.webp',
    'assets/gallery/500424849_17871779412360446_7347147921063245909_n.webp',
    'assets/gallery/515820675_17877820587360446_2413955756290613320_n.webp',
    'assets/gallery/517721253_17878137654360446_5927085289899163555_n.webp',
    'assets/gallery/526301283_17880956070360446_9076310641475082024_n.webp',
    'assets/gallery/526392698_17880956067360446_2314655669405267939_n.webp',
    'assets/gallery/530131363_9807231139376682_7453633927600914888_n.heic',
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

// Initialize all galleries when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initGallery1();
    initGallery2();
    initGallery3();
    initGallery4();
    initVideoGallery1();
    initVideoGallery2();
    initVideoGallery3();
    initVideoGallery4();
});

// Gallery 1: Fade & Scale Images
function initGallery1() {
    const container = document.getElementById('gallery1');
    
    images.slice(0, 6).forEach((src, index) => {
        const item = document.createElement('div');
        item.className = 'item';
        item.innerHTML = `<img src="${src}" alt="Creación AMI ${index + 1}" loading="lazy">`;
        container.appendChild(item);
    });

    // GSAP Animation
    gsap.set('.gallery-1 .item', { opacity: 0, scale: 0 });
    
    gsap.to('.gallery-1 .item', {
        scrollTrigger: {
            trigger: '.gallery-1',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        },
        opacity: 1,
        scale: 1,
        duration: 0.8,
        stagger: 0.2,
        ease: 'back.out(1.7)'
    });

    // Hover animations
    document.querySelectorAll('.gallery-1 .item').forEach(item => {
        item.addEventListener('mouseenter', () => {
            gsap.to(item, { scale: 1.05, duration: 0.3 });
            gsap.to(item.querySelector('img'), { scale: 1.1, duration: 0.3 });
        });

        item.addEventListener('mouseleave', () => {
            gsap.to(item, { scale: 1, duration: 0.3 });
            gsap.to(item.querySelector('img'), { scale: 1, duration: 0.3 });
        });
    });
}

// Gallery 2: Masonry Layout
function initGallery2() {
    const container = document.getElementById('gallery2');
    
    images.slice(0, 8).forEach((src, index) => {
        const item = document.createElement('div');
        item.className = 'item';
        item.innerHTML = `<img src="${src}" alt="Creación AMI ${index + 1}" loading="lazy">`;
        container.appendChild(item);
    });

    // GSAP Animation
    gsap.set('.gallery-2 .item', { opacity: 0, y: 100 });
    
    gsap.to('.gallery-2 .item', {
        scrollTrigger: {
            trigger: '.gallery-2',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        },
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power2.out'
    });
}

// Gallery 3: Circular Reveal
function initGallery3() {
    const container = document.getElementById('gallery3');
    
    images.slice(0, 6).forEach((src, index) => {
        const item = document.createElement('div');
        item.className = 'item';
        item.innerHTML = `<img src="${src}" alt="Creación AMI ${index + 1}" loading="lazy">`;
        container.appendChild(item);
    });

    // GSAP Animation
    gsap.set('.gallery-3 .item', { clipPath: 'circle(0% at 50% 50%)', opacity: 0 });
    
    gsap.to('.gallery-3 .item', {
        scrollTrigger: {
            trigger: '.gallery-3',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        },
        clipPath: 'circle(100% at 50% 50%)',
        opacity: 1,
        duration: 1,
        stagger: 0.3,
        ease: 'power2.inOut'
    });

    // Click to expand
    document.querySelectorAll('.gallery-3 .item').forEach(item => {
        item.addEventListener('click', () => {
            gsap.to(item, {
                scale: 1.5,
                zIndex: 1000,
                duration: 0.5,
                ease: 'power2.out'
            });
            
            setTimeout(() => {
                gsap.to(item, {
                    scale: 1,
                    zIndex: 'auto',
                    duration: 0.5,
                    ease: 'power2.out'
                });
            }, 2000);
        });
    });
}

// Gallery 4: Staggered Cards
function initGallery4() {
    const container = document.getElementById('gallery4');
    
    images.slice(0, 6).forEach((src, index) => {
        const item = document.createElement('div');
        item.className = 'item';
        item.innerHTML = `<img src="${src}" alt="Creación AMI ${index + 1}" loading="lazy">`;
        container.appendChild(item);
    });

    // GSAP Animation
    gsap.to('.gallery-4 .item', {
        scrollTrigger: {
            trigger: '.gallery-4',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        },
        rotateY: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out'
    });
}

// Video Gallery 1: Play Button Overlay
function initVideoGallery1() {
    const container = document.getElementById('videoGallery1');
    
    videos.slice(0, 4).forEach((src, index) => {
        const item = document.createElement('div');
        item.className = 'video-item';
        item.innerHTML = `
            <video src="${src}" muted preload="metadata" poster="">
            <div class="play-button">▶</div>
        `;
        container.appendChild(item);
        
        // Play video on click
        const video = item.querySelector('video');
        const playBtn = item.querySelector('.play-button');
        
        playBtn.addEventListener('click', () => {
            if (video.paused) {
                video.play();
                gsap.to(playBtn, { opacity: 0, duration: 0.3 });
            } else {
                video.pause();
                gsap.to(playBtn, { opacity: 1, duration: 0.3 });
            }
        });
        
        video.addEventListener('ended', () => {
            gsap.to(playBtn, { opacity: 1, duration: 0.3 });
        });
    });

    // GSAP Animation
    gsap.set('.video-gallery-1 .video-item', { opacity: 0, scale: 0.5 });
    
    gsap.to('.video-gallery-1 .video-item', {
        scrollTrigger: {
            trigger: '.video-gallery-1',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        },
        opacity: 1,
        scale: 1,
        duration: 0.6,
        stagger: 0.2,
        ease: 'back.out(1.7)'
    });
}

// Video Gallery 2: Thumbnail Preview
function initVideoGallery2() {
    const mainVideo = document.getElementById('mainVideo');
    const thumbnailContainer = document.getElementById('thumbnails');
    
    // Set first video as main
    mainVideo.src = videos[0];
    
    videos.forEach((src, index) => {
        const thumb = document.createElement('video');
        thumb.className = `thumb ${index === 0 ? 'active' : ''}`;
        thumb.src = src;
        thumb.muted = true;
        thumb.preload = 'metadata';
        
        thumb.addEventListener('click', () => {
            mainVideo.src = src;
            
            // Update active thumbnail
            document.querySelectorAll('.thumb').forEach(t => t.classList.remove('active'));
            thumb.classList.add('active');
            
            // Animation
            gsap.fromTo(mainVideo, 
                { opacity: 0, scale: 0.8 }, 
                { opacity: 1, scale: 1, duration: 0.5 }
            );
        });
        
        thumbnailContainer.appendChild(thumb);
    });

    // GSAP Animation for thumbnails
    gsap.set('.thumbnails .thumb', { opacity: 0, y: 50 });
    
    gsap.to('.thumbnails .thumb', {
        scrollTrigger: {
            trigger: '.video-gallery-2',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        },
        opacity: 1,
        y: 0,
        duration: 0.4,
        stagger: 0.1,
        ease: 'power2.out'
    });
}

// Video Gallery 3: Carousel
function initVideoGallery3() {
    const track = document.getElementById('carouselTrack');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    let currentIndex = 0;
    
    videos.slice(0, 5).forEach((src, index) => {
        const slide = document.createElement('div');
        slide.className = 'carousel-slide';
        slide.innerHTML = `<video src="${src}" muted loop autoplay preload="metadata">`;
        track.appendChild(slide);
    });

    const totalSlides = track.children.length;
    
    function updateCarousel() {
        gsap.to(track, {
            x: -currentIndex * 100 + '%',
            duration: 0.6,
            ease: 'power2.inOut'
        });
    }
    
    nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % totalSlides;
        updateCarousel();
    });
    
    prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
        updateCarousel();
    });

    // Auto-advance carousel
    setInterval(() => {
        currentIndex = (currentIndex + 1) % totalSlides;
        updateCarousel();
    }, 5000);
}

// Video Gallery 4: Grid with Hover
function initVideoGallery4() {
    const container = document.getElementById('videoGallery4');
    
    videos.slice(0, 4).forEach((src, index) => {
        const item = document.createElement('div');
        item.className = 'video-item';
        item.innerHTML = `
            <video src="${src}" muted loop preload="metadata">
            <div class="overlay">
                <div style="color: white; text-align: center;">
                    <div style="font-size: 2rem;">▶</div>
                    <div>Ver Video</div>
                </div>
            </div>
        `;
        container.appendChild(item);
        
        // Play on hover
        const video = item.querySelector('video');
        item.addEventListener('mouseenter', () => {
            video.play();
        });
        
        item.addEventListener('mouseleave', () => {
            video.pause();
        });
    });

    // GSAP Animation
    gsap.to('.video-gallery-4 .video-item', {
        scrollTrigger: {
            trigger: '.video-gallery-4',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        },
        scale: 1,
        duration: 0.8,
        stagger: 0.2,
        ease: 'elastic.out(1, 0.8)'
    });
}

// Smooth scrolling between sections
document.querySelectorAll('.section h2').forEach(heading => {
    heading.style.cursor = 'pointer';
    heading.addEventListener('click', () => {
        gsap.to(window, {
            duration: 1,
            scrollTo: heading.closest('.section'),
            ease: 'power2.inOut'
        });
    });
});