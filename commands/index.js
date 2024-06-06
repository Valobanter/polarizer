const fs = require('node:fs');
const path = require('node:path');
const {Collection} = require('discord.js');

module.exports = {
	load: function() {
		let dir = path.join(__dirname);
		let commands = new Collection();
		let entries = fs.readdirSync(dir, { withFileTypes: true, recursive: true });
		for (let entry of entries) {
			if (!entry.isFile() || entry.name == 'index.js' || entry.name == 'deploy.js') continue;
			let file = path.join(entry.parentPath, entry.name);
			let command = require(file);
			if ('data' in command && 'execute' in command) commands.set(command.data.nname, command);
			else console.log(`[WARNING] The command at ${path} is missing atleast one required property`);
		}
		return commands;
	},
	deploy: function() {
		let dir = path.join(__dirname);
		let commands = [];
		let entries = fs.readdirSync(dir, { withFileTypes: true, recursive: true });
		for (let entry of entries) {
			if (!entry.isFile() || entry.name == 'index.js' || entry.name == 'deploy.js') continue;
			let file = path.join(entry.parentPath, entry.name);
			let command = require(file);
			if ('data' in command && 'execute' in command) commands.push(command.data.toJSON());
			else console.log(`[WARNING] The command at ${path} is missing atleast one required property`);
		}
		return commands;
	}
};

