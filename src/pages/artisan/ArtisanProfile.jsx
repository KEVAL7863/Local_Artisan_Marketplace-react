import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";
import ArtisanSidebar from "../../components/ArtisanSidebar.jsx";

export default function ArtisanProfile() {
  const { user, updateProfile } = useAuth();
  const [name, setName] = useState(user?.name || "");
  const [email] = useState(user?.email || "");
  const [studio, setStudio] = useState(user?.studio || "");
  const [craft, setCraft] = useState(user?.craft || "");
  const [bio, setBio] = useState(user?.bio || "");
  const [website, setWebsite] = useState(user?.website || "");
  const [instagram, setInstagram] = useState(user?.instagram || "");
  const [saved, setSaved] = useState("");
  const [error, setError] = useState("");

  return (
    <div className="bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-slate-100">
      <div className="flex min-h-screen">
        <ArtisanSidebar />

        <main className="ml-72 flex-1 p-8">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
              <div className="max-w-2xl">
                <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight mb-2">Artisan Profile</h2>
                <p className="text-slate-500 dark:text-slate-400">
                  Update your professional details and showcase your craft.
                </p>
              </div>
            </div>

            <form
              className="bg-white dark:bg-slate-800/50 rounded-xl border border-primary/10 p-8 shadow-sm space-y-8"
              onSubmit={async (e) => {
                e.preventDefault();
                setError("");
                setSaved("");
                try {
                  await updateProfile({ name, studio, craft, bio, website, instagram });
                  setSaved("Profile updated successfully!");
                } catch (err) {
                  setError(err.message || "Failed to save profile. Please try again.");
                }
              }}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Full Name</label>
                  <input
                    className="w-full px-4 py-3.5 rounded-xl border border-primary/10 bg-slate-50 dark:bg-slate-900 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all dark:text-white font-medium"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Email Address</label>
                  <input
                    className="w-full px-4 py-3.5 rounded-xl border border-primary/10 bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 font-medium cursor-not-allowed"
                    type="email"
                    value={email}
                    readOnly
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Studio Name</label>
                  <input
                    className="w-full px-4 py-3.5 rounded-xl border border-primary/10 bg-slate-50 dark:bg-slate-900 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all dark:text-white font-medium"
                    type="text"
                    value={studio}
                    onChange={(e) => setStudio(e.target.value)}
                    placeholder="e.g. Earth & Fire Pottery"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Craft Type</label>
                  <select
                    className="w-full px-4 py-3.5 rounded-xl border border-primary/10 bg-slate-50 dark:bg-slate-900 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all dark:text-white font-medium appearance-none"
                    value={craft}
                    onChange={(e) => setCraft(e.target.value)}
                  >
                    <option value="">Select Craft</option>
                    <option value="Ceramics">Ceramics</option>
                    <option value="Woodworking">Woodworking</option>
                    <option value="Jewelry">Jewelry</option>
                    <option value="Textiles">Textiles</option>
                    <option value="Painting">Painting</option>
                  </select>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Bio / Story</label>
                <textarea
                  rows={4}
                  className="w-full px-4 py-3.5 rounded-xl border border-primary/10 bg-slate-50 dark:bg-slate-900 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all dark:text-white font-medium resize-none"
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder="Tell customers about your craft and journey..."
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Website</label>
                  <input
                    className="w-full px-4 py-3.5 rounded-xl border border-primary/10 bg-slate-50 dark:bg-slate-900 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all dark:text-white font-medium"
                    type="url"
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                    placeholder="https://yourportfolio.com"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Instagram Handle</label>
                  <input
                    className="w-full px-4 py-3.5 rounded-xl border border-primary/10 bg-slate-50 dark:bg-slate-900 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all dark:text-white font-medium"
                    type="text"
                    value={instagram}
                    onChange={(e) => setInstagram(e.target.value)}
                    placeholder="@yourhandle"
                  />
                </div>
              </div>

              <div className="pt-4 flex flex-col gap-4">
                {error && (
                  <div className="flex items-center gap-2 text-red-600 bg-red-50 dark:bg-red-900/20 p-4 rounded-xl text-sm font-bold">
                    <span className="material-symbols-outlined text-lg">error</span>
                    {error}
                  </div>
                )}
                {saved && (
                  <div className="flex items-center gap-2 text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20 p-4 rounded-xl text-sm font-bold">
                    <span className="material-symbols-outlined text-lg">check_circle</span>
                    {saved}
                  </div>
                )}

                <div className="flex justify-end">
                  <button type="submit" className="px-10 py-4 bg-primary text-white rounded-xl font-black shadow-lg shadow-primary/20 hover:brightness-110 hover:scale-[1.02] active:scale-[0.98] transition-all tracking-wide">
                    SAVE PROFILE
                  </button>
                </div>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
}
