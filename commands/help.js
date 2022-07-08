const dotenv = require("dotenv");
const Discord = require("discord.js");
const fs = require('fs');
dotenv.config();

module.exports = {
    name: "help",
    aliases: ["h", "commands", "command", "cmds", "cmd"],
    description: "TYSO Bot Commands",
    cooldown: 5,
	args: true,
	async execute(message, args) {
		// check if a command parameter exists in request
		if (args.length > 0) {
			// search for command in list of files and return name of file withouth .js 
			const command_file = fs.readdirSync('./commands').filter(file => file !== 'help.js').find(file => file.replace('.js', '') === args[0]);
			// load command file, return name, description and aliases
			const command = require(`./${command_file}`);
			// create embed
			const embed = new Discord.MessageEmbed()
				.setColor("#0099ff")
				.setTitle(`${command.name}`)
				.setDescription(`**Aliases**: ${command.aliases}\n**Description**: ${command.description}`)
				.setFooter('https://rickglassman.com');
			// send embed
			message.channel.send(embed);
			
		} else {
			// no command to search for, return list of all commands
			// get all commands, use discord collection
			const commands = new Discord.Collection();

			// load all commands from discord client into collection
			const commandFiles = fs.readdirSync("./commands").filter(file => file.endsWith(".js"));
			for (const file of commandFiles) {
				const command = require(`./${file}`);
				commands.set(command.name, command.description, command.aliases);
			}
			
			// create fields for embed
			const fields = [];
			// loop through commands
			for (const [name, description, aliases] of commands) {
				// create field for command
				const field = {
					name: name,
					value: '**Aliases**: ' + aliases + '\n**Description**: ' + description,
					inline: true
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
    }
};