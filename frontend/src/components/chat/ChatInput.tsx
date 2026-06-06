import {
  Image,
  Mic,
  Send,
} from "lucide-react";

interface Props {

  message: string;

  setMessage: (
    value: string
  ) => void;

  onSend: () => void;

  startListening: () => void;

  onImageUpload: (
    e: React.ChangeEvent<HTMLInputElement>
  ) => void;

  isListening: boolean;
}

export default function ChatInput({

  message,

  setMessage,

  onSend,

  startListening,

  onImageUpload,

  isListening,

}: Props) {

  return (

    <div className="border-t border-fuchsia-500/10 bg-[#060816] px-3 md:px-10 py-3 md:py-6">

      {/* INPUT CONTAINER */}
      <div className="flex items-center gap-2 md:gap-5 rounded-[24px] md:rounded-[36px] border border-fuchsia-500/10 bg-[#111827] px-3 md:px-7 py-3 md:py-6 shadow-[0_0_40px_rgba(217,70,239,0.08)]">
        {/* IMAGE BUTTON */}

        <button
          onClick={() => {

            const input =
              document.getElementById(
                "imageUpload"
              ) as HTMLInputElement;

            input?.click();
          }}
         className="w-11 h-11 md:w-14 md:h-14 rounded-xl md:rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center transition-all"
        >

          <Image size={22} />

        </button>

        {/* HIDDEN FILE INPUT */}

        <input
          id="imageUpload"
          type="file"
          accept="image/*,.pdf,.txt"
          onChange={onImageUpload}
          className="hidden"
        />

        {/* MIC */}

        <button
          onClick={startListening}
          className="relative w-11 h-11 md:w-14 md:h-14 rounded-xl md:rounded-2xl bg-fuchsia-500/10 hover:bg-fuchsia-500/20 border border-fuchsia-500/20 flex items-center justify-center transition-all overflow-hidden"
        >

          <Mic size={22} />

          {/* WAVEFORM */}

          {isListening && (

            <div className="absolute bottom-1 flex items-end gap-[2px]">

              <span className="w-1 h-3 bg-fuchsia-400 rounded-full animate-pulse" />

              <span className="w-1 h-5 bg-fuchsia-400 rounded-full animate-pulse delay-75" />

              <span className="w-1 h-2 bg-fuchsia-400 rounded-full animate-pulse delay-150" />

            </div>
          )}

        </button>

        {/* INPUT */}

        <input
          value={message}
          onChange={(e) =>
            setMessage(
              e.target.value
            )
          }
          onKeyDown={(e) => {

            if (e.key === "Enter") {

              onSend();
            }
          }}
          placeholder="Describe symptoms or ask MedIntel AI..."
          className="flex-1 bg-transparent outline-none text-[15px] md:text-[20px] text-white placeholder:text-gray-400"
        />

        {/* SEND */}

        <button
          onClick={onSend}
          className="px-3 md:px-9 py-3 md:py-4 rounded-xl md:rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 font-bold text-sm md:text-lg flex items-center gap-2 md:gap-3 shadow-[0_0_30px_rgba(217,70,239,0.2)] hover:scale-[1.02] transition-all"
        >

          <Send size={18} />
<span className="hidden md:inline">
  Ask AI
</span>

        </button>

      </div>

    </div>
  );
}
