const db = require("../mongoDB");
module.exports = {
  name: "anterior",
  description: "Reproduz a música anterior.",
  permissions: "0x0000000000000800",
  options: [],
  voiceChannel: true,
  run: async (client, interaction) => {
    try {
      const queue = client.player.getQueue(interaction.guild.id);
      if (!queue || !queue.playing) return interaction.reply({ content: `⚠️ Não tem nenhuma música tocando!!`, ephemeral: true }).catch(e => { })
      try {
        let song = await queue.previous()
        interaction.reply({ content: `**Reouça músicas do passado!!**` }).catch(e => { })
      } catch (e) {
        return interaction.reply({ content: `❌ Nenhuma música anterior!!`, ephemeral: true }).catch(e => { })
      }
    } catch (e) {
    console.error(e); 
  }
  },
};
