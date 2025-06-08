/*
 * @Description: Vuex入口
 * @Author: Allen
 * @Date: 2025-02-07 16:23:00
 * @LastEditors: Allen
 * @LastEditTime: 2025-02-25 22:51:50
 */
import Vue from 'vue'
import Vuex from 'vuex'

import user from './modules/user'
import shoppingCart from './modules/shoppingCart'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: true,
  modules: {
    user,
    shoppingCart
  }
})
