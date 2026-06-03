import {
  useState,
} from "react";

import {
  useNavigate,
} from "react-router-dom";

import {
  loginUser,
} from "../api/auth";

import {
  useAuth,
} from "../context/Authcontext";

const Login = () => {

  const navigate =
    useNavigate();

  const {
    login,
  } = useAuth();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const handleSubmit =
    async (e) => {

      e.preventDefault();

      try {

        const data =
          await loginUser({
            email,
            password,
          });

        login(
          data.user,
          data.token
        );

        navigate("/");

      } catch (error) {

        alert(
          "Invalid credentials"
        );
      }
    };

  return (
    <div className="max-w-md mx-auto mt-10">

      <h1 className="text-3xl font-bold mb-6">
        Login
      </h1>

      <form
        onSubmit={
          handleSubmit
        }
        className="space-y-4"
      >

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) =>
            setEmail(
              e.target.value
            )
          }
          className="border p-2 w-full"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(
              e.target.value
            )
          }
          className="border p-2 w-full"
        />

        <button
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Login
        </button>

      </form>

    </div>
  );
};

export default Login;