import Vue from 'vue'

Vue.config.silent = false
Vue.config.devtools = true
Vue.config.productionTip = true

Vue.config.keyCodes = {
  // v: 86,
  // f1: 112,
  // "media-play-pause": 179,
  // up: [38, 87]
}

import store from './store'
import router from './router'

import { sync } from 'vuex-router-sync'
sync(store, router, { moduleName: 'router' })

// import i18n from './i18n'

// packages
import LoadingOverlayPlugin from './packages/vue-loading-overlay/src'
Vue.use(LoadingOverlayPlugin)

//
import * as filters from './utils/global/filters'
Object.keys(filters).forEach(filter => {
    Vue.filter(filter, filters[filter])
})

import * as directives from './utils/global/directives'
Object.keys(directives).forEach(directive => {
    Vue.directive(directive, directives[directive])
})

import * as mixins from './utils/global/mixins'
Object.keys(mixins).forEach(mixin => {
    Vue.mixin(mixin, mixins[mixin])
})

import * as utils from './utils/global/utils'
Vue.prototype.$utils = utils
//

import http from './http'
Vue.prototype.$http = http
//

import App from './App.vue'

new Vue({
    name: 'root',
    store,
    router,
    // i18n,
    render: h => h(App)
}).$mount('#app')
