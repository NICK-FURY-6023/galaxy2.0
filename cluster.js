const { ShardingManager } = require('discord-hybrid-sharding');
const { existsSync } = require('fs');
require('dotenv').config({ path: existsSync('.env') ? '.env' : '.env.example' });
const { DISCORD_BOT_TOKEN } = process.env;

const manager = new ShardingManager('./src/index.js', {
  token: DISCORD_BOT_TOKEN,
  totalShards: 'auto', // Automatically determine the number of shards
});

manager.spawn();
