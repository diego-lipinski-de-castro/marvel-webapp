import Vue from 'vue'
import Router from 'vue-router'

// import routes from './routes'

import CharacterIndex from './../pages/characters/index'
import CharacterShow from './../pages/characters/show'

import ComicsList from './../pages/comics/index'
import ComicsShow from './../pages/comics/show'

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
            redirect: { name: 'characters' }
        },
        {
            path: '/characters',
            name: 'characters',
            component: CharacterIndex
        },
        {
            path: '/characters/:id',
            name: 'characters.show',
            component: CharacterShow
        },
        {
            path: '/characters/:id/comics',
            name: 'characters.show.comics',
            component: ComicsList
        },
        {
            path: '/characters/:id/comics/:comic_id',
            name: 'comics.show',
            component: ComicsShow
        }
    ]
})

export default router
