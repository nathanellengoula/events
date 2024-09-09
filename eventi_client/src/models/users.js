import store from 'src/store'
import {setInSession, clearSession} from 'src/models/utils/sessionStorage'
import { setInLocal, clearLocal } from './utils/localStorage'
import { redirect } from '../mixins/index'
import axios from 'axios'

export const login = async loginParams => {
  const response = await axios.post("http://localhost:3000/api/auth/login", loginParams)

  if (response.data.user !== undefined) {
    try{
      setInLocal("currentUser", response.data.user)
      setInLocal("connected", true)
      store.dispatch("setCurrentUser", response.data.user)
      store.dispatch("setConnectedUser", true)

      return true
    }catch(e){
      console.error("Unable to accomplish the task (setInLocal)", e)
    }
  }
  else {
    return false
  }
}

export const registerUser = async data => {
  await axios.post("http://localhost:3000/api/auth/register", data)
    .then(response => {
      console.log(response.data)
      if (response.status === 201) {
        return true
      }
      else {
        return false
      }
    })
}

export const logout = () => {
  clearLocal()
}

// export const logout = () => {
//   clearSession()
// }

