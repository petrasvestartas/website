<template>
  <div>
    <base-dialog :show="!!error" title="An error occurred" @close="handleError">
      <p>{{ error }}</p>
    </base-dialog>

    <section>
      <base-card>
        <div class="controls">
          <base-button v-if="isLoggedIn" link to="/register">Register Project</base-button>
        </div>

        <div v-if="isLoading">
          <base-spinner></base-spinner>
        </div>

        <ul v-else-if="hasProjects" class="projects-grid">
          <project-item
            v-for="project in filteredProjects"
            :key="project.id"
            :id="project.id"
            :title="project.title"
            :types="project.types"
            :image-url="project.imageUrl"
          ></project-item>
        </ul>
        <h3 v-else>No projects found.</h3>
      </base-card>
    </section>
    <section>
      <project-filter @change-filter="setFilters"></project-filter>
    </section>
  </div>
</template>

<script>
import ProjectItem from '../../components/layout/project/ProjectItem.vue';
import ProjectFilter from '../../components/layout/project/ProjectFilter.vue';

export default {
  components: {
    ProjectItem,
    ProjectFilter
  },
  data() {
    return {
      isLoading: false,
      error: null,
      activeFilters: {
        architecture: true,
        prototypes: true,
        research: true,
        teaching: true,
        tools: true
      }
    };
  },
  computed: {
    isLoggedIn() {
      return this.$store.getters.isAuthenticated;
    },
    isProject() {
      return this.$store.getters['projects/isProject'];
    },
    filteredProjects() {
      const projects = this.$store.getters['projects/projects'];
      return projects.filter(project => {
        if (this.activeFilters.architecture && project.types.includes('architecture')) {
          return true;
        }
        if (this.activeFilters.prototypes && project.types.includes('prototypes')) {
          return true;
        }
        if (this.activeFilters.research && project.types.includes('research')) {
          return true;
        }
        if (this.activeFilters.teaching && project.types.includes('teaching')) {
          return true;
        }
        if (this.activeFilters.tools && project.types.includes('tools')) {
          return true;
        }
        return false;
      });
    },
    hasProjects() {
      return this.$store.getters['projects/hasProjects'];
    }
  },
  created() {
    this.loadProjects();
  },
  methods: {
    setFilters(updatedFilters) {
      this.activeFilters = updatedFilters;
    },
    async loadProjects(refresh = false) {
      this.isLoading = true;
      try {
        await this.$store.dispatch('projects/loadProjects', { forceRefresh: refresh });
      } catch (error) {
        this.error = error.message || 'Failed to fetch projects.';
      }
      this.isLoading = false;
    },
    handleError() {
      this.error = null;
    }
  }
};
</script>

<style scoped>
.projects-grid {
  margin-top: 3rem;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0px;
  width: 100%;
}

.controls {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0rem;
}

ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

@media (max-width: 600px) {
  .projects-grid {
    display: flex;
    flex-direction: column;
    gap: 5px;
  }

  .controls {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>