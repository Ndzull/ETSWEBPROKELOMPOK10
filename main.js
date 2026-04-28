window.onscroll = function() {
    var navbar = document.getElementById("mainNavbar");
    if (window.pageYOffset > 100) { // Jika scroll lebih dari 100px
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }
};