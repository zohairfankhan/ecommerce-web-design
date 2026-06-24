// PRODUCT DEATIAL PAGE - JAVASCRIPT


'use strict';

// INITIALIZATION ON PAGE LOAD

document.addEventListener('DOMContentLoaded', function() {
    console.log('✓ Product Listing Page JavaScript Loaded Successfully!');
    
    initializeFilters();
    initializeViewToggle();
    initializePagination();
    initializeFavoriteButtons();
    initializeProductInteractions();
    initializeSorting();
    initializeSearch();
});

// FILTER TOGGLE FUNCTIONALITY
function initializeFilters() {
    const filterHeaders = document.querySelectorAll('.filter-header');
    
    filterHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const filterGroup = this.parentElement;
            const filterList = filterGroup.querySelector('.filter-list');
            const arrow = this.querySelector('.filter-arrow');
            
            // Toggle active class
            filterGroup.classList.toggle('active');
            
            // Animate arrow rotation
            if (filterGroup.classList.contains('active')) {
                filterList.style.display = 'block';
                arrow.style.transform = 'rotate(180deg)';
            } else {
                filterList.style.display = 'none';
                arrow.style.transform = 'rotate(0deg)';
            }
        });
    });

    // Filter checkbox functionality
    const filterCheckboxes = document.querySelectorAll('.checkbox-label input[type="checkbox"]');
    
    filterCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            applyFilters();
        });
    });

    // Filter link functionality
    const filterLinks = document.querySelectorAll('.filter-link');
    
    filterLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const filterText = this.textContent;
            showNotification(`Filter applied: ${filterText}`, 'info');
            applyFilters();
        });
    });
}

// Apply all active filters
function applyFilters() {
    const activeFilters = {};
    let hasActiveFilters = false;
    
    document.querySelectorAll('.filter-group').forEach(group => {
        const filterName = group.querySelector('.filter-title').textContent;
        const checkedBoxes = group.querySelectorAll('input[type="checkbox"]:checked');
        
        if (checkedBoxes.length > 0) {
            activeFilters[filterName] = Array.from(checkedBoxes).map(cb => 
                cb.nextElementSibling.textContent.trim()
            );
            hasActiveFilters = true;
        }
    });
    
    // Show/hide active filters section
    const activeFiltersSection = document.querySelector('.active-filters-section');
    if (hasActiveFilters) {
        activeFiltersSection.classList.add('show');
        updateActiveFilterTags(activeFilters);
    } else {
        activeFiltersSection.classList.remove('show');
    }
    
    console.log('Active Filters:', activeFilters);
    showNotification('Filters applied successfully!', 'success');
}

// Update active filter tags display
function updateActiveFilterTags(activeFilters) {
    const filterTagsContainer = document.querySelector('.filter-tags-container');
    filterTagsContainer.innerHTML = '';
    
    Object.keys(activeFilters).forEach(filterName => {
        activeFilters[filterName].forEach(filterValue => {
            const filterTag = document.createElement('span');
            filterTag.className = 'filter-tag';
            filterTag.innerHTML = `
                ${filterValue}
                <button class="filter-tag-remove">×</button>
            `;
            filterTagsContainer.appendChild(filterTag);
        });
    });
    
    // Add event listeners to remove buttons
    document.querySelectorAll('.filter-tag-remove').forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation();
            const filterTag = this.parentElement;
            const filterValue = filterTag.textContent.replace('×', '').trim();
            removeFilter(filterValue);
            filterTag.remove();
        });
    });
}

// Remove specific filter
function removeFilter(filterValue) {
    const checkboxes = document.querySelectorAll('.checkbox-label input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
        if (checkbox.nextElementSibling.textContent.trim() === filterValue) {
            checkbox.checked = false;
        }
    });
    applyFilters();
}

// Clear all filters
document.querySelector('.clear-all-filters-btn')?.addEventListener('click', function() {
    const checkboxes = document.querySelectorAll('.checkbox-label input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
        checkbox.checked = false;
    });
    
    const activeFiltersSection = document.querySelector('.active-filters-section');
    activeFiltersSection.classList.remove('show');
    
    showNotification('All filters cleared!', 'info');
});

// GRID / LIST VIEW TOGGLE
function initializeViewToggle() {
    const viewButtons = document.querySelectorAll('.view-btn');
    const productsGrid = document.querySelector('.products-grid');
    
    if (!viewButtons.length || !productsGrid) return;
    
    viewButtons.forEach(button => {
        button.addEventListener('click', function() {
            const viewType = this.getAttribute('data-view');
            
            // Remove active class from all buttons
            viewButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Toggle grid/list view
            if (viewType === 'list') {
                productsGrid.classList.remove('grid-view');
                productsGrid.classList.add('list-view');
            } else {
                productsGrid.classList.remove('list-view');
                productsGrid.classList.add('grid-view');
            }
            
            // Save preference to localStorage
            localStorage.setItem('productViewPreference', viewType);
        });
    });
    
    // Load saved view preference
    const savedView = localStorage.getItem('productViewPreference');
    if (savedView === 'list') {
        document.querySelector('[data-view="list"]')?.click();
    }
}

