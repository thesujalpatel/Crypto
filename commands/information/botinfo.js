const Config = require("../../config");
const Discord = require("discord.js");
const Package = require("../../package.json");
const os = require("os");

module.exports = {
  name: `botinfo`,
  description: `Displays information about the bot.`,
  category: `information`,
  aliases: [`bot`, `uptime`],
  timeout: `20000`,
  usage: `botinfo`,
  run: async (client, message, args) => {
    let totalSeconds = client.uptime / 1000;
    let days = Math.floor(totalSeconds / 86400);
    totalSeconds %= 86400;
    let hours = Math.floor(totalSeconds / 3600);
    totalSeconds %= 3600;
    let minutes = Math.floor(totalSeconds / 60);
    let seconds = Math.floor(totalSeconds % 60);

    const memoryUsage = (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(
      2
    );
    const totalMemory = (os.totalmem() / 1024 / 1024).toFixed(2);
    const cpuModel = os.cpus()[0].model;
    const platform = os.platform();
    const nodeVersion = process.version;

    message.channel.send({
      embeds: [
        new Discord.MessageEmbed()
          .setColor(`${Config.DefaultEmbedColor}`)
          .setAuthor(
            `${message.author.tag}`,
            message.author.displayAvatarURL({ dynamic: true })
          )
          .setTitle(`Bot Information`)
          .addField(`Bot Created By`, Package.author, true)
          .addField(`Discord.js Version`, Discord.version, true)
          .addField(`Bot Version`, Package.version, true)
          .addField(`Node.js Version`, nodeVersion, true)
          .addField(`Platform`, platform, true)
          .addField(`CPU`, cpuModel, false)
          .addField(
            `Memory Usage`,
            `${memoryUsage} MB / ${totalMemory} MB`,
            true
          )
          .addField(
            `Uptime`,
            `**${days}d ${hours}h ${minutes}m ${seconds}s**`,
            false
          )
          .addField(`Total Servers`, `${client.guilds.cache.size}`, true)
          .addField(`Total Channels`, `${client.channels.cache.size}`, true)
          .addField(`Total Users`, `${client.users.cache.size}`, true)
          .setFooter(
            `${client.user.tag}`,
            client.user.displayAvatarURL({ dynamic: true })
          )
          .setTimestamp(),
      ],
    });
  },
};
