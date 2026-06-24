// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initFilters();
    initSearch();
    initWishlist();
    initViewToggle();
    initPriceRange();
    initNavigation();
    initNewsletter();
    initProductInteractions();
});

// Filter Functionality
function initFilters() {
    const filterTitles = document.querySelectorAll('.filter-title');
    
    filterTitles.forEach(title => {
        title.addEventListener('click', function() {
            const filterGroup = this.parentElement;
            const filterList = this.nextElementSibling;
            const arrow = this.querySelector('.filter-arrow');
            
            // Toggle filter group
            filterGroup.classList.toggle('active');
            
            // Rotate arrow
            if (filterGroup.classList.contains('active')) {
                arrow.style.transform = 'rotate(180deg)';
                if (filterList.style.display === 'none') {
                    filterList.style.display = 'block';
                }
            } else {
                arrow.style.transform = 'rotate(0deg)';
                filterList.style.display = 'none';
            }
        });
    });

    // Checkbox and Radio Filters
    const filterCheckboxes = document.querySelectorAll('.filter-checkbox input[type="checkbox"]');
    const filterRadios = document.querySelectorAll('.filter-radio input[type="radio"]');
    
    filterCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', applyFilters);
    });
    
    filterRadios.forEach(radio => {
        radio.addEventListener('change', applyFilters);
    });
}

// Apply Filters Function
function applyFilters() {
    console.log('Filters applied!');
    // Here you would typically make an API call or filter products
    showLoadingState();
    
    // Simulate API call delay
    setTimeout(() => {
        updateProductCount();
        hideLoadingState();
    }, 500);
}

// Search Functionality
function initSearch() {
    const searchBtn = document.querySelector('.search-btn');
    const searchInput = document.querySelector('.search-input');
    const categoryDropdown = document.querySelector('.category-dropdown');
    
    searchBtn.addEventListener('click', performSearch);
    
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            performSearch();
        }
    });
    
    function performSearch() {
        const searchTerm = searchInput.value.trim();
        const category = categoryDropdown.value;
        
        if (searchTerm === '') {
            showNotification('Please enter a search term', 'warning');
            return;
        }
        
        console.log(`Searching for: ${searchTerm} in category: ${category}`);
        showLoadingState();
        
        // Simulate search
        setTimeout(() => {
            showNotification(`Found results for "${searchTerm}" in ${category}`, 'success');
            hideLoadingState();
        }, 1000);
    }
}

// Wishlist Functionality
function initWishlist() {
    const wishlistBtns = document.querySelectorAll('.wishlist-btn');
    
    wishlistBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const productCard = this.closest('.product-card');
            const productTitle = productCard.querySelector('.product-title').textContent;
            
            this.classList.toggle('active');
            
            if (this.classList.contains('active')) {
                this.innerHTML = `
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="#ef4444" stroke="#ef4444" stroke-width="2">
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                    </svg>
                `;
                showNotification(`"${productTitle}" added to wishlist`, 'success');
                updateWishlistCount(1);
            } else {
                this.innerHTML = `
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                    </svg>
                `;
                showNotification(`"${productTitle}" removed from wishlist`, 'info');
                updateWishlistCount(-1);
            }
        });
    });
}

// View Toggle Functionality
function initViewToggle() {
    const viewBtns = document.querySelectorAll('.view-btn');
    const productsGrid = document.querySelector('.products-grid');
    
    viewBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            viewBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            // Toggle grid/list view
            if (this.querySelector('rect').getAttribute('width') === '7') {
                // Grid view
                productsGrid.classList.remove('list-view');
                productsGrid.classList.add('grid-view');
            } else {
                // List view
                productsGrid.classList.remove('grid-view');
                productsGrid.classList.add('list-view');
            }
        });
    });
}

// Price Range Functionality
function initPriceRange() {
    const priceSlider = document.querySelector('.range-slider');
    const minPriceInput = document.querySelector('.price-inputs input:first-child');
    const maxPriceInput = document.querySelector('.price-inputs input:last-child');
    const applyBtn = document.querySelector('.apply-btn');
    
    if (priceSlider && minPriceInput && maxPriceInput) {
        // Set initial values
        minPriceInput.value = '0';
        maxPriceInput.value = '999999';
        
        priceSlider.addEventListener('input', function() {
            minPriceInput.value = this.value;
        });
        
        minPriceInput.addEventListener('input', function() {
            priceSlider.value = this.value;
        });
        
        maxPriceInput.addEventListener('input', function() {
            // Ensure max is greater than min
            if (parseInt(this.value) < parseInt(minPriceInput.value)) {
                this.value = parseInt(minPriceInput.value) + 100;
            }
        });
        
        applyBtn.addEventListener('click', function() {
            const minPrice = minPriceInput.value;
            const maxPrice = maxPriceInput.value;
            
            console.log(`Price range applied: $${minPrice} - $${maxPrice}`);
            showNotification(`Price filter applied: $${minPrice} - $${maxPrice}`, 'success');
            applyFilters();
        });
    }
}

