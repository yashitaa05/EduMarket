import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../api/auth";
import { useAuth } from "../context/Authcontext";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Email and password are required.");
      return;
    }

    try {
      // const data = await loginUser({ email, password });
      // login(data.user, data.token);

      const data = await loginUser({ email, password });
      console.log("LOGIN RESPONSE:", data);
      login(data.user, data.token);
      
      navigate("/dashboard", { replace: true });
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          "Invalid credentials. Please try again."
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4 py-10">
      <div className="w-full max-w-md bg-white border border-slate-200 shadow-xl rounded-3xl p-8">
        <h1 className="text-3xl font-bold mb-4 text-slate-900">Login</h1>

        {error && (
          <div className="mb-4 rounded-lg bg-red-50 border border-red-200 p-3 text-sm text-red-700">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border border-slate-300 rounded-xl px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-indigo-300"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border border-slate-300 rounded-xl px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-indigo-300"
          />

          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl px-4 py-3 transition"
          >
            Login
          </button>
        </form>

        <p className="mt-6 text-sm text-slate-600">
          New here?{' '}
          <Link className="text-indigo-600 hover:underline" to="/register">
            Register an account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;