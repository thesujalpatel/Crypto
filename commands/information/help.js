const Config = require("../../config");
const { MessageEmbed } = require("discord.js");

module.exports = {
  name: `help`,
  description: `Displays the help menu.`,
  category: `information`,
  aliases: [`commands`, `h`],
  timeout: `5000`,
  usage: `help\nhelp <command>`,
  run: async (client, message, args) => {
    const prefix = Config.Prefix;
    const commandName = args[0];
    const command =
      client.commands.get(commandName) ||
      client.commands.find(
        (cmd) => cmd.aliases && cmd.aliases.includes(commandName)
      );

    if (command) {
      const embed = new MessageEmbed()
        .setColor(`${Config.DefaultEmbedColor}`)
        .setTitle(`Command: ${command.name}`)
        .setDescription(
          `**Description:** ${command.description}\n**Category:** ${
            command.category
          }\n**Aliases:** ${
            command.aliases ? command.aliases.join(", ") : "None"
          }\n**Usage:** ${prefix}${command.usage}`
        )
        .setFooter({
          text: `${client.user.tag}`,
          iconURL: client.user.displayAvatarURL({ dynamic: true }),
        })
        .setTimestamp();

      return message.channel.send({ embeds: [embed] });
    }

    const embed = new MessageEmbed()
      .setColor(`${Config.DefaultEmbedColor}`)
      .setTitle(`Help Menu`)
      .setDescription(
        `Use \`${prefix}help <command>\` for more information on a specific command.`
      )
      .addFields({
        name: "Commands",
        value:
          client.commands
            .map((cmd) => `\`${cmd.name}\`: ${cmd.description}`)
            .join("\n") || "No commands available.",
      })
      .setFooter({
        text: `${client.user.tag}`,
        iconURL: client.user.displayAvatarURL({ dynamic: true }),
      })
      .setTimestamp();

    message.channel.send({ embeds: [embed] });
  },
};
