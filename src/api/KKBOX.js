const config = require('../../config')
const {Auth, Api} = require('@kkbox/kkbox-js-sdk')
const axios = require("axios");

class KKBOX {
    init(clientId = config.kkbox.id, clientSecret = config.kkbox.secret) {
        return (async () => {
            const auth = new Auth(clientId, clientSecret)
            const accessToken = await auth
                .clientCredentialsFlow
                .fetchAccessToken()
                .then(response => {
                    return response.data.access_token
                })
            return new Api(accessToken)
        })()
    }

    fetchTracks(tracks) {
        const url = new URL('https://api.kkbox.com/v1.1/tracks');
        url.searchParams.set('territory', 'TW');
        url.searchParams.set('ids', tracks.map(track => track.id));

        return axios.get(url.toString(), {
            headers: {
                'Authorization': `Bearer ${config.kkbox.token}`
            }
        })
        .then(response => response.data.data)
        .catch(error => {
            console.error('Error:', error);
        });
    }
}

module.exports = new KKBOX()
