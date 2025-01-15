<template>

  <div>
          <div class="about-section">
      <h1>About Petras</h1>
      <div>Petras Vestartas is a post-doctoral researcher at Block Research Group from 2023. He holds BA and MA degrees in architecture from VAA (Lithuania). His PhD was completed at the Laboratory for Timber Constructions IBOIS, EPFL (Switzerland), where his research focused on digital timber fabrication, scanning methods, robotic tool-path planning (ABB), development of advanced timber structures and project-based applications. He has developed various software applications, including compas_wood (joinery generation), NGon (polygonal mesh processing), OpenNest (2D nesting), Raccoon (CNC fabrication), and Coockroach (pointcloud processing).</div>
  
      <div>Petras has extensive experience teaching master's and bachelor's students and conducting academic and commercial workshops. He has also supervised Master's thesis projects in architecture and provided guidance to PhD students during his postdoctoral studies. Notably, he designed a new course called "Introduction to Computational Architecture" (EPFL AR-327) for architects. In addition, Petras has contributed to the setup of CNC and industrial robots for IBOIS researchers. He has also worked as a researcher at CITA, KADK (Denmark) and gained further experience in international architecture offices such as Do-Architects (Lithuania), CEBRA (Denmark), and DMAA (Austria). His work with interdisciplinary teams, including architects, structural engineers, and computer scientists, has enriched his knowledge and skills in the field.</div>
    </div>
    <base-card>
      <div class="content">
        <h1>Curriculum Vitae</h1>
        <div v-for="(items, collectionName) in collections" :key="collectionName" class="collection">
          <h2>{{ capitalizeFirstLetter(collectionName) }}</h2>
          <div v-for="item in items" :key="item.id">
            <div class="item">
              <img :src="item.imageUrl" alt="Image" class="item-image">
              <div class="item-text">
                <div class="text-group">
                  <base-button :to="item.url" mode="outline" :link="true">{{ item.position }}</base-button>
                  <p class="noSpace" v-if="collectionName === 'professional_experience' && item.recommendationLetterUrl">
                    <base-button :to="item.recommendationLetterUrl" mode="outline" :link="true">Recommendation Letter</base-button>
                  </p>
                  <p class="description">{{ item.place }}</p>
                  <p class="description">{{ item.location }}</p>
                  <p class="description">{{ item.date }}</p>
                  <p class="description">{{ item.task }}</p>
                </div>
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
  name: 'CurriculumVitae',
  data() {
    return {
      collections: {},
      texts: null
    };
  },
  methods: {
    async fetchData() {
      const firebaseConfig = {
        apiKey: "AIzaSyDRDmNxtEY4jC4OGB_l0xl2cD9UqzpjWy4",
        authDomain: "curriculum-vitae-ccb92.firebaseapp.com",
        projectId: "curriculum-vitae-ccb92",
        storageBucket: "curriculum-vitae-ccb92.firebasestorage.app",
        messagingSenderId: "1038780576431",
        appId: "1:1038780576431:web:d995bf0e912f1ce7115a5a",
        measurementId: "G-NSCWEFXCVC"
      };

      let firebaseApp;
      if (!getApps().some(app => app.name === 'CurriculumVitaeApp')) {
        firebaseApp = initializeApp(firebaseConfig, 'CurriculumVitaeApp');
      } else {
        firebaseApp = getApp('CurriculumVitaeApp');
      }

      const db = getFirestore(firebaseApp);

      const collectionNames = ['professional_experience', 'education'];

      for (const collectionName of collectionNames) {
        const colRef = collection(db, collectionName);
        const snapshot = await getDocs(colRef);
        const items = snapshot.docs.map(doc => {
          const data = { id: doc.id, ...doc.data() };
          return data;
        });
        items.sort((a, b) => {
          const aDate = parseInt(a.date.split(' ')[0], 10);
          const bDate = parseInt(b.date.split(' ')[0], 10);
          return bDate - aDate;
        });
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

.noSpace {
  margin: 0;
  font-size: small;
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
  .about-section {
  padding: 2rem;
  font-family: Arial, sans-serif;
  line-height: 1.6;
  color: #333;
  font-size: 0.9rem; /* Smaller font size */
  text-align: justify; /* Align text vertically on both sides */
  max-width: 66.66%; /* Offset by a third of the page */
  margin: 0 auto; /* Center the section */
}

/* Media query for mobile devices */
@media (max-width: 768px) {
  .about-section {
    padding-left: 0.5rem; /* Minimal padding on the left */
    padding-right: 0.5rem; /* Minimal padding on the right */
  }
}

.about-section h1 {
  font-size: 1.5rem;
  text-align: center;
  margin-bottom: 1.5rem;
}

.about-section div {
  margin-bottom: 1.5rem;
}

.about-section p {
  margin: 0;
}
}

.about-section {
  padding: 2rem;
  font-family: Arial, sans-serif;
  line-height: 1.33;
  color: #333;
  font-size: 0.9rem; /* Smaller font size */
  text-align: justify; /* Align text vertically on both sides */
  max-width: 66.66%; /* Offset by a third of the page */
  margin: 0 auto; /* Center the section */
}

/* Media query for mobile devices */
@media (max-width: 768px) {
  .about-section {
    padding-left: 0.0rem; /* Minimal padding on the left */
    padding-right: 0.0rem; /* Minimal padding on the right */
    max-width: 90.00%; /* Offset by a third of the page */
    line-height: 1.33; /* Default line height */
  }
}

.about-section h1 {
  font-size: 1.5rem;
  text-align: center;
  margin-bottom: 1.5rem;
}

.about-section div {
  margin-bottom: 1.5rem;
}

.about-section p {
  margin: 0;
}
</style>
<!-- <template>
    <div class="about-section">
      <h1>About Me</h1>
      <div>Petras Vestartas joined the Block Research Group as post-doctoral researcher in 2023. He holds BA and MA degrees in architecture from VAA (Lithuania). His PhD was completed at the Laboratory for Timber Constructions IBOIS, EPFL (Switzerland), where his research focused on digital timber fabrication, scanning methods, robotic tool-path planning (ABB), development of advanced timber structures and project-based applications. He has developed various software applications, including compas_wood (joinery generation), NGon (polygonal mesh processing), OpenNest (2D nesting), Raccoon (CNC fabrication), and Coockroach (pointcloud processing).</div>
  
      <div>Petras has extensive experience teaching master's and bachelor's students and conducting academic and commercial workshops. He has also supervised Master's thesis projects in architecture and provided guidance to PhD students during his postdoctoral studies. Notably, he designed a new course called "Introduction to Computational Architecture" (EPFL AR-327) for architects. In addition, Petras has contributed to the setup of CNC and industrial robots for IBOIS researchers. He has also worked as a researcher at CITA, KADK (Denmark) and gained further experience in international architecture offices such as Do-Architects (Lithuania), CEBRA (Denmark), and DMAA (Austria). His work with interdisciplinary teams, including architects, structural engineers, and computer scientists, has enriched his knowledge and skills in the field.</div>
    </div>
  </template>

<style scoped>
.about-section {
  padding: 2rem;
  font-family: Arial, sans-serif;
  line-height: 1.6;
  color: #333;
  font-size: 0.9rem; /* Smaller font size */
  text-align: justify; /* Align text vertically on both sides */
  max-width: 66.66%; /* Offset by a third of the page */
  margin: 0 auto; /* Center the section */
}

.about-section h1 {
  font-size: 1.5rem;
  text-align: center;
  margin-bottom: 1.5rem;
}

.about-section div {
  margin-bottom: 1.5rem;
}

.about-section p {
  margin: 0;
}
</style> -->