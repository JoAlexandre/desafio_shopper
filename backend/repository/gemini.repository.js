import geminiModel from "./gemini.js";
import fs from "fs";

async function runGemini(input) {
	const result = await geminiModel.generateContent(input);
	const response = await result.response;
	return response.text();
}

function fileToGenerativePart(imageString) {
  return {
    inlineData: {
			data: imageString,
			mimeType:'image/png'
    }
  }
}

async function getGeminiAnswerFromImage(imageString) {
	try {
		const resposta = await runGemini(['Qual o valor indicado na imagem (retorne para mim apenas o valor inteiro)?', fileToGenerativePart(imageString)]);
		return resposta.replace(/\D/g, '')
			// .replace('\n', '').replace('.', '');
	} catch (error) {
		throw error;
	}
}

export default { getGeminiAnswerFromImage };
