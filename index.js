const express = require('express');
const { Client, LocalAuth } = require('whatsapp-web.js');
const app = express();

app.use(express.json());

// WhatsApp client
const client = new Client({
    authStrategy: new LocalAuth()
});

client.on('qr', qr => {
    console.log('QR do WhatsApp:');
    require('qrcode-terminal').generate(qr, { small: true });
});

client.on('ready', () => {
    console.log('WhatsApp gotowy');
});

client.initialize();

// 🔥 endpoint WhatsApp
app.post('/whatsapp', async (req, res) => {

    const { number, message } = req.body;

    try {
        await client.sendMessage(number + '@c.us', message);

        res.json({ success: true });

    } catch (e) {
        res.json({ success: false, error: e.message });
    }

});

// test ping
app.get('/ping', (req, res) => {
    res.send('pong');
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, '0.0.0.0', () => {
    console.log('Server running');
});
