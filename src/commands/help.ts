import { command, runCommand } from "../utils/command";
import { MessageEmbed, Message, EmojiResolvable } from "discord.js";
import categorys from "../utils/category";

export default abstract class extends command{
    constructor(name, client){
        super(name, client)
        this.name = "help"
        this.aliases = ["ajuda", "h"]
        this.description = "Comando para dar informações sobre o bot!"
        this.usage = [`${this.name}`, `${this.name} <comando>`]
        this.category = "utility"
        this.allowDm = true
    }
    async run({ message, args, prefix }: runCommand){
        if(args[0]){
            var commands = this.client.commands.filter(c => c.owner === false && c.manutencion === false)
            var command = commands.find(c => c.name === args[0] || c.aliases.includes(args[0]))
            if(!command) return message.channel.send("Comando não encontrado!")
            var commandEmbed = new MessageEmbed({
                title: `Comando ${prefix + command.name}`,
                description: `${command.description}`,
                fields: [
                    {
                        name: `Como usar:`,
                        value: `\`\`\`${(command.usage.length > 0) ? command.usage.map(c => `${prefix + c}`).join("\n") : "Sem exemplos!"}\`\`\``
                    },
                    {
                        name: "Outros nomes:",
                        value: `\`\`\`${(command.aliases.length > 0) ? prefix + "[" + command.aliases.join("|") + "]" : "Sem outros nomes!"}\`\`\``
                    },
                    {
                        name: "Categoria:",
                        value: `\`\`\`${categorys.find(c => c.name === command.category).translation}\`\`\``
                    },
                    {
                        name: "No privado:",
                        value: `\`\`\`${command.allowDm ? "Sim" : "Não"}\`\`\``
                    }
                ],
                color: message.member.displayColor
            })
            return message.channel.send(commandEmbed)
        }
        var lastMessage;
        var initialEmbed = new MessageEmbed({
            title: "Olá, tudo bem?",
            description: `Eae mano, eu fui feito pelo <@${this.client.owner}>, espero que você goste de mim! 🤗\n` +
            `Eu atualmente tenho ${this.client.commands.filter(c => c.manutencion == false && c.owner == false).size} comandos!\n` +
            `Se você quiser ajuda em algum comando específico digite \`${prefix + this.name} <comando>\`!\n` +
            `Clique no emoji para ver as categorias!`,
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
            lastMessage = {
                message: initialEmbed,
                reactions: ["📁"]
            }
            await msg.edit(categoryEmbed)
            var emojis = []
            categorys.map(category => {
                emojis.push(category.emoji)
            })
            var emojisToReact: Array<string> = ["◀️",  "❌", ...emojis]
            emojisToReact.map(async (emoji) => {
                await msg.react(emoji)
            })
            var collector = await msg.createReactionCollector((reaction, user) => user.id === message.author.id && emojis.includes(reaction.emoji.name))
            var backCollector = await msg.createReactionCollector((reaction, user) => user.id === message.author.id && emojisToReact.filter(c => !emojis.includes(c)).includes(reaction.emoji.name))
            collector.on("collect", async (reaction) => {
                msg.reactions.removeAll()
                emojisToReact.filter(c => !emojis.includes(c)).map(async (emoji) => {
                    await msg.react(emoji)
                })
                var category = categorys.find(c => c.emoji === reaction.emoji.name)
                var commands = this.client.commands.filter(c => (c.manutencion == false && c.owner == false && ((c.category) ? c.category === category.name || c.category && c.category.includes(category.name) : category.name === c.category)))
                var commandsEmbed = new MessageEmbed({
                    title: `${category.translation}:`,
                    description: `${commands.map(c => `${"\`" + prefix + c.name  + (c.aliases.length > 0 ? ` | ${prefix}[${c.aliases.join("|")}]\`` : "\`") + ` - ${c.description ? c.description : "Sem descrição aparante!"}`}`).join("\n") || "Não existe nenhum comando com esta categoria!"}`,
                    color: message.member.displayColor
                })
                lastMessage = {
                    message: categoryEmbed,
                    reactions: emojisToReact
                }
                await msg.edit(commandsEmbed)
            })
            backCollector.on("collect", async (reaction) => {
                if(reaction.emoji.name === "❌"){
                    message.delete()
                    msg.delete()
                }
                else{
                    await msg.reactions.removeAll()
                    await msg.edit(lastMessage.message)
                    lastMessage.reactions.map(async emoji => {
                        await msg.react(emoji)
                    })
                }
            })
        })
    }
}