<template>
  <div class="contact-form-container">
    <div class="form-wrapper">
      <!-- Header -->
      <div class="form-header">
        <h2 class="form-title">
          <i class="fas fa-paper-plane"></i>
          Bog'lanish uchun
        </h2>
        <p class="form-description">
          Ma'lumotlaringizni qoldiring, sizga tez orada javob beramiz!
        </p>
      </div>

      <!-- Contact Form -->
      <form @submit.prevent="submitForm" class="contact-form">
        <!-- Ism -->
        <div class="form-group">
          <div class="input-wrapper">
            <i class="fas fa-user input-icon"></i>
            <input v-model="formData.firstName" type="text" id="firstName" placeholder="Ismingiz va Familyangiz"
              required :class="{ 'error': errors.firstName }" @input="clearError('firstName')">

          </div>
          <div v-if="errors.firstName" class="error-message">
            {{ errors.firstName }}
          </div>
        </div>

        <!-- Telefon (ixtiyoriy) -->
        <div class="form-group">
          <div class="input-wrapper">
            <i class="fas fa-phone input-icon"></i>
            <input v-model="formData.phone" type="tel" id="phone" placeholder="+998 90 123 45 67"
              :class="{ 'error': errors.phone }" @input="clearError('phone')">
          </div>
          <div v-if="errors.phone" class="error-message">
            {{ errors.phone }}
          </div>
        </div>

        <!-- Email (ixtiyoriy) -->
        <div class="form-group">
          <div class="input-wrapper">
            <i class="fas fa-envelope input-icon"></i>
            <input v-model="formData.email" type="email" id="email" placeholder="example@gmail.com"
              :class="{ 'error': errors.email }" @input="clearError('email')">
          </div>
          <div v-if="errors.email" class="error-message">
            {{ errors.email }}
          </div>
        </div>

        <!-- Xabar -->
        <div class="form-group">
          <div class="textarea-wrapper">
            <i class="fas fa-comment-dots input-icon"></i>
            <textarea v-model="formData.message" id="message" placeholder="Xabaringizni yozing..." rows="5" required
              :class="{ 'error': errors.message }" @input="clearError('message')"></textarea>
          </div>
          <div v-if="errors.message" class="error-message">
            {{ errors.message }}
          </div>
          <div class="char-count">
            {{ formData.message.length }}/500
          </div>
        </div>

        <!-- Submit Button -->
        <button type="submit" class="submit-btn" :disabled="isLoading" :class="{ 'loading': isLoading }">
          <span v-if="!isLoading">
            <i class="fab fa-telegram-plane"></i>
            Yuborish
          </span>
          <span v-else>
            <i class="fas fa-spinner fa-spin"></i>
            Yuborilmoqda...
          </span>
        </button>
      </form>

      <!-- Success Message -->
      <div v-if="showSuccess" class="success-message">
        <i class="fas fa-check-circle"></i>
        <h3>Muvaffaqiyatli yuborildi!</h3>
        <p>Tez orada sizga javob beramiz.</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ContactForm',
  data() {
    return {
      formData: {
        firstName: '',
        phone: '',
        email: '',
        message: ''
      },
      errors: {},
      isLoading: false,
      showSuccess: false,
      // Telegram Bot konfiguratsiyasi
      telegramConfig: {
        botToken: '7953347117:AAG3oqF1wV-UJlEX9vjzOtQlpV1ufpSP-eg', // Bu yerga o'z bot tokeningizni kiriting
        chatId: '1685356708' // Bu yerga o'z chat ID ingizni kiriting
      }
    }
  },
  methods: {
    // Formani validatsiya qilish
    validateForm() {
      this.errors = {};
      let isValid = true;

      // Ism tekshirish
      if (!this.formData.firstName.trim()) {
        this.errors.firstName = 'Ism majburiy';
        isValid = false;
      } else if (this.formData.firstName.length < 2) {
        this.errors.firstName = 'Ism kamida 2 ta harfdan iborat bo\'lishi kerak';
        isValid = false;
      }


      // Telefon tekshirish (agar kiritilgan bo'lsa)
      if (this.formData.phone.trim()) {
        const phoneRegex = /^\+998\d{9}$/;
        if (!phoneRegex.test(this.formData.phone.replace(/\s/g, ''))) {
          this.errors.phone = 'Telefon raqam noto\'g\'ri formatda (+998901234567)';
          isValid = false;
        }
      }

      // Email tekshirish (agar kiritilgan bo'lsa)
      if (this.formData.email.trim()) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(this.formData.email)) {
          this.errors.email = 'Email noto\'g\'ri formatda';
          isValid = false;
        }
      }

      // Xabar tekshirish
      if (!this.formData.message.trim()) {
        this.errors.message = 'Xabar majburiy';
        isValid = false;
      } else if (this.formData.message.length < 10) {
        this.errors.message = 'Xabar kamida 10 ta belgidan iborat bo\'lishi kerak';
        isValid = false;
      } else if (this.formData.message.length > 500) {
        this.errors.message = 'Xabar 500 ta belgidan oshmasligi kerak';
        isValid = false;
      }

      return isValid;
    },

    // Xatolarni tozalash
    clearError(field) {
      if (this.errors[field]) {
        delete this.errors[field];
      }
    },

    // Telegram botga xabar yuborish
    async sendToTelegram() {
      const message = `
🆕 Yangi bog'lanish so'rovi

👤 Ism: ${this.formData.firstName}
${this.formData.phone ? `📞 Telefon: ${this.formData.phone}` : ''}
${this.formData.email ? `📧 Email: ${this.formData.email}` : ''}

💬 Xabar:
${this.formData.message}

⏰ Sana: ${new Date().toLocaleString('uz-UZ')}
      `.trim();

      const url = `https://api.telegram.org/bot${this.telegramConfig.botToken}/sendMessage`;

      try {
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            chat_id: this.telegramConfig.chatId,
            text: message,
            parse_mode: 'HTML'
          })
        });

        if (!response.ok) {
          throw new Error('Telegram API xatosi');
        }

        return true;
      } catch (error) {
        console.error('Telegram ga yuborishda xato:', error);
        throw error;
      }
    },

    // Formani yuborish
    async submitForm() {
      if (!this.validateForm()) {
        return;
      }

      this.isLoading = true;

      try {
        // Telegram botga yuborish
        await this.sendToTelegram();

        // Muvaffaqiyat xabari ko'rsatish
        this.showSuccess = true;

        // Formani tozalash
        this.formData = {
          firstName: '',
          phone: '',
          email: '',
          message: ''
        };

        // 5 soniyadan keyin success xabarini yashirish
        setTimeout(() => {
          this.showSuccess = false;
        }, 5000);

      } catch (error) {
        alert('Xabar yuborishda xatolik yuz berdi. Iltimos, qayta urinib ko\'ring.');
      } finally {
        this.isLoading = false;
      }
    }
  },
  watch: {
    // Xabar uzunligini cheklash
    'formData.message'(newVal) {
      if (newVal.length > 500) {
        this.formData.message = newVal.substring(0, 500);
      }
    }
  }
}
</script>

