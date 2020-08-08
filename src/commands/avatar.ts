import { command, runCommand } from "../utils/command";
import { MessageEmbed } from "discord.js";

export default abstract class extends command{
    constructor(name, client){
        super(name, client)
        this.name = "avatar"
        this.aliases = ["a", "av"]
        this.description = "Comando que mostra a foto de um usuário!"
        this.usage = [`${this.name}`, `${this.name} <usuário>`]
        this.category = "utility"
    }
    async run({ message, args }: runCommand){
        var user = args[0] ? message.mentions.users.first() ? message.mentions.users.first() : this.client.users.cache.get(args.join(' ')) ? this.client.users.cache.get(args.join(' ')) : this.client.users.cache.find(user => user.username.toLowerCase() === args.join(' ').toLowerCase()) ? this.client.users.cache.find(user => user.username.toLowerCase() === args.join(' ').toLowerCase()) : this.client.users.cache.find(user => user.tag.toLowerCase() === args.join(' ').toLowerCase()) ? this.client.users.cache.find(user => user.tag.toLowerCase() === args.join(' ').toLowerCase()) : message.guild.members.cache.find(user => user.displayName.toLowerCase() === args.join(' ').toLowerCase()) ? message.guild.members.cache.find(user => user.displayName.toLowerCase() === args.join(' ').toLowerCase()).user : message.guild.members.cache.find(user => user.displayName.toLowerCase().includes(args.join(' ').toLowerCase())) ? message.guild.members.cache.find(user => user.displayName.toLowerCase().includes(args.join(' ').toLowerCase())).user : this.client.users.cache.find(user => user.username.toLowerCase().includes(args.join(' ').toLowerCase())) ? this.client.users.cache.find(user => user.username.toLowerCase().includes(args.join(' ').toLowerCase())) : message.author : message.author
        var avatar = user.displayAvatarURL()
        avatar = `${user.displayAvatarURL()}?size=2048`
        avatar
        var embed = new MessageEmbed({
            title: `Avatar de ${user.username}`,
            description: `**Clique [aqui](${avatar}) para baixar a imagem!**`,
            image: { url: avatar.replace(".webp", ".gif") },
            color: message.member.displayColor
        })
        message.channel.send(embed)
    }
}