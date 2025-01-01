import { createApp, defineAsyncComponent } from 'vue';

import { register } from 'swiper/element/bundle';
import 'swiper/swiper-bundle.css';
register();


import router from './router.js'; // Import the router instance
import store from './store/index.js'; // Import the store instance
import App from './App.vue';
import BaseCard from './components/ui/BaseCard.vue';
import BaseButton from './components/ui/BaseButton.vue';
import BaseBadge from './components/ui/BaseBadge.vue';
import BaseSpinner from './components/ui/BaseSpinner.vue';
import BaseDialog from './components/ui/BaseDialog.vue';
// const BaseDialog = defineAsyncComponent(() => import('./components/ui/BaseDialog.vue'));

import { initializeApp, getApps } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

function initializeFirebase(config) {
  let firebaseApp;
  if (!getApps().length) {
    firebaseApp = initializeApp(config);
  } else {
    firebaseApp = getApps()[0];
  }
  return getFirestore(firebaseApp);
}

const app = createApp(App);
app.config.globalProperties.$initializeFirebase = initializeFirebase;


app.use(router); // Use the router instance
app.use(store); // Use the store instance
app.component('base-card', BaseCard);
app.component('base-button', BaseButton);
app.component('base-badge', BaseBadge);
app.component('base-spinner', BaseSpinner);
app.component('base-dialog', BaseDialog);

app.mount('#app');
