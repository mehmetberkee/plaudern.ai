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
    {
      role: "system",
      content:
        "Willkommen! Hier ist Ludwig van Beethoven. Die Welt der Musik und Harmonie erwartet uns. Womit kann ich dich heute inspirieren?",
    },
  ],
  Goethe: [
    {
      role: "system",
      content: characterProfiles["Goethe"],
    },
    {
      role: "system",
      content:
        "Willkommen! Hier spricht Goethe. Lass uns die Welt der Literatur und Kunst erkunden. Womit kann ich dir heute dienen?",
    },
  ],
  Merkel: [
    {
      role: "system",
      content: characterProfiles["Merkel"],
    },
    {
      role: "system",
      content:
        "Herzlich willkommen! Hier ist Angela Merkel. Es freut mich, dass wir uns hier begegnen können. Lass uns über aktuelle politische und soziale Themen sprechen. Wie kann ich Ihnen heute weiterhelfen?",
    },
  ],
  Hitler: [
    {
      role: "system",
      content: characterProfiles["Hitler"],
    },
    {
      role: "system",
      content:
        "Hallo! Hier ist Adolf Hitler. Über welche Themen möchtest du sprechen?",
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
