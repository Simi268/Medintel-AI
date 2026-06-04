import { useState } from "react";
import { X } from "lucide-react";

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function BMIModal({
  open,
  onClose,
}: Props) {

  const [height, setHeight] =
    useState("");

  const [weight, setWeight] =
    useState("");

  const [result, setResult] =
    useState("");

  if (!open) return null;

  const calculateBMI = () => {

    const h =
      parseFloat(height) / 100;

    const w = parseFloat(weight);

    if (!h || !w) return;

    const bmi = (
      w / (h * h)
    ).toFixed(1);

    let status = "";

    if (+bmi < 18.5)
      status = "Underweight";

    else if (+bmi < 25)
      status = "Normal";

    else if (+bmi < 30)
      status = "Overweight";

    else
      status = "Obese";

    setResult(
      `Your BMI is ${bmi} (${status}) 💜`
    );
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50">

      <div className="w-[700px] rounded-[32px] border border-fuchsia-500/20 bg-[#071122] p-10">
        <div className="flex items-center justify-between mb-6">

          <h1 className="text-5xl font-black">
            BMI Calculator
          </h1>

          <button onClick={onClose}>
            <X />
          </button>

        </div>

        <div className="space-y-5">

          <input
            placeholder="Height (cm)"
            value={height}
            onChange={(e) =>
              setHeight(e.target.value)
            }
            className="
w-full
rounded-3xl
border
border-white/20
bg-white/5
p-6
text-2xl
font-medium
text-white
placeholder:text-gray-400
outline-none
"
          />

          <input
            placeholder="Weight (kg)"
            value={weight}
            onChange={(e) =>
              setWeight(e.target.value)
            }
            className="
w-full
rounded-3xl
border
border-white/20
bg-white/5
p-6
text-2xl
font-medium
text-white
placeholder:text-gray-400
outline-none
"
          />

          <button
            onClick={calculateBMI}
           className="
w-full
py-5
rounded-3xl
bg-gradient-to-r
from-purple-500
to-pink-500
font-black
text-2xl
hover:scale-[1.02]
transition-all
"
          >
            Calculate BMI
          </button>

          {result && (

            <div
  className="
  rounded-[28px]
  border border-fuchsia-500/20
  bg-gradient-to-b
  from-white/10
  to-white/5
  p-8
  text-3xl
  font-bold
  text-center
  text-white
  shadow-xl
  shadow-fuchsia-500/10
  "
>

              {result}

            </div>

          )}

        </div>

      </div>
    </div>
  );
}