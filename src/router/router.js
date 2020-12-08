import Vue from 'vue'
import Router from 'vue-router'

import vCatalog from '../components/v-catalog/v-catalog'
import vCart from '../components/v-cart/v-cart'
import vWish from '../components/v-wish/v-wish'
import vProductPage from '../components/layouts/v-product-page'

Vue.use(Router)

let router = new Router({
  routes: [ 
    {
      path: '/catalog',
      name: 'catalog',
      component: vCatalog
    },
    {
      path: '/product',
      name: 'product',
      component: vProductPage,
      props: true
    },
    {
      path: '/cart',
      name: 'cart',
      component: vCart,
      props: true
    },
    {
      path: '/wish-list',
      name: 'wish',
      component: vWish,
      props: true
    },
  ]
});

export default router;