import {
  useState,
} from "react";

import {
  useNavigate,
} from "react-router-dom";

import {
  registerUser,
} from "../api/auth";

const Register = () => {

  const navigate =
    useNavigate();

  const [name, setName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const handleSubmit =
    async (e) => {

      e.preventDefault();

      try {

        await registerUser({
          name,
          email,
          password,
        });

        navigate("/login");

      } catch (error) {

        alert(
          "Registration failed"
        );
      }
    };

  return (
    <div className="max-w-md mx-auto mt-10">

      <h1 className="text-3xl font-bold mb-6">
        Register
      </h1>

      <form
        onSubmit={
          handleSubmit
        }
        className="space-y-4"
      >

        <input
          placeholder="Name"
          value={name}
          onChange={(e) =>
            setName(
              e.target.value
            )
          }
          className="border p-2 w-full"
        />

        <input
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
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Register
        </button>

      </form>

    </div>
  );
};

export default Register;