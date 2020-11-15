<template>
  <div class="v-cart-item">
    <img  
      alt=""
      :src=" require('../assets/img/' + cart_item_data.image) " 
      class="v-cart-item__img"
    >
    <div class="v-cart-item__info">
      <p>{{ cart_item_data.name }}</p>
      <p>{{ cart_item_data.price }}</p>
      <p>{{ cart_item_data.article }}</p>
    </div>
    <div class="v-cart-item__quantity">
      <p>Quantity: </p>
      <span class="v-cart-item__quantity-info">
        <span 
          class="v-cart-item__quantity-minus"
          @click="decrementItem"
        >
          -
        </span>
          {{ cart_item_data.quantity }}
        <span 
          class="v-cart-item__quantity-plus"
          @click="incrementItem"
        >
          +
        </span>
      </span>
    </div>
    <button 
      class="v-cart-item__btn btn"
      @click="deleteFromCart"
    >
      Delete
    </button>
  </div>
</template>

<script>


export default {
  name: 'v-cart-item',
  components: {},
  props: {
    cart_item_data: {
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
    deleteFromCart() {
      this.$emit('delete-from-cart')
    },
    decrementItem() {
      this.$emit('decrement');
    },
    incrementItem() {
      this.$emit('increment');
    }
  },
  watch: {},
  mounted() {
    this.$set(this.cart_item_data, 'quantity', 1)
  }
}
</script>

<style lang="scss">
  .v-cart-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: nowrap;
    box-shadow: 0 0 8px 0 #e8e8e0;
    padding: 16px;
    margin-bottom: 16px;
    &__img {
      max-width: 50px;
    }
    &__quantity {
      &-info {
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
      &-plus,
      &-minus {
        cursor: pointer;
      }
    }
  }
</style>
