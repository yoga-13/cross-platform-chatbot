const welcomeMessage = 'Hi~ 本 Bot 是用 https://goo.gl/YWhP2L 開源程式碼打造\n\n' +
    '您可以問我\n' +
    '音樂：「播放告白氣球」；「播放自傳專輯的歌」；「播放動漫歌曲類型的歌」\n'

exports.HandleLineMessage = async context => {
    if (context.event.isText) {
        await context.sendText(`received the text message: ${context.event.text}`);
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