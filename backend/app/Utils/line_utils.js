
const _request = require('request')
const MESSAGE_URL = "https://notify-api.line.me/api/notify"
const Env = use('Env');
module.exports = {
    sendLineMessages: function (access_tokens, message) {
        access_tokens.map(access_token => {
            var options = {
                method: 'POST',
                uri: 'https://notify-api.line.me/api/notify',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                'auth': {
                    'bearer': access_token
                },
                form: {
                    message: message
                }
            };
            _request(options, function (err, httpResponse, body) {
                let res = JSON.parse(body)
                let status = res.status
                if (status != 200) {
                    console.log('có lỗi xảy ra khi gửi tin nhắn ', res.message)
                } else {
                    console.log("Gửi tin nhắn thành công qua LINE")
                }
            })
        })

    }
}
