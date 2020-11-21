const Message = 'https://kma.kkbox.com/charts/?terr=tw&lang=tc \n';


exports.HandleFollow = async context => {
    await context.sendText(Message);
}