import Vue from 'vue'
import Router from 'vue-router'
import index from '@/views/index'
import lines from '@/views/map/lines'
import subway from '@/views/map/subway'
import pathAnalysis from '@/views/map/pathAnalysis'
import signIn from '@/components/signIn'
import user from '@/components/user'

// import mapRouter from './map'

Vue.use(Router)

let routes = [
  {
    path: '',
    name: 'signIn',
    component: signIn
  },
  {
    path: '/index',
    name: 'index',
    component: index,
    children: [
      {
        path: '/lines',
        name: 'lines',
        component: lines
      },
      {
        path: '/subway',
        name: 'subway',
        component: subway
      },
      {
        path: '/pathAnalysis',
        name: 'pathAnalysis',
        component: pathAnalysis
      }
    ]
  },
  {
    path: '/user',
    name: 'user',
    component: user
  },
  {
    path: '*',
    redirect: '/'
  }
]

// routes[1].children = routes[1].children.concat(mapRouter)

const router = new Router({
  routes: routes
})

export default router