// PAGINATION FUNCTIONALITY
function initializePagination() {
    const paginationButtons = document.querySelectorAll('.pagination-btn:not(.prev-btn):not(.next-btn)');
    const prevButton = document.querySelector('.prev-btn');
    const nextButton = document.querySelector('.next-btn');
    
    if (!paginationButtons.length) return;
    
    let currentPage = 1;
    const totalPages = paginationButtons.length;
    
    // Update pagination UI
    function updatePagination() {
        paginationButtons.forEach(btn => {
            const pageNumber = parseInt(btn.textContent);
            if (pageNumber === currentPage) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
        
        // Disable/enable prev and next buttons
        if (prevButton) prevButton.disabled = (currentPage === 1);
        if (nextButton) nextButton.disabled = (currentPage === totalPages);
    }
    
    // Handle page number click
    paginationButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            currentPage = parseInt(this.textContent);
            updatePagination();
            loadProducts(currentPage);
        });
    });
    
    // Handle previous button click
    if (prevButton) {
        prevButton.addEventListener('click', function() {
            if (currentPage > 1) {
                currentPage--;
                updatePagination();
                loadProducts(currentPage);
            }
        });
    }
    
    // Handle next button click
    if (nextButton) {
        nextButton.addEventListener('click', function() {
            if (currentPage < totalPages) {
                currentPage++;
                updatePagination();
                loadProducts(currentPage);
            }
        });
    }
    
    // Initialize pagination
    updatePagination();
}

// Load products for specific page
function loadProducts(page) {
    console.log(`Loading products for page ${page}`);
    showNotification(`Loading page ${page}...`, 'info');
    
    // Simulate loading delay
    setTimeout(() => {
        showNotification(`Page ${page} loaded successfully!`, 'success');
    }, 500);
}

// FAVORITE BUTTON FUNCTIONALITY

function initializeFavoriteButtons() {
    const favoriteButtons = document.querySelectorAll('.favorite-btn');
    
    favoriteButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            this.classList.toggle('active');
            
            const productName = this.closest('.product-card')
                .querySelector('.product-name').textContent;
            
            if (this.classList.contains('active')) {
                this.innerHTML = '♥';
                this.style.color = '#ef4444';
                showNotification(`"${productName}" added to favorites!`, 'success');
                saveFavorite(productName, true);
            } else {
                this.innerHTML = '♡';
                this.style.color = '#d1d5db';
                showNotification(`"${productName}" removed from favorites!`, 'info');
                saveFavorite(productName, false);
            }
        });
    });
    
    // Load favorites on page load
    loadFavorites();
}

// Save favorite to localStorage
function saveFavorite(productName, isFavorite) {
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    
    if (isFavorite) {
        if (!favorites.includes(productName)) {
            favorites.push(productName);
        }
    } else {
        favorites = favorites.filter(item => item !== productName);
    }
    
    localStorage.setItem('favorites', JSON.stringify(favorites));
}

// Load favorites from localStorage
function loadFavorites() {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    
    document.querySelectorAll('.favorite-btn').forEach(button => {
        const productName = button.closest('.product-card')
            .querySelector('.product-name').textContent;
        
        if (favorites.includes(productName)) {
            button.classList.add('active');
            button.innerHTML = '♥';
            button.style.color = '#ef4444';
        }
    });
}

// PRODUCT INTERACTIONS
function initializeProductInteractions() {
    const productCards = document.querySelectorAll('.product-card');
    const viewDetailsLinks = document.querySelectorAll('.view-details-link');
    
    // Product card hover effects
    productCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
        
        // Product card click (excluding buttons)
        card.addEventListener('click', function(e) {
            if (!e.target.closest('.favorite-btn') && !e.target.closest('.view-details-link')) {
                const productName = this.querySelector('.product-name').textContent;
                showNotification(`Viewing product: ${productName}`, 'info');
            }
        });
    });
    
    // View details links
    viewDetailsLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const productName = this.closest('.product-card')
                .querySelector('.product-name').textContent;
            
            showNotification(`Loading details for: ${productName}`, 'info');
            
            // Simulate loading product details
            setTimeout(() => {
                showNotification(`Product details loaded for: ${productName}`, 'success');
            }, 1000);
        });
    });
}

// SORTING FUNCTIONALITY

