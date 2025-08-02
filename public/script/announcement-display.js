fetch('/get-announcement')
  .then(res => res.json())
  .then(data => {
    const container = document.getElementById('announcement-box');
    container.innerHTML = `
      <p>${data.content}</p>
      <small>Posted on: ${data.time}</small>
    `;
  })
  .catch(err => console.error('Error:', err));