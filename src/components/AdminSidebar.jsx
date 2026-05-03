import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export default function AdminSidebar() {
  const location = useLocation();
  const pathname = location.pathname;
  const navigate = useNavigate();
  const { logout } = useAuth();

  const linkClasses = (path) =>
    `flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
      pathname === path
        ? "bg-primary text-white shadow-sm"
        : "text-slate-600 dark:text-slate-300 hover:bg-primary/10 hover:text-primary group"
    }`;

  return (
    <aside className="w-64 flex-shrink-0 border-r border-primary/10 bg-white dark:bg-background-dark/50 overflow-y-auto">
      <div className="flex flex-col h-full p-4 gap-8">
        <div className="flex items-center gap-3 px-2">
          <div className="bg-primary/20 rounded-full flex items-center justify-center p-2">
            <span className="material-symbols-outlined text-primary text-3xl">storefront</span>
          </div>
          <div className="flex flex-col">
            <h1 className="text-primary text-sm font-bold leading-tight">Artisan Market</h1>
            <p className="text-slate-500 dark:text-slate-400 text-xs font-medium">Admin Central</p>
          </div>
        </div>
        <nav className="flex flex-col gap-1">
          <p className="px-3 text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">Main Menu</p>
          <Link className={linkClasses("/admin")} to="/admin">
            <span className="material-symbols-outlined text-xl">dashboard</span>
            <span className="text-sm font-medium">Dashboard</span>
          </Link>
          <Link className={linkClasses("/admin/users")} to="/admin/users">
            <span className="material-symbols-outlined text-xl">group</span>
            <span className="text-sm font-medium">Users</span>
          </Link>
          <Link className={linkClasses("/admin/approvals")} to="/admin/approvals">
            <span className="material-symbols-outlined text-xl">brush</span>
            <span className="text-sm font-medium">Artisans</span>
          </Link>
          <Link className={linkClasses("/admin/orders")} to="/admin/orders">
            <span className="material-symbols-outlined text-xl">shopping_cart</span>
            <span className="text-sm font-medium">Orders</span>
          </Link>
        </nav>
        <div className="mt-auto flex flex-col gap-1 border-t border-primary/10 pt-4">
          <Link className={linkClasses("/admin/settings")} to="/admin/settings">
            <span className="material-symbols-outlined text-xl">settings</span>
            <span className="text-sm font-medium">Settings</span>
          </Link>
          <div className="flex items-center gap-3 px-3 py-3">
            <div className="h-8 w-8 rounded-full bg-primary/20 bg-cover bg-center" style={{ backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuDQ-Lq_9UPGr5SKkmIzZT3XJJ3jzdWXQ9FH5FEOdnlQW0M39Hmz99HOMH74XuJcoMoIJRsoSgDAll1r4Wwn0_rJH1VAgo2SmIOzX_wQQEDsMcluEj6nRtOmHs5Of1kmYqoosGIeGsvtACvPoqqUhAmIFDA0hjhcBcScT_oT5IUHyTLElMQxGJenb7R4KEb1GBvHIfvfCqDGeSwv-rEAOILiHp3WfmSGjzuFO80pBswksOrsldYijSRS6On0-rIt6Xfaqsz7vZyn1ww')` }}></div>
            <div className="flex flex-col">
              <span className="text-xs font-bold">Raj Vadher</span>
              <span className="text-[10px] text-slate-500">Super Admin</span>
            </div>
          </div>
          <button
            onClick={() => { logout(); navigate("/"); }}
            className="flex items-center gap-3 px-3 py-2.5 w-full text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-lg transition-colors text-sm font-medium"
          >
            <span className="material-symbols-outlined text-xl">logout</span>
            <span>Logout</span>
          </button>
        </div>
      </div>
    </aside>
  );
}
