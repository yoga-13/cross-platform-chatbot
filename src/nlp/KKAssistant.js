const config = require('../../config');
const axios = require("axios");

class KKAssistant {
    constructor() {
        this.URL = 'https://nlu.assistant.kkbox.com';
    }

    async initToken() {
        const kkbox = global.kkbox;
        if(config.kkbox.token == undefined) {
            console.log("GCP Mode");
            this.token = await kkbox.getTokenFromDatastore().then(token => token.access_token);
        } else {
            console.log("Heroku Mode");
            this.token = config.kkbox.token;
        }
    }

    nlu(text, userId) {
        const body = {
            'context': {
                'System': {
                    'user': {
                        'userId': userId,
                        'accessToken': this.token
                    }
                }
            },
            'request': {
                'type': 'DirectiveRequest',
                'requestId': userId,
                'asr': {
                    'text': text
                }
            }
        };

        return axios.post(this.URL, body)
            .then(response => response.data.response)
            .catch(error => {
                console.error('Error:', error);
            });
    }
}

module.exports = new KKAssistant()
