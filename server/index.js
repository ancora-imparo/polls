const admin = require('firebase-admin')
const env = require('./env')
const serviceAccount = JSON.parse(env.GOOGLE_APPLICATION_CREDENTIALS)

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: env.DATABASE_URL,
    databaseAuthVariableOverride: {
        uid: env.DATABASE_AUTH_VARIABLE_UID,
    },
})
const db = admin.database()
const ref = db.ref('/')
const usersRef = ref.child('users')

usersRef.set({
    userName: 'Lee Dong Wook',
})
usersRef.update({
    date_of_birth: '6-11-1980',
})

ref.on(
    'value',
    function (snapshot) {
        console.log(snapshot.val())
    },
    function (errorObject) {
        console.log('The read failed: ' + errorObject.code)
    }
)
