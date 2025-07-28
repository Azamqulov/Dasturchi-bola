<template>
    <main class="blog-cards">
        <div class="blog-content">
            <h1>Blog <span class="higlite">Postlar</span></h1>
            <p class="subtitle">Yangiliklar, maslahatlar va tajribalarim bilan shu yerda tanishing.</p>

            <!-- Post yaratish tugmasi (faqat admin uchun) -->
            <div v-if="isAdmin" class="create-post-section">
                <button @click="showCreateForm = !showCreateForm" class="create-btn">
                    {{ showCreateForm ? 'Bekor qilish' : 'Yangi post yaratish' }}
                </button>
            </div>

            <!-- Post yaratish formasi (faqat admin uchun) -->
            <div v-if="showCreateForm && isAdmin" class="create-form">
                <h2>Yangi post yaratish</h2>
                <form @submit.prevent="createPost">
                    <div class="form-group">
                        <label for="title">Sarlavha:</label>
                        <input type="text" id="title" v-model="newPost.title"
                            placeholder="Post sarlavhasini kiriting..." required>
                    </div>

                    <div class="form-group">
                        <label for="image">Rasm URL:</label>
                        <input type="url" id="image" v-model="newPost.image"
                            placeholder="https://example.com/image.jpg">
                        <small>Ixtiyoriy: Rasm URL manzilini kiriting</small>
                    </div>

                    <div class="form-group">
                        <label for="content">Matn:</label>
                        <textarea id="content" v-model="newPost.content" placeholder="Post matnini kiriting..." rows="6"
                            required></textarea>
                    </div>

                    <div class="form-actions">
                        <button type="submit" class="submit-btn">Post yaratish</button>
                        <button type="button" @click="resetForm" class="cancel-btn">Tozalash</button>
                    </div>
                </form>
            </div>

            <!-- Postlar ro'yxati -->
            <div class="posts-container">
                <div v-if="posts.length === 0" class="no-posts">
                    <p>Hozircha postlar yo'q. Birinchi postingizni yarating!</p>
                </div>

                <div v-for="post in posts" :key="post.id" class="post-card">
                    <div v-if="editingPost === post.id && isAdmin" class="edit-form">
                        <h3>Postni tahrirlash</h3>
                        <form @submit.prevent="updatePost(post.id)">
                            <div class="form-group">
                                <label>Sarlavha:</label>
                                <input type="text" v-model="editForm.title" required>
                            </div>

                            <div class="form-group">
                                <label>Rasm URL:</label>
                                <input type="url" v-model="editForm.image">
                            </div>

                            <div class="form-group">
                                <label>Matn:</label>
                                <textarea v-model="editForm.content" rows="4" required></textarea>
                            </div>

                            <div class="form-actions">
                                <button type="submit" class="submit-btn">Saqlash</button>
                                <button type="button" @click="cancelEdit" class="cancel-btn">Bekor qilish</button>
                            </div>
                        </form>
                    </div>

                    <div v-else class="post-content">
                        <div class="post-header">
                            <h2>{{ post.title }}</h2>
                            <div v-if="isAdmin" class="post-actions">
                                <button @click="startEdit(post)" class="edit-btn">Tahrirlash</button>
                                <button @click="deletePost(post.id)" class="delete-btn">O'chirish</button>
                            </div>
                        </div>

                        <div class="post-meta">
                            <span class="date">{{ formatDate(post.date) }}</span>
                        </div>

                        <div v-if="post.image" class="post-image">
                            <img :src="post.image" :alt="post.title" @error="handleImageError">
                        </div>

                        <div class="post-text">
                            <p>{{ post.content }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>

<script>
export default {
    data() {
        return {
            showCreateForm: false,
            editingPost: null,
            posts: [
                {
                    id: 1,
                    title: "🌍 London LC — Kelajak Tilini Bugunoq O‘rgan!",
                    content: `Bugun dunyo bilan gaplashish uchun chet elga bormaslik mumkin. Endi London bilan aloqa qilish uchun samolyotga chiqmasang ham bo‘ladi. Chunki London LC — xalqaro sifatdagi ta’lim endi O‘zbekistonda!

Til bilish — bu nafaqat diplom, bu — kelajakdagi ish, xorijdagi o‘qish, yangi do‘stlar, va bepoyon imkoniyatlar. Shunday ekan, nima uchun bu imkoniyatni qo‘ldan boy berish kerak?`,
                    date: new Date('2025-01-15'),
                    image: "https://www.lcuck.ac.uk/wp-content/uploads/2019/08/main-1.jpg"
                }
            ],
            newPost: {
                title: '',
                content: '',
                image: ''
            },
            editForm: {
                title: '',
                content: '',
                image: ''
            }
        }
    },
    computed: {
        isAdmin() {
            // localStorage dan user role tekshirish
            const role = localStorage.getItem('role');
            return role === 'admin';
        }
    },
    methods: {
        createPost() {
            if (!this.isAdmin) {
                alert('Faqat adminlar post yarata oladi!');
                return;
            }

            if (!this.newPost.title.trim() || !this.newPost.content.trim()) {
                alert('Sarlavha va matn majburiy maydonlar!');
                return;
            }

            const post = {
                id: Date.now(),
                title: this.newPost.title.trim(),
                content: this.newPost.content.trim(),
                image: this.newPost.image.trim(),
                date: new Date()
            };

            this.posts.unshift(post);
            this.resetForm();
            this.showCreateForm = false;
        },

        startEdit(post) {
            if (!this.isAdmin) {
                alert('Faqat adminlar post tahrirlashi mumkin!');
                return;
            }

            this.editingPost = post.id;
            this.editForm = {
                title: post.title,
                content: post.content,
                image: post.image || ''
            };
        },

        updatePost(postId) {
            if (!this.editForm.title.trim() || !this.editForm.content.trim()) {
                alert('Sarlavha va matn majburiy maydonlar!');
                return;
            }

            const postIndex = this.posts.findIndex(p => p.id === postId);
            if (postIndex !== -1) {
                this.posts[postIndex] = {
                    ...this.posts[postIndex],
                    title: this.editForm.title.trim(),
                    content: this.editForm.content.trim(),
                    image: this.editForm.image.trim()
                };
            }

            this.cancelEdit();
        },

        cancelEdit() {
            this.editingPost = null;
            this.editForm = {
                title: '',
                content: '',
                image: ''
            };
        },

        deletePost(postId) {
            if (confirm('Rostdan ham bu postni o\'chirmoqchimisiz?')) {
                this.posts = this.posts.filter(p => p.id !== postId);
            }
        },

        resetForm() {
            this.newPost = {
                title: '',
                content: '',
                image: ''
            };
        },

        formatDate(date) {
            const options = {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                locale: 'uz-UZ'
            };
            return new Intl.DateTimeFormat('uz-UZ', options).format(date);
        },

        handleImageError(event) {
            event.target.style.display = 'none';
        }
    }
}
</script>

<style lang="css">
@import '../../style.css';

.blog-cards {
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
    border-radius: 24px;
    animation: rightTo .4s ease-in-out;
    max-width: 1200px;
    margin: 0 auto;
}

.blog-content {
    padding: 30px;
}

.higlite {
    color: #6366f1;
}

.subtitle {
    color: #6b7280;
    margin-bottom: 30px;
    font-size: 16px;
}

/* Post yaratish bo'limi */
.create-post-section {
    margin-bottom: 30px;
}

.create-btn {
    background: linear-gradient(135deg, #6366f1, #8b5cf6);
    color: white;
    border: none;
    padding: 12px 24px;
    border-radius: 12px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
}

.create-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 20px rgba(99, 102, 241, 0.3);
}

/* Formalar */
.create-form,
.edit-form {
    background: #f8fafc;
    padding: 24px;
    border-radius: 16px;
    margin-bottom: 30px;
    border: 1px solid #e2e8f0;
}

.create-form h2,
.edit-form h3 {
    color: #1e293b;
    margin-bottom: 20px;
    font-size: 20px;
}

.form-group {
    margin-bottom: 20px;
}

.form-group label {
    display: block;
    margin-bottom: 6px;
    font-weight: 600;
    color: #374151;
}

.form-group input,
.form-group textarea {
    width: 100%;
    padding: 12px 16px;
    border: 2px solid #e2e8f0;
    border-radius: 8px;
    font-size: 14px;
    transition: border-color 0.3s ease;
    font-family: inherit;
}

.form-group input:focus,
.form-group textarea:focus {
    outline: none;
    border-color: #6366f1;
    box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
}

.form-group small {
    color: #6b7280;
    font-size: 12px;
    display: block;
    margin-top: 4px;
}

.form-actions {
    display: flex;
    gap: 12px;
    margin-top: 24px;
}

.submit-btn {
    background: #10b981;
    color: white;
    border: none;
    padding: 12px 24px;
    border-radius: 8px;
    font-weight: 600;
    cursor: pointer;
    transition: background 0.3s ease;
}

.submit-btn:hover {
    background: #059669;
}

.cancel-btn {
    background: #6b7280;
    color: white;
    border: none;
    padding: 12px 24px;
    border-radius: 8px;
    font-weight: 600;
    cursor: pointer;
    transition: background 0.3s ease;
}

.cancel-btn:hover {
    background: #4b5563;
}

/* Postlar konteyner */
.posts-container {
    display: flex;
    flex-direction: column;
    gap: 24px;
}

.no-posts {
    text-align: center;
    padding: 60px 20px;
    color: #6b7280;
}

.no-posts p {
    font-size: 18px;
}

/* Post kartalar */
.post-card {
    background: white;
    border-radius: 16px;
    overflow: hidden;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
    border: 1px solid #e2e8f0;
    transition: all 0.3s ease;
}

.post-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.1);
}

