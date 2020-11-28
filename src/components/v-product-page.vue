<template>
  <div class="v-product-page">
    <p>Product: {{ product.name }}</p>
  </div>
</template>

<script>

  import { mapGetters, mapActions } from 'vuex'

  export default {
    name: "v-product-page",
    props: {
      
    },
    computed: {
      ...mapGetters([
        'PRODUCTS'
      ]),
      product() {
        let res = {};

        this.PRODUCTS.map(item => {
          if (item.article === this.$route.query.product) {
            res = item;
          }
        })
        return res;
      }
    },
    methods: {
      ...mapActions([
        'GET_PRODUCTS_FROM_API'
      ])
    },
    mounted() {
      this.GET_PRODUCTS_FROM_API()
     }
  }
</script>