<template>
    <footer class="main-footer">
        <!-- Main Footer Content -->
        <div class="footer-content">
            <div class="container">
                <div class="footer-grid">

                    <!-- Company Info -->
                    <div class="footer-section">
                        <div class="logo-section">
                            <h3 class="footer-logo">
                                <i class="fas fa-code"></i>

                                Dasturchi <span class="higlite"> Bola</span>
                            </h3>
                            <p class="footer-description">
                                Professional web development xizmatlari. Sizning g'oyalaringizni
                                haqiqatga aylantiramiz va zamonaviy texnologiyalar yordamida
                                mukammal yechimlar taqdim etamiz.
                            </p>
                        </div>


                    </div>



                    <!-- Contact Info -->
                    <div class="footer-section">
                        <h4 class="section-title">Bog'lanish</h4>
                        <div class="contact-info">
                            <div v-for="contact in contactInfo" :key="contact.type" class="contact-item">
                                <i :class="contact.icon" :style="{ color: contact.color }"></i>
                                <div class="contact-details">
                                    <span class="contact-label">{{ contact.label }}</span>
                                    <a :href="contact.link" class="contact-value">{{ contact.value }}</a>
                                </div>
                            </div>
                        </div>


                    </div>
                    <!-- Contact Info -->
                    <div class="footer-section">

                        <!-- Newsletter -->
                        <div class="newsletter">
                            <h5>Yangiliklar</h5>
                            <p>Eng so'nggi yangiliklar va takliflardan xabardor bo'ling</p>
                            <form @submit.prevent="subscribeNewsletter" class="newsletter-form">
                                <div class="input-group">
                                    <input v-model="newsletterEmail" type="email" placeholder="Email manzilingiz"
                                        required :disabled="isSubscribing">
                                    <button type="submit" :disabled="isSubscribing">
                                        <i v-if="!isSubscribing" class="fas fa-paper-plane"></i>
                                        <i v-else class="fas fa-spinner fa-spin"></i>
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>

                </div>
            </div>
        </div>




    </footer>
</template>
// !! Script
<script>
export default {
    name: 'FooterComponent',
    data() {
        return {
            currentYear: new Date().getFullYear(),
            newsletterEmail: '',
            isSubscribing: false,
            showScrollTop: false,



            contactInfo: [

                {
                    type: 'phone',
                    icon: 'fas fa-phone',
                    color: '#27ae60',
                    label: 'Telefon',
                    value: '+998 77 040 46 24',
                    link: 'tel:+998770404624'
                },
                {
                    type: 'email',
                    icon: 'fas fa-envelope',
                    color: '#3498db',
                    label: 'Email',
                    value: 'azamqulov0102@gmail.com',
                    link: 'mailto:azamqulov0102@gmail.com'
                },

            ]
        }
    },



    methods: {
        // Newsletter subscription
        async subscribeNewsletter() {
            if (!this.newsletterEmail) return;

            this.isSubscribing = true;

            try {
                // Simulate API call
                await new Promise(resolve => setTimeout(resolve, 2000));

                alert(`${this.newsletterEmail} manzili muvaffaqiyatli ro'yxatga qo'shildi!`);
                this.newsletterEmail = '';
            } catch (error) {
                alert('Xatolik yuz berdi. Qayta urinib ko\'ring.');
            } finally {
                this.isSubscribing = false;
            }
        },

        // Animate social icons on hover
        animateIcon(event) {
            const icon = event.currentTarget;
            icon.style.transform = 'scale(1.2) rotate(360deg)';
            setTimeout(() => {
                icon.style.transform = '';
            }, 300);
        },



    }
}
</script>

// !! Styles
<style scoped>
/* Font Awesome import */
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css');

/* Main Footer */
.main-footer {
    background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%);
    color: #ecf0f1;
    position: relative;
    overflow: hidden;
    margin-top: 100px;
}

.main-footer::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background:
        radial-gradient(circle at 20% 80%, rgba(52, 152, 219, 0.1) 0%, transparent 50%),
        radial-gradient(circle at 80% 20%, rgba(155, 89, 182, 0.1) 0%, transparent 50%);
    pointer-events: none;
}

.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
    position: relative;
    z-index: 1;
}

/* Footer Content */
.footer-content {
    padding: 60px 0 40px;
}

.footer-grid {
    display: grid;
    grid-template-columns: 4fr 4fr 4fr;
    gap: 40px;
    align-items: center;
}


@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(30px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}



.footer-logo {
    font-size: 2rem;
    font-weight: bold;
    margin-bottom: 25px;
    display: flex;
    align-items: center;
    gap: 10px;
    color: #fff;
}

.higlite {
    color: #1f80f7;
    font-weight: 700;
}

.footer-logo i {
    font-size: 1.8rem;
    transition: transform 0.5s ease;
    color: #1f80f7;
}

.footer-logo:hover i {
    transform: rotate(360deg);
}

.footer-description {
    line-height: 1.6;
    color: #bdc3c7;
    margin: 0;
}

/* Section Titles */
.section-title {
    font-size: 1.2rem;
    font-weight: 600;
    margin-bottom: 20px;
    color: #ecf0f1;
    position: relative;
    padding-bottom: 10px;
}

