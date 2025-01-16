<template>
  <li>
    <a href="#" @click="handleClick" class="image-container">
      <img :src="imageUrl" alt="Project Image" :class="{'project-image': true, 'grey-out': isGrey}" />
    </a>
    <h3>{{ projectTitle }}</h3>
    <div>
      <base-badge v-for="type in types" :key="type" :type="type" :title="type"></base-badge>
    </div>
  </li>
</template>

<script>
export default {
  props: ['id', 'title', 'types', 'imageUrl'],
  data() {
    return {
      isGrey: false
    };
  },
  computed: {
    projectTitle() {
      return this.title;
    },
    projectDetailsLink() {
      return `/projects/${this.id}`;
    }
  },
  methods: {
    handleClick(event) {
      event.preventDefault();
      this.isGrey = true;
      setTimeout(() => {
        this.$router.push(this.projectDetailsLink);
      }, 200); // Delay in milliseconds
    }
  }
};
</script>

<style scoped>
li {
  margin: 0rem 0;
  padding: 1.0rem;
  padding-top: 1rem;
  padding-bottom: 0.0rem;
}

.image-container {
  position: relative;
  display: inline-block;
}

.project-image {
  width: 100%;
  height: auto;
  display: block;
  transition: transform 0.3s, border-color 0.3s, box-shadow 0.3s, filter 0.2s;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.project-image:hover {
  transform: scale(1.05);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.75);
}

.grey-out {
  filter: grayscale(100%) brightness(33%);
}

h3 {
  font-size: 1.0rem;
}

h3,
h4 {
  margin: 0.5rem 0;
}

div {
  margin: 0.5rem 0;
}

.actions {
  display: flex;
  justify-content: flex-end;
}
</style>