import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/lib/auth";

const Signup: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const { signUp } = useAuth();
  const navigate = useNavigate();

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const { error } = await signUp(email, password);
    if (error) setError(error.message);
    else navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-purple-100 via-purple-50 to-pink-50 p-6">
      <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        <div className="hidden md:flex items-center justify-center">
          <img src="/public/placeholder.svg" alt="illustration" className="max-w-full max-h-[560px] opacity-90" />
        </div>

        <div className="bg-white/60 backdrop-blur-md rounded-2xl p-8 shadow-lg border border-white/30">
          <h2 className="text-2xl font-semibold text-gray-800 mb-1">Create your LifeOS account</h2>
          <p className="text-sm text-gray-600 mb-6">Sign up with email to get started.</p>

          <form onSubmit={submit} className="space-y-4">
            <label className="block">
              <div className="flex items-center gap-3 rounded-lg bg-white/80 border border-gray-200 px-3 py-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0z" />
                </svg>
                <input aria-label="Email" required type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="w-full bg-transparent outline-none" />
              </div>
            </label>

            <label className="block">
              <div className="flex items-center gap-3 rounded-lg bg-white/80 border border-gray-200 px-3 py-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c.529 0 1-.448 1-1V7a1 1 0 10-2 0v3c0 .552.471 1 1 1z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 11V7a7 7 0 0114 0v4" />
                  <rect x="5" y="11" width="14" height="10" rx="2" />
                </svg>
                <input aria-label="Password" required type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" className="w-full bg-transparent outline-none" />
              </div>
            </label>

            {error && <div className="text-red-600">{error}</div>}

            <button type="submit" className="w-full py-3 rounded-full text-white font-medium shadow-md bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600">
              Create account
            </button>
          </form>

          <p className="text-sm text-gray-600 mt-6">Already have an account? <Link to="/auth/login" className="text-purple-700 font-medium">Sign in</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
