// File: src/commands/clear.js

const { Permissions } = require('discord.js');

module.exports = {
  name: 'clear',
  description: 'Clear chat messages',
  usage: '<number of messages to clear>',
  execute(message, args) {
    if (!message.member.permissions.has(Permissions.FLAGS.MANAGE_MESSAGES)) {
      return message.reply('You do not have permission to use this command.');
    }

    const amount = parseInt(args[0]) + 1;

    if (isNaN(amount)) {
      return message.reply('Please provide a valid number of messages to clear.');
    } else if (amount <= 1 || amount > 100) {
      return message.reply('You can only delete between 1 and 99 messages at a time.');
    }

    message.channel.bulkDelete(amount, true).catch((err) => {
      console.error(err);
      message.channel.send('There was an error trying to clear messages in this channel.');
    });
  },
};