const { post } = require('axios');
const urllib = require('url');
const qs = require('querystring');

function sendSubscriptions(subs) {
    for(sub in subs)
    {
        const topic = 'https://www.youtube.com/xml/feeds/videos.xml?channel_id=' + subs[sub];
        const data = {
          'hub.callback': "https://tyso-discord-bot.herokuapp.com/youtube",
          'hub.mode': "subscribe",
          'hub.topic': topic,
          'hub.verify': "async"
        };
  
        post('https://pubsubhubbub.appspot.com/subscribe', qs.stringify(data), {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        });
    }
  }

 module.exports = sendSubscriptions;