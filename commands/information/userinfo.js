const Config = require('../../config')
const Discord = require('discord.js')
const moment = require('moment')
const map = require('map')
const { user } = require('../../indax')

module.exports = {
    name: `userinfo`,
    description: ``,
    category: `information`,
    aliases: [`whois`, `info`],
    timeout: `5000`,
    usage: `userinfo\nuserinfo <mention>`,
    run: async (client, message, args) => {

        let taggedUser = message.mentions.members.first() || message.author;
        message.channel.send({
            embeds: [
                new Discord.MessageEmbed()
                    .setColor(`${Config.DefaultEmbedColor}`)
                    .setThumbnail(taggedUser.displayAvatarURL({ dynamic: true }))
                    .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))
                    //.addField(`Nick name`,taggedUser.nickname !== null ? `${message.nickname}` : `None`,true )
                    .addField(`ID`, taggedUser.id, true)
                    .addField(`Account Created On`, `<t:${moment.utc(taggedUser.createdAt).unix()}:F>\n<t:${moment.utc(taggedUser.createdAt).unix()}:R>`, false)
                    //.addField(`Joined On`,  `<t:${moment.utc(taggedUser.joinedAt).unix()}:F>\n<t:${moment.utc(taggedUser.joinedAt).unix()}:R>`,  true )
                    //  .addField(`Roles`, taggedUser.roles ? taggedUser.roles.map(roles => `${roles}`).join(', ') : "None",false )
                    .setFooter(`${client.user.tag}`, client.user.displayAvatarURL({ dynamic: true }))
                    .setTimestamp()
            ]
        })
    }
}