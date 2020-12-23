const admin = require('firebase-admin')

module.exports = {
    readPoll: async () => {
        try {
            const db = admin.database()
            const ref = db.ref('/')
            ref.on(
                'value',
                (snapshot) => {
                    console.log(snapshot.val())
                },
                (errorObject) => {
                    console.log('The read failed: ' + errorObject.code)
                }
            )
        } catch (error) {
            return error
        }
    },

    createPoll: async (pollObj) => {
        const db = admin.database()
        const ref = db.ref('/')
        const pollsRef = ref.child('Polls')
        await pollsRef.set(pollObj)
    },
}
