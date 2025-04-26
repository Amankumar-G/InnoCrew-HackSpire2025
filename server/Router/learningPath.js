import express from 'express';
import wrapAsync from '../utils/wrapAsync.js';
import { ChatOpenAI } from "@langchain/openai";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import dotenv from 'dotenv';
import Student from '../Schema/Student.js';
import passport from 'passport';
import { runTeaching } from '../Agents/agent.js';
const router = express.Router();
const model = new ChatOpenAI({ 
    apiKey : process.env.OPENAI_API_KEY,
    model: "gpt-4o-mini"
 });

function formatForLLM(userProfile) {
    return `
  User Profile:
  
  - Name: ${userProfile.name}
  - Age: ${userProfile.age}
  - Current Field: ${userProfile.currentField}
  - Current Skills: ${userProfile.currentSkills.join(", ")}
  - Interest in Learning: ${userProfile.interestInLearning.join(", ")}
  - Dream Role or Exam Target: ${userProfile.dreamRoleOrExam}
  - Time Commitment: ${userProfile.timeCommitmentHoursPerWeek} hours per week
  - Major Topic to Focus: ${userProfile.majorTopicToStudy}
  - Preferred Pace: ${userProfile.preferredPace}
  - Weak Areas: ${userProfile.weakAreas.join(", ")}
  - Deadline: ${userProfile.deadline}
    `
  }

  const systemTemplate = `You are an AI Learning Path Designer. Your job is to take a student’s profile and craft:

  1. **A concise summary** of their background and goals.
  2. **A personalized learning path** focused on their Major Topic to Study, broken into sub-topics.
  3. For each sub-topic:
     - A clear **goal statement** (“By the end of this sub-topic, the student will be able to…”).
     - A list of **key deliverables** or milestones (projects, quizzes, write-ups).
     - **Skill progression guidance** (what prerequisite skills to build first, how to layer complexity).
  4. **Motivational & study tips** tuned to their preferred pace, time commitment, and weak areas.
  5. You MUST output **only** valid JSON. 
The structure MUST be an array of objects. Each object MUST have exactly these fields:
        - "subtopic_name" (string)
        - "prompt" (string)
        - "goal_statement" (string)
        - "key_deliverables" (array of strings)
  Use the following profile data:
  
  {userProfile}
  
  Requirements:
  - **Tone:** Encouraging, clear, structured.
  - **Format:** Markdown with headings ("##", "###"), bullet lists, and numbered steps.
  - **Length:** Around 500-700 words.
  - **Voice:** Speak directly to the student (“You will…”, “Make sure to…”).
  - **Constraints:** Align sub-topics logically (from foundational to advanced). Tie deliverables to real-world or exam-style outcomes.
  
  Produce your output in this order:
  
  1. **Student Summary**  
  2. **Overall Learning Path Overview** (list of sub-topics)  
  3. **Detailed Sub-Topics Section**  
     - Sub-Topic Name  
     - Learning Goal  
     - Key Deliverables  
     - Skill Progression Guidance  
     - Recommended Time Allocation  
  4. **Motivational & Study Tips**  
  5. **Next Steps & Check-Ins** (how to track progress toward the deadline)
  6. **Learning Path JSON** (in a Markdown code block with the language hint \`\`\`json)
  
  Begin!
  `;

const promptTemplate = ChatPromptTemplate.fromMessages([
    ["system", systemTemplate],
  ]);
  
  const userProfile = {
      name: "Aarav Mehta",
      age: 21,
      currentField: "Information Technology",
      currentSkills: ["C++", "Data Structures", "Basic SQL"],
      interestInLearning: ["Web Development", "Backend Engineering"],
      dreamRoleOrExam: "Full Stack Developer at Microsoft",
      timeCommitmentHoursPerWeek: 12,
      majorTopicToStudy: "Backend Development",
      preferredPace: "Fast",
      weakAreas: ["Database Optimization", "System Design"],
      deadline: "2025-10-01"
    };

  router.post('/path',passport.authenticate('jwt', { session: false }), wrapAsync(async (req, res) => {
    const{ formdata } = req.body;   
    const studentId = req.user._id;

    const formated = formatForLLM(userProfile);
    const promptValue = await promptTemplate.invoke({
        userProfile: formated,
      });
      
    const response = await model.invoke(promptValue);
    console.log(`${response.content}`);
    const match = response.content.match(/```json\s*([\s\S]*?)\s*```/);

    const jsonString = match[1];
    const jsonData = JSON.parse(jsonString);
    console.log("✅ Extracted JSON object:", jsonData);
    const jsonDataWithIndex = jsonData.map((subtopic, index) => ({
        ...subtopic,
        index: index  // Add an index field to each subtopic
    }));
    
    const updated_user = await Student.findByIdAndUpdate(
        studentId,
        {
            $push: { learningPath: { $each: jsonDataWithIndex } }
        },
        { new: true }
    );

    console.log(updated_user);
    req.session.index = 1;
    res.status(201).json({ message: response.content });
}));

router.get('/set',async (req, res) => {
    req.session.index = 1; // Initialize index to 1
    res.status(200).json({ message: 'Index initialized successfully' });
})

router.get('/topic', passport.authenticate('jwt', { session: false }), wrapAsync(async (req, res) => {
    const studentId = req.user._id;
    const {index} = req.session;

    console.log("index", index);    
    const student = await Student.findOne({
        _id: studentId,
        "learningPath.index": index
    }, {
        "learningPath.$": index
    });

    const finalresponce = runTeaching(student.learningPath[0].subtopic_name, student.learningPath[0].goal_statement, student.learningPath[0].key_deliverables);
    
    res.status(200).json({
        message: 'Learning path fetched successfully',
        data: student.learningPath[0],
        responce: finalresponce
    });
}));

export default router;