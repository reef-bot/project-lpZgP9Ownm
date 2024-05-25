// src/features/antiRaid.js

const { Client } = require('discord.js');
const client = new Client();
const moment = require('moment');
const winston = require('winston');
const dotenv = require('dotenv');
const axios = require('axios');

dotenv.config();

client.on('ready', () => {
  winston.info('Anti-Raid feature is now active');
});

client.on('guildMemberAdd', (member) => {
  const joinDate = moment(member.joinedAt).format('MMMM Do YYYY, h:mm:ss a');
  if (member.guild.memberCount > 100) {
    member.send('Welcome to the server! Please introduce yourself in the introductions channel.');
  }
});

client.login(process.env.DISCORD_TOKEN);