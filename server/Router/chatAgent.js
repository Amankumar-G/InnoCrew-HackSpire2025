import express from 'express';
import { ChatOpenAI } from "@langchain/openai";
import { BufferMemory } from "langchain/memory";
import { ConversationChain } from "langchain/chains";

import { ChatPromptTemplate, MessagesPlaceholder, SystemMessagePromptTemplate, HumanMessagePromptTemplate } from '@langchain/core/prompts';
const app = express.Router();

// Global chatbot instance
let chatbot = null;

// Route 1: Initialize chatbot with a system prompt

app.post('/initialize', async (req, res) => {
  const { systemPrompt } = req.body;
  const myPrompt = `
    Assume you are an expert teacher for every topic. A curious student will ask many questions, and your goal is to provide short, accurate, and simple answers that are easy to understand. Always make sure to encourage the student to ask for clarifications if they don't understand, and actively guide them to deeper insights.
    At the end of the prompt, you will be given a learning text, which is the topic the student has most recently learned. You must strictly focus on answering questions related to this topic only. If any unrelated questions are asked, do not answer them. Instead, kindly redirect the student to the topic at hand.
    Remember, always keep answers clear, concise, and engaging. If necessary, prompt the student to ask for further clarification or elaboration`;
    const updatedSystemPrompt =myPrompt + systemPrompt;
  if (!updatedSystemPrompt) {
    return res.status(400).json({ error: 'systemPrompt is required' });
  }

  const memory = new BufferMemory({
    returnMessages: true,
    memoryKey: 'chat_history'
  });

  const prompt = ChatPromptTemplate.fromMessages([
    SystemMessagePromptTemplate.fromTemplate(updatedSystemPrompt),
    new MessagesPlaceholder('chat_history'),
    HumanMessagePromptTemplate.fromTemplate('{input}'),
  ]);

  chatbot = new ConversationChain({
    llm: new ChatOpenAI({
      temperature: 0,
      openAIApiKey: process.env.OPENAI_API_KEY,
      modelName: 'gpt-3.5-turbo',
    }),
    memory,
    prompt,
  });

  res.json({ message: 'Chatbot initialized with system prompt.' });
});

// Route 2: Send message and get response
app.post('/send', async (req, res) => {
  if (!chatbot) {
    return res.status(400).json({ error: 'Chatbot is not initialized. Call /initialize first.' });
  }

  const { message } = req.body;
  
  if (!message) {
    return res.status(400).json({ error: 'message is required' });
  }

  try {
    const response = await chatbot.call({ input: message });
    res.json({ response: response.response });
  } catch (error) {
    console.error("Error generating response:", error);
    res.status(500).json({ error: 'Error generating response', details: error.message });
  }
});

// Route 3: Clear chatbot memory
app.post('/clear', async (req, res) => {
  if (!chatbot) {
    return res.status(400).json({ error: 'Chatbot is not initialized. Call /initialize first.' });
  }
  const { page } = req.body;
  const message = `Act as a master question generator. Using the student's past memory and the topic "${page}", create exactly 5 different multiple-choice questions (MCQs).
Each question must have 4 options labeled "A", "B", "C", "D", and only one correct answer.
Output strictly and only the following JSON format. Do not include any explanation, comments, or additional text. Only output the JSON:

json
Copy
Edit
{
  "quiz": [
    {
      "question": "Your question here",
      "options": {
        "A": "Option A",
        "B": "Option B",
        "C": "Option C",
        "D": "Option D"
      },
      "correct_option": "A"
    },
    {
      "question": "Your question here",
      "options": {
        "A": "Option A",
        "B": "Option B",
        "C": "Option C",
        "D": "Option D"
      },
      "correct_option": "C"
    },
    ...
  ]
}
Remember: Only output the JSON exactly in this format, no extra text.`

try {
  const response = await chatbot.call({ input: message });
  await chatbot.memory.clear(); 

  // Remove the triple backticks and optional 'json' tag
  const cleanedString = response.response
    .replace(/^```json\s*/i, '')  // Remove starting ```json
    .replace(/^```/, '')          // Just in case it’s ``` without json
    .replace(/```$/, '')          // Remove ending ```
    .trim();                      // Trim spaces/newlines

  const clean = JSON.parse(cleanedString);

  res.json({ response: clean });
} catch (error) {
  res.status(500).json({ error: 'Error processing response', details: error.message });
}

});

// Start server
export default app; 