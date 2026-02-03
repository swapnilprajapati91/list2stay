/**
 * Authentication Handler
 * Handles login, signup, and authentication forms
 */

import { isValidEmail } from './utils.js';

/**
 * Initialize login form
 */
export const initLogin = () => {
  const form = document.querySelector('form');
  const errorDiv = document.getElementById('error');
  const submitBtn = form?.querySelector('button[type="submit"]');

  if (!form || !errorDiv || !submitBtn) return;

  const showError = (msg) => {
    errorDiv.textContent = msg;
  };

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    showError('');

    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();

    // Basic checks
    if (!email || !password) {
      showError('Please fill in all fields.');
      return;
    }

    if (!isValidEmail(email)) {
      showError('Please enter a valid email address.');
      return;
    }

    if (password.length < 6) {
      showError('Password must be at least 6 characters.');
      return;
    }

    // Disable button while sending
    submitBtn.disabled = true;
    submitBtn.textContent = 'Signing in...';

    try {
      const formData = new FormData(form);
      const response = await fetch(form.action, {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        window.location.href = './pages/home.html';
      } else {
        showError('Login failed. Please check your details and try again.');
      }
    } catch (error) {
      console.error('Login error:', error);
      showError('Network error. Please try again.');
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = 'Sign in';
    }
  });

  // Social login handlers
  document.querySelectorAll('.ghost-btn').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const provider = btn.getAttribute('data-provider');
      console.log(`Sign in with ${provider}`);
      // TODO: Add OAuth integration here
    });
  });
};
