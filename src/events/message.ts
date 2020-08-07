import { Message } from "discord.js"
import BotDoRonk3 from "../client"

export default async function(this: BotDoRonk3, message: Message){
    if(message.author.bot) return
    if(!message.content.startsWith(this.prefix)) return
    var args = message.content.slice(this.prefix.length).split(/ +/g)
    var command = args.shift()!.toLowerCase()!
    var commandFile = this.commands.find(cmd => cmd.name === command || cmd.aliases.includes(command))
    message.reactions.removeAll()
    if(commandFile){
        if(!commandFile.allowDm && message.channel.type === "dm" || commandFile.manutencion && message.author.id !== this.owner) return
        var  { prefix } = this
        commandFile.run({ message, args, prefix })
    }
    else{
        await message.react("❓")
        var collector = await message.createReactionCollector((reaction, user) => user.id === message.author.id && reaction.emoji.name === "❓", { time: 30000, max: 1 })
        collector.on("collect", () => {
            message.channel.send(`O comando: \`${prefix + command}\` não existe!`)
        })
    }
}