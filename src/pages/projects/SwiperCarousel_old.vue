<template>
  <div class="swiper-container">
    <div class="swiper-wrapper">
      <div v-for="(url, index) in figureUrls" :key="index" class="swiper-slide">
        <img v-if="isImage(url)" :src="url" alt="carousel image" />
        <video v-else autoplay muted loop>
          <source :src="url" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
    <!-- Add navigation buttons if needed -->
    <div class="carousel-nav left" @click="prevSlide">
      <svg class="arrow-icon" viewBox="-1 0 24 24">
        <path d="M15 18l-10-6 10-6"></path>
      </svg>
    </div>
    <div class="carousel-nav right" @click="nextSlide">
      <svg class="arrow-icon" viewBox="1 0 24 24">
        <path d="M9 18l10-6-10-6"></path>
      </svg>
    </div>
  </div>
</template>

<script>
import Swiper from 'swiper';
import 'swiper/swiper-bundle.css';

export default {
  props: {
    figureUrls: {
      type: Array,
      required: true
    }
  },
  mounted() {
    this.swiper = new Swiper('.swiper-container', {
      // Swiper options
      loop: true,
      navigation: {
        nextEl: '.carousel-nav.right',
        prevEl: '.carousel-nav.left',
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
    });

    // Force repaint
    this.$nextTick(() => {
      this.swiper.update();
    });

    // Add resize event listener
    window.addEventListener('resize', this.handleResize);
  },
  beforeDestroy() {
    // Remove resize event listener
    window.removeEventListener('resize', this.handleResize);
  },
  methods: {
    isImage(url) {
      return /\.(jpg|jpeg|png|gif|bmp|webp)$/i.test(url);
    },
    prevSlide() {
      this.swiper.slidePrev();
    },
    nextSlide() {
      this.swiper.slideNext();
    },
    handleResize() {
      this.swiper.update();
    }
  }
};
</script>

<style scoped>
@import 'swiper/swiper-bundle.css';

.swiper-container {
  position: relative;
  width: 100%;
  height: 100%;
}

.swiper-wrapper {
  display: flex;
  transition: transform 0.3s ease-in-out;
}

.swiper-slide {
  min-width: 100%;
  box-sizing: border-box;
}

img, video {
  width: 100%;
  height: auto;
}

.carousel-nav {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 35px; /* Ensure consistent clickable area */
  height: 35px; /* Ensure consistent clickable area */
  border-radius: 0%;
  background-color: rgba(255, 255, 255, 0.1); /* Semi-transparent background */

  z-index: 10; /* Ensure buttons are above the slides */
}

.carousel-nav.left {
  left: 10px;
}

.carousel-nav.right {
  right: 10px;
}

.arrow-icon {
  fill: rgb(0, 0, 0);
  width: 32px;
  height: 32px;
}

.carousel-nav:hover {
  background-color: rgba(255, 255, 255, 0.9);
  transition: background-color 0.5s ease-in-out;
}

.carousel-nav:hover .arrow-icon {
  fill: rgb(0, 0, 0);
  transition: transform 0.3s ease-in-out;
}
</style>