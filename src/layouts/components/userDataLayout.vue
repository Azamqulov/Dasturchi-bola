<template>
  <div class="profile-card">
    <!-- Admin Panel Toggle - Faqat admin foydalanuvchilar uchun -->
    <button v-if="isAdmin" @click="toggleEditMode" class="admin-toggle" :class="{ active: isEditing }">
      {{ isEditing ? '✓' : '⚙️' }}
    </button>

    <!-- Background Image -->
    <!-- <div class="card-header">
      <div 
        class="background-image" 
        :style="{ backgroundImage: `url(${profileData.backgroundImage})` }"
      >
        <input 
          v-if="isEditing" 
          v-model="profileData.backgroundImage" 
          placeholder="Background rasm URL"
          class="edit-input bg-input"
        />
      </div>
    </div> -->

    <!-- Profile Avatar -->
    <div class="avatar-section">
      <div class="avatar-container">
        <img :src="profileData.avatar" :alt="profileData.name" class="avatar" />
        <input v-if="isEditing" v-model="profileData.avatar" placeholder="Avatar rasm URL" class="edit-input" />
      </div>
    </div>

    <!-- Profile Info -->
    <div class="profile-info">
      <!-- Name and Emoji -->
      <div class="name-section">
        <h1 v-if="!isEditing" class="name">
          {{ profileData.name }} {{ profileData.emoji }}
        </h1>
        <div v-else class="edit-row">
          <input v-model="profileData.name" placeholder="Ism" class="edit-input name-input" />
          <input v-model="profileData.emoji" placeholder="😊" class="edit-input emoji-input" />
        </div>
      </div>

      <!-- Job Description -->
      <div class="job-section">
        <p v-if="!isEditing" class="job-description">
          <span class="highlight">{{ profileData.title }}</span>,
          <span class="highlight blue">{{ profileData.position }}</span>
          <span class="highlight">{{ profileData.experience }}</span>
          <span class="gray">{{ profileData.company }}</span>,
          <span class="highlight">{{ profileData.skills }}</span>
          <span class="gray">{{ profileData.description }}</span>.
        </p>
        <div v-else class="edit-job-section">
          <input v-model="profileData.title" placeholder="Tadbirkor" class="edit-input" />
          <input v-model="profileData.position" placeholder="Full Stack Dasturchi" class="edit-input" />
          <input v-model="profileData.experience" placeholder="& Youtuber" class="edit-input" />
          <input v-model="profileData.company" placeholder="Startup Asoschi" class="edit-input" />
          <input v-model="profileData.skills" placeholder="PHP & Laravel" class="edit-input" />
          <input v-model="profileData.description" placeholder="Developer" class="edit-input" />
        </div>
      </div>

      <!-- Action Buttons -->
      <div class="action-buttons">
        <button class="btn btn-primary">
          <span class="btn-icon"><i class="fa-solid fa-phone"></i></span>
          <span v-if="!isEditing">{{ profileData.phone }}</span>
          <input v-else v-model="profileData.phone" placeholder="Bog'lanish" class="btn-edit-input" />
        </button>

        <button class="btn btn-secondary">
          <span class="btn-icon"><i class="fa-brands fa-youtube"></i></span>
          <span v-if="!isEditing">{{ profileData.subscribe }}</span>
          <input v-else v-model="profileData.subscribe" placeholder="Obuna bo'lish" class="btn-edit-input" />
        </button>
      </div>

      <!-- Social Links -->
      <div class="social-links">
        <a href="#" class="social-link" v-for="(icon, name) in socialIcon" :key="name">
          <i :class="icon"></i>
        </a>

      </div>
    </div>
  </div>
</template>
// ! script
<script>
export default {
  name: 'ProfileCard',
  data() {
    return {
      isEditing: false,
      isAdmin: false, // Admin statusini saqlash uchun
      profileData: {
        name: 'Dasturchi bola',
        emoji: '👋',
        title: 'Frontend Developer',
        position: 'Full Stack Dasturchi',
        experience: '& Youtuber',
        company: 'Startup Asoschi',
        skills: 'PHP & Laravel',
        description: 'Developer',
        phone: "Bog'lanish",
        subscribe: "Obuna bo'lish",
        backgroundImage: 'https://vuejsdevelopers.com/images/posts/versions/fragments_1200.jpg',
        avatar: 'https://vuejsdevelopers.com/images/posts/versions/fragments_1200.jpg'
      },
      socialIcon: {
        twitter: 'fa-brands fa-twitter',
        facebook: 'fa-brands fa-facebook',
        instagram: 'fa-brands fa-instagram',
        linkedin: 'fa-brands fa-linkedin'
      }
    }
  },
  methods: {
    // Admin statusini tekshirish
    checkAdminRole() {
      const role = localStorage.getItem('role');
      this.isAdmin = role === 'admin';

      console.log('User role:', role);
      console.log('Is admin:', this.isAdmin);

      // Agar admin bo'lmasa, edit mode ni yopish
      if (!this.isAdmin && this.isEditing) {
        this.isEditing = false;
      }
    },

    toggleEditMode() {
      // Admin ekanligini qayta tekshirish
      if (!this.isAdmin) {
        alert('Faqat admin foydalanuvchilar profil ma\'lumotlarini tahrirlashi mumkin!');
        return;
      }

      this.isEditing = !this.isEditing;
      if (!this.isEditing) {
        this.saveProfile();
      }
    },

    saveProfile() {
      // Bu yerda ma'lumotlarni saqlash logikasi
      console.log('Profile saqlandi:', this.profileData);
      // API ga yuborish yoki localStorage ga saqlash
      localStorage.setItem('profileData', JSON.stringify(this.profileData));
    },

    loadProfile() {
      // Saqlangan ma'lumotlarni yuklash
      const saved = localStorage.getItem('profileData');
      if (saved) {
        this.profileData = JSON.parse(saved);
      }
    },

    // localStorage o'zgarishi bo'yicha role ni yangilash
    handleStorageChange() {
      this.checkAdminRole();
    }
  },

  mounted() {
    this.loadProfile();
    this.checkAdminRole();

    // localStorage o'zgarishini kuzatish (boshqa tabda login/logout bo'lsa)
    window.addEventListener('storage', this.handleStorageChange);
  },

  beforeUnmount() {
    // Event listener ni tozalash
    window.removeEventListener('storage', this.handleStorageChange);
  }
}
</script>
// ! css
<style scoped>
.profile-card {
  background: white;
  border-radius: 20px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  /* width: 100%; */
  position: relative;
  transition: transform 0.3s ease;
  animation: leftTo .5s ease-out;
}
@keyframes leftTo {
    0% {
        opacity: 0;
        transform: translateX(-130px);
    }
    100% {
        opacity: 1;
        transform: translateX(0);
    }
}
.profile-card:hover {
  transform: translateY(-5px);
}

