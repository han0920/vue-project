/**
 * Created by FDD on 2017/12/13.
 * @desc 路径分析相关store
 */

import {
  SET_PATHANALYSIS_ORIGINS,
  SET_PATHANALYSIS_DESTINATION,
  SET_PATHANALYSIS_PASS,
  SET_PATHANALYSIS_AVOID
} from '../mutation-types'

// initial state
const state = {
  origins: {},
  destination: {},
  pass: {},
  avoid: {}
}

// getters
const getters = {
  path: state => state
}

// actions
const actions = {
  actionPathOrigins ({commit, state}, param) {
    commit(SET_PATHANALYSIS_ORIGINS, param)
  },
  actionPathDestination ({commit, state}, param) {
    commit(SET_PATHANALYSIS_DESTINATION, param)
  },
  actionPathPass ({commit, state}, param) {
    commit(SET_PATHANALYSIS_PASS, param)
  },
  actionPathAvoid ({commit, state}, param) {
    commit(SET_PATHANALYSIS_AVOID, param)
  }
}

// mutations
const mutations = {
  [SET_PATHANALYSIS_ORIGINS] (state, data) {
    state.origins = data
  },
  [SET_PATHANALYSIS_DESTINATION] (state, data) {
    state.destination = data
  },
  [SET_PATHANALYSIS_PASS] (state, data) {
    state.pass = data
  },
  [SET_PATHANALYSIS_AVOID] (state, data) {
    state.avoid = data
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}

