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
        setTimeout(typeWriter, 40);
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
      // Scrolling down
      navbar.style.top = "-100px";
    } else {
      // Scrolling up
      navbar.style.top = "0";
    }
    lastScrollY = window.scrollY;
  });
