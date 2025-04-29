const { MessageEmbed } = require("discord.js");
const { joinVoiceChannel } = require("@discordjs/voice");
const Config = require("../../config");
const { getVoiceConnection } = require("@discordjs/voice");

module.exports = {
  name: `join`,
  description: `Joins the voice channel you are in.`,
  category: `music`,
  aliases: [`connect`, `summon`],
  timeout: `5000`,
  usage: `join`,
  run: async (_, message) => {
    const voiceChannel = message.member.voice.channel;
    if (!voiceChannel) {
      return message.channel.send({
        embeds: [
          new MessageEmbed()
            .setColor(`${Config.DefaultEmbedColor}`)
            .setDescription(
              `You need to be in a voice channel to use this command.`
            ),
        ],
      });
    }
    const connection = getVoiceConnection(message.guild.id);
    if (connection) {
      return message.channel.send({
        embeds: [
          new MessageEmbed()
            .setColor(`${Config.DefaultEmbedColor}`)
            .setDescription(`I am already in a voice channel.`),
        ],
      });
    }
    try {
      const channel = voiceChannel.id;
      joinVoiceChannel({
        channelId: channel,
        guildId: message.guild.id,
        adapterCreator: message.guild.voiceAdapterCreator,
        selfDeaf: false,
        selfMute: false,
      });
      message.channel.send({
        embeds: [
          new MessageEmbed()
            .setColor(`${Config.DefaultEmbedColor}`)
            .setDescription(`Joined the voice channel.`),
        ],
      });
    } catch (error) {
      console.error(error);
      message.channel.send({
        embeds: [
          new MessageEmbed()
            .setColor(`${Config.DefaultEmbedColor}`)
            .setDescription(`Failed to join the voice channel.`),
        ],
      });
    }
  },
};
