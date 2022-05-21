const { models } = require("../sequelize");
const dotenv = require("dotenv");
const Discord = require("discord.js");
dotenv.config();

module.exports = {
    name: "sixth",
    aliases: ["s", "thesixthlead", "the-sixth-lead", "the_sixth_lead", "tsl"],
    description: "TYSO Promo Codes",
    cooldown: 5,
    args: false,
    async execute(message)
    {
        let promoEmbeddedResponse = new Discord.MessageEmbed()
                    .setColor("#0099ff")
                    .setTitle(`The Sixth Lead`)
                    .setAuthor('Take Your Shoes Off Bot')
                    .setURL("rickglassman.com/the-sixth-lead")
                    .setThumbnail(
                        `https://c10.patreonusercontent.com/4/patreon-media/p/campaign/3417482/048df8ece57f4466ba6e4fd0cedc699b/eyJ3IjoyMDB9/3.png?token-time=2145916800&token-hash=BFjY_lNn6R_whRq-nUNIoEwVA0LVVcPbnYBleHZ6JTU%3D`
                    )
                    .setDescription(
                        `Award winning web series`
                    )
                    .addFields(
                        {
                            name: "full playlist",
                            value: `https://www.youtube.com/playlist?list=PLKtcQ5JGFkgbg8JQfqsBp83I-r3Mr3sUp`,
                            inline: true,
                        }
                    )
                    .setTimestamp()
                    .setFooter("rickglassman.com/store");
                message.channel.send(promoEmbeddedResponse);
    }
};