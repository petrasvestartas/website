import { createStore } from 'vuex';

// Import modules
import projectsModule from './modules/projects/index.js';
import requestsModule from './modules/requests/index.js';
import authModule from './modules/auth/index.js';

const store = createStore({
    modules: {
        projects: projectsModule,
        requests: requestsModule,
        auth: authModule
    },


});

export default store;