.section-title::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 40px;
    height: 2px;
    background: linear-gradient(90deg, #3498db, #9b59b6);
    border-radius: 1px;
}

/* Footer Links */
.footer-links {
    list-style: none;
    padding: 0;
    margin: 0;
}

.footer-links li {
    margin-bottom: 12px;
}

.footer-link {
    color: #bdc3c7;
    text-decoration: none;
    display: flex;
    align-items: center;
    gap: 10px;
    transition: all 0.3s ease;
    padding: 5px 0;
}

.footer-link:hover {
    color: #3498db;
    transform: translateX(5px);
}

.footer-link i {
    width: 16px;
    opacity: 0.7;
}


/* Contact Info */
.contact-info {
    margin-bottom: 30px;
}

.contact-item {
    display: flex;
    align-items: flex-start;
    gap: 15px;
    margin-bottom: 20px;
    padding: 15px;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 10px;
    transition: all 0.3s ease;
}

.contact-item:hover {
    background: rgba(255, 255, 255, 0.1);
    transform: translateX(5px);
}

.contact-item i {
    font-size: 1.2rem;
    margin-top: 2px;
}

.contact-details {
    flex: 1;
}

.contact-label {
    display: block;
    font-size: 0.9rem;
    color: #95a5a6;
    margin-bottom: 3px;
}

.contact-value {
    color: #ecf0f1;
    text-decoration: none;
    font-weight: 500;
    transition: color 0.3s ease;
}

.contact-value:hover {
    color: #3498db;
}

/* Newsletter */
.newsletter {
    background: rgba(52, 152, 219, 0.1);
    padding: 25px;
    border-radius: 15px;
    border: 1px solid rgba(52, 152, 219, 0.3);
}

.newsletter h5 {
    margin: 0 0 10px 0;
    font-size: 1.1rem;
    color: #3498db;
}

.newsletter p {
    margin: 0 0 20px 0;
    font-size: 0.9rem;
    color: #bdc3c7;
    line-height: 1.4;
}

.newsletter-form .input-group {
    display: flex;
    border-radius: 8px;
    overflow: hidden;
    background: rgba(255, 255, 255, 0.1);
}

.newsletter-form input {
    flex: 1;
    padding: 12px 15px;
    border: none;
    background: transparent;
    color: white;
    outline: none;
}

.newsletter-form input::placeholder {
    color: rgba(255, 255, 255, 0.6);
}

.newsletter-form button {
    padding: 12px 15px;
    border: none;
    background: #3498db;
    color: white;
    cursor: pointer;
    transition: all 0.3s ease;
}

.newsletter-form button:hover:not(:disabled) {
    background: #2980b9;
}

.newsletter-form button:disabled {
    opacity: 0.6;
    cursor: not-allowed;
}

/* Footer Bottom */
.footer-bottom {
    background: rgba(0, 0, 0, 0.3);
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    padding: 25px 0;
}

.footer-bottom-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 20px;
}

.copyright {
    color: #95a5a6;
}

.copyright p {
    margin: 0;
    font-size: 0.9rem;
}

.heart-animation {
    animation: heartbeat 2s ease-in-out infinite;
}

@keyframes heartbeat {

    0%,
    100% {
        transform: scale(1);
    }

    50% {
        transform: scale(1.1);
    }
}

.heart-animation i {
    color: #e74c3c;
}

.footer-bottom-links {
    display: flex;
    gap: 30px;
    flex-wrap: wrap;
}

.bottom-link {
    color: #95a5a6;
    text-decoration: none;
    font-size: 0.9rem;
    transition: color 0.3s ease;
}

.bottom-link:hover {
    color: #3498db;
}

/* Scroll to Top Button */
.scroll-to-top {
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    background: linear-gradient(135deg, #3498db, #9b59b6);
    color: white;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    opacity: 0;
    transform: translateY(100px);
    transition: all 0.3s ease;
    z-index: 1000;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
}

.scroll-to-top.visible {
    opacity: 1;
    transform: translateY(0);
}

.scroll-to-top:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.4);
}

/* Responsive Design */
@media (max-width: 1024px) {
    .footer-grid {
        grid-template-columns: 1fr 1fr;
        gap: 30px;
    }
}

@media (max-width: 768px) {
    .footer-grid {
        grid-template-columns: 1fr;
        gap: 40px;
    }

    .footer-content {
        padding: 40px 0 30px;
    }

    .footer-bottom-content {
        flex-direction: column;
        text-align: center;
    }

    .footer-bottom-links {
        justify-content: center;
    }

    .scroll-to-top {
        bottom: 20px;
        right: 20px;
        width: 45px;
        height: 45px;
    }
}

@media (max-width: 480px) {
    .container {
        padding: 0 15px;
    }

    .footer-logo {
        font-size: 1.6rem;
    }

    .social-links {
        justify-content: center;
    }

    .newsletter {
        padding: 20px;
    }

    .newsletter-form .input-group {
        flex-direction: column;
    }

    .newsletter-form button {
        border-radius: 0 0 8px 8px;
    }
}
</style>