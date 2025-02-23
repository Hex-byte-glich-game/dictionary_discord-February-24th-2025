require('dotenv').config();
const { Client, GatewayIntentBits } = require('discord.js');
const axios = require('axios');
const { EmbedBuilder_Dictionary } = require('./embed');

// Load environment variables
const DISCORD_BOT_TOKEN = process.env.DISCORD_BOT_TOKEN;
const DICTIONARY_API_URL = 'https://api.dictionaryapi.dev/api/v2/entries/en';

// Create a new Discord client instance
const client = new Client({ 
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ] });

// Function to fetch word definition
//async function getDefinition(word) {
//    try {
//        const response = await axios.get(`${DICTIONARY_API_URL}/${word}`);
//        const definition = response.data[0].meanings[0].definitions[0].definition;
//        return definition;
//    } catch (error) {
//        console.error(error.message);
//        return "Sorry, I couldn't find that word.";
//    }
//}

// Event: Bot is ready
client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

// Event: Message received
client.on('messageCreate', async (message) => {
    if (message.author.bot) return;

    if (message.content.startsWith('!define')) {
        const word = message.content.slice(8).trim();
        if (!word) {
            message.reply('Please provide a word to define, e.g., `!define example`.');
            return;
        }

        // Fetch definition from the dictionary API
        const definitionResponse = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
        if (definitionResponse.status === 200) {
            const data = definitionResponse.data[0];
            const definition = data.meanings[0].definitions[0].definition;
            const partOfSpeech = data.meanings[0].partOfSpeech || '';
            const example = data.meanings[0].definitions[0].example || '';

            // Build the embed
            const { embed, actionRow } = EmbedBuilder_Dictionary(word, definition, partOfSpeech, example, client);

            // Send the embed
            message.channel.send({ embeds: [embed], components: [actionRow] });
        } else {
            message.reply('Sorry, I couldn’t find that word.');
        }
    }
});


// Login to Discord
client.login(DISCORD_BOT_TOKEN);
