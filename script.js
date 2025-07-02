document.addEventListener('DOMContentLoaded', function() {
  // ===== MUSIC CONTROLS =====
  const bgMusic = document.getElementById('bg-music');
  const musicToggle = document.getElementById('music-toggle');
  const volumeControl = document.getElementById('volume-control');
  
  // Set initial volume to 30%
  bgMusic.volume = 0.3;
  volumeControl.value = 0.3;
  
  // Music toggle button
  musicToggle.addEventListener('click', function() {
    if (bgMusic.paused) {
      bgMusic.play()
        .then(() => {
          musicToggle.innerHTML = '<i class="fas fa-pause"></i>';
        })
        .catch(err => {
          console.warn("Playback failed:", err);
        });
    } else {
      bgMusic.pause();
      musicToggle.innerHTML = '<i class="fas fa-music"></i>';
    }
  });
  
  // Volume control
  volumeControl.addEventListener('input', function() {
    bgMusic.volume = this.value;
  });
  
  // Handle autoplay policy
  const unlockAudio = () => {
    bgMusic.play()
      .then(() => {
        musicToggle.innerHTML = '<i class="fas fa-pause"></i>';
        window.removeEventListener('click', unlockAudio);
        window.removeEventListener('keydown', unlockAudio);
        window.removeEventListener('scroll', unlockAudio);
      })
      .catch(err => {
        console.warn("Audio play failed:", err);
      });
  };
  
  window.addEventListener('click', unlockAudio);
  window.addEventListener('keydown', unlockAudio);
  window.addEventListener('scroll', unlockAudio);

  // ===== ENHANCED BACKGROUND CIRCLES =====
  const circles = document.querySelectorAll('.circle');
  
  // Mouse move interaction
  document.addEventListener('mousemove', function(e) {
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;
    
    circles[0].style.transform = `translate(${x * 100 - 50}px, ${y * 100 - 50}px) scale(1.1)`;
    circles[1].style.transform = `translate(${x * -80 + 40}px, ${y * -80 + 40}px) scale(1.05)`;
    circles[2].style.transform = `translate(${x * 60 - 30}px, ${y * -60 + 30}px) scale(1.07)`;
    
    circles[0].style.opacity = 0.25 + y * 0.15;
    circles[1].style.opacity = 0.25 + (1 - x) * 0.15;
    circles[2].style.opacity = 0.25 + (x * y) * 0.15;
  });

  // Pause animations when tab is not active
  document.addEventListener('visibilitychange', function() {
    const state = document.hidden ? 'paused' : 'running';
    circles.forEach(circle => {
      circle.style.animationPlayState = state;
    });
  });

  // ===== SIMPLE IMAGE MODAL =====
  // Create modal element
  const modal = document.createElement('div');
  modal.className = 'image-modal';
  modal.innerHTML = `
    <span class="close-modal">&times;</span>
    <div class="image-modal-content">
      <img src="" alt="">
    </div>
  `;
  document.body.appendChild(modal);

  // Open modal when gallery item is clicked
  document.querySelectorAll('.gallery-item img').forEach(img => {
    img.addEventListener('click', function() {
      const modalImg = modal.querySelector('img');
      modalImg.src = this.src;
      modalImg.alt = this.alt;
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  // Close modal
  modal.querySelector('.close-modal').addEventListener('click', function() {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
  });

  // Close modal when clicking outside the image
  modal.addEventListener('click', function(e) {
    if (e.target === modal) {
      modal.classList.remove('active');
      document.body.style.overflow = 'auto';
    }
  });

  // Close modal with Escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      modal.classList.remove('active');
      document.body.style.overflow = 'auto';
    }
  });

  // ===== TYPING EFFECT =====
  const typingText = document.querySelector('.typing-text');
  const texts = [
    "I build games in Unity",
    "I create cinematic edits",
    "I design digital experiences",
    "I'm a Business Computing student"
  ];
  let textIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  
  function type() {
    const currentText = texts[textIndex];
    
    if (isDeleting) {
      typingText.textContent = currentText.substring(0, charIndex - 1);
      charIndex--;
    } else {
      typingText.textContent = currentText.substring(0, charIndex + 1);
      charIndex++;
    }
    
    if (!isDeleting && charIndex === currentText.length) {
      isDeleting = true;
      setTimeout(type, 1500);
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      textIndex = (textIndex + 1) % texts.length;
      setTimeout(type, 300);
    } else {
      const speed = isDeleting ? 50 : 100;
      setTimeout(type, speed);
    }
  }
  
  setTimeout(type, 1000);

  // ===== SKILL BAR ANIMATION =====
  function animateSkillBars() {
    const skills = document.querySelectorAll('.skill');
    skills.forEach(skill => {
      const level = skill.getAttribute('data-level');
      const skillLevel = skill.querySelector('.skill-level');
      skillLevel.style.width = level + '%';
    });
  }

  // ===== TAB NAVIGATION =====
  const buttons = document.querySelectorAll('nav button');
  const sections = document.querySelectorAll('main section');
  
  buttons.forEach(button => {
    button.addEventListener('click', function() {
      // Remove active classes
      buttons.forEach(btn => btn.classList.remove('active-btn'));
      sections.forEach(sec => sec.classList.remove('active'));
      
      // Add active class to clicked button
      this.classList.add('active-btn');
      
      // Show corresponding section
      const targetId = this.getAttribute('data-tab');
      document.getElementById(targetId).classList.add('active');
      
      // Smooth scroll to section
      document.getElementById(targetId).scrollIntoView({
        behavior: 'smooth'
      });
      
      // Animate skills when skills section is opened
      if (targetId === 'skills') {
        animateSkillBars();
      }
    });
  });
  
  // Initialize first section
  document.querySelector('nav button[data-tab="home"]').click();

  // ===== SCROLL REVEAL ANIMATION =====
  const animateOnScroll = function() {
    const elements = document.querySelectorAll('.about-card, .skill-category, .timeline-item, .project-card, .gallery-item');
    
    elements.forEach(element => {
      const elementPosition = element.getBoundingClientRect().top;
      const screenPosition = window.innerHeight / 1.3;
      
      if (elementPosition < screenPosition) {
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
      }
    });
  };
  
  // Set initial state for animation
  document.querySelectorAll('.about-card, .skill-category, .timeline-item, .project-card, .gallery-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease-out';
  });
  
  window.addEventListener('scroll', animateOnScroll);
  animateOnScroll(); // Run once on load
});
