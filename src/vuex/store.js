import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex);

let store = new Vuex.Store ({
  state: {
    products: [],
    cart: [],
    wish: [],
  },
  mutations: {
    SET_PRODUCTS_TO_STATE: (state, products) => {
      state.products = products;
    },
    SET_WISH: (state, product) => {
      if (state.wish.length) {
        let isProductExists = false;

        state.wish.map(item => item.article === product.article ? isProductExists = true : isProductExists = false);
        
        if (!isProductExists) {
          state.wish.push(product);
        }
      } else {
        state.wish.push(product);
      }
    },
    REMOVE_FROM_WISH: (state, product) => {
      state.wish = state.wish.filter(el => el.article !== product.article)
    },
    SET_CART: (state, product) => {
      if (state.cart.length) {
        let isProductExists = false;

        state.cart.map(function(item) {
          if (item.article === product.article) {
            isProductExists = true;
            item.quantity++;
          }
        });
        
        if (!isProductExists) {
          state.cart.push(product);
        }
      } else {
        state.cart.push(product);
      }
    },
    REMOVE_FROM_CART: (state, index) => {
      state.cart.splice(index, 1);
    },
    INCREMENT: (state, index) => {
      state.cart[index].quantity++;
    },
    DECREMENT: (state, index) => {
      if (state.cart[index].quantity > 1) {
        state.cart[index].quantity--;
      }
    },
  },
  actions: {
    GET_PRODUCTS_FROM_API({commit}) {
      return axios('http://localhost:3000/products', {
        method: "GET"
      })
      .then((products) => {
        commit('SET_PRODUCTS_TO_STATE', products.data);
        return products;
      })
      .catch((error) => {
        console.error(error);
        return error;
      })
    },
    ADD_TO_CART({commit}, product) {
      commit('SET_CART', product)
    },
    ADD_TO_WISH({commit}, product) {
      commit('SET_WISH', product);
    },
    DELETE_FROM_WISH({commit}, article) {
      commit('REMOVE_FROM_WISH', article)
    },
    INCREMENT_CART_ITEM({commit}, index) {
      commit('INCREMENT', index)
    },
    DECREMENT_CART_ITEM({commit}, index) {
      commit('DECREMENT', index)
    },
    DELETE_FROM_CART({commit}, index) {
      commit('REMOVE_FROM_CART', index)
    }
  },
  getters: {
    PRODUCTS(state) {
      return state.products;
    },
    CART(state) {
      return state.cart;
    },
    WISH(state) {
      return state.wish;
    },
  },
});

export default store;
