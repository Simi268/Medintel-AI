
import { useEffect, useState } from "react";

import MainLayout from "./components/layout/MainLayout";

import ChatWindow from "./components/chat/ChatWindow";
import ChatInput from "./components/chat/ChatInput";

import RightPanel from "./components/widgets/RightPanel";

import ReportModal from "./components/modals/ReportModal";
import DrugModal from "./components/modals/DrugModal";
import BMIModal from "./components/modals/BMIModal";

import api from "./services/api";

import type { Message } from "./types/chat";

import {
  Brain,
  Activity,
  Pill,
  FileText,
  Calculator,
} from "lucide-react";


// =================================================
// SPEECH TYPES
// =================================================

declare global {

  interface Window {

    SpeechRecognition: any;

    webkitSpeechRecognition: any;
  }
}

export default function App() {

  // =================================================
  // USER
  // =================================================

  const userId =
    Number(
      localStorage.getItem("user_id")
    );

  // =================================================
  // STATES
  // =================================================

  const [message, setMessage] =
    useState("");

  const [messages, setMessages] =
    useState<Message[]>([]);

  const [isTyping, setIsTyping] =
    useState(false);

  const [isListening, setIsListening] =
    useState(false);

  const [conversationId, setConversationId] =
    useState<number | null>(null);

  const [conversations, setConversations] =
    useState<any[]>([]);

  const [selectedImage, setSelectedImage] =
    useState<File | null>(null);

  // =================================================
  // MODALS
  // =================================================

  const [reportOpen, setReportOpen] =
    useState(false);

  const [drugOpen, setDrugOpen] =
    useState(false);

  const [bmiOpen, setBMIOpen] =
    useState(false);

  // =================================================
  // LOAD CONVERSATIONS
  // =================================================

  useEffect(() => {

    fetchConversations();

  }, []);

  // =================================================
  // FETCH CONVERSATIONS
  // =================================================

  const fetchConversations = async () => {

    try {

      const response = await fetch(

        `https://medintel-ai-75k0.onrender.com/chat/conversations?user_id=${userId}`

      );

      const data = await response.json();

      setConversations(data);

    } catch (error) {

      console.error(error);
    }
  };

  // =================================================
  // LOAD CONVERSATION
  // =================================================

  const loadConversation = async (
    id: number
  ) => {

    try {

      const response = await fetch(
        `/chat/messages/${id}`
      );

      const data = await response.json();

      const formatted = data.map(
        (msg: any) => ({
          role: msg.role,
          content: msg.content,
        })
      );

      setMessages(formatted);

      setConversationId(id);

    } catch (error) {

      console.error(error);
    }
  };

  // =================================================
  // CREATE CONVERSATION
  // =================================================

  const createConversation = async (
    question: string
  ) => {

    try {

      const response = await fetch(

        `https://medintel-ai-75k0.onrender.com/chat/conversation?question=${encodeURIComponent(question)}&user_id=${userId}`,

        {
          method: "POST",
        }
      );

      const data = await response.json();

      setConversationId(data.id);

      await fetchConversations();

      return data.id;

    } catch (error) {

      console.error(error);
    }
  };

  // =================================================
  // DELETE CONVERSATION
  // =================================================

  const deleteConversation = async (
    id: number
  ) => {

    try {

      await fetch(

        `https://medintel-ai-75k0.onrender.com/chat/conversation/${id}`,

        {
          method: "DELETE",
        }
      );

      setConversations((prev) =>
        prev.filter(
          (c) => c.id !== id
        )
      );

      if (conversationId === id) {

        setMessages([]);

        setConversationId(null);
      }

    } catch (error) {

      console.error(error);
    }
  };

  // =================================================
  // SAVE MESSAGE
  // =================================================

  const saveMessage = async (

    convoId: number,

    role: string,

    content: string
  ) => {

    try {

      await fetch(

        "https://medintel-ai-75k0.onrender.com/chat/message"
        + `?conversation_id=${convoId}`
        + `&role=${role}`
        + `&content=${encodeURIComponent(content)}`,

        {
          method: "POST",
        }
      );

    } catch (error) {

      console.error(error);
    }
  };

  // =================================================
  // SMART TITLE
  // =================================================

  const generateConversationTitle = (
    aiText: string
  ) => {

    const text =
      aiText.toLowerCase();

    if (
      text.includes("fracture")
    ) {
      return "Fracture Analysis";
    }

    if (
      text.includes("skin rash")
    ) {
      return "Skin Rash Analysis";
    }

    if (
      text.includes("pneumonia")
    ) {
      return "Chest X-ray Review";
    }

    if (
      text.includes("diabetes")
    ) {
      return "Diabetes Report";
    }

    return "Medical Analysis";
  };


  // =================================================
  // SEND MESSAGE
  // =================================================

  const sendMessage = async () => {

    if (
      !message.trim() &&
      !selectedImage
    ) {
      return;
    }

    const currentMessage =
      message;

    let convoId =
      conversationId;

    // =================================================
    // CREATE CONVERSATION
    // =================================================

    if (!convoId) {

      const title =
        currentMessage?.trim()

          ? currentMessage

          : selectedImage

            ? selectedImage.name
                .replace(/\.[^/.]+$/, "")
                .replace(/[_-]/g, " ")

            : "New Conversation";

      convoId =
        await createConversation(
          title
        );
    }

    // =================================================
    // USER MESSAGE
    // =================================================

    const userMessage: any = {

      role: "user",

      content:
        currentMessage ||
        "🖼️ Uploaded Image",

      image: selectedImage
        ? URL.createObjectURL(
            selectedImage
          )
        : null,
    };

    setMessages((prev) => [
      ...prev,
      userMessage,
    ]);

    await saveMessage(

      convoId!,

      "user",

      currentMessage ||
      "Uploaded Image"
    );

    setMessage("");

    setIsTyping(true);

    // =================================================
    // IMAGE ANALYSIS
    // =================================================

    if (selectedImage) {

      try {

        const formData =
          new FormData();

        formData.append(
          "file",
          selectedImage
        );

        formData.append(
          "question",
          currentMessage
        );

        const response =
          await fetch(
            "https://medintel-ai-75k0.onrender.com/vision/analyze",
            {
              method: "POST",
              body: formData,
            }
          );

        const data =
          await response.json();

        const aiResponse =
          data.response;

        const smartTitle =
          generateConversationTitle(
            aiResponse
          );

        // UPDATE TITLE

        await fetch(

          `https://medintel-ai-75k0.onrender.com/chat/conversation/${convoId}?title=${encodeURIComponent(smartTitle)}`,

          {
            method: "PUT",
          }
        );

        await fetchConversations();

        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: aiResponse,
          },
        ]);

        await saveMessage(

          convoId!,

          "assistant",

          aiResponse
        );

        
        setIsTyping(false);

      } catch (error) {

        console.error(error);

        setIsTyping(false);

        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content:
              "❌ Failed to analyze image.",
          },
        ]);
      }

      setSelectedImage(null);

      return;
    }

    // =================================================
    // NORMAL CHAT
    // =================================================

    try {

      const response =
        await api.post(
          "/rag/ask",
          {
            question:
              currentMessage,

            language:
              "English",

            conversation_id:
              conversationId,
          }
        );

      const aiResponse =
        response.data.response;

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: aiResponse,
        },
      ]);

      await saveMessage(

        convoId!,

        "assistant",

        aiResponse
      );

      setIsTyping(false);

    } catch (error) {

      console.error(error);

      setIsTyping(false);

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "Unable to connect to MedIntel AI backend.",
        },
      ]);
    }
  };

  // =================================================
  // IMAGE UPLOAD
  // =================================================

  const handleImageUpload = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {

    if (
      e.target.files &&
      e.target.files[0]
    ) {

      setSelectedImage(
        e.target.files[0]
      );
    }
  };

  // =================================================
  // MIC
  // =================================================

  const startListening = () => {

    const SpeechRecognition =
      window.SpeechRecognition ||
      window.webkitSpeechRecognition;

    if (!SpeechRecognition) {

      alert(
        "Speech recognition not supported."
      );

      return;
    }

    try {

      setIsListening(true);

      const recognition =
        new SpeechRecognition();

      recognition.lang =
        "en-US";

      recognition.start();

      recognition.onresult = (
        event: any
      ) => {

        const transcript =
          event.results[0][0]
            .transcript;

        setMessage(transcript);
      };

      recognition.onend = () => {

        setIsListening(false);
      };

      recognition.onerror = () => {

        setIsListening(false);
      };

    } catch (error) {

      console.error(error);

      setIsListening(false);
    }
  };

  // =================================================
  // NEW CHAT
  // =================================================

  const newConversation = () => {

    setConversationId(null);

    setMessages([]);

    setSelectedImage(null);
  };

  // =================================================
  // UI
  // =================================================

  return (

    <>

      <MainLayout

        conversations={conversations}

        onSelectConversation={
          loadConversation
        }

        onNewConversation={
          newConversation
        }

        onDeleteConversation={
          deleteConversation
        }

        rightPanel={

          <RightPanel

            openReport={() =>
              setReportOpen(true)
            }

            openDrug={() =>
              setDrugOpen(true)
            }

            openBMI={() =>
              setBMIOpen(true)
            }

          />
        }

      >
{/* CHAT */}
{messages.length === 0 && !conversationId ? (

<div className="flex-1 relative overflow-hidden bg-[#030712] flex items-center justify-center">

  {/* BACKGROUND */}
  <div className="absolute inset-0 overflow-hidden">

    {/* CENTER GLOW */}
    <div className="absolute top-1/2 left-1/2 w-[800px] h-[800px] -translate-x-1/2 -translate-y-1/2 bg-purple-500/15 blur-[220px] rounded-full glow-float" />

    {/* TOP LEFT GLOW */}
    <div className="absolute top-10 left-1/4 w-[450px] h-[450px] bg-fuchsia-500/10 blur-[180px] rounded-full glow-float" />

    {/* BOTTOM RIGHT GLOW */}
    <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-purple-500/10 blur-[180px] rounded-full glow-float" />

    {/* EXTRA PURPLE HAZE */}
    <div className="absolute top-1/3 right-1/3 w-[300px] h-[300px] bg-violet-500/10 blur-[160px] rounded-full glow-float" />

    {/* PARTICLES */}
    <div className="absolute top-12 left-12 w-2 h-2 bg-fuchsia-400/50 rounded-full animate-pulse" />
    <div className="absolute top-24 right-24 w-2 h-2 bg-purple-400/50 rounded-full animate-pulse" />
    <div className="absolute bottom-40 left-1/4 w-2 h-2 bg-fuchsia-400/50 rounded-full animate-pulse" />
    <div className="absolute bottom-24 right-12 w-2 h-2 bg-purple-400/50 rounded-full animate-pulse" />
    <div className="absolute top-1/3 left-2/3 w-1 h-1 bg-white/70 rounded-full animate-ping" />

  </div>

  {/* HERO CONTENT */}
  <div className="relative z-10 flex flex-col items-center">

    {/* BRAIN */}
    <div className="relative mb-12">

      <div className="absolute inset-0 rounded-full border border-fuchsia-500/20 scale-[1.3]" />
      <div className="absolute inset-0 rounded-full border border-fuchsia-500/10 scale-[1.6]" />
      <div className="absolute inset-0 rounded-full border border-fuchsia-500/10 scale-[1.9]" />

      <div className="w-32 h-32 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center shadow-[0_0_120px_rgba(217,70,239,0.55)] animate-pulse">

        <Brain
          size={56}
          className="text-white"
        />

      </div>

      {/* FLOATING ICONS */}

      <div className="absolute -left-14 top-6 float-slow w-14 h-14 rounded-2xl bg-[#1f2238] border border-fuchsia-500/20 flex items-center justify-center">

        <Activity
          size={24}
          className="text-fuchsia-400"
        />

      </div>

      <div className="absolute -right-14 top-8 float-delay w-14 h-14 rounded-2xl bg-[#1f2238] border border-fuchsia-500/20 flex items-center justify-center">

        <Pill
          size={24}
          className="text-fuchsia-400"
        />

      </div>

      <div className="absolute left-1/2 -bottom-8 -translate-x-1/2 float-slow w-14 h-14 rounded-2xl bg-[#1f2238] border border-fuchsia-500/20 flex items-center justify-center">

        <FileText
          size={24}
          className="text-fuchsia-400"
        />

      </div>

    </div>

    {/* TITLE */}

    <h1 className="text-9xl font-black mb-5 bg-gradient-to-r from-white via-pink-200 to-fuchsia-500 bg-clip-text text-transparent">

      MedIntel AI

    </h1>

    {/* SUBTITLE */}

    <p className="text-gray-200 text-xl text-center max-w-4xl leading-relaxed mb-12">

      Describe symptoms, upload reports, analyze medications
      and receive intelligent AI-powered healthcare insights.

    </p>

    {/* CARDS */}

    <div className="grid grid-cols-4 gap-5">

      <div className="w-44 h-32 rounded-3xl bg-[#171b2d]/70 backdrop-blur-xl border border-white/10 hover:border-fuchsia-500/30 hover:scale-105 transition-all flex flex-col items-center justify-center">

        <Activity
          size={26}
          className="mb-3 text-fuchsia-400"
        />

        <span className="font-semibold">
          Symptom Analysis
        </span>

      </div>

      <div className="w-44 h-32 rounded-3xl bg-[#171b2d]/70 backdrop-blur-xl border border-white/10 hover:border-fuchsia-500/30 hover:scale-105 transition-all flex flex-col items-center justify-center">

        <FileText
          size={26}
          className="mb-3 text-fuchsia-400"
        />

        <span className="font-semibold">
          Report Analyzer
        </span>

      </div>

      <div className="w-44 h-32 rounded-3xl bg-[#171b2d]/70 backdrop-blur-xl border border-white/10 hover:border-fuchsia-500/30 hover:scale-105 transition-all flex flex-col items-center justify-center">

        <Pill
          size={26}
          className="mb-3 text-fuchsia-400"
        />

        <span className="font-semibold">
          Drug Interaction
        </span>

      </div>

      <div className="w-44 h-32 rounded-3xl bg-[#171b2d]/70 backdrop-blur-xl border border-white/10 hover:border-fuchsia-500/30 hover:scale-105 transition-all flex flex-col items-center justify-center">

        <Calculator
          size={26}
          className="mb-3 text-fuchsia-400"
        />

        <span className="font-semibold">
          BMI Calculator
        </span>

      </div>

    </div>

  </div>

</div>

) : (

<ChatWindow
  messages={messages}
/>

)}


        

        {/* TYPING */}

        {isTyping && (

          <div className="px-6 md:px-10 pb-6">

            <div className="bg-[#111827] border border-fuchsia-500/10 rounded-3xl px-6 py-5 w-fit shadow-lg">

              <div className="flex items-center gap-2">

                <span className="w-2 h-2 rounded-full bg-fuchsia-400 animate-bounce" />

                <span className="w-2 h-2 rounded-full bg-fuchsia-400 animate-bounce delay-100" />

                <span className="w-2 h-2 rounded-full bg-fuchsia-400 animate-bounce delay-200" />

                <span className="ml-3 text-sm text-gray-300">

                  MedIntel is thinking...

                </span>

              </div>

            </div>

          </div>
        )}

        {/* IMAGE PREVIEW */}

        {selectedImage && (

          <div className="px-8 pb-4">

            <div className="flex items-center gap-4">

              <img
                src={URL.createObjectURL(
                  selectedImage
                )}
                alt="preview"
                className="w-24 h-24 rounded-2xl object-cover border border-fuchsia-500/20"
              />

              <button

                onClick={() =>
                  setSelectedImage(
                    null
                  )
                }

                className="px-4 py-2 rounded-xl border border-red-500/20 bg-red-500/10 text-red-400"

              >

                Remove

              </button>

            </div>

          </div>
        )}

        {/* INPUT */}

        <ChatInput

          message={message}

          setMessage={setMessage}

          onSend={sendMessage}

          startListening={
            startListening
          }

          onImageUpload={
            handleImageUpload
          }

          isListening={
            isListening
          }

        />

      </MainLayout>

      {/* MODALS */}

      <ReportModal

        open={reportOpen}

        onClose={() =>
          setReportOpen(false)
        }

      />

      <DrugModal

        open={drugOpen}

        onClose={() =>
          setDrugOpen(false)
        }

      />

      <BMIModal

        open={bmiOpen}

        onClose={() =>
          setBMIOpen(false)
        }

      />

    </>

  );
}
