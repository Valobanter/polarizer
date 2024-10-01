const {
    SlashCommandBuilder,
    EmbedBuilder
} = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('quote')
        .setDescription('Submit a quote')
        .addUserOption(option => option.setName('author').setDescription('Quote author').setRequired(true))
        .addStringOption(option => option.setName('content').setDescription('Quote content').setRequired(true)),
    
    async execute(interaction) {
        const content = interaction.options.getString('content');
        const author = interaction.options.getUser('author');
        // interaction.author.nickname + ' quoted...'
        const embed = new EmbedBuilder().setDescription(interaction.author.nickname + ' quoted...').setColor(0x175bc9).setTitle(content).setAuthor(author);
        await global.quoteChannel.send({ embeds: [embed] });
    }
};