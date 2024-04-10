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
      clientId: 'paste id',
      clientSecret: 'paste key',
    },
  },
  presence: {
    status: 'online',
    activities: [
      {
        name: '/play',
        type: 'PLAYING',
      },
      {
        name: 'BOT UNDER MAINTENCE',
        type: 'LISTENING',
      },
      {
        name: 'Watching Videos',
        type: 'WATCHING',
      },
    ],
  },
  permissions: {
    ownerId: '761635564835045387',
    developers: ['947891831516065834'],
  },
  supportServerInviteLink: 'https://discord.gg/CdCfgSC3qy',
  permissionsBase: [
    PermissionsBitField.Flags.ViewChannel,
    PermissionsBitField.Flags.SendMessages,
    PermissionsBitField.Flags.SendMessagesInThreads,
  ],
};

function changeActivities(client) {
  const interval = 5000; // 5 seconds

  setInterval(() => {
    const randomActivity = Math.floor(Math.random() * config.presence.activities.length);
    config.presence.activities[0] = config.presence.activities[randomActivity];
 //   client.user.setPresence(config.presence);
  }, interval);
}

changeActivities();

module.exports = config;
