# Discord Snipe Bot

<div align="center">
  
![Discord](https://img.shields.io/badge/Discord-%235865F2.svg?style=for-the-badge&logo=discord&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![License](https://img.shields.io/github/license/Hungvip69/Snipe-bot-discord?style=for-the-badge&cacheSeconds=60)

</div>

Bot Discord với tính năng "snipe" tin nhắn: lưu lại và hiển thị tin nhắn bị xóa hoặc chỉnh sửa trong server.

## 📋 Tính năng

- ✅ `/snipe` - Hiển thị tin nhắn bị xóa gần nhất trong kênh hiện tại
- ✅ `/editsnipe` - Hiển thị tin nhắn bị chỉnh sửa gần nhất trong kênh hiện tại
- ✅ Mỗi kênh lưu tin nhắn snipe riêng (không lẫn lộn giữa các kênh)
- ✅ Hiển thị thông tin: tên người gửi, thời gian gửi tin nhắn
- ✅ Format tin nhắn trả về bằng embed đẹp mắt

## 🚀 Cài đặt

### Yêu cầu
- Node.js 16.9.0 trở lên
- Discord.js v14
- Token bot Discord với các intents: Guilds, GuildMessages, MessageContent

### Các bước cài đặt

1. Clone repository này về máy của bạn
   ```bash
   git clone https://github.com/Hungvip69/Snipe-bot-discord.git
   cd Snipe-bot-discord
   ```

2. Cài đặt các dependencies
   ```bash
   npm install
   ```

3. Tạo file `.env` từ file `.env.example` và thêm token bot Discord của bạn
   ```bash
   cp .env.example .env
   # Sau đó chỉnh sửa file .env và thêm token bot của bạn
   ```

4. Khởi động bot
   ```bash
   npm start
   ```

## 🔧 Cấu hình

### Quyền Bot (Intents)
Bot cần các quyền sau để hoạt động:
- **Guilds** - Cho phép bot nhận thông tin về server
- **GuildMessages** - Cho phép bot đọc tin nhắn trong server
- **MessageContent** - Cho phép bot đọc nội dung tin nhắn

### Quyền Bot (Permissions)
Khi thêm bot vào server, đảm bảo bot có các quyền sau:
- Read Messages/View Channels
- Send Messages
- Embed Links
- Read Message History

## 📝 Cách sử dụng

1. Mời bot vào server Discord của bạn bằng link được tạo từ Discord Developer Portal
2. Sử dụng lệnh `/snipe` để xem tin nhắn bị xóa gần nhất trong kênh
3. Sử dụng lệnh `/editsnipe` để xem tin nhắn bị chỉnh sửa gần nhất trong kênh

## 🤝 Đóng góp

Đóng góp luôn được chào đón! Nếu bạn muốn đóng góp:

1. Fork repository
2. Tạo branch mới (`git checkout -b feature/amazing-feature`)
3. Commit thay đổi của bạn (`git commit -m 'Add some amazing feature'`)
4. Push lên branch (`git push origin feature/amazing-feature`)
5. Mở Pull Request

## 📜 Giấy phép

Dự án này được phân phối dưới giấy phép MIT. Xem file `LICENSE` để biết thêm thông tin.
