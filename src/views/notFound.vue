<template>
  <div class="error-page">
    <!-- Animated Background -->
    <div class="animated-bg">
      <div class="floating-shapes">
        <div v-for="i in 15" :key="i" class="shape" :style="getShapeStyle(i)"></div>
      </div>
      <div class="grid-overlay"></div>
    </div>

    <!-- Main Content -->
    <div class="error-content">
      <!-- 404 Number Animation -->
      <div class="error-number">
        <div class="number-container">
          <span class="digit four-1" :class="{ 'animate': isLoaded }">4</span>
          <div class="zero-container">
            <div class="zero" :class="{ 'animate': isLoaded }">
              <div class="zero-inner"></div>
              <div class="glitch-overlay">0</div>
            </div>
          </div>
          <span class="digit four-2" :class="{ 'animate': isLoaded }">4</span>
        </div>
        
        <!-- Glitch Effect -->
        <div class="glitch-effect" :class="{ 'active': glitchActive }">
          <span>404</span>
          <span>404</span>
          <span>404</span>
        </div>
      </div>

      <!-- Error Message -->
      <div class="error-message" :class="{ 'animate': isLoaded }">
        <h2 class="title">
          <i class="fas fa-exclamation-triangle"></i>
          Sahifa topilmadi!
        </h2>
        <p class="description">
          Kechirasiz, siz izlagan sahifa mavjud emas yoki o'chirilgan bo'lishi mumkin. 
          Balki noto'g'ri URL kiritdingiz?
        </p>
      </div>

      <!-- Action Buttons -->
      <div class="action-buttons" :class="{ 'animate': isLoaded }">
        <button @click="goHome" class="btn btn-primary">
          <i class="fas fa-home"></i>
          Bosh sahifa
        </button>
        <button @click="goBack" class="btn btn-secondary">
          <i class="fas fa-arrow-left"></i>
          Orqaga
        </button>
        <button @click="refreshPage" class="btn btn-outline">
          <i class="fas fa-redo-alt" :class="{ 'spin': isRefreshing }"></i>
          Yangilash
        </button>
      </div>

 
    </div>

  
  </div>
</template>

<script>
export default {
  name: 'Error404Page',
  data() {
    return {
      isLoaded: false,
      glitchActive: false,
      searchQuery: '',
      isRefreshing: false,
      robotBounce: false,
      currentFactIndex: 0,
      
      helpLinks: [
        {
          name: 'Bog\'lanish',
          icon: 'fas fa-envelope',
          url: '/contact'
        },
        {
          name: 'FAQ',
          icon: 'fas fa-question-circle',
          url: '/faq'
        },
        {
          name: 'Yordam markazi',
          icon: 'fas fa-life-ring',
          url: '/help'
        },
        {
          name: 'Site Map',
          icon: 'fas fa-sitemap',
          url: '/sitemap'
        }
      ],

      funFacts: [
        "404 xatosi HTTP protokolining eng mashhur xato kodlaridan biri!",
        "Birinchi web-sahifa 1991 yilda yaratilgan.",
        "Internetda har kuni 4.66 milliard kishidan ortiq odam foydalanadi.",
        "Dunyodagi birinchi domen nomi symbolics.com (1985).",
        "Email @ belgisi 1971 yilda ixtiro qilingan.",
        "Internetda har soniyada 8,000 dan ortiq Twitter xabari yuboriladi!",
        "Google har kuni 8.5 milliard marta qidiriladi.",
        "YouTube'da har daqiqada 500 soat video yuklanadi."
      ]
    }
  },

  computed: {
    currentFact() {
      return this.funFacts[this.currentFactIndex];
    }
  },

  mounted() {
    // Load animations
    setTimeout(() => {
      this.isLoaded = true;
    }, 300);

    // Glitch effect interval
    setInterval(() => {
      this.glitchActive = true;
      setTimeout(() => {
        this.glitchActive = false;
      }, 200);
    }, 5000);

    // Robot bounce animation
    setInterval(() => {
      this.robotBounce = true;
      setTimeout(() => {
        this.robotBounce = false;
      }, 1000);
    }, 4000);
  },

  methods: {
    goHome() {
      // Vue router yoki window.location ishlatish mumkin
      window.location.href = '/';
    },

    goBack() {
      window.history.back();
    },

    async refreshPage() {
      this.isRefreshing = true;
      
      // Simulate loading
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      window.location.reload();
    },

   

    getNewFact() {
      this.currentFactIndex = (this.currentFactIndex + 1) % this.funFacts.length;
    },

    getShapeStyle(index) {
      const shapes = ['circle', 'square', 'triangle'];
      const colors = ['#3498db', '#e74c3c', '#f39c12', '#2ecc71', '#9b59b6'];
      
      return {
        '--shape-type': shapes[index % shapes.length],
        '--shape-color': colors[index % colors.length],
        '--animation-delay': `${index * 0.5}s`,
        '--animation-duration': `${3 + (index % 4)}s`,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        transform: `scale(${0.5 + Math.random() * 0.5})`
      };
    }
  }
}
</script>

