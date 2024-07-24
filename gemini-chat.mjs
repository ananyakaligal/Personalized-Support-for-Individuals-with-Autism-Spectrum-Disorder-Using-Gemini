import dotenv from "dotenv";
dotenv.config();
import readline from "readline";
import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.API_KEY;
if (!apiKey) {
    console.error("API key is missing");
    process.exit(1);
}

const genAI = new GoogleGenerativeAI(apiKey);

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

async function run() {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const chat = model.startChat({
        history: [],
        generationConfig: {
            maxOutputTokens: 500,
        },
    });

    async function askAndRespond() {
        rl.question("You: ", async (msg) => {
            if (msg.toLowerCase() === "exit") {
                rl.close();
            } else {
                try {
                    const result = await chat.sendMessage(msg);
                    const response = await result.response;
                    const text = await response.text();
                    console.log("AI:", text);
                } catch (err) {
                    console.error("Error during chat:", err.message);
                }
                askAndRespond();
            }
        });
    }

    askAndRespond();
}

run();