function initializeSorting() {
    const sortDropdown = document.querySelector('.sort-dropdown');
    
    if (sortDropdown) {
        sortDropdown.addEventListener('change', function() {
            const sortValue = this.value;
            sortProducts(sortValue);
        });
    }
    
    // Verified and Featured checkboxes
    const verifiedCheckbox = document.querySelector('#verifiedOnly');
    const featuredCheckbox = document.querySelector('#featuredOnly');
    
    if (verifiedCheckbox) {
        verifiedCheckbox.addEventListener('change', function() {
            console.log('Verified only:', this.checked);
            showNotification(`Verified filter: ${this.checked ? 'ON' : 'OFF'}`, 'info');
        });
    }
    
    if (featuredCheckbox) {
        featuredCheckbox.addEventListener('change', function() {
            console.log('Featured only:', this.checked);
            showNotification(`Featured filter: ${this.checked ? 'ON' : 'OFF'}`, 'info');
        });
    }
}

// Sort products based on criteria
function sortProducts(criteria) {
    const productsContainer = document.querySelector('.products-grid');
    const products = Array.from(document.querySelectorAll('.product-card'));
    
    products.sort((a, b) => {
        const priceA = parseFloat(
            a.querySelector('.product-price').textContent.replace('$', '').replace(',', '')
        );
        const priceB = parseFloat(
            b.querySelector('.product-price').textContent.replace('$', '').replace(',', '')
        );
        
        switch(criteria) {
            case 'Price: Low to High':
                return priceA - priceB;
            case 'Price: High to Low':
                return priceB - priceA;
            default:
                return 0;
        }
    });
    
    // Clear and re-append sorted products
    productsContainer.innerHTML = '';
    products.forEach(product => {
        productsContainer.appendChild(product);
    });
    
    showNotification(`Products sorted by: ${criteria}`, 'success');
    
    // Re-initialize favorite buttons after sorting
    initializeFavoriteButtons();
    initializeProductInteractions();
}


// SEARCH FUNCTIONALITY
function initializeSearch() {
    const searchInput = document.querySelector('.search-input');
    const searchButton = document.querySelector('.search-btn');
    const categoryDropdown = document.querySelector('.category-dropdown');
    
    if (searchButton) {
        searchButton.addEventListener('click', function() {
            performSearch();
        });
    }
    
    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
    }
}

function performSearch() {
    const searchInput = document.querySelector('.search-input');
    const categoryDropdown = document.querySelector('.category-dropdown');
    
    const searchTerm = searchInput.value.trim();
    const category = categoryDropdown ? categoryDropdown.value : 'All category';
    
    if (!searchTerm) {
        showNotification('Please enter a search term', 'warning');
        return;
    }
    
    showNotification(`Searching for "${searchTerm}" in ${category}...`, 'info');
    
    // Simulate search delay
    setTimeout(() => {
        showNotification(`Found results for "${searchTerm}" in ${category}`, 'success');
    }, 1000);
}

// NOTIFICATION SYSTEM
function showNotification(message, type = 'info') {
    // Remove existing notification if any
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    
    // Add icon based on type
    let icon = '';
    switch(type) {
        case 'success':
            icon = '✓';
            break;
        case 'error':
            icon = '✕';
            break;
        case 'warning':
            icon = '⚠';
            break;
        default:
            icon = 'ℹ';
    }
    
    notification.innerHTML = `
        <span class="notification-icon">${icon}</span>
        <span class="notification-message">${message}</span>
        <button class="notification-close">×</button>
    `;
    
    document.body.appendChild(notification);
    
    // Auto remove after 4 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.style.opacity = '0';
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notification.parentElement) {
                    notification.remove();
                }
            }, 300);
        }
    }, 4000);
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', function() {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentElement) {
                notification.remove();
            }
        }, 300);
    });
}

// UTILITY FUNCTIONS


// Format price
function formatPrice(price) {
    return `$${parseFloat(price).toFixed(2)}`;
}

// Get product data from card
function getProductData(card) {
    return {
        name: card.querySelector('.product-name').textContent,
        price: card.querySelector('.product-price').textContent,
        originalPrice: card.querySelector('.product-original-price')?.textContent,
        rating: card.querySelector('.rating-count').textContent,
        image: card.querySelector('.product-image img').src
    };
}

// KEYBOARD SHORTCUTS (Optional)

document.addEventListener('keydown', function(e) {
    // Escape - Close any open notifications
    if (e.key === 'Escape') {
        const notification = document.querySelector('.notification');
        if (notification) {
            notification.remove();
        }
    }
});

// PERFORMANCE OPTIMIZATION

// Debounce function for search
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function for scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

console.log(' All JavaScript functionality initialized successfully!');