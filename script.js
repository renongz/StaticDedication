// --- Slideshow with music control ---
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const totalSlides = slides.length;
const music = document.getElementById('slideshowMusic');
const toggleBtn = document.getElementById('toggleMusicBtn');
const toggleIcon = toggleBtn.querySelector('i');
let slideInterval = null;

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.toggle('active', i === index);
  });
  currentSlide = index;
}

function nextSlide() {
  let next = (currentSlide + 1) % totalSlides;
  showSlide(next);
}

function playSlideshow() {
  if (!slideInterval) {
    slideInterval = setInterval(nextSlide, 4000);
    if (music) music.play();
  }
}

function pauseSlideshow() {
  if (slideInterval) {
    clearInterval(slideInterval);
    slideInterval = null;
    if (music) music.pause();
  }
}

toggleBtn.addEventListener('click', function() {
  if (music.paused) {
    music.play();
    toggleIcon.classList.remove('fa-play');
    toggleIcon.classList.add('fa-pause');
    toggleBtn.innerHTML = '<i class="fas fa-pause"></i> Pause';
  } else {
    music.pause();
    toggleIcon.classList.remove('fa-pause');
    toggleIcon.classList.add('fa-play');
    toggleBtn.innerHTML = '<i class="fas fa-play"></i> Play';
  }
});

// Optional: update button if user pauses/plays music outside the button
music.addEventListener('play', function() {
  toggleBtn.innerHTML = '<i class="fas fa-pause"></i> Pause';
});
music.addEventListener('pause', function() {
  toggleBtn.innerHTML = '<i class="fas fa-play"></i> Play';
});

// Button event listeners
document.getElementById('playSlideshowBtn').addEventListener('click', playSlideshow);
document.getElementById('pauseSlideshowBtn').addEventListener('click', pauseSlideshow);

// Start with first slide visible
showSlide(0);

// Optional: Start slideshow automatically
// playSlideshow();

// Handle form submission (Formspree AJAX)
const form = document.getElementById('messageForm');
form.addEventListener('submit', async function(e) {
    e.preventDefault();
    const name = document.getElementById('name').value.trim();
    const message = document.getElementById('message').value.trim();

    if (!name || !message) {
        alert('Please fill in your name and message.');
        return;
    }

    // Prepare form data
    const formData = new FormData(form);

    // Send to Formspree
    try {
        const response = await fetch(form.action, {
            method: 'POST',
            body: formData,
            headers: { 'Accept': 'application/json' }
        });

        if (response.ok) {
            form.style.display = 'none';
            document.getElementById('formSuccess').style.display = 'block';
            if (typeof confetti === "function") {
                confetti({
                    particleCount: 80,
                    spread: 70,
                    origin: { y: 0.7 }
                });
            }
        } else {
            alert('There was a problem sending your message. Please try again.');
        }
    } catch (err) {
        alert('There was a problem sending your message. Please try again.');
    }
});

// Section fade-in on scroll
document.addEventListener("DOMContentLoaded", function() {
    const fadeSections = document.querySelectorAll('.fade-in-section');
    function revealSections() {
        fadeSections.forEach(section => {
            const rect = section.getBoundingClientRect();
            if (rect.top < window.innerHeight - 100) {
                section.classList.add('visible');
            }
        });
    }
    let fadeTimeout;
    window.addEventListener("scroll", function() {
        clearTimeout(fadeTimeout);
        fadeTimeout = setTimeout(revealSections, 50);
    });
    revealSections();
});

// Scroll to sections
document.getElementById('scrollToGallery').addEventListener('click', function() {
    document.getElementById('gallery').scrollIntoView({ behavior: 'smooth' });
});
document.getElementById('scrollToMessages').addEventListener('click', function() {
    document.getElementById('messages').scrollIntoView({ behavior: 'smooth' });
});
document.getElementById('scrollToVideo').addEventListener('click', function() {
    document.getElementById('video').scrollIntoView({ behavior: 'smooth' });
});

if (window.confetti) confetti({ spread: 90, particleCount: 80, origin: { y: 0.7 } });

window.addEventListener('DOMContentLoaded', function() {
  const modal = document.getElementById('musicPromptModal');
  if (modal) modal.style.display = 'flex';
});

function closeMusicPrompt() {
  const modal = document.getElementById('musicPromptModal');
  if (modal) modal.style.display = 'none';
}



