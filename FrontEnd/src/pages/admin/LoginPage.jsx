import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../utils/api";
import { Eye, EyeOff } from "lucide-react";

const LoginPage = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await login(form);
      const token = res.access_token || res.token;
      if (token) {
        localStorage.setItem("token", token);
        navigate("/admin");
      } else {
        setError("Login gagal: token tidak ditemukan.");
      }
    } catch {
      setError("Username atau password salah!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 px-4">
      <div className="w-full max-w-xs sm:max-w-sm md:max-w-md p-6 sm:p-8 rounded-2xl border border-gray-600/30 bg-gray-800/40 backdrop-blur-md shadow-lg">
        {error && (
          <p className="mb-4 text-xs sm:text-sm md:text-base text-red-400 text-center">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
          <div>
            <input
              type="text"
              placeholder="Username"
              value={form.username}
              onChange={(e) => setForm({ ...form, username: e.target.value })}
              className="w-full px-3 sm:px-4 py-2 rounded-xl 
                        bg-gray-900/60 text-sm sm:text-base md:text-lg text-gray-100 placeholder-gray-400 
                        focus:outline-none focus:ring-2 focus:ring-gray-500"
            />
          </div>

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="w-full px-3 sm:px-4 py-2 rounded-xl 
                        bg-gray-900/60 text-sm sm:text-base md:text-lg text-gray-100 placeholder-gray-400 
                        focus:outline-none focus:ring-2 focus:ring-gray-500 pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center text-gray-400 hover:text-gray-200"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 rounded-xl 
                      bg-gradient-to-r from-gray-600 to-gray-700 
                      text-white text-sm sm:text-base md:text-lg font-medium tracking-wide shadow-md 
                      hover:opacity-90 transition disabled:opacity-50"
          >
            {loading ? "Loading..." : "Login"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default LoginPage;