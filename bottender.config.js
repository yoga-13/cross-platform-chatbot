module.exports = {
    channels: {
        line: {
            enabled: true,
            path: '/webhooks/line',
            channelSecret: process.env.LINE_CHANNEL_SECRET,
            accessToken: process.env.LINE_ACCESS_TOKEN,
        },
        messenger: {
            enabled: false,
            accessToken: '',
            appSecret: '',
            verifyToken: '',
        },
        telegram: {
            enabled: false,
            accessToken: '',
        },
    },
}
