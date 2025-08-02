    // Fade-in effect
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('show');
        }
      });
    }, { threshold: 0.2 });

    document.querySelectorAll('.hero-about').forEach(section => {
      observer.observe(section);
    });

    // Typing animation
    const text = "Empowering the next generation through quality education and values.";
    const target = document.getElementById('typing-text');
    let i = 0;

    function typeWriter() {
      if (i < text.length) {
        target.textContent = text.substring(0, i + 1) + '|';
        i++;
        setTimeout(typeWriter, 30);
      } else {
        target.textContent = text;
      }
    }

    window.onload = () => {
      typeWriter();
    };
     let lastScrollY = window.scrollY;
  const navbar = document.getElementById("navbar");

  window.addEventListener("scroll", () => {
    if (window.scrollY > lastScrollY) {

      navbar.style.top = "-100px";
    } else {
  
      navbar.style.top = "0"; 
    }
    lastScrollY = window.scrollY;
  });

  /*------Google_Translate------*/
   function changeToMalayalam() {
    const lang = 'ml'; // Malayalam

    // Set the cookie that Google Translate reads
    document.cookie = `googtrans=/en/${lang};path=/`;

    // Reload the page so the cookie takes effect
    location.reload();
  }
  document.getElementById('translateButton').addEventListener('click', function () {
    const iframe = document.querySelector('iframe.goog-te-menu-frame');
    if (iframe) {
      const innerDoc = iframe.contentDocument || iframe.contentWindow.document;
      const malayalamOption = innerDoc.querySelector("span[textContent='Malayalam']");
      
      if (malayalamOption) {
        malayalamOption.click();
      } else {
        // fallback: simulate selecting Malayalam via menu
        const options = innerDoc.querySelectorAll('.goog-te-menu2-item span.text');
        options.forEach(function (option) {
          if (option.innerText === 'Malayalam') {
            option.click();
          }
        });
      }
    } else {
      alert("Please wait while the translation loads...");
    }
  });
 
const counters = document.querySelectorAll('.counter');
const duration = 2000; // All counters complete in 2 seconds

function animateCounter(counter) {
  const targetAttr = counter.getAttribute('data-target');
  const isPercent = targetAttr.includes('%');
  const target = parseInt(targetAttr);
  let current = 0;

  const startTime = performance.now();

  function updateCounter(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const value = Math.floor(progress * target);

    counter.innerText = isPercent ? value + '%' : value;

    if (progress < 1) {
      requestAnimationFrame(updateCounter);
    } else {
      counter.innerText = isPercent ? target + '%' : target;
    }
  }

  requestAnimationFrame(updateCounter);
}

const counterObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
      entry.target.classList.add('counted');
      animateCounter(entry.target);
    }
  });
}, { threshold: 0.3 });

// Observe each counter individually
counters.forEach(counter => {
  counterObserver.observe(counter);
});

  const scrollBtn = document.getElementById("scrollTopBtn");

  window.onscroll = function () {
    scrollBtn.style.display = (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100)
      ? "block" : "none";
  };

  scrollBtn.onclick = function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  //hardcoded password
    function checkPassword() {
  const password = document.getElementById("passwordInput").value;
  const correctPassword = "ghss2025"; // change this as needed

  if (password === correctPassword) {
    window.location.href = "announcement.html";
  } else {
    alert("Incorrect password. Please try again.");
  }
}


//announcement
const announcementForm = document.getElementById('announcementForm');
const announcementInput = document.getElementById('announcementInput');

const channel = new BroadcastChannel('announcement_channel');

announcementForm.addEventListener('submit', function (e) {
  e.preventDefault();

  const text = announcementInput.value.trim();
  if (text === '') return;

  const now = new Date();
  const dateTime = now.toLocaleString();

  // Save to localStorage
  localStorage.setItem('announcementText', text);
  localStorage.setItem('announcementTime', dateTime);

  // Send via BroadcastChannel
  channel.postMessage({
    text,
    time: dateTime
  });

  // Optional: Redirect
  window.location.href = 'announcedisplay.html';
});

const textElem = document.getElementById('announcementText');
const timeElem = document.getElementById('announcementTime');

function updateDisplay(text, time) {
  textElem.textContent = text || 'No announcement found.';
  timeElem.textContent = time || '';
}

// Initial load
updateDisplay(
  localStorage.getItem('announcementText'),
  localStorage.getItem('announcementTime')
);

// Listen for updates from other page
const message = new BroadcastChannel('announcement_message');
message.onmessage = (event) => {
  const { text, time } = event.data;
  updateDisplay(text, time);
};



