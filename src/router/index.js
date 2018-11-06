import Vue from 'vue'
import Router from 'vue-router'

// import routes from './routes'

import Home from './../pages/home'
import Character from './../pages/character'

Vue.use(Router)

const router = new Router({
    mode: 'hash',
    // base: '',
    linkActiveClass: 'router-link-active',
    linkExactActiveClass: 'router-link-exact-active',
    scrollBehavior: () => { y: 0 },
    // fallback: '',
    // routes: routes
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home
        },
        {
            path: '/character/:id',
            name: 'character',
            component: Character
        }
    ]
})

export default router
