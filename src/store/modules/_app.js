const state = {
  loading: false
}

const mutations = {
    loading (state, loading) {
        state.loading = loading
    }
}

const actions = {
}

const getters = {
    loading: state => state.loading
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}
