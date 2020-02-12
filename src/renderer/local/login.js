import {
  local_db
} from './db'

export function login(username, password) {
  return local_db.find({
    selector: {
      type: 'users',
      _id: {
        $eq: username
      }
    }
  })
}

export function getInfo(token) {
  return local_db.find({
    selector: {
      type: 'users',
      _id: {
        $eq: token
      }
    }
  })
}

export function logout(token) {
  return local_db.find({
    selector: {
      type: 'users',
      _id: {
        $eq: token
      }
    }
  })
}
