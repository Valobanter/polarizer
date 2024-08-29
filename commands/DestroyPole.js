const {
    SlashCommandBuilder
} = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('destroy-pole')
        .setDescription('Destroy a pole')
        .addStringOption(option => option.setName('thread').setDescription('Thread ID').setRequired(true)),
    async execute(interaction) {
        const query = interaction.options.getString('query');
        const maxSubmissions = interaction.options.getInteger('maxsubmissions');

        await interaction.reply('message');
    },
};