import OpenAI from "openai";
import { characterProfiles } from "@/helper/characterProfiles";

interface Message {
  role: "user" | "system" | "assistant";
  content: string;
}

interface AllMessages {
  [key: string]: Message[];
}

const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

let allMessages: AllMessages = {
  Neuer: [
    {
      role: "system",
      content: characterProfiles["Neuer"],
    },
    {
      role: "system",
      content:
        "Hallo! Hier ist Manuel Neuer. Lass uns ins Tor springen und über Fußball sprechen. Wie kann ich dir heute helfen?",
    },
  ],
  Beethoven: [
    {
      role: "system",
      content: characterProfiles["Beethoven"],
    },
  ],
  Goethe: [
    {
      role: "system",
      content: characterProfiles["Goethe"],
    },
  ],
  Merkel: [
    {
      role: "system",
      content: characterProfiles["Merkel"],
    },
  ],
  Hitler: [
    {
      role: "system",
      content: characterProfiles["Hitler"],
    },
  ],
};

export async function sendMsgtoOpenAI(
  message: string,
  selectedUser: string
): Promise<string> {
  // Kullanıcının mesajını önceki mesajlara ekleyin
  allMessages[selectedUser].push({ role: "user", content: message });

  const res = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: allMessages[selectedUser],
    temperature: 0.7,
    max_tokens: 512,
    top_p: 1,
    frequency_penalty: 0,
  });
  if (
    res &&
    res.choices &&
    res.choices[0] &&
    res.choices[0].message &&
    res.choices[0].message.content
  ) {
    allMessages[selectedUser].push({
      role: "assistant",
      content: res.choices[0].message.content,
    });

    return res.choices[0].message.content;
  } else {
    throw new Error("Failed to retrieve message content from OpenAI");
  }
}
