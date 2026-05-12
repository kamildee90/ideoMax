const express = require('express');
const app = express();

app.use(express.json());

// test czy serwer działa
app.get('/', (req, res) => {
    res.send('Bot działa');
});

// 🔥 PING endpoint (ważne dla Render)
app.get('/ping', (req, res) => {
    res.send('pong');
});

// webhook / endpoint np. Discord
app.post('/discord', (req, res) => {

    console.log('Nowe zgłoszenie:', req.body);

    res.json({
        success: true
    });

});

const PORT = process.env.PORT || 3000;

app.listen(PORT, '0.0.0.0', () => {
    console.log('Server running on port ' + PORT);
});
