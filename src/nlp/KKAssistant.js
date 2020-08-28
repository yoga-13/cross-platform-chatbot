const config = require('../../config');
const axios = require("axios");

class KKAssistant {
    constructor(token = config.kkbox.token) {
        this.URL = 'https://nlu.assistant.kkbox.com';
        this.token = token;
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

        return axios.post(this.URL, body, {
            headers: { 'content-type': 'application/json' },
        })
        .then(response => response.data.response)
        .catch(error => {
            console.error('Error:', error);
        });
    }
}

module.exports = new KKAssistant()
