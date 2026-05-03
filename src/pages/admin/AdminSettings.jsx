import { useState, useEffect } from "react";
import AdminSidebar from "../../components/AdminSidebar";
import NotificationBell from "../../components/NotificationBell";
import { api } from "../../utils/api";

const defaultSettings = {
  siteName: "Local Artisan Marketplace",
  commission: "10",
  currency: "INR (₹)",
  autoApprove: "false",
  emailNotifications: "true",
  orderNotifications: "true",
  newUserNotifications: "true",
  maintenanceMode: "false",
  maxProductsPerArtisan: "50",
  minOrderAmount: "100",
};

export default function AdminSettings() {
  const [settings, setSettings] = useState(defaultSettings);
  const [saved, setSaved] = useState("");
  const [activeTab, setActiveTab] = useState("general");

  useEffect(() => {
    api.get("/settings")
      .then((data) => setSettings(prev => ({ ...prev, ...data })))
      .catch(() => {});
  }, []);

  const update = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: String(value) }));
  };

  const handleSave = async () => {
    try {
      await api.put("/settings", settings);
      setSaved("Settings saved successfully!");
      setTimeout(() => setSaved(""), 3000);
    } catch (err) {
      alert(err.message || "Failed to save");
    }
  };

  const tabs = [
    { id: "general", label: "General", icon: "storefront" },
    { id: "notifications", label: "Notifications", icon: "notifications" },
    { id: "policies", label: "Policies", icon: "gavel" },
    { id: "data", label: "Data Management", icon: "database" },
  ];

  return (
    <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 font-display">
      <div className="flex h-screen overflow-hidden">
        <AdminSidebar />
        <main className="flex-1 flex flex-col min-w-0 bg-background-light dark:bg-background-dark overflow-y-auto">
          <header className="h-16 border-b border-primary/10 flex items-center justify-between px-8 bg-white dark:bg-background-dark/50 sticky top-0 z-10">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">settings</span>
              <h2 className="text-lg font-bold tracking-tight">Platform Settings</h2>
            </div>
            <div className="flex items-center gap-3">
              <NotificationBell />
            </div>
          </header>
          <div className="p-8 max-w-5xl mx-auto w-full space-y-8">
            <div>
              <h1 className="text-3xl font-black tracking-tight">Settings</h1>
              <p className="text-slate-500 dark:text-slate-400 mt-1">Manage your admin panel configuration.</p>
            </div>

            {saved && (
              <div className="flex items-center gap-2 text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20 p-4 rounded-xl text-sm font-bold animate-pulse">
                <span className="material-symbols-outlined text-lg">check_circle</span>
                {saved}
              </div>
            )}

            {/* Tabs */}
            <div className="flex gap-1 border-b border-primary/10">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                    activeTab === tab.id
                      ? "border-primary text-primary"
                      : "border-transparent text-slate-500 hover:text-slate-700"
                  }`}
                >
                  <span className="material-symbols-outlined text-lg">{tab.icon}</span>
                  {tab.label}
                </button>
              ))}
            </div>

            {/* General Tab */}
            {activeTab === "general" && (
              <div className="space-y-6">
                <div className="bg-white dark:bg-background-dark/30 rounded-xl border border-primary/10 shadow-sm p-6 space-y-6">
                  <h3 className="text-base font-bold flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary text-lg">storefront</span>
                    Marketplace Configuration
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Site Name</label>
                      <input className="w-full px-4 py-3 rounded-lg border border-primary/10 bg-slate-50 dark:bg-slate-900 focus:ring-2 focus:ring-primary focus:border-primary outline-none text-sm" value={settings.siteName} onChange={(e) => update("siteName", e.target.value)} />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Commission Rate (%)</label>
                      <input className="w-full px-4 py-3 rounded-lg border border-primary/10 bg-slate-50 dark:bg-slate-900 focus:ring-2 focus:ring-primary focus:border-primary outline-none text-sm" type="number" value={settings.commission} onChange={(e) => update("commission", e.target.value)} />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Currency</label>
                      <select className="w-full px-4 py-3 rounded-lg border border-primary/10 bg-slate-50 dark:bg-slate-900 focus:ring-2 focus:ring-primary focus:border-primary outline-none text-sm" value={settings.currency} onChange={(e) => update("currency", e.target.value)}>
                        <option>INR (₹)</option>
                        <option>USD ($)</option>
                        <option>EUR (€)</option>
                      </select>
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Max Products per Artisan</label>
                      <input className="w-full px-4 py-3 rounded-lg border border-primary/10 bg-slate-50 dark:bg-slate-900 focus:ring-2 focus:ring-primary focus:border-primary outline-none text-sm" type="number" value={settings.maxProductsPerArtisan} onChange={(e) => update("maxProductsPerArtisan", e.target.value)} />
                    </div>
                  </div>
                  <div className="flex flex-col gap-3 pt-2">
                    <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50 dark:bg-slate-900">
                      <div className="flex items-center gap-3">
                        <span className="material-symbols-outlined text-primary text-lg">verified_user</span>
                        <div>
                          <p className="text-sm font-semibold">Auto-approve Artisans</p>
                          <p className="text-xs text-slate-500">New artisan applications will be approved automatically</p>
                        </div>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" checked={settings.autoApprove === "true" || settings.autoApprove === true} onChange={(e) => update("autoApprove", e.target.checked)} />
                        <div className="w-11 h-6 bg-slate-200 peer-focus:ring-2 peer-focus:ring-primary/30 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                      </label>
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50 dark:bg-slate-900">
                      <div className="flex items-center gap-3">
                        <span className="material-symbols-outlined text-amber-500 text-lg">construction</span>
                        <div>
                          <p className="text-sm font-semibold">Maintenance Mode</p>
                          <p className="text-xs text-slate-500">Temporarily disable the marketplace for visitors</p>
                        </div>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" checked={settings.maintenanceMode === "true" || settings.maintenanceMode === true} onChange={(e) => update("maintenanceMode", e.target.checked)} />
                        <div className="w-11 h-6 bg-slate-200 peer-focus:ring-2 peer-focus:ring-primary/30 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Notifications Tab */}
            {activeTab === "notifications" && (
              <div className="bg-white dark:bg-background-dark/30 rounded-xl border border-primary/10 shadow-sm p-6 space-y-4">
                <h3 className="text-base font-bold flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary text-lg">notifications</span>
                  Notification Preferences
                </h3>
                <p className="text-sm text-slate-500">Choose which notifications you receive in the admin panel.</p>
                <div className="flex flex-col gap-3 pt-2">
                  {[
                    { key: "emailNotifications", icon: "mail", title: "Email Notifications", desc: "Receive daily summary emails" },
                    { key: "orderNotifications", icon: "shopping_cart", title: "New Order Alerts", desc: "Get notified when a new order is placed" },
                    { key: "newUserNotifications", icon: "person_add", title: "New User Registrations", desc: "Alert when new users or artisans register" },
                  ].map(n => (
                    <div key={n.key} className="flex items-center justify-between p-4 rounded-lg bg-slate-50 dark:bg-slate-900">
                      <div className="flex items-center gap-3">
                        <span className="material-symbols-outlined text-primary text-lg">{n.icon}</span>
                        <div>
                          <p className="text-sm font-semibold">{n.title}</p>
                          <p className="text-xs text-slate-500">{n.desc}</p>
                        </div>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" checked={settings[n.key] === "true" || settings[n.key] === true} onChange={(e) => update(n.key, e.target.checked)} />
                        <div className="w-11 h-6 bg-slate-200 peer-focus:ring-2 peer-focus:ring-primary/30 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Policies Tab */}
            {activeTab === "policies" && (
              <div className="bg-white dark:bg-background-dark/30 rounded-xl border border-primary/10 shadow-sm p-6 space-y-6">
                <h3 className="text-base font-bold flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary text-lg">gavel</span>
                  Order & Payment Policies
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Minimum Order Amount (₹)</label>
                    <input className="w-full px-4 py-3 rounded-lg border border-primary/10 bg-slate-50 dark:bg-slate-900 focus:ring-2 focus:ring-primary focus:border-primary outline-none text-sm" type="number" value={settings.minOrderAmount} onChange={(e) => update("minOrderAmount", e.target.value)} />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Commission Rate (%)</label>
                    <input className="w-full px-4 py-3 rounded-lg border border-primary/10 bg-slate-50 dark:bg-slate-900 focus:ring-2 focus:ring-primary focus:border-primary outline-none text-sm" type="number" value={settings.commission} onChange={(e) => update("commission", e.target.value)} />
                  </div>
                </div>
                <div className="bg-primary/5 p-4 rounded-lg flex gap-3">
                  <span className="material-symbols-outlined text-primary mt-0.5">info</span>
                  <div>
                    <p className="text-sm font-semibold">Commission Info</p>
                    <p className="text-xs text-slate-500 mt-1">Commission of <strong className="text-primary">{settings.commission}%</strong> will be deducted from every artisan sale. Current minimum order: <strong className="text-primary">₹{settings.minOrderAmount}</strong></p>
                  </div>
                </div>
              </div>
            )}

            {/* Data Management Tab */}
            {activeTab === "data" && (
              <div className="space-y-6">
                <div className="bg-white dark:bg-background-dark/30 rounded-xl border border-primary/10 shadow-sm p-6 space-y-5">
                  <h3 className="text-base font-bold flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary text-lg">database</span>
                    Database Storage
                  </h3>
                  <p className="text-sm text-slate-500">Data is now stored in PostgreSQL database. Use the database admin tools for data management.</p>
                </div>
              </div>
            )}

            {/* Save Button */}
            <div className="flex items-center justify-between pt-4 border-t border-primary/10">
              <p className="text-xs text-slate-400">Changes are saved to the database</p>
              <button onClick={handleSave} className="px-8 py-3 bg-primary text-white rounded-lg font-bold shadow-lg shadow-primary/20 hover:brightness-110 transition-all flex items-center gap-2">
                <span className="material-symbols-outlined text-lg">save</span>
                Save Settings
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
