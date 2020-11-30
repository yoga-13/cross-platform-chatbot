
const { router, text, line, messenger } = require('bottender/router');
const handler = require('./handler')


exports.App = () => {
    return router([
        text(/^(hi|hello)$/i, handler.HandleFollow),
        text(/^(rank)$/i, handler.rank),
        text(/^(help|help )$/i, handler.help),
        text(/^(recentweek)$/i, handler.recentweek),
	    text(/^(lightmusick)$/i, handler.lightmusic),
        text(/^(recentday)$/i, handler.recentday),


        

        line.message(handler.HandleLineMessage),
        line.follow(handler.HandleFollow),

        messenger.message(handler.HandleMessengerMessage),
        messenger.accountLinking(handler.HandleFollow),
    ]);
}