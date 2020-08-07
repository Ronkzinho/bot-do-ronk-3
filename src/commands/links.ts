import { command, runCommand } from "../utils/command";
import { MessageEmbed } from "discord.js";

export default abstract class extends command{
    constructor(name, client){
        super(name, client)
        this.name = "links"
        this.aliases = ["l"]
        this.allowDm = true
        this.category = "utility"
        this.description = "Comando para que você possa ver os links relacionados ao bot!"
    }
    async run({ message, prefix }: runCommand){
        var embed = new MessageEmbed({
            title: `Olá, ${message.author.id == this.client.owner ? "dono, como está seu dia?" : message.author.username + ", tudo bem?"}`,
            description: `Como você provavelmente já sabe, eu fui feito pelo <@${this.client.owner}>, se quiser ajuda, digite \`${prefix}${this.client.commands.find(c => c.name === "help" || c.aliases.includes("ajuda")).name}\`.\n`+
            `Aqui estão alguns links que você pode se interessar.`,
            fields: [
                {
                    name: "Convite o bot para o seu servidor:",
                    value: `[Clique aqui](${this.client.inviteLink})`
                },
                {
                    name: "Código fonte do bot:",
                    value: `[Clique aqui](${this.client.gitHubRepository})`
                }
            ],
            color: message.member.displayColor
        })
        message.channel.send(embed)
    }
}