<template>
    <div>

        <div :class="['query-container', { open: isMobileOpen }]">

            <div class="wrap">
                <input v-model="query.titleStartsWith" @keyup.enter="getComics" type="text" name="search" placeholder="Pesquisar pelo título" class="search">

                <select v-model="query.dateDescriptor" class="date" name="date" placeholder="Lançamentos">
                    <option value="all"> Todos </option>
                    <option value="lastWeek"> Última semana </option>
                    <option value="thisWeek"> Essa semana </option>
                    <option value="nextWeek"> Próxima semana </option>
                    <option value="thisMonth"> Esse mês </option>
                </select>

                <label :class="['digi-box', { selected: query.hasDigitalIssue }]" for="digital"> Online
                    <input v-model="query.hasDigitalIssue" id="digital" type="checkbox" name="digital">
                    <span class="fakebox"> <i :class="`fa fa-${(query.hasDigitalIssue) ? 'check' : 'close'}`"></i> </span>
                </label>

                <select v-model="query.limit" class="limit" name="limit">
                    <option value="10"> 10 </option>
                    <option value="30"> 30 </option>
                    <option value="50"> 50 </option>
                </select>

                <button class="go" @click="getComics"> Go! </button>
            </div>

            <button @click="isMobileOpen = !isMobileOpen" class="toggle">
                <span> Filtros </span>
                <i :class="`fa fa-angle-double-${(isMobileOpen) ? 'up' : 'down'}`"></i>
            </button>

        </div>

        <div class="cards-container">
            <comic-card v-for="(comic, index) in comics" :key="index" :comic="comic" :character="$route.params.id"/>
        </div>

        <div class="pagination-container" v-if="comics.length">
            <button :disabled="query.offset == 0" @click="prevPage" class="btn"> <i class="fa fa-angle-left"></i> </button>
            <button :disabled="!hasNextPage" class="btn" @click="nextPage"> <i class="fa fa-angle-right"></i> </button>
        </div>

    </div>
</template>

<script>

    import ComicCard from '@/components/comic-card'

    export default {
        name: 'comics-index',
        components: {
            'comic-card': ComicCard
        },
        data() {
            return {
                isMobileOpen: false,
                query: {
                    titleStartsWith: '',
                    orderBy: 'title',
                    limit: 10,
                    offset: 0,
                    dateDescriptor: 'all',
                    hasDigitalIssue: false
                },
                comics: [],
                error: false
            }
        },
        computed: {
            hasTitleFilter() {
                return this.query.titleStartsWith !== null && this.query.titleStartsWith.length > 0
            },
            hasDateDescriptor() {
                return this.query.dateDescriptor == 'lastWeek'
                        || this.query.dateDescriptor == 'thisWeek'
                        || this.query.dateDescriptor == 'nextWeek'
                        || this.query.dateDescriptor == 'thisMonth'
            },
            hasNextPage() {
                return this.comics.length >= this.query.limit
            }
        },
        watch: {
            'query.limit': function() {
                this.getComics()
            },
            'query.offset': function() {
                this.getComics()
            },
            'query.dateDescriptor': function() {
                this.getComics()
            },
            'query.hasDigitalIssue': function() {
                this.getComics()
            }
        },
        methods: {
            prevPage() {
                this.query.offset = this.query.offset - this.query.limit
            },
            nextPage() {
                this.query.offset = this.query.offset + this.query.limit
            },
            getComics() {
                this.$http.get(`characters/${this.$route.params.id}/comics`, {
                        params: {
                            ...(this.hasTitleFilter && { titleStartsWith: this.query.titleStartsWith }),
                            ...(this.hasDateDescriptor && { dateDescriptor: this.query.dateDescriptor }),
                            ...(this.query.hasDigitalIssue && { hasDigitalIssue: this.query.hasDigitalIssue }),
                            orderBy: this.query.orderBy,
                            limit: this.query.limit,
                            offset: this.query.offset,
                        }
                    })
                    .then(res => {

                        if(res.code === 200 && res.status === "Ok") {
                            this.comics = res.data.results
                        }

                    })
                    .catch(error => {
                        console.log(error)
                    })
            },
        },
        mounted() {
            this.getComics()
        }
    }

</script>

<style lang="sass" scoped>

    .query-container
        display: flex

        .wrap
            display: flex
            width: 100%

            .search
                flex-grow: 1
                margin-right: 10px
                padding: 10px
                outline: 0
                font-size: 1rem
                border: 1px solid #F0151E

            .date
                margin-right: 10px
                border-radius: 0
                border: 1px solid #F0151E
                outline: none
                letter-spacing: 0.5px
                font-weight: bold
                font-size: 1rem
                font-weight: 300

            .digi-box
                margin-right: 10px
                color: white
                display: flex
                justify-content: center
                align-items: center
                background-color: white
                color: #F0151E
                padding-left: 10px
                border: 1px solid #F0151E
                border-radius: 5px
                letter-spacing: 0.5px

                &:hover
                    cursor: pointer

                &.selected
                    background-color: #F0151E
                    color: white

                input
                    display: none

                .fakebox
                    display: flex
                    justify-content: center
                    align-items: center
                    width: 40px
                    height: 100%
                    font-size: 1.2rem

            .limit
                display: block
                margin-right: 10px
                padding: 10px
                border: 1px solid #F0151E
                width: 50px
                font-size: 1rem

                @media screen and (max-width: 768px)
                    width: 60px

            .go
                border: none
                background-color: #F0151E
                color: white
                width: 50px
                letter-spacing: 2px
                font-weight: bold
                font-size: 1rem
                outline: none

                &:hover
                    cursor: pointer
                    background-color: darken(#F0151E, 10%)

        .toggle
            display: none

        @media screen and (max-width: 768px)
            padding: 0
            flex-direction: column

            .wrap
                display: none
                flex-direction: column

                .search, .date, .digi-box, .limit
                    margin-right: 0
                    margin-bottom: 10px
                    padding: 10px

                .limit
                    width: 100%

                .go
                    width: 100%
                    padding: 12px
                    border-radius: 5px

            &.open
                .wrap
                    display: flex

                .toggle
                    margin-top: 10px

            .toggle
                color: red
                display: flex
                justify-content: center
                align-items: center
                padding: 10px
                font-size: 1.2rem

                i
                    margin-left: 10px
                    margin-top: -2.5px
                    animation: dance 500ms ease-in-out infinite alternate-reverse forwards

                    @keyframes dance
                        from
                            transform: translateY(0)
                        to
                            transform: translateY(2.5px)

    .cards-container
        display: flex

        @media screen and (min-width: 769px)
            flex-wrap: wrap
            justify-content: center
            padding: 30px

        @media screen and (max-width: 768px)
            flex-direction: column
            align-items: center
            padding: 10px

    .pagination-container
        display: flex
        justify-content: center
        padding-bottom: 30px

        @media screen and (max-width: 768px)
            padding-top: 30px

        .btn
            background-color: #F0151E
            border: none
            border-radius: 0
            color: white
            padding: 20px
            outline: none

            &:first-child
                margin-right: 10px

            &:disabled
                cursor: not-allowed
                background-color: #ddd

            &:hover:not(:disabled)
                cursor: pointer
                background-color: darken(#F0151E, 10%)

</style>
