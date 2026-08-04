document.addEventListener("DOMContentLoaded", () => {
    
    /* ANIMATED STARS BACKGROUND */
    const canvas = document.getElementById('starsCanvas');
    const ctx = canvas.getContext('2d');

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const starsArray = [];
    const numberOfStars = 200; 

    class Star {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2.0 + 0.5; 
            this.speedY = Math.random() * 0.5 + 0.15; 
            this.opacity = Math.random() * 0.85 + 0.15;
            this.fadeDirection = Math.random() > 0.5 ? 0.015 : -0.015;
        }
        draw() {
            ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
        update() {
            this.y -= this.speedY;
            this.opacity += this.fadeDirection;
            if (this.opacity > 1 || this.opacity < 0.15) {
                this.fadeDirection = -this.fadeDirection;
            }
            if (this.y < 0) {
                this.y = canvas.height;
                this.x = Math.random() * canvas.width;
            }
        }
    }

    for (let i = 0; i < numberOfStars; i++) {
        starsArray.push(new Star());
    }

    function animateStars() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let i = 0; i < starsArray.length; i++) {
            starsArray[i].update();
            starsArray[i].draw();
        }
        requestAnimationFrame(animateStars);
    }
    animateStars();

    /* NAVBAR STABILITY */
    const header = document.querySelector("header");
    window.addEventListener("scroll", () => {
        if (window.scrollY > 60) {
            header.style.background = "rgba(3,5,12,.88)";
        } else {
            header.style.background = "rgba(3,5,12,.65)";
        }
    });

    /* MOBILE MENU TOGGLE */
    const hamburger = document.querySelector(".hamburger");
    const navLinks = document.querySelector(".nav-links");
    if (hamburger) {
        hamburger.addEventListener("click", () => {
            navLinks.style.display = navLinks.style.display === "flex" ? "none" : "flex";
            navLinks.style.flexDirection = "column";
            navLinks.style.position = "absolute";
            navLinks.style.top = "85px";
            navLinks.style.left = "0";
            navLinks.style.width = "100%";
            navLinks.style.background = "rgba(3,5,12,.96)";
            navLinks.style.padding = "20px";
            navLinks.style.gap = "20px";
        });
    }

    document.querySelectorAll(".nav-links a").forEach(link => {
        link.addEventListener("click", () => {
            if(window.innerWidth <= 768) {
                navLinks.style.display = "none";
            }
        });
    });

    /* AUDIO PLAYER */
    const playBtn = document.getElementById("play-intro-btn");
    const audio = document.getElementById("intro-audio");

    if (playBtn && audio) {
        playBtn.addEventListener("click", () => {
            if (audio.paused) {
                audio.play();
                playBtn.innerHTML = `<i class="fa-solid fa-circle-pause"></i> Pause Introduction`;
            } else {
                audio.pause();
                playBtn.innerHTML = `<i class="fa-solid fa-circle-play"></i> Watch Introduction`;
            }
        });

        audio.addEventListener("ended", () => {
            playBtn.innerHTML = `<i class="fa-solid fa-circle-play"></i> Watch Introduction`;
        });
    }

    /* FLOATING TERMINAL WIDGET CONTROLLER */
    const toggleBtn = document.getElementById("toggle-term-btn");
    const closeBtn = document.getElementById("close-term-btn");
    const termPopup = document.getElementById("terminal-popup");
    const termInput = document.getElementById("terminal-input");
    const termOutput = document.getElementById("terminal-output");
    const termBody = document.getElementById("terminal-body");

    if (toggleBtn && termPopup) {
        toggleBtn.addEventListener("click", () => {
            termPopup.classList.toggle("open");
            if (termPopup.classList.contains("open")) {
                setTimeout(() => termInput.focus(), 300);
            }
        });

        closeBtn.addEventListener("click", () => {
            termPopup.classList.remove("open");
        });
    }

    if (termInput && termOutput) {
        termInput.addEventListener("keydown", (e) => {
            if (e.key === "Enter") {
                const command = termInput.value.trim().toLowerCase();
                
                const cmdLine = document.createElement("div");
                cmdLine.className = "term-line";
                cmdLine.innerHTML = `<span class="term-green">purna@devops-node</span>:<span class="term-blue">~</span>$&nbsp;${termInput.value}`;
                termOutput.appendChild(cmdLine);

                let response = "";
                switch (command) {
                    case "help":
                        response = `<p class="term-line term-gray">Available Commands:</p>
                                    <p class="term-line"> 🔹 <span class="term-yellow">about</span> - Who is Purnachandra Rao?</p>
                                    <p class="term-line"> 🔹 <span class="term-yellow">skills</span> - Core DevOps & Cloud tools</p>
                                    <p class="term-line"> 🔹 <span class="term-yellow">projects</span> - View CI/CD projects</p>
                                    <p class="term-line"> 🔹 <span class="term-yellow">future</span> - Upcoming project roadmap</p>
                                    <p class="term-line"> 🔹 <span class="term-yellow">contact</span> - Get email & social links</p>
                                    <p class="term-line"> 🔹 <span class="term-yellow">clear</span> - Clear output</p>`;
                        break;
                    case "about":
                        response = `<p class="term-line">Aspiring DevOps & Cloud Engineer specializing in AWS, Infrastructure as Code, CI/CD, and Containerization.</p>`;
                        break;
                    case "skills":
                        response = `<p class="term-line">🛠️ <span class="term-blue">Tools:</span> AWS, Docker, k8s, Jenkins, Terraform, Ansible, Linux, Git, GitHub, Maven, SonarQube, Python, JFrog</p>`;
                        break;
                    case "projects":
                        response = `<p class="term-line">🚀 <span class="term-yellow">End-to-End CI/CD:</span> AWS + Terraform + Ansible + Jenkins + Maven + Tomcat</p>`;
                        break;
                    case "future":
    response = `<p class="term-line">📌 <span class="term-yellow">Cloud Native CI/CD:</span> AWS + Terraform + Jenkins + Docker + K8s</p>
                <p class="term-line">🛡️ <span class="term-yellow">DevSecOps Security:</span> Trivy + SonarQube + Security Scanning</p>
                <p class="term-line">🤖 <span class="term-yellow">AIOps Initiative:</span> Prometheus + Grafana + AI/ML Observability</p>`;
    break;    
                    case "contact":
    response = `<p class="term-line">📧 Email: <a href="mailto:chandraraop698@gmail.com" style="color:#00D9FF; text-decoration:underline;">chandraraop698@gmail.com</a></p>
                <p class="term-line">📞 Phone: <a href="tel:6302613398" style="color:#00D9FF; text-decoration:underline;">+91 6302613398</a></p>
                <p class="term-line">🔗 GitHub: <a href="https://github.com/Purna303703" target="_blank" style="color:#00D9FF; text-decoration:underline;">github.com/Purna303703</a></p>
                <p class="term-line">📸 Instagram: <a href="https://www.instagram.com/purna___pubg___lover/" target="_blank" style="color:#00D9FF; text-decoration:underline;">purna___pubg___lover</a></p>`;
    break;
                    case "clear":
                        termOutput.innerHTML = "";
                        termInput.value = "";
                        return;
                    case "":
                        response = "";
                        break;
                    default:
                        response = `<p class="term-line" style="color:#FF5F56;">Command not found: '${command}'. Type <span class="term-yellow">'help'</span> for options.</p>`;
                }

                if (response) {
                    const resDiv = document.createElement("div");
                    resDiv.innerHTML = response;
                    termOutput.appendChild(resDiv);
                }

                termInput.value = "";
                termBody.scrollTop = termBody.scrollHeight;
            }
        });
    }
});

/* PRELOADER CONTROLLER */
document.addEventListener("DOMContentLoaded", () => {
    const preloader = document.getElementById("intro-preloader");
    setTimeout(() => {
        if (preloader) {
            preloader.classList.add("fade-away");
        }
    }, 2500); 
});