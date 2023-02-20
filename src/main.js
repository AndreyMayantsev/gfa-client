import { createApp } from 'vue'

import { Quasar } from 'quasar'

// Import icon libraries
import '@quasar/extras/material-icons/material-icons.css'

// Import Quasar css
import 'quasar/dist/quasar.css'

import App from './App.vue'

const myApp = createApp(App)
myApp.use(Quasar, {
    plugins: {}, // import Quasar plugins and add here
  })
  
  // Assumes you have a <div id="app"></div> in your index.html
myApp.mount('#app')

//createApp(App).mount('#app')
