import { GoogleGenAI } from "@google/genai";
import fs from 'fs';

const apiKey = process.env.VITE_GEMINI_API_KEY || "";
const ai = new GoogleGenAI({ apiKey });

async function testTTS() {
    try {
        const model = 'gemini-2.5-flash-preview-tts';
        console.log(`Testing TTS with model: ${model}`);

        // Usually for TTS models in GenAI, we might send text and expect a blob?
        // Or maybe we instruct it to "speak"?
        // The specifics depend on the exact API shape for this preview model.
        // Let's try a standard generateContent and see what happens.

        const response = await ai.models.generateContent({
            model: model,
            contents: "Hello, this is a test of the automatic speech system.",
            config: {
                responseModalities: ["AUDIO"]
            }
        });

        if (response.candidates && response.candidates[0].content.parts[0].inlineData) {
            const base64Data = response.candidates[0].content.parts[0].inlineData.data;
            const buffer = Buffer.from(base64Data, 'base64');
            fs.writeFileSync('debug_audio.bin', buffer);
            console.log("Audio saved to debug_audio.bin");
        } else {
            console.log("No audio data found.");
        }

    } catch (error) {
        console.error("Error testing TTS:", error);
    }
}

testTTS();
