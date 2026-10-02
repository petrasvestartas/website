<template>
  <div>
    <base-card>
      <div class="content">
        <h1>Code</h1>

        <section class="intro">
          <div class="links">
            <base-button :to="profile.github" :link="true">GitHub</base-button>
            <base-button :to="profile.sponsor" :link="true">Sponsor</base-button>
          </div>
        </section>

        <section class="collection">
          <h2>Own Projects</h2>
          <div class="featured-grid">
            <article v-for="project in featured" :key="project.title" class="featured">
              <div class="featured-image">
                <img v-if="project.imageUrl" :src="project.imageUrl" :alt="project.title">
                <span v-else class="placeholder">{{ project.title }}</span>
              </div>
              <div class="featured-text">
                <div class="title-row">
                  <h3>{{ project.title }} <language-icons :languages="project.languages" /></h3>
                  <span v-if="project.stars" class="stars">★ {{ project.stars }}</span>
                </div>
                <p class="description">{{ project.description }}</p>
                <div class="text-links">
                  <a v-for="link in project.links" :key="link.url" :href="link.url" target="_blank" rel="noopener noreferrer">{{ link.label }}</a>
                </div>
              </div>
            </article>
          </div>
        </section>

        <section class="collection">
          <h2>Open-Source Contributions</h2>
          <div v-for="group in contributions" :key="group.organisation" class="organisation">
            <h3 class="organisation-header">
              <a :href="group.url" target="_blank" rel="noopener noreferrer">{{ group.organisation }}</a>
            </h3>
            <ul class="repo-list">
              <li v-for="repo in group.repositories" :key="repo.name">
                <a :href="repo.url" target="_blank" rel="noopener noreferrer" class="repo">
                  <span class="repo-name">{{ repo.name }} <language-icons :languages="repo.languages" /></span>
                  <span class="repo-description">{{ repo.description }}</span>
                </a>
              </li>
            </ul>
          </div>
        </section>

        <section class="collection">
          <h2>Rhino Plugins</h2>
          <div class="plugin-grid">
            <a v-for="plugin in plugins" :key="plugin.title" :href="plugin.url" target="_blank" rel="noopener noreferrer" class="plugin">
              <img :src="plugin.imageUrl" :alt="plugin.title">
              <span class="repo-name">{{ plugin.title }} <language-icons :languages="plugin.languages" /></span>
              <span class="repo-description">{{ plugin.description }}</span>
            </a>
          </div>
        </section>
      </div>
    </base-card>
  </div>
</template>

<script>
import { profile, featured, contributions, plugins } from './codeData.js';
import LanguageIcons from './LanguageIcons.vue';

export default {
  name: 'Code',
  components: {
    LanguageIcons
  },
  data() {
    return {
      profile,
      featured,
      contributions,
      plugins
    };
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
  padding: 30px 60px 20px 0px;
}

h3 {
  margin: 0;
  font-size: 1.2em;
}

p {
  margin: 0.5rem 0;
}

.intro {
  margin: 0 60px 10px 60px;
  max-width: 900px;
}


.collection {
  margin: 0 60px 20px 60px;
}

.description,
.repo-description,
.stars {
  font-size: 0.8em;
  color: grey;
}

.description {
  line-height: 1.5;
}

.links {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: 0.5rem;
}

/* Own projects */
.featured-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(420px, 1fr));
  gap: 30px;
}

.featured {
  display: flex;
  flex-direction: column;
}

.featured-image {
  height: 220px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #ffffff;
  margin-bottom: 15px;
}

.featured-image img {
  max-width: 90%;
  max-height: 190px;
  object-fit: contain;
}

.placeholder {
  font-family: monospace;
  font-size: 2.5em;
  color: #c4c4c4;
}

.text-links {
  display: flex;
  flex-wrap: wrap;
  gap: 4px 16px;
  font-size: 0.85em;
}

.text-links a {
  color: #000000;
  text-decoration: underline;
  text-underline-offset: 3px;
}

.text-links a:hover {
  color: grey;
}

.title-row {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 10px;
}

/* Contributions */
.organisation {
  margin-bottom: 25px;
}

.organisation-header {
  font-size: 1em;
  margin: 0 0 5px 0;
}

.organisation-header a {
  color: #000000;
  text-decoration: none;
}

.repo-list {
  list-style: none;
  margin: 0;
  padding: 0;
}

.repo {
  display: grid;
  grid-template-columns: minmax(180px, 340px) 1fr;
  gap: 15px;
  align-items: baseline;
  padding: 8px 10px;
  border-bottom: 1px solid #f0f0f0;
  color: #000000;
  text-decoration: none;
}

.repo:hover {
  background-color: #f5f5f5;
}

.language-icons {
  margin-left: 8px;
  vertical-align: -2px;
}

.repo-name {
  font-weight: 700;
  word-break: break-word;
}


/* Rhino plugins */
.plugin-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 20px;
}

.plugin {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 10px;
  color: #000000;
  text-decoration: none;
  transition: box-shadow 0.3s, transform 0.3s;
}

.plugin img {
  height: 140px;
  width: 100%;
  object-fit: contain;
  margin-bottom: 6px;
}

.plugin:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.35);
  transform: translateY(-2px);
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
    padding: 20px 0 10px 0;
    font-size: 1.2em;
  }

  .intro,
  .collection {
    margin: 0 10px 20px 10px;
  }

  .featured-grid {
    grid-template-columns: 1fr;
  }

  .repo {
    grid-template-columns: 1fr;
    gap: 4px;
  }


  .plugin-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
