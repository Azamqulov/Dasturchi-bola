<template>
  <div class="contact-section">
    <!-- Header -->
    <div class="header">
      <h1 class="title">
        Men <span class="highlight">bilan</span> Ishlang

      </h1>
      <div class="status">
        <span class="status-dot"></span>
        Online
      </div>
    </div>

    <!-- Description -->
    <p class="description">
      Hamkorlik, taklif, maslahat va har qanday savol va mavzu bo'yicha
      <strong>Men bilan bog'laning!</strong>
    </p>

    <!-- Social Media Icons Grid -->
    <div class="social-grid">
      <div v-for="(social, index) in socialLinks" :key="social.name" class="social-card"
        :style="{ animationDelay: `${index * 0.1}s` }" @click="openLink(social.url)" @mouseenter="playHoverAnimation">
        <div class="icon-container">
          <i :class="social.icon" :style="{ color: social.color }"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MenBilanIshlang',
  data() {
    return {
      socialLinks: [
        {
          name: 'YouTube',
          icon: 'fab fa-youtube',
          color: '#FF0000',
          url: 'https://www.youtube.com/@Kompyuterva_IT'
        },
        {
          name: 'Telegram',
          icon: 'fab fa-telegram-plane',
          color: '#0088CC',
          url: 'https://t.me/Musurmon_dev'
        },
        {
          name: 'Twitter',
          icon: 'fab fa-twitter',
          color: '#1DA1F2',
          url: 'https://twitter.com'
        },
        {
          name: 'Gmail',
          icon: 'fas fa-envelope',
          color: '#EA4335',
          url: 'mailto:example@gmail.com'
        },
        {
          name: 'GitHub',
          icon: 'fab fa-github',
          color: '#333333',
          url: 'https://github.com'
        },
        {
          name: 'Instagram',
          icon: 'fab fa-instagram',
          color: '#E4405F',
          url: 'https://instagram.com'
        },
        {
          name: 'LinkedIn',
          icon: 'fab fa-linkedin',
          color: '#0077B5',
          url: 'https://linkedin.com'
        },
        {
          name: 'Facebook',
          icon: 'fab fa-facebook',
          color: '#1877F2',
          url: 'https://facebook.com'
        }
      ]
    }
  },
  methods: {
    openLink(url) {
      window.open(url, '_blank');
    },
    playHoverAnimation(event) {
      const card = event.currentTarget;
      card.style.transform = 'scale(1.1) rotate(5deg)';
      setTimeout(() => {
        card.style.transform = '';
      }, 200);
    }
  }
}
</script>

<style scoped>
/* Font Awesome CDN import */
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css');

.contact-section {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(100px);
  margin: 20px auto;
  padding: 40px 20px;
  border-radius: 20px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  animation: rightTo 0.5s ease-out;
}

@keyframes rightTo {
  0% {
    opacity: 0;
    transform: translateX(130px);
  }

  100% {
    opacity: 1;
    transform: translateX(0);
  }
}

/* Header Styles */
.header {
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 30px;
  flex-wrap: wrap;
  gap: 20px;
}

.title {
  font-size: 2.5rem;
  font-weight: bold;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 15px;
  -webkit-text-stroke: 0.2px rgb(0, 0, 0);
  color: black;
}

.highlight {
  color: #1f80f7;
}

.wave-animation {
  animation: wave 2s ease-in-out infinite;
  font-size: 2rem;
}

@keyframes wave {

  0%,
  100% {
    transform: rotate(0deg);
  }

  25% {
    transform: rotate(20deg);
  }

  75% {
    transform: rotate(-10deg);
  }
}

.status {
  display: flex;
  align-items: center;
  gap: 8px;
  background: rgba(255, 255, 255, 0.2);
  padding: 8px 16px;
  border-radius: 20px;
  backdrop-filter: blur(10px);
  font-weight: 500;
  border: 1px solid rgba(255, 255, 255, 0.3);
}

.status-dot {
  width: 12px;
  height: 12px;
  background: #00FF00;
  border-radius: 50%;
  animation: pulse 2s infinite;
  box-shadow: 0 0 10px #00FF00;
}

@keyframes pulse {
  0% {
    transform: scale(1);
    opacity: 1;
  }

  50% {
    transform: scale(1.2);
    opacity: 0.7;
  }

  100% {
    transform: scale(1);
    opacity: 1;
  }
}

/* Description */
.description {
  font-size: 1.3rem;
  line-height: 1.6;
  margin-bottom: 40px;
  opacity: 0.9;
  -webkit-text-stroke: 0.8px black;
  color: rgba(95, 85, 85, 0.203);
}

/* Social Grid */
.social-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 20px;
  margin-top: 30px;
}

.social-card {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  padding: 30px 20px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(37, 34, 34, 0.989);
  opacity: 0;
}

@keyframes slideUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.social-card:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: translateY(-5px);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2);
}

.icon-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 60px;
}

.icon-container i {
  font-size: 2.5rem;
  transition: all 0.3s ease;
  filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3));
}

.social-card:hover .icon-container i {
  transform: scale(1.2) rotate(10deg);
  filter: drop-shadow(0 6px 12px rgba(0, 0, 0, 0.4));
}

/* Responsive Design */
@media (max-width: 768px) {
  .title {
    font-size: 2rem;
    justify-content: center;
  }

  .header {
    flex-direction: column;
    text-align: center;
  }

  .social-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 15px;
  }

  .social-card {
    padding: 20px 15px;
  }

  .icon-container i {
    font-size: 2rem;
  }
}

@media (max-width: 480px) {
  .contact-section {
    padding: 30px 15px;
  }

  .title {
    font-size: 1.8rem;
  }

  .description {
    font-size: 1rem;
  }
}

/* Additional hover effects */
.social-card:active {
  transform: translateY(-2px) scale(0.98);
}

/* Floating animation for cards */
.social-card:nth-child(odd) {
  animation: slideUp 0.6s ease-out forwards, float 3s ease-in-out infinite;
}

.social-card:nth-child(even) {
  animation: slideUp 0.6s ease-out forwards, float 3s ease-in-out infinite reverse;
}
</style>