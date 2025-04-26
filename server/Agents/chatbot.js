// chatbot.js
import { ChatOpenAI } from "@langchain/openai";
import { ChatPromptTemplate, MessagesPlaceholder } from "@langchain/core/prompts";
import { START, END, StateGraph, Annotation } from "@langchain/langgraph";
import { v4 as uuidv4 } from "uuid";
import { createMemory } from "./memoryStore.js";



function createChatbot(systemPrompt, threadId) {
  const llm = new ChatOpenAI({ temperature: 0 });

  const promptTemplate = ChatPromptTemplate.fromMessages([
    ["system", systemPrompt],
    new MessagesPlaceholder("messages"),
  ]);

  const callModel = async (state) => {
    const prompt = await promptTemplate.invoke(state);
    const response = await llm.invoke(prompt);
    return { messages: [response] };
  };

  const workflow = new StateGraph({})
    .addNode("model", callModel)
    .addEdge(START, "model")
    .addEdge("model", END);

  const memory = createMemory(threadId);
  const app = workflow.compile({ checkpointer: memory });

  return app;
}

async function sendMessage(app, threadId, message) {
  const config = { configurable: { thread_id: threadId } };
  const input = {
    messages: [{ role: "user", content: message }],
    language: "English",
  };
  const output = await app.invoke(input, config);
  return output.messages[output.messages.length - 1].content;
}

// 🔥 Correct ES export:
export { createChatbot, sendMessage };
