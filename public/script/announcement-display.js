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
