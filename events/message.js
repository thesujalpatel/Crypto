const Discord = require('discord.js')
const client = require('../indax')
const Config = require('../config')
const ms = require(`ms`)
const { timeout } = require('../indax')
const moment = require('moment')

client.on("message", async (message) => {
    console.log(`[${message.guild.name}]${message.author.tag} : ${message}`)
    if (message.author.bot || !message.guild || message.webhookID || message.system) return;
    if (message.content == `${client.user}`) {
        message.channel.send(`My Stander Prefix Is : \`${Config.Prefix}\`\nIf You Want To Get Started Type : \`${Config.Prefix}help\``)
    }
    if (!message.content.toLowerCase().startsWith(Config.Prefix)) return;
    if (!message.member) message.member = await message.guild.fetchMember(message)

    const args = message.content.slice(Config.Prefix.length).trim().split(/ +/)
    const cmd = args.shift().toLowerCase()
    if (cmd.length == 0) return;
    let command = client.commands.get(cmd)
    if (!command) command = client.commands.get(client.aliases.get(cmd));
    if (command) command.run(client, message, args)

    

    /*if (command.timeout) {
        if (timeout.has(`${command.name}${message.author.id}`)) return message.channel.send(`Little quick here ,Try again after \`${ms(timeout.get(`${command.name}${message.author.id}`) - Date.now(), { long: true })}\``).then(warnmsg => { warnmsg.delete({ timeout: command.timeout }) })
        command.run(client, message, args)
    timeout.set(`${command.name}${message.author.id}`, Date.now() + command.timeout)
        setTimeout(() => {
            timeout.delete(`${command.name}${message.author.id}`)
        }, command.timeout)
    }

   */
})