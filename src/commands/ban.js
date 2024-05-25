// File: src/commands/ban.js

const { Client, Intents } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

client.once('ready', () => {
    console.log('Ready!');
});

client.on('interactionCreate', async (interaction) => {
    if (!interaction.isCommand()) return;

    const { commandName } = interaction;

    if (commandName === 'ban') {
        const user = interaction.options.getUser('user');
        const reason = interaction.options.getString('reason');

        if (!user) {
            return interaction.reply({ content: 'Please specify a user to ban.', ephemeral: true });
        }

        const member = interaction.guild.members.cache.get(user.id);

        if (member) {
            member.ban({ reason: reason })
                .then(() => {
                    interaction.reply({ content: `Successfully banned ${user.tag}.`, ephemeral: true });
                })
                .catch((error) => {
                    console.error(error);
                    interaction.reply({ content: 'There was an error while banning the user.', ephemeral: true });
                });
        } else {
            interaction.reply({ content: 'That user is not in this server.', ephemeral: true });
        }
    }
});

client.login('your-token-goes-here');