const axios = require("axios");
const { models } = require("../../sequelize");
const dotenv = require("dotenv");
const Discord = require("discord.js");
const geocoding = require("../../helpers/geocoding");
const userQuery = require("../../sequelize/controllers/user.js");
dotenv.config();

module.exports = {
    name: "promo",
    aliases: ["p"],
    description: "TYSO Promo Codes",
    cooldown: 5,
    args: true,
    async execute(message, args)
    {
        let weatherEmbeddedResponse = new Discord.MessageEmbed()
                    .setColor("#0099ff")
                    .setTitle(`TYSO Promos`)
                    .setAuthor('TYSO Goblin')
                    .setURL("https://rickglassman.com")
                    .setThumbnail(
                        `https://c10.patreonusercontent.com/4/patreon-media/p/campaign/3417482/048df8ece57f4466ba6e4fd0cedc699b/eyJ3IjoyMDB9/3.png?token-time=2145916800&token-hash=BFjY_lNn6R_whRq-nUNIoEwVA0LVVcPbnYBleHZ6JTU%3D`
                    )
                    .setDescription(
                        `TYSO is brought to you by:`
                    )
                    .addFields(
                        {
                            name: "Betterhelp",
                            value: `betterhelp.com/tyso, offer code TYSO for $10 off your first month`,
                            inline: true,
                        }
                    )
                    .setTimestamp()
                    .setFooter("rickglassman.com/store");
                message.channel.send(weatherEmbeddedResponse);
    }
};