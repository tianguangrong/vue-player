import * as types from './mutation-types'

export const mutations = {
  [types.SET_SINGER](state, singer) {
    state.singer = singer
  },
  [types.SET_PLAYING_STATE](state, bollean) {
    state.playing = bollean
  },
  [types.SET_FULL_SCREEN](state, bollean) {
    state.fullScreen = bollean
  },
  [types.SET_PLAYINGLIST](state, list) {
    state.playlist = list
  },
  [types.SET_SEQUENCE_LIST](state, list) {
    state.sequenceList = list
  },
  [types.SET_PLAYING_MODE](state, mode) {
    state.mode = mode
  },
  [types.SET_CURRENT_INDEX](state, index) {
    state.currentIndex = index
  }
}