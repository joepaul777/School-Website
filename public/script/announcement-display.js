<<<<<<< HEAD
const form = document.getElementById('announcementForm');

if (form) {
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    const content = document.getElementById('announcementInput').value;

    fetch('/post-announcement', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content })
    })
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        alert('Announcement submitted!');
        form.reset();
      } else {
        alert('Error submitting announcement.');
      }
    })
    .catch(err => {
      alert('Failed to submit announcement.');
      console.error(err);
    });
  });
}
fetch('/get-announcement?_=' + Date.now())
  .then(res => res.json())
  .then(data => {
    const list = document.getElementById('announcement-list');
    list.innerHTML = '';

    if (data.length === 0) {
      list.innerHTML = `<li>No announcements yet.</li>`;
    } else {
      data.forEach(item => {
        const li = document.createElement('li');
        li.className = 'announcement-item';
        li.innerHTML = `
          <p>${item.content}</p>
          <small>Posted on: ${item.time}</small>
        `;
        list.appendChild(li);
      });
    }
  })
  .catch(err => {
    console.error('Error loading announcement:', err);
    const list = document.getElementById('announcement-list');
    list.innerHTML = `<li style="color:red;">Error loading announcement</li>`;
  });
=======
document.addEventListener('DOMContentLoaded', () => {
  const announcementList = document.getElementById('announcement-list');

  fetch('/api/announcements')
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to fetch announcements');
      }
      return response.json();
    })
    .then(data => {
      if (!Array.isArray(data) || data.length === 0) {
        announcementList.innerHTML = '<li>No announcements yet.</li>';
        return;
      }

      // Display each announcement
      data.reverse().forEach(item => {
        const li = document.createElement('li');

        const content = document.createElement('div');
        content.textContent = item.text;

        const time = document.createElement('time');
        const dateObj = new Date(item.timestamp);
        time.textContent = dateObj.toLocaleString();

        li.appendChild(content);
        li.appendChild(time);

        announcementList.appendChild(li);
      });
    })
    .catch(error => {
      console.error(error);
      announcementList.innerHTML = '<li>Error loading announcements.</li>';
    });
});
>>>>>>> c622503b42d1ba5023831212a1d97959f858ee4e
