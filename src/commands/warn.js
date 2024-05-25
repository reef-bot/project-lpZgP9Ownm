// File: src/commands/warn.js

const { Client, Message } = require('discord.js');
const moment = require('moment');

/**
 * Warn a user for inappropriate behavior.
 * @param {Client} client - The Discord client
 * @param {Message} message - The message that triggered the command
 * @param {Array<string>} args - The command arguments
 */
const warnCommand = (client, message, args) => {
    if (!message.member.hasPermission('KICK_MEMBERS')) {
        return message.reply('You do not have permission to warn members.');
    }

    const targetUser = message.mentions.users.first();
    if (!targetUser) {
        return message.reply('Please mention the user to warn.');
    }

    const reason = args.slice(1).join(' ') || 'No reason provided';
    const warnTime = moment().format('MMMM Do YYYY, h:mm:ss a');

    // Save the warning to the database
    const warnData = {
        userId: targetUser.id,
        moderatorId: message.author.id,
        reason,
        time: warnTime,
    };

    // Here you would save the warnData to the database using MongoDB

    message.channel.send(`User ${targetUser.tag} has been warned. Reason: ${reason}`);
};

module.exports = warnCommand;