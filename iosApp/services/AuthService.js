import { Buffer } from 'buffer'
import { AsyncStorage } from 'react-native'
import { AUTH_KEY, USER_KEY } from '../constants/user'
import _ from 'lodash'

class AuthService {
  getAuthInfo (cb) {
    AsyncStorage.multiGet([
      AUTH_KEY,
      USER_KEY
    ], (err, val) => {
      if (err) {
        return cb(err)
      }

      if (!val) {
        return cb()
      }

      const zippedObj = _.zipObject([val[0][0], val[1][0]], [val[0][1], val[1][1]])

      if (!zippedObj[AUTH_KEY]) {
        return cb()
      }

      const authInfo = {
        header: {
          Authorization: `Basic ${zippedObj[AUTH_KEY]}`
        },
        user: JSON.parse(zippedObj[USER_KEY])
      }

      return cb(null, authInfo)
    })
  }

  login (creds, cb) {
    const auth = new Buffer(`${creds.username}:${creds.password}`)
    const encodedAuth = auth.toString('base64')

    fetch('https://api.github.com/user', {
      headers: {
        'Authorization': `Basic ${encodedAuth}`
      }
    })
    .then((response) => {
      if (response.status >= 200 && response.status < 300) {
        return response
      }

      throw {
        incorrectCredentials: response.status == 401,
        unknownError: response.status !== 401
      }
    })
    .then((response) => {
      return response.json()
    })
    .then((results) => {
      
      AsyncStorage.multiSet([
        [AUTH_KEY, encodedAuth],
        [USER_KEY, JSON.stringify(results)]
      ], (err) => {
        if (err) {
          throw err
        }

        return cb({success: true})
      })
    })
    .catch((err) => {
      return cb(err)
    })
  }
}

export default AuthService
