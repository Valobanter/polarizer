const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, Events, GatewayIntentBits } = require('discord.js');
const { load } = require('./commands/index.js');

global.configFilePath = 'config.json'

process.argv.forEach(function (val, index, array) {
	if (index < 2) return;
	if (val == 'deploy') {
		require('./commands/deploy.js')();
		process.exit(0);
	}
	let splits = val.split('=');
	if (splits.length == 0) return;
	if (splits[0] == 'config') {
		let val = splits[1];
		for (let i = 1; i < splits.length; i++) val += '=' + splits[i];
		configFilePath = val;
	}
});

const { token } = require('./'+configFilePath);

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.cooldowns = new Collection();
client.commands = load();

client.once(Events.ClientReady, () => {
	console.log('Ready!');
});


client.on(Events.InteractionCreate, async interaction => {

	if (!interaction.isChatInputCommand()) return;

	const command = client.commands.get(interaction.commandName);

	if (!command) return;
	

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		if (interaction.replied || interaction.deferred) {
			await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
		} else {
			await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
		}
	}
});

client.login(token);
