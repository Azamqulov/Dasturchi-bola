<template>
    <div class="projects-container">
        <div class="projects-card">
            <div class="header">
                <h2 class="title">Loyihalar</h2>
                <!-- Faqat admin foydalanuvchilar uchun yangi loyiha tugmasi -->
                <button v-if="isAdmin" @click="showAddModal = true" class="add-btn">
                    <span class="plus-icon">+</span>
                    Yangi loyiha
                </button>
                <button class="add-btn " @click="$router.push('/works')">
                    Barchasi <i class="fa-solid fa-arrow-right"></i>
                </button>
            </div>

         

            <!-- Loading -->
            <div v-if="loading" class="loading">
                <div class="spinner"></div>
                <p>Yuklanmoqda...</p>
            </div>

            <!-- Projects Grid -->
            <div v-else class="projects-grid">
                <div v-for="(project, index) in projects" :key="project.id" class="project-card"
                    :style="{ animationDelay: `${index * 0.1}s` }">
                    <div class="project-image">
                        <img :src="project.image" :alt="project.title" />
                        <!-- Faqat admin foydalanuvchilar uchun edit va delete tugmalari -->
                        <div v-if="isAdmin" class="project-overlay">
                            <button @click="editProject(project)" class="edit-btn">
                               <i class="fa-solid fa-pen"></i>
                            </button>
                            <button @click="deleteProject(project.id)" class="delete-btn">
                               <i class="fa-solid fa-trash"></i>
                            </button>
                        </div>
                    </div>

                    <div class="project-content">
                        <h3 class="project-title">{{ project.title }}</h3>
                        <p class="project-description">{{ project.description }}</p>

                        <div class="project-tags">
                            <span v-for="tag in project.tags" :key="tag" class="tag">
                                {{ tag }}
                            </span>
                        </div>

                        <div class="project-links">
                            <a v-if="project.demoUrl" :href="project.demoUrl" target="_blank" class="demo-link">
                                Demo <i class="fa-solid fa-link"></i>
                            </a>
                            <a v-if="project.githubUrl" :href="project.githubUrl" target="_blank" class="github-link">
                                GitHub <i class="fa-solid fa-folder-open"></i>
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Empty State -->
            <div v-if="!loading && projects.length === 0" class="empty-state">
                <div class="empty-icon">📁</div>
                <h3>Hali loyihalar yo'q</h3>
                <p v-if="isAdmin">Birinchi loyihangizni qo'shing</p>
                <p v-else>Loyihalar tez orada qo'shiladi</p>
            </div>
        </div>

        <!-- Add/Edit Modal - Faqat admin uchun -->
        <div v-if="isAdmin && (showAddModal || editingProject)" class="modal-overlay" @click="closeModal">
            <div class="modal" @click.stop>
                <div class="modal-header">
                    <h3>{{ editingProject ? 'Loyihani tahrirlash' : 'Yangi loyiha qo\'shish' }}</h3>
                    <button @click="closeModal" class="close-btn">×</button>
                </div>

                <div class="modal-form">
                    <div class="form-group">
                        <label>Loyiha nomi</label>
                        <input v-model="formData.title" type="text" required placeholder="Loyiha nomini kiriting" />
                    </div>

                    <div class="form-group">
                        <label>Tavsif</label>
                        <textarea v-model="formData.description" required placeholder="Loyiha haqida qisqacha ma'lumot"
                            rows="3"></textarea>
                    </div>

                    <div class="form-group">
                        <label>Rasm URL</label>
                        <input v-model="formData.image" type="url" required
                            placeholder="https://example.com/image.jpg" />
                    </div>

                    <div class="form-group">
                        <label>Demo URL</label>
                        <input v-model="formData.demoUrl" type="url" placeholder="https://your-demo.com" />
                    </div>

                    <div class="form-group">
                        <label>GitHub URL</label>
                        <input v-model="formData.githubUrl" type="url" placeholder="https://github.com/username/repo" />
                    </div>

                    <div class="form-group">
                        <label>Texnologiyalar (vergul bilan ajrating)</label>
                        <input v-model="tagsInput" type="text" placeholder="Vue.js, Firebase, CSS" />
                    </div>

                    <div class="modal-actions">
                        <button type="button" @click="closeModal" class="cancel-btn">
                            Bekor qilish
                        </button>
                        <button type="button" @click="saveProject" class="save-btn" :disabled="saving">
                            {{ saving ? 'Saqlanmoqda...' : 'Saqlash' }}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { ref, onMounted, computed } from 'vue'

