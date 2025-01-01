<template>
  <div>
    <section v-if="selectedProject" class="carousel-section">
      <div class="carousel-wrapper">
        <!-- <image-carousel :figureUrls="figureUrls"></image-carousel> -->
        <swiper-carousel :figureUrls="figureUrls"></swiper-carousel>
      </div>
    </section>

    <section>
      <base-card class="grey-card">
        <div>
          <h2>{{ title }}</h2>
          <div class="badges-container">
            <base-badge v-for="type in types" :key="type" :type="type" :title="type"></base-badge>
          </div>
        </div>
        <p><strong>Authors:</strong> {{ authors }}</p>
        <p><strong>Date:</strong> {{ date }}</p>
        <p><strong>Location:</strong> {{ location }}</p>

        <component
          v-for="(item, index) in parsedDescription"
          :key="index"
          :is="getComponentType(item.type)"
          :title="title"
          :text="item.text"
          :type="item.type"
        ></component>
        <p v-if="parsedDescription.length === 0">No description available</p>

        <div v-if="filteredUrls.length > 0">
          <p><strong>Links:</strong></p>
          <div v-for="url in filteredUrls" :key="url" class="url-section">
            <base-button :to="url" mode="outline" :link="true">{{ url }}</base-button>
          </div>
        </div>

        <div v-if="publications && publications.filter(pub => pub.title.trim() !== '' && pub.url.trim() !== '').length > 0">
          <p><strong>Publications:</strong></p>
          <div v-for="publication in publications" :key="publication.url" class="publication-link">
            <base-button :to="publication.url" mode="outline" :link="true">{{ publication.title }}</base-button>
          </div>
        </div>
      </base-card>
    </section>

    <!-- <section v-if="selectedProject" class="three-container"> -->
      <!--  <Viewer :modelUrl="modelUrl"></Viewer> Pass the model URL here  "selectedProject.modelUrl" -->
    <!-- </section> -->
  </div>
</template>


<script>
import ImageCarousel from './ImageCarousel.vue';
import SwiperCarousel from './SwiperCarousel.vue';
import ParagraphComponent from './ParagraphComponent.vue';
import ParagraphAuthors from './ParagraphAuthors.vue';
import ParagraphOnline from './ParagraphOnline.vue';
// import Viewer from './Viewer.vue';

export default {
  components: {
    ImageCarousel,
    SwiperCarousel,
    ParagraphComponent,
    ParagraphAuthors,
    ParagraphOnline,
    // Viewer
  },
  props: ['id', 'text'],
  data() {
    return {
      selectedProject: null,
      figureUrls: [],
      isLoading: false,
      error: null,
      // modelUrl: 'https://raw.githubusercontent.com/petrasvestartas/storage/refs/heads/main/images/stanford-bunny.obj'
    };
  },
  computed: {
    title() {
      return this.selectedProject ? this.selectedProject.title : '';
    },
    types() {
      return this.selectedProject ? this.selectedProject.types : [];
    },
    description() {
      return this.selectedProject ? this.selectedProject.description : '';
    },
    authors() {
      return this.selectedProject ? this.selectedProject.authors : '';
    },
    date() {
      return this.selectedProject ? this.selectedProject.date : '';
    },
    location() {
      return this.selectedProject ? this.selectedProject.location : '';
    },
    urls() {
      return this.selectedProject ? this.selectedProject.urls : [];
    },
    filteredUrls() {
      return this.urls.filter(url => url.trim() !== '');
    },
    imageUrl() {
      return this.selectedProject ? this.selectedProject.imageUrl : '';
    },
    userId() {
      return this.selectedProject ? this.selectedProject.userId : '';
    },
    publications() {
      return this.selectedProject ? this.selectedProject.publications : [];
    },
    parsedDescription() {
      try {
        if (this.isLoading) {
          console.log('Data is still loading');
          return [];
        }
        if (!this.selectedProject || !this.selectedProject.descriptions) {
          console.warn('Descriptions are empty');
          return [];
        }
        console.log('Successfully parsed descriptions');
        // console.log('Descriptions:', this.selectedProject.descriptions);

        return this.selectedProject.descriptions.map(desc => ({
          type: desc.title,
          text: desc.text
        }));
      } catch (e) {
        console.error('Failed to parse descriptions:', e);
        return [];
      }
    }
  },
  watch: {
    selectedProject(newProject) {
      if (newProject) {
        this.figureUrls = Object.values(newProject.figureUrls);
      } else {
        this.figureUrls = [];
      }
    }
  },
  created() {
    console.log('Component created, fetching project data...');
    this.fetchProjectData();
  },
  methods: {
    async fetchProjectData() {
      this.isLoading = true;
      try {
        await this.$store.dispatch('projects/loadProjects', { forceRefresh: true });
        const projects = this.$store.state.projects.projects;
        this.selectedProject = projects.find(project => project.id === this.id);
        // console.log('Selected Project:', this.selectedProject);
        if (this.selectedProject) {
          this.figureUrls = Object.values(this.selectedProject.figureUrls);
        }
      } catch (error) {
        this.error = error.message || 'Failed to fetch project details.';
      } finally {
        this.isLoading = false;
      }
    },
    getComponentType(type) {
      const types = {
        Authors: 'ParagraphAuthors',
        Online: 'ParagraphOnline',
        default: 'ParagraphComponent' // Default component type
      };
      console.log('Component type for', type, ':', types[type] || types['default']);
      return types[type] || types['default'];
    },
  },
};
</script>

<style scoped>
/* Reset global styles */

.grey-card {
  padding-left: 10rem !important; /* Adjust the padding value as needed */
  padding-right: 10rem !important; /* Adjust the padding value as needed */
  padding-bottom: 1.5rem !important; /* Adjust the padding value as needed */
  padding-top: 0rem !important; /* Adjust the padding value as needed */
}
.description {
  white-space: pre-line; /* Preserve new lines */
}

/* Adjust padding for narrower screens */
@media (max-width: 1000px) {
  .grey-card {
    padding-left: 5rem !important; /* Adjust the padding value as needed */
    padding-right: 5rem !important; /* Adjust the padding value as needed */
  }
}

.carousel-wrapper {
  padding: 0;
  margin: 0;
  box-sizing: border-box; /* Include padding and border in element's total width and height */
  transition: width 0.3s;
}

.description-title {
  font-size: 1rem; /* Adjust font size as needed */
  line-height: 1.5; /* Adjust line height as needed */
  color: #333; /* Adjust text color as needed */
}

.description-text {
  font-size: 1rem; /* Adjust font size as needed */
  line-height: 1.5; /* Adjust line height as needed */
  color: #333; /* Adjust text color as needed */
}
.url-section {
  margin-bottom: 0.0rem; /* Adjust the margin as needed */
}

.three-container {
  width: 100%;
  height: 500px; /* Adjust the height as needed */
  position: relative;
}
</style>