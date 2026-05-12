const express = require('express');

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Bot działa');
});

app.post('/discord', async (req, res) => {

    console.log(req.body);

    res.json({
        success: true
    });

});

const PORT = process.env.PORT || 3000;

app.listen(PORT, '0.0.0.0', () => {
    console.log('Server started');
});
