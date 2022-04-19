const Discord = require('discord.js')
const client = require('../indax')
const Config = require('../config')

client.on("ready", () => {
    console.log(`${client.user.username} Is Ready Now!`)
    client.user.setActivity(`${Config.Prefix}help ${Config.Presence.Message}`, {
        type: `${Config.Presence.Type}`
    })
    client.user.setPresence({
        status: `${Config.Presence.Status}`
    })
    client.on("warn", (info) => console.log(info))
    client.on("error", console.error)
})
