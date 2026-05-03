import { useState, useEffect } from "react";
import AdminSidebar from "../../components/AdminSidebar";
import NotificationBell from "../../components/NotificationBell";
import { api } from "../../utils/api";

export default function AdminReports() {
  const [stats, setStats] = useState({
    totalRevenue: 0,
    totalOrders: 0,
    totalProducts: 0,
    totalUsers: 0,
    artisanCount: 0,
    customerCount: 0,
    avgOrderValue: 0,
    processingOrders: 0,
    shippedOrders: 0,
    deliveredOrders: 0,
  });

  useEffect(() => {
    async function loadReportData() {
      try {
        const [orders, products, users] = await Promise.all([
          api.get("/orders"),
          api.get("/products"),
          api.get("/users"),
        ]);

        const totalRevenue = orders.reduce((sum, o) => sum + Number(o.amount || 0), 0);
        const artisanCount = users.filter(u => u.role === "artist").length;
        const customerCount = users.filter(u => u.role === "user").length;

        setStats({
          totalRevenue,
          totalOrders: orders.length,
          totalProducts: products.length,
          totalUsers: users.length,
          artisanCount,
          customerCount,
          avgOrderValue: orders.length > 0 ? Math.round(totalRevenue / orders.length) : 0,
          processingOrders: orders.filter(o => o.status === "Processing").length,
          shippedOrders: orders.filter(o => o.status === "Shipped").length,
          deliveredOrders: orders.filter(o => o.status === "Delivered").length,
        });
      } catch {
        // ignore
      }
    }
    loadReportData();
  }, []);

  const orderTotal = stats.processingOrders + stats.shippedOrders + stats.deliveredOrders;
  const processingPct = orderTotal > 0 ? Math.round((stats.processingOrders / orderTotal) * 100) : 0;
  const shippedPct = orderTotal > 0 ? Math.round((stats.shippedOrders / orderTotal) * 100) : 0;
  const deliveredPct = orderTotal > 0 ? Math.round((stats.deliveredOrders / orderTotal) * 100) : 0;

  return (
    <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 font-display">
      <div className="flex h-screen overflow-hidden">
        <AdminSidebar />
        <main className="flex-1 flex flex-col min-w-0 bg-background-light dark:bg-background-dark overflow-y-auto">
          <header className="h-16 border-b border-primary/10 flex items-center justify-between px-8 bg-white dark:bg-background-dark/50 sticky top-0 z-10 backdrop-blur-md">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">bar_chart</span>
              <h2 className="text-lg font-bold tracking-tight">Reports & Analytics</h2>
            </div>
            <NotificationBell />
          </header>
          <div className="p-8 max-w-7xl mx-auto w-full space-y-8">
            <div>
              <h1 className="text-4xl font-black tracking-tight">Reports</h1>
              <p className="text-slate-500 dark:text-slate-400 mt-2">Real-time analytics from your marketplace data.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white dark:bg-background-dark/30 p-6 rounded-xl border border-primary/10 shadow-sm">
                <div className="p-3 bg-primary/10 rounded-xl w-fit mb-4">
                  <span className="material-symbols-outlined text-primary">payments</span>
                </div>
                <p className="text-sm font-bold text-slate-500 uppercase tracking-wider">Total Revenue</p>
                <p className="text-3xl font-black text-primary mt-1">₹{stats.totalRevenue.toLocaleString()}</p>
              </div>
              <div className="bg-white dark:bg-background-dark/30 p-6 rounded-xl border border-primary/10 shadow-sm">
                <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-xl w-fit mb-4">
                  <span className="material-symbols-outlined text-blue-600">shopping_cart</span>
                </div>
                <p className="text-sm font-bold text-slate-500 uppercase tracking-wider">Total Orders</p>
                <p className="text-3xl font-black mt-1">{stats.totalOrders}</p>
              </div>
              <div className="bg-white dark:bg-background-dark/30 p-6 rounded-xl border border-primary/10 shadow-sm">
                <div className="p-3 bg-amber-50 dark:bg-amber-900/20 rounded-xl w-fit mb-4">
                  <span className="material-symbols-outlined text-amber-600">inventory_2</span>
                </div>
                <p className="text-sm font-bold text-slate-500 uppercase tracking-wider">Products Listed</p>
                <p className="text-3xl font-black mt-1">{stats.totalProducts}</p>
              </div>
              <div className="bg-white dark:bg-background-dark/30 p-6 rounded-xl border border-primary/10 shadow-sm">
                <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-xl w-fit mb-4">
                  <span className="material-symbols-outlined text-green-600">avg_pace</span>
                </div>
                <p className="text-sm font-bold text-slate-500 uppercase tracking-wider">Avg. Order Value</p>
                <p className="text-3xl font-black mt-1">₹{stats.avgOrderValue.toLocaleString()}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-white dark:bg-background-dark/30 rounded-xl border border-primary/10 shadow-sm p-8">
                <h3 className="font-bold text-xl mb-6">Order Fulfillment</h3>
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between text-sm font-bold mb-2">
                      <span className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-amber-500"></span>Processing</span>
                      <span>{stats.processingOrders} ({processingPct}%)</span>
                    </div>
                    <div className="h-3 bg-slate-100 dark:bg-background-dark rounded-full overflow-hidden">
                      <div className="h-full bg-amber-500 rounded-full transition-all duration-500" style={{ width: `${processingPct}%` }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm font-bold mb-2">
                      <span className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-blue-500"></span>Shipped</span>
                      <span>{stats.shippedOrders} ({shippedPct}%)</span>
                    </div>
                    <div className="h-3 bg-slate-100 dark:bg-background-dark rounded-full overflow-hidden">
                      <div className="h-full bg-blue-500 rounded-full transition-all duration-500" style={{ width: `${shippedPct}%` }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm font-bold mb-2">
                      <span className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-green-500"></span>Delivered</span>
                      <span>{stats.deliveredOrders} ({deliveredPct}%)</span>
                    </div>
                    <div className="h-3 bg-slate-100 dark:bg-background-dark rounded-full overflow-hidden">
                      <div className="h-full bg-green-500 rounded-full transition-all duration-500" style={{ width: `${deliveredPct}%` }}></div>
                    </div>
                  </div>
                </div>
                {orderTotal === 0 && (
                  <p className="text-sm text-slate-400 text-center mt-6">No orders yet. Place an order to see fulfillment data.</p>
                )}
              </div>

              <div className="bg-white dark:bg-background-dark/30 rounded-xl border border-primary/10 shadow-sm p-8">
                <h3 className="font-bold text-xl mb-6">User Breakdown</h3>
                <div className="space-y-6">
                  <div className="flex items-center justify-between p-4 bg-purple-50 dark:bg-purple-900/10 rounded-xl">
                    <div className="flex items-center gap-3">
                      <span className="material-symbols-outlined text-purple-600">palette</span>
                      <span className="font-bold">Artisans</span>
                    </div>
                    <span className="text-2xl font-black text-purple-600">{stats.artisanCount}</span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-blue-50 dark:bg-blue-900/10 rounded-xl">
                    <div className="flex items-center gap-3">
                      <span className="material-symbols-outlined text-blue-600">person</span>
                      <span className="font-bold">Customers</span>
                    </div>
                    <span className="text-2xl font-black text-blue-600">{stats.customerCount}</span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
                    <div className="flex items-center gap-3">
                      <span className="material-symbols-outlined text-slate-600">group</span>
                      <span className="font-bold">Total Registered</span>
                    </div>
                    <span className="text-2xl font-black">{stats.totalUsers}</span>
                  </div>
                </div>
                {stats.totalUsers === 0 && (
                  <p className="text-sm text-slate-400 text-center mt-6">No registered users yet. Register an account to see user data.</p>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
