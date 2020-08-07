import { command, runCommand } from "../utils/command";
import { MessageEmbed } from "discord.js";

export default abstract class extends command{
    constructor(name, client){
        super(name, client)
        this.name = "eval"
        this.owner = true
        this.allowDm = ["e", "execute"]
        this.description = "Comando para executar algo!"
    }
    async run({ message, args }: runCommand){
        if(message.author.id !== this.client.owner) return
        try{
            var result = eval(args.join(' '))
            return message.channel.send(new MessageEmbed({
                title: "Resultado do eval:",
                description: result,
                color: message.member.displayColor
            }))
        }
        catch(error){
            return message.channel.send(error.toString())
        }
    }
}