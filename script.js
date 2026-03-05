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

    // 2. ACTIVE NAVIGATION HIGHLIGHTING
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('nav a');

    window.addEventListener('scroll', function() {
        let current = '';
        
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
    });

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
    header.appendChild(greetingSpan);

    // 9. VISITOR COUNTER
    const footer = document.querySelector('footer .container p');
    let visitorCount = localStorage.getItem('visitorCount') || 0;
    visitorCount = parseInt(visitorCount) + 1;
    localStorage.setItem('visitorCount', visitorCount);
    
    const counterSpan = document.createElement('span');
    counterSpan.textContent = ` | Visitors: ${visitorCount}`;
    counterSpan.style.fontSize = '0.9rem';
    counterSpan.style.marginLeft = '10px';
    footer.appendChild(counterSpan);

    // 10. KEYBOARD SHORTCUTS
    document.addEventListener('keydown', function(e) {
        // Press 'h' to go home (top)
        if (e.key === 'h') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
        
        // Press 'c' to go to contact
        if (e.key === 'c') {
            document.querySelector('#contact').scrollIntoView({ behavior: 'smooth' });
        }
        
        // Press 's' for skills
        if (e.key === 's') {
            document.querySelector('#skills').scrollIntoView({ behavior: 'smooth' });
        }
    });

    console.log('JavaScript is running! Portfolio enhanced with interactive features.');
});