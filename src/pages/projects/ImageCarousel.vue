<template>
  <div class="carousel-container" v-if="figureUrls.length">
    <Carousel ref="carousel" :items-to-show="1" :mouse-drag="false" :touch-drag="false" :wrap-around="true">
      <Slide v-for="(url, index) in figureUrls" :key="index">
        <div class="image-wrapper">
          <img :src="url" :alt="'Figure ' + (index + 1)" class="carousel-image" />
        </div>
      </Slide>
    </Carousel>
    <button @click="prev" class="carousel-nav left">
      <svg viewBox="0 0 24 24" class="arrow-icon">
        <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
      </svg>
    </button>
    <button @click="next" class="carousel-nav right">
      <svg viewBox="0 0 24 24" class="arrow-icon">
        <path d="M8.59 16.59L10 18l6-6-6-6-1.41 1.41L13.17 12z"/>
      </svg>
    </button>
  </div>
  <p v-else>No images available</p>
</template>

<script>
import { Carousel, Slide } from 'vue3-carousel';
import 'vue3-carousel/dist/carousel.css';

export default {
  components: {
    Carousel,
    Slide
  },
  props: {
    figureUrls: {
      type: Array,
      required: true
    }
  },
  methods: {
    prev() {
      this.$refs.carousel.prev();
    },
    next() {
      this.$refs.carousel.next();
    }
  }
};
</script>

<style scoped>
.carousel-container {
  width: 100%;
  position: relative;
  display: flex;
}

.image-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}

.carousel-image {
  max-width: 100%;
  height: auto;
  transition: transform 0.3s ease-in-out;
}

.carousel-image:hover {
  transform: scale(1.1);
}

.carousel-nav {
  background: rgba(255, 255, 255, 0.5); /* White transparent background */
  border: none;
  border-radius: 50%; /* Make it a circle */
  cursor: pointer;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 1;
  padding: 0px; /* Add padding to make the circle larger */
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px; /* Ensure consistent clickable area */
  height: 40px; /* Ensure consistent clickable area */
}

.carousel-nav.left {
  left: 20px;
}

.carousel-nav.right {
  right: 20px;
}

.arrow-icon {
  fill: rgb(0, 0, 0);
}

.carousel-nav:hover .arrow-icon {
  fill: rgb(0, 0, 0);
  transform: scale(1.1);
}
</style>