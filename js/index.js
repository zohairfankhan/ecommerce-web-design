//  JavaScript
document.addEventListener('DOMContentLoaded', function() {
    
    // 1. Category Items Click Effect
    const categoryItems = document.querySelectorAll('.category-item');
    categoryItems.forEach(item => {
        item.addEventListener('click', function() {
            categoryItems.forEach(cat => cat.classList.remove('active'));
            this.classList.add('active');
            
            // Show loading effect
            this.style.opacity = '0.7';
            setTimeout(() => {
                this.style.opacity = '1';
            }, 300);
            
            console.log('Category selected:', this.textContent);
        });
    });

    // 2. Navigation Items Click Effect
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            navItems.forEach(nav => nav.classList.remove('active'));
            this.classList.add('active');
            
            console.log('Navigation item clicked:', this.textContent);
        });
    });

    // 3. All Category Button with Dropdown
    const allCategoryBtn = document.getElementById('allCategoryBtn');
    const categoriesSidebar = document.querySelector('.categories-sidebar');
    
    if(allCategoryBtn && categoriesSidebar) {
        allCategoryBtn.addEventListener('click', function() {
            categoriesSidebar.classList.toggle('show');
            console.log('All Categories dropdown toggled');
        });

        // Close categories when clicking outside
        document.addEventListener('click', function(e) {
            if(!allCategoryBtn.contains(e.target) && !categoriesSidebar.contains(e.target)) {
                categoriesSidebar.classList.remove('show');
            }
        });
    }

    // 4. Enhanced Search Functionality
    const searchBtn = document.querySelector('.search-btn');
    const searchInput = document.querySelector('.search-input');
    const categoryDropdown = document.querySelector('.category-dropdown');
    
    if(searchBtn && searchInput) {
        // Button click search
        searchBtn.addEventListener('click', function() {
            performSearch();
        });

        // Enter key search
        searchInput.addEventListener('keypress', function(e) {
            if(e.key === 'Enter') {
                performSearch();
            }
        });

        // Real-time search suggestions (optional)
        searchInput.addEventListener('input', function() {
            if(this.value.length > 2) {
                showSearchSuggestions(this.value);
            } else {
                hideSearchSuggestions();
            }
        });

        function performSearch() {
            const searchValue = searchInput.value.trim();
            const selectedCategory = categoryDropdown ? categoryDropdown.value : 'All category';
            
            if(searchValue !== '') {
                console.log('Searching for:', searchValue, 'in category:', selectedCategory);
                
                // Show loading state
                searchBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
                searchBtn.disabled = true;
                
                setTimeout(() => {
                    // Simulate search completion
                    searchBtn.innerHTML = 'Search';
                    searchBtn.disabled = false;
                    
                    // Redirect to search results page
                    window.location.href = `search.html?q=${encodeURIComponent(searchValue)}&category=${encodeURIComponent(selectedCategory)}`;
                }, 1000);
                
            } else {
                searchInput.focus();
                showNotification('Please enter something to search', 'warning');
            }
        }

        function showSearchSuggestions(query) {
            // Implementation for search suggestions
            console.log('Showing suggestions for:', query);
        }

        function hideSearchSuggestions() {
            // Hide suggestions
        }
    }

    // 5. Newsletter Form Submission
    const newsletterForm = document.querySelector('.newsletter-form');
    const newsletterInput = document.querySelector('.newsletter-input');
    const newsletterBtn = document.querySelector('.newsletter-btn');

    if(newsletterBtn && newsletterInput) {
        newsletterBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const email = newsletterInput.value.trim();
            
            if(validateEmail(email)) {
                // Show loading state
                const originalText = newsletterBtn.textContent;
                newsletterBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Subscribing...';
                newsletterBtn.disabled = true;
                
                // Simulate API call
                setTimeout(() => {
                    newsletterBtn.textContent = originalText;
                    newsletterBtn.disabled = false;
                    
                    showNotification('Thank you for subscribing to our newsletter!', 'success');
                    newsletterInput.value = '';
                    
                    // Log subscription
                    console.log('Newsletter subscription:', email);
                }, 1500);
                
            } else {
                showNotification('Please enter a valid email address', 'error');
            }
        });
    }

    // 6. Enhanced Quote Form Submission
    const quoteSubmitBtn = document.querySelector('.quote-submit-btn');
    const quoteInputs = {
        item: document.querySelector('.quote-input'),
        details: document.querySelector('.quote-textarea'),
        quantity: document.querySelector('.quote-quantity-input'),
        unit: document.querySelector('.quote-unit-select')
    };

    if(quoteSubmitBtn) {
        quoteSubmitBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            if(validateQuoteForm()) {
                // Show loading state
                const originalText = quoteSubmitBtn.textContent;
                quoteSubmitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
                quoteSubmitBtn.disabled = true;
                
                const quoteData = {
                    item: quoteInputs.item.value.trim(),
                    details: quoteInputs.details ? quoteInputs.details.value.trim() : '',
                    quantity: quoteInputs.quantity ? quoteInputs.quantity.value : '',
                    unit: quoteInputs.unit ? quoteInputs.unit.value : 'Pcs',
                    timestamp: new Date().toISOString()
                };
                
                // Simulate API call
                setTimeout(() => {
                    quoteSubmitBtn.textContent = originalText;
                    quoteSubmitBtn.disabled = false;
                    
                    console.log('Quote request submitted:', quoteData);
                    showNotification('Your inquiry has been sent to suppliers successfully!', 'success');
                    
                    // Reset form
                    resetQuoteForm();
                    
                }, 2000);
            }
        });
    }

    // 7. Enhanced Language Selector
    const languageBtn = document.querySelector('.language-btn');
    const languageDropdown = document.querySelector('.language-dropdown');
    
    if(languageBtn && languageDropdown) {
        let isDropdownOpen = false;

        // Toggle dropdown
        languageBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            isDropdownOpen = !isDropdownOpen;
            languageDropdown.style.display = isDropdownOpen ? 'block' : 'none';
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', function() {
            isDropdownOpen = false;
            languageDropdown.style.display = 'none';
        });

        // Prevent dropdown close when clicking inside
        languageDropdown.addEventListener('click', function(e) {
            e.stopPropagation();
        });

        // Language selection
        const languageOptions = document.querySelectorAll('.language-option');
        languageOptions.forEach(option => {
            option.addEventListener('click', function(e) {
                e.preventDefault();
                const selectedLang = this.querySelector('span').textContent;
                const selectedFlag = this.querySelector('.language-flag').src;
                
                // Update button
                languageBtn.querySelector('span').textContent = selectedLang;
                languageBtn.querySelector('.language-flag').src = selectedFlag;
                
                // Close dropdown
                isDropdownOpen = false;
                languageDropdown.style.display = 'none';
                
                // Show confirmation
                showNotification(`Language changed to ${selectedLang}`, 'success');
                console.log('Language changed to:', selectedLang);
                
                // Save preference to localStorage
                localStorage.setItem('preferredLanguage', selectedLang);
            });
        });

        // Load saved language preference
        const savedLanguage = localStorage.getItem('preferredLanguage');
        if(savedLanguage) {
            const savedOption = Array.from(languageOptions).find(option => 
                option.querySelector('span').textContent === savedLanguage
            );
            if(savedOption) {
                savedOption.click();
            }
        }
    }

    // 8. User Section Interactions
    const joinBtn = document.querySelector('.join-btn');
    const loginLink = document.querySelector('.login-link');
    
    if(joinBtn) {
        joinBtn.addEventListener('click', function() {
            console.log('Join Now clicked');
            showNotification('Redirecting to registration page...', 'info');
            window.location.href = '/onther-page/joinnow.html';
        });
    }
    
    if(loginLink) {
        loginLink.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Login clicked');
            showNotification('Redirecting to login page...', 'info');
            window.location.href = '/other-page/singin.html';
        });
    }

    // 9. Product Interactions
    // Product cards click
    const productCards = document.querySelectorAll('.product-card, .recommended-card, .outdoor-product-card, .consumer-product-card');
    productCards.forEach(card => {
        card.addEventListener('click', function() {
            const productName = this.querySelector('h4') ? this.querySelector('h4').textContent : 'Product';
            console.log('Product clicked:', productName);
            
            // Add to recent viewed products
            addToRecentViewed(this);
            
            // Redirect to product detail (simulated)
            showNotification(`Opening ${productName} details...`, 'info');
            // window.location.href = 'product-detail.html?id=' + this.dataset.id;
        });
    });

    // Add to cart functionality for icons
    const cartIcons = document.querySelectorAll('.fa-shopping-cart');
    cartIcons.forEach(icon => {
        icon.addEventListener('click', function(e) {
            e.stopPropagation();
            const productCard = this.closest('.product-card, .recommended-card');
            const productName = productCard ? productCard.querySelector('h4').textContent : 'Item';
            
            addToCart(productName);
        });
    });

    // Add to wishlist
    const wishlistIcons = document.querySelectorAll('.fa-heart');
    wishlistIcons.forEach(icon => {
        icon.addEventListener('click', function(e) {
            e.stopPropagation();
            const productName = 'Product'; 
            addToWishlist(productName);
        });
    });

    // 10. Deals Timer Countdown
    function initializeDealsTimer() {
        const timerElements = {
            days: document.querySelector('.timer-item:nth-child(1) .timer-value'),
            hours: document.querySelector('.timer-item:nth-child(2) .timer-value'),
            minutes: document.querySelector('.timer-item:nth-child(3) .timer-value'),
            seconds: document.querySelector('.timer-item:nth-child(4) .timer-value')
        };

        if(timerElements.days) {
            // Set deal end time (24 hours from now)
            const dealEndTime = new Date();
            dealEndTime.setHours(dealEndTime.getHours() + 24);

            function updateTimer() {
                const now = new Date();
                const timeLeft = dealEndTime - now;

                if(timeLeft <= 0) {
                    // Deal expired
                    Object.values(timerElements).forEach(element => {
                        if(element) element.textContent = '00';
                    });
                    clearInterval(timerInterval);
                    showNotification('Deal has expired!', 'warning');
                    return;
                }

                const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
                const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

                if(timerElements.days) timerElements.days.textContent = days.toString().padStart(2, '0');
                if(timerElements.hours) timerElements.hours.textContent = hours.toString().padStart(2, '0');
                if(timerElements.minutes) timerElements.minutes.textContent = minutes.toString().padStart(2, '0');
                if(timerElements.seconds) timerElements.seconds.textContent = seconds.toString().padStart(2, '0');
            }

            // Update timer immediately and every second
            updateTimer();
            const timerInterval = setInterval(updateTimer, 1000);
        }
    }

    initializeDealsTimer();

    // 11. Smooth Scrolling
    const internalLinks = document.querySelectorAll('a[href^="#"]');
    internalLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if(href !== '#' && href !== '') {
                e.preventDefault();
                const target = document.querySelector(href);
                if(target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // 12. Scroll to Top Button
    function initializeScrollToTop() {
        let scrollTopBtn = document.querySelector('.scroll-top-btn');
        
        if(!scrollTopBtn) {
            scrollTopBtn = document.createElement('button');
            scrollTopBtn.className = 'scroll-top-btn';
            scrollTopBtn.innerHTML = '<i class="fas fa-chevron-up"></i>';
            scrollTopBtn.setAttribute('aria-label', 'Scroll to top');
            scrollTopBtn.style.cssText = `
                position: fixed;
                bottom: 30px;
                right: 30px;
                width: 50px;
                height: 50px;
                background: #2563eb;
                color: white;
                border: none;
                border-radius: 50%;
                font-size: 18px;
                cursor: pointer;
                display: none;
                z-index: 1000;
                box-shadow: 0 4px 12px rgba(0,0,0,0.2);
                transition: all 0.3s ease;
            `;
            document.body.appendChild(scrollTopBtn);

            // Hover effect
            scrollTopBtn.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-2px)';
                this.style.boxShadow = '0 6px 16px rgba(0,0,0,0.3)';
            });

            scrollTopBtn.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0)';
                this.style.boxShadow = '0 4px 12px rgba(0,0,0,0.2)';
            });
        }

        window.addEventListener('scroll', function() {
            if(window.pageYOffset > 300) {
                scrollTopBtn.style.display = 'block';
            } else {
                scrollTopBtn.style.display = 'none';
            }
        });

        scrollTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    initializeScrollToTop();

    // 13. Image Lazy Loading
    function initializeLazyLoading() {
        const images = document.querySelectorAll('img');
        
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if(entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });

        images.forEach(img => {
            if(img.complete) return;
            img.classList.add('lazy');
            imageObserver.observe(img);
        });
    }

    initializeLazyLoading();

    // 14. Form Validation Functions
    function validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function validateQuoteForm() {
        if(!quoteInputs.item || quoteInputs.item.value.trim() === '') {
            showNotification('Please enter the item you need', 'error');
            quoteInputs.item.focus();
            return false;
        }
        
        if(quoteInputs.quantity && quoteInputs.quantity.value < 1) {
            showNotification('Please enter a valid quantity', 'error');
            quoteInputs.quantity.focus();
            return false;
        }
        
        return true;
    }

    function resetQuoteForm() {
        if(quoteInputs.item) quoteInputs.item.value = '';
        if(quoteInputs.details) quoteInputs.details.value = '';
        if(quoteInputs.quantity) quoteInputs.quantity.value = '';
        if(quoteInputs.unit) quoteInputs.unit.value = 'Pcs';
    }

    // 15. Notification System
    function showNotification(message, type = 'info') {
        // Remove existing notifications
        const existingNotifications = document.querySelectorAll('.custom-notification');
        existingNotifications.forEach(notification => notification.remove());

        const notification = document.createElement('div');
        notification.className = `custom-notification ${type}`;
        notification.innerHTML = `
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        `;

        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${getNotificationColor(type)};
            color: white;
            padding: 15px 20px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            z-index: 10000;
            display: flex;
            align-items: center;
            gap: 15px;
            max-width: 400px;
            animation: slideInRight 0.3s ease;
        `;

        document.body.appendChild(notification);

        // Close button
        notification.querySelector('.notification-close').addEventListener('click', function() {
            notification.remove();
        });

        // Auto remove after 5 seconds
        setTimeout(() => {
            if(notification.parentNode) {
                notification.remove();
            }
        }, 5000);
    }

    function getNotificationColor(type) {
        const colors = {
            success: '#10b981',
            error: '#ef4444',
            warning: '#f59e0b',
            info: '#3b82f6'
        };
        return colors[type] || colors.info;
    }

    // 16. Cart and Wishlist Functions
    function addToCart(productName) {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        cart.push({
            name: productName,
            id: Date.now(),
            addedAt: new Date().toISOString()
        });
        localStorage.setItem('cart', JSON.stringify(cart));
        
        updateCartCounter();
        showNotification(`${productName} added to cart!`, 'success');
    }

    function addToWishlist(productName) {
        let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
        wishlist.push({
            name: productName,
            id: Date.now(),
            addedAt: new Date().toISOString()
        });
        localStorage.setItem('wishlist', JSON.stringify(wishlist));
        
        showNotification(`${productName} added to wishlist!`, 'success');
    }

    function addToRecentViewed(productElement) {
        let recentViewed = JSON.parse(localStorage.getItem('recentViewed')) || [];
        const productName = productElement.querySelector('h4') ? productElement.querySelector('h4').textContent : 'Product';
        
        recentViewed = recentViewed.filter(item => item.name !== productName);
        recentViewed.unshift({
            name: productName,
            viewedAt: new Date().toISOString()
        });
        
        // Keep only last 10 items
        recentViewed = recentViewed.slice(0, 10);
        localStorage.setItem('recentViewed', JSON.stringify(recentViewed));
    }

    function updateCartCounter() {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const cartCounter = document.querySelector('.cart-counter');
        
        if(cartCounter) {
            cartCounter.textContent = cart.length;
            cartCounter.style.display = cart.length > 0 ? 'flex' : 'none';
        }
    }

    // // 17. Initialize Cart Counter
    // function initializeCartCounter() {
    //     const cartIcon = document.querySelector('.fa-shopping-cart').closest('.icon-item');
    //     if(cartIcon) {
    //         const cartCounter = document.createElement('span');
    //         cartCounter.className = 'cart-counter';
    //         cartCounter.style.cssText = `
    //             position: absolute;
    //             top: -5px;
    //             right: -5px;
    //             background: #ef4444;
    //             color: white;
    //             border-radius: 50%;
    //             width: 18px;
    //             height: 18px;
    //             font-size: 12px;
    //             display: none;
    //             align-items: center;
    //             justify-content: center;
    //         `;
    //         cartIcon.style.position = 'relative';
    //         cartIcon.appendChild(cartCounter);
            
    //         updateCartCounter();
    //     }
    // }

    // initializeCartCounter();

    // 18. Responsive Menu Toggle
    function initializeMobileMenu() {
        const mobileMenuToggle = document.createElement('button');
        mobileMenuToggle.className = 'mobile-menu-toggle';
        mobileMenuToggle.innerHTML = '<i class="fas fa-bars"></i>';
        mobileMenuToggle.style.cssText = `
            display: none;
            background: none;
            border: none;
            font-size: 24px;
            cursor: pointer;
            color: #333;
            padding: 5px;
        `;

        const topBar = document.querySelector('.top-bar');
        if(topBar && window.innerWidth <= 768) {
            topBar.insertBefore(mobileMenuToggle, topBar.firstChild);
            
            mobileMenuToggle.addEventListener('click', function() {
                const navLinks = document.querySelector('.nav-links');
                if(navLinks) {
                    navLinks.classList.toggle('show');
                }
            });
        }
    }

    // Initialize on resize
    window.addEventListener('resize', initializeMobileMenu);
    initializeMobileMenu();

    // 19. Keyboard Navigation
    document.addEventListener('keydown', function(e) {
        // Escape key closes modals/dropdowns
        if(e.key === 'Escape') {
            const openDropdowns = document.querySelectorAll('.language-dropdown[style*="block"], .categories-sidebar.show');
            openDropdowns.forEach(dropdown => {
                dropdown.style.display = 'none';
                dropdown.classList.remove('show');
            });
        }
    });

    // 20. Performance Monitoring
    let pageLoadTime = Date.now() - performance.timing.navigationStart;
    console.log(`Page loaded in ${pageLoadTime}ms`);

    // Log user interactions for analytics
    document.addEventListener('click', function(e) {
        const interactiveElement = e.target.closest('button, a, .nav-item, .category-item, .product-card');
        if(interactiveElement) {
            console.log('User interacted with:', interactiveElement.textContent || interactiveElement.className);
        }
    });

    console.log('E-Commerce Website JavaScript Loaded Successfully ');
});

