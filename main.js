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



function toggleChat() {
    const chatbox = document.getElementById('aiChatbox');
    chatbox.classList.toggle('active');
}

function sendMessage() {
    const input = document.getElementById('userInput');
    const chatBody = document.getElementById('chatBody');
    
    if (input.value.trim() !== "") {
        chatBody.innerHTML += `<div class="msg user-msg">${input.value}</div>`;
        
        const userText = input.value;
        input.value = "";
        
        chatBody.scrollTop = chatBody.scrollHeight;

        setTimeout(() => {
            chatBody.innerHTML += `<div class="msg ai-msg">Analisis saya untuk "${userText}" sedang diproses...</div>`;
            chatBody.scrollTop = chatBody.scrollHeight;
        }, 800);
    }
}

document.getElementById('userInput')?.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        sendMessage();
    }
});


// AI ANJAYYYYYYYY
const API_KEY = "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";
const API_URL = "https://api.groq.com/openai/v1/chat/completions";

function toggleChat() {
    const chatbox = document.getElementById('aiChatbox');
    if (chatbox) {
        chatbox.classList.toggle('active');
    } else {
        console.error("Elemen aiChatbox gak ketemu!");
    }
}

async function sendMessage() {
    const input = document.getElementById('userInput');
    const chatBody = document.getElementById('chatBody');
    
    if (!input || !chatBody) return;
    const userText = input.value.trim();
    
    if (userText !== "") {
        chatBody.innerHTML += `<div class="msg user-msg">${userText}</div>`;
        input.value = "";
        chatBody.scrollTop = chatBody.scrollHeight;

        const loadingId = "loading-" + Date.now();
        chatBody.innerHTML += `<div class="msg ai-msg" id="${loadingId}">...</div>`;
        chatBody.scrollTop = chatBody.scrollHeight;

        try {
            const response = await fetch(API_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + API_KEY  
                },
                body: JSON.stringify({
                    model: "llama-3.1-8b-instant", 
                    messages: [
                        { role: "system", content: "Kamu adalah asisten STATtion. Jawab singkat." },
                        { role: "user", content: userText }
                    ]
                })
            });

            const data = await response.json();
            
            if (data.error) {
                document.getElementById(loadingId).innerText = "Error API: " + data.error.message;
            } else {
                const aiResponse = data.choices[0].message.content; 
                document.getElementById(loadingId).innerText = aiResponse;
            }

        } catch (error) {
            document.getElementById(loadingId).innerText = "Koneksi gagal. Cek internet atau API Key.";
        }
        chatBody.scrollTop = chatBody.scrollHeight;
    }
}