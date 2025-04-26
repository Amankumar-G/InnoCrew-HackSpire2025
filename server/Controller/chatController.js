import { OpenAIEmbeddings } from "@langchain/openai";
import { QdrantVectorStore } from "@langchain/qdrant";
import dotenv from 'dotenv'
import {OpenAI} from "openai"
dotenv.config();

const client = new OpenAI({apiKey:process.env.OPENAI_API_KEY})
export const chat = async (req, res) => {
    const {userQuery}= req.body;
  
    const embeddings = new OpenAIEmbeddings({
      model: 'text-embedding-3-small',
      apiKey:process.env.OPENAI_API_KEY,
    });

    console.log(embeddings);

    const vectorStore = await QdrantVectorStore.fromExistingCollection(
      embeddings,
      {
        url:process.env.QDRANT_URL,
        collectionName: 'pdf-docs',
      }
    );
    const ret = vectorStore.asRetriever({
      k: 2,
    });
    const result = await ret.invoke(userQuery);

    const SYSTEM_PROMPT = `
    You are helfull AI Assistant who answeres the user query based on the available context from PDF File.
    Context:
    ${JSON.stringify(result)}
    `;
    const chatResult = await client.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          { role: 'user', content: userQuery },
        ],
      });
    
      return res.json({
        message: chatResult.choices[0].message.content,
        docs: result,
      });
  
}

