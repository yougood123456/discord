const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits, } = require("discord.js");
const schema = require("../../schemas/youtube");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("setupytnotifier")
    .setDescription("Setup the youtube new video notifier for your server.")
    .setDMPermission(false),
  async execute(interaction, client) {
    
    

  },
};