// global imports, shared resources
import Vue from 'vue'
import App from './App.vue'
import 'bootstrap/dist/css/bootstrap.css'
import VueRouter from 'vue-router'
import Login from './components/Login'
import Add from './components/Add'
import List from './components/List'

//register VueRouter middleware
Vue.use(VueRouter)

const routes = [
  { path: '/login', component: Login },
  { path: '/add', component: Add },
  { path: '/list', component: List },
  {
    //if the given path is not registered then redirect to '/login'
    path: '*', redirect: '/login'
  }
]

//mode: 'history' for removing hashbang from URL
const router = new VueRouter({
  routes,
  mode :'history'
})

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
console.log("Vue app is ready")
