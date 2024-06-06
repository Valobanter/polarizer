const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
	.setName('make-pole')
        .setDescription('Create a new pole')
        .addStringOption(option => option.setName('query').setDescription('Query').setRequired(true))
        .addIntegerOption(option => option.setName('maxsubmissions').setDescription('Max submissions per user').setRequired(true)),

    async execute(interaction) {
        const query = interaction.options.getString('query');
        const maxSubmissions = interaction.options.getInteger('maxsubmissions');

        await interaction.reply('message');
    },
};
