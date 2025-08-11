document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('announcement-form');
  const input = document.getElementById('announcementInput');
  const message = document.getElementById('save-message');
  const announcementList = document.getElementById('announcement-list');

  // Load announcements from database
  // Load announcements from database
function loadAnnouncements() {
  fetch('/api/get-announcement')
    .then(res => res.json())
    .then(data => {
      announcementList.innerHTML = '';
      if (!Array.isArray(data) || data.length === 0) {
        announcementList.innerHTML = '<p>No announcements yet.</p>';
        return;
      }

      data.forEach(item => {
        const card = document.createElement('div');
        card.classList.add('announcement-card');

        const textDiv = document.createElement('div');
        textDiv.classList.add('announcement-text');
        textDiv.textContent = item.text;

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.classList.add('delete-btn');
        deleteBtn.onclick = () => deleteAnnouncement(item._id);

        card.appendChild(textDiv);
        card.appendChild(deleteBtn);

        announcementList.appendChild(card);
      });
    })
    .catch(err => {
      console.error('Error loading announcements:', err);
    });
}


  // Delete an announcement
  function deleteAnnouncement(id) {
    if (confirm('Are you sure you want to delete this announcement?')) {
      fetch(`/api/delete-announcement?id=${id}`, { method: 'DELETE' })
        .then(res => res.json())
        .then(data => {
          if (data.success) {
            loadAnnouncements();
          } else {
            alert('Error deleting announcement');
          }
        })
        .catch(err => console.error(err));
    }
  }

  // Submit announcement
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
        loadAnnouncements(); // Refresh after submit
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

  // Initial load
  loadAnnouncements();
});
