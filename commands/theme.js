const { models } = require("../sequelize");
const dotenv = require("dotenv");
const Discord = require("discord.js");
dotenv.config();

module.exports = {
    name: "theme",
    aliases: ["t", "music", "theme-music", "theme_music", "tm"],
    description: "TYSO Theme Music",
    cooldown: 5,
    args: false,
    async execute(message)
    {
        message.channel.send(`Scoot Dooo.... https://www.youtube.com/watch?v=rsk5g0SsOzU`);
    }
};