import { Buffer } from 'buffer'

class AuthService {
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
      cb({success: true})
    })
    .catch((err) => {
      cb(err)
    })
  }
}

export default AuthService
