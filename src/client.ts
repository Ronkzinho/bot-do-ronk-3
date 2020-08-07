import { Client, Collection } from "discord.js"
import { readdirSync, statSync } from "fs"

export default class BotDoRonk3 extends Client{
    commands: Collection<any, any>
    owner;
    inviteLink: string;
    gitHubRepository;
    prefix;
    constructor(options = {}){
        super(options)
        this.commands = new Collection()
        this.owner = "370007502643003403"
        this.prefix = "<<"
        this.gitHubRepository = "https://github.com/ronkzinho/bot-do-ronk-3"
        this.initializeEvents("./src/events")
        this.initializeCommands("./src/commands")
    }
    async initializeCommands(path){
        readdirSync(path).forEach(async file => {
            try {
                const filePath = path + '/' + file
                if (file.endsWith('.ts')){
                    const Command = (await import(filePath.replace("/src", ""))).default
                    const commandName = file.replace(/.ts/g,'').toLowerCase()
                    const command = new Command(commandName, this)
                    this.commands.set(commandName, command)
                } else if (statSync(filePath).isDirectory()) {
                    this.initializeCommands(filePath)
                }
            } catch (error) {
                console.log(error)
            }
        })
    }
    async initializeEvents(path){
        readdirSync(path).forEach(async file => {
            try {
                let filePath = path + '/' + file
                if (file.endsWith('.ts')) {
                    var listener = (await import(filePath.replace("/src", ""))).default
                    var eventName = file.replace(/.ts/g, '')
                    // @ts-ignore
                    this.on(eventName, listener.bind(this))
                } else if (statSync(filePath).isDirectory()) {
                    this.initializeEvents(filePath)
                }
            } catch (error) {
                console.log(error)
            }
        })
    }
}