
import ReactMarkdown from "react-markdown";

interface Props {
  role: "user" | "assistant";
  content: string;
}

export default function MessageBubble({
  role,
  content,
}: Props) {

  const isUser =
    role === "user";

  return (

    <div className="w-full flex">

      {/* ================================================= */}
      {/* MESSAGE CONTAINER */}
      {/* ================================================= */}

      <div
        className={`max-w-6xl rounded-[36px] px-10 py-8 shadow-2xl transition-all ${
          isUser

            // USER MESSAGE

            ? "ml-auto bg-gradient-to-r from-[#7c3aed] via-[#8b5cf6] to-[#c026d3] text-white border border-fuchsia-400/20 shadow-fuchsia-500/20"

            // ASSISTANT MESSAGE

            : "mr-auto border border-fuchsia-500/10 bg-[#111827] text-white shadow-black/40"
        }`}
      >

        {/* USER */}

        {isUser ? (

          <p className="text-[22px] leading-[42px] font-medium text-white">

            {content}

          </p>

        ) : (

          /* ASSISTANT */

          <div className="prose prose-invert max-w-none">

            <div className="text-[22px] leading-[42px] font-medium text-white">

              <ReactMarkdown>
                {content}
              </ReactMarkdown>

            </div>

          </div>

        )}

      </div>

    </div>
  );
}
