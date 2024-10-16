document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('myForm');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        let isValid = true;
        let errorMessages = [];

        // Check if all fields are blank
        if (nameInput.value.trim() === '' && emailInput.value.trim() === '' && passwordInput.value.trim() === '') {
            alert('Error: All fields are blank. Please fill out the form.');
            return;
        }

        // Name validation
        if (nameInput.value.trim() === '') {
            errorMessages.push('Name is required');
            isValid = false;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailInput.value)) {
            errorMessages.push('Invalid email address');
            isValid = false;
        }

        // Password validation
        if (passwordInput.value.length < 6) {
            errorMessages.push('Password must be at least 6 characters long');
            isValid = false;
        }

        if (isValid) {
            alert('Form submitted successfully!');
            form.reset();
        } else {
            alert('Error: ' + errorMessages.join(', '));
        }
    });
});
