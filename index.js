const qrcode = require('qrcode-terminal');
const { Client } = require('whatsapp-web.js');
const client = new Client({
        puppeteer: {
            headless: true,
            args: ['--no-sandbox']
        }
});
const { MessageMedia } = require('whatsapp-web.js');


client.on('qr', qr => {
    qrcode.generate(qr, {small: true});
});

client.on('ready', () => {
    console.log('Client is ready!');
});

client.on('message', msg => {
    if (msg.body == '!ping') {
        msg.reply('pong');
    }

    const media = MessageMedia.fromFilePath('./file.png');
        if(msg.body === '!media') {
        client.sendMessage(msg.from, media);
    }
    });

client.initialize();