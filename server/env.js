require('dotenv').config()
const credentials = require('../../ServerKey.json')
exports.GOOGLE_APPLICATION_CREDENTIALS = JSON.stringify(credentials)

exports.DATABASE_URL = 'https://ancora-imparo-polls-default-rtdb.firebaseio.com'
exports.DATABASE_AUTH_VARIABLE_UID = 'my-service-worker'
