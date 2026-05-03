import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import ArtisanSidebar from "../components/ArtisanSidebar.jsx";
import { api } from "../utils/api";

export default function ArtisanDashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalProducts: 0,
    lowStock: 0,
    earnings: 0,
    recentOrdersCount: 0,
    pendingFulfillment: 0
  });
  const [recentOrders, setRecentOrders] = useState([]);

  useEffect(() => {
    async function loadData() {
      try {
        const [products, orders] = await Promise.all([
          api.get("/products/mine"),
          api.get("/orders/mine"),
        ]);

        const totalP = products.length;
        const lowS = products.filter(p => p.stock > 0 && p.stock < 3).length;
        const pending = orders.filter(o => o.status === "Processing" || o.status === "Pending").length;
        const totalEarnings = orders.reduce((sum, o) => sum + Number(o.amount || 0), 0);

        setStats({
          totalProducts: totalP,
          lowStock: lowS,
          earnings: totalEarnings,
          recentOrdersCount: orders.length,
          pendingFulfillment: pending
        });

        const badgeFor = (s) => {
          if (s === "Shipped") return "bg-blue-100 text-blue-800";
          if (s === "Delivered") return "bg-emerald-100 text-emerald-800";
          return "bg-amber-100 text-amber-800";
        };
        setRecentOrders(orders.slice(0, 4).map(o => ({
          id: o.order_number || `#ORD-${o.id}`,
          customer: o.customer_name,
          date: new Date(o.date).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
          amount: `₹${Number(o.amount).toLocaleString()}`,
          status: o.status,
          badge: badgeFor(o.status),
        })));
      } catch {
        // ignore
      }
    }
    loadData();
  }, [user]);

  return (
    <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 font-display">
      <div className="flex min-h-screen">
        <ArtisanSidebar />

        {/* Main Content */}
        <main className="ml-72 flex-1 p-8">
          {/* Header */}
          <header className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-3xl font-black tracking-tight">Welcome back, {user?.name?.split(" ")[0] || "Arjun"}!</h2>
              <p className="text-slate-500 dark:text-slate-400">Here's a quick look at your shop's performance today.</p>
            </div>
            <Link
              to="/artisan/add-product"
              className="bg-primary text-white px-5 py-2.5 rounded-lg font-medium flex items-center gap-2 hover:bg-primary/90 transition-colors"
            >
              <span className="material-symbols-outlined text-sm">add</span>
              Add New Product
            </Link>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <div className="bg-white dark:bg-slate-800/50 p-6 rounded-xl border border-primary/10 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <span className="text-slate-500 dark:text-slate-400 font-medium">Total Earnings</span>
                <span className="material-symbols-outlined text-primary">payments</span>
              </div>
              <div className="text-3xl font-bold">₹{stats.earnings.toLocaleString()}</div>
              <div className="mt-2 text-xs text-emerald-600 font-medium flex items-center gap-1">
                <span className="material-symbols-outlined text-xs">trending_up</span>
                12% increase from last month
              </div>
            </div>
            <div className="bg-white dark:bg-slate-800/50 p-6 rounded-xl border border-primary/10 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <span className="text-slate-500 dark:text-slate-400 font-medium">Total Products</span>
                <span className="material-symbols-outlined text-primary">inventory</span>
              </div>
              <div className="text-3xl font-bold">{stats.totalProducts}</div>
              <div className="mt-2 text-xs text-slate-500 font-medium">{stats.lowStock} items low on stock</div>
            </div>
            <div className="bg-white dark:bg-slate-800/50 p-6 rounded-xl border border-primary/10 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <span className="text-slate-500 dark:text-slate-400 font-medium">Recent Orders</span>
                <span className="material-symbols-outlined text-primary">shopping_cart</span>
              </div>
              <div className="text-3xl font-bold">{stats.recentOrdersCount}</div>
              <div className="mt-2 text-xs text-primary font-medium">{stats.pendingFulfillment} pending fulfillment</div>
            </div>
          </div>

          {/* Recent Orders Table */}
          <section className="bg-white dark:bg-slate-800/50 rounded-xl border border-primary/10 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-primary/10 flex justify-between items-center">
              <h3 className="text-lg font-bold">Recent Orders</h3>
              <Link className="text-primary text-sm font-semibold hover:underline" to="/artisan/orders">View All Orders</Link>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-background-light dark:bg-background-dark/50">
                  <tr>
                    <th className="px-6 py-4 text-sm font-semibold text-slate-600 dark:text-slate-300">Order ID</th>
                    <th className="px-6 py-4 text-sm font-semibold text-slate-600 dark:text-slate-300">Customer</th>
                    <th className="px-6 py-4 text-sm font-semibold text-slate-600 dark:text-slate-300">Date</th>
                    <th className="px-6 py-4 text-sm font-semibold text-slate-600 dark:text-slate-300">Amount</th>
                    <th className="px-6 py-4 text-sm font-semibold text-slate-600 dark:text-slate-300">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-primary/5">
                  {recentOrders.map((o) => (
                    <tr key={o.id} className="hover:bg-primary/5 transition-colors">
                      <td className="px-6 py-4 text-sm font-medium">{o.id}</td>
                      <td className="px-6 py-4 text-sm">{o.customer}</td>
                      <td className="px-6 py-4 text-sm text-slate-500">{o.date}</td>
                      <td className="px-6 py-4 text-sm font-semibold">{o.amount}</td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${o.badge}`}>{o.status}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

        </main>
      </div>
    </div>
  );
}

