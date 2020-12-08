<template>
  <div class="v-wish">
    <v-header/>
    <h2 class="v-wish__title">СПИСОК ЖЕЛАНИЙ</h2> 
    <div 
      class="v-wish__empty"
      v-if="!WISH.length"
    >
      <div class="v-wish__empty-img">
        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="38" height="34">
          <defs>
            <path d="M27.78 4c2.886 0 5.538 1.157 7.442 3.248C37.015 9.218 38 11.841 38 14.632c0 3.016-1.201 5.808-3.728 8.717C33.108 24.689 28.35 28.905 20 36 11.649 28.905 6.892 24.688 5.728 23.349 3.201 20.439 2 17.649 2 14.632c0-2.79.985-5.414 2.778-7.384C6.682 5.158 9.335 4 12.22 4 15.377 4 18.006 5.37 20 7.879 21.994 5.369 24.623 4 27.78 4z" id="a"/>
          </defs>
          <use stroke="#9E9E9E" stroke-width="1.1" fill-rule="nonzero" xlink:href="#a" transform="translate(-1 -3)" fill="none"/>
        </svg>
      </div>
      <div class="v-wish__empty-title">ВЫ ПОКА НЕ СОХРАНИЛИ НИ ОДНОГО ТОВАРА</div> 
        <router-link 
          class="v-wish__to-catalog"
          :to="{ name: 'catalog'}"
          tag="div"
        >
          НАЧНИТЕ ДЕЛАТЬ ПОКУПКИ
        </router-link>
    </div>
    <div class="v-wish__list">
      <v-wish-item
        v-for="item in WISH"
        :key="item.article"
        :wish_item_data="item"
        @delete-from-wish="deleteFromWish"
      />
    </div>
  </div>
</template>

<script>

import vWishItem from './v-wish-item'
import { mapActions, mapGetters } from 'vuex'
import vHeader from '../layouts/v-header'

export default {
  name: 'v-wish',
  components: {
    vHeader,
    vWishItem
  },
  props: {
    wish_data: {
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
    ...mapGetters([
      'WISH'
    ])
  },
  methods: {
    ...mapActions([
      'DELETE_FROM_WISH'
    ]),
    deleteFromWish(data) {
      console.log('data: ', data);
      this.DELETE_FROM_WISH(data)
    },
  },
  watch: {},
}
</script>

<style lang="scss">
  .v-wish {
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

    &__list {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
    }

    &__empty {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      height: 80vh;

      &-title {
        line-height: 18px;
        font-size: 18px;
        margin: 20px 0;
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
      max-width: 190px;
      font-size: 11px;
      line-height: 28px;
      font-weight: bold;
    }
  }
</style>
