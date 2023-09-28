"use client";
import React, { useState, useRef, useEffect, FC } from "react";
import SendMessage from "../components/SendMessage";
import ReceiveMessage from "../components/ReceiveMessage";
import InputField from "../components/InputField";
import { sendMsgtoOpenAI } from "@/pages/api/generate";
import UserHeader from "../components/UserHeader";
import ChatList from "../components/ChatList";
import { useUser } from "../contexts/userContext";
import UserTyping from "../components/UserTyping";
import SmallChatList from "../components/SmallChatList";

interface Message {
  type: "system" | "client";
  text: string;
}

interface MessagesState {
  [key: string]: Message[];
}
const page: FC = () => {
  const [isTyping, setIsTyping] = useState<Boolean>(false);
  const { selectedUser } = useUser();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [showTyping, setShowTyping] = useState<boolean>(false);
  const [isMenuClicked, setIsMenuClicked] = useState<boolean>(false);

  const menuClick = (): void => {
    isMenuClicked ? setIsMenuClicked(false) : setIsMenuClicked(true);
  };
  useEffect(() => {
    let typingTimer;
    if (isTyping) {
      typingTimer = setTimeout(() => {
        setShowTyping(true);
      }, 1000);
    } else {
      setShowTyping(false);
    }

    return () => clearTimeout(typingTimer);
  }, [isTyping]);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
    }
  };

  const handleSend = async (inputText) => {
    if (inputText) {
      setIsTyping(true);
      // Kullanıcının mesajlarını al
      const userMessages = messages[selectedUser] || [];

      // Yeni mesajı ekleyin
      const updatedMessages = [
        ...userMessages,
        { type: "client", text: inputText },
      ];

      // State'i güncelleyin
      setMessages({
        ...messages,
        [selectedUser]: updatedMessages,
      });

      const res = await sendMsgtoOpenAI(inputText, selectedUser);
      setIsTyping(false);
      const systemMessage = { type: "system", text: res };

      // Sistem mesajını ekleyin
      setMessages((prevMessages) => ({
        ...prevMessages,
        [selectedUser]: [...prevMessages[selectedUser], systemMessage],
      }));
    }
  };

  const [messages, setMessages] = useState<MessagesState>({
    Neuer: [
      {
        type: "system",
        text: "Hallo! Hier ist Manuel Neuer. Lass uns ins Tor springen und über Fußball sprechen. Wie kann ich dir heute helfen?",
      },
    ],
    Beethoven: [
      {
        type: "system",
        text: "Willkommen! Hier ist Ludwig van Beethoven. Die Welt der Musik und Harmonie erwartet uns. Womit kann ich dich heute inspirieren?",
      },
    ],
    Goethe: [
      {
        type: "system",
        text: "Willkommen! Hier spricht Goethe. Lass uns die Welt der Literatur und Kunst erkunden. Womit kann ich dir heute dienen?",
      },
    ],
    Merkel: [
      {
        type: "system",
        text: "Herzlich willkommen! Hier ist Angela Merkel. Es freut mich, dass wir uns hier begegnen können. Lass uns über aktuelle politische und soziale Themen sprechen. Wie kann ich Ihnen heute weiterhelfen?",
      },
    ],
    Hitler: [
      {
        type: "system",
        text: "Hallo! Hier ist Adolf Hitler. Über welche Themen möchtest du sprechen?",
      },
    ],
  });

  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  return (
    <div
      className={`flex gap-3 items-center justify-center bg-[#080f1b] h-screen`}
    >
      {isMenuClicked && (
        <div
          className={`fixed top-0 left-0 w-full h-full transition duration-300 ${
            isMenuClicked
              ? "backdrop-blur-md bg-black bg-opacity-50"
              : "bg-opacity-0 pointer-events-none"
          }`}
          onClick={menuClick}
        ></div>
      )}

      {isMenuClicked && (
        <div
          className={`absolute left-0 lg:hidden z-10 transform transition-all ease-in-out duration-500 ${
            isMenuClicked ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <SmallChatList />
        </div>
      )}

      <div className="lg:flex hidden">
        <ChatList />
      </div>
      <div className="flex flex-col gap-2 h-screen justify-center">
        <UserHeader
          src={`/${selectedUser}.jpg`}
          name={selectedUser}
          func={menuClick}
        />
        <div className="lg:w-[750px] md:w-[600px] w-full h-3/4 bg-[#121a2a] pt-10 rounded-lg">
          <div
            className="flex flex-col md:gap-1 overflow-y-auto scrollbar-hide"
            style={{ maxHeight: "calc(100% - 50px)" }}
            ref={messagesEndRef}
          >
            {messages[selectedUser].map((el, index) => {
              if (el.type === "client") {
                return (
                  <div className="ml-5">
                    <SendMessage key={index} text={el.text} />;
                  </div>
                );
              } else if (el.type === "system") {
                {
                  return (
                    <div className="mr-5">
                      <ReceiveMessage key={index} text={el.text} />;
                    </div>
                  );
                }
              }
              return null;
            })}
          </div>

          {showTyping && <UserTyping />}
        </div>

        {isMenuClicked ? (
          <div className="h-[48px] bg-black"></div>
        ) : (
          <div>
            <InputField onSend={handleSend} />
          </div>
        )}
      </div>
    </div>
  );
};

export default page;
