const cursor = document.querySelector('.cursor');
        let mouseX = window.innerWidth / 2;
        let mouseY = window.innerHeight / 2;
        let cursorX = mouseX;
        let cursorY = mouseY;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });

        document.addEventListener('mousedown', () => cursor.classList.add('active'));
        document.addEventListener('mouseup', () => cursor.classList.remove('active'));

        function animateCursor() {
            cursorX += (mouseX - cursorX) * 0.15;
            cursorY += (mouseY - cursorY) * 0.15;
            cursor.style.left = cursorX - 10 + 'px';
            cursor.style.top = cursorY - 10 + 'px';
            requestAnimationFrame(animateCursor);
        }
        animateCursor();

        // Logo interaction with magnetic effect
        const logoChars = document.querySelectorAll('.logo-char');
        const logo = document.getElementById('logo');
        
        document.addEventListener('mousemove', (e) => {
            const rect = logo.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            
            logoChars.forEach((char, index) => {
                const charRect = char.getBoundingClientRect();
                const charCenterX = charRect.left + charRect.width / 2;
                const charCenterY = charRect.top + charRect.height / 2;
                
                const deltaX = e.clientX - charCenterX;
                const deltaY = e.clientY - charCenterY;
                const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
                
                if (distance < 200) {
                    const force = (200 - distance) / 200;
                    const moveX = deltaX * force * 0.2;
                    const moveY = deltaY * force * 0.2;
                    const rotate = (index - 2) * force * 5;
                    char.style.transform = `translate(${moveX}px, ${moveY}px) rotate(${rotate}deg) scale(${1 + force * 0.1})`;
                } else {
                    char.style.transform = 'translate(0, 0) rotate(0deg) scale(1)';
                }
            });
        });

        // Fluid simulation
        const fluidCanvas = document.getElementById('fluid-canvas');
        const fluidCtx = fluidCanvas.getContext('2d');
        fluidCanvas.width = window.innerWidth;
        fluidCanvas.height = window.innerHeight;

        const particles = [];
        const particleCount = 100;

        class FluidParticle {
            constructor() {
                this.x = Math.random() * fluidCanvas.width;
                this.y = Math.random() * fluidCanvas.height;
                this.vx = (Math.random() - 0.5) * 0.5;
                this.vy = (Math.random() - 0.5) * 0.5;
                this.radius = Math.random() * 2 + 1;
                this.life = Math.random();
            }

            update() {
                this.x += this.vx;
                this.y += this.vy;

                // Mouse interaction
                const dx = mouseX - this.x;
                const dy = mouseY - this.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                
                if (dist < 150) {
                    const force = (150 - dist) / 150;
                    this.vx += dx * force * 0.01;
                    this.vy += dy * force * 0.01;
                }

                // Damping
                this.vx *= 0.99;
                this.vy *= 0.99;

                // Boundaries
                if (this.x < 0 || this.x > fluidCanvas.width) this.vx *= -1;
                if (this.y < 0 || this.y > fluidCanvas.height) this.vy *= -1;

                this.life += 0.001;
                if (this.life > 1) this.life = 0;
            }

            draw() {
                fluidCtx.beginPath();
                fluidCtx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                const hue = (this.life * 60 + 180) % 360;
                fluidCtx.fillStyle = `hsla(${hue}, 70%, 60%, ${0.3 + this.life * 0.3})`;
                fluidCtx.fill();
            }
        }

        // Initialize particles
        for (let i = 0; i < particleCount; i++) {
            particles.push(new FluidParticle());
        }

        function animateFluid() {
            fluidCtx.fillStyle = 'rgba(0, 0, 0, 0.05)';
            fluidCtx.fillRect(0, 0, fluidCanvas.width, fluidCanvas.height);

            // Draw connections
            particles.forEach((p1, i) => {
                particles.slice(i + 1).forEach(p2 => {
                    const dx = p1.x - p2.x;
                    const dy = p1.y - p2.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    
                    if (dist < 100) {
                        fluidCtx.beginPath();
                        fluidCtx.moveTo(p1.x, p1.y);
                        fluidCtx.lineTo(p2.x, p2.y);
                        const alpha = (100 - dist) / 100 * 0.2;
                        fluidCtx.strokeStyle = `rgba(100, 200, 255, ${alpha})`;
                        fluidCtx.lineWidth = 0.5;
                        fluidCtx.stroke();
                    }
                });
            });

            particles.forEach(particle => {
                particle.update();
                particle.draw();
            });

            requestAnimationFrame(animateFluid);
        }
        animateFluid();

        // Displacement effect
        const dispCanvas = document.getElementById('displacement-canvas');
        const dispCtx = dispCanvas.getContext('2d');
        dispCanvas.width = window.innerWidth;
        dispCanvas.height = window.innerHeight;

        let time = 0;
        function animateDisplacement() {
            dispCtx.clearRect(0, 0, dispCanvas.width, dispCanvas.height);
            
            const gradient = dispCtx.createRadialGradient(
                mouseX, mouseY, 0,
                mouseX, mouseY, 300
            );
            
            gradient.addColorStop(0, `rgba(0, 255, 200, ${0.3 + Math.sin(time * 0.05) * 0.2})`);
            gradient.addColorStop(0.5, 'rgba(100, 150, 255, 0.1)');
            gradient.addColorStop(1, 'transparent');
            
            dispCtx.fillStyle = gradient;
            dispCtx.fillRect(0, 0, dispCanvas.width, dispCanvas.height);
            
            time++;
            requestAnimationFrame(animateDisplacement);
        }
        animateDisplacement();

        // Floating elements
        const floatingContainer = document.getElementById('floating-elements');
        for (let i = 0; i < 30; i++) {
            const item = document.createElement('div');
            item.className = 'float-item';
            item.style.left = Math.random() * 100 + '%';
            item.style.setProperty('--tx', (Math.random() - 0.5) * 200 + 'px');
            item.style.animationDelay = Math.random() * 20 + 's';
            item.style.animationDuration = (15 + Math.random() * 10) + 's';
            floatingContainer.appendChild(item);
        }

        // Resize handler
        window.addEventListener('resize', () => {
            fluidCanvas.width = window.innerWidth;
            fluidCanvas.height = window.innerHeight;
            dispCanvas.width = window.innerWidth;
            dispCanvas.height = window.innerHeight;
        });