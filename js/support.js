/**
 * Support Page JavaScript
 * Handles FAQ accordion and contact form
 */

// FAQ Accordion Functionality
document.addEventListener('DOMContentLoaded', function() {
  const faqQuestions = document.querySelectorAll('.support-faq-question');
  
  faqQuestions.forEach(question => {
    question.addEventListener('click', function() {
      const faqItem = this.parentElement;
      const isExpanded = faqItem.getAttribute('aria-expanded') === 'true';
      
      // Close all other FAQ items
      faqQuestions.forEach(q => {
        const item = q.parentElement;
        if (item !== faqItem) {
          item.setAttribute('aria-expanded', 'false');
          q.setAttribute('aria-expanded', 'false');
        }
      });
      
      // Toggle current FAQ item
      faqItem.setAttribute('aria-expanded', !isExpanded);
      this.setAttribute('aria-expanded', !isExpanded);
    });
  });

  // Support Form Handling
  const supportForm = document.getElementById('supportForm');
  
  if (supportForm) {
    supportForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Get form data
      const formData = {
        name: document.getElementById('supportName').value.trim(),
        email: document.getElementById('supportEmail').value.trim(),
        subject: document.getElementById('supportSubject').value.trim(),
        message: document.getElementById('supportMessage').value.trim()
      };
      
      // Basic validation
      if (!formData.name || !formData.email || !formData.subject || !formData.message) {
        alert('Please fill in all fields.');
        return;
      }
      
      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        alert('Please enter a valid email address.');
        return;
      }
      
      // Create mailto link (fallback if no backend)
      const mailtoLink = `mailto:support@list2stay.com?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`)}`;
      
      // Open email client
      window.location.href = mailtoLink;
      
      // Show success message
      const submitBtn = supportForm.querySelector('.support-form-submit');
      const originalText = submitBtn.textContent;
      submitBtn.textContent = 'Message Sent!';
      submitBtn.style.background = 'linear-gradient(135deg, rgba(34, 197, 94, 0.95), rgba(16, 185, 129, 0.75))';
      
      // Reset form
      supportForm.reset();
      
      // Reset button after 3 seconds
      setTimeout(() => {
        submitBtn.textContent = originalText;
        submitBtn.style.background = '';
      }, 3000);
    });
  }

  // Scroll Progress Indicator
  const scrollProgress = document.getElementById('scrollProgress');
  if (scrollProgress) {
    window.addEventListener('scroll', function() {
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (window.scrollY / windowHeight) * 100;
      scrollProgress.style.width = scrolled + '%';
    });
  }

  // Back to Top Button
  const backToTop = document.getElementById('backToTop');
  if (backToTop) {
    window.addEventListener('scroll', function() {
      if (window.scrollY > 300) {
        backToTop.style.opacity = '1';
        backToTop.style.visibility = 'visible';
      } else {
        backToTop.style.opacity = '0';
        backToTop.style.visibility = 'hidden';
      }
    });

    backToTop.addEventListener('click', function() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
});
