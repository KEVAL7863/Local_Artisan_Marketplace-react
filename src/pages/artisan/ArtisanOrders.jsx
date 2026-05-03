import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";
import ArtisanSidebar from "../../components/ArtisanSidebar.jsx";
import { api } from "../../utils/api";

function getBadge(status) {
  if (status === "Shipped") return "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400";
  if (status === "Delivered") return "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400";
  return "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400";
}

export default function ArtisanOrders() {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [activeTab, setActiveTab] = useState("All Orders");
  const [successMsg, setSuccessMsg] = useState("");

  useEffect(() => {
    api.get("/orders/mine")
      .then((data) => {
        setOrders(data.map(o => ({
          ...o,
          id: o.order_number || `#ORD-${o.id}`,
          customer: o.customer_name,
          date: new Date(o.date).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
          amount: `₹${Number(o.amount).toLocaleString()}`,
          badge: getBadge(o.status),
          _dbId: o.id,
        })));
      })
      .catch(() => setOrders([]));
  }, [user]);

  const handleStatusChange = async (id, newStatus) => {
    const order = orders.find(o => o.id === id);
    if (!order) return;
    try {
      await api.patch(`/orders/${order._dbId}/status`, { status: newStatus });
      setOrders(prev => prev.map(o => o.id === id ? { ...o, status: newStatus, badge: getBadge(newStatus) } : o));
      setSuccessMsg(`Order ${id} updated to "${newStatus}"`);
      setTimeout(() => setSuccessMsg(""), 3000);
    } catch (err) {
      alert(err.message || "Failed to update status");
    }
  };

  const totalRevenue = orders.reduce((sum, o) => {
    const val = parseFloat(String(o.amount).replace("₹", "").replace(/,/g, ""));
    return sum + (isNaN(val) ? 0 : val);
  }, 0);
  const activeOrdersCount = orders.filter(o => o.status === "Processing" || o.status === "Pending" || o.status === "Shipped").length;
  const shippingToday = orders.filter(o => o.status === "Processing").length;

  const tabs = ["All Orders", "Processing", "Shipped", "Delivered"];

  const filteredOrders = activeTab === "All Orders"
    ? orders
    : orders.filter(o => o.status === activeTab);

  return (
    <div className="bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-slate-100">
      <div className="flex min-h-screen">
        <ArtisanSidebar />

        <main className="flex-1 ml-72 overflow-y-auto">
          <div className="max-w-5xl mx-auto px-8 py-10 space-y-8">
            {successMsg && (
              <div className="flex items-center gap-2 text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20 p-4 rounded-xl text-sm font-bold">
                <span className="material-symbols-outlined text-lg">check_circle</span>
                {successMsg}
              </div>
            )}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
              <div className="flex flex-col gap-1">
                <h2 className="text-3xl font-black text-slate-900 dark:text-slate-100 tracking-tight">Orders Management</h2>
                <p className="text-slate-500 dark:text-slate-400 text-sm">Track and manage your customer orders and shipments.</p>
              </div>
            </div>

            {/* Tabs */}
            <div className="mb-6 border-b border-primary/10">
              <div className="flex gap-8">
                {tabs.map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`border-b-2 pb-4 px-1 text-sm font-${activeTab === tab ? 'bold' : 'medium'} transition-colors ${
                      activeTab === tab
                        ? 'border-primary text-primary'
                        : 'border-transparent text-slate-400 hover:text-slate-600'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            {/* Content Area: Table */}
            <div className="bg-white dark:bg-slate-900 rounded-xl border border-primary/10 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-primary/5 border-b border-primary/10">
                      <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Order ID</th>
                      <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Customer</th>
                      <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Date</th>
                      <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Amount</th>
                      <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Status</th>
                      <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-primary/5">
                    {filteredOrders.map((o) => (
                      <tr key={o.id} className="hover:bg-primary/5 transition-colors group">
                        <td className="px-6 py-5 text-sm font-semibold text-primary">{o.id}</td>
                        <td className="px-6 py-5 text-sm text-slate-700 dark:text-slate-300">{o.customer}</td>
                        <td className="px-6 py-5 text-sm text-slate-500 dark:text-slate-400">{o.date}</td>
                        <td className="px-6 py-5 text-sm font-bold text-slate-900 dark:text-slate-100">{o.amount}</td>
                        <td className="px-6 py-5">
                          <select
                            value={o.status}
                            onChange={(e) => handleStatusChange(o.id, e.target.value)}
                            className={`text-xs font-bold rounded-full px-3 py-1.5 border-none cursor-pointer focus:ring-2 focus:ring-primary/30 ${o.badge}`}
                          >
                            <option value="Processing">Processing</option>
                            <option value="Shipped">Shipped</option>
                            <option value="Delivered">Delivered</option>
                          </select>
                        </td>
                        <td className="px-6 py-5 text-right">
                          <div className="flex justify-end gap-1">
                            {o.status === "Processing" && (
                              <button onClick={() => handleStatusChange(o.id, "Shipped")} className="flex items-center gap-1 px-3 py-1.5 text-xs font-bold text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-all" title="Mark as Shipped">
                                <span className="material-symbols-outlined text-sm">local_shipping</span>
                                Ship
                              </button>
                            )}
                            {o.status === "Shipped" && (
                              <button onClick={() => handleStatusChange(o.id, "Delivered")} className="flex items-center gap-1 px-3 py-1.5 text-xs font-bold text-green-600 bg-green-50 hover:bg-green-100 rounded-lg transition-all" title="Mark as Delivered">
                                <span className="material-symbols-outlined text-sm">check_circle</span>
                                Deliver
                              </button>
                            )}
                            {o.status === "Delivered" && (
                              <span className="flex items-center gap-1 px-3 py-1.5 text-xs font-bold text-green-600">
                                <span className="material-symbols-outlined text-sm">verified</span>
                                Done
                              </span>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {/* Pagination */}
              <div className="px-6 py-4 bg-primary/5 border-t border-primary/10 flex items-center justify-between">
                <p className="text-xs text-slate-500 font-medium">Showing 1 to {filteredOrders.length} of {orders.length} orders</p>
                <div className="flex items-center gap-1">
                  <button className="h-8 w-8 flex items-center justify-center rounded-lg border border-primary/20 text-slate-400 hover:bg-white transition-colors">
                    <span className="material-symbols-outlined text-sm">chevron_left</span>
                  </button>
                  <button className="h-8 w-8 flex items-center justify-center rounded-lg bg-primary text-white text-xs font-bold shadow-sm">1</button>
                  <button className="h-8 w-8 flex items-center justify-center rounded-lg border border-primary/20 text-slate-600 dark:text-slate-300 text-xs font-medium hover:bg-white transition-colors">2</button>
                  <button className="h-8 w-8 flex items-center justify-center rounded-lg border border-primary/20 text-slate-600 dark:text-slate-300 text-xs font-medium hover:bg-white transition-colors">3</button>
                  <button className="h-8 w-8 flex items-center justify-center rounded-lg border border-primary/20 text-slate-400 hover:bg-white transition-colors">
                    <span className="material-symbols-outlined text-sm">chevron_right</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Dashboard Summary Widgets */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-primary/10 shadow-sm">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-slate-500 text-xs font-bold uppercase tracking-wider">Total Revenue</span>
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <span className="material-symbols-outlined text-lg">payments</span>
                  </div>
                </div>
                <p className="text-2xl font-black text-slate-900 dark:text-slate-100">₹{totalRevenue.toLocaleString()}</p>
                <p className="text-xs text-green-600 font-bold flex items-center gap-1 mt-1">
                  <span className="material-symbols-outlined text-xs">trending_up</span>
                  +12.5% this month
                </p>
              </div>
              <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-primary/10 shadow-sm">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-slate-500 text-xs font-bold uppercase tracking-wider">Active Orders</span>
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <span className="material-symbols-outlined text-lg">pending_actions</span>
                  </div>
                </div>
                <p className="text-2xl font-black text-slate-900 dark:text-slate-100">{activeOrdersCount}</p>
                <p className="text-xs text-amber-600 font-bold flex items-center gap-1 mt-1">
                  <span className="material-symbols-outlined text-xs">priority_high</span>
                  {shippingToday} need shipping today
                </p>
              </div>
              <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-primary/10 shadow-sm">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-slate-500 text-xs font-bold uppercase tracking-wider">Order Rating</span>
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <span className="material-symbols-outlined text-lg">star</span>
                  </div>
                </div>
                <p className="text-2xl font-black text-slate-900 dark:text-slate-100">4.9/5.0</p>
                <p className="text-xs text-slate-500 font-medium flex items-center gap-1 mt-1">
                  Based on 320 reviews
                </p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