export default {
    name: 'ProjectsManager',
    setup() {
        // State
        const projects = ref([])
        const loading = ref(false)
        const saving = ref(false)
        const showAddModal = ref(false)
        const editingProject = ref(null)
        const isAdmin = ref(false)

        // Form data
        const formData = ref({
            title: '',
            description: '',
            image: '',
            demoUrl: '',
            githubUrl: '',
            tags: []
        })

        const tagsInput = ref('')

        // Computed
        const processedTags = computed(() => {
            return tagsInput.value
                ? tagsInput.value.split(',').map(tag => tag.trim()).filter(tag => tag)
                : []
        })

        // Check admin role from localStorage
        const checkAdminRole = () => {
            const role = localStorage.getItem('role');
            isAdmin.value = role === 'admin';
            
            console.log('User role:', role);
            console.log('Is admin:', isAdmin.value);
        }

        // Firebase simulation (in real app, you'd use actual Firebase)
        const firebaseAPI = {
            // Simulate API delay
            delay: (ms = 1000) => new Promise(resolve => setTimeout(resolve, ms)),

            // Get all projects
            async getProjects() {
                await this.delay(800)
                const stored = localStorage.getItem('projects')
                return stored ? JSON.parse(stored) : []
            },

            // Add project
            async addProject(project) {
                await this.delay(500)
                const projects = await this.getProjects()
                const newProject = {
                    ...project,
                    id: Date.now().toString(),
                    createdAt: new Date().toISOString()
                }
                projects.push(newProject)
                localStorage.setItem('projects', JSON.stringify(projects))
                return newProject
            },

            // Update project
            async updateProject(id, updates) {
                await this.delay(500)
                const projects = await this.getProjects()
                const index = projects.findIndex(p => p.id === id)
                if (index !== -1) {
                    projects[index] = { ...projects[index], ...updates }
                    localStorage.setItem('projects', JSON.stringify(projects))
                    return projects[index]
                }
                throw new Error('Project not found')
            },

            // Delete project
            async deleteProject(id) {
                await this.delay(300)
                const projects = await this.getProjects()
                const filtered = projects.filter(p => p.id !== id)
                localStorage.setItem('projects', JSON.stringify(filtered))
                return true
            }
        }

        // Methods
        const loadProjects = async () => {
            try {
                loading.value = true
                projects.value = await firebaseAPI.getProjects()
            } catch (error) {
                console.error('Error loading projects:', error)
                alert('Loyihalarni yuklashda xatolik!')
            } finally {
                loading.value = false
            }
        }

        const resetForm = () => {
            formData.value = {
                title: '',
                description: '',
                image: '',
                demoUrl: '',
                githubUrl: '',
                tags: []
            }
            tagsInput.value = ''
        }

        const closeModal = () => {
            showAddModal.value = false
            editingProject.value = null
            resetForm()
        }

        const editProject = (project) => {
            if (!isAdmin.value) {
                alert('Faqat admin foydalanuvchilar loyihani tahrirlashi mumkin!')
                return
            }
            
            editingProject.value = project
            formData.value = { ...project }
            tagsInput.value = project.tags.join(', ')
        }

        const saveProject = async () => {
            if (!isAdmin.value) {
                alert('Faqat admin foydalanuvchilar loyiha qo\'shishi mumkin!')
                return
            }

            try {
                saving.value = true

                const projectData = {
                    ...formData.value,
                    tags: processedTags.value
                }

                if (editingProject.value) {
                    // Update existing project
                    const updated = await firebaseAPI.updateProject(editingProject.value.id, projectData)
                    const index = projects.value.findIndex(p => p.id === editingProject.value.id)
                    if (index !== -1) {
                        projects.value[index] = updated
                    }
                } else {
                    // Add new project
                    const newProject = await firebaseAPI.addProject(projectData)
                    projects.value.push(newProject)
                }

                closeModal()
                alert(editingProject.value ? 'Loyiha muvaffaqiyatli yangilandi!' : 'Yangi loyiha qo\'shildi!')

            } catch (error) {
                console.error('Error saving project:', error)
                alert('Loyihani saqlashda xatolik!')
            } finally {
                saving.value = false
            }
        }

        const deleteProject = async (id) => {
            if (!isAdmin.value) {
                alert('Faqat admin foydalanuvchilar loyihani o\'chirishi mumkin!')
                return
            }

            if (!confirm('Bu loyihani o\'chirishni xohlaysizmi?')) return

            try {
                loading.value = true
                await firebaseAPI.deleteProject(id)
                projects.value = projects.value.filter(p => p.id !== id)
                alert('Loyiha muvaffaqiyatli o\'chirildi!')
            } catch (error) {
                console.error('Error deleting project:', error)
                alert('Loyihani o\'chirishda xatolik!')
            } finally {
                loading.value = false
            }
        }

        // Initialize sample data if empty
        const initializeSampleData = async () => {
            const existing = await firebaseAPI.getProjects()
            if (existing.length === 0) {
                const sampleProjects = [
                    {
                        title: 'London LC',
                        description: 'Istagram kuchidagi onlayn vetoz tuzing - bu ijodiy va professional platforma',
                        image: 'https://london-lc.vercel.app/assets/logo-BJkqyWP-.jpg',
                        demoUrl: 'https://london-lc.vercel.app/',
                        githubUrl: 'https://github.com/Azamqulov/London-LC',
                        tags: ['Vue.js', 'Firebase', 'Tailwind CSS']
                    },
                    {
                        title: 'Smart-Academy',
                        description: 'AI-powered portrait generation va professional photo editing platformasi',
                        image: 'https://smarta-academy-vue.vercel.app/assets/biglogo-kH-N2sXJ.png',
                        demoUrl: 'https://smart-academy-vue.vercel.app/',
                        githubUrl: 'https://github.com/Azamqulov/SmartaAcademy_vue',
                        tags: ['JavaScript', 'AI', 'Canvas API']
                    }
                ]

                for (const project of sampleProjects) {
                    await firebaseAPI.addProject(project)
                }
            }
        }

        // Listen for localStorage changes (if user logs in/out in another tab)
        const handleStorageChange = () => {
            checkAdminRole()
        }

        // Lifecycle
        onMounted(async () => {
            checkAdminRole()
            window.addEventListener('storage', handleStorageChange)
            
            await initializeSampleData()
            await loadProjects()
        })

       

        return {
            // State
            projects,
            loading,
            saving,
            showAddModal,
            editingProject,
            formData,
            tagsInput,
            isAdmin,

            // Methods
            editProject,
            deleteProject,
            saveProject,
            closeModal,
            checkAdminRole
        }
    }
}
</script>

