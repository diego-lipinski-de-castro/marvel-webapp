<template>

    <router-link :to="{ name: 'character', params: { id: character.id } }" class="character-card">
        <img class="thumb" :src="getImage(character.thumbnail.path, character.thumbnail.extension)" :alt="character.name">
        <span class="title"> {{character.name}} </span>
    </router-link>

</template>

<script>

    export default {
        name: 'character-card',
        props: ['character'],
        data() {
            return {
                imageMode: 'portrait_uncanny'
            }
        },
        methods: {
            getImage(path, ext) {
                return `${path}/${this.imageMode}.${ext}`
            }
        }
    }

</script>

<style lang="sass" >

    .character-card
        outline: 2px solid #F0151E
        display: flex
        width: 300px
        height: 450px
        text-decoration: none
        position: relative
        z-index: 1
        justify-content: center
        align-items: flex-end
        margin-bottom: 30px
        transition: transform 100ms ease-in-out

        @media screen and (min-width: 769px)
            margin-right: 20px

        &:last-child
            margin-bottom: 0

        &:hover
            transform: scale(1.05)

        .thumb
            position: absolute
            top: 0
            bottom: 0
            left: 0
            right: 0
            z-index: 2

        .title
            display: block
            width: 100%
            padding-top: 10px
            padding-bottom: 10px
            text-align: center
            z-index: 3
            background-color: #F0151E
            color: white
            font-weight: bold
            letter-spacing: 1px


</style>
