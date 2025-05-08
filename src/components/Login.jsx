import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [toggleLogin, setToggleLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    username: "",
  });

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted:", formData);
    navigate("/");
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="bg-[#EAEDED] min-h-screen flex flex-col items-center justify-start font-sans py-10">
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg"
        alt="Amazon"
        className="w-28 mb-4"
      />

      <div className="bg-white border border-gray-300 rounded-md px-6 py-6 w-full max-w-md">
        <h1 className="text-2xl font-medium mb-4">
          {toggleLogin ? "Sign-In" : "Create Account"}
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {!toggleLogin && (
            <div>
              <label className="text-sm font-semibold">Your name</label>
              <input
                type="text"
                name="username"
                required
                value={formData.username}
                onChange={handleChange}
                className="border border-gray-400 rounded-sm px-3 py-1 w-full text-sm"
              />
            </div>
          )}

          <div>
            <label className="text-sm font-semibold">Email or mobile phone number</label>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="border border-gray-400 rounded-sm px-3 py-1 w-full text-sm"
            />
          </div>

          <div>
            <label className="text-sm font-semibold">Password</label>
            <input
              type="password"
              name="password"
              required
              value={formData.password}
              onChange={handleChange}
              className="border border-gray-400 rounded-sm px-3 py-1 w-full text-sm"
            />
            {toggleLogin && (
              <p className="text-xs text-blue-700 mt-1 cursor-pointer hover:underline">
                Forgot your password?
              </p>
            )}
          </div>

          <button
            type="submit"
            className="bg-yellow-400 hover:bg-yellow-500 text-sm rounded-md py-2 mt-2"
          >
            {toggleLogin ? "Sign-In" : "Create your Amazon account"}
          </button>
        </form>

        {toggleLogin && (
          <p className="text-xs mt-6 text-gray-700 leading-tight">
            By continuing, you agree to Amazon's{" "}
            <span className="text-blue-700 cursor-pointer hover:underline">
              Conditions of Use
            </span>{" "}
            and{" "}
            <span className="text-blue-700 cursor-pointer hover:underline">
              Privacy Notice
            </span>
            .
          </p>
        )}
      </div>

      {toggleLogin ? (
        <div className="w-full max-w-md mt-6">
          <div className="flex items-center">
            <hr className="flex-grow border-t border-gray-300" />
            <span className="text-sm text-gray-600 mx-2">New to Amazon?</span>
            <hr className="flex-grow border-t border-gray-300" />
          </div>
          <button
            onClick={() => setToggleLogin(false)}
            className="mt-4 bg-white border border-gray-400 text-sm w-full py-2 rounded-md hover:bg-gray-100"
          >
            Create your Amazon account
          </button>
        </div>
      ) : (
        <div className="w-full max-w-md mt-4 text-sm text-blue-700 text-center">
          <span
            onClick={() => setToggleLogin(true)}
            className="cursor-pointer hover:underline"
          >
            Already have an account? Sign-In
          </span>
        </div>
      )}
    </div>
  );
};

export default Login;
