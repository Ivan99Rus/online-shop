<template>
  <div class="v-wish-item">
    <img  
      alt=""
      :src=" require('../../assets/img/' + wish_item_data.image) " 
      class="v-wish-item__img"
    >
    <div class="v-wish-item__info">      
        <div class="v-wish-item__info-name">{{ wish_item_data.name }}</div>
          <div class="v-wish-item__info-price-block">
            <div class="v-wish-item__info-price-old v-catalog-item__price-old" v-if="wish_item_data.oldPrice">{{ wish_item_data.oldPrice | formatingPrice }}</div>
            <div class="v-wish-item__info-price v-catalog-item__price">{{ wish_item_data.price | formatingPrice }}</div>
          </div>
    </div>

    <div 
      class="v-wish-item__btn-delete btn"
      @click="deleteFromWish"
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
  name: 'v-wish-item',
  components: {},
  props: {
    wish_item_data: {
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
    deleteFromWish() {
      console.log('this.wish_item_data: ', this.wish_item_data);
      this.$emit('delete-from-wish', this.wish_item_data)
    }
  },
  watch: {},
  mounted() {
    this.$set(this.wish_item_data, 'quantity', 1)
  }
}
</script>

<style lang="scss">
  .v-wish-item {
    position: relative;
    // box-shadow: 0 0 8px 0 #e8e8e0;
    padding: 0 0 0 16px;
    margin-bottom: 40px;
    width: 25% ;

    &__img {
      max-width: 100%;
    }

    &__info {
      width: 100%;
      text-align: left;
      padding: 0 15px;

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
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
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
