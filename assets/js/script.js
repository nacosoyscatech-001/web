// Mobile Menu Toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });
}

// ===== IMAGE LOADING EFFECT =====
// Initialize image loading effect for all images with wrapper
function initImageLoadingEffect() {
    const imageWrappers = document.querySelectorAll('.image-wrapper');
    
    imageWrappers.forEach(wrapper => {
        const img = wrapper.querySelector('img');
        const skeleton = wrapper.querySelector('.image-skeleton');
        
        if (img && skeleton) {
            // Check if image is already cached/loaded
            if (img.complete) {
                img.classList.add('loaded');
                skeleton.classList.add('fade-out');
            } else {
                // Add load event listener
                img.addEventListener('load', () => {
                    img.classList.add('loaded');
                    skeleton.classList.add('fade-out');
                });
                
                // Handle error case
                img.addEventListener('error', () => {
                    skeleton.classList.add('fade-out');
                });
            }
        }
    });
}

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', initImageLoadingEffect);

// Also initialize for dynamically loaded images
const imageMutationObserver = new MutationObserver(() => {
    initImageLoadingEffect();
});

imageMutationObserver.observe(document.body, {
    childList: true,
    subtree: true
});


// Close menu when a nav link is clicked
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (navMenu && !e.target.closest('.navbar-content')) {
        navMenu.classList.remove('active');
    }
});

// Smooth Scroll for Navigation
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        if (link.getAttribute('href').includes('#')) {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// Filter Excos by Position
const filterButtons = document.querySelectorAll('.filter-btn');
const excoCards = document.querySelectorAll('.exco-card');

if (filterButtons.length > 0) {
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');
            
            const filterValue = button.getAttribute('data-filter');
            
            // Filter cards
            excoCards.forEach(card => {
                if (filterValue === 'all' || card.getAttribute('data-position') === filterValue) {
                    card.style.display = 'block';
                    card.classList.add('slide-in-up');
                    setTimeout(() => {
                        card.style.opacity = '1';
                    }, 10);
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}

// Intersection Observer for Animation on Scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all cards and sections
document.querySelectorAll('.about-card, .benefit-item, .event-card, .exco-card, .exco-summary').forEach(el => {
    observer.observe(el);
});

// Animate Numbers in Stats Section
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const updateCounter = () => {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start) + (element.textContent.includes('+') ? '+' : '');
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target + (element.textContent.includes('+') ? '+' : '');
        }
    };
    
    updateCounter();
}

// Observe stats section for counter animation
const statNumbers = document.querySelectorAll('.stat-number');
let countersAnimated = false;

if (statNumbers.length > 0) {
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !countersAnimated) {
                countersAnimated = true;
                statNumbers.forEach(item => {
                    const value = parseInt(item.getAttribute('data-target'));
                    if (value) {
                        animateCounter(item, value);
                    }
                });
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    const statsSection = document.querySelector('.stats');
    if (statsSection) {
        statsObserver.observe(statsSection);
    }
}

// Form Validation and Submission
// const contactForm = document.getElementById('contactForm');

// if (contactForm) {
//     contactForm.addEventListener('submit', (e) => {
//         e.preventDefault();
        
//         const inputs = contactForm.querySelectorAll('input, textarea');
        
//         // Validate form
//         let isValid = true;
//         inputs.forEach(input => {
//             if (!input.value.trim()) {
//                 isValid = false;
//                 input.style.borderColor = '#ec4899';
//             } else {
//                 input.style.borderColor = '#e2e8f0';
//             }
//         });
        
//         if (isValid) {
//             // Show success message
//             const submitBtn = contactForm.querySelector('button');
//             const originalText = submitBtn.textContent;
            
//             submitBtn.textContent = '✓ Message Sent Successfully!';
//             submitBtn.style.background = '#10b981';
            
//             // Reset form
//             contactForm.reset();
            
//             // Restore button after 3 seconds
//             setTimeout(() => {
//                 submitBtn.textContent = originalText;
//                 submitBtn.style.background = '';
//             }, 3000);
//         }
//     });
// }

// Navbar Background on Scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 5px 30px rgba(0, 0, 0, 0.2)';
    } else {
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    }
});