<style scoped>
/* Font Awesome import */
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css');


.form-wrapper {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border-radius: 20px;
  padding: 20px;
  width: 100%;
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.3);
  animation: leftTo 0.5s ease-out;
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

/* Header */
.form-header {
  text-align: center;
  margin-bottom: 20px;
}

.form-title {
  color: #333;
  font-size: 1.5rem;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 15px;
}

.form-title i {
  color: #1f80f7;
  animation: bounce 2s infinite;
}

@keyframes bounce {

  0%,
  20%,
  50%,
  80%,
  100% {
    transform: translateY(0);
  }

  40% {
    transform: translateY(-10px);
  }

  60% {
    transform: translateY(-5px);
  }
}

.form-description {
  color: #666;
  font-size: 1.1rem;
  margin: 0;
}

/* Form Styles */
.contact-form {
  animation: slideIn 0.6s ease-out;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(30px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.form-group {
  margin-bottom: 25px;
  position: relative;
}

.input-wrapper,
.textarea-wrapper {
  position: relative;
  margin-bottom: 8px;
}

.input-icon {
  position: absolute;
  left: 15px;
  top: 50%;
  transform: translateY(-50%);
  color: #1f80f7;
  z-index: 2;
  font-size: 1.1rem;
}

input,
textarea {
  width: 100%;
  padding: 15px 15px 15px 45px;
  border: 2px solid #e0e0e0;
  border-radius: 12px;
  font-size: 1rem;
  transition: all 0.3s ease;
  background: rgba(255, 255, 255, 0.9);
  box-sizing: border-box;
}

input:focus,
textarea:focus {
  outline: none;
  border-color: #1f80f7;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  background: white;
}

input.error,
textarea.error {
  border-color: #e74c3c;
  box-shadow: 0 0 0 3px rgba(231, 76, 60, 0.1);
}



/* Textarea specific */
textarea {
  resize: vertical;
  min-height: 120px;
  font-family: inherit;
}

.textarea-wrapper .input-icon {
  top: 20px;
  transform: none;
}

.char-count {
  text-align: right;
  font-size: 0.8rem;
  color: #999;
  margin-top: 5px;
}

/* Error Messages */
.error-message {
  color: #e74c3c;
  font-size: 0.85rem;
  margin-top: 5px;
  padding-left: 15px;
  animation: shake 0.5s ease-in-out;
}

@keyframes shake {

  0%,
  100% {
    transform: translateX(0);
  }

  25% {
    transform: translateX(-5px);
  }

  75% {
    transform: translateX(5px);
  }
}

/* Submit Button */
.submit-btn {
  width: 100%;
  background: #1f80f7;
  color: white;
  border: none;
  padding: 18px;
  border-radius: 12px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  box-shadow: 0 10px 20px rgba(102, 126, 234, 0.3);
}

.submit-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 15px 30px rgba(102, 126, 234, 0.4);
}

.submit-btn:active {
  transform: translateY(0);
}

.submit-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
  transform: none;
}

.submit-btn.loading {
  background: #95a5a6;
}

/* Success Message */
.success-message {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: linear-gradient(135deg, #27ae60, #2ecc71);
  color: white;
  padding: 30px;
  border-radius: 15px;
  text-align: center;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
  z-index: 1000;
  animation: successPop 0.5s ease-out;
}

@keyframes successPop {
  0% {
    transform: translate(-50%, -50%) scale(0.5);
    opacity: 0;
  }

  100% {
    transform: translate(-50%, -50%) scale(1);
    opacity: 1;
  }
}

.success-message i {
  font-size: 3rem;
  margin-bottom: 15px;
  animation: checkmark 0.8s ease-in-out;
}

@keyframes checkmark {
  0% {
    transform: scale(0);
  }

  50% {
    transform: scale(1.2);
  }

  100% {
    transform: scale(1);
  }
}

.success-message h3 {
  margin: 10px 0;
  font-size: 1.5rem;
}

.success-message p {
  margin: 0;
  opacity: 0.9;
}

/* Responsive */
@media (max-width: 768px) {
  .form-wrapper {
    padding: 25px;
    margin: 10px;
  }

  .form-title {
    font-size: 2rem;
  }

  input,
  textarea {
    padding: 12px 12px 12px 40px;
  }

  .input-icon {
    left: 12px;
  }




}
</style>