<style scoped>
/* Font Awesome import */
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css');

/* Main Container */
.error-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  position: relative;
  overflow: hidden;
  padding: 20px;
}

/* Animated Background */
.animated-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.floating-shapes {
  position: absolute;
  width: 100%;
  height: 100%;
}

.shape {
  position: absolute;
  width: 20px;
  height: 20px;
  opacity: 0.1;
  animation: float var(--animation-duration, 4s) ease-in-out infinite var(--animation-delay, 0s);
}

.shape::before {
  content: '';
  position: absolute;
  width: 100%;
  height: 100%;
  background: var(--shape-color, #fff);
  border-radius: 50%;
}

@keyframes float {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-20px) rotate(180deg); }
}

.grid-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: 
    linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px);
  background-size: 50px 50px;
  animation: gridMove 20s linear infinite;
}

@keyframes gridMove {
  0% { transform: translate(0, 0); }
  100% { transform: translate(50px, 50px); }
}

/* Main Content */
.error-content {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border-radius: 30px;
  padding: 60px 40px;
  text-align: center;
  box-shadow: 0 30px 60px rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.3);
  max-width: 800px;
  width: 100%;
  position: relative;
  z-index: 1;
}

/* 404 Number Animation */
.error-number {
  position: relative;
  margin-bottom: 40px;
}

.number-container {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  margin-bottom: 20px;
}

.digit {
  font-size: 8rem;
  font-weight: 900;
  color: #2c3e50;
  text-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
  opacity: 0;
  transform: translateY(100px) rotateX(90deg);
  animation: digitDrop 1s ease-out forwards;
}

.digit.animate.four-1 {
  animation-delay: 0.2s;
}

.digit.animate.four-2 {
  animation-delay: 0.8s;
}

@keyframes digitDrop {
  to {
    opacity: 1;
    transform: translateY(0) rotateX(0deg);
  }
}

.zero-container {
  position: relative;
}

.zero {
  font-size: 8rem;
  font-weight: 900;
  color: #e74c3c;
  position: relative;
  opacity: 0;
  transform: scale(0) rotate(180deg);
  animation: zeroSpin 1s ease-out forwards;
  animation-delay: 0.5s;
}

.zero.animate {
  animation-play-state: running;
}

@keyframes zeroSpin {
  to {
    opacity: 1;
    transform: scale(1) rotate(0deg);
  }
}

.zero-inner {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 60px;
  height: 60px;
  border: 4px solid #3498db;
  border-radius: 50%;
  animation: pulse 2s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% { transform: translate(-50%, -50%) scale(1); }
  50% { transform: translate(-50%, -50%) scale(1.2); }
}

/* Glitch Effect */
.glitch-effect {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  pointer-events: none;
}

.glitch-effect.active {
  animation: glitch 0.2s ease-in-out;
}

.glitch-effect span {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  font-size: 8rem;
  font-weight: 900;
  display: flex;
  justify-content: center;
  align-items: center;
}

.glitch-effect span:nth-child(1) {
  color: #ff0000;
  transform: translateX(-2px);
}

.glitch-effect span:nth-child(2) {
  color: #00ff00;
  transform: translateX(2px);
}

.glitch-effect span:nth-child(3) {
  color: #0000ff;
  transform: translateX(-1px);
}

@keyframes glitch {
  0%, 100% { opacity: 0; }
  50% { opacity: 0.8; }
}

/* Error Message */
.error-message {
  margin-bottom: 40px;
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.6s ease;
}

.error-message.animate {
  opacity: 1;
  transform: translateY(0);
  transition-delay: 1s;
}

.error-message .title {
  font-size: 2.5rem;
  color: #2c3e50;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 15px;
}

.error-message .title i {
  color: #f39c12;
  animation: warning 2s ease-in-out infinite;
}

@keyframes warning {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.1); }
}

.error-message .description {
  font-size: 1.2rem;
  color: #7f8c8d;
  line-height: 1.6;
  max-width: 600px;
  margin: 0 auto;
}

/* Search Section */
.search-section {
  margin-bottom: 40px;
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.6s ease;
}

.search-section.animate {
  opacity: 1;
  transform: translateY(0);
  transition-delay: 1.2s;
}

.search-input-wrapper {
  display: flex;
  max-width: 500px;
  margin: 0 auto;
  background: white;
  border-radius: 50px;
  padding: 5px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  border: 2px solid #e0e0e0;
  transition: all 0.3s ease;
}

.search-input-wrapper:focus-within {
  border-color: #3498db;
  box-shadow: 0 10px 30px rgba(52, 152, 219, 0.2);
}

.search-icon {
  padding: 15px 20px;
  color: #7f8c8d;
}

.search-input {
  flex: 1;
  border: none;
  outline: none;
  font-size: 1.1rem;
  padding: 15px 0;
  background: transparent;
}

