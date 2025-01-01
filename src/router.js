import { createRouter, createWebHashHistory } from 'vue-router'; // Use createWebHashHistory instead of createWebHistory

import ProjectDetail from './pages/projects/ProjectsDetail.vue';
import ProjectsList from './pages/projects/ProjectsList.vue';
import ProjectRegistration from './pages/projects/ProjectRegistration.vue';
import ContactProject from './pages/requests/ContactProject.vue';
import RequestsReceived from './pages/requests/RequestsReceived.vue';
import UserAuth from './pages/auth/UserAuth.vue';
import NotFound from './pages/NotFound.vue';
import Code from './pages/code/Code.vue';
import Teaching from './pages/teaching/Teaching.vue';
import Papers from './pages/papers/Papers.vue';
import About from './pages/about/About.vue';
import store from './store/index.js';

const router = createRouter({
    history: createWebHashHistory(), // Use createWebHashHistory
    routes: [
        { path: '/', redirect: '/projects' },
        { path: '/website', redirect: '/projects' }, // Redirect /website to /projects
        { path: '/projects', component: ProjectsList },
        { 
            path: '/projects/:id', 
            component: ProjectDetail,
            props: true, // Pass the route params as props to the component
            children: [
                { path: 'contact', component: ContactProject }, 
            ] 
        },
        { path: '/contact', component: ContactProject },
        { path: '/register', component: ProjectRegistration, meta: { requiresAuth: true } },
        { path: '/requests', component: RequestsReceived, meta: { requiresAuth: true } },
        { path: '/auth', component: UserAuth, meta: { requiresUnauth: true } },
        { path: '/:notFound(.*)', component: NotFound },
        { path: '/code', component: Code },
        { path: '/teaching', component: Teaching },
        { path: '/papers', component: Papers },
        { path: '/about', component: About },
    ], // Add the routes array here
}); // Create a new router instance

router.beforeEach((to, _, next) => {
    if (to.meta.requiresAuth && !store.getters.isAuthenticated) {
        next('/auth');
    } else if (to.meta.requiresUnauth && store.getters.isAuthenticated) {
        next('/projects');
    } else {
        next();
    }
}); // Add a global navigation guard

export default router; // Export the router instance