// Enhance form inputs
const formInputs = document.querySelectorAll('.contact-form input, .contact-form textarea');

formInputs.forEach(input => {
    // Remove error styling on input
    input.addEventListener('input', () => {
        input.style.borderColor = '';
    });
});

// Add scroll-to-top button
window.addEventListener('scroll', () => {
    const scrollBtn = document.getElementById('scrollToTop');
    if (window.scrollY > 300) {
        if (!scrollBtn) {
            const btn = document.createElement('button');
            btn.id = 'scrollToTop';
            btn.innerHTML = '<i class="fas fa-arrow-up"></i>';
            btn.style.cssText = `
                position: fixed;
                bottom: 30px;
                right: 30px;
                width: 50px;
                height: 50px;
                border-radius: 50%;
                background: linear-gradient(135deg, #6366f1, #8b5cf6);
                color: white;
                border: none;
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 999;
                transition: all 0.3s ease;
                box-shadow: 0 4px 15px rgba(99, 102, 241, 0.4);
            `;
            document.body.appendChild(btn);
            
            btn.addEventListener('click', () => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });
            
            btn.addEventListener('mouseover', () => {
                btn.style.transform = 'translateY(-5px)';
                btn.style.boxShadow = '0 6px 25px rgba(99, 102, 241, 0.6)';
            });
            
            btn.addEventListener('mouseout', () => {
                btn.style.transform = 'translateY(0)';
                btn.style.boxShadow = '0 4px 15px rgba(99, 102, 241, 0.4)';
            });
        } else {
            scrollBtn.style.display = 'flex';
        }
    } else if (document.getElementById('scrollToTop')) {
        document.getElementById('scrollToTop').style.display = 'none';
    }
});

// Keyboard navigation - Arrow keys to scroll sections
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        const sections = document.querySelectorAll('section');
        const currentScroll = window.scrollY;
        
        if (e.key === 'ArrowDown') {
            for (let section of sections) {
                if (section.offsetTop > currentScroll + 100) {
                    section.scrollIntoView({ behavior: 'smooth' });
                    break;
                }
            }
        } else if (e.key === 'ArrowUp') {
            for (let i = sections.length - 1; i >= 0; i--) {
                if (sections[i].offsetTop < currentScroll - 10) {
                    sections[i].scrollIntoView({ behavior: 'smooth' });
                    break;
                }
            }
        }
    }
});

// Add ripple effect to buttons
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function(e) {
        if (this.tagName === 'BUTTON' || this.tagName === 'A') {
            const ripple = document.createElement('div');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.style.position = 'absolute';
            ripple.style.borderRadius = '50%';
            ripple.style.background = 'rgba(255, 255, 255, 0.5)';
            ripple.style.pointerEvents = 'none';
            ripple.style.animation = 'rippleEffect 0.6s ease-out';
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        }
    });
});

// Add ripple animation
const style = document.createElement('style');
style.textContent = `
    @keyframes rippleEffect {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Lazy load images
if ('IntersectionObserver' in window) {
    const lazyImages = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                imageObserver.unobserve(img);
            }
        });
    });
    
    lazyImages.forEach(img => imageObserver.observe(img));
}

// Add smooth hover effects to exco cards
document.querySelectorAll('.exco-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.boxShadow = '0 20px 50px rgba(0, 0, 0, 0.15)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.1)';
    });
});

// Initialize on load
document.addEventListener('DOMContentLoaded', () => {
    // Add loaded class to body
    document.body.classList.add('loaded');
    
    // Log initialization
    console.log('NACOS Website initialized successfully!');
});
// let imgs = document.querySelectorAll('.imgs');
// for (let i = 0; i<imgs.length; i++){
//     imgs[i].addEventListener('click', function(){
//         let src = this.getAttribute('src');
//         let modal = document.createElement('div');
//         modal.classList.add('modal');
//         modal.innerHTML = `
//             <div class="modal-content">
//                 <span class="close">&times;</span>
//                 <img src="${src}" alt="Exco Image">
//                 </div>
//                 `;
//                 document.body.appendChild(modal);
//     })
// }
console.log('NACOS Website JavaScript loaded and ready!');

