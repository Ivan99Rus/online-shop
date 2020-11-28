<template>
  <div class="v-cart">
    <v-header/>
    <h2 class="v-cart__title">Ваша корзина</h2> 
    <div 
      class="v-cart__empty"
      v-if="!cart_data.length"
    >
      <div class="v-cart__empty-title">Ваша корзина пуста</div> 
        <router-link 
          class="v-cart__to-catalog"
          :to="{ name: 'catalog'}"
          tag="div"
        >
          Продолжить покупки
        </router-link>
    </div>
    <v-cart-item
      v-for="(item, index) in cart_data"
      :key="item.artticle"
      :cart_item_data="item"
      @delete-from-cart="deleteFromCart(index)"
      @increment="increment(index)"
      @decrement="decrement(index)"
    />
    <div 
      class="v-cart__total"
      v-if="cart_data.length"
    >
      <p class="v-cart__total-name">Итого:</p>
      <p class="v-cart__total-price">{{ cartTotalCost }}₽</p>
    </div>
  </div>
</template>

<script>

import vCartItem from './v-cart-item'
import { mapActions } from 'vuex'
import vHeader from './v-header'

export default {
  name: 'v-cart',
  components: {
    vHeader,
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
    &__title {
      position: relative;
      text-align: left;

      &::after {
        content: '';
        position: absolute;
        bottom: -10px;
        left: 0;
        width: 100%;
        height: 1px;
        background: #e4e4e4;
      }
    }

    &__empty {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      height: 60vh;

      &-title {
        line-height: 18px;
        font-size: 18px;
        margin-bottom: 20px;
      }
    }

    &__total {
      // position: fixed;
      // bottom: 0;
      // right: 0;
      // left: 0;
      // padding: 8px 80px;
      display: flex;
      justify-content: space-between;
      font-size: 20px;
      &-name {
        margin-right: 16px;
      }
    }

    &__to-catalog {
      padding: 5px 15px;
      cursor: pointer;
      text-transform: uppercase;
      border: 1px solid #000;
      color: #000;
      max-width: 180px;
      font-size: 11px;
      line-height: 28px;
      font-weight: bold;
    }
  }
</style>
