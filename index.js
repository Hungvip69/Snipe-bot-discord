require('dotenv').config();
const { Client, GatewayIntentBits, Collection, Events, REST, Routes } = require('discord.js');
const fs = require('fs');
const path = require('path');
const snipeManager = require('./utils/snipeManager');

// Khởi tạo client với các intents cần thiết
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

// Khởi tạo collection để lưu trữ lệnh
client.commands = new Collection();

// Đọc tất cả các file lệnh
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

// Đăng ký lệnh
const commands = [];
for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    
    if ('data' in command && 'execute' in command) {
        client.commands.set(command.data.name, command);
        commands.push(command.data.toJSON());
    } else {
        console.log(`[CẢNH BÁO] Lệnh tại ${filePath} thiếu thuộc tính data hoặc execute!`);
    }
}

// Đăng ký lệnh slash với Discord API khi bot khởi động
client.once(Events.ClientReady, async c => {
    console.log(`Đã đăng nhập với tên ${c.user.tag}`);
    
    try {
        const rest = new REST().setToken(process.env.TOKEN);
        console.log('Bắt đầu đăng ký lệnh slash...');
        
        await rest.put(
            Routes.applicationCommands(c.user.id),
            { body: commands },
        );
        
        console.log('Đăng ký lệnh slash thành công!');
    } catch (error) {
        console.error(error);
    }
});

// Xử lý sự kiện khi có lệnh slash được gọi
client.on(Events.InteractionCreate, async interaction => {
    if (!interaction.isChatInputCommand()) return;
    
    const command = client.commands.get(interaction.commandName);
    
    if (!command) {
        console.error(`Không tìm thấy lệnh ${interaction.commandName}`);
        return;
    }
    
    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(error);
        if (interaction.replied || interaction.deferred) {
            await interaction.followUp({ content: 'Đã xảy ra lỗi khi thực hiện lệnh này!', ephemeral: true });
        } else {
            await interaction.reply({ content: 'Đã xảy ra lỗi khi thực hiện lệnh này!', ephemeral: true });
        }
    }
});

// Xử lý sự kiện khi tin nhắn bị xóa
client.on(Events.MessageDelete, message => {
    snipeManager.saveDeletedMessage(message);
});

// Xử lý sự kiện khi tin nhắn bị chỉnh sửa
client.on(Events.MessageUpdate, (oldMessage, newMessage) => {
    snipeManager.saveEditedMessage(oldMessage, newMessage);
});

// Đăng nhập vào Discord với token
client.login(process.env.TOKEN);