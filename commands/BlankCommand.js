const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('name')
        .setDescription('Descritpion')
        .addStringOption(option => 
            option.setName("stringName")
                .setRequired(true)
                .addChoices(
                    { name: 'example 0', value: "0" },
                    { name: 'example 1', value: "1" },
                ))
        .addIntegerOption(option => 
            option.setName("intName")
                .setRequired(true)
                .addChoices(
                    { name: 'example 0', value: 0 },
                    { name: 'example 1', value: 1 },
                ))
        .addUserOption(option => 
            option.setName('user')
                .setRequired(true)),

    async execute(interaction) {
        const string = interaction.options.getString('stringName');
        const integer = interaction.options.getInteger('intName');
        const user = interaction.options.getUser('user');

        await interaction.reply("message");
    },
};