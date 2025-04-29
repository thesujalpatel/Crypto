const Config = require("../../config");
const Discord = require("discord.js");
const moment = require("moment");

module.exports = {
  name: `userinfo`,
  description: `Displays information about a user.`,
  category: `information`,
  aliases: [`whois`, `info`],
  timeout: `5000`,
  usage: `userinfo\nuserinfo <mention>`,
  run: async (client, message, args) => {
    let taggedUser = message.mentions.members.first() || message.member;

    message.channel.send({
      embeds: [
        new Discord.MessageEmbed()
          .setColor(`${Config.DefaultEmbedColor}`)
          .setThumbnail(taggedUser.user.displayAvatarURL({ dynamic: true }))
          .setAuthor(
            `${taggedUser.user.tag}`,
            taggedUser.user.displayAvatarURL({ dynamic: true })
          )
          .addField(
            `Nickname`,
            taggedUser.nickname ? taggedUser.nickname : `None`,
            true
          )
          .addField(`ID`, taggedUser.id, true)
          .addField(
            `Account Created On`,
            `<t:${moment.utc(taggedUser.user.createdAt).unix()}:F>\n<t:${moment
              .utc(taggedUser.user.createdAt)
              .unix()}:R>`,
            false
          )
          .addField(
            `Joined Server On`,
            `<t:${moment.utc(taggedUser.joinedAt).unix()}:F>\n<t:${moment
              .utc(taggedUser.joinedAt)
              .unix()}:R>`,
            true
          )
          .addField(
            `Roles`,
            taggedUser.roles.cache.map((role) => role.toString()).join(", ") ||
              "None",
            false
          )
          .addField(`Bot`, taggedUser.user.bot ? "Yes" : "No", true)
          .addField(`Status`, taggedUser.presence?.status || "Offline", true)
          .addField(
            `Activity`,
            taggedUser.presence?.activities[0]?.name || "None",
            true
          )
          .setFooter(
            `${client.user.tag}`,
            client.user.displayAvatarURL({ dynamic: true })
          )
          .setTimestamp(),
      ],
    });
  },
};