.admin-toggle {
  position: absolute;
  top: 15px;
  right: 15px;
  background: rgba(255, 255, 255, 0.9);
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  cursor: pointer;
  font-size: 16px;
  z-index: 10;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
}

.admin-toggle:hover {
  background: rgba(255, 255, 255, 1);
  transform: scale(1.1);
}

.admin-toggle.active {
  background: #4CAF50;
  color: white;
}

.card-header {
  position: relative;
  height: 180px;
}

.background-image {
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  position: relative;
}

.bg-input {
  position: absolute;
  bottom: 10px;
  left: 10px;
  right: 10px;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
}

.avatar-section {
  display: flex;
  justify-content: center;
  /* margin-top: -50px; */
  margin-bottom: 20px;
  position: relative;
  z-index: 5;
}

.avatar-container {
  text-align: center;
}

.avatar {
  width: 100%;
  height: 180px;
  margin-top: 10px;
  border-radius: 15px;
  /* border-radius: 50%; */
  /* border: 4px solid white; */
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  object-fit: cover;
}

.profile-info {
  padding: 0 30px 30px;
  text-align: center;
}

.name-section {
  margin-bottom: 15px;
}

.name {
  font-size: 24px;
  font-weight: 700;
  color: #2c3e50;
  margin: 0;
}

.edit-row {
  display: flex;
  gap: 10px;
  align-items: center;
}

.name-input {
  flex: 1;
}

.emoji-input {
  width: 60px;
  text-align: center;
}

.job-section {
  margin-bottom: 25px;
}

.job-description {
  color: #2c3e50;
  line-height: 1.6;
  font-size: 14px;
}


.edit-job-section {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.action-buttons {
  display: flex;
  gap: 12px;
  margin-bottom: 25px;
}

.btn {
  flex: 1;
  padding: 12px 20px;
  border: none;
  border-radius: 12px;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.btn-primary {
  background: #1f80f7;


  color: white;
}

.btn-primary:hover {
  background: #4752c4;
  transform: translateY(-2px);
}

.btn-secondary {
  background: #f8f9fa;
  color: #2c3e50;
  border: 1px solid #e9ecef;
}

.btn-secondary:hover {
  background: #e9ecef;
  transform: translateY(-2px);
}

.btn-icon {
  font-size: 16px;
}

.btn-edit-input {
  background: transparent;
  border: none;
  color: inherit;
  font-size: inherit;
  font-weight: inherit;
  text-align: center;
  outline: none;
  width: 100%;
}

.btn-edit-input::placeholder {
  color: rgba(255, 255, 255, 0.7);
}

.btn-secondary .btn-edit-input::placeholder {
  color: #95a5a6;
}

.social-links {
  display: flex;
  justify-content: space-between;
  gap: 15px;
}

.social-link {
  color: #95a5a6;
  transition: all 0.3s ease;
  padding: 15px;
  border: 1px solid #7f8c8d;
  border-radius: 8px;
}

.social-link i {
  font-size: 20px;
}

.social-link:hover {
  color: #3498db;
  background: #f8f9fa;
  transform: translateY(-2px);
}

.edit-input {
  width: 100%;
  padding: 8px 12px;
  border: 2px solid #e9ecef;
  border-radius: 8px;
  font-size: 14px;
  transition: border-color 0.3s ease;
  background: white;
}

.edit-input:focus {
  outline: none;
  border-color: #3498db;
  box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.1);
}

.edit-input::placeholder {
  color: #95a5a6;
}

/* Responsive */
@media (max-width: 480px) {
  .profile-card {
    margin: 10px;
    border-radius: 15px;
  }

  .profile-info {
    padding: 0 20px 20px;
  }

  .name {
    font-size: 20px;
  }

  .action-buttons {
    flex-direction: column;
  }

  .edit-row {
    flex-direction: column;
  }

  .emoji-input {
    width: 100%;
  }
}
</style>