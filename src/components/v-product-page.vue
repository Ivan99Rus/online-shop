<template>
  <div class="v-product-page">
    <v-header/>
    <div class="v-product-page__wrapper">
      <div class="v-product-page__slider">
        <v-slider :slides=slides />
      </div>
      <div class="v-product-page__info">
        <div class="v-product-page__info-name v-catalog-item__name">{{ product.name }}</div>
        <div class="v-product-page__info-price v-catalog-item__price">{{ product.price }} рублей</div>
      </div>
    </div>
  </div>
</template>

<script>

  import { mapGetters, mapActions } from 'vuex'
  import vSlider from './v-slider'
  import vHeader from './v-header'

  export default {
    name: "v-product-page",
    data() {
      return {
        slides: []
      }
    },
    props: {
      
    },
    components: {
      vHeader,
      vSlider
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
      this.GET_PRODUCTS_FROM_API();
      
      this.product.images.forEach(el => {
        setTimeout(() => {
          this.slides.push({
            id: Date.now(),
            src: el
          })
        }, 1)
      })
    }
  }
</script>

<style lang="scss">
  .v-product-page {
    &__wrapper {
      display: flex;
      justify-content: space-between;
    }

    &__info {
      text-align: left;
      width: 100%;
      padding: 0 100px;
    }
  }
</style>