 document.addEventListener('DOMContentLoaded', function() {
     // Preloader
     window.addEventListener('load', function() {
         setTimeout(function() {
             document.getElementById('preloader').style.opacity = '0';
             document.getElementById('preloader').style.visibility = 'hidden';
         }, 1000);
     });

     // Theme Toggling System
     const themeToggle = document.getElementById('theme-toggle');
     const themeToggleMobile = document.getElementById('theme-toggle-mobile');
     const themeIcon = document.getElementById('theme-icon');
     const themeIconMobile = document.getElementById('theme-icon-mobile');
     const html = document.documentElement;

     // Check for saved theme preference or use preferred color scheme
     const savedTheme = localStorage.getItem('theme') ||
         (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

     // Apply the saved or preferred theme
     html.setAttribute('data-theme', savedTheme);
     updateThemeIcons(savedTheme);

     // Toggle theme function
     function toggleTheme() {
         const currentTheme = html.getAttribute('data-theme');
         const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

         // Apply new theme
         html.setAttribute('data-theme', newTheme);
         localStorage.setItem('theme', newTheme);

         // Update icons
         updateThemeIcons(newTheme);

         // Add animation class
         themeIcon.classList.add('animate-theme-switch');
         themeIconMobile.classList.add('animate-theme-switch');

         // Remove animation class after animation completes
         setTimeout(() => {
             themeIcon.classList.remove('animate-theme-switch');
             themeIconMobile.classList.remove('animate-theme-switch');
         }, 500);
     }

     // Update theme icons based on current theme
     function updateThemeIcons(theme) {
         if (theme === 'dark') {
             themeIcon.className = 'fas fa-sun';
             themeIconMobile.className = 'fas fa-sun';
         } else {
             themeIcon.className = 'fas fa-moon';
             themeIconMobile.className = 'fas fa-moon';
         }
     }

     // Event listeners for theme toggles
     themeToggle.addEventListener('click', toggleTheme);
     themeToggleMobile.addEventListener('click', toggleTheme);

     // Mobile menu functionality
     const mobileMenuButton = document.getElementById('mobile-menu-button');
     const mobileMenu = document.getElementById('mobile-menu');
     const mobileMenuClose = document.getElementById('mobile-menu-close');

     mobileMenuButton.addEventListener('click', function() {
         mobileMenu.classList.remove('opacity-0', 'invisible');
         mobileMenu.classList.add('opacity-100', 'visible');
         document.body.style.overflow = 'hidden';

         // Animate hamburger to X
         const spans = mobileMenuButton.querySelectorAll('span');
         spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
         spans[1].style.opacity = '0';
         spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
     });

     mobileMenuClose.addEventListener('click', function() {
         mobileMenu.classList.remove('opacity-100', 'visible');
         mobileMenu.classList.add('opacity-0', 'invisible');
         document.body.style.overflow = 'auto';

         // Animate X back to hamburger
         const spans = mobileMenuButton.querySelectorAll('span');
         spans[0].style.transform = '';
         spans[1].style.opacity = '';
         spans[2].style.transform = '';
     });

     // Close mobile menu when clicking a link
     document.querySelectorAll('#mobile-menu a').forEach(link => {
         link.addEventListener('click', function() {
             mobileMenu.classList.remove('opacity-100', 'visible');
             mobileMenu.classList.add('opacity-0', 'invisible');
             document.body.style.overflow = 'auto';

             // Animate X back to hamburger
             const spans = mobileMenuButton.querySelectorAll('span');
             spans[0].style.transform = '';
             spans[1].style.opacity = '';
             spans[2].style.transform = '';
         });
     });

     // Initialize GSAP animations
     gsap.registerPlugin(ScrollTrigger);

     // Animate elements on scroll
     gsap.utils.toArray('[data-aos]').forEach(element => {
         const animation = element.getAttribute('data-aos');
         const delay = element.getAttribute('data-aos-delay') || 0;

         gsap.from(element, {
             scrollTrigger: {
                 trigger: element,
                 start: "top 80%",
                 toggleActions: "play none none none"
             },
             opacity: 0,
             y: animation.includes('up') ? 50 : animation.includes('down') ? -50 : 0,
             duration: 1,
             delay: parseFloat(delay),
             ease: "power3.out"
         });
     });

     // Initialize Splide slider
     new Splide('#testimonials-slider', {
         type: 'loop',
         perPage: 1,
         autoplay: true,
         interval: 5000,
         pauseOnHover: true,
         arrows: false,
         pagination: false,
         classes: {
             pagination: 'splide__pagination splide-pagination',
             page: 'splide__pagination__page splide-page'
         }
     }).mount();

     // Sticky navigation on scroll
     window.addEventListener('scroll', function() {
         const navbar = document.getElementById('navbar');
         const backToTop = document.getElementById('back-to-top');

         if (window.scrollY > 100) {
             navbar.classList.add('shadow-lg', 'py-4');
             navbar.classList.remove('py-6');
         } else {
             navbar.classList.remove('shadow-lg', 'py-4');
             navbar.classList.add('py-6');
         }

         // Show/hide back to top button
         if (window.scrollY > 300) {
             backToTop.classList.remove('opacity-0', 'invisible');
             backToTop.classList.add('opacity-100', 'visible');
         } else {
             backToTop.classList.remove('opacity-100', 'visible');
             backToTop.classList.add('opacity-0', 'invisible');
         }
     });

     // Menu filtering
     const menuFilters = document.querySelectorAll('.menu-filter');
     const menuItems = document.querySelectorAll('.menu-item');

     menuFilters.forEach(filter => {
         filter.addEventListener('click', function() {
             // Remove active class from all buttons
             menuFilters.forEach(btn => btn.classList.remove('active', 'bg-primary', 'text-secondary'));
             menuFilters.forEach(btn => btn.classList.add('hover:bg-gray-800'));

             // Add active class to clicked button
             this.classList.add('active', 'bg-primary', 'text-secondary');
             this.classList.remove('hover:bg-gray-800');

             const filterValue = this.getAttribute('data-filter');

             menuItems.forEach(item => {
                 if (filterValue === '*' || item.classList.contains(filterValue.substring(1))) {
                     item.style.display = 'block';
                 } else {
                     item.style.display = 'none';
                 }
             });
         });
     });

     // Gallery lightbox
     const galleryItems = document.querySelectorAll('.gallery-item');
     const lightbox = document.createElement('div');
     lightbox.className = 'fixed inset-0 w-full h-full bg-black/90 z-[999] flex items-center justify-center p-4 hidden';
     lightbox.innerHTML = `
                <div class="relative max-w-4xl w-full">
                    <img id="lightbox-img" src="" alt="" class="w-full h-auto max-h-[90vh] object-contain">
                    <button class="absolute -top-12 right-0 text-3xl text-white hover:text-primary transition-colors duration-300" id="lightbox-close">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
            `;
     document.body.appendChild(lightbox);

     const lightboxImg = document.getElementById('lightbox-img');
     const lightboxClose = document.getElementById('lightbox-close');

     galleryItems.forEach(item => {
         item.addEventListener('click', function() {
             const imgSrc = this.querySelector('img').src;
             const imgAlt = this.querySelector('img').alt;

             lightboxImg.src = imgSrc;
             lightboxImg.alt = imgAlt;
             lightbox.classList.remove('hidden');
             document.body.style.overflow = 'hidden';
         });
     });

     lightboxClose.addEventListener('click', function() {
         lightbox.classList.add('hidden');
         document.body.style.overflow = 'auto';
     });

     lightbox.addEventListener('click', function(e) {
         if (e.target === lightbox) {
             lightbox.classList.add('hidden');
             document.body.style.overflow = 'auto';
         }
     });


     // Add active class to current section
     document.addEventListener('DOMContentLoaded', function() {
         const sections = document.querySelectorAll('section');
         const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');

         window.addEventListener('scroll', function() {
             let current = '';

             sections.forEach(section => {
                 const sectionTop = section.offsetTop;
                 const sectionHeight = section.clientHeight;

                 if (pageYOffset >= (sectionTop - 300)) {
                     current = section.getAttribute('id');
                 }
             });

             navLinks.forEach(link => {
                 link.classList.remove('active');
                 if (link.getAttribute('href') === `#${current}`) {
                     link.classList.add('active');
                 }
             });
         });
     });

     // Form submission
     const forms = document.querySelectorAll('form');

     forms.forEach(form => {
         form.addEventListener('submit', function(e) {
             e.preventDefault();

             // Here you would typically send the form data to a server
             // For demonstration, we'll just show a success message

             const formData = new FormData(this);
             const formName = this.classList.contains('reservation__form') ? 'Reservation' : 'Newsletter';

             // Simulate form submission
             setTimeout(() => {
                 alert(`${formName} form submitted successfully!`);
                 this.reset();
             }, 1000);
         });
     });
 });