// Simple local authentication and navigation

// Sample users database (in real app, this would be a backend database)
const users = {
    'user@example.com': {
        password: 'password123',
        role: 'user',
        name: 'Climate Hero'
    },
    'admin@greenfootprint.com': {
        password: 'admin123',
        role: 'admin',
        name: 'Admin'
    }
};

// Current user (stored in browser's local storage)
let currentUser = null;

// Login form handler
document.getElementById('loginForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    // Simple validation
    if (users[email] && users[email].password === password) {
        // Login successful
        currentUser = {
            email: email,
            role: users[email].role,
            name: users[email].name
        };
        
        // Store in local storage
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        
        // Show success message
        alert(`Welcome ${currentUser.name}! 🌱`);
        
        // Redirect based on role
        if (currentUser.role === 'admin') {
            window.location.href = 'admin.html';
        } else {
            window.location.href = 'dashboard.html';
        }
    } else {
        alert('Invalid email or password. Try the test accounts below.');
    }
});

// Quick login functions
function loginAsUser() {
    document.getElementById('email').value = 'user@example.com';
    document.getElementById('password').value = 'password123';
    document.getElementById('loginForm').dispatchEvent(new Event('submit'));
}

function loginAsAdmin() {
    document.getElementById('email').value = 'admin@greenfootprint.com';
    document.getElementById('password').value = 'admin123';
    document.getElementById('loginForm').dispatchEvent(new Event('submit'));
}

// Check if user is logged in (for other pages)
function checkAuth() {
    const stored = localStorage.getItem('currentUser');
    if (stored) {
        currentUser = JSON.parse(stored);
        return true;
    }
    return false;
}

// Logout function
function logout() {
    localStorage.removeItem('currentUser');
    currentUser = null;
    window.location.href = 'index.html';
}

// Protect admin pages
function requireAdmin() {
    if (!checkAuth() || currentUser.role !== 'admin') {
        alert('Access denied. Admin privileges required.');
        window.location.href = 'index.html';
        return false;
    }
    return true;
}

// Protect user pages
function requireAuth() {
    if (!checkAuth()) {
        alert('Please sign in first.');
        window.location.href = 'index.html';
        return false;
    }
    return true;
}