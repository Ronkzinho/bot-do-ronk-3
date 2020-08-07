import { command, runCommand } from "../utils/command";
import { MessageEmbed, Message } from "discord.js";
import categorys from "../utils/category";

export default abstract class extends command{
    constructor(name, client){
        super(name, client)
        this.name = "help"
        this.aliases = ["ajuda", "h"]
        this.description = "Comando para dar a ajuda necessária!"
        this.allowDm = true
    }
    async run({ message, prefix }: runCommand){
        var initialEmbed = new MessageEmbed({
            title: "Olá, tudo bem?",
            description: `Eae mano, eu fui feito pelo <@${this.client.owner}>, espero que você goste de mim! 🤗\n` +
            `Eu atualmente tenho ${this.client.commands.filter(c => c.manutencion == false && c.owner == false).size} comandos!`,
            color: message.member.displayColor
        })
        var msg = await message.channel.send(initialEmbed)
        await msg.react("📁")
        var collector = await msg.createReactionCollector((reaction, user) => user.id === message.author.id && reaction.emoji.name === "📁", { time: 30000 })
        collector.on("collect", async () => {
            msg.reactions.removeAll()
            var categoryEmbed = new MessageEmbed({
                title: "Categorias:",
                description: `${categorys.filter(c => !c.hidden).map(c => `${c.translation + " - " +  c.emoji}`).join("\n")}`,
                color: message.member.displayColor
            })
            await msg.edit(categoryEmbed)
            var emojis = []
            categorys.map(async (category) => {
                emojis.push(category.emoji)
                await msg.react(category.emoji)
            })
            var collector = await msg.createReactionCollector((reaction, user) => user.id === message.author.id && emojis.includes(reaction.emoji.name))
            collector.on("collect", async (reaction) => {
                msg.reactions.removeAll()
                categorys.map(async (category) => {
                    await msg.react(category.emoji)
                })
                var category = categorys.find(c => c.emoji === reaction.emoji.name)
                var commands = this.client.commands.filter(c => (c.manutencion == false && c.owner == false && ((c.category) ? c.category === category.name || c.category && c.category.includes(category.name) : category.name === c.category)))
                var commandsEmbed = new MessageEmbed({
                    title: `${category.translation}:`,
                    description: `${commands.map(c => `${"\`" + prefix + c.name  + (c.aliases.length > 0 ? ` | ${prefix}[${c.aliases.join("|")}]\`` : "\`") + ` - ${c.description ? c.description : "Sem descrição aparante!"}`}`).join("\n") || "Não existe nenhum comando com esta categoria!"}`,
                    color: message.member.displayColor
                })
                await msg.edit(commandsEmbed)
            })
        })
    }
}