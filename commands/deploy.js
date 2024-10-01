const { REST, Routes } = require('discord.js');
const { clientId, token } = require('../config.json');
const { deploy } = require('./index.js');
const fs = require('node:fs');
const path = require('node:path');

const commands = deploy();
const rest = new REST().setToken(token);

try {
	console.log(`Started refreshing ${commands.length} application (/) commands.`);
	const data = rest.put(
		Routes.applicationCommands(clientId),
		{ body: commands },
	);
	console.log(`Successfully reloaded ${data.length} application (/) commands.`);
} catch (error) {
	console.error(error);
}
