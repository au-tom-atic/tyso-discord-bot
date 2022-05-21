const Discord = require("discord.js");
const dotenv = require("dotenv");
const express = require('express');
const app = express();
const config  = require("./config.json");
const sequelize = require("./sequelize");
const subscriber = require('./functions/subscribe.js');
const Youtube = require("./functions/youtube");
const client = new Discord.Client();
const { append } = require("express/lib/response");
dotenv.config();
let port = process.env.PORT || 3000;

var youtube = new Youtube(`https://${process.env.HEROKU_APP_NAME}.herokuapp.com/youtube`, client);

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

app.use("/youtube", youtube.getListener());

app.get('/resubscribe', (req, res) => {
  subscriber(config.subs);
  res.send(200)
});

youtube.registerCallbacks(config.discord_channel);

app.listen(port, () => {
  console.log("App listening on port: " + port)
});