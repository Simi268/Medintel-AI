
import {
  FileText,
  Pill,
  Calculator,
} from "lucide-react";

interface Props {
  openReport: () => void;
  openDrug: () => void;
  openBMI: () => void;
}

export default function RightPanel({
  openReport,
  openDrug,
  openBMI,
}: Props) {

  return (

    <div className="h-full px-6 py-8 flex flex-col gap-6">

      {/* ================================================= */}
      {/* HEADER */}
      {/* ================================================= */}

      <div>

        <p className="text-7xl font-black tracking-wide bg-gradient-to-r from-fuchsia-400 to-pink-500 bg-clip-text text-transparent">

          MedIntel Tools

        </p>

        <p className="mt-9 text-xl text-gray-300 leading-10 font-medium">
  AI-powered healthcare utilities and smart medical assistants.
        </p>

      </div>

      {/* ================================================= */}
      {/* REPORT */}
      {/* ================================================= */}

      <div className="rounded-3xl border border-fuchsia-500/20 bg-white/5 p-6 backdrop-blur-xl">

        <div className="flex items-center gap-4 mb-5">

          <div className="w-14 h-14 rounded-2xl bg-pink-500/20 flex items-center justify-center">

            <FileText
              className="text-pink-400"
              size={24}
            />

          </div>

          <div>

            <h2 className="text-2xl font-bold">
              Report Analyzer
            </h2>

            <p className="text-gray-400 text-sm mt-1">
              Upload reports & medical scans
            </p>

          </div>
        </div>

        <button
          onClick={openReport}
          className="w-full py-4 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 font-bold text-lg shadow-[0_0_25px_rgba(217,70,239,0.25)] hover:scale-[1.02] transition-all"
        >

          Analyze Report

        </button>

      </div>

      {/* ================================================= */}
      {/* DRUG */}
      {/* ================================================= */}

      <div className="rounded-3xl border border-fuchsia-500/20 bg-white/5 p-6 backdrop-blur-xl">

        <div className="flex items-center gap-4 mb-5">

          <div className="w-14 h-14 rounded-2xl bg-purple-500/20 flex items-center justify-center">

            <Pill
              className="text-purple-400"
              size={24}
            />

          </div>

          <div>

            <h2 className="text-2xl font-bold">
              Drug Interaction
            </h2>

            <p className="text-gray-400 text-sm mt-1">
              Check medication safety
            </p>

          </div>
        </div>

        <button
          onClick={openDrug}
          className="w-full py-4 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 font-bold text-lg shadow-[0_0_25px_rgba(217,70,239,0.25)] hover:scale-[1.02] transition-all"
        >

          Analyze Medication

        </button>

      </div>

      {/* ================================================= */}
      {/* BMI */}
      {/* ================================================= */}

      <div className="rounded-3xl border border-fuchsia-500/20 bg-white/5 p-6 backdrop-blur-xl">

        <div className="flex items-center gap-4 mb-5">

          <div className="w-14 h-14 rounded-2xl bg-cyan-500/20 flex items-center justify-center">

            <Calculator
              className="text-cyan-400"
              size={24}
            />

          </div>

          <div>

            <h2 className="text-2xl font-bold">
              BMI Calculator
            </h2>

            <p className="text-gray-400 text-sm mt-1">
              Instant health assessment
            </p>

          </div>
        </div>

        <button
          onClick={openBMI}
          className="w-full py-4 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 font-bold text-lg shadow-[0_0_25px_rgba(217,70,239,0.25)] hover:scale-[1.02] transition-all"
        >

          Calculate BMI

        </button>

      </div>

    </div>
  );
}
