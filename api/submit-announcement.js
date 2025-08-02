document.getElementById('announcement-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const content = document.getElementById('content').value;

  try {
    const response = await fetch('/api/submit-announcement', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ content })
    });

    const result = await response.json();

    const messageEl = document.getElementById('response');
    if (result.success) {
      messageEl.textContent = result.message;
      document.getElementById('announcement-form').reset();
    } else {
      messageEl.textContent = result.message;
    }
  } catch (err) {
    console.error(err);
    document.getElementById('response').textContent = 'Error submitting announcement.';
  }
});
