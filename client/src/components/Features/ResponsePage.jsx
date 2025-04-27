import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import ReactMarkdown from "react-markdown";

const ResponsePage = () => {
  const token = localStorage.getItem("authToken");
  const location = useLocation();
  const navigate = useNavigate();
  const responseData = location.state?.responseData;
  const cleanText = (responseData) =>
    responseData.replace(/\*\*(.*?)\*\*/g, "$1");

  if (!responseData) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#1E1E2F] text-[#EDEDED]">
        <p className="mb-4 text-xl">No response data available!</p>
        <button
          onClick={() => navigate("/")}
          className="px-6 py-2 bg-[#A29BFE] hover:bg-[#7f73ff] rounded-full"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#1E1E2F] text-[#EDEDED] p-10">
      <h1 className="mb-8 text-3xl font-bold">
        Your Personalized Learning Path
      </h1>

      {/* Summary Message */}
      <div className="bg-[#29293D] p-6 rounded-lg shadow-lg mb-8 whitespace-pre-wrap">
        <h2 className="mb-4 text-2xl font-semibold">Summary</h2>
        {/* <p>{responseData.message.split("## Student Summary")[1]?.split("## Overall Learning Path Overview")[0]}</p> */}
        <p>
          {cleanText(
            responseData.message
              .split("## Student Summary")[1]
              ?.split("## Overall Learning Path Overview")[0] || ""
          )}
        </p>
      </div>

      {/* Overall Learning Path Overview */}
      <div className="bg-[#29293D] p-6 rounded-lg shadow-lg mb-8 whitespace-pre-wrap">
        <h2 className="mb-4 text-2xl font-semibold">Learning Path Overview</h2>
        {/* <p>{responseData.message.split("## Overall Learning Path Overview")[1]?.split("## Detailed Sub-Topics Section")[0]}</p> */}
        <p>
          {cleanText(
            responseData.message
              .split("## Overall Learning Path Overview")[1]
              ?.split("## Detailed Sub-Topics Section")[0] || ""
          )}
        </p>
      </div>

      {/* Detailed Learning Path JSON */}
      <div className="bg-[#29293D] p-6 rounded-lg shadow-lg whitespace-pre-wrap">
        <h2 className="mb-4 text-2xl font-semibold">Subtopics Details</h2>
        {responseData.message.includes("```json") ? (
          <pre className="bg-[#1E1E2F] p-4 rounded-lg overflow-x-auto">
            {JSON.parse(
              responseData.message.split("```json")[1].split("```")[0]
            ).map((item, index) => (
              <div key={index} className="mb-6">
                <h3 className="text-xl font-semibold text-[#A29BFE] mb-2">
                  {item.subtopic_name}
                </h3>
                {/* <p className="mb-2"><strong>Prompt:</strong> {item.prompt}</p>
                <p className="mb-2"><strong>Goal:</strong> {item.goal_statement}</p> */}
                <p className="mb-2">
                  <strong>Prompt:</strong> {cleanText(item.prompt)}
                </p>
                <p className="mb-2">
                  <strong>Goal:</strong> {cleanText(item.goal_statement)}
                </p>

                <ul className="ml-4 list-disc list-inside">
                  {item.key_deliverables.map((deliverable, i) => (
                    <li key={i}>{deliverable}</li>
                  ))}
                </ul>
              </div>
            ))}
          </pre>
        ) : (
          <p>No detailed JSON available</p>
        )}
      </div>
      {/* Back button */}
      <div className="flex items-end justify-between mt-10">
        <button
          onClick={() => navigate("/paths")}
          className="px-6 py-2 bg-[#A29BFE] hover:bg-[#7f73ff] text-[#1E1E2F] rounded-full font-semibold"
        >
          Back to Form
        </button>
        <button
          onClick={async () => {
            console.log(token)
            try {
              const response = await axios.get("http://localhost:5000/learning-path/topic", {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              });
              // const response = {
              //   data:{
              //     "message": "Learning path fetched successfully",
              //     "response": [
              //         {
              //             "topicName": "Database Schema Design",
              //             "teacherLearning": "# Database Schema Design\n\nIn this subtopic, students will learn the principles of database schema design, focusing on normalization, denormalization, and the significance of relationships between tables. By analyzing real-world scenarios, students will create efficient database schemas that minimize redundancy and optimize data retrieval.\n\n## Learning Objectives\n- Understand the concepts of normalization and denormalization.\n- Identify and establish relationships between tables.\n- Design a normalized database schema that meets application requirements.\n- Analyze real-world scenarios to create efficient database schemas.\n\n## Key Concepts\n- *Normalization: The process of organizing data in a database to reduce redundancy and improve data integrity. This involves dividing large tables into smaller, related tables and defining relationships between them.\n- **Denormalization: The intentional introduction of redundancy into a database schema to improve read performance. This is often used in scenarios where data retrieval speed is more critical than data integrity.\n- **Relationships: The connections between tables in a database, which can be one-to-one, one-to-many, or many-to-many. Understanding these relationships is crucial for designing an effective schema that supports data integrity and efficient queries.\n\n## Practice Tasks\n1. **Normalization Exercise: Take a sample dataset (e.g., a list of customers and their orders) and normalize it into at least three separate tables. Explain the rationale behind your design choices.\n2. **Schema Design Challenge: Given a scenario (e.g., a library management system), create a database schema that includes at least five tables. Clearly define the relationships between these tables and justify your design.\n3. **Denormalization Analysis*: Review a provided normalized schema and identify potential areas where denormalization could improve performance. Discuss the trade-offs involved in your suggestions."
              //         },
              //         {
              //             "topicName": "SQL Query Optimization",
              //             "teacherLearning": "# SQL Query Optimization\n\nIn this subtopic, we will explore various techniques for optimizing SQL queries to enhance database performance. Students will learn about indexing, query execution plans, and how to identify and resolve performance bottlenecks in SQL queries.\n\n## Learning Objectives\n- Understand the importance of SQL query optimization.\n- Learn how to create and use indexes effectively.\n- Analyze query execution plans to identify performance issues.\n- Identify common performance bottlenecks in SQL queries.\n- Apply optimization techniques to improve query performance.\n\n## Key Concepts\n- *Indexing: Indexes are data structures that improve the speed of data retrieval operations on a database table. Understanding how to create and manage indexes is crucial for optimizing query performance.\n  \n- **Query Execution Plans: A query execution plan is a detailed roadmap of how a SQL query will be executed by the database engine. Analyzing these plans helps in identifying inefficient operations and potential improvements.\n\n- **Performance Bottlenecks: These are points in the query execution process that slow down performance. Common bottlenecks include full table scans, unnecessary joins, and suboptimal use of indexes.\n\n- **Optimization Techniques: Techniques such as rewriting queries, using appropriate joins, and limiting the result set can significantly enhance performance. \n\n## Practice Tasks\n1. **Index Creation: Write SQL statements to create indexes on a sample database table and analyze the performance difference before and after indexing.\n\n2. **Execution Plan Analysis: Use a SQL tool to generate the execution plan for a given query. Identify at least two areas where performance can be improved.\n\n3. **Query Rewrite*: Take a poorly performing SQL query and rewrite it using optimization techniques learned in this guide. Test the performance of the original and optimized queries."
              //         },
              //         {
              //             "topicName": "Advanced SQL Functions",
              //             "teacherLearning": "# Advanced SQL Functions\n\nIn this subtopic, students will explore advanced SQL functions, including window functions, common table expressions (CTEs), and subqueries. They will learn how to leverage these functions to write complex queries that can solve intricate data retrieval problems.\n\n## Learning Objectives\n- Understand and apply window functions to perform calculations across a set of table rows related to the current row.\n- Create and utilize common table expressions (CTEs) to simplify complex queries and improve readability.\n- Write and optimize subqueries to retrieve data based on the results of another query.\n\n## Key Concepts\n- *Window Functions*: These functions allow you to perform calculations across a specified range of rows related to the current row. Common examples include ROW_NUMBER(), RANK(), and SUM() OVER(). They are particularly useful for running totals, moving averages, and ranking data.\n  \n- *Common Table Expressions (CTEs): CTEs provide a way to define temporary result sets that can be referenced within a SELECT, INSERT, UPDATE, or DELETE statement. They enhance the readability of complex queries and can be recursive, allowing for hierarchical data retrieval.\n\n- **Subqueries: A subquery is a query nested inside another query. It can be used in SELECT, INSERT, UPDATE, or DELETE statements to filter results based on the output of another query. Understanding how to write efficient subqueries is crucial for complex data retrieval.\n\n## Practice Tasks\n1. **Window Function Exercise: Write a SQL query using a window function to calculate the cumulative sales for each product in a sales table, ordered by the sale date.\n\n2. **CTE Exercise: Create a CTE that retrieves the top 5 employees with the highest sales in each department from an employee sales table. Use this CTE in a main query to display the results.\n\n3. **Subquery Exercise*: Write a SQL query that retrieves all customers who have placed orders totaling more than the average order value across all customers. Use a subquery to calculate the average order value."
              //         },
              //         {
              //             "topicName": "Database Performance Monitoring",
              //             "teacherLearning": "# Database Performance Monitoring\n\nIn this subtopic, students will learn about tools and techniques for monitoring database performance. They will understand key performance indicators (KPIs) and how to use monitoring tools to track and analyze database performance over time.\n\n## Learning Objectives\n- Understand the importance of database performance monitoring.\n- Identify key performance indicators (KPIs) for databases.\n- Utilize monitoring tools to track database performance.\n- Analyze performance data to identify potential issues.\n\n## Key Concepts\n- *Database Performance Monitoring: The process of continuously observing and analyzing the performance of a database to ensure it operates efficiently and effectively.\n- **Key Performance Indicators (KPIs): Metrics used to evaluate the performance of a database, such as response time, throughput, and resource utilization.\n- **Monitoring Tools: Software applications that help in tracking database performance metrics, such as SQL Server Management Studio, Oracle Enterprise Manager, and third-party tools like New Relic or Datadog.\n- **Performance Analysis: The practice of interpreting the data collected from monitoring tools to identify trends, bottlenecks, and areas for improvement.\n\n## Practice Tasks\n1. **Identify KPIs: Create a list of at least five key performance indicators that are critical for monitoring a relational database. Explain why each KPI is important.\n2. **Tool Exploration: Choose a database monitoring tool (e.g., SQL Server Management Studio or a third-party tool) and explore its features. Write a brief summary of how it can help in monitoring database performance.\n3. **Performance Analysis Scenario*: Given a hypothetical scenario where a database is experiencing slow response times, outline a step-by-step approach using monitoring tools to diagnose the issue and suggest potential solutions."
              //         }
              //     ]
              // }
              // }
              navigate("/start", { state: { responseData: response.data.response } });
            } catch (error) {
              console.error("Error fetching data:", error);
              // You can also show an error toast or message if you want
            }
          }}
          className="px-6 py-2 bg-[#A29BFE] hover:bg-[#7f73ff] text-[#1E1E2F] rounded-full font-semibold"
        >
          Start
        </button>
      </div>
    </div>
  );
};

export default ResponsePage;