.post-content {
    padding: 24px;
}

.post-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 12px;
    gap: 16px;
}

.post-header h2 {
    color: #1e293b;
    font-size: 22px;
    margin: 0;
    line-height: 1.3;
    flex: 1;
}

.post-actions {
    display: flex;
    gap: 8px;
    flex-shrink: 0;
}

.edit-btn {
    background: #f59e0b;
    color: white;
    border: none;
    padding: 8px 16px;
    border-radius: 6px;
    font-size: 12px;
    font-weight: 600;
    cursor: pointer;
    transition: background 0.3s ease;
}

.edit-btn:hover {
    background: #d97706;
}

.delete-btn {
    background: #ef4444;
    color: white;
    border: none;
    padding: 8px 16px;
    border-radius: 6px;
    font-size: 12px;
    font-weight: 600;
    cursor: pointer;
    transition: background 0.3s ease;
}

.delete-btn:hover {
    background: #dc2626;
}

.post-meta {
    margin-bottom: 16px;
}

.date {
    color: #6b7280;
    font-size: 14px;
    font-weight: 500;
}

.post-image {
    margin: 20px 0;
}

.post-image img {
    width: 100%;
    height: 200px;
    object-fit: cover;
    border-radius: 12px;
}

.post-text p {
    color: #374151;
    line-height: 1.6;
    margin: 0;
}

/* Responsiv dizayn */
@media (max-width: 768px) {
    .blog-content {
        padding: 20px;
    }

    .post-header {
        flex-direction: column;
        align-items: stretch;
    }

    .post-actions {
        justify-content: flex-end;
        margin-top: 12px;
    }

    .form-actions {
        flex-direction: column;
    }

    .form-actions button {
        width: 100%;
    }
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
</style>