<style scoped>

.projects-container{
    height: 75vh;
    overflow-y: scroll;
        box-shadow: 0 20px 40px rgba(0,0,0,0.1);
    border-radius: 24px;
    animation: rightTo .4s ease-in-out;
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
::-webkit-scrollbar{
    width: 0px;
}

/* Main Card */
.projects-card {
    background: white;
    backdrop-filter: blur(20px);
    border: 1px solid rgba(255, 255, 255, 0.2);
    padding: 32px;
}

/* Admin Info */
.admin-info {
    margin-bottom: 24px;
}

.info-card {
    background: rgba(59, 130, 246, 0.1);
    border: 1px solid rgba(59, 130, 246, 0.3);
    border-radius: 12px;
    padding: 16px;
    display: flex;
    align-items: center;
    gap: 12px;
    color: #1e40af;
}

.info-card i {
    font-size: 20px;
}

.info-card p {
    margin: 0;
    font-weight: 500;
}

/* Header */
.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 32px;
}

.title {
    font-size: 32px;
    font-weight: 800;
    color: #2c3e50;
    margin: 0;
}

.add-btn {
    display: flex;
    align-items: center;
    gap: 8px;
    background: rgba(255, 255, 255, 0.2);
    border: 1px solid rgba(255, 255, 255, 0.3);
    color: #1f80f7;
    padding: 12px 20px;
    border-radius: 12px;
    cursor: pointer;
    transition: all 0.3s ease;
    font-weight: 600;
}

.add-btn:hover {
    background: rgba(255, 255, 255, 0.3);
    transform: translateY(-2px);
}

.plus-icon {
    font-size: 18px;
    font-weight: bold;
}

/* Loading */
.loading {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 60px 20px;
    color: #2c3e50;
}

.spinner {
    width: 40px;
    height: 40px;
    border: 4px solid rgba(255, 255, 255, 0.3);
    border-top: 4px solid white;
    border-radius: 50%;
    animation: spin 1s linear infinite;
    margin-bottom: 16px;
}

@keyframes spin {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}

/* Projects Grid */
.projects-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    gap: 24px;
}

/* Project Cards */
.project-card {
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 16px;
    overflow: hidden;
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    opacity: 0;
    transform: translateY(20px);
    animation: slideUp 0.6s forwards;
}

.project-card:hover {
    transform: translateY(-8px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
    background: rgba(255, 255, 255, 0.15);
}

.project-image {
    position: relative;
    height: 200px;
    overflow: hidden;
}

.project-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
}

.project-card:hover .project-image img {
    transform: scale(1.05);
}

.project-overlay {
    position: absolute;
    top: 12px;
    right: 12px;
    display: flex;
    gap: 8px;
    opacity: 0;
    transition: opacity 0.3s ease;
}

.project-card:hover .project-overlay {
    opacity: 1;
}

