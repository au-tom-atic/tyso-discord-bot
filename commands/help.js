const dotenv = require("dotenv");
const Discord = require("discord.js");
const fs = require('fs');
dotenv.config();

module.exports = {
    name: "help",
    aliases: ["h", "commands", "command", "cmds", "cmd"],
    description: "TYSO Bot Commands",
    example: "-help, -commands",
    cooldown: 5,
    args: false,
    async execute(message, args) {
            // get all commands, use discord collection
            const commands = new Discord.Collection();

            // load all commands from discord client into collection
            const commandFiles = fs.readdirSync("./commands").filter(file => file.endsWith(".js"));
            for (const file of commandFiles) {
                const command = require(`./${file}`);
                const help_fields = new Map();
                help_fields.set('description', command.description);
                help_fields.set('aliases', command.aliases);
                help_fields.set('example', command.example);
                commands.set(command.name, help_fields);
            }
            
            // create fields for embed
            const fields = [];
            // loop through commands
            for (const [name, help_fields] of commands) {
                // create field for command
                const field = {
                    name: name,
                    value: '**Aliases**: ' + help_fields.get('aliases') + '\n**Description**: ' 
                        + help_fields.get('description') + '\n**Example**: ' + help_fields.get('example')
                };
                // add field to fields
                fields.push(field);
            }
            // create embed
            const embed = new Discord.MessageEmbed()
                .setColor("#0099ff")
                .setTitle('TYSO Bot Help')
                .setDescription('All TYSO Bot Commands')
                .setFooter('https://rickglassman.com')
                .addFields(fields);
            // send embed
            message.channel.send(embed);
    }
};