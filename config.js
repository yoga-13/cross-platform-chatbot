module.exports = {
    kkbox: {
        id: process.env.KKBOX_APP_ID,
        secret: process.env.KKBOX_APP_SECRET,
        token: process.env.KKBOX_TOKEN
    },
    datastore: {
        kind: process.env.DATASTORE_ENTITY_KIND,
        id: process.env.DATASTORE_ENTITY_ID
    }
}
