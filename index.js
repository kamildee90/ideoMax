const express = require('express');
const axios = require('axios');

const app = express();
app.use(express.json());

// 🔐 META CONFIG
const TOKEN = "EAGCKcFlt3EcBRVBRjcpUZAqQFW2xIbW8KkNfQ1PkIGhY8AUyZCqVeyz7IctGUMr45PD5CdbKolEWo1ikR9OZBC4PIG6tKXcxYQDwZAa2456tCq63WGPdn4x8PfswHJJtIb6AGS7CJ2Qy3xnqkZBkmfQqbKIu3ihZCVRFnaibqAFNGIS1cH2NQx2WfAXiLO3KACW3S1iqYfadaC697JU7JZAwMw0nZBxQkEukjth9tcyWqLVkvZBehTZB2ZA5x42vuZBsBfJW7atPSMk1Xo0lUA8ncyklnlZBk";
const PHONE_NUMBER_ID = "1090540307478625";

// 📩 SEND MESSAGE ENDPOINT
app.post('/send-whatsapp', async (req, res) => {
    const { number, message } = req.body;

    try {
        const url = `https://graph.facebook.com/v19.0/${1090540307478625}/messages`;

        const response = await axios.post(url, {
            messaging_product: "whatsapp",
            to: number,
            type: "text",
            text: { body: message }
        }, {
            headers: {
                Authorization: `Bearer ${TOKEN}`,
                "Content-Type": "application/json"
            }
        });

        res.json({ success: true, data: response.data });

    } catch (err) {
        res.json({ success: false, error: err.response?.data || err.message });
    }
});

// health check
app.get('/ping', (req, res) => {
    res.send('pong');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("WhatsApp API running"));
