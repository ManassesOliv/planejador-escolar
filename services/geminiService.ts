import { GoogleGenAI } from "@google/genai";
import { Subject } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getStudySuggestions = async (subjects: Subject[]): Promise<string> => {
  if (!process.env.API_KEY) {
    return "Chave de API não configurada. Por favor, configure a variável de ambiente API_KEY.";
  }

  const formattedData = subjects
    .map(subject => {
      const grades = subject.grades
        .map(g => g.score)
        .filter(s => s !== null)
        .join(', ');
      return `${subject.name}: ${grades || 'Nenhuma nota'}`;
    })
    .join('\n');

  const prompt = `
    Você é um assistente acadêmico virtual e coach de estudos. O seu objetivo é ajudar um aluno a identificar pontos de melhoria com base em suas notas.
    Analise os dados a seguir, que contêm as matérias e as notas mensais de um aluno. As notas válidas vão de 0 a 25.
    Identifique as 2-3 matérias com as médias mais baixas e que precisam de mais atenção.
    Para cada uma dessas matérias, forneça uma sugestão curta (2-3 frases), motivacional e prática sobre como o aluno pode melhorar.
    Formate sua resposta usando markdown. Use títulos para cada matéria e listas para as sugestões.
    Se todas as notas forem boas, parabenize o aluno pelo excelente trabalho.
    Responda em português do Brasil.

    Dados das Matérias:
    ${formattedData}
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    return "Ocorreu um erro ao analisar seu desempenho. Por favor, tente novamente mais tarde.";
  }
};