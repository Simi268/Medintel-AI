
import { useState } from "react";
import { Upload, X } from "lucide-react";
import ReactMarkdown from "react-markdown";
import api from "../../services/api";

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function ReportModal({
  open,
  onClose,
}: Props) {
  const [file, setFile] = useState<File | null>(null);

  const [loading, setLoading] = useState(false);

  const [result, setResult] = useState("");

  if (!open) return null;

  // ============================================
  // ANALYZE REPORT
  // ============================================

  const analyzeReport = async () => {
    if (!file) return;

    setLoading(true);
    setResult("");

    const formData = new FormData();

    formData.append("file", file);

    try {
      const response = await api.post(
        "/report/analyze",
        formData,
        {
          headers: {
            "Content-Type":
              "multipart/form-data",
          },
        }
      );

      console.log(response.data);

      setResult(
        response.data.analysis ||
          "No analysis returned."
      );
    } catch (error) {
      console.error(error);

      setResult(
        "❌ Unable to analyze report."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md">
      <div className="w-[1200px] max-h-[95vh] overflow-y-auto rounded-3xl border border-fuchsia-500/20 bg-[#071122] p-8">
        
        {/* HEADER */}

        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-4xl font-black text-white">
            Analyze Medical Report
          </h1>

          <button
            onClick={onClose}
            className="text-white hover:text-red-400 transition"
          >
            <X size={28} />
          </button>
        </div>

        {/* UPLOAD BOX */}

        <label className="flex h-64 cursor-pointer flex-col items-center justify-center rounded-3xl border border-dashed border-white/10 bg-white/5 transition hover:bg-white/10">
          <Upload size={40} />

          <p className="mt-4 text-lg font-medium">
            Drag & Drop Report
          </p>

          <p className="text-gray-400">
            PDF, PNG, JPG, TXT
          </p>

          <input
            type="file"
            hidden
            accept=".pdf,.png,.jpg,.jpeg,.txt"
            onChange={(e) => {
              if (e.target.files?.[0]) {
                setFile(
                  e.target.files[0]
                );
              }
            }}
          />
        </label>

        {/* FILE NAME */}

        {file && (
          <p className="mt-4 text-pink-400">
            Selected: {file.name}
          </p>
        )}

        {/* ANALYZE BUTTON */}

        <button
          onClick={analyzeReport}
          disabled={!file || loading}
          className="
            mt-6
            w-full
            rounded-2xl
            bg-gradient-to-r
            from-purple-500
            to-pink-500
            py-4
            text-lg
            font-bold
            text-white
            transition
            hover:scale-[1.01]
            disabled:cursor-not-allowed
            disabled:opacity-50
          "
        >
          {loading
            ? "Analyzing..."
            : "Generate AI Analysis"}
        </button>

        {/* RESULT */}

        {result && (
          <div
            className="
              mt-8
              rounded-[32px]
              border
              border-fuchsia-500/20
              bg-gradient-to-b
              from-white/10
              to-white/5
              p-10
              backdrop-blur-xl
              min-h-[420px]
              max-h-[650px]
              overflow-y-auto
              text-white
              shadow-2xl
              shadow-fuchsia-500/10
            "
          >
            {/* RESULT HEADER */}

            <div className="mb-8 flex items-center gap-4">
              <div className="h-4 w-4 rounded-full bg-green-400 animate-pulse" />

              <p
                className="
                  text-xl
                  font-black
                  uppercase
                  tracking-[0.25em]
                  text-fuchsia-300
                "
              >
                MedIntel AI Analysis
              </p>
            </div>

            {/* MARKDOWN CONTENT */}

            <div
  className="
  prose
  prose-invert
  max-w-none
  prose-headings:text-fuchsia-300
  prose-strong:text-pink-300
  prose-li:my-2
  prose-p:text-white
  text-[24px]
  leading-[3rem]
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
