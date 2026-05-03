import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export default function Login() {
  const navigate = useNavigate();
  const { login, user } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // If already logged in, redirect
  if (user) {
    if (user.role === "artist") {
      navigate("/artisan", { replace: true });
    } else {
      navigate("/", { replace: true });
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email.trim()) {
      setError("Please enter your email address.");
      return;
    }
    if (!password) {
      setError("Please enter your password.");
      return;
    }

    setLoading(true);
    try {
      const loggedInUser = await login(email.trim(), password);
      // Redirect based on role
      if (loggedInUser.role === "artist") {
        navigate("/artisan");
      } else if (loggedInUser.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    } catch (err) {
      setError(err.message || "Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-slate-100 min-h-screen">
      <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden">
        <div className="layout-container flex h-full grow flex-col">
          <header className="flex items-center justify-between border-b border-primary/10 px-6 py-4 lg:px-20">
            <Link to="/" className="flex items-center gap-3">
              <div className="text-primary">
                <svg className="size-8" fill="currentColor" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                  <path clipRule="evenodd" d="M24 4H42V17.3333V30.6667H24V44H6V30.6667V17.3333H24V4Z" fillRule="evenodd"></path>
                </svg>
              </div>
              <h1 className="text-xl font-bold tracking-tight text-slate-900 dark:text-slate-100">Local Artisan Marketplace</h1>
            </Link>
          </header>
          <main className="flex flex-1 items-center justify-center p-4 lg:p-8">
            <div className="w-full max-w-[1000px] grid lg:grid-cols-2 bg-white dark:bg-slate-900 rounded-xl overflow-hidden shadow-xl shadow-primary/5">
              <div className="hidden lg:block relative min-h-[500px] bg-primary/10">
                <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuCBElCVqBCoXyTdwuvrNjZA7fuT-YH7Vi1SHHcVr52yzMlL90NII_95sNIMu0ZkuKN_G9p0E3j3SB_63ZRhG1G1akoBDmxfrBUSok9r_vlsvyfPa6pdJvxEElDLEthijKpNz18ECjhFrgVt6yoIhgyubJ2fdyJF1P-A51G--mEVZPlFmpKmRGkAINs32bMdWkuZFb8Cqko-YpXHStBzHc0gyIPoUsXUvTqKPJUL_32fAjCXXEzlCVBTvbC4X18tXuxnYGyZgFKAT_8')` }}></div>
                <div className="absolute inset-0 bg-primary/20 mix-blend-multiply"></div>
                <div className="absolute bottom-10 left-10 right-10 text-white">
                  <h2 className="text-3xl font-black mb-2">Preserving Craftsmanship</h2>
                  <p className="text-lg opacity-90">Every purchase supports a local creator and keeps a tradition alive.</p>
                </div>
              </div>
              <div className="flex flex-col justify-center p-8 lg:p-12">
                <div className="mb-8">
                  <h2 className="text-3xl font-black text-slate-900 dark:text-slate-100">Welcome Back</h2>
                  <p className="text-slate-500 dark:text-slate-400 mt-2">Log in to support your local artisans</p>
                </div>
                <form className="space-y-5" onSubmit={handleSubmit}>
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Email Address</label>
                    <input
                      className="w-full rounded-lg border-slate-200 dark:border-slate-700 bg-background-light dark:bg-slate-800 text-slate-900 dark:text-slate-100 h-12 px-4 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all placeholder:text-slate-400"
                      placeholder="Enter your email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <div className="flex justify-between items-center">
                      <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Password</label>
                      <Link className="text-xs font-medium text-primary hover:underline" to="/">Forgot password?</Link>
                    </div>
                    <div className="relative group">
                      <input
                        className="w-full rounded-lg border-slate-200 dark:border-slate-700 bg-background-light dark:bg-slate-800 text-slate-900 dark:text-slate-100 h-12 px-4 pr-12 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all placeholder:text-slate-400"
                        placeholder="Enter your password"
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                      <button onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-primary flex items-center" type="button">
                        <span className="material-symbols-outlined text-[20px]">{showPassword ? 'visibility_off' : 'visibility'}</span>
                      </button>
                    </div>
                  </div>
                  {error && (
                    <div className="flex items-center gap-2 text-red-600 bg-red-50 dark:bg-red-900/20 p-3 rounded-lg text-sm font-medium">
                      <span className="material-symbols-outlined text-lg">error</span>
                      {error}
                    </div>
                  )}
                  <div className="flex items-center gap-2 py-2">
                    <input className="rounded border-slate-300 text-primary focus:ring-primary h-4 w-4" id="remember" type="checkbox" />
                    <label className="text-sm text-slate-600 dark:text-slate-400" htmlFor="remember">Remember me for 30 days</label>
                  </div>
                  <button className="w-full bg-primary hover:bg-primary/90 text-white font-bold h-12 rounded-lg transition-colors shadow-lg shadow-primary/20 flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed" type="submit" disabled={loading}>
                    {loading ? "Signing in..." : "Sign In"}
                  </button>
                </form>
                <p className="text-sm text-slate-500 dark:text-slate-400 text-center mt-6">
                  Don't have an account? <Link to="/register" className="text-primary font-bold hover:underline">Sign Up</Link>
                </p>
              </div>
            </div>
          </main>
          <footer className="px-6 py-8 text-center">
            <p className="text-xs text-slate-400">&copy; 2024 Local Artisan Marketplace. Handcrafted with love.</p>
          </footer>
        </div>
      </div>
    </div>
  );
}
