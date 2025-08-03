document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('announcementForm');
  const input = document.getElementById('announcementInput');
  const message = document.getElementById('save-message');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    fetch('/submit-announcement', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content: input.value })
    })
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        message.textContent = data.message;
        message.style.color = 'green';
        input.value = '';
      } else {
        message.textContent = 'Failed to save announcement';
        message.style.color = 'red';
      }
    })
    .catch(() => {
      message.textContent = 'Error submitting announcement';
      message.style.color = 'red';
    });
  });
});