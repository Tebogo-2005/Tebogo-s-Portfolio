// Wait for the DOM to load
document.addEventListener('DOMContentLoaded', function() {
    
    // 1. HEADER SCROLL EFFECT
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // 2. ACTIVE NAVIGATION HIGHLIGHTING (FIXED)
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('nav a');

    window.addEventListener('scroll', function() {
        let current = '';
        
        // FIXED: Added the missing forEach line
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
    }); // Fixed: Removed extra closing bracket

    // 3. SKILLS INTERACTION
    const skillItems = document.querySelectorAll('.skill-item');
    
    skillItems.forEach(skill => {
        skill.addEventListener('click', function() {
            // Add animation class
            this.classList.add('clicked');
            
            // Remove animation class after animation ends
            setTimeout(() => {
                this.classList.remove('clicked');
            }, 300);
            
            // Show skill description
            const skillName = this.textContent;
            alert(`You clicked on: ${skillName}\nThis is one of Tebogo's key skills!`);
        });
        
        // Double-click to remove skill (just for fun)
        skill.addEventListener('dblclick', function() {
            if (confirm(`Remove "${this.textContent}" from skills?`)) {
                this.style.opacity = '0';
                setTimeout(() => {
                    this.remove();
                }, 300);
            }
        });
    });

    // 4. PROJECT CARD INTERACTIONS
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach((card, index) => {
        card.addEventListener('click', function() {
            // Toggle expanded class
            this.classList.toggle('expanded');
            
            // Add more details on click
            const moreInfo = document.createElement('p');
            moreInfo.className = 'more-info';
            moreInfo.textContent = 'Click again to collapse. More project details would appear here!';
            moreInfo.style.color = '#3498db';
            moreInfo.style.marginTop = '10px';
            
            if (!this.querySelector('.more-info')) {
                this.appendChild(moreInfo);
            } else {
                this.querySelector('.more-info').remove();
            }
        });
    });

    // 5. CONTACT INFO COPY FEATURE
    const contactItems = document.querySelectorAll('.contact-info p');
    
    contactItems.forEach(item => {
        item.addEventListener('click', function() {
            // Get the text to copy (remove emoji and spaces)
            let textToCopy = this.textContent.replace(/[📧📱🔗💻]/g, '').trim();
            
            // Create temporary input element
            const tempInput = document.createElement('input');
            tempInput.value = textToCopy;
            document.body.appendChild(tempInput);
            tempInput.select();
            document.execCommand('copy');
            document.body.removeChild(tempInput);
            
            // Show copied feedback
            this.classList.add('copied');
            const originalText = this.textContent;
            this.textContent = '✓ Copied!';
            
            setTimeout(() => {
                this.textContent = originalText;
                this.classList.remove('copied');
            }, 1500);
        });
    });

    // 6. SCROLL TO TOP BUTTON (Create and add)
    const scrollBtn = document.createElement('button');
    scrollBtn.innerHTML = '↑';
    scrollBtn.className = 'scroll-top';
    scrollBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: #3498db;
        color: white;
        border: none;
        cursor: pointer;
        font-size: 24px;
        display: none;
        transition: all 0.3s;
        z-index: 999;
    `;
    document.body.appendChild(scrollBtn);

    window.addEventListener('scroll', function() {
        if (window.scrollY > 500) {
            scrollBtn.style.display = 'block';
        } else {
            scrollBtn.style.display = 'none';
        }
    });

    scrollBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // 7. PAGE LOAD ANIMATION
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s';
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);

    // 8. GREETING BASED ON TIME
    const header = document.querySelector('header h1');
    const hours = new Date().getHours();
    let greeting = '';
    
    if (hours < 12) {
        greeting = 'Good Morning! ';
    } else if (hours < 18) {
        greeting = 'Good Afternoon! ';
    } else {
        greeting = 'Good Evening! ';
    }
    
    // Add greeting to header
    const greetingSpan = document.createElement('span');
    greetingSpan.textContent = greeting;
    greetingSpan.style.fontSize = '0.8rem';
    greetingSpan.style.color = '#3498db';
    greetingSpan.style.marginLeft = '10px';
    if (header) {
        header.appendChild(greetingSpan);
    }

    // 9. VISITOR COUNTER
    const footer = document.querySelector('footer .container p');
    let visitorCount = localStorage.getItem('visitorCount') || 0;
    visitorCount = parseInt(visitorCount) + 1;
    localStorage.setItem('visitorCount', visitorCount);
    
    const counterSpan = document.createElement('span');
    counterSpan.textContent = ` | Visitors: ${visitorCount}`;
    counterSpan.style.fontSize = '0.9rem';
    counterSpan.style.marginLeft = '10px';
    if (footer) {
        footer.appendChild(counterSpan);
    }

    // 10. KEYBOARD SHORTCUTS
    document.addEventListener('keydown', function(e) {
        // Press 'h' to go home (top)
        if (e.key === 'h' || e.key === 'H') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
        
        // Press 'c' to go to contact
        if (e.key === 'c' || e.key === 'C') {
            const contactSection = document.querySelector('#contact');
            if (contactSection) {
                contactSection.scrollIntoView({ behavior: 'smooth' });
            }
        }
        
        // Press 's' for skills
        if (e.key === 's' || e.key === 'S') {
            const skillsSection = document.querySelector('#skills');
            if (skillsSection) {
                skillsSection.scrollIntoView({ behavior: 'smooth' });
            }
        }

        // Press 'a' for achievements
        if (e.key === 'a' || e.key === 'A') {
            const achievementsSection = document.querySelector('#achievements');
            if (achievementsSection) {
                achievementsSection.scrollIntoView({ behavior: 'smooth' });
            }
        }
    });

    // =============================================
    // NEW ACHIEVEMENTS SECTION INTERACTIONS
    // =============================================

    // 1. Achievement card interactions
    const achievementCards = document.querySelectorAll('.achievement-card');
    
    achievementCards.forEach(card => {
        card.addEventListener('click', function() {
            // Toggle expanded info
            const extraInfo = document.createElement('div');
            extraInfo.className = 'achievement-extra';
            
            if (!this.querySelector('.achievement-extra')) {
                const cardTitle = this.querySelector('h3') ? this.querySelector('h3').textContent : '';
                
                if (cardTitle.includes('Quantum')) {
                    extraInfo.innerHTML = '<p>🔬 Learning Qiskit, Quantum Circuits, and Quantum Algorithms</p>';
                } else if (cardTitle.includes('Mathematics')) {
                    extraInfo.innerHTML = '<p>📊 Available for tutoring: Calculus, Linear Algebra, and Statistics</p>';
                } else if (cardTitle.includes('IBM')) {
                    extraInfo.innerHTML = '<p>🏆 Certified in: Software Development, Agile, and Cloud Computing</p>';
                } else if (cardTitle.includes('Enactus')) {
                    extraInfo.innerHTML = '<p>🤝 Working on community development projects using entrepreneurial action</p>';
                }
                extraInfo.style.marginTop = '15px';
                extraInfo.style.padding = '10px';
                extraInfo.style.background = 'rgba(255,255,255,0.2)';
                extraInfo.style.borderRadius = '8px';
                this.appendChild(extraInfo);
            } else {
                this.querySelector('.achievement-extra').remove();
            }
        });
    });

    // 2. Mathematics tutoring availability popup
    const badges = document.querySelectorAll('.badge');
    badges.forEach(badge => {
        if (badge.textContent.includes('Mathematics Tutor')) {
            badge.addEventListener('click', function() {
                alert('📚 Mathematics Tutoring Available!\n\nSubjects: First-Year Calculus, Algebra\n\nEmail: dantesebopela@gmail.com to schedule a session');
            });
        }
        
        // 3. IBM certificate display
        if (badge.textContent.includes('IBM Certified')) {
            badge.addEventListener('click', function() {
                alert('💻 IBM Software Engineering Certificate\n\nCompleted: 2024\nSkills: Full-stack development, Agile, DevOps\n\nClick the achievements section to learn more!');
            });
        }
        
        // 4. Quantum computing interest highlight
        if (badge.textContent.includes('Quantum')) {
            badge.addEventListener('mouseenter', function() {
                this.style.background = '#9b59b6';
            });
            badge.addEventListener('mouseleave', function() {
                this.style.background = '#3498db';
            });
        }
    });

    // 5. Add tutoring specific stats (only if achievements section exists)
    const achievementsSection = document.querySelector('#achievements');
    if (achievementsSection) {
        // Check if stats already exist to avoid duplicates
        if (!document.querySelector('.tutor-stats')) {
            const statsDiv = document.createElement('div');
            statsDiv.className = 'tutor-stats';
            statsDiv.innerHTML = `
                <div style="text-align: center; margin: 40px 0; display: flex; justify-content: center; gap: 40px; flex-wrap: wrap;">
                    <div style="text-align: center; min-width: 120px;">
                        <h3 style="font-size: 2rem; color: #3498db; margin-bottom: 5px;">20+</h3>
                        <p style="color: white;">Students Tutored</p>
                    </div>
                    <div style="text-align: center; min-width: 120px;">
                        <h3 style="font-size: 2rem; color: #3498db; margin-bottom: 5px;">4.9</h3>
                        <p style="color: white;">Tutor Rating</p>
                    </div>
                    <div style="text-align: center; min-width: 120px;">
                        <h3 style="font-size: 2rem; color: #3498db; margin-bottom: 5px;">3</h3>
                        <p style="color: white;">Math Courses</p>
                    </div>
                </div>
            `;
            achievementsSection.appendChild(statsDiv);
        }
    }

    console.log('JavaScript is running! Portfolio enhanced with interactive features including achievements!');
});