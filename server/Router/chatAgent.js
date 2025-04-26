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
    console.log('Initializing chatbot with updated system prompt:', updatedSystemPrompt);
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

  try {
    await chatbot.memory.clear();
    res.json({ message: 'Chatbot memory cleared.' });
  } catch (error) {
    res.status(500).json({ error: 'Error clearing memory', details: error.message });
  }
});

// Start server
export default app; 