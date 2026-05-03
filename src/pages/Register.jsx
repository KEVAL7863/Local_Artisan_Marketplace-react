import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export default function Register() {
  const navigate = useNavigate();
  const { register, login } = useAuth();
  const [role, setRole] = useState("user");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [studio, setStudio] = useState("");
  const [craft, setCraft] = useState("");
  const [error, setError] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Validation
    if (!name.trim()) {
      setError("Please enter your full name.");
      return;
    }
    if (!email.trim()) {
      setError("Please enter your email address.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    if (!agreed) {
      setError("Please agree to the Terms of Service and Privacy Policy.");
      return;
    }
    if (role === "artist" && !craft) {
      setError("Please select your craft type.");
      return;
    }

    setLoading(true);
    try {
      // register now auto-logs in (returns user with JWT)
      const user = await register({ role, name, email, password, studio, craft });
      if (user.role === "artist") {
        navigate("/artisan");
      } else {
        navigate("/");
      }
    } catch (err) {
      setError(err.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 min-h-screen">
      <div className="relative flex min-h-screen flex-col overflow-x-hidden">
        <div className="layout-container flex h-full grow flex-col">
          <header className="flex items-center justify-between border-b border-primary/10 px-4 md:px-10 py-4 bg-background-light dark:bg-background-dark">
            <Link to="/" className="flex items-center gap-3">
              <div className="text-primary">
                <span className="material-symbols-outlined text-3xl">brush</span>
              </div>
              <h2 className="text-slate-900 dark:text-slate-100 text-lg font-bold tracking-tight">Local Artisan Marketplace</h2>
            </Link>
          </header>
          <main className="flex-1 flex items-center justify-center py-12 px-4">
            <div className="w-full max-w-[960px] grid grid-cols-1 lg:grid-cols-2 gap-0 overflow-hidden rounded-xl shadow-2xl border border-primary/10">
              <div className="hidden lg:flex relative flex-col justify-end p-10 bg-primary/10">
                <div className="absolute inset-0 z-0">
                  <img alt="Pottery workshop tools and clay" className="w-full h-full object-cover opacity-80 mix-blend-multiply" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB9rBmKqrUVK1urAMVfSFqN5uGrqseaBYw8QxV2LCP70lhjKtFbP5iFoFrrzlwLhS0KVWajYOhOBEyBIZW0tx1fYz7t4Ild4Rl6venhCbpCG_UlVNUHr9y3CE-NvLQB73Ua1deH-mZXk6bs3TZGBE2isImKRxirT4GklUR8RQka66sA59ZmVijeVokCKynM01B6LBF38un3uWTdcOfX8ExPUc_FJogGn9OJT_l2FfVeDM42SD52Y0GlB64-Lyp47VoSthgmwmLmRkc" />
                </div>
                <div className="relative z-10 space-y-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary text-white text-xs font-semibold uppercase tracking-wider">
                    <span className="material-symbols-outlined text-sm">verified</span>
                    Certified Handmade
                  </div>
                  {role === "artist" ? (
                    <>
                      <h1 className="text-4xl font-bold text-white leading-tight">Start Selling Your Craft</h1>
                      <p className="text-white/90 text-lg">Join as an artisan to list your handcrafted products, manage orders, and grow your business.</p>
                    </>
                  ) : (
                    <>
                      <h1 className="text-4xl font-bold text-white leading-tight">Celebrate the Art of the Handmade</h1>
                      <p className="text-white/90 text-lg">Join a community of 50,000+ artisans and collectors dedicated to preserving craft traditions.</p>
                    </>
                  )}
                </div>
              </div>
              <div className="bg-white dark:bg-background-dark p-8 md:p-12">
                <div className="mb-8">
                  <h3 className="text-3xl font-bold text-slate-900 dark:text-slate-100">Create Account</h3>
                  <p className="text-slate-500 dark:text-slate-400 mt-2">
                    {role === "artist" ? "Set up your artisan shop and start selling." : "Start your journey into the world of unique crafts."}
                  </p>
                </div>
                <form className="space-y-5" onSubmit={handleSubmit}>
                  <div className="flex p-1 bg-primary/5 dark:bg-primary/10 rounded-xl">
                    <label className="flex-1 cursor-pointer group">
                      <input checked={role === "user"} onChange={() => setRole("user")} className="hidden peer" name="role" type="radio" value="user" />
                      <div className="flex items-center justify-center py-3 rounded-lg text-sm font-semibold transition-all peer-checked:bg-white dark:peer-checked:bg-primary peer-checked:shadow-sm peer-checked:text-primary dark:peer-checked:text-white text-slate-500 dark:text-slate-400">
                        <span className="material-symbols-outlined mr-2 text-xl">person</span>
                        Collector
                      </div>
                    </label>
                    <label className="flex-1 cursor-pointer group">
                      <input checked={role === "artist"} onChange={() => setRole("artist")} className="hidden peer" name="role" type="radio" value="artist" />
                      <div className="flex items-center justify-center py-3 rounded-lg text-sm font-semibold transition-all peer-checked:bg-white dark:peer-checked:bg-primary peer-checked:shadow-sm peer-checked:text-primary dark:peer-checked:text-white text-slate-500 dark:text-slate-400">
                        <span className="material-symbols-outlined mr-2 text-xl">palette</span>
                        Artisan
                      </div>
                    </label>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Full Name</label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-slate-400">person</span>
                        <input className="w-full pl-10 pr-4 py-3 rounded-lg border border-slate-200 dark:border-primary/20 bg-transparent focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all dark:text-white" placeholder="Full Name" type="text" value={name} onChange={(e) => setName(e.target.value)} required />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Email Address</label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-slate-400">mail</span>
                        <input className="w-full pl-10 pr-4 py-3 rounded-lg border border-slate-200 dark:border-primary/20 bg-transparent focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all dark:text-white" placeholder="Email Address" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Password</label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-slate-400">lock</span>
                        <input className="w-full pl-10 pr-12 py-3 rounded-lg border border-slate-200 dark:border-primary/20 bg-transparent focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all dark:text-white" placeholder="Min. 6 characters" type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} required />
                        <button onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-primary" type="button">
                          <span className="material-symbols-outlined text-[20px]">{showPassword ? "visibility_off" : "visibility"}</span>
                        </button>
                      </div>
                    </div>
                    {role === "artist" && (
                      <div className="space-y-4 pt-2 border-t border-primary/10 mt-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Studio Name</label>
                            <input className="w-full px-4 py-3 rounded-lg border border-slate-200 dark:border-primary/20 bg-transparent focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all dark:text-white" placeholder="Willow &amp; Clay" type="text" value={studio} onChange={(e) => setStudio(e.target.value)} />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Craft Type</label>
                            <select className="w-full px-4 py-3 rounded-lg border border-slate-200 dark:border-primary/20 bg-transparent focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all dark:text-white appearance-none" value={craft} onChange={(e) => setCraft(e.target.value)}>
                              <option value="" disabled>Select Craft Type</option>
                              <option>Ceramics</option>
                              <option>Woodworking</option>
                              <option>Jewelry</option>
                              <option>Textiles</option>
                              <option>Painting</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  {error && (
                    <div className="flex items-center gap-2 text-red-600 bg-red-50 dark:bg-red-900/20 p-3 rounded-lg text-sm font-medium">
                      <span className="material-symbols-outlined text-lg">error</span>
                      {error}
                    </div>
                  )}
                  <div className="flex items-start gap-3 py-2">
                    <input className="mt-1 rounded text-primary focus:ring-primary" id="terms" type="checkbox" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} />
                    <label className="text-sm text-slate-500 dark:text-slate-400 leading-tight" htmlFor="terms">
                      I agree to the <Link className="text-primary hover:underline" to="/">Terms of Service</Link> and <Link className="text-primary hover:underline" to="/">Privacy Policy</Link>.
                    </label>
                  </div>
                  <button className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-4 rounded-lg transition-all shadow-lg shadow-primary/20 flex items-center justify-center gap-2" type="submit">
                    <span className="material-symbols-outlined">how_to_reg</span>
                    {role === "artist" ? "Create Artisan Account" : "Create My Account"}
                  </button>
                </form>
                <p className="text-sm text-slate-500 dark:text-slate-400 text-center mt-6">
                  Already have an account? <Link to="/login" className="text-primary font-bold hover:underline">Login</Link>
                </p>
              </div>
            </div>
          </main>
          <footer className="py-6 text-center text-slate-500 dark:text-slate-400 text-sm">
            <p>&copy; 2024 Local Artisan Marketplace. All rights reserved.</p>
            <div className="mt-2 space-x-4">
              <Link className="hover:text-primary" to="/">Help Center</Link>
              <Link className="hover:text-primary" to="/">Artist Guidelines</Link>
              <Link className="hover:text-primary" to="/">Contact</Link>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
}
