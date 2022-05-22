const Discord = require("discord.js");
const dotenv = require("dotenv");
const fs = require("fs");
const express = require('express');
const app = express();
const config  = require("./config.json");
const sequelize = require("./sequelize");
const subscriber = require('./functions/subscribe.js');
const Youtube = require("./functions/youtube");
const client = new Discord.Client();
const { append } = require("express/lib/response");

dotenv.config();
let port = process.env.TYSO_PORT || 3000;
const prefix = '-';

client.commands = new Discord.Collection();
client.cooldowns = new Discord.Collection();

const commandFiles = fs.readdirSync("./commands");
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}


var youtube = new Youtube(`http://au-tom-atic.com/tyso-bot/youtube`, client);

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

client.on("message", async (message) => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    const command =
        client.commands.get(commandName) ||
        client.commands.find(
            (cmd) => cmd.aliases && cmd.aliases.includes(commandName)
        );

    if (!command) return;

    if (command.args && !args.length) {
        return message.channel.send(
            `You didn't provide any arguments, ${message.author}`
        );
    }

    const { cooldowns } = client;

    if (!cooldowns.has(command.name)) {
        cooldowns.set(command.name, new Discord.Collection());
    }

    const now = Date.now();
    const timestamps = cooldowns.get(command.name);
    const cooldownAmount = (command.cooldown || 3) * 1000;

    if (timestamps.has(message.author.id)) {
        const expirationTime =
            timestamps.get(message.author.id) + cooldownAmount;

        if (now < expirationTime) {
            const timeLeft = (expirationTime - now) / 1000;
            return message.reply(
                `please wait ${timeLeft.toFixed(
                    1
                )} more second(s) before reusing the \`${
                    command.name
                }\` command.`
            );
        }
    }

    timestamps.set(message.author.id, now);
    setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

    try {
        command.execute(message, args);
    } catch (error) {
        console.error(error);
        message.reply("there was an error trying to execute that command!");
    }
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