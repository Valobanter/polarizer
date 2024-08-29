const path = require('node:path');
const {
	Client,
	Collection,
	Events,
	GatewayIntentBits
} = require('discord.js');
const {
	load
} = require('./commands/index.js');

const {
	token
} = require('./config.json');

const client = new Client({
	intents: [GatewayIntentBits.Guilds]
});

client.cooldowns = new Collection();
client.commands = load();

client.once(Events.ClientReady, () => {
	console.log('Ready!');
})

client.on(Events.InteractionCreate, async interaction => {
	if (!interaction.isChatInputCommand()) return;
	const command = client.commands.get(interaction.commandName);
	if (!command) return;
	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		if (interaction.replied || interaction.deferred) {
			await interaction.followUp({
				content: 'There was an error while executing this command!',
				ephemeral: true
			});
		} else {
			await interaction.reply({
				content: 'There was an error while executing this command!',
				ephemeral: true
			});
		}
	}
});

client.login(token);