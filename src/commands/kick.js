// File: kick.js

const { Client, Intents, MessageEmbed } = require('discord.js');

module.exports = {
  name: 'kick',
  description: 'Kick a user from the server',
  async execute(message, args) {
    if (!message.member.hasPermission('KICK_MEMBERS')) {
      return message.reply('You do not have permission to kick members');
    }

    const user = message.mentions.users.first();
    if (!user) {
      return message.reply('You need to mention a user to kick');
    }

    const member = message.guild.members.cache.get(user.id);
    if (!member) {
      return message.reply('That user is not in this server');
    }

    if (!member.kickable) {
      return message.reply('I cannot kick that user');
    }

    try {
      await member.kick();
      const kickEmbed = new MessageEmbed()
        .setColor('#ff0000')
        .setTitle('User Kicked')
        .setDescription(`${user.tag} has been kicked from the server`)
        .setTimestamp();
      message.channel.send(kickEmbed);
    } catch (error) {
      console.error(`Error kicking user: ${error}`);
      message.reply('There was an error kicking that user');
    }
  },
};