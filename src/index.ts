import "dotenv/config"
import BotDoRonk3 from "./client";

var client = new BotDoRonk3()

client.login(process.env.TOKEN)