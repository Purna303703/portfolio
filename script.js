/*
=========================================
  DevOps Portfolio - Interactivity Script
=========================================
*/

document.addEventListener('DOMContentLoaded', () => {

    // 1. Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navLinksItems = document.querySelectorAll('.nav-link');

    hamburger.addEventListener('click', () => {
        // Toggle Navigation Menu
        navLinks.classList.toggle('nav-active');

        // Animate Hamburger icon
        hamburger.classList.toggle('toggle');
    });

    // Close mobile menu when a link is clicked
    navLinksItems.forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('nav-active')) {
                navLinks.classList.remove('nav-active');
                hamburger.classList.remove('toggle');
            }
        });
    });

    // 2. Sticky Navbar & Scroll Styling
    const navbar = document.getElementById('navbar');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 3. Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                // Offset calculation (account for fixed navbar)
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });

    // 4. Scroll Animation (Intersection Observer)
    // Select all elements with the 'fade-in-up' class
    const animationElements = document.querySelectorAll('.fade-in-up');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15 // Trigger when 15% of the element is visible
    };

    const scrollObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: Stop observing once animated
                // observer.unobserve(entry.target);
            } else {
                // Remove to re-animate when scrolling back up (optional)
                entry.target.classList.remove('visible');
            }
        });
    }, observerOptions);

    animationElements.forEach(el => {
        scrollObserver.observe(el);
    });

    // 5. Dynamic Footer Year
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // 6. Custom Cursor Logic
    const cursor = document.querySelector('.cursor');
    const cursorFollower = document.querySelector('.cursor-follower');

    if (cursor && cursorFollower) {
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';

            cursorFollower.style.left = e.clientX + 'px';
            cursorFollower.style.top = e.clientY + 'px';
        });

        const hoverTargets = document.querySelectorAll('a, .btn, .glass-panel, .hamburger');
        hoverTargets.forEach(target => {
            target.addEventListener('mouseenter', () => cursorFollower.classList.add('hover-target'));
            target.addEventListener('mouseleave', () => cursorFollower.classList.remove('hover-target'));
        });
    }

    // 7. Interactive Hover Glow for Cards
    const cards = document.querySelectorAll('.glass-panel');
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });

    // 8. Terminal Preloader & Typewriter Effects
    const preloaderText = "System Initializing...\nModules Loaded...\nAccess Granted.";
    const preloaderElement = document.getElementById('typewriter-preloader');
    const preloaderContainer = document.getElementById('preloader');

    const heroTaglineText = "Automating the Future, one pipeline at a time.";
    const heroTaglineElement = document.getElementById('typewriter-hero');

    function typeWriter(text, element, speed, callback) {
        let i = 0;
        element.innerHTML = "";
        function type() {
            if (i < text.length) {
                // handle newlines for preloader
                element.innerHTML += text.charAt(i) === '\n' ? '<br><span class="prompt">$</span> ' : text.charAt(i);
                i++;
                setTimeout(type, speed);
            } else if (callback) {
                setTimeout(callback, 300);
            }
        }
        type();
    }

    // Start preloader sequence
    if (preloaderElement && preloaderContainer) {
        // Prevent scrolling while preloader is active
        document.body.style.overflow = 'hidden';

        typeWriter(preloaderText, preloaderElement, 30, () => {
            preloaderContainer.classList.add('fade-out');
            setTimeout(() => {
                preloaderContainer.style.display = 'none';
                document.body.style.overflow = 'auto'; // Restore scroll

                if (heroTaglineElement) {
                    typeWriter(heroTaglineText, heroTaglineElement, 50);
                }
            }, 1000);
        });
    } else if (heroTaglineElement) {
        typeWriter(heroTaglineText, heroTaglineElement, 50);
    }

    // 9. Starfield Canvas Animation
    const canvas = document.getElementById('starfield');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let width, height;
        let stars = [];

        function resize() {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;
            initStars();
        }

        function initStars() {
            stars = [];
            // Dynamically adjust star count based on screen size
            const numStars = window.innerWidth < 768 ? 250 : 500;
            for (let i = 0; i < numStars; i++) {
                stars.push({
                    x: Math.random() * width,
                    y: Math.random() * height,
                    radius: Math.random() * 1.5 + 0.5,
                    speedY: Math.random() * 0.5 + 0.1, // Moving up slowly
                    speedX: (Math.random() - 0.5) * 0.2, // Slight horizontal drift
                    opacity: Math.random() * 0.6 + 0.2
                });
            }
        }

        function drawStars() {
            ctx.clearRect(0, 0, width, height);

            stars.forEach(star => {
                ctx.beginPath();
                ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
                ctx.fill();

                // Move stars
                star.y -= star.speedY;
                star.x -= star.speedX;

                // Reset star if it goes off screen
                if (star.y < 0) {
                    star.y = height;
                    star.x = Math.random() * width;
                }
                if (star.x < 0) {
                    star.x = width;
                } else if (star.x > width) {
                    star.x = 0;
                }
            });

            requestAnimationFrame(drawStars);
        }

        window.addEventListener('resize', resize);
        resize(); // Initialize sizes and stars
        drawStars(); // Start animation loop
    }

});
