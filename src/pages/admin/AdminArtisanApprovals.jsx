import { useState, useEffect } from "react";
import AdminSidebar from "../../components/AdminSidebar";
import NotificationBell from "../../components/NotificationBell";
import { api } from "../../utils/api";

export default function AdminArtisanApprovals() {
  const [page, setPage] = useState(1);
  const [applications, setApplications] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  useEffect(() => {
    api.get("/approvals")
      .then((data) => {
        setApplications(data.map(a => ({
          ...a,
          logo: a.logo_url,
          date: new Date(a.date).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
        })));
      })
      .catch(() => setApplications([]));
  }, []);

  const handleAction = async (id, newStatus) => {
    const app = applications.find(a => a.id === id);
    try {
      await api.patch(`/approvals/${id}`, { status: newStatus });
      setApplications(prev => prev.map(a => a.id === id ? { ...a, status: newStatus } : a));
      if (newStatus === "Approved") {
        setSuccessMsg(`"${app?.name}" has been successfully approved!`);
      } else {
        setSuccessMsg(`"${app?.name}" has been rejected.`);
      }
      setTimeout(() => setSuccessMsg(""), 4000);
    } catch (err) {
      alert(err.message || "Failed to update");
    }
  };

  const filteredApps = applications.filter(app =>
    (app.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.tag.toLowerCase().includes(searchQuery.toLowerCase())) &&
    app.status === "Pending"
  );

  const rejectedApps = applications.filter(a => a.status === "Rejected");
  const approvedApps = applications.filter(a => a.status === "Approved");

  const itemsPerPage = 4;
  const totalPages = Math.ceil(filteredApps.length / itemsPerPage);
  const paginatedApplications = filteredApps.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  const stats = {
    pending: applications.filter(a => a.status === "Pending").length,
    approved: approvedApps.length,
    rejected: rejectedApps.length,
  };

  return (
    <div className="bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-slate-100">
      <div className="flex h-screen overflow-hidden">
        <AdminSidebar />
        <main className="flex-1 flex flex-col overflow-y-auto">
          <header className="h-16 border-b border-primary/10 flex items-center justify-between px-8 bg-white dark:bg-background-dark/50 sticky top-0 z-10 backdrop-blur-md">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">verified_user</span>
              <h2 className="text-lg font-bold tracking-tight">Artisan Approvals</h2>
            </div>
            <div className="flex items-center gap-3">
              <div className="relative hidden md:block">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">search</span>
                <input
                  className="pl-10 pr-4 py-2 bg-primary/5 border-none rounded-xl text-sm w-64 focus:ring-2 focus:ring-primary/20"
                  placeholder="Search applications..."
                  type="text"
                  value={searchQuery}
                  onChange={(e) => { setSearchQuery(e.target.value); setPage(1); }}
                />
              </div>
              <NotificationBell />
            </div>
          </header>
          <div className="p-8 max-w-7xl mx-auto w-full space-y-8">
            {successMsg && (
              <div className={`flex items-center gap-2 p-4 rounded-xl text-sm font-bold ${successMsg.includes("approved") ? "text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20" : "text-red-600 bg-red-50 dark:bg-red-900/20"}`}>
                <span className="material-symbols-outlined text-lg">{successMsg.includes("approved") ? "check_circle" : "cancel"}</span>
                {successMsg}
              </div>
            )}
            <div>
              <h1 className="text-4xl font-black tracking-tight">Artisan Approvals</h1>
              <p className="text-slate-500 dark:text-slate-400 mt-2 max-w-xl">Review and manage pending artisan applications. Ensure all shops meet the marketplace quality standards.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-white dark:bg-background-dark/30 p-5 rounded-xl border border-primary/10 shadow-sm">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Pending</p>
                <p className="text-2xl font-black text-amber-600 mt-1">{stats.pending}</p>
              </div>
              <div className="bg-white dark:bg-background-dark/30 p-5 rounded-xl border border-primary/10 shadow-sm">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Approved</p>
                <p className="text-2xl font-black text-green-600 mt-1">{stats.approved}</p>
              </div>
              <div className="bg-white dark:bg-background-dark/30 p-5 rounded-xl border border-primary/10 shadow-sm">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Rejected</p>
                <p className="text-2xl font-black text-red-600 mt-1">{stats.rejected}</p>
              </div>
            </div>

            <div className="bg-white dark:bg-background-dark/20 rounded-xl border border-primary/10 overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-primary/5 border-b border-primary/10">
                      <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Shop Name</th>
                      <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Specialty</th>
                      <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Submission Date</th>
                      <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-primary/5">
                    {paginatedApplications.map((r) => (
                      <tr className="hover:bg-primary/5 transition-colors" key={r.id}>
                        <td className="px-6 py-5">
                          <div className="flex items-center gap-3">
                            <div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary font-bold overflow-hidden" style={{ backgroundImage: `url('${r.logo}')`, backgroundSize: "cover" }}></div>
                            <span className="text-sm font-semibold">{r.name}</span>
                          </div>
                        </td>
                        <td className="px-6 py-5">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">{r.tag}</span>
                        </td>
                        <td className="px-6 py-5 text-sm text-slate-500">{r.date}</td>
                        <td className="px-6 py-5">
                          <div className="flex justify-end gap-2">
                            <button
                              onClick={() => handleAction(r.id, "Approved")}
                              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary text-white text-xs font-bold hover:bg-primary/90 transition-all"
                            >
                              <span className="material-symbols-outlined text-sm">check_circle</span>
                              Approve
                            </button>
                            <button
                              onClick={() => handleAction(r.id, "Rejected")}
                              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-red-200 text-red-600 dark:border-red-900/30 dark:text-red-400 text-xs font-bold hover:bg-red-50 dark:hover:bg-red-900/10 transition-all"
                            >
                              <span className="material-symbols-outlined text-sm">cancel</span>
                              Reject
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                    {paginatedApplications.length === 0 && (
                      <tr>
                        <td colSpan="4" className="px-6 py-16 text-center text-slate-500">
                          <span className="material-symbols-outlined text-4xl mb-2 opacity-20 block">check_circle</span>
                          <p className="font-bold">No pending applications</p>
                          <p className="text-sm mt-1">All artisan applications have been reviewed.</p>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
              {totalPages > 1 && (
                <div className="px-6 py-4 flex items-center justify-between bg-primary/5 border-t border-primary/10">
                  <p className="text-xs text-slate-500">Showing {(page - 1) * itemsPerPage + 1} to {Math.min(page * itemsPerPage, filteredApps.length)} of {filteredApps.length}</p>
                  <div className="flex gap-1">
                    <button onClick={() => setPage(prev => Math.max(1, prev - 1))} disabled={page === 1} className="p-1.5 rounded bg-white dark:bg-background-dark/30 border border-primary/10 text-slate-400 hover:text-primary transition-colors disabled:opacity-40">
                      <span className="material-symbols-outlined text-lg leading-none">chevron_left</span>
                    </button>
                    {[...Array(totalPages)].map((_, i) => (
                      <button key={i} onClick={() => setPage(i + 1)} className={`px-3 py-1 rounded text-xs font-bold ${page === i + 1 ? "bg-primary text-white" : "bg-white dark:bg-background-dark/30 text-slate-600 hover:bg-primary/5"}`}>{i + 1}</button>
                    ))}
                    <button onClick={() => setPage(prev => Math.min(totalPages, prev + 1))} disabled={page === totalPages} className="p-1.5 rounded bg-white dark:bg-background-dark/30 border border-primary/10 text-slate-600 hover:text-primary transition-colors disabled:opacity-40">
                      <span className="material-symbols-outlined text-lg leading-none">chevron_right</span>
                    </button>
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
