<template>
    <div id="app">

        <loading-overlay :loading.sync="loading"></loading-overlay>

        <nav class="nav">

            <router-link
                v-if="$route.name == 'characters.show.comics'" :to="{ name: 'characters.show', params: { id: $route.params.id } }"
                class="back-btn">
                <i class="fa fa-angle-left"></i> Voltar
            </router-link>

            <h1 class="title">
                <router-link class="link" :to="{ name: 'home' }"> Marvel </router-link>
            </h1>

        </nav>

        <transition name="fade" mode="out-in">
            <router-view class="router-container"></router-view>
        </transition>

        <footer class="footer">
            <a target="_blank" class="copyrights" href="http://marvel.com"> Data provided by Marvel. © 2018 MARVEL </a>
        </footer>

    </div>
</template>

<script>

    import { mapMutations, mapGetters } from 'vuex'

    export default {
        name: 'app',
        computed: {
            ...mapGetters('app', [
                'loading'
            ]),
        },
    }

</script>

<style lang="sass">
    @import "@/assets/styles/app.sass"

    .nav
        position: relative
        padding-top: 10px
        padding-bottom: 10px
        background-color: #F0151E

        .back-btn
            position: absolute
            top: 0
            display: block
            height: 100%
            display: flex
            justify-content: center
            align-items: center
            padding: 0 10px
            color: white
            text-decoration: none

        .title
            margin: 0
            color: white
            text-align: center
            text-transform: uppercase

            .link
                color: inherit
                text-decoration: none

    .footer
        padding-top: 10px
        padding-bottom: 10px
        display: block
        text-align: center

        .copyrights
            display: inline-block
            text-decoration: none
            color: #F0151E
            text-align: center

</style>
