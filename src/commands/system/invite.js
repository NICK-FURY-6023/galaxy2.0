const { getBotInviteLink, colorResolver } = require('../../util');
const { ChatInputCommand } = require('../../classes/Commands');

module.exports = new ChatInputCommand({
  global: true,
  cooldown: {
    type: 'guild',
    usages: 3,
    duration: 10
  },
  clientPerms: ['EmbedLinks'],
  data: { description: 'Add the bot to your server!' },

  run: async (client, interaction) => {
    interaction.reply({
      embeds: [
        {
          color: colorResolver(client.container.colors.invisible),
          description: '[Add me to your server](https://discord.com/api/oauth2/authorize?client_id=1044596050859663401&permissions=41375902330737&redirect_uri=https%3A%2F%2Fdiscord.gg%2FCdCfgSC3qy&response_type=code&scope=bot%20applications.commands%20guilds.join%20identify)',
        },
        {
          color: colorResolver(client.container.colors.invisible),
          description: '[Vote for me on Top.gg](https://top.gg/bot/1044596050859663401/vote)',
        },
        {
          color: colorResolver(client.container.colors.invisible),
          description: '[Vote for me on Discord.ly](https://discord.ly/galaxy-0786)',
        },
        {
          color: colorResolver(client.container.colors.invisible),
          description: '[Vote for me on Discord.com](https://discords.com/bots/bot/1044596050859663401)',
        },
      ],
    });
  },
});
