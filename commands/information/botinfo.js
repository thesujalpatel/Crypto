const Config = require('../../config');
const Discord = require('discord.js');
const Package = require('../../package.json');

module.exports = {
    name: `botinfo`,
    description: ``,
    category: `information`,
    aliases: [`bot`, `uptime`],
    timeout: `20000`,
    usage: `botinfo`,
    run: async (client, message, args) => {
        let totalSeconds = (client.uptime / 1000);
        let days = Math.floor(totalSeconds / 86400);
        totalSeconds %= 86400;
        let hours = Math.floor(totalSeconds / 3600);
        totalSeconds %= 3600;
        let minutes = Math.floor(totalSeconds / 60);
        let seconds = Math.floor(totalSeconds % 60);
        message.channel.send({
            embeds: [
                new Discord.MessageEmbed()
                    .setColor(`${Config.DefaultEmbedColor}`)
                    .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))
                    .addField(`Bot Created By`, Package.author, true)
                    .addField(`Discord Virson`, Discord.version, false)
                    .addField(`Bot Virson`, Package.version, true)
                    .addField(`Uptime`, `My latest code has been hosting for **${days}days ${hours}hours ${minutes}minutes ${seconds}seconds**`, false)
                    .setFooter(`${client.user.tag}`, client.user.displayAvatarURL({ dynamic: true }))
                    .setTimestamp()
            ]
        }
        )
    }
}