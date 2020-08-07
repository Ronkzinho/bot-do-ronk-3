import BotDoRonk3 from "../client"
import { Message } from "discord.js";

export interface commandIterface{
    name: string
    client?: BotDoRonk3
    aliases?: Array<string>
    allowDm?: Boolean
    category?: string | Array<string>
    manutencion?: Boolean;
    owner?: Blob;
    description?: string;
}
export interface runCommand{
    message: Message
    args: Array<string>
    prefix: string
}
export class command implements commandIterface{
    name;
    client: BotDoRonk3;
    aliases;
    allowDm;
    category;
    manutencion;
    owner;
    description;
    constructor(name, client){
        this.name = name
        this.client = client
        this.aliases = []
        this.allowDm = false
        this.category = null
        this.manutencion = false
        this.owner = false
        this.description = null
    }
}