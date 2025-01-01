<template>
  <div>
    <h2 class="title">{{ type }}</h2>
    <p class="authors">{{ authors.join(', ') }}</p>
  </div>
</template>

<script>
export default {
  props: ['type', 'text'],
  computed: {
    authors() {
      return this.text.split(',').map(author => author.trim());
    }
  }
};
</script>

<style scoped>
.title {
  font-size: 1.25em;
  margin-bottom: 10px;
}

.authors {
  font-weight: bold;
  margin-left: 0.5rem;
  margin-right: 0.5rem;
}
</style>