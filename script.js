document.addEventListener('DOMContentLoaded', function () {
    // DOM Elements
    const loginScreen = document.getElementById('login-screen');
    const dashboardScreen = document.getElementById('dashboard-screen');
    const formTitle = document.getElementById('form-title');
    const authForm = document.getElementById('auth-form');
    const confirmPasswordGroup = document.getElementById('confirm-password-group');
    const confirmPasswordInput = document.getElementById('confirm-password');
    const switchAuthBtn = document.getElementById('switch-auth-btn');
    const submitBtn = document.getElementById('submit-btn');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const messageDiv = document.getElementById('message');
    const usernameDisplay = document.getElementById('username-display');
    const logoutBtn = document.getElementById('logout-btn');

    let isLoginMode = true;

    // Switch between login and signup modes
    switchAuthBtn.addEventListener('click', function () {
        isLoginMode = !isLoginMode;

        if (isLoginMode) {
            formTitle.textContent = 'Login';
            submitBtn.textContent = 'Login';
            switchAuthBtn.textContent = 'Create an account';
            confirmPasswordGroup.style.display = 'none';
            confirmPasswordInput.removeAttribute('required');
        } else {
            formTitle.textContent = 'Create Account';
            submitBtn.textContent = 'Sign Up';
            switchAuthBtn.textContent = 'Already have an account?';
            confirmPasswordGroup.style.display = 'block';
            confirmPasswordInput.setAttribute('required', '');
        }

        // Clear form and messages
        authForm.reset();
        hideMessage();
    });

    // Form submission
    authForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const username = usernameInput.value.trim();
        const password = passwordInput.value;
        const confirmPassword = confirmPasswordInput.value;

        // Validate inputs
        if (!username) {
            showMessage('Please enter a username or email', 'error');
            return;
        }

        if (!password) {
            showMessage('Please enter a password', 'error');
            return;
        }

        if (!isLoginMode && password !== confirmPassword) {
            showMessage('Passwords do not match', 'error');
            return;
        }

        if (isLoginMode) {
            // Simulate login process
            showMessage('Logging in...', 'success');

            setTimeout(function () {
                // REDIRECT TO ANOTHER PAGE
                window.location.href = 'dashboard.html?username=' + encodeURIComponent(username);
            }, 1000);
        } else {
            // Simulate signup process
            showMessage('Creating account...', 'success');

            setTimeout(function () {
                // Switch to login mode after successful signup
                isLoginMode = true;
                formTitle.textContent = 'Login';
                submitBtn.textContent = 'Login';
                switchAuthBtn.textContent = 'Create an account';
                confirmPasswordGroup.style.display = 'none';
                confirmPasswordInput.removeAttribute('required');
                showMessage('Account created successfully! Please login.', 'success');
                authForm.reset();
            }, 1000);
        }
    });

    // Helper functions for messages
    function showMessage(text, type) {
        messageDiv.textContent = text;
        messageDiv.className = 'message ' + type;
        messageDiv.style.display = 'block';
    }

    function hideMessage() {
        messageDiv.style.display = 'none';
    }

    // Initialize the application
    checkRememberedUser();
});