<template>
  <swiper class="swiper" :options="swiperOption">
    <swiper-slide 
      v-for="slide in slides"
      :key="slide.id"
    >
    <img 
      :src=" require('../assets/img/' + slide.src) " 
      alt="img"
    >
    </swiper-slide>
    <div class="swiper-pagination" slot="pagination"></div>
  </swiper>
</template>

<script>
  import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
  import 'swiper/swiper-bundle.css'

  export default {
    name: 'v-slider',
    title: 'Pagination',
    components: {
      Swiper,
      SwiperSlide
    },
    data() {
      return {
        swiperOption: {
          pagination: {
            el: '.swiper-pagination'
          }
        },
      }
    },
    props: {
      slides: {
        type: Array,
        default() {
          return []
        }
      }
    }
  }
</script>

<style lang="scss">
  .v-product-page__slider {
    max-width: 500px;
  }
</style>