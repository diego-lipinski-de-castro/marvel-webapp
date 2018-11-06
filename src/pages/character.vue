<template>
    <div class="character-container">

        <div class="btn-wrap">
            <button class="beck-btn" @click="goBack()"> Voltar </button>
        </div>

        <div v-if="character" class="character">

            <div class="content">

                <img :src="getImage(character.thumbnail.path, character.thumbnail.extension)" :alt="character.name" width="300" height="450" class="thumb">

                <div class="inner">
                    <h1 class="title"> {{ character.name }} </h1>
                    <p v-if="character.description.length" class="description"> {{ character.description }} </p>
                    <span class="date"> {{ formatDate(character.modified) }} </span>
                </div>

            </div>

        </div>

    </div>
</template>

<script>

    export default {
        name: 'character',
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
            },
            goBack() {
                this.$router.go(-1)
            }
        },
        mounted() {
            this.getCharacter(this.$route.params.id)
        }
    }

</script>

<style lang="sass">

    .btn-wrap
        display: flex

        @media screen and (max-width: 768px)
            justify-content: center

        .beck-btn
            background-color: #F0151E
            border: 0
            color: white
            padding: 15px
            width: 300px
            font-weight: bold
            text-transform: uppercase
            font-size: 1rem
            margin-bottom: 20px
            outline: none
            cursor: pointer

    .character-container
        padding: 30px !important

        .character
            display: flex
            flex-direction: column

            @media screen and (max-width: 768px)
                .content
                    flex-direction: column
                    align-items: center

                    .inner
                        margin-left: 0 !important
                        margin-top: 20px
                        width: 300px

                        .description
                            text-align: justify

            .content
                display: flex

                .inner
                    display: flex
                    flex-direction: column
                    margin-left: 20px

                    .title
                        margin: 0
                        color: #F0151E
                        font-size: 3rem
                        line-height: 2.5rem

                    .description
                        margin: 15px 0 0 0
                        font-size: 1.5rem

                    .date
                        margin-top: 15px

                .thumb
                    border: 2px solid #F0151E
                    min-width: 300px
                    min-height: 450px

</style>
