<template>
  <div class="carousel-container" v-if="figureUrls.length">
    <swiper-container slides-per-view="1" speed="300" loop="true" css-mode="true" navigation="true" pagination="false" >
      <swiper-slide v-for="(url, index) in figureUrls" :key="index">
        <div class="media-wrapper">
          <template v-if="isImage(url)">
            <img :src="url" :alt="'Media ' + (index + 1)" class="carousel-container" />
          </template>
          <template v-else>
            <video :src="url" controls autoplay loop muted class="carousel-container"></video> 
          </template>
        </div>
      </swiper-slide>
    </swiper-container>
  </div>
  <p v-else>No media available</p>
</template>



<script>


import { SwiperSlide } from 'swiper/vue';
import 'swiper/swiper-bundle.css';

export default {
  components: {
    SwiperSlide
  },

  
  props: {
    figureUrls: {
      type: Array,
      required: true
    }
  },
  methods: {
    isImage(url) {
      return /\.(jpg|jpeg|png|gif|bmp|webp)$/i.test(url);
    }
  }
};
</script>


<style scoped>
.carousel-container {
  width: 100%;
  position: relative;
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

swiper-container::part(button-prev),
swiper-container::part(button-next) {
  color: rgb(135, 135, 135);
}

swiper-container::part(button-prev):hover,
swiper-container::part(button-next):hover {
  color: rgb(222, 222, 222);
}

swiper-container::part(bullet) {
  height: 7px;
  width: 7px;
  border-radius: 2px;
  background: #000000;
  opacity: 1;
}

swiper-container::part(bullet-active) {
  height: 7px;
  width: 7px;
  border-radius: 2px;
  background: #828181;
  opacity: 1;
}

swiper-container::part(pagination) {
  top: 10px;
  right: 10px;
  left: auto;
  bottom: auto;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  position: absolute;
}
</style>