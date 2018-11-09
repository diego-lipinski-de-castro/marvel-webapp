<template>
    <div>

        <div class="query-container">

            <input v-model="query.nameStartsWith" @keyup.enter="getCharacters" type="text" name="search" placeholder="Pesquisar pelo nome" class="search">

            <select class="limit" v-model="query.limit" name="limit">
                <option value="10"> 10 </option>
                <option value="30"> 30 </option>
                <option value="50"> 50 </option>
            </select>

            <button class="go" @click="getCharacters"> Go! </button>

        </div>

        <div class="cards-container">
            <character-card v-for="(character, index) in characters" :key="index" :character="character"/>
        </div>

        <div class="pagination-container" v-if="characters.length">
            <button :disabled="query.offset == 0" @click="prevPage" class="btn"> <i class="fa fa-angle-left"></i> </button>
            <button :disabled="!hasNextPage" class="btn" @click="nextPage"> <i class="fa fa-angle-right"></i> </button>
        </div>

    </div>
</template>

<script>

    import CharacterCard from '@/components/character-card'

    export default {
        name: 'characters-index',
        components: {
            'character-card': CharacterCard
        },
        data() {
            return {
                query: {
                    nameStartsWith: '',
                    orderBy: 'name',
                    limit: 10,
                    offset: 0
                },
                characters: [],
                error: false
            }
        },
        computed: {
            hasNameFilter() {
                return this.query.nameStartsWith !== null && this.query.nameStartsWith.length > 0
            },
            hasNextPage() {
                return this.characters.length > this.query.limit
            }
        },
        watch: {
            'query.limit': function() {
                this.getCharacters()
            },
            'query.offset': function() {
                this.getCharacters()
            },
        },
        methods: {
            prevPage() {
                this.query.offset = this.query.offset - this.query.limit
            },
            nextPage() {
                this.query.offset = this.query.offset + this.query.limit
            },
            getCharacters() {
                this.$http.get('characters', {
                        params: {
                            ...(this.hasNameFilter && { nameStartsWith: this.query.nameStartsWith }),
                            orderBy: this.query.orderBy,
                            limit: this.query.limit,
                            offset: this.query.offset
                        }
                    })
                    .then(res => {

                        if(res.code === 200 && res.status === "Ok") {
                            this.characters = res.data.results
                        }

                    })
                    .catch(error => {
                        console.log(error)
                    })
            },
        },
        mounted() {
            this.getCharacters()
        }
    }

</script>

<style lang="sass" scoped>

    .query-container
        display: flex
        padding: 10px

        .search
            flex-grow: 1
            margin-right: 10px
            padding: 10px
            outline: 0
            font-size: 1rem
            border: 1px solid #F0151E

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

            &:hover
                cursor: pointer
                background-color: darken(#F0151E, 10%)

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

            &:hover
                cursor: pointer
                background-color: darken(#F0151E, 10%)

            &:disabled
                cursor: not-allowed
                background-color: #ddd

            &:hover:not(:disabled)
                cursor: pointer
                background-color: darken(#F0151E, 10%)
</style>
