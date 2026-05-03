import { useState, useEffect } from "react";
import AdminSidebar from "../../components/AdminSidebar";
import NotificationBell from "../../components/NotificationBell";
import { api } from "../../utils/api";

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterRole, setFilterRole] = useState("All");

  useEffect(() => {
    api.get("/users")
      .then((data) => {
        setUsers(data.map(u => ({
          id: u.id,
          name: u.name,
          email: u.email,
          role: u.role === "artist" ? "Artisan" : u.role === "admin" ? "Admin" : "Customer",
          joined: new Date(u.created_at).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
          value: "₹ 0",
          sub: u.role === "artist" ? "Artisan" : "Customer",
          status: u.status,
          avatar: null,
        })));
      })
      .catch(() => setUsers([]));
  }, []);

  const toggleStatus = async (id) => {
    const user = users.find(u => u.id === id);
    if (!user) return;
    const newStatus = user.status === "Active" ? "Suspended" : "Active";
    try {
      await api.patch(`/users/${id}/status`, { status: newStatus });
      setUsers(users.map(u => u.id === id ? { ...u, status: newStatus } : u));
    } catch (err) {
      alert(err.message || "Failed to update status");
    }
  };

  const filteredUsers = users.filter(u => {
    const matchesSearch = u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = filterRole === "All" || u.role === filterRole;
    return matchesSearch && matchesRole;
  });

  return (
    <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 min-h-screen">
      <div className="flex h-screen overflow-hidden">
        <AdminSidebar />
        <main className="flex-1 flex flex-col overflow-hidden">
          <header className="h-16 border-b border-primary/10 bg-white dark:bg-background-dark px-8 flex items-center justify-between sticky top-0 z-20 backdrop-blur-md">
            <div className="flex items-center gap-4">
              <h2 className="text-xl font-black">User Management</h2>
              <span className="text-sm text-slate-400">{users.length} total users</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative hidden md:block">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">search</span>
                <input
                  className="pl-10 pr-4 py-2 bg-primary/5 border-none rounded-xl text-sm w-64 focus:ring-2 focus:ring-primary/20"
                  placeholder="Search users..."
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <select
                className="bg-primary/5 border-none rounded-xl px-4 py-2 text-xs font-bold"
                value={filterRole}
                onChange={(e) => setFilterRole(e.target.value)}
              >
                <option value="All">All Roles</option>
                <option value="Artisan">Artisans</option>
                <option value="Customer">Customers</option>
              </select>
              <NotificationBell />
            </div>
          </header>
          <section className="flex-1 overflow-auto p-8 lg:p-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div className="bg-white dark:bg-background-dark/30 p-5 rounded-xl border border-primary/10 shadow-sm">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Users</p>
                <p className="text-2xl font-black mt-1">{users.length}</p>
              </div>
              <div className="bg-white dark:bg-background-dark/30 p-5 rounded-xl border border-primary/10 shadow-sm">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Artisans</p>
                <p className="text-2xl font-black text-purple-600 mt-1">{users.filter(u => u.role === "Artisan").length}</p>
              </div>
              <div className="bg-white dark:bg-background-dark/30 p-5 rounded-xl border border-primary/10 shadow-sm">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Customers</p>
                <p className="text-2xl font-black text-blue-600 mt-1">{users.filter(u => u.role === "Customer").length}</p>
              </div>
            </div>

            <div className="bg-white dark:bg-background-dark/30 rounded-xl border border-primary/10 shadow-sm overflow-hidden">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-primary/5 border-b border-primary/10">
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">User</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Role</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Joined</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Activity</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-primary/5">
                  {filteredUsers.map((u) => (
                    <tr className="hover:bg-primary/5 transition-colors" key={u.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-3">
                          <div className="size-10 rounded-full bg-primary/10 overflow-hidden border border-primary/10 flex items-center justify-center text-primary font-bold text-sm">
                            {u.avatar ? (
                              <img className="w-full h-full object-cover" src={u.avatar} alt={u.name} />
                            ) : (
                              u.name.split(" ").map(n => n[0]).slice(0, 2).join("").toUpperCase()
                            )}
                          </div>
                          <div>
                            <p className="text-sm font-bold text-slate-900 dark:text-white">{u.name}</p>
                            <p className="text-xs text-slate-500">{u.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-tighter ${u.role === "Artisan" ? "bg-purple-50 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400" : "bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400"}`}>{u.role}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-xs font-medium text-slate-500">{u.joined}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <p className="text-sm font-black text-slate-900 dark:text-white">{u.value}</p>
                        <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">{u.sub}</p>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter ${u.status === "Active" ? "bg-green-50 text-green-600 dark:bg-green-900/20 dark:text-green-400" : "bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400"}`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${u.status === "Active" ? "bg-green-600" : "bg-red-600"}`}></span>
                          {u.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <button
                          onClick={() => toggleStatus(u.id)}
                          className={`p-2 rounded-xl transition-all ${u.status === "Active" ? "text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10" : "text-green-500 hover:bg-green-50 dark:hover:bg-green-900/10"}`}
                          title={u.status === "Active" ? "Suspend User" : "Activate User"}
                        >
                          <span className="material-symbols-outlined text-xl">
                            {u.status === "Active" ? "person_off" : "person_check"}
                          </span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {filteredUsers.length === 0 && (
                <div className="p-20 text-center text-slate-500">
                  <span className="material-symbols-outlined text-4xl mb-2 opacity-20">search_off</span>
                  <p className="font-black text-lg">No users found.</p>
                </div>
              )}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
