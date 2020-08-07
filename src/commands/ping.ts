import { Message } from "discord.js"
import { command, runCommand } from "../utils/command";

export default abstract class extends command{
    constructor(name, client){
        super(name, client)
        this.name = "ping"
        this.category = "utility"
        this.description = "Comando para a ver a latência do bot!"
    }
    async run({ message }: runCommand){
        var msg = await message.channel.send("Ping?")
        msg.edit(`Pong! ${msg.createdAt.getTime() - message.createdAt.getTime()}ms`)
    }
}