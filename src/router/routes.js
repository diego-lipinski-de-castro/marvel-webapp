import Routes from 'vue-routisan'

Routes.setViewResolver(path => {
    path = path.replace(/\./g, '/')
    return import(`./../${path}`)
})

Routes.view('/', 'pages.home').name('home')
Routes.view('/character/:id', 'pages.character').name('character')

export default Routes.all()
