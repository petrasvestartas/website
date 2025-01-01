<template>
  <span class="badge" :class="type">
      {{ text }}
  </span>
</template>

<script>
export default {
  name: 'BaseBadge',
  props: ['type', 'title'],
  computed: {
      text(){
          return this.title.toUpperCase();
      }
  }
}
</script>

<style scoped>
.badge {
background-color: #ffffff;
color: #000000;
padding: 0.2rem 0.5rem;
display: inline-block;
margin-right: 0.5rem;
font-size: 0.66rem; /* Change text size here */
}

.architecture {
background-color: #e6e6e6;
color: rgb(0, 0, 0);
}

.prototypes {
background-color: #e6e6e6;
color: rgb(0, 0, 0);
}

.research {
background-color: #e6e6e6;
color: rgb(0, 0, 0);
}

.teaching {
background-color: #e6e6e6;
color: rgb(0, 0, 0);
}

.tools {
background-color: #e6e6e6;
color: rgb(0, 0, 0);
}
</style>