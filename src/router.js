import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Play from './views/Play.vue'
import NotFound from './views/NotFound'
import Vote from './views/Vote'
import Scoreboard from './views/Scoreboard'
import ShowPlayers from './views/public/ShowPlayers'
import ShowAnswers from './views/public/ShowAnswers'
import store from './store'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
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
      component: Play,
      // Check if we have just come from the home route and the player has a valid name
      beforeEnter: (to, from, next) => {
        if(from.name == 'home' && store.state.name != 'default_name') next()
        else next('/')
      }
    },
    {
      path: '/vote/',
      name: 'Vote',
      component: Vote,
      // Check if we have just come from the Play route
      beforeEnter: (to, from, next) => {
        if(from.name == 'play') next()
        else next('/')
      }
    },
    {
      path: '/scoreboard/',
      name: 'Scoreboard',
      component: Scoreboard
    },
  ]
})

export default router