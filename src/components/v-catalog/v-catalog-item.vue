<template>
  <div 
    class="v-catalog-item"
  >
    <v-popup 
      v-if="isInfoPopup"
      @closePopup="closeInfoPopup"
      @rightButtonAction="addToCart"
      rightButtonTitle="Add to cart"
      :popupTitle="product_data.name"
    >
      <img 
        :src=" require('../../assets/img/' + product_data.image) " 
        alt="img"
        class="v-catalog-item__img"
        @click="productClick"
      >
      <div class="">
        <p class="v-catalog-item__price">{{ product_data.price }}₽</p>
        <p class="v-catalog-item__name">{{ product_data.name }}</p>
        <!-- <p class="v-catalog-item__price">{{ product_data.category }}</p> -->
      </div>
    </v-popup>
    <img 
      :src=" require('../../assets/img/' + product_data.image) " 
      alt="img"
      class="v-catalog-item__img"
      @click="productClick"
    >
    <div class="v-catalog-item__price-block">
      <div 
        v-if="product_data.oldPrice"
        class="v-catalog-item__price-old"
      >
        {{ product_data.oldPrice | formatingPrice }} ₽
      </div>
      <div class="v-catalog-item__price">{{ product_data.price | formatingPrice }} ₽</div>
    </div>
    <div class="v-catalog-item__name">{{ product_data.name }}</div>
    <div class="v-catalog-item__controls">
      <div 
        class="v-catalog-item__like"
        @click="likeIt($event.target)"
      >
        <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg">
          <path d="M13.89 2c1.443 0 2.77.579 3.721 1.624C18.508 4.61 19 5.921 19 7.316c0 1.508-.6 2.904-1.864 4.358-.582.67-2.96 2.779-7.136 6.326-4.175-3.547-6.554-5.656-7.136-6.326C1.601 10.22 1 8.824 1 7.316c0-1.395.492-2.707 1.389-3.692C3.34 2.58 4.667 2 6.11 2c1.578 0 2.893.685 3.89 1.94C10.997 2.684 12.312 2 13.89 2z" fill="none" stroke="#313131" stroke-width="1.1">
          </path>
        </svg>
      </div>
      <div 
        class="v-catalog-item__cart"
        @click="addToCart($event.target)"
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M19.1783 4.17245H3.54072L3.30827 1.58291C3.27025 1.15944 2.91534 0.834961 2.49019 0.834961H0.821367C0.367738 0.834961 0 1.2027 0 1.65633C0 2.10996 0.367738 2.47769 0.821367 2.47769H1.73926C2.24088 8.06619 0.944454 -6.37801 2.68395 13.0025C2.75099 13.761 3.16085 14.5842 3.86692 15.1435C2.59391 16.7692 3.75705 19.1658 5.82779 19.1658C7.54648 19.1658 8.7587 17.4516 8.16931 15.8281H12.6648C12.0761 17.4496 13.2857 19.1658 15.0063 19.1658C16.3794 19.1658 17.4965 18.0487 17.4965 16.6756C17.4965 15.3025 16.3794 14.1854 15.0063 14.1854H5.83334C5.20942 14.1854 4.66571 13.809 4.43104 13.2606L17.5576 12.4891C17.9159 12.4681 18.2191 12.2166 18.3062 11.8684L19.9752 5.19301C20.1045 4.6754 19.7127 4.17245 19.1783 4.17245V4.17245ZM5.82779 17.5231C5.36055 17.5231 4.98038 17.1429 4.98038 16.6756C4.98038 16.2083 5.36055 15.8281 5.82779 15.8281C6.29507 15.8281 6.67525 16.2083 6.67525 16.6756C6.67525 17.1429 6.29507 17.5231 5.82779 17.5231ZM15.0062 17.5231C14.539 17.5231 14.1588 17.1429 14.1588 16.6756C14.1588 16.2083 14.539 15.8281 15.0062 15.8281C15.4735 15.8281 15.8537 16.2083 15.8537 16.6756C15.8537 17.1429 15.4735 17.5231 15.0062 17.5231ZM16.8589 10.8846L4.20993 11.6279L3.68817 5.81514H18.1263L16.8589 10.8846Z" fill="#313131"/>
        </svg>
      </div>
    </div>
  </div>
</template>

<script>

import vPopup from '../v-popup/v-popup'
import formatingPrice from '../../filters/formatingPrice'

export default {
  name: 'v-catalog-item',
  components: {
    vPopup
  },
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
      isInfoPopup: false,
      isWish: false
    }
  },
  filters: {
    formatingPrice
  },
  computed: {},
  methods: {
    likeIt(target) {
      this.isWish = !this.isWish;

      if (this.isWish) {
        target.closest('.v-catalog-item__like').classList.add('v-catalog-item__like_active');
        this.$emit('product-like', this.product_data);
      } else {
        target.closest('.v-catalog-item__like').classList.remove('v-catalog-item__like_active');
        this.$emit('product-like-remove', this.product_data);
      }
      
    },
    productClick() {
      this.$emit('product-click', this.product_data)
    },
    addToCart() {
      this.$emit('add-to-cart', this.product_data);
    },
    showPopupInfo() {
      this.isInfoPopup = true;
    },
    closeInfoPopup() {
      this.isInfoPopup = false;
    }
  },
  watch: {},
}
</script>

<style lang="scss">
  .v-catalog-item {
    position: relative;
    overflow: hidden;
    width: 33%;
    // box-shadow: 0 0 8px 0 #e8e8e0;
    padding-left: 25px;
    margin-bottom: 45px;
    &__img {
      max-width: 100%;
    }
    &__price {
      color: tomato;
      font-size: 13px;
      line-height: 19px;

      &-block {
        display: flex;
        align-items: center;
      }
      &-old {
        color: #000;
        text-decoration: line-through;
        margin-right: 15px;
        font-size: 13px;
        line-height: 19px;
      }
    }
    &__name {
      text-align: left;
      font-size: 13px;
      line-height: 20px;
      color: #6d6d6d;
      text-transform: uppercase;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
    }
    &__controls {
      position: absolute;
      top: 0;
      right: 30px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 60px;
      height: 55px;
    }
    &__like,
    &__cart {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 10px;
    }
    &__like {
      &:hover {
        svg {
          cursor: pointer;
        }
        path {
          fill: #9e9e9e;
          stroke: none;
        }
      }
      &_active {
        path {
          fill: #9e9e9e;
          stroke: none;
        }
      }
    }
    &__cart {
      &:hover {
        cursor: pointer;
        path {
          fill: #000;
        }
      }
    }
  }
</style>
