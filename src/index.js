// Registration Form Validation
const registrationForm = document.getElementById('registration');
registrationForm.addEventListener('submit', validateRegistrationForm);

function validateRegistrationForm(event) {
  // Username validation
  const username = document.getElementsByName('username')[0].value;
  if (!username || username.length < 4 || !/^[a-zA-Z0-9]+$/.test(username)) {
    showError('Invalid username');
    return false;
  }

  // Email validation
  const email = document.getElementsByName('email')[0].value;
  if (!email || !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email) || email.endsWith('@example.com')) {
    showError('Invalid email');
    return false;
  }

  // Password validation
  const password = document.getElementsByName('password')[0].value;
  const passwordCheck = document.getElementsByName('passwordCheck')[0].value;
  if (!password || password.length < 12 || !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{12,}$/.test(password) || password.includes('password') || password.includes(username)) {
    showError('Invalid password');
    return false;
  }

  if (password !== passwordCheck) {
    showError('Passwords do not match');
    return false;
  }

  // Terms and Conditions validation
  const terms = document.getElementsByName('terms')[0].checked;
  if (!terms) {
    showError('Terms and Conditions must be accepted');
    return false;
  }

  // Store user data in localStorage
  const userData = {
    username: username.toLowerCase(),
    email: email.toLowerCase(),
    password: password
  };
  localStorage.setItem('users', JSON.stringify(userData));

  // Clear form fields and show success message
  registrationForm.reset();
  showSuccess('Registration successful!');
  return false;
}

// Login Form Validation
const loginForm = document.getElementById('login');
loginForm.addEventListener('submit', validateLoginForm);

function validateLoginForm(event) {
  // Username validation
  const username = document.getElementsByName('username')[0].value;
  if (!username) {
    showError('Invalid username');
    return false;
  }

  // Password validation
  const password = document.getElementsByName('password')[0].value;
  if (!password) {
    showError('Invalid password');
    return false;
  }

  // Check if username and password match stored data
  const storedUsers = JSON.parse(localStorage.getItem('users'));
  if (!storedUsers || storedUsers.username !== username.toLowerCase() || storedUsers.password !== password) {
    showError('Invalid username or password');
    return false;
  }

  // Clear form fields and show success message
  loginForm.reset();
  showSuccess('Login successful!');
  return false;
}

// Error display functions
function showError(message) {
  const errorDisplay = document.getElementById('errorDisplay');
  errorDisplay.innerHTML = message;
  errorDisplay.style.display = 'block';
  errorDisplay.classList.add('active');
  
  // Optional: Adjust icon styles or positions if needed
  const icons = document.querySelectorAll('.input-icon');
  icons.forEach((icon) => {
    icon.style.color = 'red'; // or adjust position, opacity, etc.
  });
}

function showSuccess(message) {
  const errorDisplay = document.getElementById('errorDisplay');
  errorDisplay.innerHTML = message;
  errorDisplay.style.display = 'block';
  errorDisplay.style.background = 'green';
  errorDisplay.style.color = 'white';
  errorDisplay.classList.add('success');
  
  // Optional: Adjust icon styles or positions if needed
  const icons = document.querySelectorAll('.input-icon');
  icons.forEach((icon) => {
    icon.style.color = 'green'; // or adjust position, opacity, etc.
  });
}