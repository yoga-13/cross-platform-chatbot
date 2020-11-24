const KKBOXMessage = require('./message/KKBOXMessage');
const kkbox = global.kkbox;
const kkassistant = global.kkassistant

const welcomeMessage = 'Hi~ 本 Bot 是用 https://rebrand.ly/ic-chatbot-github 開源程式碼打造\n\n' +
    '您可以問我\n' +
    '音樂：「播放告白氣球」；「播放自傳專輯的歌」；「我要聽鄉村音樂」；「我要聽日文新歌」\n' + 
    '音樂活動：「查詢高雄的活動」；「查詢吳卓源的演場會」；「查詢兩廳院的表演」\n' +
    '影音內容：「查詢影片進擊的巨人」；「查詢日劇半澤直樹」\n' +
    '輸入help顯示功能';


const HelpMessage = '功能\n'+
                    '輸入help顯示功能\n'+
                    '輸入recommend推薦隨機歌手的歌\n'+
                    '輸入recentweek顯示本周熱門的歌\n'+
                    '輸入recentday顯示本日熱門的歌\n'+
                    '輸入rank顯示排名';

var status ="";
var x;


exports.HandleLineMessage = async context => {
    if (context.event.isText) {
        kkassistant.nlu(context.event.text, context.session.id)
            .then(nluResp => {
                if (nluResp.directives.length > 0) {
                    if(nluResp.directives[0].type == 'AudioPlayer.Play') {
                        return kkbox.fetchTracks(nluResp.directives[0].playlist.data);
                    } else { // Event.Metadata & Video.Metadata
                        return nluResp.directives[0];
                    }
                }
                else {
                    console.error('Error: ', nluResp);
                    context.sendText(nluResp.outputSpeech.text);
                    throw new Error('KKBOX Assistant NLP Error');
                }
            })
            .then(items => new KKBOXMessage(items).toLineMessage())
            .then(({ altText, template }) => context.sendImageCarouselTemplate(altText, template))
            .catch(error => {
                console.error('Error: ', error);
            });
    }
}



exports.rank = async context => {
    await context.sendButtonsTemplate('想知道最近火紅的歌曲有哪些嗎?快來 KKBOX 風雲榜。', {
        thumbnailImageUrl: 'https://kma.kkbox.com/charts/assets/images/logo.svg?id=e41750806e78fa673556',
        title: '年度單曲累積榜',
        text: '想知道最近火紅的歌曲有哪些嗎?快來 KKBOX 風雲榜。',
        actions: [

          {
              type: 'uri',
              label: '點擊查看',
              uri: 'https://kma.kkbox.com/charts/yearly/newrelease?lang=tc&terr=tw',
          },
        ],
    });
}

exports.recentweek = async context => {
    await context.sendButtonsTemplate('想知道最近火紅的歌曲有哪些嗎?快來 KKBOX 風雲榜。', {
        thumbnailImageUrl: 'https://kma.kkbox.com/charts/assets/images/logo.svg?id=e41750806e78fa673556',
        title: '本週單曲累積榜',
        text: '想知道最近火紅的歌曲有哪些嗎?快來 KKBOX 風雲榜。',
        actions: [

          {
              type: 'uri',
              label: '點擊查看',
              uri: 'https://kma.kkbox.com/charts/weekly/newrelease?terr=tw&lang=tc',
          },
        ],
    });
}

exports.recentday = async context => {
    await context.sendButtonsTemplate('想知道最近火紅的歌曲有哪些嗎?快來 KKBOX 風雲榜。', {
        thumbnailImageUrl: 'https://kma.kkbox.com/charts/assets/images/logo.svg?id=e41750806e78fa673556',
        title: '今日單曲累積榜',
        text: '想知道最近火紅的歌曲有哪些嗎?快來 KKBOX 風雲榜。',
        actions: [

          {
              type: 'uri',
              label: '點擊查看',
              uri: 'https://kma.kkbox.com/charts/daily/newrelease?terr=tw&lang=tc',
          },
        ],
    });
}

exports.help = async context => {
   await context.sendText(HelpMessage);
}


exports.recommendHandleLineMessage = async context => {
    if (context.event.isText) {
        x= Math.floor(Math.random()*10);
        switch(x){
            case 0:status ="周興哲";break;
            case 1:status ="林俊傑";break;
            case 2:status ="周杰倫";break;
            case 3:status ="薛之謙";break;
            case 4:status ="陳奕迅";break;
            case 5:status ="華晨宇";break;
            case 6:status ="周筆暢";break;
            case 7:status ="田馥甄";break;
            case 8:status ="李榮浩";break;
            case 9:status ="張學友";break;
            default:status ="周杰倫";break;

        }
 
        kkassistant.nlu(status, context.session.id)
            .then(nluResp => {
                if (nluResp.directives.length > 0) {
                    if(nluResp.directives[0].type == 'AudioPlayer.Play') {
                        return kkbox.fetchTracks(nluResp.directives[0].playlist.data);
                    } else { // Event.Metadata & Video.Metadata
                        return nluResp.directives[0];
                    }
                }
                else {
                    console.error('Error: ', nluResp);
                    context.sendText(nluResp.outputSpeech.text);
                    throw new Error('KKBOX Assistant NLP Error');
                }
            })
             
            .then(items => new KKBOXMessage(items).toLineMessage())
            .then(({ altText, template }) => context.sendImageCarouselTemplate(altText, template))
            .catch(error => {
                console.error('Error: ', error);
            });
    }
}






exports.HandleFollow = async context => {
        await context.sendText(welcomeMessage);
}

exports.HandleMessengerMessage = async context => {
    if (context.event.isText) {
        await context.sendText(`received the text message: ${context.event.text}`);
    }
}



