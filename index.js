const { Client } = require("discord.js-selfbot-v13");
const dotenv = require("dotenv");
dotenv.config();

const client = new Client();

const trackChannelIds = [
  "742610029168951347",
  "737394785135886346",
  "983748856506351616",
  "1185348663283822675",
]; // Channels to track

const forwardToChannelId = "1218254542991396925"; // Replace with the target channel ID

const trackUserIds = [
  "1175575988390866976",
  "921976479498260490",
  "469776639467716609",
]; // Optionally add author IDs here later

client.on("ready", async () => {
  console.log(`${client.user.username} is ready!`);
});

client.on("messageCreate", async (message) => {
  // Check if the message is from a tracked channel
  if (trackChannelIds.includes(message.channel.id)) {
    // Optionally filter by specific authors
    if (trackUserIds.length > 0 && !trackUserIds.includes(message.author.id))
      return;

    // Check if the message contains embeds
    // if (message.embeds.length > 0) {
    //   const embed = message.embeds[0]; // Get the first embed

    // Check if the embed description contains the desired text
    //   if (
    // embed.description &&
    // embed.description.includes(
    //   "Click the button below to enter the rain event!"
    // )
    //   ) {
    try {
      const targetChannel = await client.channels.fetch(forwardToChannelId);

      if (targetChannel) {
        // Generate the Discord message link
        const messageLink = `https://discord.com/channels/${message.guild.id}/${message.channel.id}/${message.id}`;

        // Forward the message content and include the message link
        await targetChannel.send(`@everyone Rain Started \n ${messageLink}`);

        console.log(
          `Forwarded message from ${message.author.tag} in channel ${message.channel.name}`
        );
      } else {
        console.error("The target channel could not be fetched.");
      }
    } catch (error) {
      console.error("Error forwarding the message:", error);
    }
    //   }
    // }
  }
});

client.login(process.env.TOKEN);
