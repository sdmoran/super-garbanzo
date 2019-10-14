import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Play from './views/Play.vue'
import NotFound from './views/NotFound'
import ShowPlayers from './views/public/ShowPlayers'
import ShowAnswers from './views/public/ShowAnswers'

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
      path: '/public/showanswers',
      name: 'ShowAnswers',
      component: ShowAnswers
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
  ]
})
