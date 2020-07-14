import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'


Vue.config.productionTip = false

// Manual component import
// import BaseIcon from '@/components/BaseIcon.vue';
//Vue.component('BaseIcon', BaseIcon);

// Automatic Component import:
import upperFirst from 'lodash/upperFirst' 
import camelCase from 'lodash/camelCase'

const requireComponent = require.context(
  './components',
  false,
  /Base[A-Z]\w+\.(vue|js)$/
)

requireComponent.keys().forEach(fileName => {
  const componentConfig = requireComponent(fileName)

  const componentName = upperFirst(
    camelCase(
      fileName.replace(/^\.\/(.*)\.\w+$/, '$1')
    )
  )

  Vue.component(
    componentName,
    componentConfig.default || componentConfig
  )
}) 



new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
