"use client";
import React, { useState, useEffect, useRef, FC } from "react";

declare global {
  interface Window {
    webkitSpeechRecognition: any;
  }
}

interface InputFieldProps {
  onSend: (text: string) => void;
}

const InputField: FC<InputFieldProps> = (props) => {
  const [inputValue, setInputValue] = useState<string>("");
  const [transcript, setTranscript] = useState<string>("");
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const recognitionRef = useRef<any>(null);
  const inputRef = useRef<any>(null);
  const startRecording = () => {
    setTranscript("");
    setIsRecording(true);
    // Create a new SpeechRecognition instance and configure it
    recognitionRef.current = new window.webkitSpeechRecognition();
    recognitionRef.current.continuous = true;
    recognitionRef.current.interimResults = true;
    recognitionRef.current.lang = "de";
    inputRef.current.focus();
    // Event handler for speech recognition results
    recognitionRef.current.onresult = (event: any) => {
      const { transcript: newTranscript } =
        event.results[event.results.length - 1][0];

      if (event.results[event.results.length - 1].isFinal) {
        setTranscript((prevTranscript) => {
          return `${prevTranscript} ${newTranscript}`;
        });
      }
      // Log the recognition results and update the transcript state
    };

    // Start the speech recognition
    recognitionRef.current.start();
  };

  const stopRecording = () => {
    setIsRecording(false);
    if (recognitionRef.current) {
      // Stop the speech recognition and mark recording as complete
      recognitionRef.current.stop();
    }
  };
  useEffect(() => {
    setInputValue(transcript);
    const inputElement = inputRef.current;
    inputElement.scrollLeft = inputElement.scrollWidth;
  }, [transcript]);
  const handleSendClick = () => {
    props.onSend(inputValue);
    setIsRecording(false);
    setInputValue("");
    setTranscript("");
  };
  return (
    <div className="flex items-center justify-center gap-2 lg:w-[750px] md:w-[600px]">
      <input
        ref={inputRef}
        value={inputValue}
        placeholder="Text here"
        onChange={(e) => {
          setInputValue(e.target.value);
        }}
        onKeyPress={(e) => {
          if (e.key === "Enter") {
            handleSendClick();
            stopRecording();
          }
        }}
        className="relative border-1 border-gray-500 rounded-md bg-[#121a2a] text-white w-full py-3 px-5 ml-2"
      ></input>
      {isRecording ? (
        <button
          onClick={stopRecording}
          className="bg-red-500 text-black h-[48px] w-[60px] rounded-lg flex justify-center items-center"
        >
          <svg
            className="h-6 w-6 "
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path fill="white" d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
          </svg>
        </button>
      ) : (
        <button
          onClick={startRecording}
          className=" flex justify-center items-center h-[48px] w-[60px] rounded-lg hover:bg-[#3f2b96] transition-all"
        >
          <svg
            viewBox="0 0 256 256"
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6"
          >
            <path
              fill="#a8c1fe" // Change fill color to the desired color
              d="M128 176a48.05 48.05 0 0 0 48-48V64a48 48 0 0 0-96 0v64a48.05 48.05 0 0 0 48 48ZM96 64a32 32 0 0 1 64 0v64a32 32 0 0 1-64 0Zm40 143.6V232a8 8 0 0 1-16 0v-24.4A80.11 80.11 0 0 1 48 128a8 8 0 0 1 16 0a64 64 0 0 0 128 0a8 8 0 0 1 16 0a80.11 80.11 0 0 1-72 79.6Z"
            />
          </svg>
        </button>
      )}
      <button
        className=" bg-black text-white h-[48px] w-[60px] rounded-lg flex justify-center items-center hover:bg-[#3f2b96] transition-all mr-2"
        onClick={handleSendClick}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="currentColor"
          className="text-[#a8c1fe] "
          viewBox="0 0 16 16"
        >
          <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576 6.636 10.07Zm6.787-8.201L1.591 6.602l4.339 2.76 7.494-7.493Z" />
        </svg>
      </button>
    </div>
  );
};

export default InputField;
