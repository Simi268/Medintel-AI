
import { useState } from "react";
import { X } from "lucide-react";
import api from "../../services/api";
import ReactMarkdown from "react-markdown";

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function DrugModal({
  open,
  onClose,
}: Props) {

  const [drug, setDrug] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [result, setResult] =
    useState("");

  if (!open) return null;

  // ============================================
  // ANALYZE MEDICATION
  // ============================================

  const analyzeDrug = async () => {

    if (!drug.trim()) return;

    setLoading(true);

    setResult("");

    try {

      const response = await api.post(
        "/rag/drug-check",
        {
          drug: drug,
        }
      );

      console.log(response.data);

      setResult(
        response.data.response
      );

    } catch (error) {

      console.error(error);

      setResult(
        "Unable to analyze medication."
      );

    } finally {

      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50">

      <div className="w-[1200px] rounded-3xl border border-fuchsia-500/20 bg-[#071122] p-8">

        {/* HEADER */}

        <div className="flex items-center justify-between mb-6">

          <h1 className="text-4xl font-black leading-tight">
            Drug Interaction Checker
          </h1>

          <button onClick={onClose}>
            <X />
          </button>

        </div>

        {/* INPUT */}
        <textarea
  value={drug}
  onChange={(e) =>
    setDrug(e.target.value)
  }
  placeholder="Example: Paracetamol + Aspirin"
  className="
  w-full
  h-48
  rounded-3xl
  border
  border-white/10
  bg-white/5
  p-6
  outline-none
  resize-none
  text-xl
  font-medium
  text-white
  placeholder:text-gray-400
  "
/>

        {/* BUTTON */}

        <button
          onClick={analyzeDrug}
          className="w-full mt-6 py-4 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 font-bold text-lg"
        >

          {loading
            ? "Analyzing..."
            : "Analyze Medication"}

        </button>

        
{/* RESULT */}

{result && (

  <div
    className="
    mt-8
    rounded-[32px]
    border border-fuchsia-500/20
    bg-gradient-to-b
    from-white/10
    to-white/5
    backdrop-blur-xl
    p-10
    min-h-[420px]
    max-h-[650px]
    overflow-y-auto
    whitespace-pre-wrap
    leading-8
    text-[22px]
    font-medium
    text-white
    shadow-2xl
    shadow-fuchsia-500/10
    "
  >

    <div className="mb-8 flex items-center gap-4">

      <div
        className="
        w-4
        h-4
        rounded-full
        bg-green-400
        animate-pulse
        "
      />

      <p
        className="
        text-xl
        uppercase
        tracking-[0.2em]
        text-fuchsia-300
        font-black
        "
      >
        MedIntel AI Analysis
      </p>

    </div>

    <div
  className="
  text-[24px]
  leading-7
  text-white
  "
>
  <ReactMarkdown>
    {result}
  </ReactMarkdown>
</div>

  </div>

)}

      </div>
    </div>
  );
}
