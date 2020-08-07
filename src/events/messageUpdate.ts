import { Message } from "discord.js"
import BotDoRonk3 from "../client"

export default function run(this: BotDoRonk3, oldMessage: Message, newMessage){
    if(oldMessage.content.startsWith(this.prefix)) return
    this.emit("message", newMessage)
}