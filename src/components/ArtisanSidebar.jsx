import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export default function ArtisanSidebar() {
  const location = useLocation();
  const pathname = location.pathname;
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const linkClasses = (path) =>
    `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
      pathname === path
        ? "bg-primary/10 text-primary font-medium"
        : "text-slate-600 dark:text-slate-300 hover:bg-primary/5"
    }`;

  return (
    <aside className="w-72 border-r border-primary/10 bg-white dark:bg-background-dark flex flex-col fixed h-full">
      <div className="p-6 flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white">
          <span className="material-symbols-outlined">storefront</span>
        </div>
        <div>
          <h1 className="text-sm font-bold uppercase tracking-wider text-primary">Artisan Market</h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">Seller Dashboard</p>
        </div>
      </div>
      <nav className="flex-1 px-4 space-y-2 mt-4">
        <Link to="/artisan" className={linkClasses("/artisan")}>
          <span className="material-symbols-outlined">dashboard</span>
          <span>Dashboard</span>
        </Link>
        <Link to="/artisan/my-products" className={linkClasses("/artisan/my-products")}>
          <span className="material-symbols-outlined">inventory_2</span>
          <span>My Products</span>
        </Link>
        <Link to="/artisan/orders" className={linkClasses("/artisan/orders")}>
          <span className="material-symbols-outlined">shopping_basket</span>
          <span>Orders</span>
        </Link>
        <Link to="/artisan/profile" className={linkClasses("/artisan/profile")}>
          <span className="material-symbols-outlined">person</span>
          <span>Profile</span>
        </Link>
      </nav>
      <div className="p-6 border-t border-primary/10 space-y-3">
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-full bg-primary/20 bg-cover bg-center"
            style={{
              backgroundImage:
                "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDUjUzHZWYV43Bf2_KoAnmthfuODu0fE12qiTl9thx6Wegz_usg604Vr1D0jV_lyfvD4XHtDbXIGY5C8SJ3hQaBOfDqQ8yDhOV0QVFED96t3dccRbSX7zO7ntoC3vxQpFKReeg0VOjGMFaa7LuYfSVQ8V71MtTZvf3PogeH97y9LoPl4irhLLAYCw-aQ6L7Nyf4sMBDSDAUp1WVINfHCCwoRq2mPjRewCU1HmZMS6AAC6xbkUbs9RwpzC3Vjfhz9QlaReUqs6Q-c4w')",
            }}
          ></div>
          <div>
            <p className="text-sm font-semibold">{user?.name || "Arjun Singh"}</p>
            <p className="text-xs text-slate-500">{user?.craft || "Master Potter"}</p>
          </div>
        </div>
        <button
          onClick={() => { logout(); navigate("/"); }}
          className="flex items-center gap-3 px-4 py-2.5 w-full text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-lg transition-colors text-sm font-medium"
        >
          <span className="material-symbols-outlined text-lg">logout</span>
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}
