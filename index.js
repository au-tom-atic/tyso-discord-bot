var pubSubHubbub = require("pubsubhubbub");
const Discord = require("discord.js");
const dotenv = require("dotenv");
const { channel } = require("./config.json");
const client = new Discord.Client();
const YouTubeNotifier = require('youtube-notification');

dotenv.config();

const notifier = new YouTubeNotifier({
  hubCallback: `https://${process.env.HEROKU_APP_NAME}.herokuapp.com/youtube`,
  port: process.env.PORT,
  path: '/youtube'
});

notifier.setup();
 
notifier.on('notified', data => {
  console.log('New Video');
  console.log(`${data.channel.name} just uploaded a new video titled: ${data.video.title}`)
  client.channels.get(channel).send(`${data.channel.name} just uploaded a new video titled: ${data.video.title}. watch it at: ${data.video.link}`)
});
 
notifier.subscribe(['UCYCGsNTvYxfkPkfQopRMP7wUCYCGsNTvYxfkPkfQopRMP7w','UCgCpZpp9wnmZ4Kuxw40ib8g']);


client.once("ready", async () => {
    console.log('discord bot ready to send notifications')
});

client.login(process.env.DISCORD_BOT);


