const { router, text, line, messenger } = require('bottender/router');
const handler = require('./handler')
const KKBOXMessage = require('./message/KKBOXMessage');

exports.App = () => {
    return router([
        text(/^(hi|hello)$/i, handler.HandleFollow),
        text(/^(rank)$/i, handler.rank),
        text(/^(help)$/i, handler.help),
        text(/^(recentweek)$/i, handler.recentweek),
        text(/^(recentday)$/i, handler.recentday),
        text(/^(recommend)$/i, handler.recommendHandleLineMessage),

        text(/^(test)$/i, KKBOXMessage.test1311),

        

        line.message(handler.HandleLineMessage),
        line.follow(handler.HandleFollow),

        messenger.message(handler.HandleMessengerMessage),
        messenger.accountLinking(handler.HandleFollow),
    ]);
}
