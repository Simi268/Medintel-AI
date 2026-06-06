
import {
  Volume2,
  VolumeX,
} from "lucide-react";

// =================================================
// TYPES
// =================================================

interface Message {

  role: string;

  content: string;

  image?: string | null;
}

interface Props {

  messages: Message[];
}

// =================================================
// COMPONENT
// =================================================

export default function ChatWindow({

  messages,

}: Props) {

  // =================================================
  // SPEAK
  // =================================================

  const speakText = (
    text: string
  ) => {

    window.speechSynthesis.cancel();

    const speech =
      new SpeechSynthesisUtterance(
        text
      );

    speech.lang = "en-US";

    speech.rate = 1;

    speech.pitch = 1;

    speech.volume = 1;

    window.speechSynthesis.speak(
      speech
    );
  };

  // =================================================
  // STOP SPEAKING
  // =================================================

  const stopSpeaking = () => {

    window.speechSynthesis.cancel();
  };

  return (

    <div className="flex-1 overflow-y-auto px-3 md:px-10 py-4 md:py-8 space-y-4 md:space-y-8">

      {messages.map(
        (msg, index) => (

          <div

            key={index}

            className={`flex ${
              msg.role === "user"

                ? "justify-end"

                : "justify-start"
            }`}
          >

            <div
              className={`max-w-[95%] md:max-w-[75%] rounded-[24px] md:rounded-[30px] px-4 md:px-6 py-4 md:py-5 shadow-lg ${
                msg.role === "user"

                  ? "bg-gradient-to-r from-fuchsia-500 to-purple-600 text-white"

                  : "bg-[#111827] border border-fuchsia-500/10"
              }`}
            >

              {/* IMAGE */}

              {msg.image && (

                <img

                  src={msg.image}

                  alt="upload"

                  className="rounded-2xl mb-4 max-h-[320px] object-cover"

                />
              )}

              {/* MESSAGE */}

              <div className="whitespace-pre-wrap leading-relaxed md:leading-[2] text-[16px] md:text-[22px] font-medium text-gray-100">

                {msg.content}

              </div>

              {/* SPEAKER BUTTON */}

              {msg.role === "assistant" && (

                <div className="flex items-center gap-3 mt-5">

                  <button

                    onClick={() =>
                      speakText(
                        msg.content
                      )
                    }

                    className="flex items-center gap-2 px-3 py-2 rounded-xl bg-fuchsia-500/10 border border-fuchsia-500/20 hover:bg-fuchsia-500/20 transition-all text-sm"

                  >

                    <Volume2 size={16} />

                    Listen

                  </button>

                  <button

                    onClick={
                      stopSpeaking
                    }

                    className="flex items-center gap-2 px-3 py-2 rounded-xl bg-red-500/10 border border-red-500/20 hover:bg-red-500/20 transition-all text-sm"

                  >

                    <VolumeX size={16} />

                    Stop

                  </button>

                </div>
              )}

            </div>

          </div>
        )
      )}

    </div>
  );
}