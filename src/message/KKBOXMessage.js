var test;
const Message = require('./Message')

module.exports = class KKBOXMessage extends Message {
    constructor(data, dataType) {
        super(data, dataType)
        this.dataType = dataType
    }

    toLineMessage() {
        if (test)
            test=0;
            if (this.data.type == 'Event.Metadata') {
                let template = this.data.events.slice(0, 10).map(el => {
                    var url = encodeURI(el.url);
                    return {
                        imageUrl: 'https://i.kfs.io/muser/global/131527099v9/cropresize/600x600.jpg',
                        action: {
                            type: 'uri',
                            uri: (el.url == '') ? 'https://kktix.com/' : `${url}`,
                            label: `${el.title}`.slice(0, 12),
                        }
                    }
                });
                return { altText: '音樂活動資訊', template };
            } else if(this.data.type == 'Video.Metadata') {
                let template = this.data.videos.slice(0, 10).map(el => {
                    var url = encodeURI(el.url);
                    return {
                        imageUrl: el.cover,
                        action: {
                            type: 'uri',
                            uri: `${url}`,
                            label: `${el.title}`.slice(0, 12),
                        }
                    }
                });
                return { altText: 'KKTV影片資訊', template };
            } else {  // AudioPlayer.Play
                let template = this.data.slice(0, 10).map(el => {
                    return {
                        imageUrl: el.album.images[1].url,
                        action: {
                            type: 'uri',
                            label: `${el.name}`.slice(0, 12),
                            uri: `https://kma.kkbox.com/charts/weekly/newrelease?terr=tw&lang=tc#`

                            /*   uri: `https://widget.kkbox.com/v1/?id=${el.id}&type=song&terr=TW&lang=TW` */
                        }
                    }
                });
                return { altText: '只能聽30秒', template };
            }
    
        else if (this.data.type == 'Event.Metadata') {
            let template = this.data.events.slice(0, 10).map(el => {
                var url = encodeURI(el.url);
                return {
                    imageUrl: 'https://i.kfs.io/muser/global/131527099v9/cropresize/600x600.jpg',
                    action: {
                        type: 'uri',
                        uri: (el.url == '') ? 'https://kktix.com/' : `${url}`,
                        label: `${el.title}`.slice(0, 12),
                    }
                }
            });
            return { altText: '音樂活動資訊', template };
        } else if(this.data.type == 'Video.Metadata') {
            let template = this.data.videos.slice(0, 10).map(el => {
                var url = encodeURI(el.url);
                return {
                    imageUrl: el.cover,
                    action: {
                        type: 'uri',
                        uri: `${url}`,
                        label: `${el.title}`.slice(0, 12),
                    }
                }
            });
            return { altText: 'KKTV影片資訊', template };
        } else {  // AudioPlayer.Play
            let template = this.data.slice(0, 10).map(el => {
                return {
                    imageUrl: el.album.images[1].url,
                    action: {
                        type: 'uri',
                        label: `${el.name}`.slice(0, 12),
                        uri: `https://kma.kkbox.com/charts/weekly/newrelease?terr=tw&lang=tc#`

                     /*   uri: `https://widget.kkbox.com/v1/?id=${el.id}&type=song&terr=TW&lang=TW` */
                    }
                }
            });
            return { altText: '不付費只能聽30秒', template };
        }
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
