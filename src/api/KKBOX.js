const config = require('../../config')
const axios = require("axios");
const qs = require('qs');
const { Auth, Api } = require('@kkbox/kkbox-js-sdk')
const { Datastore } = require('@google-cloud/datastore');
const datastore = new Datastore();

class KKBOX {
    constructor() {
        this.id = config.kkbox.id;
        this.secret = config.kkbox.secret;

        this.datastoreKey = datastore.key([config.datastore.kind, datastore.int(config.datastore.id)]);
    }

    async initToken() {
        this.access_token = await this.getTokenFromDatastore()
            .then(token => token.access_token)
            .catch(error => {
                console.error('Error:', error)
            });
    }

    getApi() {
        return (async () => {
            const auth = new Auth(this.id, this.secret)
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
                'Authorization': `Bearer ${this.access_token}`
            }
        })
            .then(response => response.data.data)
            .catch(error => {
                console.error('Error:', error);
            });
    }

    async getTokenFromDatastore() {
        var setting = await datastore.get(this.datastoreKey).then(data => data[0]);

        return {
            access_token: setting.KKBOX_ACCESS_TOKEN,
            refresh_token: setting.KKBOX_REFRESH_TOKEN,
            expire_date: setting.KKBOX_TOKEN_EXPIRE,
        };
    }

    refreshToken(token) {
        const tokenExpireToDate = (token) => {
            token.expire_date = new Date(new Date().getTime() + token.expires_in * 1000);
            return token;
        }

        var data = qs.stringify({
            grant_type: 'refresh_token',
            refresh_token: token.refresh_token,
        });

        return axios.post('https://account.kkbox.com/oauth2/token', data,
            {
                auth: {
                    username: this.id,
                    password: this.secret,
                },
            },
        )
            .then(response => tokenExpireToDate(response.data))
            .catch(error => {
                console.error('Error:', error);
            });
    }

    setTokenToDatastore(token) {
        const setting = {
            KKBOX_ACCESS_TOKEN: token.access_token,
            KKBOX_REFRESH_TOKEN: token.refresh_token,
            KKBOX_TOKEN_EXPIRE: token.expire_date,
        };

        return datastore.update({ key: this.datastoreKey, data: setting }).then((apiResponse) => apiResponse);
    }
}

module.exports = new KKBOX()
