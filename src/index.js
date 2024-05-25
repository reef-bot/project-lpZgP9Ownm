// index.js

// Import necessary packages and files
const Discord = require('discord.js');
const dotenv = require('dotenv');
const bot = require('./bot');
const { connectDB } = require('../database/utils/connectDB');

// Load environment variables
dotenv.config();

// Create a new Discord client
const client = new Discord.Client();

// Event listener when the bot is ready
client.once('ready', () => {
    console.log('Bot is online and ready to moderate!');
});

// Event listener for incoming messages
client.on('message', async (message) => {
    // Check if the message is a command and process it
    if (message.content.startsWith(process.env.PREFIX)) {
        bot.processCommand(message);
    }
});

// Log in to Discord with the bot token
client.login(process.env.DISCORD_TOKEN);

// Connect to the MongoDB database
connectDB();

// Export the client for use in other files
module.exports = { client };