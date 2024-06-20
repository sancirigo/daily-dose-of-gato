import dotenv from "dotenv";
import {
  AttachmentBuilder,
  Client,
  EmbedBuilder,
  GatewayIntentBits,
} from "discord.js";
import cron from "node-cron";

dotenv.config();

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages],
});

const link = "https://cataas.com/cat";

client.once("ready", () => {
  console.log("Ready!");

  cron.schedule("0 9 * * *", () => {
    const channel = client.channels.cache.get(process.env.DISCORD_CHANNEL_ID);
    if (channel) {
      const image = new AttachmentBuilder(link).setName("cat.jpg");
      const embed = new EmbedBuilder()
        .setTitle("Your Daily Gato")
        .setImage("attachment://cat.jpg");
      channel
        .send({ embeds: [embed], files: [image] })
        .then(() => console.log("message sent"))
        .catch(console.error);
    } else {
      console.log("Channel not found");
    }
  });
});

client
  .login(process.env.DISCORD_TOKEN)
  .then(() => console.log("Logged in successfully"));
