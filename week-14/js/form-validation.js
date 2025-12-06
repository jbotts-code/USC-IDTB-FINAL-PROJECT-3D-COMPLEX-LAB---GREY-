/**
 * Form Validation Script for Contact Form with Mailto Integration
 * Handles client-side validation and mailto link generation
 */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeFormValidation();
});

function initializeFormValidation() {
    const form = document.getElementById('contact-form');
    const nameField = document.getElementById('name');
    const emailField = document.getElementById('email');
    const subjectField = document.getElementById('subject');
    const messageField = document.getElementById('message');

    // Check if all elements exist
    if (!form || !nameField || !emailField || !subjectField || !messageField) {
        console.error('Form validation: Some form elements not found');
        return;
    }

    // Add form submission validation
    form.addEventListener('submit', handleFormSubmit);
    
    // Add real-time validation feedback for each field
    setupFieldValidation(nameField, validateNameRealTime);
    setupFieldValidation(emailField, validateEmailRealTime);
    setupFieldValidation(subjectField, validateSubjectRealTime);
    setupFieldValidation(messageField, validateMessageRealTime);
    
    console.log('Form validation initialized successfully');
}

function setupFieldValidation(field, validationFunction) {
    if (!field) {
        console.error('Field is null, cannot setup validation');
        return;
    }
    
    // Clear error on input
    field.addEventListener('input', function() {
        clearFieldError(this);
        hideValidationMessage(this);
    });
    
    // Show validation message on blur if field is invalid
    field.addEventListener('blur', function() {
        if (this.value.trim() === '') {
            showValidationMessage(this, this.title || 'This field is required');
        } else {
            validationFunction(this);
        }
    });
    
    // Hide validation message on focus
    field.addEventListener('focus', function() {
        hideValidationMessage(this);
    });
    
    console.log('Validation setup for field:', field.id);
}

function handleFormSubmit(event) {
    // Prevent default form submission
    event.preventDefault();
    
    // Get form elements
    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const subject = document.getElementById('subject');
    const message = document.getElementById('message');
    
    // Reset any previous error styling
    [name, email, subject, message].forEach(field => {
        clearFieldError(field);
    });
    
    let isValid = true;
    
    // Validate name
    if (!validateName(name)) {
        isValid = false;
    }
    
    // Validate email
    if (!validateEmail(email)) {
        isValid = false;
    }
    
    // Validate subject
    if (!validateSubject(subject)) {
        isValid = false;
    }
    
    // Validate message
    if (!validateMessage(message)) {
        isValid = false;
    }
    
    // If validation passes, generate mailto link
    if (isValid) {
        generateMailtoLink(name.value.trim(), email.value.trim(), subject.value.trim(), message.value.trim());
    } else {
        alert('Please correct the errors and try again.');
    }
}

function generateMailtoLink(name, email, subject, message) {
    // Replace with your actual email address
    const recipientEmail = 'info@yearzero.vc';
    
    // Use the provided subject from the form
    const emailSubject = subject;
    
    // Create email body
    const body = `Name: ${name}
Email: ${email}

Message:
${message}

---
This message was sent via the contact form on your website.`;
    
    // Encode components for URL
    const encodedSubject = encodeURIComponent(emailSubject);
    const encodedBody = encodeURIComponent(body);
    
    // Create mailto URL
    const mailtoUrl = `mailto:${recipientEmail}?subject=${encodedSubject}&body=${encodedBody}`;
    
    // Open mailto link
    window.location.href = mailtoUrl;
    
    // Show success message
    showSuccessMessage();
    
    // Clear form after successful submission
    setTimeout(() => {
        document.getElementById('contact-form').reset();
    }, 1000);
}

function showSuccessMessage() {
    const container = document.querySelector('.container');
    const existingMessage = container.querySelector('.success-message');
    
    // Remove existing message if present
    if (existingMessage) {
        existingMessage.remove();
    }
    
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';
    successDiv.innerHTML = `
        <p style="color: #4CAF50; font-weight: bold; text-align: center; padding: 15px; 
                  background: #f0f8f0; border: 2px solid #4CAF50; border-radius: 5px; 
                  margin-bottom: 20px;">
            Email client opened! Please send the message from your email application.
        </p>`;
    
    container.insertBefore(successDiv, container.firstChild);
    
    // Remove message after 8 seconds
    setTimeout(() => {
        if (successDiv && successDiv.parentNode) {
            successDiv.remove();
        }
    }, 8000);
}

