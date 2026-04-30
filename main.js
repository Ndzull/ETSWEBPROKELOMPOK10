window.onscroll = function() {
    var navbar = document.getElementById("mainNavbar");
    if (window.pageYOffset > 100) { // Jika scroll lebih dari 100px
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }
};


    document.addEventListener("DOMContentLoaded", function() {
    const toggler = document.querySelector(".navbar-toggler");
    const navContent = document.querySelector("#navContent");
    const navbarSection = document.querySelector(".navbar-section");

        // ham click
        toggler.addEventListener("click", function(e) {
            e.stopPropagation(); 
            // Toggle class CSS yang kita buat tadi
            navContent.classList.toggle("active-side-menu");
        });

        // 2. LOGIKA SCROLL (Ganti State Navbar)
        window.onscroll = function() {
            if (window.pageYOffset > 50) {
                navbarSection.classList.add("scrolled");
            } else {
                navbarSection.classList.remove("scrolled");
                // Opsional: Tutup menu side-bar kalau user scroll balik ke atas
                navContent.classList.remove("active-side-menu");
            }
        };

        // 3. LOGIKA KLIK DI LUAR MENU (Tutup otomatis)
        document.addEventListener("click", function(event) {
            const isClickInside = navContent.contains(event.target) || toggler.contains(event.target);

            if (!isClickInside) {
                navContent.classList.remove("active-side-menu");
            }
        });
    });

document.addEventListener("DOMContentLoaded", function() {
    // Gunakan selector yang spesifik ke .section-tiga agar tidak salah ambil elemen lain
    const sectionTiga = document.querySelector('.section-tiga');
    const slider = sectionTiga.querySelector('.slider');
    const slides = sectionTiga.querySelectorAll('.slide');
    const prevBtn = sectionTiga.querySelector('.prev');
    const nextBtn = sectionTiga.querySelector('.next');
    const dots = sectionTiga.querySelectorAll('.dot');
    const sliderContainer = sectionTiga.querySelector('.slider-container');

    let currentIndex = 0;
    let autoSlideInterval;

    // 1. Fungsi Update Dots (Indikator Titik)
    function updateDots() {
        dots.forEach((dot, index) => {
            if (index === currentIndex) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }

    // 2. Fungsi Utama Tampilan Slide
    function showSlides(index) {
        if (index >= slides.length) {
            currentIndex = 0; // Balik ke awal
        } else if (index < 0) {
            currentIndex = slides.length - 1; // Ke slide terakhir
        } else {
            currentIndex = index;
        }
        
        slider.style.transform = `translateX(-${currentIndex * 100}%)`;
        updateDots();
    }

    function nextSlide() {
        showSlides(currentIndex + 1);
    }

    function prevSlide() {
        showSlides(currentIndex - 1);
    }

    function startAutoSlide() {
        stopAutoSlide(); 
        autoSlideInterval = setInterval(nextSlide, 4000);
    }

    function stopAutoSlide() {
        clearInterval(autoSlideInterval);
    }

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showSlides(index);
            startAutoSlide(); 
        });
    });

    nextBtn.addEventListener('click', () => {
        nextSlide();
        startAutoSlide();
    });

    prevBtn.addEventListener('click', () => {
        prevSlide();
        startAutoSlide();
    });

    sliderContainer.addEventListener('mouseenter', stopAutoSlide);
    sliderContainer.addEventListener('mouseleave', startAutoSlide);

    showSlides(currentIndex);
    startAutoSlide();
});