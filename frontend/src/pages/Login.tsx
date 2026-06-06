import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const fillDemo = () => {
    setEmail("demo@medintel.ai");
    setPassword("demo123");
  };

  const handleLogin = async () => {
    setLoading(true);

    try {
      const response = await fetch(
        `https://medintel-ai-75k0.onrender.com/auth/login?email=${email}&password=${password}`,
        {
          method: "POST",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.detail || "Invalid credentials");
        return;
      }

      localStorage.setItem(
        "user_id",
        String(data.user.id)
      );

      localStorage.setItem(
        "token",
        data.access_token
      );

      localStorage.setItem(
        "user",
        JSON.stringify(data.user)
      );

      window.location.href = "/";
    } catch (error) {
      console.error(error);
      alert("Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    
    <div className="min-h-screen bg-[#030712] flex items-center justify-center px-4 md:px-10 py-6 relative overflow-x-hidden">

      {/* Floating particles */}
      <div className="absolute top-10 left-10 w-2 h-2 bg-fuchsia-400 rounded-full animate-pulse" />
      <div className="absolute top-20 right-32 w-1 h-1 bg-fuchsia-400 rounded-full animate-pulse" />
      <div className="absolute bottom-20 left-24 w-2 h-2 bg-purple-400 rounded-full animate-pulse" />
      <div className="absolute bottom-10 right-20 w-2 h-2 bg-fuchsia-400 rounded-full animate-pulse" />

      {/* Background glow */}
      <div className="absolute w-[1000px] h-[1000px] bg-fuchsia-500/15 blur-[250px] rounded-full" />

      <div className="absolute top-20 left-1/3 w-[600px] h-[600px] bg-purple-500/10 blur-[180px] rounded-full" />

      <div className="absolute bottom-20 right-1/3 w-[500px] h-[500px] bg-pink-500/10 blur-[180px] rounded-full" />

      {/* Main Card */}
      <div
        className="
          w-full
          max-w-full max-w-[1300px]
          min-h-auto
          md:min-h-[850px]
          rounded-[32px]
          md:rounded-[32px] md:rounded-[60px]
          border
          border-fuchsia-500/20
          bg-[#0b1220]/80
          backdrop-blur-xl
          p-6
          md:p-6 md:p-20
          shadow-2xl
          relative
          z-10
        "
      >
        {/* Header */}
        <h1 className="text-4xl sm:text-5xl md:text-4xl sm:text-5xl md:text-8xl font-black text-white">
          MedIntel AI
        </h1>

        <p className="text-base sm:text-lg md:text-base md:text-2xl text-gray-400 mt-4 md:mt-8 leading-relaxed max-w-4xl">
          AI-powered medical intelligence platform for disease insights,
          predictive risk analysis, report interpretation, medication
          safety analysis, and clinical decision support.
        </p>

        {/* Email */}
        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          className="
            w-full
            mt-8
            md:mt-14
            rounded-2xl
            md:rounded-3xl
            bg-[#141a2f]
            border
            border-white/10
            px-5
            md:px-5 md:px-8
            py-4
            md:py-4 md:py-7
            text-base
            md:text-base md:text-2xl
            text-white
            placeholder:text-gray-400
            outline-none
            focus:border-fuchsia-500
          "
        />

        {/* Password */}
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
          className="
            w-full
            mt-4
            md:mt-6
            rounded-2xl
            md:rounded-3xl
            bg-[#141a2f]
            border
            border-white/10
            px-5
            md:px-5 md:px-8
            py-4
            md:py-4 md:py-7
            text-base
            md:text-text-base md:text-base md:text-2xl
            text-white
            placeholder:text-gray-400
            outline-none
            focus:border-fuchsia-500
          "
        />

        {/* Login */}
        <button
          disabled={loading}
          onClick={handleLogin}
          className="
            w-full
            mt-6
            md:mt-8
            rounded-2xl
            md:rounded-3xl
            bg-gradient-to-r
            from-purple-500
            to-pink-500
            py-4
            md:py-4 md:py-7
            text-lg
            md:text-lg md:text-3xl
            font-black
            text-white
            hover:scale-[1.01]
            transition-all
            disabled:opacity-50
          "
        >
          {loading ? "Signing In..." : "Login"}
        </button>

        {/* Demo Section */}
        <div
          className="
            mt-8
            md:mt-10
            rounded-3xl
            bg-black/20
            border
            border-fuchsia-500/20
            p-5
            md:p-8
          "
        >
          <h2 className="text-xl md:text-lg md:text-3xl font-bold text-white">
            Demo Access
          </h2>

          <p className="text-sm md:text-xl text-gray-400 mt-3">
            Visitors can instantly explore
            MedIntel AI using the public demo account.
          </p>

          <div className="mt-6 space-y-3 md:space-y-4">
            <p className="text-base md:text-base md:text-2xl">
              <span className="font-bold text-white">
                Demo Email:
              </span>{" "}
              <span className="text-fuchsia-300">
                demo@medintel.ai
              </span>
            </p>

            <p className="text-base md:text-base md:text-2xl">
              <span className="font-bold text-white">
                Password:
              </span>{" "}
              <span className="text-fuchsia-300">
                demo123
              </span>
            </p>
          </div>

          <button
            onClick={fillDemo}
            className="
              mt-6
              md:mt-8
              rounded-2xl
              border
              border-fuchsia-500/30
              px-5
              md:px-5 md:px-8
              py-3
              md:py-4
              text-sm
              md:text-xl
              text-fuchsia-400
              hover:bg-fuchsia-500/10
              transition-all
            "
          >
            Use Demo Account
          </button>
        </div>

        {/* Footer */}
        <div className="mt-8 md:mt-10 text-center text-gray-500 text-xs md:text-lg">
          Public demo access available for visitors.
        </div>
      </div>
    </div>
  );
}
