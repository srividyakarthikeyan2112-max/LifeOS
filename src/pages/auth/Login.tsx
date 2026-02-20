import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/lib/auth";

const SocialButton: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <button className="flex items-center justify-center gap-2 w-12 h-10 rounded-lg bg-white/90 shadow-sm">
    {children}
  </button>
);

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const { signIn } = useAuth();
  const navigate = useNavigate();

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const { error } = await signIn(email, password);
    if (error) setError(error.message);
    else navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-purple-100 via-purple-50 to-pink-50 p-6">
      <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        {/* Left illustration */}
        <div className="hidden md:flex items-center justify-center">
          <div className="w-full h-full flex items-center justify-center">
            <img src="/public/placeholder.svg" alt="illustration" className="max-w-full max-h-[560px] opacity-90" />
          </div>
        </div>

        {/* Right card */}
        <div className="bg-white/60 backdrop-blur-md rounded-2xl p-8 shadow-lg border border-white/30">
          <h2 className="text-2xl font-semibold text-gray-800 mb-1">Welcome Back to LifeOS ✨</h2>
          <p className="text-sm text-gray-600 mb-6">Your personal life dashboard, all in one place.</p>

          <form onSubmit={submit} className="space-y-4">
            <label className="block">
              <div className="flex items-center gap-3 rounded-lg bg-white/80 border border-gray-200 px-3 py-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2 20a8 8 0 0116 0" />
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
              Sign In
            </button>
          </form>

          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-white/50" />
            <div className="text-sm text-gray-600">or continue with</div>
            <div className="flex-1 h-px bg-white/50" />
          </div>

          <div className="flex items-center gap-3">
            <SocialButton>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className="w-5 h-5">
                <path fill="#EA4335" d="M24 9.5c3.9 0 6.6 1.7 8.1 3.1l6-6C35.8 3 30.5 1 24 1 14.7 1 6.9 6 2.6 13.9l7 5.4C11.9 14 17.5 9.5 24 9.5z"/>
              </svg>
            </SocialButton>
            <SocialButton>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-5 h-5">
                <path fill="black" d="M16.36 1.02A9.86 9.86 0 0012 .5c-4.32 0-6.92 2.5-8.22 4.66C1.66 10.09 4.03 14 4.03 14s1.42.56 3.05-.52c.77-.56 1.56-1.66 2.62-1.66 1.05 0 1.84 1.1 2.62 1.66 1.63 1.08 3.05.52 3.05.52s2.37-3.91.25-8.84C19.28 2 17.2 1 16.36 1.02z"/>
              </svg>
            </SocialButton>
            <SocialButton>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-5 h-5">
                <path fill="#000" d="M12 .5C5.7.5.9 5.3.9 11.6c0 4.8 3.1 8.9 7.4 10.3.5.1.7-.2.7-.5v-1.9c-3 0-3.6-.8-3.8-1.5-.2-.5-.9-1.5-1.5-1.8-.5-.3-1.1-1-.1-1 .9 0 1.6.8 1.8 1.2 1 .1 1.9.7 3 .7 1.1 0 2-.6 3-.7.2-.5.9-1.2 1.8-1.2.9 0 .4.7-.1 1-.6.3-1.3 1.3-1.5 1.8-.2.7-.8 1.5-3.8 1.5V21c0 .3.2.6.7.5 4.3-1.4 7.4-5.5 7.4-10.3C23.1 5.3 18.3.5 12 .5z"/>
              </svg>
            </SocialButton>
          </div>

          <p className="text-sm text-gray-600 mt-6">Don't have an account? <Link to="/auth/signup" className="text-purple-700 font-medium">Sign up</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Login;
