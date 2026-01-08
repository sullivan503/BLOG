import { GoogleGenAI } from "@google/genai";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

export const generatePostSummary = async (content: string): Promise<string> => {
  if (!apiKey) {
    console.warn("API Key is missing. Returning mock summary.");
    return "API Key is missing. Please provide a valid Gemini API Key to generate a summary.";
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-flash-latest',
      contents: `请用中文（简体）为这篇文章生成一段 2-3 句话的简要摘要。提取核心观点和洞察。\n\n 文章内容:: ${content}`,
    });
    return response.text || "无法生成摘要。";
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    return `生成摘要错误: ${error.message || error}`;
  }
};

export const suggestComment = async (content: string): Promise<string> => {
  if (!apiKey) {
    return "写得很棒！感谢分享。";
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-flash-latest',
      contents: `基于以下博客文章内容，生成一条读者可能会留下的友善且有深度的评论。请用中文（简体），30字以内。\n\n 文章: ${content}`,
    });
    return response.text || "写得不错！";
  } catch (error) {
    return "Interesting perspective!";
  }
};

export const generateAudio = async (text: string): Promise<string> => {
  if (!apiKey) throw new Error("API Key missing");

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-preview-tts',
      contents: text,
      config: {
        responseModalities: ["AUDIO"]
      }
    });

    // The SDK likely puts the binary data in candidates[0].content.parts[0].inlineData.data
    // Or response.candidates[0].content.parts[0].inlineData.data
    // Let's inspect how the SDK exposes it. 
    // Based on the log "there are non-text parts inlineData", we should look for inlineData.

    const candidates = response.candidates;
    if (candidates && candidates[0] && candidates[0].content && candidates[0].content.parts && candidates[0].content.parts[0].inlineData && candidates[0].content.parts[0].inlineData.data) {
      const rawPcmBase64 = candidates[0].content.parts[0].inlineData.data;
      // Gemini TTS typically returns Raw PCM 24kHz Mono 16-bit
      return addWavHeader(rawPcmBase64, 24000, 1);
    }

    throw new Error("No audio data found in response");
  } catch (error: any) {
    console.error("Gemini TTS Error:", error);
    throw new Error(`TTS Error: ${error.message || error}`);
  }
};

// Helper: Add WAV Header to Raw PCM (16-bit, Little Endian)
function addWavHeader(base64Pcm: string, sampleRate: number, numChannels: number): string {
  const pcmData = Uint8Array.from(atob(base64Pcm), c => c.charCodeAt(0));
  const header = new ArrayBuffer(44);
  const view = new DataView(header);

  // RIFF identifier
  writeString(view, 0, 'RIFF');
  // file length
  view.setUint32(4, 36 + pcmData.length, true);
  // RIFF type
  writeString(view, 8, 'WAVE');
  // format chunk identifier
  writeString(view, 12, 'fmt ');
  // format chunk length
  view.setUint32(16, 16, true);
  // sample format (1 is PCM)
  view.setUint16(20, 1, true);
  // channel count
  view.setUint16(22, numChannels, true);
  // sample rate
  view.setUint32(24, sampleRate, true);
  // byte rate (sampleRate * blockAlign)
  view.setUint32(28, sampleRate * numChannels * 2, true);
  // block align (numChannels * bytesPerSample)
  view.setUint16(32, numChannels * 2, true);
  // bits per sample
  view.setUint16(34, 16, true);
  // data chunk identifier
  writeString(view, 36, 'data');
  // data chunk length
  view.setUint32(40, pcmData.length, true);

  // Concatenate header and data
  const wavBuffer = new Uint8Array(header.byteLength + pcmData.length);
  wavBuffer.set(new Uint8Array(header), 0);
  wavBuffer.set(pcmData, header.byteLength);

  // Convert back to base64
  let binary = '';
  const len = wavBuffer.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(wavBuffer[i]);
  }
  return btoa(binary);
}

function writeString(view: DataView, offset: number, string: string) {
  for (let i = 0; i < string.length; i++) {
    view.setUint8(offset + i, string.charCodeAt(i));
  }
}