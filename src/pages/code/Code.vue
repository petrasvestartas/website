<template>
  <div>
    <base-card>
      <div class="content">
        <h1>Code</h1>
        <div v-for="(items, collectionName) in collections" :key="collectionName" class="collection">
          <h2>{{ capitalizeFirstLetter(collectionName) }}</h2>
          <div v-for="item in items" :key="item.id" class="item">
            <img :src="item.imageUrl" alt="Image" class="item-image">
            <div class="item-text">
              <div class="text-group">
                <base-button :to="item.url" mode="outline" :link="true">{{ item.title }}</base-button>
                <p class="description">{{ item.author }}</p>
                <p class="description">{{ item.description }}</p>
                <p class="description">{{ item.languages }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </base-card>
  </div>
</template>

<script>
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';

export default {
  name: 'Code',
  data() {
    return {
      collections: {},
      texts: null
    };
  },
  methods: {
    async fetchData() {
      const firebaseConfig = {
        apiKey: "AIzaSyBW4Yl1V408Pwn8U0Kftt_gi7ITCz7KDWk",
        authDomain: "code-368a9.firebaseapp.com",
        projectId: "code-368a9",
        storageBucket: "code-368a9.firebasestorage.app",
        messagingSenderId: "766019885651",
        appId: "1:766019885651:web:ddda1de6e118da4e2784a6",
        measurementId: "G-QGQ6LHG8RW"
      };

      let firebaseApp;
      if (!getApps().some(app => app.name === 'CodeApp')) {
        firebaseApp = initializeApp(firebaseConfig, 'CodeApp');
      } else {
        firebaseApp = getApp('CodeApp');
      }

      const db = getFirestore(firebaseApp);

      const collectionNames = ['tools', 'rhino_plugins'];

      for (const collectionName of collectionNames) {
        const colRef = collection(db, collectionName);
        const snapshot = await getDocs(colRef);
        const items = snapshot.docs.map(doc => {
          const data = { id: doc.id, sortId: doc.data().sortId || 0, ...doc.data() };
          return data;
        });
        items.sort((a, b) => a.sortId - b.sortId);
        this.collections[collectionName] = items;
      }

      this.texts = document.querySelectorAll('.item-text');
    },
    capitalizeFirstLetter(string) {
      return string
        .split('_')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
    }
  },
  async mounted() {
    await this.fetchData();
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.fetchData();
    });
  }
};
</script>


<style scoped>
h1 {
  margin: 0px;
  margin-top: 50px;
  padding: 13px 60px;
}

h2 {
  margin: 0px;
  padding: 20px 60px 20px 0px;
}

p {
  margin: 0.5rem;
}

.collection {
  margin: 0 60px 20px 60px;
}

.item {
  display: flex;
  align-items: stretch;
  margin: 0 0px 10px 0px;
  flex-wrap: nowrap;
  padding: 0px;
  border-radius: 0px;
}

.item-text {
  flex: 1;
  margin-left: 10px;
  overflow: hidden;
  flex-direction: column;
  justify-content: center;
}

.text-group {
  flex-direction: column;
  justify-content: center;
  height: 100%;
  width: 100%;
  box-sizing: border-box;
}

.item-image {
  width: auto;
  height: auto;
  max-height: 180px;
  object-fit: contain;
  box-sizing: border-box;
}

.sortId {
  font-size: 0.8em;
  color: grey;
}

.description {
  font-size: 0.8em;
  color: grey;
}

@media (max-width: 600px) {
  .content {
    padding: 10px;
  }

  h1 {
    padding: 10px;
    font-size: 1.5em;
  }

  h2 {
    padding: 10px 0;
    font-size: 1.2em;
  }

  .collection {
    margin: 0 10px 20px 10px;
  }

  .item {
    flex-direction: column;
    align-items: center;
  }

  .item-text {
    margin-left: 0;
    margin-top: 10px;
    text-align: center;
  }

  .item-image {
    max-width: 100%;
    max-height: 150px;
  }
}
</style>