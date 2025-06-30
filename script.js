document.addEventListener('DOMContentLoaded', function() {
  // Typing effect
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

  // Animate skill bars
  function animateSkillBars() {
    const skills = document.querySelectorAll('.skill');
    skills.forEach(skill => {
      const level = skill.getAttribute('data-level');
      const skillLevel = skill.querySelector('.skill-level');
      skillLevel.style.width = level + '%';
    });
  }

  // Tab navigation
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

  // Animate background circles on mouse move
  const circles = document.querySelectorAll('.circle');
  document.addEventListener('mousemove', function(e) {
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;
    
    circles[0].style.transform = `translate(${x * 50}px, ${y * 50}px)`;
    circles[1].style.transform = `translate(${x * -30}px, ${y * -30}px)`;
    circles[2].style.transform = `translate(${x * 20}px, ${y * -20}px)`;
  });

  // Scroll reveal animation
  const animateOnScroll = function() {
    const elements = document.querySelectorAll('.about-card, .skill-category, .timeline-item, .project-card');
    
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
  document.querySelectorAll('.about-card, .skill-category, .timeline-item, .project-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease-out';
  });
  
  window.addEventListener('scroll', animateOnScroll);
  animateOnScroll(); // Run once on load
});
