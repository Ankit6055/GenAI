import Groq from "groq-sdk";
import dotenv from "dotenv";
dotenv.config();

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

async function main() {
  const completion = await groq.chat.completions
    .create({
      messages: [
        {
            role: "system",
            content: "You are Jarvis, a smart personal assistant."
        },
        {
          role: "user",
          content: "Who are you?",
        },
      ],
      model: "openai/gpt-oss-20b",
    })
    .then((chatCompletion) => {
      console.log(chatCompletion.choices[0]?.message?.content || "");
    });
}

main();
