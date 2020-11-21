const { router, text, line, messenger } = require('bottender/router');
const handler = require('./handler')
exports.App = () => {
    return router([
        text(/^(hi|hello)$/i, handler.HandleFollow),
        text(/^(Rank|rank)$/i, handler.HandleFollow1),
        text(/^(help|Help)$/i, handler.HandleFollow2),

        line.message(handler.HandleLineMessage),
        line.follow(handler.HandleFollow),

        messenger.message(handler.HandleMessengerMessage),
        messenger.accountLinking(handler.HandleFollow),
    ]);
}
