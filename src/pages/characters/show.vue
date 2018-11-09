<template>
    <div class="character-container">

        <div v-if="character" class="character">

            <img :src="getImage(character.thumbnail.path, character.thumbnail.extension)" :alt="character.name" width="300" height="450" class="thumb">

            <div class="content">

                <div class="inner">
                    <h1 class="title"> {{ character.name }} </h1>
                    <p v-if="character.description.length" class="description"> {{ character.description }} </p>
                    <span class="date"> {{ formatDate(character.modified) }} </span>
                </div>

                <div class="links">
                    <router-link :to="{ name: 'characters' }" class="beck-btn"> Voltar </router-link>
                    <router-link class="comics-btn" :to="{ name: 'characters.show.comics', params: { id: character.id } }"> Comics </router-link>
                </div>

            </div>

        </div>

    </div>
</template>

<script>

    export default {
        name: 'characters-show',
        data() {
            return {
                imageMode: 'portrait_uncanny',
                character: null
            }
        },
        methods: {
            getImage(path, ext) {
                return `${path}/${this.imageMode}.${ext}`
            },
            formatDate(date) {
                return new Date(date).toLocaleDateString()
            },
            getCharacter(id) {
                this.$http.get(`characters/${id}`)
                    .then(res => {

                        if(res.code === 200 && res.status === "Ok") {
                            this.character = res.data.results[0]
                        }

                    })
                    .catch(error => {
                        console.log(error)
                    })
            }
        },
        mounted() {
            this.getCharacter(this.$route.params.id)
        }
    }

</script>

<style lang="sass" scoped>

    .character-container
        padding: 30px !important

        @media screen and (max-width: 768px)
            .character
                flex-direction: column
                align-items: center

                .inner
                    margin-left: 0 !important
                    margin-top: 20px
                    width: 300px

                    .description
                        text-align: justify

        .character
            display: flex

            .thumb
                border: 2px solid #F0151E
                min-width: 300px
                min-height: 450px

            .content
                margin-left: 20px
                display: flex
                flex-direction: column
                justify-content: space-between

                .inner
                    display: flex
                    flex-direction: column

                    .title
                        margin: 0
                        color: #F0151E
                        font-size: 3rem
                        line-height: 2.5rem
                        margin-bottom: 15px

                    .description
                        margin: 0
                        font-size: 1.5rem
                        text-align: justify

                    .date
                        margin-top: 15px

                .links
                    display: flex

                    .beck-btn, .comics-btn
                        display: block
                        padding: 15px
                        width: 150px
                        border: 0
                        background-color: #F0151E
                        color: white
                        font-size: 1rem
                        font-weight: bold
                        text-align: center
                        text-decoration: none
                        text-transform: uppercase
                        outline: none
                        cursor: pointer

                        &:hover
                            cursor: pointer
                            background-color: darken(#F0151E, 10%)

                    .comics-btn
                        margin-left: 20px

                @media screen and (max-width: 768px)
                    margin-left: 0

                    .inner
                        .title
                            text-align: center

                    .links
                        margin-top: 20px
                        flex-direction: column-reverse

                        .beck-btn, .comics-btn
                            width: 100%

                        .beck-btn
                            margin-top: 10px

                        .comics-btn
                            margin-left: 0
</style>
