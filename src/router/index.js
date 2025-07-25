import { createRouter, createWebHistory } from 'vue-router';

import home from '../views/home.vue';
import blog from '../views/blog.vue';
import works from '../views/works.vue';
import contact from '../views/contact.vue';
import notFound from '../views/notFound.vue';
import admin from '../views/admin.vue';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: home,
        },
        {
            path: '/blog',
            name: 'blog',
            component: blog,
        },
        {
            path: '/works',
            name: 'works',
            component: works,
        },
        {
            path: '/contact',
            name: 'contact',
            component: contact,
        },
        {
            path: '/admin',
            name: 'admin',
            component: admin,
        },

        {
            path: "/:pathMatch(.*)*",
            name: 'notFound',
            component: notFound,
        },

    ],
});

export default router;