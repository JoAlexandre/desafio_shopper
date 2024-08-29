import { GoogleGenerativeAI } from "@google/generative-ai"

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

//GEMINI-1.5-FLASH é para entrada multimodal
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});

export default model