import { useState, useEffect } from "react";
import AdminSidebar from "../../components/AdminSidebar";
import NotificationBell from "../../components/NotificationBell";
import { api } from "../../utils/api";

function getStatusColor(status) {
  if (status === "Delivered") return "green";
  if (status === "Shipped") return "blue";
  return "yellow";
}

export default function AdminOrders() {
  const [page, setPage] = useState(1);
  const [orders, setOrders] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  useEffect(() => {
    api.get("/orders")
      .then((data) => {
        setOrders(data.map(o => ({
          id: o.order_number || `#ORD-${o.id}`,
          _dbId: o.id,
          cust: o.customer_name || "Unknown",
          date: new Date(o.date).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
          total: `₹${Number(o.amount).toLocaleString()}`,
          status: { label: o.status || "Processing", color: getStatusColor(o.status || "Processing") }
        })));
      })
      .catch(() => setOrders([]));
  }, []);

  const handleStatusChange = async (orderId, newStatus) => {
    const order = orders.find(o => o.id === orderId);
    if (!order) return;
    try {
      await api.patch(`/orders/${order._dbId}/status`, { status: newStatus });
      setOrders(prev => prev.map(o =>
        o.id === orderId ? { ...o, status: { label: newStatus, color: getStatusColor(newStatus) } } : o
      ));
      setSuccessMsg(`Order ${orderId} status updated to "${newStatus}"`);
      setTimeout(() => setSuccessMsg(""), 3000);
    } catch (err) {
      alert(err.message || "Failed to update status");
    }
  };

  const filteredOrders = orders.filter(o =>
    o.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    o.cust.toLowerCase().includes(searchQuery.toLowerCase()) ||
    o.status.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const itemsPerPage = 5;
  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
  const paginatedOrders = filteredOrders.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  const stats = {
    pending: orders.filter(o => o.status.label === "Processing").length,
    transit: orders.filter(o => o.status.label === "Shipped").length,
    completed: orders.filter(o => o.status.label === "Delivered").length
  };

  const totalRevenue = orders.reduce((sum, o) => {
    const val = parseFloat((o.total || "0").replace("₹", "").replace(",", ""));
    return sum + (isNaN(val) ? 0 : val);
  }, 0);

  return (
    <div className="bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-slate-100">
      <div className="flex h-screen overflow-hidden">
        <AdminSidebar />
        <main className="flex-1 flex flex-col overflow-y-auto">
          <header className="h-16 border-b border-primary/10 flex items-center justify-between px-8 bg-white dark:bg-background-dark/50 backdrop-blur-md sticky top-0 z-10">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">local_shipping</span>
              <h2 className="text-lg font-bold tracking-tight">Order Management</h2>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm text-slate-500">Total Revenue: <strong className="text-primary">₹{totalRevenue.toLocaleString()}</strong></span>
              <NotificationBell />
            </div>
          </header>
          <div className="p-8 max-w-7xl mx-auto w-full space-y-8">
            {successMsg && (
              <div className="flex items-center gap-2 text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20 p-4 rounded-xl text-sm font-bold">
                <span className="material-symbols-outlined text-lg">check_circle</span>
                {successMsg}
              </div>
            )}
            <div className="space-y-2">
              <h1 className="text-4xl font-black tracking-tight">Order Tracking</h1>
              <p className="text-slate-500 dark:text-slate-400 max-w-2xl">Monitor real-time fulfillment across your artisan network. {orders.length} total orders.</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">search</span>
                <input
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-primary/10 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                  placeholder="Search by Order ID, Customer, or Status..."
                  type="text"
                  value={searchQuery}
                  onChange={(e) => { setSearchQuery(e.target.value); setPage(1); }}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 bg-white dark:bg-slate-900 rounded-xl border border-primary/10 shadow-sm flex items-center gap-4">
                <div className="size-12 rounded-lg bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 flex items-center justify-center">
                  <span className="material-symbols-outlined">pending_actions</span>
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Processing</p>
                  <p className="text-2xl font-black">{stats.pending} Orders</p>
                </div>
              </div>
              <div className="p-6 bg-white dark:bg-slate-900 rounded-xl border border-primary/10 shadow-sm flex items-center gap-4">
                <div className="size-12 rounded-lg bg-blue-100 dark:bg-blue-900/30 text-blue-700 flex items-center justify-center">
                  <span className="material-symbols-outlined">local_shipping</span>
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">In Transit</p>
                  <p className="text-2xl font-black">{stats.transit} Orders</p>
                </div>
              </div>
              <div className="p-6 bg-white dark:bg-slate-900 rounded-xl border border-primary/10 shadow-sm flex items-center gap-4">
                <div className="size-12 rounded-lg bg-green-100 dark:bg-green-900/30 text-green-700 flex items-center justify-center">
                  <span className="material-symbols-outlined">check_circle</span>
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Delivered</p>
                  <p className="text-2xl font-black">{stats.completed} Orders</p>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-xl border border-primary/10 overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-primary/5 border-b border-primary/10">
                      <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Order ID</th>
                      <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Customer</th>
                      <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Date</th>
                      <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Total Amount</th>
                      <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-primary/5">
                    {paginatedOrders.map((r, idx) => (
                      <tr className="hover:bg-primary/5 transition-colors" key={`${r.id}-${idx}`}>
                        <td className="px-6 py-4 text-sm font-bold text-primary">{r.id}</td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="size-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-[10px] font-bold">
                              {r.cust.split(" ").map(n => n[0]).slice(0, 2).join("")}
                            </div>
                            <span className="text-sm font-medium">{r.cust}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-slate-500">{r.date}</td>
                        <td className="px-6 py-4 text-sm font-semibold">{r.total}</td>
                        <td className="px-6 py-4">
                          <select
                            value={r.status.label}
                            onChange={(e) => handleStatusChange(r.id, e.target.value)}
                            className={`text-xs font-bold rounded-full px-3 py-1.5 border-none cursor-pointer focus:ring-2 focus:ring-primary/30 ${
                              r.status.color === "green" ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400" :
                              r.status.color === "blue" ? "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400" :
                              "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
                            }`}
                          >
                            <option value="Processing">Processing</option>
                            <option value="Shipped">Shipped</option>
                            <option value="Delivered">Delivered</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                    {paginatedOrders.length === 0 && (
                      <tr>
                        <td colSpan="5" className="px-6 py-16 text-center text-slate-500">
                          <p className="font-bold">No orders found.</p>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
              {totalPages > 0 && (
                <div className="px-6 py-4 border-t border-primary/10 flex items-center justify-between bg-primary/5">
                  <p className="text-xs text-slate-500 font-medium">Showing {filteredOrders.length > 0 ? (page - 1) * itemsPerPage + 1 : 0} to {Math.min(page * itemsPerPage, filteredOrders.length)} of {filteredOrders.length} orders</p>
                  <div className="flex gap-2">
                    <button onClick={() => setPage(p => Math.max(1, p - 1))} className="px-3 py-1 text-xs border border-primary/10 rounded bg-white dark:bg-slate-800 hover:bg-primary/10 transition-colors disabled:opacity-40" disabled={page === 1}>Previous</button>
                    {[...Array(totalPages)].map((_, i) => (
                      <button key={i} onClick={() => setPage(i + 1)} className={`px-3 py-1 text-xs rounded ${page === i + 1 ? "bg-primary text-white" : "border border-primary/10 bg-white dark:bg-slate-800 hover:bg-primary/10"}`}>{i + 1}</button>
                    ))}
                    <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} className="px-3 py-1 text-xs border border-primary/10 rounded bg-white dark:bg-slate-800 hover:bg-primary/10 transition-colors disabled:opacity-40" disabled={page === totalPages}>Next</button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
