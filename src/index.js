// module.exports = async function App(context) {
//     await context.sendText('Hello World');
//   };

const { router, line, messenger } = require('bottender/router');
const handler = require('./handler')

exports.App = () => {
  return router([
    line.message(handler.HandleLineMessage),
    line.follow(handler.HandleFollow),
    messenger.message(handler.HandleMessengerMessage),
    messenger.accountLinking(handler.HandleFollow),
  ]);
}
