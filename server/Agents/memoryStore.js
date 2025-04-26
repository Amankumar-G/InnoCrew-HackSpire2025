// memoryStore.js
import { MemorySaver } from "@langchain/langgraph";

const memoryStore = new Map();

function createMemory(threadId) {
  const memory = new MemorySaver();
  memoryStore.set(threadId, memory);
  return memory;
}

function getMemory(threadId) {
  return memoryStore.get(threadId);
}

function clearMemory(threadId) {
  memoryStore.delete(threadId);
}

export  { createMemory, getMemory, clearMemory };
