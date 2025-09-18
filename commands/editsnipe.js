const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const snipeManager = require('../utils/snipeManager');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('editsnipe')
        .setDescription('Hiển thị tin nhắn bị chỉnh sửa gần nhất trong kênh'),
    
    async execute(interaction) {
        const channel = interaction.channel;
        const editedMessage = snipeManager.getEditedMessage(channel.id);
        
        if (!editedMessage) {
            return interaction.reply({ 
                content: 'Không có tin nhắn nào bị chỉnh sửa gần đây trong kênh này!', 
                ephemeral: true 
            });
        }
        
        const embed = new EmbedBuilder()
            .setColor('#FFA500')
            .setAuthor({ 
                name: editedMessage.author.tag, 
                iconURL: editedMessage.author.displayAvatarURL({ dynamic: true }) 
            })
            .addFields(
                { name: 'Nội dung cũ', value: editedMessage.oldContent || '*Không có nội dung văn bản*' },
                { name: 'Nội dung mới', value: editedMessage.newContent || '*Không có nội dung văn bản*' }
            )
            .setFooter({ text: `Đã chỉnh sửa vào lúc` })
            .setTimestamp(editedMessage.editedAt);
        
        return interaction.reply({ embeds: [embed] });
    },
};