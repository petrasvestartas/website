<template>
  <div>
    <base-card>
      <div class="content">
        <h1>Code</h1>

        <section class="intro">
          <p class="summary">{{ profile.summary }}</p>
          <div class="tags">
            <span v-for="language in profile.languages" :key="language" class="tag tag-strong">{{ language }}</span>
            <span v-for="tool in profile.stack" :key="tool" class="tag">{{ tool }}</span>
          </div>
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
                  <h3>{{ project.title }}</h3>
                  <span v-if="project.stars" class="stars">★ {{ project.stars }}</span>
                </div>
                <p class="subtitle">{{ project.subtitle }}</p>
                <p class="description">{{ project.description }}</p>
                <div class="tags">
                  <span v-for="language in project.languages" :key="language" class="tag">{{ language }}</span>
                </div>
                <div class="links">
                  <base-button v-for="link in project.links" :key="link.url" :to="link.url" :link="true">{{ link.label }}</base-button>
                </div>
              </div>
            </article>
          </div>
        </section>

        <section class="collection">
          <h2>Open-Source Contributions</h2>
          <div v-for="group in contributions" :key="group.organisation" class="organisation">
            <div class="organisation-header">
              <base-button :to="group.url" mode="outline" :link="true">{{ group.organisation }}</base-button>
              <span class="description">{{ group.description }}</span>
            </div>
            <ul class="repo-list">
              <li v-for="repo in group.repositories" :key="repo.name">
                <a :href="repo.url" target="_blank" rel="noopener noreferrer" class="repo">
                  <span class="repo-name">{{ repo.name }}</span>
                  <span class="repo-description">{{ repo.description }}</span>
                  <span class="repo-meta">
                    <span class="repo-languages">{{ repo.languages.join(' · ') }}</span>
                    <span v-if="repo.commits" class="commits">{{ repo.commits }} commits</span>
                    <span class="stars">★ {{ repo.stars }}</span>
                  </span>
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
              <span class="repo-name">{{ plugin.title }}</span>
              <span class="repo-description">{{ plugin.description }}</span>
              <span class="repo-languages">{{ plugin.languages.join(' · ') }}</span>
            </a>
          </div>
        </section>

        <section class="collection">
          <h2>Libraries</h2>
          <ul class="repo-list">
            <li v-for="repo in libraries" :key="repo.name">
              <a :href="repo.url" target="_blank" rel="noopener noreferrer" class="repo">
                <span class="repo-name">{{ repo.name }}</span>
                <span class="repo-description">{{ repo.description }}</span>
                <span class="repo-meta">
                  <span class="repo-languages">{{ repo.languages.join(' · ') }}</span>
                  <span class="stars">★ {{ repo.stars }}</span>
                </span>
              </a>
            </li>
          </ul>
        </section>
      </div>
    </base-card>
  </div>
</template>

<script>
import { profile, featured, contributions, plugins, libraries } from './codeData.js';

export default {
  name: 'Code',
  data() {
    return {
      profile,
      featured,
      contributions,
      plugins,
      libraries
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

.summary {
  font-size: 1.1em;
  line-height: 1.5;
}

.collection {
  margin: 0 60px 20px 60px;
}

.description,
.subtitle,
.repo-description,
.repo-languages,
.commits,
.stars {
  font-size: 0.8em;
  color: grey;
}

.description {
  line-height: 1.5;
}

.subtitle {
  margin-top: 0.2rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin: 0.7rem 0;
}

.tag {
  font-size: 0.75em;
  padding: 0.15rem 0.5rem;
  background-color: #efefef;
  color: #000000;
}

.tag-strong {
  background-color: #000000;
  color: #ffffff;
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
  border-top: 2px solid #000000;
  padding-top: 15px;
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

.title-row {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 10px;
}

/* Contributions and libraries */
.organisation {
  margin-bottom: 25px;
}

.organisation-header {
  display: flex;
  align-items: baseline;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 5px;
}

.repo-list {
  list-style: none;
  margin: 0;
  padding: 0;
}

.repo {
  display: grid;
  grid-template-columns: minmax(180px, 280px) 1fr auto;
  gap: 15px;
  align-items: baseline;
  padding: 8px 10px;
  border-bottom: 1px solid #e8e8e8;
  color: #000000;
  text-decoration: none;
}

.repo:hover {
  background-color: #000000;
  color: #ffffff;
}

.repo:hover .repo-description,
.repo:hover .repo-languages,
.repo:hover .commits,
.repo:hover .stars {
  color: #c4c4c4;
}

.repo-name {
  font-weight: 700;
  word-break: break-word;
}

.repo-meta {
  display: flex;
  gap: 15px;
  white-space: nowrap;
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
}

.plugin img {
  height: 140px;
  width: 100%;
  object-fit: contain;
  margin-bottom: 6px;
}

.plugin:hover {
  background-color: #000000;
  color: #ffffff;
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

  .repo-meta {
    white-space: normal;
    flex-wrap: wrap;
  }

  .plugin-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
