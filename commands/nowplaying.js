const { EmbedBuilder } = require('discord.js');
const db = require("../mongoDB");
module.exports = {
  name: "tocandoagora",
  description: "Veja informações sobre a música que esta tocando.",
  permissions: "0x0000000000000800",
  options: [],
  run: async (client, interaction) => {
    try {

      const queue = client.player.getQueue(interaction.guild.id);
      if (!queue || !queue.playing) return interaction.reply({ content: `⚠️ Não tem nenhuma música tocando!!`, ephemeral: true }).catch(e => { })

      const track = queue.songs[0];
      if (!track) return interaction.reply({ content: `⚠️ Não tem nenhuma música tocando!!`, ephemeral: true }).catch(e => { })

      const embed = new EmbedBuilder();
      embed.setColor(client.config.embedColor);
      embed.setThumbnail(track.thumbnail);
      embed.setTitle(track.name)
      embed.setDescription(`> **Audio** \`%${queue.volume}\`
> **Duração :** \`${track.formattedDuration}\`
> **URL :** **${track.url}**
> **de :** <@${track.user.id}>`);


      interaction.reply({ embeds: [embed] }).catch(e => { })

    }  catch (e) {
    console.error(e); 
  }
  },
};
