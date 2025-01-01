<template>
  <div>
    <h2 class="title">{{ type }}</h2>
    <p class="justified-text">{{ text }}</p>
  </div>
</template>

<script>
export default {
  props: ['type', 'text']
};
</script>



<style scoped>
.justified-text {
  text-align: justify;
  margin-left: 0.5rem;
  margin-right: 0.5rem;
  font-size: 1.00rem;
}

.title {
  font-size: 1.00em;
  margin-bottom: 10px;

}
</style>