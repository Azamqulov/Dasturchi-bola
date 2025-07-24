<template>
  <div class="login-container">
    <div class="login-card">
      <div class="login-header">
        <h2>Tizimga kirish</h2>
        <p>Login ma'lumotlaringizni kiriting</p>
      </div>

      <form @submit.prevent="handleLogin" v-if="!isLoggedIn">
        <div class="form-group">
          <label for="username">Login:</label>
          <input
            type="text"
            id="username"
            v-model="username"
            placeholder="Login kiriting"
            required
            class="form-input"
          />
        </div>

        <div class="form-group">
          <label for="password">Parol:</label>
          <input
            type="password"
            id="password"
            v-model="password"
            placeholder="Parol kiriting"
            required
            class="form-input"
          />
        </div>

        <div v-if="error" class="error-message">
          {{ error }}
        </div>

        <button type="submit" class="login-btn" :disabled="!username || !password">
          Kirish
        </button>
      </form>

      <!-- Login qilingandan keyin -->
      <div v-if="isLoggedIn" class="success-panel">
        <div class="success-message">
          <h3>✅ Muvaffaqiyatli kirildi!</h3>
          <p><strong>Foydalanuvchi:</strong> {{ username }}</p>
          <p><strong>Role:</strong> {{ userRole }}</p>
          <p><strong>Status:</strong> Faol</p>
        </div>
        
        <button @click="handleLogout" class="logout-btn">
          Chiqish
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LoginComponent',
  data() {
    return {
      username: '',
      password: '',
      userRole: '',
      isLoggedIn: false,
      error: ''
    }
  },
  methods: {
    handleLogin() {
      // Oddiy tekshiruv
      if (this.username && this.password) {
        // Role ni admin qilib o'rnatish
        this.userRole = 'admin';
        this.isLoggedIn = true;
        this.error = '';
        
        // localStorage ga saqlash
        localStorage.setItem('role', 'admin');
        localStorage.setItem('username', this.username);
        localStorage.setItem('isLoggedIn', 'true');
        
        console.log('Role admin qilib o\'rnatildi');
      } else {
        this.error = 'Login va parol kiritish majburiy!';
      }
    },
    
    handleLogout() {
      // Ma'lumotlarni tozalash
      this.username = '';
      this.password = '';
      this.userRole = '';
      this.isLoggedIn = false;
      this.error = '';
      
      // localStorage dan o'chirish
      localStorage.removeItem('role');
      localStorage.removeItem('username');
      localStorage.removeItem('isLoggedIn');
      
      console.log('Logout qilindi');
    }
  },
  
  mounted() {
    // Sahifa yuklanganda localStorage ni tekshirish
    const savedRole = localStorage.getItem('role');
    const savedUsername = localStorage.getItem('username');
    const savedLoginStatus = localStorage.getItem('isLoggedIn');
    
    if (savedLoginStatus === 'true' && savedRole && savedUsername) {
      this.userRole = savedRole;
      this.username = savedUsername;
      this.isLoggedIn = true;
    }
  }
}
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;

  padding: 20px;
}

.login-card {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
}

.login-header {
  text-align: center;
  margin-bottom: 2rem;
}

.login-header h2 {
  color: #333;
  margin-bottom: 0.5rem;
  font-size: 1.8rem;
}

.login-header p {
  color: #666;
  font-size: 0.9rem;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  color: #333;
  font-weight: 500;
}

.form-input {
  width: 100%;
  padding: 12px;
  border: 2px solid #e1e5e9;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.3s ease;
}

.form-input:focus {
  outline: none;
    color: #1f80f7;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.login-btn {
  width: 100%;
  padding: 12px;
  background:  #1f80f7;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.2s ease;
}

.login-btn:hover:not(:disabled) {
  transform: translateY(-2px);
}

.login-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
}

.error-message {
  background: #fee;
  color: #c33;
  padding: 10px;
  border-radius: 6px;
  margin-bottom: 1rem;
  font-size: 0.9rem;
  text-align: center;
}

.success-panel {
  text-align: center;
}

.success-message {
  background: #f0f9f0;
  border: 2px solid #4caf50;
  border-radius: 8px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
}

.success-message h3 {
  color: #2e7d32;
  margin-bottom: 1rem;
}

.success-message p {
  margin: 0.5rem 0;
  color: #333;
}

.logout-btn {
  background: #f44336;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  transition: background-color 0.3s ease;
}

.logout-btn:hover {
  background: #d32f2f;
}
</style>