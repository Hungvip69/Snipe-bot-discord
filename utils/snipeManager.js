// Module quản lý tin nhắn bị xóa và chỉnh sửa
const snipeMessages = new Map(); // Lưu trữ tin nhắn bị xóa theo kênh
const editMessages = new Map(); // Lưu trữ tin nhắn bị chỉnh sửa theo kênh

module.exports = {
    // Lưu tin nhắn bị xóa
    saveDeletedMessage(message) {
        if (message.author.bot) return; // Không lưu tin nhắn từ bot
        
        snipeMessages.set(message.channel.id, {
            content: message.content,
            author: {
                tag: message.author.tag,
                displayAvatarURL: () => message.author.displayAvatarURL({ dynamic: true })
            },
            createdAt: new Date(),
            attachments: message.attachments
        });
    },
    
    // Lưu tin nhắn bị chỉnh sửa
    saveEditedMessage(oldMessage, newMessage) {
        if (oldMessage.author.bot) return; // Không lưu tin nhắn từ bot
        if (oldMessage.content === newMessage.content) return; // Không lưu nếu nội dung không thay đổi
        
        editMessages.set(oldMessage.channel.id, {
            oldContent: oldMessage.content,
            newContent: newMessage.content,
            author: {
                tag: oldMessage.author.tag,
                displayAvatarURL: () => oldMessage.author.displayAvatarURL({ dynamic: true })
            },
            editedAt: new Date()
        });
    },
    
    // Lấy tin nhắn bị xóa gần nhất theo kênh
    getSnipedMessage(channelId) {
        return snipeMessages.get(channelId);
    },
    
    // Lấy tin nhắn bị chỉnh sửa gần nhất theo kênh
    getEditedMessage(channelId) {
        return editMessages.get(channelId);
    }
};