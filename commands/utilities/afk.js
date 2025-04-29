const Config = require("../../config");
const moment = require("moment");
const { MessageEmbed } = require("discord.js");

module.exports = {
  name: `userinfo`,
  description: `Displays information about a user.`,
  category: `information`,
  aliases: [`whois`, `info`],
  timeout: `5000`,
  usage: `userinfo\nuserinfo <mention>`,
  run: async (client, message, args) => {
    let taggedUser = message.mentions.members.first() || message.member;

    const embed = new MessageEmbed()
      .setColor(`${Config.DefaultEmbedColor}`)
      .setThumbnail(taggedUser.user.displayAvatarURL({ dynamic: true }))
      .setAuthor({
        name: `${taggedUser.user.tag}`,
        iconURL: taggedUser.user.displayAvatarURL({ dynamic: true }),
      })
      .addFields(
        {
          name: `Nickname`,
          value: taggedUser.nickname ? taggedUser.nickname : `None`,
          inline: true,
        },
        { name: `ID`, value: taggedUser.id, inline: true },
        {
          name: `Account Created On`,
          value: `<t:${moment
            .utc(taggedUser.user.createdAt)
            .unix()}:F>\n<t:${moment.utc(taggedUser.user.createdAt).unix()}:R>`,
          inline: false,
        },
        {
          name: `Joined Server On`,
          value: `<t:${moment.utc(taggedUser.joinedAt).unix()}:F>\n<t:${moment
            .utc(taggedUser.joinedAt)
            .unix()}:R>`,
          inline: true,
        },
        {
          name: `Roles`,
          value:
            taggedUser.roles.cache.map((role) => role.toString()).join(", ") ||
            "None",
          inline: false,
        },
        {
          name: `Bot`,
          value: taggedUser.user.bot ? "Yes" : "No",
          inline: true,
        },
        {
          name: `Status`,
          value: taggedUser.presence?.status || "Offline",
          inline: true,
        },
        {
          name: `Activity`,
          value: taggedUser.presence?.activities[0]?.name || "None",
          inline: true,
        }
      )
      .setFooter({
        text: `${client.user.tag}`,
        iconURL: client.user.displayAvatarURL({ dynamic: true }),
      })
      .setTimestamp();

    message.channel.send({ embeds: [embed] });
  },
};
