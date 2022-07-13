const { models } = require("../sequelize");
const dotenv = require("dotenv");
const Discord = require("discord.js");
const promos  = require("./promos.json");
//const videoQuery = require("../sequelize/controllers/promo.js");
dotenv.config();

module.exports = {
    name: "promo",
    aliases: ["p"],
    description: "TYSO Promo Codes",
    example: "-promo, -p",
    cooldown: 5,
    args: false,
    async execute(message)
    {
        // create fields for embed
        const fields = [];
        // loop through commands
        for (const name in promos) {
            // create field for command
            let field_value = promos[name].spiel
                + '\n**Offer**: ' + promos[name].offer
                + '\n**Link**: '  + promos[name].link;
            
            field_value += promos[name].hasOwnProperty('code') ? '\n**Code**: '  + promos[name].code : ''

            const field = {
                name: promos[name].name,
                value: field_value
            };
            // add field to fields
            fields.push(field);
        }

        let promoEmbeddedResponse = new Discord.MessageEmbed()
                    .setColor("#0099ff")
                    .setTitle(`TYSO Promos`)
                    .setAuthor('Take Your Shoes Off Bot')
                    .setURL("https://rickglassman.com")
                    .setThumbnail(
                        `https://c10.patreonusercontent.com/4/patreon-media/p/campaign/3417482/048df8ece57f4466ba6e4fd0cedc699b/eyJ3IjoyMDB9/3.png?token-time=2145916800&token-hash=BFjY_lNn6R_whRq-nUNIoEwVA0LVVcPbnYBleHZ6JTU%3D`
                    )
                    .setDescription(
                        `TYSO is brought to you by:`
                    )
                    .addFields(fields)
                    .setTimestamp()
                    .setFooter("rickglassman.com/store");
                message.channel.send(promoEmbeddedResponse);
    }
};