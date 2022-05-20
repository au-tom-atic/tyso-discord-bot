var pubSubHubbub = require("pubsubhubbub");
const Discord = require("discord.js");
const dotenv = require("dotenv");
const config  = require("./config.json");
const client = new Discord.Client();
const YouTubeNotifier = require('youtube-notification');

dotenv.config();

client.once("ready", async () => {
    console.log('discord bot ready to send notifications')
    notifier.setup();
    console.log(config.subs)
    for(sub in config.subs)
    {
        console.log(config.subs[sub]);
        notifier.subscribe(config.subs[sub]);
    }
});

client.login(process.env.DISCORD_BOT);

const notifier = new YouTubeNotifier({
  hubCallback: `https://${process.env.HEROKU_APP_NAME}.herokuapp.com/youtube`,
  port: process.env.PORT,
  path: '/youtube'
});


 
notifier.on('notified', data => {
  console.log(data)
  let channel = client.channels.cache.find(channel => channel.name === config.discord_channel)
  channel.send(`${data.channel.name} just uploaded a new video titled: ${data.video.title}. watch it at: ${data.video.link}`)
});



