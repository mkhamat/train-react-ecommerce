import axios from "axios"
import { Dispatch } from "redux"
import { RootState } from "../store"

const USER_LOGIN_REQUEST = "USER_LOGIN_REQUEST"
const USER_LOGIN_SUCCESS = "USER_LOGIN_SUCCESS"
const USER_LOGIN_FAIL = "USER_LOGIN_FAIL"
const USER_LOGOUT = "USER_LOG_OUT"

const USER_REGISTER_REQUEST = "USER_REGISTER_REQUEST"
const USER_REGISTER_SUCCESS = "USER_REGISTER_SUCCESS"
const USER_REGISTER_FAIL = "USER_REGISTER_FAIL"

const USER_UPDATE_REQUEST = "USER_UPDATE_REQUEST"
const USER_UPDATE_SUCCESS = "USER_UPDATE_SUCCESS"
const USER_UPDATE_FAIL = "USER_UPDATE_FAIL"

export function login(email: string, password: string) {
  return async function (dispatch: (action: any) => void) {
    try {
      dispatch({ type: USER_LOGIN_REQUEST })
      let config = { headers: { "Content-Type": "application/json" } }
      let data = { email, password }
      let logon = await axios.post("/users/login", data, config)
      dispatch({ type: USER_LOGIN_SUCCESS, payload: logon.data })
      localStorage.setItem("userInfo", JSON.stringify(logon.data))
    } catch (error) {
      dispatch({
        type: USER_LOGIN_FAIL,
        payload: error.response.data.message,
      })
    }
  }
}

export function register(name: string, email: string, password: string) {
  return async function (dispatch: (action: any) => void) {
    try {
      dispatch({ type: USER_REGISTER_REQUEST })
      let config = { headers: { "Content-Type": "application/json" } }
      let data = { name, email, password }
      let reg = await axios.post("/users", data, config)
      dispatch({ type: USER_REGISTER_SUCCESS, payload: reg.data })
      localStorage.setItem("userInfo", JSON.stringify(reg.data))
    } catch (error) {
      dispatch({
        type: USER_REGISTER_FAIL,
        payload: error.response.data.message,
      })
    }
  }
}

export function update(name?: string, email?: string, password?: string) {
  return async function (dispatch: (action: any) => void, getState: any) {
    try {
      dispatch({ type: USER_UPDATE_REQUEST })
      let config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getState().users.user.token}`,
        },
      }
      let data = { name, email, password }
      let updated = await axios.put("/users/profile", data, config)
      dispatch({ type: USER_UPDATE_SUCCESS, payload: updated.data })
      localStorage.setItem("userInfo", JSON.stringify(updated.data))
    } catch (error) {
      dispatch({
        type: USER_UPDATE_FAIL,
        payload: error.response.data.message,
      })
    }
  }
}

export function logout() {
  return function (dispatch: Dispatch) {
    localStorage.removeItem("userInfo")
    dispatch({ type: USER_LOGOUT })
  }
}

export default function userReducer(state = { user: {} }, action: any) {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return { loading: true, ...state }
    case USER_LOGIN_SUCCESS:
      return { loading: false, user: action.payload }
    case USER_LOGIN_FAIL:
      return { loading: false, error: action.payload }
    case USER_LOGOUT:
      return {}
    case USER_REGISTER_REQUEST:
      return { loading: true, ...state }
    case USER_REGISTER_SUCCESS:
      return { loading: false, user: action.payload }
    case USER_REGISTER_FAIL:
      return { loading: false, error: action.payload }
    case USER_UPDATE_REQUEST:
      return { loading: true, ...state }
    case USER_UPDATE_SUCCESS:
      return { loading: false, user: action.payload }
    case USER_UPDATE_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}
