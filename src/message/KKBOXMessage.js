const Message = require('./Message')

module.exports = class KKBOXMessage extends Message {
    constructor(data, dataType) {
        super(data, dataType)
        this.dataType = dataType
    }

    toLineMessage() {
        const template = this.data.slice(0, 10).map(el => {
            return {
                imageUrl: el.album.images[1].url,
                action: {
                    type: 'uri',
                    label: `${el.name}`.slice(0, 12),
                    uri: `https://widget.kkbox.com/v1/?id=${el.id}&type=song&terr=TW&lang=TW`
                }
            }
        });
        return { altText: '試聽30秒', template };
    }

    toMessengerMessage() {
        const elements = this.data.map(el => {
            return {
                title: el.name === undefined ? el.title : el.name,
                subtitle: el.description === undefined || el.description === '' ? ' ' : el.description.slice(0, 60),
                image_url: el.images === undefined ? el.album.images[1].url : el.images[1].url,
                default_action: {
                    type: "web_url",
                    url: this.dataType === 'artist' ? el.url : `https://widget.kkbox.com/v1/?id=${el.id}&type=${this.dataType === 'track' ? 'song' : this.dataType}`,
                    messenger_extensions: true,
                    webview_height_ratio: "full"
                }
            }
        }).slice(0, 4)
        return {
            attachment: {
                type: 'template',
                payload: {
                    "template_type": "list",
                    "top_element_style": "large",
                    "elements": elements
                }
            }
        }
    }
}
