const { colorResolver } = require('../../util');
const { ChatInputCommand } = require('../../classes/Commands');

module.exports = new ChatInputCommand({
  global: true,
  cooldown: {
    type: 'guild',
    usages: 3,
    duration: 10
  },
  clientPerms: ['EmbedLinks'],
  data: { description: 'Vote for the bot!' },

  voteLinks: [
    {
      name: "Top.gg",
      link: "https://top.gg/bot/your-bot-id/vote",
      emoji: "🔼", // Add emoji here
    },
    {
      name: "discord.ly",
      link: "https://discord.ly/galaxy-0786",
      emoji: "👍", // Add emoji here
    },
    {
      name: "discords.com",
      link: "https://discords.com/bots/bot/1044596050859663401",
      emoji: "⭐", // Add emoji here
    }
  ],

  run: async (client, interaction) => {
    const voteLinksText = this.voteLinks
      .map((link) => `${link.emoji} [Vote on ${link.name}](${link.link})`)
      .join('\n');

    interaction.reply({
      embeds: [
        {
          color: colorResolver(client.container.colors.invisible),
          description: voteLinksText,
        },
      ],
    });
  },
});
