const Discord = require("discord.js")
const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES"] })
const Config = require("./config")
const fs = require('fs')

module.exports = client;

client.commands = new Discord.Collection()
client.aliases = new Discord.Collection()
client.timeout = new Discord.Collection()
client.categories = fs.readdirSync("./commands/");

["command", "event"].forEach(handler => {
    require(`./handlers/${handler}`)(client)
})

client.login(Config.Client.Token);