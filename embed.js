const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const { sym } = require('./function');

/**
 * Creates a dictionary embed message.
 * @param {string} word - The word to define.
 * @param {string} definition - The definition of the word.
 * @param {string} partOfSpeech - (Optional) The part of speech.
 * @param {string} example - (Optional) An example sentence.
 * @returns {EmbedBuilder} - A Discord embed object.
 */
function EmbedBuilder_Dictionary(word, definition, partOfSpeech = '', example = '', client) {
    const embed = new EmbedBuilder()
        .setColor(0x1f8b4c) // Green color
        .setTitle(`${sym}Words : ${word}${sym}`)
        .setDescription(definition)
        .setFooter({
            text: 'Powered by https://discordsale.pages.dev/',
            iconURL: client.user.avatarURL({ format: 'png', size: 128 }),
        })
        .setTimestamp();

    if (partOfSpeech) {
        embed.addFields({ name: 'Part of Speech', value: `**${partOfSpeech}**`, inline: true });
    }

    if (example) {
        embed.addFields({ name: 'Example', value: `**${example}**`, inline: false });
    }

        const button = new ButtonBuilder()
        .setLabel('Anonymous Sale')
        .setStyle(ButtonStyle.Link)
        .setURL('https://discordsale.pages.dev/')

    const actionRow = new ActionRowBuilder().addComponents(button);

    return { embed, actionRow };
}

module.exports = { EmbedBuilder_Dictionary };