import Vue from "vue"
import Vuex, { Store } from 'vuex'
import {loadSession} from 'src/models/utils/sessionStorage'
import { i18n } from 'src/boot/i18n';
import axios from 'axios';

const API_URL = "http://localhost:3000/api"

Vue.use(Vuex)

const initialState = () => {
  const startState = {
    events: [],
    userEvents: [],
    currentUser: {},
    searchedEvent: {},
    connected: false,
    submitted: false,
    isOpen: false,
    userUpdated: false,
    load: false,
    notify: false,
    previousRoute: "",
    toEdit: {},
    users: {},
    apiResponse: null,
    filteredItems: [],
    ...loadSession()
  }

  return startState
}

export default new Store({
  namespaced: true,
  strict: true,
  state: initialState(),

  getters:{
    notify: state => state.notify,
    isOpen: state => state.isOpen,
    events: state => {
      if(!state.events) return []
      let response = []
      response = [...state.events]
      return response
    },
    filteredItems: state => {
      if(!state.filteredItems) return []
      let response = []
      response = [...state.filteredItems]
      return response
    },
    userEvents: state => {
      if(!state.userEvents) return []
      let response = []
      response = [...state.userEvents]
      return response
    },
    currentUser: state => {
      if(!state.currentUser) return {}
      let response = {}
      response = {...state.currentUser}
      return response
    },
    searchedEvent: state => {
      if(!state.searchedEvent) return {}
      let response = {}
      response = {...state.searchedEvent}
      return response
    },
    toEdit: state => {
      if(!state.toEdit) return {}
      let response = {}
      response = {...state.toEdit}
      return response
    },
    connected: state => state.connected,
    submitted: state => state.submitted,
    previousRoute: state => state.previousRoute,
    load: state => state.load,
    userUpdated: state => state.userUpdated
  },

  mutations:{
    setLoading(state, payload) { state.load = payload },
    setUserUpdated(state, payload) { state.userUpdated = payload },
    setToEdit(state, payload) { state.toEdit = payload },
    setNotify(state, payload) { state.notify = payload },
    setIsOpen(state, payload) { state.isOpen = payload },
    submitted(state, payload) { state.submitted = payload },
    setConnectedUser(state, payload) { state.connected = payload },
    async getEvents(state, payload) { state.events = [...payload] },
    setCurrentUser (state, payload) { state.currentUser = payload },
    setPreviousRoute(state, payload) { state.previousRoute = payload.name },
    async getUserEvents(state, payload) { state.userEvents = [...payload] },
    addEvent(state, payload) { state.events = [payload, ...state.events] },

    setSearchedEvent(state, paylaod) {
      const event = state.events.find(ev => ev._id === paylaod)
      if(event) state.searchedEvent = event
    },
    performSearch(state, payload){
      const serachTerm = payload.toLowerCase()
      if(serachTerm.length){
        state.filteredItems = state.events.filter(event => event.name.toLowerCase().includes(serachTerm))
      }else state.filteredItems = []
    },
    updateEvent(state, payload) {
      const index = state.events.findIndex(p => p._id === payload._id)
      if (index !== -1) {
        state.events[index] = { ...state.events[index], ...payload }
      }
    },
    deleteEvent(state, payload){
      const index = state.events.findIndex(p => p.id === payload.id)
      if(index !== -1){
        state.events.splice(index, 1)
      }
    },
  },

  actions:{
    setSearchedEvent({commit}, payload) { commit("setSearchedEvent", payload) },
    setToEdit({commit}, payload) { commit("setToEdit", payload) },
    setLoading({commit}, payload) { commit('setLoading', payload) },
    setUserUpdated({commit}, payload) { commit('setUserUpdated', payload) },
    setIsOpen({commit}, payload ){ commit('setIsOpen', payload) },
    performSearch({ commit }, paylaod) { commit("performSearch", paylaod) },
    setConnectedUser({commit}, payload) { commit('setConnectedUser', payload) },
    setPreviousRoute({commit}, payload) { commit('setPreviousRoute', payload) },
    setCurrentUser ({ commit }, payload) { commit('setCurrentUser', payload) },
    submitted({ commit }, payload) { commit('submitted', payload) },
    registerUser({ commit }, payload) { commit('registerUser', payload) },
    getEvents({ commit }, payload) { commit('getEvents', payload) },
    getUserEvents({ commit }, payload) { commit('getUserEvents', payload) },
    addEvent({ commit }, payload) { commit('addEvent', payload) },
    updateEvent({ commit }, payload) { commit('updateEvent', payload) },
    deleteEvent({ commit }, payload) { commit('deleteEvent', payload) },
    setNotify({ commit }, paylaod) { commit('setNotify', paylaod) }
  },
})

