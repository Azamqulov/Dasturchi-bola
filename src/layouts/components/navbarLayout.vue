<template>
    <div class="container">
    <nav :class="['navbar', { dark: isDarkMode }]">
        <div class="navbar-container">
            <!-- Logo qismi -->
            <div class="navbar-brand" @click="$router.push('/')">
                <div class="logo">
                    <div class="logo-icon"><i class="fa-solid fa-code"></i> </div>
                    <span class="brand-name">
                        Dasturchi <span class="brand-surname">Bola </span>
                    </span>
                </div>
            </div>

            <!-- Navigation items -->
            <div class="navbar-nav">
                <a v-for="item in navItems" :key="item.id" @click="$router.push(item.path)"
                    :class="['nav-item', { active: item.active }]" @click.prevent="setActiveItem(item.id)">
                    <span class="nav-icon"><i :class="item.icon"></i></span>
                    <span class="nav-text">{{ item.text }}</span>
                </a>
            </div>

            <!-- Controls -->
            <div class="navbar-controls">
                <button @click="toggleDarkMode" class="theme-toggle" :class="{ active: isDarkMode }">
                    <span class="theme-icon">{{ isDarkMode ? '☀️' : '🌙' }}</span>
                </button>

                <div class="user-menu">
                    <button class="user-btn" 
                        @click="$router.push('/contact')">
                        <span class="user-text">Birga ishlang</span>
                        <span class="chevron"><i class="fa-solid fa-chevron-down"></i></span>
                    </button>
                </div>
            </div>
        </div>
    </nav>
    </div>

</template>

<script>
import { ref } from 'vue'

export default {
    name: 'AnimatedNavbar',
    setup() {
        
        const navItems = ref([
            {
                id: 1,
                text: 'Asosiy',
                icon: 'fa-solid fa-house',
                path: '/',
                active: true
            },
            {
                id: 2,
                text: 'Loyihalar',
                icon: 'fa-solid fa-bars-progress',
                path: '/works',
                active: false
            },
            {
                id: 3,
                text: 'Blog',
                icon: 'fa-solid fa-pen-nib',
                path: '/blog',
                active: false
            },
            {
                id: 4,
                text: 'Aloqa',
                icon: 'fa-regular fa-address-card',
                path: '/contact',
                active: false
            }
        ])

        const isDarkMode = ref(false)

        // Dark mode toggle funksiyasi
        const toggleDarkMode = () => {
            isDarkMode.value = !isDarkMode.value
        }

        // Active item o'zgartirish
        const setActiveItem = (id) => {
            navItems.value.forEach(item => {
                item.active = item.id === id
            })
        }

        return {
            navItems,
            isDarkMode,
            toggleDarkMode,
            setActiveItem
        }
    }
}
</script>

<style scoped>
.navbar {
    /* background: rgba(255, 255, 255, 0.1); */
    backdrop-filter: blur(20px);
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 20px;
    padding: 15px 25px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}



.navbar-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    max-width: 1200px;
    margin: 0 auto;
}

.navbar-brand {
    display: flex;
    align-items: center;
    gap: 12px;
}

.logo {
    display: flex;
    align-items: center;
    gap: 8px;
    animation: fadeInLeft 0.8s ease-out;
    cursor: pointer;
}

@keyframes fadeInLeft {
    from {
        opacity: 0;
        transform: translateX(-30px);
    }

    to {
        opacity: 1;
        transform: translateX(0);
    }
}

.logo-icon {
    font-size: 24px;
    color: #1f80f7;
    font-weight: bold;
    transition: transform 0.3s ease;
}

.logo:hover .logo-icon {
    transform: rotate(180deg) scale(1.1);
}

.brand-name {
    font-size: 20px;
    font-weight: bold;
    color: black;
}

.brand-surname {
    color: #1f80f7;
    font-weight: 700;
}

.navbar-nav {
    display: flex;
    align-items: center;
    gap: 8px;
    animation: fadeInUp 0.8s ease-out 0.2s both;
}

@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(20px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.nav-item {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 10px 16px;
    color: #000000bd;
    text-decoration: none;
    border-radius: 12px;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    position: relative;
    overflow: hidden;
    cursor: pointer;
}

.nav-item::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
    transition: left 0.6s ease;
}

.nav-item:hover::before {
    left: 100%;
}

.nav-item:hover {
    color: black;
    background: rgba(255, 255, 255, 0.1);
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.nav-item.active {
    color: white;
    background: rgb(26 31 44 / 1.8);
    border: 1px solid rgba(78, 70, 229, 0.304);
}

.nav-icon {
    font-size: 16px;
    transition: transform 0.3s ease;
}

.nav-item:hover .nav-icon {
    transform: scale(1.2) rotate(5deg);
}

.nav-text {
    font-weight: 500;
    font-size: 14px;
}

.navbar-controls {
    display: flex;
    align-items: center;
    gap: 12px;
    animation: fadeInRight 0.8s ease-out 0.4s both;
}

@keyframes fadeInRight {
    from {
        opacity: 0;
        transform: translateX(30px);
    }

    to {
        opacity: 1;
        transform: translateX(0);
    }
}

.theme-toggle {
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 10px;
    padding: 8px 12px;
    color: white;
    cursor: pointer;
    transition: all 0.3s ease;
    animation: pulse 2s infinite;
}

@keyframes pulse {

    0%,
    100% {
        transform: scale(1);
    }

    50% {
        transform: scale(1.05);
    }
}

.theme-toggle:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: translateY(-2px);
}

.theme-toggle.active {
    background: rgba(255, 193, 7, 0.2);
    border-color: rgba(255, 193, 7, 0.4);
}

.theme-icon {
    font-size: 16px;
    transition: transform 0.3s ease;
}

.theme-toggle:hover .theme-icon {
    transform: rotate(180deg);
}

.user-menu {
    position: relative;
}

.user-btn {
    background: rgb(26 31 44 / 1.8);
    border-radius: 12px;
    padding: 10px 16px;
    color: white;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 8px;
    transition: all 0.3s ease;
}

.user-btn:hover {
    background: rgba(255, 255, 255, 0.3);
    transform: translateY(-2px);
    color: black;
    box-shadow: 0 4px 12px rgba(79, 70, 229, 0.2);
}

.user-text {
    font-weight: 500;
    font-size: 14px;
}

.chevron {
    font-size: 12px;
    transition: transform 0.3s ease;
}

.user-btn:hover .chevron {
    transform: rotate(180deg);
}

/* Responsive */
@media (max-width: 768px) {
    .navbar {
        padding: 12px 20px;
    }

    .navbar-nav {
        display: none;
    }

    .brand-name {
        font-size: 18px;
    }

    .user-text {
        display: none;
    }
}
</style>