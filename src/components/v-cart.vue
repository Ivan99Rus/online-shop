<template>
  <div class="v-cart">
    <router-link :to="{ name: 'catalog' }">
      <div class="v-catalog__link-to-cart">Back to catalog</div>
    </router-link>
    <h1>Cart</h1> 
    <p v-if="!cart_data.length">There are not products in cart...</p> 
    <v-cart-item
      v-for="(item, index) in cart_data"
      :key="item.artticle"
      :cart_item_data="item"
      @delete-from-cart="deleteFromCart(index)"
      @increment="increment(index)"
      @decrement="decrement(index)"
    />
    <div class="v-cart__total">
      <p class="v-cart__total-name">Total:</p>
      <p>{{ cartTotalCost }}₽</p>
    </div>
  </div>
</template>

<script>

import vCartItem from './v-cart-item'
import { mapActions } from 'vuex'

export default {
  name: 'v-cart',
  components: {
    vCartItem
  },
  props: {
    cart_data: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      
    }
  },
  computed: {
    cartTotalCost() {
      let res = [];

      if (this.cart_data.length) {
        for (let item of this.cart_data) {
          res.push(item.price * item.quantity); 
        }
  
        res = res.reduce(function(sum, el) {
          return sum + el;
        })
        return res;
      } else {
        return 0;
      }
    }
  },
  methods: {
    ...mapActions([
      'DELETE_FROM_CART',
      'DECREMENT_CART_ITEM',
      'INCREMENT_CART_ITEM'
    ]),
    deleteFromCart(index) {
      this.DELETE_FROM_CART(index);
    },
    increment(index) {
      this.INCREMENT_CART_ITEM(index);
    },
    decrement(index) {
      this.DECREMENT_CART_ITEM(index);
    },
  },
  watch: {},
}
</script>

<style lang="scss">
  .v-cart {
    margin-bottom: 90px;
    &__total {
      position: fixed;
      bottom: 0;
      right: 0;
      left: 0;
      padding: 8px;
      display: flex;
      justify-content: center;
      background-color: #26ae68;
      color: #fff;
      font-size: 20px;
      &-name {
        margin-right: 16px;
      }
    }
  }
</style>
