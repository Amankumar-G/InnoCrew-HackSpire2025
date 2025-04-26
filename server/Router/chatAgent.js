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
  
  if (!systemPrompt) {
    return res.status(400).json({ error: 'systemPrompt is required' });
  }

  const memory = new BufferMemory({
    returnMessages: true,
    memoryKey: 'chat_history'
  });

  const prompt = ChatPromptTemplate.fromMessages([
    SystemMessagePromptTemplate.fromTemplate(systemPrompt),
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

  try {
    await chatbot.memory.clear();
    res.json({ message: 'Chatbot memory cleared.' });
  } catch (error) {
    res.status(500).json({ error: 'Error clearing memory', details: error.message });
  }
});

// Start server
export default app; 