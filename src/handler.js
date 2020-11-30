const KKBOXMessage = require('./message/KKBOXMessage');
const kkbox = global.kkbox;
const kkassistant = global.kkassistant

const welbcomeMessage = 'Hi~ 本 Bot 是用 https://github.com/Tom9757/cross-platform-chatbot.git 開源程式碼打造\n\n' +
    '您可以問我\n' +
    '音樂：「播放告白氣球」；「播放自傳專輯的歌」；「我要聽鄉村音樂」；「我要聽日文新歌」\n' + 
    '音樂活動：「查詢高雄的活動」；「查詢吳卓源的演場會」；「查詢兩廳院的表演」\n' +
    '影音內容：「查詢影片進擊的巨人」；「查詢日劇半澤直樹」\n' +
    '輸入help顯示功能';


const HelpMessage = '功能\n'+
                    '輸入help顯示功能\n'+
                    '輸入recentday顯示本日熱門歌\n'+
                    '輸入recentweek顯示本周熱門歌\n'+
		    '輸入lightmusic顯示輕鬆的音樂\n'+
                    '輸入rank顯示今年度總排名';

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
exports.lightmusic= async context => {
    await context.sendButtonsTemplate('想聽輕鬆的音樂嗎?', {
        thumbnailImageUrl: 'https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_CMYK_Green.png',
        title: '輕鬆的音樂',
        text: '想聽輕鬆的音樂嗎?。',
        actions: [

          {
              type: 'uri',
              label: '點擊查看',
              uri: 'https://open.spotify.com/album/6AWB4IeN4GbK98jBAQJJLZ?highlight=spotify:track:2XLywNpkhdADt2ghlTacJP',
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
    await context.sendText(HelpMessage, {
        quickReply: {
            items: [
              {
                  type: 'action',
                  imageUrl: '',
                  action: {
                      type: 'message',
                      label: '顯示功能',
                      text: 'help',
                  }, 
              },

              {
                  type: 'action',
                  imageUrl: '',
                  action: {
                      type: 'message',
                      label: '本日熱門的歌',
                      text: 'recentday',
                  }, 
              },
              {
                  type: 'action',
                  imageUrl: '',
                  action: {
                      type: 'message',
                      label: '本周熱門歌',
                      text: 'recentweek',
                  }, 
              },
			  {
			      type: 'action',
			      imageUrl: '',
			      action: {
			          type: 'message',
			          label: '輕鬆的音樂',
			          text: 'lightmusic',
			      }, 
			  },
              {
                  type: 'action',
                  imageUrl: '',
                  action: {
                      type: 'message',
                      label: '今年度總排名',
                      text: 'rank',
                  }, 
              },




            ],
        }
    }
    
    
    
    
    );
}




if (context.event.isText) {
 
    kkassistant.nlu("風雲榜", context.session.id)
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
