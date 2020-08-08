import { command, runCommand } from "../utils/command";

export default abstract class extends command{
    constructor(name, client){
        super(name, client)
        this.name = "uptime"
        this.aliases = ["u", "up", "upt"]
        this.category = "utility"
        this.description = "Comando para ver a quanto tempo o bot está online desde a ultima atualização!"
        this.usage = [`${this.name}`]
    }
    async run({ message }: runCommand){
        var totalSeconds = (this.client.uptime / 1000);
        var days = Math.floor(totalSeconds / 86400);
        totalSeconds %= 86400;
        var hours = Math.floor(totalSeconds / 3600);
        totalSeconds %= 3600;
        var minutes = Math.floor(totalSeconds / 60);
        var seconds = Math.floor(totalSeconds % 60);
        if(days === 0 && hours === 0 && days === 0 && hours === 0 && (seconds === 0 || seconds <= 5)){
            return message.channel.send("Acabei de ficar online!")
        }
        message.channel.send(`Estou online há ${(days >= 1) ? days + ` dia${days > 1 ? "s" : ""}, ` : (hours >=1 ) ? hours + ` hora${hours > 1 ? "s" : ""}, ` : (minutes >= 1) ? minutes + ` minuto$${minutes > 1 ? "s" : ""} e ` : seconds + ` segundo${seconds > 1 ? "s" : ""}`}!`)
    }
}