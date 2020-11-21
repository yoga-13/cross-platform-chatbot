const { router, text, line, messenger } = require('bottender/router');
const handler = require('./handler')
const 排名 = require('./排名')
exports.App = () => {
    return router([
        text(/^(hi|hello|help)$/i, handler.HandleFollow),
        text(/^(排名)$/i, 排名.HandleFollow),

        line.message(handler.HandleLineMessage),
        line.follow(handler.HandleFollow),

        messenger.message(handler.HandleMessengerMessage),
        messenger.accountLinking(handler.HandleFollow),
    ]);
}
