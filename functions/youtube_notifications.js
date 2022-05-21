const dotenv = require("dotenv");
const YouTubeNotifier = require('youtube-notification');
const { append } = require("express/lib/response");

dotenv.config();

module.exports = function() {
    this.createNotifier = function(){
        const notifier = new YouTubeNotifier({
            hubCallback: `https://${process.env.HEROKU_APP_NAME}.herokuapp.com/youtube`,
        });

        return notifier;
    }

}