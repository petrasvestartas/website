<template>
  <div>
    <base-card>
      <div class="content">
        <h1>Papers</h1>
        <div v-for="(items, collectionName) in collections" :key="collectionName" class="collection">
          <h2>{{ capitalizeFirstLetter(collectionName) }}</h2>
          <div v-for="item in items" :key="item.id">
            <div class="item">
              <img :src="item.imageUrl" alt="Image" class="item-image">
              <div class="item-text">
                <div class="text-group">
                  <base-button :to="item.url" mode="outline" :link="true">{{ item.title }}</base-button>
                  <p class="description">{{ item.author }}</p>
                  <p class="description">{{ item.publisher }}</p>
                  <p class="description">{{ item.date }}</p>
                  <p v-if="collectionName === 'conference_papers' || collectionName === 'thesis'" class="description">{{ item.location }}</p>
                </div>
              </div>
            </div>
            <div class="latex-citation-container">
              <div class="copy-button-container">
                <base-button @click="copyToClipboard(formatLatex(item, collectionName))">copy to clipboard</base-button>
              </div>
              <pre class="latex-citation">{{ formatLatex(item, collectionName) }}</pre>
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
  name: 'Papers',
  data() {
    return {
      collections: {},
      texts: null
    };
  },
  methods: {
    async fetchData() {
      const firebaseConfig = {
        apiKey: "AIzaSyCmWYJtlu90dcxitsKvsFo9wBjOttZ3k",
        authDomain: "papers-85180.firebaseapp.com",
        projectId: "papers-85180",
        storageBucket: "papers-85180.firebasestorage.app",
        messagingSenderId: "445305159930",
        appId: "1:445305159930:web:11379df8f7b445e5870943",
        measurementId: "G-4TLEV9RTRL"
      };

      let firebaseApp;
      if (!getApps().some(app => app.name === 'PapersApp')) {
        firebaseApp = initializeApp(firebaseConfig, 'PapersApp');
      } else {
        firebaseApp = getApp('PapersApp');
      }

      const db = getFirestore(firebaseApp);

      const collectionNames = ['conference_papers', 'journal_papers', 'thesis'];

      for (const collectionName of collectionNames) {
        const colRef = collection(db, collectionName);
        const snapshot = await getDocs(colRef);
        const items = snapshot.docs.map(doc => {
          const data = { id: doc.id, ...doc.data() };
          return data;
        });
        items.sort((a, b) => new Date(b.date) - new Date(a.date));
        this.collections[collectionName] = items;
      }

      this.texts = document.querySelectorAll('.item-text');
    },
    capitalizeFirstLetter(string) {
      return string
        .split('_')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
    },
    formatLatex(item, collectionName) {
      const authorParts = item.author.split(', ');
      const formattedAuthors = authorParts.map(author => {
        const nameParts = author.trim().split(' ');
        const lastName = nameParts.pop();
        const firstName = nameParts.join(' ');
        return `${lastName}, ${firstName}`;
      }).join(' and ');

      const year = new Date(item.date).getFullYear();
      const citationTitle = `${formattedAuthors.split(',')[0]}${year}`;

      if (collectionName === 'conference_papers') {
        return `@inproceedings{${citationTitle},
  author = "${formattedAuthors}",
  title = "${item.title}",
  booktitle = "${item.publisher}",
  year = "${year}",
  location = "${item.location}"
}`;
      } else if (collectionName === 'journal_papers') {
        return `@article{${citationTitle},
  author = "${formattedAuthors}",
  title = "${item.title}",
  journal = "${item.publisher}",
  year = "${year}"
}`;
      } else if (collectionName === 'thesis') {
        return `@phdthesis{${citationTitle},
  author = "${formattedAuthors}",
  title = "${item.title}",
  school = "${item.publisher}",
  year = "${year}",
  location = "${item.location}"
}`;
      }
    },
    copyToClipboard(text) {
      navigator.clipboard.writeText(text)
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
  flex-direction: row;
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

.latex-citation-container {
  margin-top: 10px;
}

.latex-citation {
  background-color: #e8e8e8;
  padding: 10px;
  margin-top: -25px;
  font-family: monospace;
  font-size: small;
  max-height: 1000px; /* Set a maximum height */
  overflow: hidden; /* Hide overflow content */
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

.copy-button-container {
  display: flex;
  justify-content: flex-end;
  margin-top: 0px;
}
</style>