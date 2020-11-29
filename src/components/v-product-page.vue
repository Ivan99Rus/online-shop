<template>
  <div class="v-product-page">
    <p>Product: {{ product }}</p>

    <swiper
      :slides-per-view="3"
      :space-between="50"
      @swiper="onSwiper"
      @slideChange="onSlideChange"
    >
      <swiper-slide>Slide 1</swiper-slide>
      <swiper-slide>Slide 2</swiper-slide>
      <swiper-slide>Slide 3</swiper-slide>
    </swiper>
  </div>
</template>

<script>

  import { mapGetters, mapActions } from 'vuex'
  import { Swiper, SwiperSlide } from 'swiper/vue'

  export default {
    name: "v-product-page",
    props: {
      
    },
    components: {
      Swiper,
      SwiperSlide,
    },
    computed: {
      ...mapGetters([
        'PRODUCTS'
      ]),
      product() {
        let res = {};

        this.PRODUCTS.map(item => {
          if (item.article === this.$route.query.article) {
            res = item;
          }
        })
        return res;
      }
    },
    methods: {
      ...mapActions([
        'GET_PRODUCTS_FROM_API'
      ]),
      onSwiper(swiper) {
        console.log(swiper)
      },
      onSlideChange() {
        console.log('slide change')
      },
    },
    mounted() {
      this.GET_PRODUCTS_FROM_API()
    }
  }
</script>