.search-btn {
  background: linear-gradient(135deg, #3498db, #2980b9);
  color: white;
  border: none;
  border-radius: 50px;
  padding: 15px 25px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.search-btn:hover {
  transform: scale(1.05);
  box-shadow: 0 10px 20px rgba(52, 152, 219, 0.3);
}

/* Action Buttons */
.action-buttons {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-bottom: 40px;
  flex-wrap: wrap;
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.6s ease;
}

.action-buttons.animate {
  opacity: 1;
  transform: translateY(0);
  transition-delay: 1.4s;
}

.btn {
  padding: 15px 30px;
  border-radius: 50px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 10px;
  text-decoration: none;
  border: 2px solid transparent;
}

.btn-primary {
  background: linear-gradient(135deg, #2ecc71, #27ae60);
  color: white;
  border: none;
}

.btn-primary:hover {
  transform: translateY(-3px);
  box-shadow: 0 15px 30px rgba(46, 204, 113, 0.4);
}

.btn-secondary {
  background: linear-gradient(135deg, #3498db, #2980b9);
  color: white;
  border: none;
}

.btn-secondary:hover {
  transform: translateY(-3px);
  box-shadow: 0 15px 30px rgba(52, 152, 219, 0.4);
}

.btn-outline {
  background: transparent;
  color: #2c3e50;
  border: 2px solid #3498db;
}

.btn-outline:hover {
  background: #3498db;
  color: white;
  transform: translateY(-3px);
}

.spin {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

/* Help Links */
.help-links {
  margin-bottom: 40px;
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.6s ease;
}

.help-links.animate {
  opacity: 1;
  transform: translateY(0);
  transition-delay: 1.6s;
}

.help-links h4 {
  color: #2c3e50;
  margin-bottom: 20px;
  font-size: 1.3rem;
}

.links-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 15px;
  max-width: 600px;
  margin: 0 auto;
}

.help-link {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 20px;
  background: rgba(52, 152, 219, 0.1);
  border-radius: 15px;
  text-decoration: none;
  color: #2c3e50;
  transition: all 0.3s ease;
  border: 2px solid transparent;
}

.help-link:hover {
  background: rgba(52, 152, 219, 0.2);
  transform: translateY(-5px);
  border-color: #3498db;
}

.help-link i {
  font-size: 1.5rem;
  color: #3498db;
}

/* Fun Fact */
.fun-fact {
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.6s ease;
}

.fun-fact.animate {
  opacity: 1;
  transform: translateY(0);
  transition-delay: 1.8s;
}

.fact-container {
  background: linear-gradient(135deg, #f39c12, #e67e22);
  color: white;
  padding: 25px;
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.3s ease;
  max-width: 500px;
  margin: 0 auto;
}

.fact-container:hover {
  transform: scale(1.02);
  box-shadow: 0 20px 40px rgba(243, 156, 18, 0.3);
}

.fact-container i {
  font-size: 2rem;
  margin-bottom: 15px;
  animation: lightbulb 2s ease-in-out infinite;
}

@keyframes lightbulb {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.7; }
}

.fact-container p {
  font-size: 1.1rem;
  margin: 10px 0;
  line-height: 1.5;
}

.fact-container small {
  opacity: 0.8;
  font-size: 0.9rem;
}

/* Floating Elements */
.floating-elements {
  position: fixed;
  bottom: 30px;
  right: 30px;
  z-index: 1000;
}

.robot-icon {
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, #9b59b6, #8e44ad);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 10px 30px rgba(155, 89, 182, 0.3);
  animation: float 3s ease-in-out infinite;
}

.robot-icon i {
  font-size: 1.8rem;
  color: white;
}

.robot-icon.bounce i {
  animation: bounce 1s ease-in-out;
}

/* Responsive Design */
@media (max-width: 768px) {
  .error-content {
    padding: 40px 25px;
  }
  
  .digit, .zero {
    font-size: 5rem;
  }
  
  .error-message .title {
    font-size: 2rem;
    flex-direction: column;
    gap: 10px;
  }
  
  .error-message .description {
    font-size: 1.1rem;
  }
  
  .action-buttons {
    flex-direction: column;
    align-items: center;
  }
  
  .btn {
    width: 100%;
    max-width: 300px;
    justify-content: center;
  }
  
  .links-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .floating-elements {
    bottom: 20px;
    right: 20px;
  }
  
  .robot-icon {
    width: 50px;
    height: 50px;
  }
  
  .robot-icon i {
    font-size: 1.5rem;
  }
}

@media (max-width: 480px) {
  .error-content {
    padding: 30px 20px;
  }
  
  .digit, .zero {
    font-size: 4rem;
  }
  
  .number-container {
    gap: 10px;
  }
  
  .links-grid {
    grid-template-columns: 1fr;
  }
  
  .search-input-wrapper {
    flex-direction: column;
    border-radius: 15px;
  }
  
  .search-btn {
    border-radius: 10px;
    margin-top: 5px;
  }
}
</style>