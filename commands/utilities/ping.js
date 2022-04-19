module.exports = {
    name: `ping`,
    description: `Returns latency ping`,
    category: `utilites`,
    aliases: [`ms`],
    timeout: `2000`,
    usage: `ping`,
    run: async (client, message, args) => {
        const msg = await message.channel.send(`🏓 Pinging...`)
        msg.delete()
        message.channel.send(` Pong ${client.ws.ping}m/s\nApi latency ping is ${Math.floor(msg.createdAt - message.createdAt)}m/s!`)
    }
}