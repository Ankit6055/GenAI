import Groq from "groq-sdk";
import dotenv from "dotenv";
dotenv.config();

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

async function main() {
  const completion = await groq.chat.completions
    .create({
      //   temperature: 1,
      //   top_p: 0.2,
      //   stop: "ga", // Negative -> Ne
      //   max_completion_tokens: 1000,
      //   frequency_penalty: 1,
      //   presence_penalty: 1,
      response_format: { type: "json_object" },
      messages: [
        {
          role: "system",
          content: `You are a interview grader assistant. Your task is to generate candidate evaluation score.
            Ouput must be following JSON structure:
            {
                "confidence": number (1-10 scale),
                "accuracy": number (1-10 scale),
                "pass": boolean (true or false)
            }
                The response must: 
                   1. Include ALL fields shown above
                   2. Use only the exact field names shown
                   3. Follow the exact data types specified
                   4.Contain ONLY the JSON object and nothing else
            `,
          // content: `You are Jarvis, a smart review grader. Your task id to analyze given
          // review and return the sentiment. Classify the review as positive, neutral or
          // negative. You must return the result in valid JSON structure.
          // example: {"Sentiment": "Negative"}
          // `
        },
        {
          role: "user",
          content: `Review: These headphones arrives  quickly and look great, but the left earcup stopped working 
                    after a week.
                    Sentiment:`,
        },
      ],
      model: "llama-3.3-70b-versatile",
    })
    .then((chatCompletion) => {
      console.log(chatCompletion.choices[0]?.message?.content || "");
    });
}

main();
