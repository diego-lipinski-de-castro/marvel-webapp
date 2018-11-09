<template>
    <div class="comic-container">

        <div v-if="comic" class="comic">

            <img :src="getImage(comic.thumbnail.path, comic.thumbnail.extension)" :alt="comic.title" width="300" height="450" class="thumb">

            <div class="content">

                <div class="inner">
                    <h1 class="title"> {{ comic.title }} </h1>
                    <p v-if="comic.description" class="description"> {{ comic.description }} </p>
                    <!-- <span class="date"> FOC: {{ formatDate(comic.dates.filter(date => date.type = 'focDate')[0].date) }} </span> -->
                    <span class="date"> Início das vendas: {{ formatDate(comic.dates.filter(date => date.type = 'onsaleDate')[0].date) }} </span>
                    <span class="date"> Preço: ${{ comic.prices[0].price }} </span>
                    <span class="date"> Páginas: {{ comic.pageCount }} </span>
                    <span class="date"> Atualização: {{ formatDate(comic.modified) }} </span>
                </div>

                <div class="links">
                    <button class="beck-btn" @click="goBack()"> Voltar </button>
                </div>

            </div>

        </div>

    </div>
</template>

<script>

    export default {
        name: 'comics-show',
        data() {
            return {
                imageMode: 'portrait_uncanny',
                comic: null
            }
        },
        methods: {
            getImage(path, ext) {
                return `${path}/${this.imageMode}.${ext}`
            },
            formatDate(date) {
                return new Date(date).toLocaleDateString()
            },
            getComic(id) {
                this.$http.get(`comics/${id}`)
                    .then(res => {

                        if(res.code === 200 && res.status === "Ok") {
                            this.comic = res.data.results[0]
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
            this.getComic(this.$route.params.comic_id)
        }
    }

</script>

<style lang="sass" scoped>

    .comic-container
        padding: 30px !important

        .comic
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
                        background-color: #F0151E
                        border: 0
                        color: white
                        padding: 15px
                        width: 150px
                        font-weight: bold
                        text-transform: uppercase
                        font-size: 1rem
                        outline: none
                        cursor: pointer
                        text-align: center

                        &:hover
                            cursor: pointer
                            background-color: darken(#F0151E, 10%)

        @media screen and (max-width: 768px)
            .comic
                flex-direction: column
                align-items: center

                .content
                    margin-left: 0

                    .inner
                        margin-top: 20px
                        width: 300px

                        .title
                            text-align: center

                        .date
                            margin-top: 10px

                    .links
                        margin-top: 20px
                        flex-direction: column-reverse

                        .beck-btn
                            width: 100%
</style>
