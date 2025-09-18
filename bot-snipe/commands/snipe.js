const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const snipeManager = require('../utils/snipeManager');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('snipe')
        .setDescription('Hiển thị tin nhắn bị xóa gần nhất trong kênh'),
    
    async execute(interaction) {
        const channel = interaction.channel;
        const snipedMessage = snipeManager.getSnipedMessage(channel.id);
        
        if (!snipedMessage) {
            return interaction.reply({ 
                content: 'Không có tin nhắn nào bị xóa gần đây trong kênh này!', 
                ephemeral: true 
            });
        }
        
        const embed = new EmbedBuilder()
            .setColor('#FF0000')
            .setAuthor({ 
                name: snipedMessage.author.tag, 
                iconURL: snipedMessage.author.displayAvatarURL({ dynamic: true }) 
            })
            .setDescription(snipedMessage.content || '*Không có nội dung văn bản*')
            .setFooter({ text: `Đã xóa vào lúc` })
            .setTimestamp(snipedMessage.createdAt);
            
        // Nếu có hình ảnh trong tin nhắn bị xóa
        if (snipedMessage.attachments && snipedMessage.attachments.size > 0) {
            const attachment = snipedMessage.attachments.first();
            if (attachment.contentType && attachment.contentType.startsWith('image/')) {
                embed.setImage(attachment.proxyURL);
            }
        }
        
        return interaction.reply({ embeds: [embed] });
    },
};