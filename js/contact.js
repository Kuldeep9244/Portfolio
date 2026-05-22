const contactForm = document.getElementById('contactForm');
const submitBtn = document.getElementById('submitBtn');
const resetButtonState = () => {
  if (!submitBtn) {
    return;
  }

  submitBtn.textContent = 'Send Message →';
  submitBtn.classList.remove('success');
  submitBtn.disabled = false;
};

const setError = (fieldId, message) => {
  const errorElement = document.getElementById(`${fieldId}-error`);
  if (errorElement) {
    errorElement.textContent = message;
  }
};

const clearErrors = () => {
  ['fname', 'femail', 'fmessage'].forEach((fieldId) => setError(fieldId, ''));
};

if (contactForm && submitBtn) {
  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();
    clearErrors();

    const nameField = document.getElementById('fname');
    const emailField = document.getElementById('femail');
    const subjectField = document.getElementById('fsubject');
    const messageField = document.getElementById('fmessage');

    const name = nameField?.value.trim() || '';
    const email = emailField?.value.trim() || '';
    const subject = subjectField?.value.trim() || '';
    const message = messageField?.value.trim() || '';

    let isValid = true;

    if (!name) {
      setError('fname', 'Please enter your name.');
      isValid = false;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('femail', 'Please enter a valid email address.');
      isValid = false;
    }

    if (message.length < 10) {
      setError('fmessage', 'Message should be at least 10 characters.');
      isValid = false;
    }

    if (!isValid) {
      return;
    }

    submitBtn.textContent = 'Message Sent! ✓';
    submitBtn.classList.add('success');
    submitBtn.disabled = true;
    contactForm.reset();

    window.setTimeout(() => {
      resetButtonState();
    }, 3000);
  });
}
