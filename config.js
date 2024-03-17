const { PermissionsBitField } = require('discord.js');

const config = {
  defaultVolume: 150,
  defaultRepeatMode: 0,
  defaultLeaveOnEndCooldown: 180,
  defaultLeaveOnEmpty: true,
  defaultLeaveOnEmptyCooldown: 180,
  defaultUseThreadSessions: false,
  defaultThreadSessionStrictCommandChannel: false,
  plugins: {
    fileAttachments: true,
    youtube: true,
    soundCloud: false,
    appleMusic: true,
    vimeo: true,
    reverbNation: true,
    spotify: {
      enabled: true,
      clientId: 'ecbc88f9465a44b89ed9c0f7225375ad',
      clientSecret: '6851efbd13c0427b9ecd1fcaf4d97046',
    },
  },
 presence: {
    status: 'dnd',
    activities: [
      {
        name: '/play',
        type: 'PLAYING',
      },
      {
        name: 'BOT UNDER MAINTENANCE',
        type: 'LISTENING',
      },
      {
        name: 'Watching Videos',
        type: 'WATCHING',
      },
    ],
  },
  permissions: {
    ownerId: '1040792557199818842',
    developers: ['761635564835045387'],
  },
  supportServerInviteLink: 'https://discord.gg/CdCfgSC3qy',
  permissionsBase: [
    PermissionsBitField.Flags.ViewChannel,
    PermissionsBitField.Flags.SendMessages,
    PermissionsBitField.Flags.SendMessagesInThreads,
  ],
};

function changeActivities(client) {
  const interval = 3000; // 5 seconds

  setInterval(() => {
    const randomActivityIndex = Math.floor(Math.random() * config.presence.activities.length);
    client.user.setPresence({
      status: config.presence.status,
      activities: [config.presence.activities[randomActivityIndex]],
    });
  }, interval);
}

module.exports = config;
