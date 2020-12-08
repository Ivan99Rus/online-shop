<template>
  <div class="v-cart-item">
    <img  
      alt=""
      :src=" require('../../assets/img/' + cart_item_data.image) " 
      class="v-cart-item__img"
    >
    <div class="v-cart-item__info">
      <div class="v-cart-item__info-brand">Calvin Klein</div>
      
      <div class="v-cart-item__info-wrapper">
        <div class="v-cart-item__info-name">{{ cart_item_data.name }}</div>
          <div class="v-cart-item__info-price-block">
            <div class="v-cart-item__info-price-old v-catalog-item__price-old" v-if="cart_item_data.oldPrice">{{ cart_item_data.oldPrice | formatingPrice }}</div>
            <div class="v-cart-item__info-price v-catalog-item__price">{{ cart_item_data.price | formatingPrice }}</div>
          </div>
      </div>

      <div class="v-cart-item__info-color v-cart-item__info-item">
        <span class="v-cart-item__info-value">COLOUR:</span>
        <span class="v-cart-item__info-key">Phantom</span>
      </div>

      <div class="v-cart-item__info-size v-cart-item__info-item">
        <span class="v-cart-item__info-value">SIZE:</span>
        <span class="v-cart-item__info-key">S</span>
      </div>

      <div class="v-cart-item__info-quantity v-cart-item__info-item">
        <span class="v-cart-item__info-value">КОЛИЧЕСТВО:</span>
        <span class="v-cart-item__info-key">
          <span class="v-cart-item__quantity-minus" @click="decrementItem">-</span>
           {{ cart_item_data.quantity }}
          <span class="v-cart-item__quantity-plus" @click="incrementItem">+</span>
        </span>
      </div>
    </div>

    <div 
      class="v-cart-item__btn-delete btn"
      @click="deleteFromCart"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15">
        <path d="M1 1l13 13m0-13L1 14" stroke="#313131" stroke-width="1.1" fill="none"></path>
      </svg>
    </div>
  </div>
</template>

<script>

import formatingPrice from '../../filters/formatingPrice'

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
  filters: {
    formatingPrice
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
    position: relative;
    display: flex;
    justify-content: space-between;
    flex-wrap: nowrap;
    // box-shadow: 0 0 8px 0 #e8e8e0;
    padding: 16px 0;
    margin-bottom: 16px;
    border-bottom: 1px solid #e4e4e4;

    &__img {
      max-width: 150px;
    }

    &__info {
      width: 100%;
      text-align: left;
      padding: 0 40px;

      &-item {
        margin-top: 20px;
      }

      &-wrapper {
        display: flex;
        align-items: center;
        justify-content: space-between;
      }

      &-brand {
        color: #9e9e9e;
        font-size: 14px;
        line-height: 20px;
        
      }

      &-name {
        color: #313131;
        font-size: 14px;
        line-height: 20px;
        text-transform: uppercase;
        font-weight: bold;
        margin-top: 5px;
      }

      &-price {
        &-block {
          display: flex;
          align-items: center;
        }
      }

      &-value {
        display: inline-block;
        width: 120px;
        color: #6d6d6d;
        text-transform: uppercase;
        font-size: 13px;
      }

      &-key {
        color: #000;
      }
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

    &__btn {
      &-delete {
        position: absolute;
        top: 0;
        right: 0;
        padding: 15px;
      }
    }
  }
</style>