// Navigation Functionality
function initNavigation() {
    // All Category Button
    const allCategoryBtn = document.getElementById('allCategoryBtn');
    if (allCategoryBtn) {
        allCategoryBtn.addEventListener('click', function() {
            showCategoryDropdown();
        });
    }
    
    // Breadcrumb navigation
    const breadcrumbLinks = document.querySelectorAll('.breadcrumb-link');
    breadcrumbLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const page = this.textContent;
            showNotification(`Navigating to ${page}`, 'info');
            // Here you would typically navigate to the page
        });
    });
    
    // Pagination
    const pageBtns = document.querySelectorAll('.page-btn');
    pageBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            if (this.textContent === '‹' || this.textContent === '›') {
                handlePaginationArrow(this.textContent);
            } else {
                handlePaginationNumber(parseInt(this.textContent));
            }
        });
    });
}

// Newsletter Functionality
function initNewsletter() {
    const newsletterForm = document.querySelector('.newsletter-form');
    const newsletterInput = document.querySelector('.newsletter-input');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = newsletterInput.value.trim();
            
            if (!isValidEmail(email)) {
                showNotification('Please enter a valid email address', 'error');
                return;
            }
            
            // Simulate newsletter subscription
            showLoadingState();
            setTimeout(() => {
                showNotification('Successfully subscribed to newsletter!', 'success');
                newsletterInput.value = '';
                hideLoadingState();
            }, 1500);
        });
    }
}

// Product Interactions
function initProductInteractions() {
    const productCards = document.querySelectorAll('.product-card');
    const viewDetailsLinks = document.querySelectorAll('.view-details');
    
    productCards.forEach(card => {
        card.addEventListener('click', function(e) {
            if (!e.target.closest('.wishlist-btn') && !e.target.closest('.view-details')) {
                const productTitle = this.querySelector('.product-title').textContent;
                console.log(`Viewing product: ${productTitle}`);
                // Here you would typically navigate to product detail page
            }
        });
    });
    
    viewDetailsLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            const productTitle = this.closest('.product-card').querySelector('.product-title').textContent;
            showNotification(`Loading details for: ${productTitle}`, 'info');
            // Navigate to product detail page
        });
    });
}

// Utility Functions
function showNotification(message, type = 'info') {
    // Remove existing notification
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create new notification
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <span>${message}</span>
        <button class="notification-close">&times;</button>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 12px 20px;
        background: ${getNotificationColor(type)};
        color: white;
        border-radius: 6px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        z-index: 1000;
        display: flex;
        align-items: center;
        gap: 10px;
        animation: slideIn 0.3s ease;
    `;
    
    // Close button
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.style.cssText = `
        background: none;
        border: none;
        color: white;
        font-size: 18px;
        cursor: pointer;
        padding: 0;
        width: 20px;
        height: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
    `;
    
    closeBtn.addEventListener('click', () => {
        notification.remove();
    });
    
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
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

function showLoadingState() {
    const loading = document.createElement('div');
    loading.className = 'loading-overlay';
    loading.innerHTML = `
        <div class="loading-spinner"></div>
        <p>Loading...</p>
    `;
    
    loading.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(255,255,255,0.9);
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        z-index: 9999;
    `;
    
    const spinner = loading.querySelector('.loading-spinner');
    spinner.style.cssText = `
        width: 40px;
        height: 40px;
        border: 4px solid #f3f3f3;
        border-top: 4px solid #2563eb;
        border-radius: 50%;
        animation: spin 1s linear infinite;
        margin-bottom: 10px;
    `;
    
    document.body.appendChild(loading);
}

function hideLoadingState() {
    const loading = document.querySelector('.loading-overlay');
    if (loading) {
        loading.remove();
    }
}

function updateProductCount() {
    const countElement = document.querySelector('.products-count strong:first-child');
    if (countElement) {
        // Simulate random product count update
        const newCount = Math.floor(Math.random() * 5000) + 10000;
        countElement.textContent = newCount.toLocaleString();
    }
}

function updateWishlistCount(change) {
    // This would typically update a counter in the header
    console.log(`Wishlist count changed by: ${change}`);
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function handlePaginationArrow(direction) {
    const activePage = document.querySelector('.page-btn.active');
    let currentPage = parseInt(activePage.textContent);
    
    if (direction === '‹' && currentPage > 1) {
        currentPage--;
    } else if (direction === '›') {
        currentPage++;
    }
    
    updatePagination(currentPage);
}

function handlePaginationNumber(pageNumber) {
    updatePagination(pageNumber);
}

function updatePagination(pageNumber) {
    const pageBtns = document.querySelectorAll('.page-btn');
    pageBtns.forEach(btn => {
        btn.classList.remove('active');
        if (btn.textContent === pageNumber.toString()) {
            btn.classList.add('active');
        }
    });
    
    showNotification(`Loading page ${pageNumber}...`, 'info');
    applyFilters();
}

function showCategoryDropdown() {
    showNotification('Category dropdown opened', 'info');
    // Implement category dropdown logic here
}

//     
document.querySelector('.cart-link').addEventListener('click', function() {
    window.location.href = 'cart.html';
});
