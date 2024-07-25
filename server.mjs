// server.js
import cors from 'cors';
import express from 'express';
import dotenv from 'dotenv';
import { GoogleGenerativeAI } from '@google/generative-ai';

dotenv.config();

const app = express();
app.use(cors());
const port = process.env.PORT || 3000;
app.use(express.json());

const apiKey = new GoogleGenerativeAI(process.env.API_KEY);
if (!apiKey) {
    console.error("API key is missing");
    process.exit(1);
}

const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

app.post('/api/message', async (req, res) => {
    const userMessage = req.body.message;

    try {
        const chat = model.startChat({
            history: [],
            generationConfig: {
                maxOutputTokens: 500,
            },
        });
        const result = await chat.sendMessage(userMessage);
        const response = await result.response;
        const text = await response.text();
        res.json({ reply: text });
    } catch (err) {
        console.error("Error during chat:", err.message);
        res.status(500).json({ error: 'Failed to get response from AI' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
