document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('announcement-form');
  const input = document.getElementById('announcementInput');
  const message = document.getElementById('save-message');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/submit-announcement', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: input.value })
      });

      const data = await response.json();

      if (data.success) {
        message.textContent = data.message;
        message.style.color = 'green';
        input.value = '';
      } else {
        message.textContent = 'Failed to save announcement';
        message.style.color = 'red';
      }
    } catch (err) {
      console.error(err);
      message.textContent = 'Error submitting announcement';
      message.style.color = 'red';
    }
  });
});