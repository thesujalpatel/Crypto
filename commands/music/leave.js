const { MessageEmbed } = require("discord.js");
const { getVoiceConnection } = require("@discordjs/voice");
const Config = require("../../config");

module.exports = {
  name: `leave`,
  description: `Leaves the voice channel.`,
  category: `music`,
  aliases: [`disconnect`, `dc`],
  timeout: `5000`,
  usage: `leave`,
  run: async (_, message) => {
    const connection = getVoiceConnection(message.guild.id);
    if (!connection) {
      return message.channel.send({
        embeds: [
          new MessageEmbed()
            .setColor(`${Config.DefaultEmbedColor}`)
            .setDescription(`I am not in a voice channel.`),
        ],
      });
    }
    connection.destroy();
    message.channel.send({
      embeds: [
        new MessageEmbed()
          .setColor(`${Config.DefaultEmbedColor}`)
          .setDescription(`Left the voice channel.`),
      ],
    });
  },
};
