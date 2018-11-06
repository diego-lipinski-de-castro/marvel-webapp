import LoadingOverlay from './loading-overlay.vue'

const LoadingOverlayPlugin = {
    install(Vue, options) {
        Vue.component(LoadingOverlay.name, LoadingOverlay)
    }
}

export default LoadingOverlayPlugin
