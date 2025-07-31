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
  let started = false;
  const duration =2000; // All counters complete in 2 seconds

  function startCounters() {
    counters.forEach(counter => {
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
    });
  }

  const counterObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !started) {
        started = true;
        startCounters();
      }
    });
  }, { threshold: 0.3 });

  const targetSections = document.querySelectorAll('.results-section, .achievements-section');
  targetSections.forEach(section => {
    counterObserver.observe(section);
  });

