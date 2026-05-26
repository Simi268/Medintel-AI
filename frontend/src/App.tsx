import { useEffect, useRef, useState } from "react"
import ReactMarkdown from "react-markdown"

import {
  Brain,
  Send,
  Pill,
  FileText,
  Calculator,
  Activity,
  Sparkles,
  Mic,
} from "lucide-react"

function App() {
  const [input, setInput] = useState("")
  const [messages, setMessages] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [recentChats, setRecentChats] = useState<string[]>([])

  const chatEndRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({
      behavior: "smooth",
    })
  }, [messages, loading])

  useEffect(() => {
    localStorage.setItem(
      "medintel_messages",
      JSON.stringify(messages)
    )
  }, [messages])

  useEffect(() => {
    const savedMessages =
      localStorage.getItem("medintel_messages")

    if (savedMessages) {
      setMessages(JSON.parse(savedMessages))
    }
  }, [])

  const askAI = async () => {
    if (!input.trim()) return

    const userMessage = {
      sender: "user",
      text: input,
    }

    setMessages((prev) => [...prev, userMessage])

    const shortTitle =
      input.length > 26
        ? input.substring(0, 26) + "..."
        : input

    setRecentChats((prev) => {
      if (!prev.includes(shortTitle)) {
        return [shortTitle, ...prev]
      }
      return prev
    })

    const currentQuestion = input

    setInput("")
    setLoading(true)

    try {
      const response = await fetch(
        "http://127.0.0.1:8000/rag/ask",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },88888
          body: JSON.stringify({
            question: currentQuestion,
          }),
        }
      )

      const data = await response.json()

      setMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          text:
            data.response ||
            "No AI response available.",
        },
      ])
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          text:
            "⚠️ Unable to connect to AI backend.",
        },
      ])
    }

    setLoading(false)
  }

  return (
    <div className="h-screen bg-[#050816] text-white flex overflow-hidden max-w-[1920px] mx-auto">
      {/* LEFT SIDEBAR */}

      <div className="w-[230px] bg-[#091225] border-r border-white/10 flex flex-col justify-between p-4">
        <div>
          {/* LOGO */}

          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-fuchsia-600 flex items-center justify-center shadow-lg shadow-purple-500/30">
              <Brain size={24} />
            </div>

            <div>
              <h1 className="text-3xl font-black leading-none">
                MedIntel AI
              </h1>

              <p className="text-gray-400 text-xs mt-1">
                Healthcare Intelligence
              </p>
            </div>
          </div>

          {/* NEW CHAT */}

          <button className="w-full py-4 rounded-2xl bg-gradient-to-r from-indigo-500 to-fuchsia-600 text-lg font-bold shadow-2xl shadow-purple-500/20 hover:scale-[1.02] transition-all duration-300">
            + New Conversation
          </button>

          {/* RECENT CHATS */}

          <div className="mt-10">
            <h2 className="text-gray-500 text-xs font-bold tracking-[2px] mb-4">
              RECENT CONVERSATIONS
            </h2>

            <div className="space-y-3">
              {recentChats.map((chat, index) => (
                <div
                  key={index}
                  className="bg-white/5 border border-white/10 hover:border-purple-500/40 hover:bg-white/10 rounded-2xl px-4 py-4 transition-all duration-300 cursor-pointer"
                >
                  <div className="flex items-start gap-3">
                    <Activity
                      className="text-purple-400 mt-1"
                      size={16}
                    />

                    <div>
                      <p className="font-semibold text-sm leading-6">
                        {chat}
                      </p>

                      <p className="text-gray-500 text-[11px] mt-1">
                        AI conversation
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* HEALTH INSIGHT */}

        <div className="rounded-3xl bg-gradient-to-br from-indigo-500/20 to-fuchsia-500/10 border border-purple-500/20 p-5 shadow-xl">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles
              className="text-green-400"
              size={16}
            />

            <h3 className="font-bold text-sm">
              Health Insight
            </h3>
          </div>

          <p className="text-lg font-bold leading-9">
            “Small healthy habits today create
            a stronger tomorrow.”
          </p>

          <p className="text-gray-400 text-xs mt-4 leading-6">
            Stay hydrated, sleep well, and consult
            professionals when symptoms persist.
          </p>
        </div>
      </div>

      {/* CENTER */}

      <div className="flex-1 flex flex-col bg-gradient-to-b from-[#020617] to-[#071126]">
        {/* HEADER */}

        <div className="px-10 pt-8 pb-5">
          <div className="flex items-center justify-between">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-purple-300 text-xs font-semibold">
              <Sparkles size={14} />
              AI-powered healthcare intelligence
            </div>

            <div className="px-5 py-2 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 font-semibold flex items-center gap-2 text-sm">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
              AI Online
            </div>
          </div>

          <h1 className="text-7xl font-black leading-none mt-6 bg-gradient-to-r from-indigo-300 via-violet-400 to-fuchsia-500 bg-clip-text text-transparent">
            MedIntel AI
          </h1>

          <p className="text-xl text-gray-300 mt-5 font-medium">
            AI healthcare guidance for symptoms,
            reports, medications, and wellness.
          </p>
        </div>

        {/* CHAT */}

        <div className="flex-1 overflow-y-auto px-10 pt-4 pb-8">
          <div className="bg-white/[0.03] border border-white/10 rounded-[36px] min-h-[620px] p-8 shadow-2xl">
            <div className="space-y-8">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex ${
                    msg.sender === "user"
                      ? "justify-end"
                      : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[68%] rounded-[28px] px-7 py-5 shadow-xl ${
                      msg.sender === "user"
                        ? "bg-gradient-to-r from-indigo-500 to-fuchsia-600 text-white shadow-purple-500/20"
                        : "bg-[#3b4050] text-gray-100 border border-white/10"
                    }`}
                  >
                    <div className="leading-8 text-[16px] font-medium">
                      <ReactMarkdown>
                        {msg.text}
                      </ReactMarkdown>
                    </div>
                  </div>
                </div>
              ))}

              {loading && (
                <div className="flex justify-start">
                  <div className="bg-white/10 border border-white/10 px-6 py-4 rounded-3xl text-gray-300 max-w-[500px] animate-pulse text-base">
                    🧠 MedIntel AI is analyzing...
                  </div>
                </div>
              )}

              <div ref={chatEndRef}></div>
            </div>
          </div>
        </div>

        {/* INPUT */}

        <div className="px-10 pb-6">
          <div className="bg-white/10 border border-white/10 rounded-[28px] px-6 py-4 flex items-center gap-4 backdrop-blur-2xl shadow-xl">
            <button className="w-14 h-14 rounded-2xl bg-purple-500/20 flex items-center justify-center hover:bg-purple-500/30 transition-all">
              <Mic size={22} />
            </button>

            <input
              type="text"
              placeholder="Ask MedIntel AI..."
              value={input}
              onChange={(e) =>
                setInput(e.target.value)
              }
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  askAI()
                }
              }}
              className="flex-1 bg-transparent outline-none text-lg placeholder:text-gray-500"
            />

            <button
              onClick={askAI}
              className="px-8 py-4 rounded-2xl bg-gradient-to-r from-indigo-500 to-fuchsia-600 font-bold text-lg hover:scale-105 transition-all shadow-xl shadow-purple-500/20 flex items-center gap-2"
            >
              <Send size={18} />
              Ask AI
            </button>
          </div>
        </div>
      </div>

      {/* RIGHT PANEL */}

      <div className="w-[520px] bg-[#091225] border-l border-white/10 p-5 overflow-y-auto">
        <div className="space-y-6">
          {/* DRUG CHECKER */}

          <div className="bg-white/[0.03] border border-purple-500/20 rounded-[30px] p-5 shadow-xl">
            <div className="flex items-center gap-4 mb-5">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-r from-indigo-500 to-fuchsia-600 flex items-center justify-center shadow-lg shadow-purple-500/20">
                <Pill size={24} />
              </div>

              <div>
                <h2 className="text-3xl font-black">
                  Drug Checker
                </h2>

                <p className="text-gray-400 text-sm mt-1">
                  AI-powered medication analysis
                </p>
              </div>
            </div>

            <input
              type="text"
              placeholder="Enter medication..."
              className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-base outline-none mb-5"
            />

            <button className="w-full py-4 rounded-2xl bg-gradient-to-r from-indigo-500 to-fuchsia-600 font-bold text-xl shadow-lg shadow-purple-500/20 hover:scale-[1.02] transition-all">
              Check Drug
            </button>
          </div>

          {/* REPORT */}

          <div className="bg-white/[0.03] border border-purple-500/20 rounded-[30px] p-5 shadow-xl">
            <div className="flex items-center gap-4 mb-5">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-r from-indigo-500 to-fuchsia-600 flex items-center justify-center shadow-lg shadow-purple-500/20">
                <FileText size={24} />
              </div>

              <div>
                <h2 className="text-3xl font-black">
                  Report Analysis
                </h2>

                <p className="text-gray-400 text-sm mt-1">
                  Upload and analyze reports
                </p>
              </div>
            </div>

            <input
              type="file"
              className="mb-5 text-sm"
            />

            <button className="w-full py-4 rounded-2xl bg-gradient-to-r from-indigo-500 to-fuchsia-600 font-bold text-xl shadow-lg shadow-purple-500/20 hover:scale-[1.02] transition-all">
              Analyze Report
            </button>
          </div>

          {/* BMI */}

          <div className="bg-white/[0.03] border border-purple-500/20 rounded-[30px] p-5 shadow-xl">
            <div className="flex items-center gap-4 mb-5">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-r from-indigo-500 to-fuchsia-600 flex items-center justify-center shadow-lg shadow-purple-500/20">
                <Calculator size={24} />
              </div>

              <div>
                <h2 className="text-3xl font-black">
                  BMI Calculator
                </h2>

                <p className="text-gray-400 text-sm mt-1">
                  Calculate body mass index
                </p>
              </div>
            </div>

            <button className="w-full py-4 rounded-2xl bg-gradient-to-r from-indigo-500 to-fuchsia-600 font-bold text-xl shadow-lg shadow-purple-500/20 hover:scale-[1.02] transition-all">
              Calculate BMI
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
