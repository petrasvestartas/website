<template>
  <div>
    <base-card>
      <div class="content">
        <h1>Teaching</h1>
        <div v-for="(items, collectionName) in collections" :key="collectionName" class="collection">
          <h2>{{ collectionName }}</h2>
          <div v-for="item in items" :key="item.id" class="item">
            <img :src="item.imageUrl" alt="Image" class="item-image">
            <div class="item-text">
              <div class="text-group">
                <p><strong>{{ item.title }}</strong></p>
                <p>{{ item.author }}</p>
                <p class="place">{{ item.place }}</p>
                <p class="date">{{ item.date }}</p>
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
  name: 'Teaching',
  data() {
    return {
      collections: {},
      texts: null
    };
  },
  methods: {
    async fetchData() {
      const firebaseConfig = {
        apiKey: "AIzaSyCKJpZd18abqXv4yj-mf_paxtSVYsUeI1Q",
        authDomain: "teaching-9516f.firebaseapp.com",
        projectId: "teaching-9516f",
        storageBucket: "teaching-9516f.firebasestorage.app",
        messagingSenderId: "851561079946",
        appId: "1:851561079946:web:2b956d918f5f0af6b37973",
        measurementId: "G-KJN2W4QHNF"
      };

      let firebaseApp;
      if (!getApps().some(app => app.name === 'TeachingApp')) {
        firebaseApp = initializeApp(firebaseConfig, 'TeachingApp');
      } else {
        firebaseApp = getApp('TeachingApp');
      }

      const db = getFirestore(firebaseApp);

      const collectionNames = ['Workshops', 'Courses'];

      for (const collectionName of collectionNames) {
        const colRef = collection(db, collectionName);
        const snapshot = await getDocs(colRef);
        const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        // console.log(`Before sorting - Collection: ${collectionName}`, items);
        items.sort((a, b) => {
          const getEarliestYear = (date) => {
            const years = date.split(',').map(year => parseInt(year.trim(), 10));
            return Math.min(...years);
          };
          const dateA = getEarliestYear(a.date);
          const dateB = getEarliestYear(b.date);
          // console.log(`Sorting by date - Item A: ${a.date} (${dateA}), Item B: ${b.date} (${dateB})`);
          return dateB - dateA;
        });
        // console.log(`After sorting - Collection: ${collectionName}`, items);
        this.collections[collectionName] = items;
      }

      this.texts = document.querySelectorAll('.item-text');
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
  margin: 0px;
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

.date {
  font-size: 0.8em;
  color: grey;
}

.place {
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