import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser, registerUser } from "../api/auth";
import { useAuth } from "../context/Authcontext";

const Register = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [role, setRole] = useState("student");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!name || !email || !password || !mobileNumber) {
      setError("Please complete all required fields.");
      return;
    }

    try {
      await registerUser({
        name,
        email,
        password,
        mobile_number: mobileNumber,
        role,
      });

      const loginData = await loginUser({
        email,
        password,
      });

      login(loginData.user, loginData.token);
      navigate("/dashboard", { replace: true });
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          "Registration failed. Please check your values."
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4 py-10">
      <div className="w-full max-w-lg bg-white border border-slate-200 shadow-xl rounded-3xl p-8">
        <h1 className="text-3xl font-bold mb-4 text-slate-900">Register</h1>

        {error && (
          <div className="mb-4 rounded-lg bg-red-50 border border-red-200 p-3 text-sm text-red-700">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border border-slate-300 rounded-xl px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-indigo-300"
          />

          <input
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

          <input
            type="tel"
            placeholder="Mobile Number"
            value={mobileNumber}
            onChange={(e) => setMobileNumber(e.target.value)}
            className="border border-slate-300 rounded-xl px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-indigo-300"
          />

          <div className="grid grid-cols-2 gap-4">
            <label className="flex items-center gap-2 rounded-xl border border-slate-300 px-4 py-3">
              <input
                type="radio"
                name="role"
                value="student"
                checked={role === "student"}
                onChange={(e) => setRole(e.target.value)}
              />
              Student
            </label>

            <label className="flex items-center gap-2 rounded-xl border border-slate-300 px-4 py-3">
              <input
                type="radio"
                name="role"
                value="creator"
                checked={role === "creator"}
                onChange={(e) => setRole(e.target.value)}
              />
              Creator
            </label>

            <label className="flex items-center gap-2 rounded-xl border border-slate-300 px-4 py-3">
              <input
                type="radio"
                name="role"
                value="admin"
                checked={role === "admin"}
                onChange={(e) => setRole(e.target.value)}
              />
              Admin
            </label>
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl px-4 py-3 transition"
          >
            Create Account
          </button>
        </form>

        <p className="mt-6 text-sm text-slate-600">
          Already registered?{' '}
          <Link className="text-indigo-600 hover:underline" to="/login">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;