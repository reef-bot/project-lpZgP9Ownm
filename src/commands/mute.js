// File: mute.js

// Import necessary packages and modules
const Discord = require('discord.js');
const moment = require('moment');
const winston = require('winston');
const dotenv = require('dotenv');
const axios = require('axios');

// Import database utilities
const { queryDB } = require('../../database/utils/queryDB');

// Define the mute command logic
const muteCommand = async (message, args) => {
  try {
    // Check if the user has the necessary permissions to use the command
    if (!message.member.hasPermission('MANAGE_MESSAGES')) {
      return message.reply('You do not have permission to use this command.');
    }

    // Check if the user mentions a member to mute
    const target = message.mentions.members.first();
    if (!target) {
      return message.reply('Please mention a member to mute.');
    }

    // Get the mute role from the server settings
    const muteRole = message.guild.roles.cache.find(role => role.name === 'Muted');

    // Check if the mute role exists, if not create it
    if (!muteRole) {
      return message.reply('The mute role does not exist. Please create it before using this command.');
    }

    // Mute the target member by adding the mute role
    await target.roles.add(muteRole);

    // Log the mute action in the database
    const logEntry = {
      user: message.author.tag,
      action: 'mute',
      target: target.user.tag,
      timestamp: moment().format('MMMM Do YYYY, h:mm:ss a'),
    };
    await queryDB('log', logEntry);

    return message.reply(`${target.user.tag} has been muted.`);
  } catch (error) {
    winston.error(`An error occurred in the mute command: ${error}`);
    return message.reply('An error occurred while processing the command. Please try again later.');
  }
};

// Export the mute command function
module.exports = {
  name: 'mute',
  description: 'Mute a member in the server.',
  execute: muteCommand,
};