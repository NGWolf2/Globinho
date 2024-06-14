const { ApplicationCommandOptionType, EmbedBuilder } = require('discord.js');
const db = require("../mongoDB");
module.exports = {
  name: "pular",
  description: "Pula pra proxima música.",
  permissions: "0x0000000000000800",
  options: [{
    name: "quantas",
    description: "Quantas músicas você quer pular?",
    type: ApplicationCommandOptionType.Number,
    required: false
  }],
  voiceChannel: true,
  run: async (client, interaction) => {
    
    try {

      const queue = client.player.getQueue(interaction.guild.id);
      if (!queue || !queue.playing) return interaction.reply({ content: '⚠️ Nenhuma música tocando!!', ephemeral: true }).catch(e => { })

      let number = interaction.options.getNumber('number');
      if (number) {
        if (!queue.songs.length > number) return interaction.reply({ content: '⚠️ Ultrapassa o numero de músicas na fila!!', ephemeral: true }).catch(e => { })
        if (isNaN(number)) return interaction.reply({ content: '⚠️ Numero invalido', ephemeral: true }).catch(e => { })
        if (1 > number) return interaction.reply({ content: '⚠️ Numero invalido', ephemeral: true }).catch(e => { })

        try {
        let old = queue.songs[0];
        await client.player.jump(interaction, number).then(song => {
          return interaction.reply({ content: `⏯️ Pulado : **${old.name}**` }).catch(e => { })
        })
      } catch(e){
        return interaction.reply({ content: '❌ Não tem nenhuma música na fila!!', ephemeral: true }).catch(e => { })
      }
      } else {
try {
  const queue = client.player.getQueue(interaction.guild.id);
  if (!queue || !queue.playing) {
    return interaction.reply({ content: '⚠️ Nenhuma música tocando!!', ephemeral: true });
  }

  let old = queue.songs[0];
  const success = await queue.skip();

  const embed = new EmbedBuilder()
    .setColor('#3498db')
    .setAuthor({
      name: 'Música pulada!',
      iconURL: 'https://cdn.discordapp.com/attachments/1156866389819281418/1157269773118357604/giphy.gif?ex=6517fef6&is=6516ad76&hm=f106480f7d017a07f75d543cf545bbea01e9cf53ebd42020bd3b90a14004398e&',
      url: 'https://discord.gg/FUEHs7RCqz'
    })
    .setDescription(success ? ` **PULADO** : **${old.name}**` : '❌ Não tem nenhuma música na fila!!')
    .setTimestamp();

  return interaction.reply({ embeds: [embed] });
}catch (e) {
          return interaction.reply({ content: '❌ Não tem nenhuma música na fila!!', ephemeral: true }).catch(e => { })
        }
      }

    } catch (e) {
    console.error(e); 
  }
  },
};
