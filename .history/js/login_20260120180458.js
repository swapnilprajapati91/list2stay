const form = document.querySelector('form');
const errorDiv = document.getElementById('error');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  errorDiv.textContent = '';

  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value.trim();

  // Validation
  if (!email || !password) {
    errorDiv.textContent = 'Please fill in all fields';
    return;
  }

  if (password.length < 6) {
    errorDiv.textContent = 'Password must be at least 6 characters';
    return;
  }

  try {
    const formData = new FormData(form);
    const response = await fetch(form.action, {
      method: 'POST',
      body: formData
    });

    if (response.ok) {
      // Redirect to home page on successful login
      window.location.href = './home.html';
    } else {
      errorDiv.textContent = 'Login failed. Please try again.';
    }
  } catch (error) {
    errorDiv.textContent = 'An error occurred. Please try again.';
    console.error('Login error:', error);
  }
});

// Social login handlers
document.querySelectorAll('.ghost-btn').forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    const provider = btn.getAttribute('data-provider');
    console.log(`Sign in with ${provider}`);
    // Add your OAuth implementation here
  });
});
