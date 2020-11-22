const KKBOXMessage = require('./message/KKBOXMessage');
const kkbox = global.kkbox;
const kkassistant = global.kkassistant

const welcomeMessage = 'Hi~ 本 Bot 是用 https://rebrand.ly/ic-chatbot-github 開源程式碼打造\n\n' +
    '您可以問我\n' +
    '音樂：「播放告白氣球」；「播放自傳專輯的歌」；「我要聽鄉村音樂」；「我要聽日文新歌」\n' + 
    '音樂活動：「查詢高雄的活動」；「查詢吳卓源的演場會」；「查詢兩廳院的表演」\n' +
    '影音內容：「查詢影片進擊的巨人」；「查詢日劇半澤直樹」\n' +
    '輸入help顯示功能';
const RankMessage = 'https://kma.kkbox.com/charts/yearly/newrelease?lang=tc&terr=tw';
const RecentWeekMessage = 'https://kma.kkbox.com/charts/weekly/newrelease?terr=tw&lang=tc';
const RecentDayMessage = 'https://kma.kkbox.com/charts/daily/newrelease?terr=tw&lang=tc';

const HelpMessage = '功能\n'+
                    '輸入help顯示功能\n'+
                    '輸入recommend顯示周杰倫的歌\n'+
                    '輸入recentweek顯示本周熱門的歌\n'+
                    '輸入recentday顯示本日熱門的歌\n'+
                    '輸入rank顯示排名';

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
    await context.sendText(RankMessage);
}

exports.recentweek = async context => {
    await context.sendText(RecentWeekMessage);
}

exports.recentday = async context => {
    await context.sendText(RecentDayMessage);
}

exports.help = async context => {
    await context.sendText(HelpMessage);
}


exports.recommendHandleLineMessage = async context => {
    if (context.event.isText) {

        kkassistant.nlu("周杰倫", context.session.id)
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



