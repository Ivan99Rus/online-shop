<template>
  <div class="v-catalog">
    <v-header/>
    <v-notification 
      :messages="messages"
      :timeout="3000"
    />
    <div class="v-catalog__wrapper">
      <div class="v-catalog__filters">
        <h2 class="v-catalog__filters-title">Фильтры</h2>
        <v-select 
          :selected="selected"
          :options="categories"
          @select="sortByCategories"
        />
        <div class="v-catalog__category">
          <div class="v-catalog__category-item">Футболки</div>
          <div class="v-catalog__category-item">Джинсы</div>
          <div class="v-catalog__category-item">Пальто и куртки</div>
          <div class="v-catalog__category-item">Рубашки</div>
          <div class="v-catalog__category-item">Подарочные наборы</div>
        </div>
      </div>
      <div class="v-catalog__list__wrapper">
        <h2 class="v-catalog__list-title">Каталог товаров</h2>
        <div class="v-catalog__list">
          <v-catalog-item
            v-for="product in filteredProducts"
            :key="product.article"
            :product_data="product"
            @add-to-cart="addToCart"
            @product-like="likeIt"
            @product-like-remove="likeItRemove"
            @product-click="productClick"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import vCatalogItem from '../v-catalog/v-catalog-item'
import { mapActions, mapGetters } from 'vuex'
import vSelect from '../libs/v-select'
import vNotification from '../notifications/v-notification'
import vHeader from '../layouts/v-header'


export default {
  name: 'v-catalog',
  components: {
    vHeader,
    vCatalogItem,
    vSelect,
    vNotification,
  },
  props: {},
  data() {
    return {
      categories: [
        {name: 'Все', value: 'all'},
        {name: 'Мужские', value: 'м'},
        {name: 'Женские', value: 'ж'}
      ],
      selected: 'Все',
      sortedProducts: [],
      messages: [],
      minPrice: 0,
      maxPrice: 100000
    }
  },
  computed: {
    ...mapGetters([
      'PRODUCTS',
      'CART',
    ]),
    filteredProducts() {
      return this.sortedProducts.length ? this.sortedProducts : this.PRODUCTS;
    }
  },
  methods: {
    ...mapActions([
      'GET_PRODUCTS_FROM_API',
      'ADD_TO_CART',
      'ADD_TO_WISH',
      'DELETE_FROM_WISH'
    ]),
    likeIt(data) {
      this.ADD_TO_WISH(data)
      .then(() => {
        this.messages.unshift({
          id: Date.now().toLocaleString(),
          icon: 'warning',
          name: 'Товар в списокe желаний'
        })
      })
    },
    likeItRemove(data) {
      this.DELETE_FROM_WISH(data)
      .then(() => {
        this.messages.unshift({
          id: Date.now().toLocaleString(),
          icon: 'error',
          name: 'Товар не в списокe желаний'
        })
      })
    },
    productClick(product) {
      this.$router.push({ 
        name: 'product', 
        query: { 'article': product.article }
      })
    },
    sortByCategories(category) {
      this.sortedProducts = []

      this.PRODUCTS.map(item => {
        if (item.category === category.name) {
          this.sortedProducts.push(item)
        }
      })

      this.selected = category.name
    },
    addToCart(data) {
      this.ADD_TO_CART(data)
      .then(() => {
        this.messages.unshift({
          id: Date.now().toLocaleString(),
          icon: 'success',
          name: 'Товар добавлен в корзину'
        })
      })
    },
    setChangeSliders() {
      if (this.minPrice > this.maxPrice) {
        let tempPrice = this.maxPrice;

        this.maxPrice = this.minPrice;
        this.minPrice = tempPrice
      }
      this.sortByCategories();
    }
  },
  watch: {},
  mounted() {
    this.GET_PRODUCTS_FROM_API()
    .then(response => {
      if (response.data) {
        this.sortByCategories()
      }
    })
  }
}
</script>

<style lang="scss">
  .v-catalog {
    &__wrapper {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      flex-wrap: nowrap;
    }
    &__list {
      display: flex;
      flex-wrap: wrap;
      &-title {
        text-align: left;
        margin-left: 20px;
      }
    }
    &__filters {
      width: 100%;
      max-width: 200px;
      text-align: left;
    }
    &__range {
      position: relative;
      width: 200px;
      margin: auto 16px;
      text-align: center;

      &-value {
        display: flex;
        align-items: center;
        justify-content: space-between;
      }

      svg,
      &-input {
        position: absolute;
        left: 0;
        bottom: 0;
      }

      input[type=range]::-webkit-slider-thumb {
          position: relative;
          z-index: 2;
          top: 2px;
          margin-top: -7px;
        }

    }
  }
</style>
