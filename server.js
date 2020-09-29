const bodyParser = require('body-parser');
const express = require('express');
const { bottender } = require('bottender');

global.kkbox = require('./src/api/KKBOX');
global.kkassistant = require('./src/nlp/KKAssistant');
const kkbox = global.kkbox;
const kkassistant = global.kkassistant;

const app = bottender({
    dev: process.env.NODE_ENV !== 'production',
});

const port = Number(process.env.PORT) || 5000;

// the request handler of the bottender app
const handle = app.getRequestHandler();

app.prepare().then(() => {
    kkbox.initToken();
    kkassistant.initToken();

    const server = express();

    const verify = (req, _, buf) => {
        req.rawBody = buf.toString();
    };
    server.use(bodyParser.json({ verify }));
    server.use(bodyParser.urlencoded({ extended: false, verify }));

    server.get('/', (req, res) => {
        res.json({ ok: true });
    });

    server.get('/token/refresh', async (req, res, next) => {
        if (req.get('X-Appengine-Cron') !== 'true') {
            return res.status(401).end();
        }

        await kkbox.getTokenFromDatastore()
            .then(token => kkbox.refreshToken(token))
            .then(token => kkbox.setTokenToDatastore(token))
            .then(response => res.json({ response: response }))
            .then(() => {
                kkbox.initToken(); kkassistant.initToken();
            })
            .catch(err => next(err));
    });

    // route for webhook request
    server.all('*', (req, res) => {
        console.log(req.body.events[0]);
        return handle(req, res);
    });

    server.listen(port, err => {
        if (err) throw err;
        console.log(`> Ready on http://localhost:${port}`);
    });
});
