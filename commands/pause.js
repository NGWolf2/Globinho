const db = require("../mongoDB");
const { EmbedBuilder } = require('discord.js');

module.exports = {
  name: "pause",
  description: "A músicaque esta tocando, para.",
  permissions: "0x0000000000000800",
  options: [],
  voiceChannel: true,
  run: async (client, interaction) => {
    const queue = client.player.getQueue(interaction.guild.id);

    try {
      if (!queue || !queue.playing) {
        return interaction.reply({ content: '⚠️ Não tem nenhuma música tocando!!', ephemeral: true });
      }

      const success = queue.pause();

      const embed = new EmbedBuilder()
        .setColor('#7645fe') 
        .setAuthor({
          name: 'Música pausada',
          iconURL: 'https://cdn.discordapp.com/attachments/1156866389819281418/1157296313013117049/8061-purple-pause-icon.png?ex=651817ae&is=6516c62e&hm=4596c9fab9d8b66de8b5215b2750572ced352eed67440a1134550b846b5693b9&',
          url: 'https://discord.gg/FUEHs7RCqz'
        })
        .setDescription(success ? '**The music has been Paused for a moment!!**' : '❌ Erro no comando: Não foi possivel pausar a música')
        

      return interaction.reply({ embeds: [embed] });
    } catch (e) {
      console.error(e);
    }
  },
};
