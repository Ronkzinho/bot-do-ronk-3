import BotDoRonk3 from "../client"

export default async function run(this: BotDoRonk3){
    this.inviteLink = `https://discord.com/oauth2/authorize?client_id=${this.user.id}&scope=bot&permissions=8`
    console.log(this.user.id + " - online")
    this.user.setPresence({ activity: { name: "o meu github", type: "STREAMING", url: this.gitHubRepository } })
}