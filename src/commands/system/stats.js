const os = require('os');
const osUtils = require('os-utils');
const { ChatInputCommand } = require('../../classes/Commands');
const { stripIndents } = require('common-tags');
const { version } = require('discord.js');
const { BYTES_IN_KIB } = require('../../constants');
const { colorResolver, msToHumanReadableTime } = require('../../util');

const discordVersion = version.indexOf('dev') < 0 ? version : version.slice(0, version.indexOf('dev') + 3);
const discordVersionDocLink = `https://discord.js.org/#/docs/discord.js/v${discordVersion.split('.')[0]}/general/welcome`;
const nodeVersionDocLink = `https://nodejs.org/docs/latest-${process.version.split('.')[0]}.x/api/#`;

module.exports = new ChatInputCommand({
  global: true,
  cooldown: {
    type: 'channel',
    usages: 1,
    duration: 30
  },
  clientPerms: ['EmbedLinks'],
  alias: ['ping'],
  data: { description: 'Displays bot stats' },

  run: async (client, interaction) => {
    const { emojis } = client.container;

    // Calculating our API latency
    const latency = Math.round(client.ws.ping);
    const sent = await interaction.reply({
      content: 'Pinging...',
      fetchReply: true
    });
    const fcLatency = sent.createdTimestamp - interaction.createdTimestamp;

    // Utility function for getting appropriate status emojis
    const getMsEmoji = (ms) => {
      let emoji = undefined;

      for (const [key, value] of Object.entries({
        250: '🟢',
        500: '🟡',
        1000: '🟠'
      })) if (ms <= key) {
        emoji = value;
        break;
      }
      return (emoji ??= '🔴');
    };

    // Memory Variables
    const memoryUsage = process.memoryUsage();
    const memoryUsedInMB = (memoryUsage.heapUsed / BYTES_IN_KIB / BYTES_IN_KIB) * 100;
    const memoryAvailableInMB = (memoryUsage.heapTotal / BYTES_IN_KIB / BYTES_IN_KIB) * 100;
    const totalMemoryInGB = os.totalmem() / (1024 ** 3);
    const memoryUsagePercent = (memoryUsedInMB / totalMemoryInGB) * 100;
    const objCacheSizeInMB = (memoryUsage.external / BYTES_IN_KIB / BYTES_IN_KIB) * 100;

    // CPU Variables
    const cpuInfo = os.cpus()[0];
    const cpuCores = os.cpus().length;
    const cpuModel = cpuInfo.model;
    const cpuSpeed = ((cpuInfo.speed / 1000) * 100).toFixed(2); // Convert to GHz and percentage
    let cpuUsagePercent = 0;
    osUtils.cpuUsage(function (v) {
      cpuUsagePercent = v * 100;
    });

    // Get individual CPU core usage with user percentage
    const cpuCoreUsage = os.cpus().map((core, index) => `📈 Core ${index + 1}: 💻 User: ${core.times.user / 1000}s (${((core.times.user / (core.times.user + core.times.sys + core.times.idle)) * 100).toFixed(2)}%) | ⚙️ Sys: ${core.times.sys / 1000}s | 😴 Idle: ${core.times.idle / 1000}s`);

    // Get OS and disk information
    const totalDiskSpaceGB = os.totalmem() / (1024 ** 3);
    const freeDiskSpaceGB = os.freemem() / (1024 ** 3);
    const totalDiskUsagePercent = ((totalDiskSpaceGB - freeDiskSpaceGB) / totalDiskSpaceGB) * 100;

    // Bot Uptime
    const botUptime = msToHumanReadableTime(client.uptime, { long: true });
    const botOnlineDuration = msToHumanReadableTime(Date.now() - client.readyTimestamp);
    const systemUptime = msToHumanReadableTime(os.uptime() * 1000, { long: true });

    // Bot Ping
    const botPing = latency;

    // Replying to the interaction with our embed data
    interaction.editReply({
      content: '\u200b',
      embeds: [
        {
          color: colorResolver(),
          author: {
            name: `${client.user.username}`,
            iconURL: client.user.displayAvatarURL()
          },
          fields: [
            {
              name: 'Latency',
              value: stripIndents`
                ${getMsEmoji(latency)} **API Latency:** ${latency} ms
                ${getMsEmoji(fcLatency)} **Full Circle Latency:** ${fcLatency} ms
              `,
              inline: true
            },
            {
              name: 'Memory',
              value: stripIndents`
                💾 **Memory Usage:** ${memoryUsedInMB.toFixed(2)}%
                📊 **Total Memory:** ${totalMemoryInGB.toFixed(2)} GB
                📈 **Memory Usage Percentage:** ${memoryUsagePercent.toFixed(2)}%
                ♻️ **Cache Size:** ${objCacheSizeInMB.toFixed(2)}%
              `,
              inline: true
            },
            {
              name: 'CPU',
              value: stripIndents`
                💻 **CPU Cores:** ${cpuCores}
                🔄 **CPU Model:** ${cpuModel}
                ⚡ **CPU Speed:** ${cpuSpeed}%
                📈 **CPU Usage:** ${cpuUsagePercent.toFixed(2)}%
                ${cpuCoreUsage.join('\n')}
              `,
              inline: true
            },
            {
              name: 'System',
              value: stripIndents`
                ⚙️ **Discord.js Version:** [v${discordVersion}](${discordVersionDocLink})
                ⚙️ **Node Version:** [${process.version}](${nodeVersionDocLink})
                🖥️ **OS Platform:** ${os.platform()} ${os.arch()}
                🧮 **Total Disk Space:** ${totalDiskSpaceGB.toFixed(2)} GB
                📊 **Free Disk Space:** ${freeDiskSpaceGB.toFixed(2)} GB
                📈 **Disk Usage Percentage:** ${totalDiskUsagePercent.toFixed(2)}%
                🕒 **System Uptime:** ${systemUptime}
              `,
              inline: true
            },
            {
              name: 'Stats',
              value: stripIndents`
                👪 **Servers:** ${client.guilds.cache.size.toLocaleString('en-US')}
                🙋 **Users:** ${client.guilds.cache.reduce((previousValue, currentValue) => previousValue += currentValue.memberCount, 0).toLocaleString('en-US')}
                🤖 **Bot Version:** 1.8.7
                🚀 **Bot Ping:** ${botPing} ms
              `,
              inline: true
            }
          ],
          footer: { text: `Made with ❤️ by ₦ł₵₭  ₣ɄⱤɎ ${emojis.separator} Open to collaborate ${emojis.separator}` }
        }
      ]
    });
  }
});
