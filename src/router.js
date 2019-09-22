import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Play from './views/Play.vue'
import NotFound from './views/NotFound'
import ShowPlayers from './views/public/ShowPlayers'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/public/showplayers/',
      name: 'showplayers',
      component: ShowPlayers
    },
    {
      path: '*',
      name: 'NotFound',
      component: NotFound
    },
    {
      path: '/play/',
      name: 'Play',
      component: Play
    }
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    // }
  ]
})
