const PouchDB = require('pouchdb-browser')

// PouchDB plugins
PouchDB.plugin(require('pouchdb-find'))

// Create or open our local database
export const Cookies = new PouchDB('js-cookie')

const TokenKey = 'vue_admin_template_token'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  Cookies.put({
    _id: TokenKey,
    token: token
  }).then(function(response) {
    console.log(response)
  }).catch(function(err) {
    console.log(err)
  })
}

export function removeToken() {
  Cookies.get(TokenKey).then(function(tmp) {
    return Cookies.remove(tmp)
  }).then(function(result) {
    // handle result
  }).catch(function(err) {
    console.log('removeToken', err.name)
  })
}

// import Cookies from 'js-cookie'

// const TokenKey = 'vue_admin_template_token'

// export function getToken() {
//   console.log('getToken', Cookies.get(TokenKey))
//   return Cookies.get(TokenKey)
// }

// export function setToken(token) {
//   console.log('setToken', TokenKey, token)
//   Cookies.set(TokenKey, token)
//   console.log('Cookies.get', Cookies.get(TokenKey))
//   return Cookies.set(TokenKey, token)
// }

// export function removeToken() {
//   return Cookies.remove(TokenKey)
// }
