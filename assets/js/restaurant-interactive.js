/**
 * Ann's Restaurant Interactive Features
 * Enhanced JavaScript for restaurant website interactivity
 * Fully responsive and mobile-optimized
 */

(function() {
  "use strict";

  // Wait for DOM to be fully loaded
  document.addEventListener('DOMContentLoaded', function() {
    
    /**
     * Enhanced Menu Interactions
     */
    function initMenuInteractions() {
      // Add hover effects to menu items
      const menuItems = document.querySelectorAll('.menu-item');
      menuItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
          this.style.transform = 'translateY(-5px)';
          this.style.transition = 'transform 0.3s ease';
        });
        
        item.addEventListener('mouseleave', function() {
          this.style.transform = 'translateY(0)';
        });
      });

      // Add click to add to cart functionality (simulated)
      menuItems.forEach(item => {
        const addToCartBtn = document.createElement('button');
        addToCartBtn.className = 'btn btn-outline-primary btn-sm mt-2 add-to-cart-btn';
        addToCartBtn.innerHTML = '<i class="bi bi-cart-plus"></i> Add to Cart';
        addToCartBtn.style.opacity = '0';
        addToCartBtn.style.transition = 'opacity 0.3s ease';
        
        item.addEventListener('mouseenter', function() {
          addToCartBtn.style.opacity = '1';
        });
        
        item.addEventListener('mouseleave', function() {
          addToCartBtn.style.opacity = '0';
        });
        
        addToCartBtn.addEventListener('click', function(e) {
          e.preventDefault();
          const itemName = item.querySelector('h4').textContent;
          showNotification(`${itemName} added to cart!`, 'success');
          this.innerHTML = '<i class="bi bi-check"></i> Added!';
          this.classList.remove('btn-outline-primary');
          this.classList.add('btn-success');
          
          setTimeout(() => {
            this.innerHTML = '<i class="bi bi-cart-plus"></i> Add to Cart';
            this.classList.remove('btn-success');
            this.classList.add('btn-outline-primary');
          }, 2000);
        });
        
        item.appendChild(addToCartBtn);
      });
    }

    /**
     * Interactive Booking Form
     */
    function initBookingForm() {
      const bookingForm = document.querySelector('.php-email-form');
      if (bookingForm) {
        // Add real-time validation
        const inputs = bookingForm.querySelectorAll('input, textarea');
        inputs.forEach(input => {
          input.addEventListener('blur', function() {
            validateField(this);
          });
          
          input.addEventListener('input', function() {
            if (this.classList.contains('is-invalid')) {
              validateField(this);
            }
          });
        });

        // Enhanced form submission
        bookingForm.addEventListener('submit', function(e) {
          e.preventDefault();
          
          if (validateForm()) {
            showBookingConfirmation();
          }
        });
      }
    }

    /**
     * Form Validation
     */
    function validateField(field) {
      const value = field.value.trim();
      const fieldName = field.name;
      let isValid = true;
      let errorMessage = '';

      // Remove existing validation classes
      field.classList.remove('is-valid', 'is-invalid');
      
      // Remove existing error message
      const existingError = field.parentNode.querySelector('.invalid-feedback');
      if (existingError) {
        existingError.remove();
      }

      // Validation rules
      switch (fieldName) {
        case 'name':
          if (value.length < 2) {
            isValid = false;
            errorMessage = 'Name must be at least 2 characters long';
          }
          break;
        case 'email':
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(value)) {
            isValid = false;
            errorMessage = 'Please enter a valid email address';
          }
          break;
        case 'phone':
          const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
          if (!phoneRegex.test(value.replace(/\s/g, ''))) {
            isValid = false;
            errorMessage = 'Please enter a valid phone number';
          }
          break;
        case 'date':
          const selectedDate = new Date(value);
          const today = new Date();
          today.setHours(0, 0, 0, 0);
          if (selectedDate < today) {
            isValid = false;
            errorMessage = 'Please select a future date';
          }
          break;
        case 'time':
          if (!value) {
            isValid = false;
            errorMessage = 'Please select a time';
          }
          break;
        case 'people':
          const people = parseInt(value);
          if (people < 1 || people > 20) {
            isValid = false;
            errorMessage = 'Please enter between 1 and 20 people';
          }
          break;
      }

      // Apply validation styling
      if (isValid) {
        field.classList.add('is-valid');
      } else {
        field.classList.add('is-invalid');
        const errorDiv = document.createElement('div');
        errorDiv.className = 'invalid-feedback';
        errorDiv.textContent = errorMessage;
        field.parentNode.appendChild(errorDiv);
      }

      return isValid;
    }

    function validateForm() {
      const form = document.querySelector('.php-email-form');
      const inputs = form.querySelectorAll('input[required], textarea[required]');
      let isFormValid = true;

      inputs.forEach(input => {
        if (!validateField(input)) {
          isFormValid = false;
        }
      });

      return isFormValid;
    }

    /**
     * Interactive Gallery
     */
    function initInteractiveGallery() {
      const galleryItems = document.querySelectorAll('.gallery img');
      galleryItems.forEach((img, index) => {
        img.addEventListener('click', function() {
          // Add zoom effect
          this.style.transform = 'scale(1.05)';
          this.style.transition = 'transform 0.3s ease';
          
          setTimeout(() => {
            this.style.transform = 'scale(1)';
          }, 300);
        });
      });
    }

    /**
     * Dynamic Testimonials
     */
    function initDynamicTestimonials() {
      const testimonials = [
        {
          name: "Sarah Johnson",
          role: "Food Critic",
          text: "Ann's Restaurant offers the most authentic flavors I've ever experienced. The attention to detail in every dish is remarkable.",
          rating: 5
        },
        {
          name: "Michael Chen",
          role: "Regular Customer",
          text: "I've been coming here for years. The consistency in quality and the warm atmosphere keeps me coming back.",
          rating: 5
        },
        {
          name: "Emily Rodriguez",
          role: "Food Blogger",
          text: "The presentation and taste are absolutely perfect. This is definitely a hidden gem in the city!",
          rating: 5
        }
      ];

      // Add new testimonials to the swiper
      const swiperWrapper = document.querySelector('.testimonials .swiper-wrapper');
      if (swiperWrapper) {
        testimonials.forEach(testimonial => {
          const testimonialSlide = createTestimonialSlide(testimonial);
          swiperWrapper.appendChild(testimonialSlide);
        });
      }
    }

    function createTestimonialSlide(testimonial) {
      const slide = document.createElement('div');
      slide.className = 'swiper-slide';
      slide.innerHTML = `
        <div class="testimonial-item">
          <div class="row gy-4 justify-content-center">
            <div class="col-lg-6">
              <div class="testimonial-content">
                <p>
                  <i class="bi bi-quote quote-icon-left"></i>
                  <span>${testimonial.text}</span>
                  <i class="bi bi-quote quote-icon-right"></i>
                </p>
                <h3>${testimonial.name}</h3>
                <h4>${testimonial.role}</h4>
                <div class="stars">
                  ${'<i class="bi bi-star-fill"></i>'.repeat(testimonial.rating)}
                </div>
              </div>
            </div>
          </div>
        </div>
      `;
      return slide;
    }

    /**
     * Interactive Chef Cards
     */
    function initChefInteractions() {
      const chefCards = document.querySelectorAll('.team-member');
      chefCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
          const socialLinks = this.querySelector('.social');
          if (socialLinks) {
            socialLinks.style.opacity = '1';
            socialLinks.style.transform = 'translateY(0)';
          }
        });
        
        card.addEventListener('mouseleave', function() {
          const socialLinks = this.querySelector('.social');
          if (socialLinks) {
            socialLinks.style.opacity = '0';
            socialLinks.style.transform = 'translateY(10px)';
          }
        });
      });
    }

    /**
     * Live Clock for Opening Hours
     */
    function initLiveClock() {
      const clockElement = document.querySelector('.opening-hours .current-time');
      if (clockElement) {
        function updateClock() {
          const now = new Date();
          const timeString = now.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
          });
          clockElement.textContent = `Current Time: ${timeString}`;
        }
        
        updateClock();
        setInterval(updateClock, 1000);
      }
    }

    /**
     * Smooth Scrolling for Navigation
     */
    function initSmoothScrolling() {
      const navLinks = document.querySelectorAll('a[href^="#"]');
      navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
          e.preventDefault();
          const targetId = this.getAttribute('href');
          const targetSection = document.querySelector(targetId);
          
          if (targetSection) {
            const headerHeight = document.querySelector('#header').offsetHeight;
            const targetPosition = targetSection.offsetTop - headerHeight - 20;
            
            window.scrollTo({
              top: targetPosition,
              behavior: 'smooth'
            });
          }
        });
      });
    }

    /**
     * Notification System
     */
    function showNotification(message, type = 'info') {
      const notification = document.createElement('div');
      notification.className = `notification notification-${type}`;
      notification.innerHTML = `
        <div class="notification-content">
          <i class="bi bi-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
          <span>${message}</span>
          <button class="notification-close">&times;</button>
        </div>
      `;
      
      // Add styles
      notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#28a745' : '#17a2b8'};
        color: white;
        padding: 15px 20px;
        border-radius: 5px;
        box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        z-index: 9999;
        transform: translateX(100%);
        transition: transform 0.3s ease;
      `;
      
      document.body.appendChild(notification);
      
      // Animate in
      setTimeout(() => {
        notification.style.transform = 'translateX(0)';
      }, 100);
      
      // Auto remove after 5 seconds
      setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
          if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
          }
        }, 300);
      }, 5000);
      
      // Close button
      notification.querySelector('.notification-close').addEventListener('click', () => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
          if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
          }
        }, 300);
      });
    }

    /**
     * Booking Confirmation Modal
     */
    function showBookingConfirmation() {
      const modal = document.createElement('div');
      modal.className = 'booking-modal';
      modal.innerHTML = `
        <div class="modal-content">
          <div class="modal-header">
            <h3>Booking Confirmation</h3>
            <button class="modal-close">&times;</button>
          </div>
          <div class="modal-body">
            <div class="success-icon">
              <i class="bi bi-check-circle"></i>
            </div>
            <h4>Thank you for your reservation!</h4>
            <p>We have received your booking request and will contact you shortly to confirm your table.</p>
            <div class="booking-details">
              <p><strong>Name:</strong> <span id="booking-name"></span></p>
              <p><strong>Date:</strong> <span id="booking-date"></span></p>
              <p><strong>Time:</strong> <span id="booking-time"></span></p>
              <p><strong>Party Size:</strong> <span id="booking-people"></span></p>
            </div>
          </div>
          <div class="modal-footer">
            <button class="btn btn-primary modal-close-btn">Close</button>
          </div>
        </div>
      `;
      
      // Add styles
      modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.5);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 10000;
        opacity: 0;
        transition: opacity 0.3s ease;
      `;
      
      const modalContent = modal.querySelector('.modal-content');
      modalContent.style.cssText = `
        background: white;
        border-radius: 10px;
        max-width: 500px;
        width: 90%;
        max-height: 80vh;
        overflow-y: auto;
        transform: scale(0.8);
        transition: transform 0.3s ease;
      `;
      
      document.body.appendChild(modal);
      
      // Animate in
      setTimeout(() => {
        modal.style.opacity = '1';
        modalContent.style.transform = 'scale(1)';
      }, 100);
      
      // Fill in booking details
      const form = document.querySelector('.php-email-form');
      modal.querySelector('#booking-name').textContent = form.querySelector('[name="name"]').value;
      modal.querySelector('#booking-date').textContent = form.querySelector('[name="date"]').value;
      modal.querySelector('#booking-time').textContent = form.querySelector('[name="time"]').value;
      modal.querySelector('#booking-people').textContent = form.querySelector('[name="people"]').value;
      
      // Close modal
      const closeModal = () => {
        modal.style.opacity = '0';
        modalContent.style.transform = 'scale(0.8)';
        setTimeout(() => {
          if (modal.parentNode) {
            modal.parentNode.removeChild(modal);
          }
        }, 300);
      };
      
      modal.querySelector('.modal-close').addEventListener('click', closeModal);
      modal.querySelector('.modal-close-btn').addEventListener('click', closeModal);
      modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
      });
    }

    /**
     * Responsive Navigation Enhancement
     */
    function initResponsiveNavigation() {
      const header = document.querySelector('#header');
      const navToggle = document.querySelector('.mobile-nav-toggle');
      const navMenu = document.querySelector('#navmenu');
      
      // Add scroll effect to header
      let lastScrollTop = 0;
      window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop && scrollTop > 100) {
          // Scrolling down
          header.style.transform = 'translateY(-100%)';
        } else {
          // Scrolling up
          header.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
      });
      
      // Smooth mobile menu toggle
      if (navToggle) {
        navToggle.addEventListener('click', function() {
          this.classList.toggle('active');
          navMenu.classList.toggle('active');
          document.body.classList.toggle('nav-open');
        });
      }
      
      // Close mobile menu when clicking outside
      document.addEventListener('click', function(e) {
        if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
          navMenu.classList.remove('active');
          navToggle.classList.remove('active');
          document.body.classList.remove('nav-open');
        }
      });
    }

    /**
     * Interactive Hero Section
     */
    function initInteractiveHero() {
      const heroSection = document.querySelector('#hero');
      if (heroSection) {
        // Parallax effect for hero image
        window.addEventListener('scroll', function() {
          const scrolled = window.pageYOffset;
          const parallax = heroSection.querySelector('.hero-img img');
          if (parallax) {
            const speed = scrolled * 0.5;
            parallax.style.transform = `translateY(${speed}px)`;
          }
        });
        
        // Add typing effect to hero text
        const heroTitle = heroSection.querySelector('h1');
        if (heroTitle) {
          const text = heroTitle.textContent;
          heroTitle.textContent = '';
          let i = 0;
          
          function typeWriter() {
            if (i < text.length) {
              heroTitle.textContent += text.charAt(i);
              i++;
              setTimeout(typeWriter, 100);
            }
          }
          
          setTimeout(typeWriter, 1000);
        }
      }
    }

    /**
     * Interactive Statistics Counter
     */
    function initInteractiveStats() {
      const statsSection = document.querySelector('#stats');
      if (statsSection) {
        const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              const counters = entry.target.querySelectorAll('.purecounter');
              counters.forEach(counter => {
                const target = parseInt(counter.getAttribute('data-purecounter-end'));
                const duration = parseInt(counter.getAttribute('data-purecounter-duration')) * 1000;
                let current = 0;
                const increment = target / (duration / 16);
                
                const updateCounter = () => {
                  current += increment;
                  if (current < target) {
                    counter.textContent = Math.floor(current);
                    requestAnimationFrame(updateCounter);
                  } else {
                    counter.textContent = target;
                  }
                };
                
                updateCounter();
              });
              observer.unobserve(entry.target);
            }
          });
        });
        
        observer.observe(statsSection);
      }
    }

    /**
     * Interactive Menu Filtering
     */
    function initMenuFiltering() {
      const menuTabs = document.querySelectorAll('.nav-tabs .nav-link');
      const menuItems = document.querySelectorAll('.menu-item');
      
      menuTabs.forEach(tab => {
        tab.addEventListener('click', function(e) {
          e.preventDefault();
          
          // Remove active class from all tabs
          menuTabs.forEach(t => t.classList.remove('active', 'show'));
          this.classList.add('active', 'show');
          
          // Get target menu category
          const targetId = this.getAttribute('data-bs-target');
          const targetMenu = document.querySelector(targetId);
          
          // Hide all menu items
          menuItems.forEach(item => {
            item.style.display = 'none';
            item.style.opacity = '0';
            item.style.transform = 'translateY(20px)';
          });
          
          // Show items from selected category with animation
          setTimeout(() => {
            const categoryItems = targetMenu.querySelectorAll('.menu-item');
            categoryItems.forEach((item, index) => {
              setTimeout(() => {
                item.style.display = 'block';
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
                item.style.transition = 'all 0.5s ease';
              }, index * 100);
            });
          }, 200);
        });
      });
    }

    /**
     * Interactive Contact Form
     */
    function initInteractiveContactForm() {
      const contactForm = document.querySelector('#contact .php-email-form');
      if (contactForm) {
        const inputs = contactForm.querySelectorAll('input, textarea');
        
        inputs.forEach(input => {
          // Add floating label effect
          input.addEventListener('focus', function() {
            this.parentNode.classList.add('focused');
          });
          
          input.addEventListener('blur', function() {
            if (!this.value) {
              this.parentNode.classList.remove('focused');
            }
          });
          
          // Real-time character count for textarea
          if (input.tagName === 'TEXTAREA') {
            const maxLength = 500;
            const counter = document.createElement('div');
            counter.className = 'char-counter';
            counter.style.cssText = 'text-align: right; font-size: 12px; color: #666; margin-top: 5px;';
            input.parentNode.appendChild(counter);
            
            input.addEventListener('input', function() {
              const remaining = maxLength - this.value.length;
              counter.textContent = `${remaining} characters remaining`;
              counter.style.color = remaining < 50 ? '#dc3545' : '#666';
            });
          }
        });
        
        // Enhanced form submission
        contactForm.addEventListener('submit', function(e) {
          e.preventDefault();
          
          // Show loading state
          const submitBtn = this.querySelector('button[type="submit"]');
          const originalText = submitBtn.textContent;
          submitBtn.textContent = 'Sending...';
          submitBtn.disabled = true;
          
          // Simulate form submission
          setTimeout(() => {
            showNotification('Message sent successfully! We\'ll get back to you soon.', 'success');
            this.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
          }, 2000);
        });
      }
    }

    /**
     * Interactive Gallery with Lightbox
     */
    function initAdvancedGallery() {
      const galleryItems = document.querySelectorAll('.gallery img');
      
      galleryItems.forEach((img, index) => {
        // Add loading effect
        img.addEventListener('load', function() {
          this.style.opacity = '1';
          this.style.transform = 'scale(1)';
        });
        
        // Add hover effects
        img.addEventListener('mouseenter', function() {
          this.style.transform = 'scale(1.05)';
          this.style.filter = 'brightness(1.1)';
        });
        
        img.addEventListener('mouseleave', function() {
          this.style.transform = 'scale(1)';
          this.style.filter = 'brightness(1)';
        });
        
        // Add click effect
        img.addEventListener('click', function() {
          this.style.transform = 'scale(0.95)';
          setTimeout(() => {
            this.style.transform = 'scale(1.05)';
          }, 150);
        });
      });
    }

    /**
     * Interactive Testimonials with Auto-rotation
     */
    function initAdvancedTestimonials() {
      const testimonialSwiper = document.querySelector('.testimonials .init-swiper');
      if (testimonialSwiper) {
        // Add testimonial rating animation
        const stars = testimonialSwiper.querySelectorAll('.stars i');
        stars.forEach((star, index) => {
          star.style.animationDelay = `${index * 0.1}s`;
          star.classList.add('animate-star');
        });
      }
    }

    /**
     * Interactive Chef Cards with Social Media
     */
    function initAdvancedChefCards() {
      const chefCards = document.querySelectorAll('.team-member');
      
      chefCards.forEach(card => {
        const socialLinks = card.querySelector('.social');
        const memberImg = card.querySelector('.member-img');
        
        // Add hover effects
        card.addEventListener('mouseenter', function() {
          if (socialLinks) {
            socialLinks.style.opacity = '1';
            socialLinks.style.transform = 'translateY(0)';
          }
          if (memberImg) {
            memberImg.style.transform = 'scale(1.1)';
          }
        });
        
        card.addEventListener('mouseleave', function() {
          if (socialLinks) {
            socialLinks.style.opacity = '0';
            socialLinks.style.transform = 'translateY(20px)';
          }
          if (memberImg) {
            memberImg.style.transform = 'scale(1)';
          }
        });
        
        // Add click to view chef details
        card.addEventListener('click', function() {
          const chefName = this.querySelector('h4').textContent;
          const chefRole = this.querySelector('span').textContent;
          showChefModal(chefName, chefRole);
        });
      });
    }

    /**
     * Chef Details Modal
     */
    function showChefModal(name, role) {
      const modal = document.createElement('div');
      modal.className = 'chef-modal';
      modal.innerHTML = `
        <div class="modal-content">
          <div class="modal-header">
            <h3>Chef Details</h3>
            <button class="modal-close">&times;</button>
          </div>
          <div class="modal-body">
            <h4>${name}</h4>
            <p class="chef-role">${role}</p>
            <p>Meet our talented chef who brings years of culinary expertise to Ann's Restaurant. With a passion for creating exceptional dining experiences, our chef ensures every dish is prepared with the finest ingredients and attention to detail.</p>
            <div class="chef-specialties">
              <h5>Specialties:</h5>
              <ul>
                <li>Signature Pasta Dishes</li>
                <li>Grilled Seafood</li>
                <li>Artisanal Desserts</li>
                <li>Seasonal Menu Creations</li>
              </ul>
            </div>
          </div>
        </div>
      `;
      
      // Add styles
      modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.8);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 10000;
        opacity: 0;
        transition: opacity 0.3s ease;
      `;
      
      const modalContent = modal.querySelector('.modal-content');
      modalContent.style.cssText = `
        background: white;
        border-radius: 15px;
        max-width: 500px;
        width: 90%;
        padding: 30px;
        transform: scale(0.8);
        transition: transform 0.3s ease;
      `;
      
      document.body.appendChild(modal);
      
      // Animate in
      setTimeout(() => {
        modal.style.opacity = '1';
        modalContent.style.transform = 'scale(1)';
      }, 100);
      
      // Close modal
      const closeModal = () => {
        modal.style.opacity = '0';
        modalContent.style.transform = 'scale(0.8)';
        setTimeout(() => {
          if (modal.parentNode) {
            modal.parentNode.removeChild(modal);
          }
        }, 300);
      };
      
      modal.querySelector('.modal-close').addEventListener('click', closeModal);
      modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
      });
    }

    /**
     * Mobile Touch Interactions
     */
    function initMobileTouchInteractions() {
      // Add touch feedback for mobile devices
      const touchElements = document.querySelectorAll('.menu-item, .team-member, .gallery img, .btn');
      
      touchElements.forEach(element => {
        element.addEventListener('touchstart', function() {
          this.style.transform = 'scale(0.95)';
        });
        
        element.addEventListener('touchend', function() {
          this.style.transform = 'scale(1)';
        });
      });
    }

    /**
     * Responsive Image Loading
     */
    function initResponsiveImages() {
      const images = document.querySelectorAll('img[data-src]');
      
      const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.remove('lazy');
            imageObserver.unobserve(img);
          }
        });
      });
      
      images.forEach(img => imageObserver.observe(img));
    }

    /**
     * Performance Optimizations
     */
    function initPerformanceOptimizations() {
      // Debounce scroll events
      let scrollTimeout;
      const originalScrollHandler = window.onscroll;
      
      window.onscroll = function() {
        if (scrollTimeout) {
          clearTimeout(scrollTimeout);
        }
        scrollTimeout = setTimeout(() => {
          if (originalScrollHandler) {
            originalScrollHandler();
          }
        }, 10);
      };
      
      // Preload critical images
      const criticalImages = [
        'assets/img/hero-img.png',
        'assets/img/about.jpg'
      ];
      
      criticalImages.forEach(src => {
        const img = new Image();
        img.src = src;
      });
    }

    /**
     * Initialize all interactive features
     */
    function init() {
      initMenuInteractions();
      initBookingForm();
      initInteractiveGallery();
      initDynamicTestimonials();
      initChefInteractions();
      initLiveClock();
      initSmoothScrolling();
      initResponsiveNavigation();
      initInteractiveHero();
      initInteractiveStats();
      initMenuFiltering();
      initInteractiveContactForm();
      initAdvancedGallery();
      initAdvancedTestimonials();
      initAdvancedChefCards();
      initMobileTouchInteractions();
      initResponsiveImages();
      initPerformanceOptimizations();
      
      // Show welcome message
      setTimeout(() => {
        showNotification('Welcome to Ann\'s Restaurant! 🍽️', 'success');
      }, 1000);
    }

    // Initialize when DOM is ready
    init();
  });

})();