function validateName(nameField) {
    const name = nameField.value.trim();
    
    if (name.length < 2) {
        showFieldError(nameField, 'Name must be at least 2 characters long');
        return false;
    }
    
    if (!/^[A-Za-z\s]+$/.test(name)) {
        showFieldError(nameField, 'Name can only contain letters and spaces');
        return false;
    }
    
    return true;
}

function validateEmail(emailField) {
    const email = emailField.value.trim();
    const emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i;
    
    if (!emailPattern.test(email)) {
        showFieldError(emailField, 'Please enter a valid email address');
        return false;
    }
    
    return true;
}

function validateSubject(subjectField) {
    const subject = subjectField.value.trim();
    
    if (subject.length < 3) {
        showFieldError(subjectField, 'Subject must be at least 3 characters long');
        return false;
    }
    
    if (subject.length > 100) {
        showFieldError(subjectField, 'Subject must be less than 100 characters');
        return false;
    }
    
    return true;
}

function validateMessage(messageField) {
    const message = messageField.value.trim();
    
    if (message.length < 10) {
        showFieldError(messageField, 'Message must be at least 10 characters long');
        return false;
    }
    
    if (message.length > 500) {
        showFieldError(messageField, 'Message must be less than 500 characters');
        return false;
    }
    
    return true;
}

function showFieldError(field, message) {
    field.classList.add('error');
    showValidationMessage(field, message);
}

function clearFieldError(field) {
    field.classList.remove('error');
    hideValidationMessage(field);
}

function showValidationMessage(field, message) {
    // Remove existing message if present
    hideValidationMessage(field);
    
    const messageDiv = document.createElement('div');
    messageDiv.className = 'validation-message';
    messageDiv.textContent = message;
    
    // Insert after the field's parent container to ensure proper positioning
    const formGroup = field.closest('.form-group');
    if (formGroup) {
        formGroup.appendChild(messageDiv);
    } else {
        field.parentNode.appendChild(messageDiv);
    }
    
    // Store reference for easy removal
    field.validationMessage = messageDiv;
    
    console.log('Validation message shown:', message);
}

function hideValidationMessage(field) {
    if (field.validationMessage) {
        // Use more compatible method for removing DOM elements
        if (field.validationMessage.parentNode) {
            field.validationMessage.parentNode.removeChild(field.validationMessage);
        }
        field.validationMessage = null;
    }
}

// Real-time validation functions that use title attributes
function validateNameRealTime(nameField) {
    const name = nameField.value.trim();
    
    if (name.length > 0 && name.length < 2) {
        showValidationMessage(nameField, nameField.title || 'Name must be at least 2 characters long');
        return false;
    }
    
    if (name.length > 0 && !/^[A-Za-z\s]+$/.test(name)) {
        showValidationMessage(nameField, nameField.title || 'Please enter a valid name (letters and spaces only)');
        return false;
    }
    
    return true;
}

function validateEmailRealTime(emailField) {
    const email = emailField.value.trim();
    const emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i;
    
    if (email.length > 0 && !emailPattern.test(email)) {
        showValidationMessage(emailField, emailField.title || 'Please enter a valid email address');
        return false;
    }
    
    return true;
}

function validateSubjectRealTime(subjectField) {
    const subject = subjectField.value.trim();
    
    if (subject.length > 0 && subject.length < 3) {
        showValidationMessage(subjectField, subjectField.title || 'Subject must be at least 3 characters long');
        return false;
    }
    
    if (subject.length > 0 && !/^[A-Za-z\s]+$/.test(subject)) {
        showValidationMessage(subjectField, subjectField.title || 'Please enter a valid message subject (letters and spaces only)');
        return false;
    }
    
    return true;
}

function validateMessageRealTime(messageField) {
    const message = messageField.value.trim();
    
    if (message.length > 0 && message.length < 10) {
        showValidationMessage(messageField, messageField.title || 'Message must be at least 10 characters long');
        return false;
    }
    
    if (message.length > 500) {
        showValidationMessage(messageField, messageField.title || 'Message must be less than 500 characters');
        return false;
    }
    
    return true;
}