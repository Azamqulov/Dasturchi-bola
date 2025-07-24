<template>
    <div class="tech-stack-container">
        <div class="tech-card">
            <h2 class="title">Tech Stack</h2>

            <div class="tech-grid">
                <div v-for="(tech, index) in techStack" :key="tech.id" class="tech-item"
                    :style="{ animationDelay: `${index * 0.1}s` }" @click="selectTech(tech.id)"
                    :class="{ active: selectedTech === tech.id }">
                    <div class="tech-icon">
                        <img :src="tech.icon" :alt="tech.name">
                    </div>
                    <span class="tech-name">{{ tech.name }}</span>
                    <div class="tech-glow"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { ref } from 'vue'

export default {
    name: 'TechStack',
    setup() {
        const selectedTech = ref(null)

        const techStack = ref([
            {
                id: 1,
                name: 'Html',
                icon: 'https://icons.iconarchive.com/icons/cornmanthe3rd/plex/512/Other-html-5-icon.png'
            },
            {
                id: 2,
                name: 'CSS',
                icon: 'https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/css-icon.png'
            },
            {
                id: 3,
                name: 'Firebase',
                icon: 'https://cdn4.iconfinder.com/data/icons/google-i-o-2016/512/google_firebase-2-512.png'
            },
            {
                id: 4,
                name: 'Tailwind',
                icon: 'https://sukhrob.uz/assets/img/tailwind.svg'
            },
            {
                id: 5,
                name: 'Javascript',
                icon: 'https://sukhrob.uz/assets/img/javascript.svg'
            },
            {
                id: 6,
                name: 'Vue',
                icon: 'https://sukhrob.uz/assets/img/vue.svg'
            }
        ])

        const selectTech = (id) => {
            selectedTech.value = selectedTech.value === id ? null : id
        }

        return {
            techStack,
            selectedTech,
            selectTech
        }
    }
}
</script>

<style scoped>
/* Card */
.tech-card {
    background: rgba(255, 255, 255, 0.15);
    backdrop-filter: blur(20px);
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 24px;
    padding: 32px;
    box-shadow: 0 25px 50px rgba(0, 0, 0, 0.1);
    animation: cardFloat 6s ease-in-out infinite;
}

/* Title */
.title {
    font-size: 32px;
    font-weight: 800;
    color: #2c3e50;
    margin-bottom: 32px;
    text-align: center;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    animation: titleGlow 2s ease-in-out infinite alternate;
}

/* Grid */
.tech-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
    max-width: 400px;
}

/* Tech Items */
.tech-item {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 16px;
    cursor: pointer;
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    transform: translateY(20px);
    opacity: 0;
    animation: slideUp 0.6s forwards;
    overflow: hidden;
}

.tech-item:hover {
    transform: translateY(-8px) scale(1.05);
    background: rgba(255, 255, 255, 0.2);
    border-color: rgba(255, 255, 255, 0.4);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
}

.tech-item.active {
    transform: translateY(-8px) scale(1.08);
    background: rgba(255, 255, 255, 0.25);
    border-color: rgba(255, 255, 255, 0.5);
    box-shadow: 0 25px 50px rgba(0, 0, 0, 0.3);
}

.tech-item.active .tech-glow {
    opacity: 1;
    transform: scale(1.2);
}

/* Tech Icon */
.tech-icon {
    width: 56px;
    height: 56px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 12px;
    margin-bottom: 12px;
    background: rgba(255, 255, 255, 0.1);
    transition: all 0.3s ease;
    position: relative;
    z-index: 2;
}

.tech-icon img {
    width: 40px;
    height: 40px;
    object-fit: contain;
    transition: transform 0.3s ease;
}

.tech-item:hover .tech-icon img {
    transform: scale(1.1) rotate(5deg);
}

/* Tech Name */
.tech-name {
    font-size: 14px;
    font-weight: 600;
     color: #2c3e50;
    text-align: center;
    transition: color 0.3s ease;
}


/* Glow Effect */
.tech-glow {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(circle at center, rgba(255, 255, 255, 0.1) 0%, transparent 70%);
    border-radius: 16px;
    opacity: 0;
    transition: all 0.4s ease;
    transform: scale(0.8);
}

/* Animations */
@keyframes slideUp {
    to {
        transform: translateY(0);
        opacity: 1;
    }
}



@keyframes titleGlow {
    0% {
        text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    100% {
        text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1), 0 0 20px rgba(255, 255, 255, 0.3);
    }
}

/* Responsive Design */
@media (max-width: 480px) {
    .tech-grid {
        grid-template-columns: repeat(2, 1fr);
        max-width: 300px;
    }

    .tech-card {
        padding: 24px;
    }

    .title {
        font-size: 28px;
        margin-bottom: 24px;
    }

    .tech-item {
        padding: 16px;
    }

    .tech-icon {
        width: 48px;
        height: 48px;
    }

    .tech-icon img {
        width: 32px;
        height: 32px;
    }
}
</style>