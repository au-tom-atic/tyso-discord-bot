const Discord = require("discord.js");
const dotenv = require("dotenv");
const config  = require("./config.json");
const sequelize = require("./sequelize");
const { post } = require('axios');
const urllib = require('url');
const qs = require('querystring');
const client = new Discord.Client();
const YouTubeNotifier = require('youtube-notification');

dotenv.config();

client.once("ready", async () => {
    console.log('discord bot ready to send notifications');
    try {
        sequelize.sync();
        console.log("Database connected!");
    } catch (error) {
        console.log(error.message);
        process.exit(1);
    }
    console.log("ready for commands with prefix " + prefix);
});

client.login(process.env.DISCORD_BOT);

const notifier = new YouTubeNotifier({
  hubCallback: `https://${process.env.HEROKU_APP_NAME}.herokuapp.com/youtube`,
  port: process.env.PORT
});

notifier.setup();

//notifier.subscribe(config.subs); //this function call does not work. doing it manually.

for(sub in config.subs)
{
    const topic = 'https://www.youtube.com/xml/feeds/videos.xml?channel_id=' + config.subs[sub];
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

notifier.on('subscribe', data => {
    console.log('Subscribed');
    console.log(data);
});
 
notifier.on('notified', data => {
  console.log(data)
  let channel = client.channels.cache.find(channel => channel.name === config.discord_channel)
  channel.send(`${data.channel.name} just uploaded a new video titled: ${data.video.title}. watch it at: ${data.video.link}`)
});

