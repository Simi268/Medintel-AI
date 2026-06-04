
import { useState } from "react";

export default function Signup() {

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const handleSignup = async () => {

    try {

      const response = await fetch(

        `http://127.0.0.1:8000/auth/signup?email=${email}&password=${password}`,

        {
          method: "POST",
        }
      );

      const data =
        await response.json();

      console.log(data);

      // SAVE TOKEN

      localStorage.setItem(

        "token",

        data.access_token
      );

      // SAVE USER

      localStorage.setItem(

        "user",

        JSON.stringify(data.user)
      );

      // REDIRECT

      window.location.href = "/";

    } catch (error) {

      console.error(error);

      alert("Signup failed");
    }
  };

  return (

    <div className="min-h-screen bg-[#030712] flex items-center justify-center px-6">

      <div className="w-full max-w-md rounded-[32px] border border-fuchsia-500/20 bg-[#0b1220] p-10 shadow-2xl">

        <h1 className="text-5xl font-black text-white">

          MedIntel
        </h1>

        <p className="text-gray-400 mt-3">

          Create your account
        </p>

        {/* EMAIL */}

        <input

          type="email"

          placeholder="Email"

          value={email}

          onChange={(e) =>
            setEmail(e.target.value)
          }

          className="w-full mt-8 rounded-2xl bg-white/5 border border-white/10 px-5 py-4 text-white outline-none"
        />

        {/* PASSWORD */}

        <input

          type="password"

          placeholder="Password"

          value={password}

          onChange={(e) =>
            setPassword(
              e.target.value
            )
          }

          className="w-full mt-5 rounded-2xl bg-white/5 border border-white/10 px-5 py-4 text-white outline-none"
        />

        {/* BUTTON */}

        <button

          onClick={handleSignup}

          className="w-full mt-8 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 py-4 font-bold text-white"
        >

          Create Account

        </button>

      </div>

    </div>
  );
}
