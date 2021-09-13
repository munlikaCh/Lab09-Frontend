import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import GStore from './store'
import 'nprogress/nprogress.css'

//add 5.3
import upperFirst from 'lodash/upperFirst'
import camelCase from 'lodash/camelCase'

const requireComponent = require.context(
    './components',
    false,
    /Base[A-Z]\w+\.(vue|js)$/
)

// Create a reactive object

//5.3 del 
// createApp(App).use(router).provide('GStore', GStore).mount('#app')

//add 5.3
const app = createApp(App)
requireComponent.keys().forEach((fileName) =>{
    const componentConfig = requireComponent(fileName)

    const componentName = upperFirst(
        camelCase(fileName.replace(/^\.\/(.*)\.\w+$/, '$1'))
    )

    app.component(componentName, componentConfig.default || componentConfig)

})
app.use(router).provide('GStore', GStore).mount('#app')