import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AdminSidebar from "../../components/AdminSidebar";
import NotificationBell from "../../components/NotificationBell";
import { api } from "../../utils/api";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalArtisans: 0,
    pendingApprovals: 0,
    totalRevenue: 0,
    totalOrders: 0,
    totalProducts: 0,
    soldCounts: { Handicrafts: 0, "Textiles & Apparel": 0, Jewelry: 0 },
    totalSold: 0,
  });
  const [recentActivity, setRecentActivity] = useState([]);

  useEffect(() => {
    async function loadAdminData() {
      try {
        const [users, products, orders, approvals] = await Promise.all([
          api.get("/users"),
          api.get("/products"),
          api.get("/orders"),
          api.get("/approvals"),
        ]);

        const totalArtisans = users.filter(u => u.role === "artist").length;
        const pendingApps = approvals.filter(a => a.status === "Pending").length;
        const totalRevenue = orders.reduce((sum, o) => sum + Number(o.amount || 0), 0);

        let soldCounts = { Handicrafts: 0, "Textiles & Apparel": 0, Jewelry: 0 };
        orders.forEach(o => {
          if (o.items && Array.isArray(o.items)) {
            o.items.forEach(item => {
              if (!item || !item.name) return;
              const qty = item.qty || 1;
              const name = item.name.toLowerCase();
              if (name.includes("textile") || name.includes("scarf") || name.includes("linen") || name.includes("throw")) {
                soldCounts["Textiles & Apparel"] += qty;
              } else if (name.includes("jewel") || name.includes("silver") || name.includes("earring")) {
                soldCounts.Jewelry += qty;
              } else {
                soldCounts.Handicrafts += qty;
              }
            });
          } else {
            soldCounts.Handicrafts += 1;
          }
        });
        const totalSold = soldCounts.Handicrafts + soldCounts["Textiles & Apparel"] + soldCounts.Jewelry;

        setStats({
          totalUsers: users.length,
          totalArtisans,
          pendingApprovals: pendingApps,
          totalRevenue,
          totalOrders: orders.length,
          totalProducts: products.length,
          soldCounts,
          totalSold,
        });

        const activities = orders.slice(0, 5).map(o => ({
          id: o.id,
          type: "order",
          title: `Order ${o.order_number} Processed`,
          subtitle: o.customer_name,
          amount: `₹${Number(o.amount).toLocaleString()}`,
          time: new Date(o.date).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
          icon: "check_circle",
          iconColor: "text-green-600",
          bgColor: "bg-green-50 dark:bg-green-900/20"
        }));

        const approvalActivities = approvals
          .filter(a => a.status === "Pending")
          .slice(0, 3)
          .map(a => ({
            id: `app-${a.id}`,
            type: "approval",
            title: "New Artisan Application",
            subtitle: `${a.name} applied for verification`,
            amount: "Pending",
            time: new Date(a.date).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
            icon: "person_add",
            iconColor: "text-blue-600",
            bgColor: "bg-blue-50 dark:bg-blue-900/20"
          }));

        setRecentActivity([...activities, ...approvalActivities].slice(0, 8));
      } catch {
        // ignore errors
      }
    }

    loadAdminData();
    const interval = setInterval(loadAdminData, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-slate-100">
      <div className="flex h-screen overflow-hidden">
        <AdminSidebar />
        <main className="flex-1 flex flex-col min-w-0 bg-background-light dark:bg-background-dark overflow-y-auto">
          <header className="flex items-center justify-between px-8 py-4 bg-white dark:bg-background-dark/50 border-b border-primary/10">
            <div className="flex items-center gap-4 flex-1">
              <div className="relative w-full max-w-md">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xl">search</span>
                <input className="w-full bg-slate-100 dark:bg-background-dark border-none rounded-lg pl-10 pr-4 py-2 text-sm focus:ring-2 focus:ring-primary/50" placeholder="Search marketplace records..." type="text" />
              </div>
            </div>
            <div className="flex items-center gap-4">
              <NotificationBell />
              <button className="p-2 rounded-lg bg-slate-100 dark:bg-background-dark text-slate-600 dark:text-slate-400 hover:text-primary transition-colors">
                <span className="material-symbols-outlined">help_outline</span>
              </button>
            </div>
          </header>
          <div className="p-8 max-w-7xl mx-auto w-full">
            <div className="mb-8">
              <h2 className="text-3xl font-black tracking-tight text-slate-900 dark:text-slate-100">Dashboard Overview</h2>
              <p className="text-slate-500 dark:text-slate-400 mt-1">Real-time metrics from your marketplace.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-white dark:bg-background-dark/30 p-6 rounded-xl border border-primary/10 shadow-sm">
                <div className="flex justify-between items-start mb-4">
                  <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <span className="material-symbols-outlined text-blue-600 dark:text-blue-400">person</span>
                  </div>
                  {stats.totalUsers > 0 && <span className="text-xs font-bold text-green-600 bg-green-50 dark:bg-green-900/20 px-2 py-1 rounded flex items-center gap-1"><span className="material-symbols-outlined text-xs">trending_up</span>Live</span>}
                </div>
                <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">Total Users</p>
                <h3 className="text-2xl font-bold mt-1">{stats.totalUsers.toLocaleString()}</h3>
              </div>
              <div className="bg-white dark:bg-background-dark/30 p-6 rounded-xl border border-primary/10 shadow-sm">
                <div className="flex justify-between items-start mb-4">
                  <div className="p-2 bg-amber-50 dark:bg-amber-900/20 rounded-lg">
                    <span className="material-symbols-outlined text-amber-600 dark:text-amber-400">palette</span>
                  </div>
                  {stats.totalArtisans > 0 && <span className="text-xs font-bold text-green-600 bg-green-50 dark:bg-green-900/20 px-2 py-1 rounded flex items-center gap-1"><span className="material-symbols-outlined text-xs">trending_up</span>Live</span>}
                </div>
                <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">Total Artisans</p>
                <h3 className="text-2xl font-bold mt-1">{stats.totalArtisans}</h3>
              </div>
              <div className="bg-white dark:bg-background-dark/30 p-6 rounded-xl border border-primary/10 shadow-sm">
                <div className="flex justify-between items-start mb-4">
                  <div className="p-2 bg-red-50 dark:bg-red-900/20 rounded-lg">
                    <span className="material-symbols-outlined text-red-600 dark:text-red-400">pending_actions</span>
                  </div>
                  {stats.pendingApprovals > 0 ? (
                    <span className="text-xs font-bold text-red-600 bg-red-50 dark:bg-red-900/20 px-2 py-1 rounded flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></span>Action</span>
                  ) : (
                    <span className="text-xs font-bold text-green-600 bg-green-50 dark:bg-green-900/20 px-2 py-1 rounded">Clear</span>
                  )}
                </div>
                <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">Pending Approvals</p>
                <h3 className="text-2xl font-bold mt-1">{stats.pendingApprovals}</h3>
              </div>
              <div className="bg-white dark:bg-background-dark/30 p-6 rounded-xl border border-primary/10 shadow-sm">
                <div className="flex justify-between items-start mb-4">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <span className="material-symbols-outlined text-primary">payments</span>
                  </div>
                  <span className="text-xs font-bold text-green-600 bg-green-50 dark:bg-green-900/20 px-2 py-1 rounded flex items-center gap-1"><span className="material-symbols-outlined text-xs">trending_up</span>Live</span>
                </div>
                <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">Total Revenue</p>
                <h3 className="text-2xl font-bold mt-1">₹{stats.totalRevenue.toLocaleString()}</h3>
                <p className="text-xs text-slate-400 mt-1">{stats.totalOrders} orders total</p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 bg-white dark:bg-background-dark/30 rounded-xl border border-primary/10 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-primary/10 flex justify-between items-center">
                  <h3 className="font-bold text-lg">Recent Activity</h3>
                  <Link to="/admin/orders" className="text-primary text-sm font-bold hover:underline">View All</Link>
                </div>
                <div className="divide-y divide-primary/5">
                  {recentActivity.length > 0 ? recentActivity.map((activity) => (
                    <div key={activity.id} className="p-4 flex items-center gap-4 hover:bg-slate-50 dark:hover:bg-background-dark/50 transition-colors">
                      <div className={`h-10 w-10 rounded-lg ${activity.bgColor} flex items-center justify-center`}>
                        <span className={`material-symbols-outlined ${activity.iconColor} text-xl`}>{activity.icon}</span>
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-semibold">{activity.title}</p>
                        <p className="text-xs text-slate-500">{activity.subtitle}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-bold">{activity.amount}</p>
                        <p className="text-[10px] text-slate-400">{activity.time}</p>
                      </div>
                    </div>
                  )) : (
                    <div className="p-10 text-center text-slate-500">
                      <span className="material-symbols-outlined text-4xl mb-2 opacity-20">history</span>
                      <p className="font-medium">No recent activity. Place an order or register a user to see data here.</p>
                    </div>
                  )}
                </div>
              </div>
              <div className="bg-white dark:bg-background-dark/30 rounded-xl border border-primary/10 shadow-sm p-6">
                <h3 className="font-bold text-lg mb-4">Market Insights</h3>
                <p className="text-xs text-slate-400 mb-4">{stats.totalSold || 0} products sold total</p>
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="font-medium">Handicrafts</span>
                      <span className="text-slate-500 font-bold">{stats.soldCounts?.Handicrafts || 0} sold</span>
                    </div>
                    <div className="h-2 bg-slate-100 dark:bg-background-dark rounded-full overflow-hidden">
                      <div className="h-full bg-primary rounded-full transition-all duration-500" style={{ width: stats.totalSold > 0 ? `${Math.round((stats.soldCounts?.Handicrafts || 0) / stats.totalSold * 100)}%` : "0%" }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="font-medium">Textiles & Apparel</span>
                      <span className="text-slate-500 font-bold">{stats.soldCounts?.["Textiles & Apparel"] || 0} sold</span>
                    </div>
                    <div className="h-2 bg-slate-100 dark:bg-background-dark rounded-full overflow-hidden">
                      <div className="h-full bg-primary/70 rounded-full transition-all duration-500" style={{ width: stats.totalSold > 0 ? `${Math.round((stats.soldCounts?.["Textiles & Apparel"] || 0) / stats.totalSold * 100)}%` : "0%" }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="font-medium">Jewelry</span>
                      <span className="text-slate-500 font-bold">{stats.soldCounts?.Jewelry || 0} sold</span>
                    </div>
                    <div className="h-2 bg-slate-100 dark:bg-background-dark rounded-full overflow-hidden">
                      <div className="h-full bg-primary/50 rounded-full transition-all duration-500" style={{ width: stats.totalSold > 0 ? `${Math.round((stats.soldCounts?.Jewelry || 0) / stats.totalSold * 100)}%` : "0%" }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
