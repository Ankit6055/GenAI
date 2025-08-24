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
          content:
            "You are a smart personal assistant who answers the asked questions.",
        },
        {
          role: "user",
        //   content: "When was iphone 16 launched?",
          content: "what is the current weather in bhubaneswar",
        },
      ],
      model: "llama-3.3-70b-versatile",
    })
    .then((chatCompletion) => {
      console.log(chatCompletion.choices[0]?.message?.content || "");
    });
}

main();