.edit-btn,
.delete-btn {
    width: 36px;
    height: 36px;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.2s ease;
    font-size: 16px;
}

.edit-btn {
    background: rgba(59, 130, 246, 0.9);
    color: white;
}

.edit-btn:hover {
    background: rgb(59, 130, 246);
    transform: scale(1.1);
}

.delete-btn {
    background: rgba(239, 68, 68, 0.9);
    color: white;
}

.delete-btn:hover {
    background: rgb(239, 68, 68);
    transform: scale(1.1);
}

/* Project Content */
.project-content {
    padding: 20px;
}

.project-title {
    color: #2c3e50;
    font-size: 20px;
    font-weight: 700;
    margin: 0 0 8px 0;
}

.project-description {
    color: #2c3e50;
    font-size: 14px;
    line-height: 1.5;
    margin: 0 0 16px 0;
}

.project-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-bottom: 16px;
}

.tag {
    background: rgba(158, 157, 157, 0.509);
    color: #2c3e50;
    padding: 4px 12px;
    border-radius: 20px;
    font-size: 12px;
    font-weight: 500;
}

.project-links {
    display: flex;
    gap: 12px;
}

.demo-link,
.github-link {
    color: #2c3e50;
    text-decoration: none;
    font-size: 14px;
    font-weight: 600;
    padding: 8px 16px;
    border-radius: 8px;
    transition: all 0.2s ease;
}

.demo-link {
    background: rgba(34, 197, 94, 0.2);
    border: 1px solid rgba(34, 197, 94, 0.4);
}

.demo-link:hover {
    background: rgba(34, 197, 94, 0.3);
}

.github-link {
    background: rgba(107, 114, 128, 0.2);
    border: 1px solid rgba(107, 114, 128, 0.4);
}

.github-link:hover {
    background: rgba(107, 114, 128, 0.3);
}

/* Empty State */
.empty-state {
    text-align: center;
    padding: 60px 20px;
    color: #2c3e50;
}

.empty-icon {
    font-size: 64px;
    margin-bottom: 16px;
}

.empty-state h3 {
    font-size: 24px;
    margin: 0 0 8px 0;
}

.empty-state p {
    color: #2c3e50;
    margin: 0;
}

/* Modal */
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    padding: 20px;
}

.modal {
    background: white;
    border-radius: 16px;
    width: 100%;
    max-width: 500px;
    max-height: 90vh;
    overflow-y: auto;
}

.modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 24px;
    border-bottom: 1px solid #e5e7eb;
}

.modal-header h3 {
    margin: 0;
    font-size: 20px;
    font-weight: 700;
}

.close-btn {
    background: none;
    border: none;
    font-size: 24px;
    cursor: pointer;
    color: #6b7280;
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 4px;
}

.close-btn:hover {
    background: #f3f4f6;
}

/* Form */
.modal-form {
    padding: 24px;
}

.form-group {
    margin-bottom: 20px;
}

.form-group label {
    display: block;
    margin-bottom: 8px;
    font-weight: 600;
    color: #374151;
}

.form-group input,
.form-group textarea {
    width: 100%;
    padding: 12px;
    border: 2px solid #e5e7eb;
    border-radius: 8px;
    font-size: 14px;
    transition: border-color 0.2s ease;
    box-sizing: border-box;
}

.form-group input:focus,
.form-group textarea:focus {
    outline: none;
    border-color: #3b82f6;
}

.form-group textarea {
    resize: vertical;
    min-height: 80px;
}

.modal-actions {
    display: flex;
    gap: 12px;
    justify-content: flex-end;
    margin-top: 24px;
}

.cancel-btn,
.save-btn {
    padding: 12px 24px;
    border-radius: 8px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;
}

.cancel-btn {
    background: #f3f4f6;
    border: 1px solid #d1d5db;
    color: #374151;
}

.cancel-btn:hover {
    background: #e5e7eb;
}

.save-btn {
    background: #3b82f6;
    border: 1px solid #3b82f6;
    color: white;
}

.save-btn:hover:not(:disabled) {
    background: #2563eb;
}

.save-btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
}

/* Animations */
@keyframes slideUp {
    to {
        transform: translateY(0);
        opacity: 1;
    }
}

/* Responsive */
@media (max-width: 768px) {
    .projects-card {
        padding: 20px;
    }

    .header {
        flex-direction: column;
        gap: 16px;
        text-align: center;
    }

    .title {
        font-size: 28px;
    }

    .projects-grid {
        grid-template-columns: 1fr;
    }

    .modal {
        margin: 20px;
    }

    .modal-actions {
        flex-direction: column;
    }

    .cancel-btn,
    .save-btn {
        width: 100%;
    }
}
</style>