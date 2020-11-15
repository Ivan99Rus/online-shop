<template>
  <div class="v-catalog-item">
    <img 
      :src=" require('../assets/img/' + product_data.image) " 
      alt="img"
      class="v-catalog-item__img"
    >
    <p class="v-catalog-item__name">{{ product_data.name }}</p>
    <p class="v-catalog-item__price">Price: {{ product_data.price }}₽</p>
    <button 
      class="v-catalog-item__add-to-cart btn"
      @click="addToCart"
    >
      Add to card
    </button>
  </div>
</template>

<script>

export default {
  name: 'v-catalog-item',
  components: {},
  props: {
    product_data: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      
    }
  },
  computed: {},
  methods: {
    addToCart() {
      this.$emit('add-to-cart', this.product_data)
    }
  },
  watch: {},
}
</script>

<style lang="scss">
  .v-catalog-item {
    flex-basis: 25%;
    box-shadow: 0 0 8px 0 #e8e8e0;
    padding: 16px;
    margin-bottom: 16px;
    &__img {
      width: 100px;
    }
    &__price {
      white-space: nowrap;
    }
  }
</style>