// exco script
let currentdate = new Date().getFullYear()
document.getElementById('currentdate').innerText = currentdate;

// for contact form
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        let formData = new FormData(this);

        // Post to FormSubmit using the email provided
        fetch("https://formsubmit.co/daudgafar01@gmail.com", {
            method: "POST",
            body: formData
        })
        .then(response => {
            const submitBtn = contactForm.querySelector('button');
            const originalText = submitBtn ? submitBtn.textContent : '';
            if (response.ok) {
                if (submitBtn) {
                    submitBtn.textContent = '✓ Message Sent Successfully!';
                    submitBtn.style.background = '#10b981';
                }
                document.getElementById("result").innerHTML = "Message sent successfully!";
                contactForm.reset();
            } else {
                if (submitBtn) {
                    submitBtn.textContent = 'Error sending message';
                    submitBtn.style.background = '#ee2626';
                    setTimeout(() => {
                        submitBtn.textContent = originalText;
                        submitBtn.style.background = '';
                    }, 3000);
                }
                document.getElementById("result").innerHTML = "Error sending message.";
            }
        })
        .catch(error => {
            const submitBtn = contactForm.querySelector('button');
            const originalText = submitBtn ? submitBtn.textContent : '';
            if (submitBtn) {
                submitBtn.textContent = 'Something went wrong';
                submitBtn.style.background = '#ee2626';
                setTimeout(() => {
                    submitBtn.textContent = originalText;
                    submitBtn.style.background = '';
                }, 3000);
            }
            document.getElementById("result").innerHTML = "Something went wrong!";
        });
    });
}

// Automatically update event card status based on date
function updateEventCardStatuses() {
    const monthMap = {
        jan:0,feb:1,mar:2,apr:3,may:4,jun:5,jul:6,aug:7,sep:8,oct:9,nov:10,dec:11
    };

    const now = new Date();
    const cards = document.querySelectorAll('.event-card');
    cards.forEach(card => {
        try {
            const dayEl = card.querySelector('.event-date .day');
            const monthEl = card.querySelector('.event-date .month');
            const btn = card.querySelector('.btn');
            if (!dayEl || !monthEl || !btn) return;

            const day = parseInt(dayEl.textContent.trim(), 10);
            const monthText = monthEl.textContent.trim().toLowerCase();
            const monthKey = monthText.slice(0,3);
            const monthIndex = monthMap[monthKey];
            if (isNaN(day) || monthIndex === undefined) return;

            // Assume current year
            const eventDate = new Date(now.getFullYear(), monthIndex, day);
            const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());

            // Clear previous status classes
            btn.classList.remove('completed', 'today');

            if (eventDate < startOfToday) {
                // Event has passed
                btn.textContent = 'Completed';
                btn.classList.add('completed');
                card.setAttribute('data-status', 'completed');
            } else if (eventDate.getFullYear() === startOfToday.getFullYear() && eventDate.getMonth() === startOfToday.getMonth() && eventDate.getDate() === startOfToday.getDate()) {
                // Event is today
                btn.textContent = 'Happening Today';
                btn.classList.add('today');
                card.setAttribute('data-status', 'today');
            } else {
                // Future event
                if (!/done|complete|completed|upcoming|happening today/i.test(btn.textContent)) {
                    btn.textContent = 'Upcoming';
                }
                card.setAttribute('data-status', 'upcoming');
            }
        } catch (e) {
            // ignore malformed cards
            console.warn('Error parsing event card date', e);
        }
    });
}

// Run on load (immediately if ready, otherwise on DOMContentLoaded)
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', updateEventCardStatuses);
} else {
    updateEventCardStatuses();
}

function gotoabout(){
    window.location.href="index.html#about";
}
