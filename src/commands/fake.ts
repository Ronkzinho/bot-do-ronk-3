import { command, runCommand } from "../utils/command";
import { TextChannel, User } from "discord.js";

export default abstract class extends command{
    constructor(name, client){
        super(name, client)
        this.name = "fake"
        this.category = "fun"
        this.description = "Comando que cria uma webhook para mandar uma mensagem específica com o usuário que você quiser!"
        this.usage = [`${this.name} <usuário> <msg>`, `${this.name} <msg>`]
    }
    async run({ message, args }: runCommand){
        var user: User = message.mentions.users.first() || this.client.users.cache.get(args[0]) || message.author
        if(!args[1] && user.id === message.author.id){
            return message.channel.send("Insira um texto!")
        }
        var channel = message.channel as TextChannel
        message.delete()
        var w = await channel.createWebhook(user.username, { avatar: user.displayAvatarURL() })
        w.send(((user.id === message.author.id) ? args.join(" ") : args.splice(1).join(" ")).replace("@everyone", "\@everyone")).then(() => {
            setTimeout(() => {
                w.delete()
            }, 5000)
        })
    }
}