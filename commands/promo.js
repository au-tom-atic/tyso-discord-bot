const { models } = require("../sequelize");
const dotenv = require("dotenv");
const Discord = require("discord.js");
//const videoQuery = require("../sequelize/controllers/promo.js");
dotenv.config();

module.exports = {
    name: "promo",
    aliases: ["p"],
    description: "TYSO Promo Codes",
    cooldown: 5,
    args: false,
    async execute(message)
    {
        let promoEmbeddedResponse = new Discord.MessageEmbed()
                    .setColor("#0099ff")
                    .setTitle(`TYSO Promos`)
                    .setAuthor('Take Your Shoes Off Bot')
                    .setURL("https://rickglassman.com")
                    .setThumbnail(
                        `http://ifsfilm.com/2k16/program/filmpics/sixth.jpg`
                    )
                    .setDescription(
                        `TYSO is brought to you by:`
                    )
                    .addFields(
                        {
                            name: "Betterhelp",
                            value: `https://betterhelp.com/tyso, use offer code TYSO for $10 off your first month`,
                            inline: true,
                        }
                    )
                    .setTimestamp()
                    .setFooter("rickglassman.com/store");
                message.channel.send(promoEmbeddedResponse);
    }
};