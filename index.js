const Discord = require("discord.js");
const dotenv = require("dotenv");
const express = require('express')
const config  = require("./config.json");
const sequelize = require("./sequelize");
const videoQuery = require('./sequelize/controllers/video.js')
const subscriber = require('./functions/subscribe.js')
const client = new Discord.Client();
const YouTubeNotifier = require('youtube-notification');
const { append } = require("express/lib/response");

dotenv.config();
let port = process.env.PORT || 3000;
const app = express();

client.once("ready", async () => {
    console.log('discord bot ready to send notifications');
    try {
        sequelize.sync();
        console.log("Database connected!");
    } catch (error) {
        console.log(error.message);
        process.exit(1);
    }
    console.log("connected to db");

    subscriber(config.subs)
});

client.login(process.env.DISCORD_BOT);

const notifier = new YouTubeNotifier({
  hubCallback: `https://${process.env.HEROKU_APP_NAME}.herokuapp.com/youtube`,
});

app.use("/youtube", notifier.listener());

app.get('/resubscribe', (req, res) => {
  subscriber(config.subs);
  res.send(200)
})

app.listen(port, () => {
  console.log("App listening on port: " + port)
})

notifier.on('subscribe', data => {
    console.log('Subscribed');
    console.log(data);
});
 
notifier.on('notified', async (data) => {
    let channel = client.channels.cache.find(channel => channel.name === config.discord_channel)

    let video_data = {
      video_id: data.video.id,
      video_title: data.video.title,
      channel: data.channel.name,
      published: data.published
    };

    console.log(video_data)

    const { item, created } = await videoQuery
    .updateOrCreate(video_data.video_id, video_data)
    .then()
    .catch((e) => {
        console.log(e);
    });

    if (created) {
        channel.send(`${data.channel.name} just uploaded a new video titled: ${data.video.title}. watch it at: ${data.video.link}`)
    } else {
        console.log("video updated, not sending discord msg")
    }
});

