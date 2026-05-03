import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";
import ArtisanSidebar from "../../components/ArtisanSidebar.jsx";
import { api } from "../../utils/api";

export default function ArtisanMyProducts() {
  const { user } = useAuth();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    api.get("/products/mine")
      .then((data) => {
        setProducts(data.map((p) => ({
          id: p.id,
          name: p.title || "Untitled",
          category: p.category || "Craft",
          price: Number(p.price) || 0,
          stock: p.stock || 0,
          image: p.image_url,
        })));
      })
      .catch(() => setProducts([]));
  }, [user]);

  const handleDelete = async (id) => {
    try {
      await api.delete(`/products/${id}`);
      setProducts(products.filter((p) => p.id !== id));
    } catch (err) {
      alert(err.message || "Failed to delete");
    }
  };

  const totalProducts = products.length;
  const lowStockCount = products.filter((p) => p.stock > 0 && p.stock < 3).length;
  const activeListings = products.filter((p) => p.stock > 0).length;

  const getStatusInfo = (stock) => {
    if (stock <= 0) {
      return {
        text: "Out of Stock",
        class: "bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-400",
      };
    }
    if (stock < 3) {
      return {
        text: `Low Stock (${stock} left)`,
        class: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
      };
    }
    return {
      text: "In Stock",
      class: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
    };
  };

  return (
    <div className="bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-slate-100">
      <div className="flex min-h-screen">
        <ArtisanSidebar />

        <main className="flex-1 ml-72 p-8 lg:p-12">
          {/* Header Section */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div className="max-w-2xl">
              <h2 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight mb-2">My Products</h2>
              <p className="text-slate-600 dark:text-slate-400 text-lg">Manage your handcrafted items, monitor inventory levels, and update catalog pricing.</p>
            </div>
            <Link
              to="/artisan/add-product"
              className="flex items-center justify-center gap-2 bg-primary text-white px-6 py-3 rounded-xl font-bold hover:brightness-110 transition-all shadow-lg shadow-primary/20 shrink-0"
            >
              <span className="material-symbols-outlined">add</span>
              <span>Add New Product</span>
            </Link>
          </div>

          {/* Dashboard Stats Summary */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-primary/10 shadow-sm">
              <p className="text-slate-500 text-sm font-medium mb-1">Total Products</p>
              <p className="text-3xl font-black text-primary">{totalProducts}</p>
            </div>
            <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-primary/10 shadow-sm">
              <p className="text-slate-500 text-sm font-medium mb-1">Low Stock Alert</p>
              <p className="text-3xl font-black text-amber-600">{lowStockCount}</p>
            </div>
            <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-primary/10 shadow-sm">
              <p className="text-slate-500 text-sm font-medium mb-1">Active Listings</p>
              <p className="text-3xl font-black text-emerald-600">{activeListings}</p>
            </div>
          </div>

          {/* Products Table Container */}
          <div className="bg-white dark:bg-slate-800 rounded-xl border border-primary/10 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-primary/5 border-b border-primary/10">
                    <th className="px-6 py-4 text-sm font-bold text-slate-700 dark:text-slate-200 uppercase tracking-wider">Thumbnail</th>
                    <th className="px-6 py-4 text-sm font-bold text-slate-700 dark:text-slate-200 uppercase tracking-wider">Product Name</th>
                    <th className="px-6 py-4 text-sm font-bold text-slate-700 dark:text-slate-200 uppercase tracking-wider">Price</th>
                    <th className="px-6 py-4 text-sm font-bold text-slate-700 dark:text-slate-200 uppercase tracking-wider">Stock Status</th>
                    <th className="px-6 py-4 text-sm font-bold text-slate-700 dark:text-slate-200 uppercase tracking-wider text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-primary/5">
                  {products.map((r) => {
                    const status = getStatusInfo(r.stock);
                    return (
                      <tr key={r.id} className="hover:bg-primary/5 transition-colors group">
                        <td className="px-6 py-4">
                          <div
                            className="size-14 rounded-lg bg-slate-100 bg-cover bg-center border border-primary/10"
                            style={{ backgroundImage: `url('${r.image}')` }}
                          ></div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex flex-col">
                            <span className="font-bold text-slate-900 dark:text-white">{r.name}</span>
                            <span className="text-xs text-slate-500">{r.category}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 font-semibold text-slate-700 dark:text-slate-300">₹{Number(r.price).toLocaleString()}</td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold ${status.class}`}>{status.text}</span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex justify-end gap-2">
                            <button className="p-2 text-slate-400 hover:text-primary hover:bg-primary/10 rounded-lg transition-all" title="Edit">
                              <span className="material-symbols-outlined text-sm">edit</span>
                            </button>
                            <button
                              onClick={() => handleDelete(r.id)}
                              className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                              title="Delete"
                            >
                              <span className="material-symbols-outlined text-sm">delete</span>
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            {/* Table Footer / Pagination */}
            <div className="px-6 py-4 flex items-center justify-between bg-primary/5">
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Showing <span className="font-bold text-slate-900 dark:text-white">{products.length > 0 ? 1 : 0}</span> to{" "}
                <span className="font-bold text-slate-900 dark:text-white">{products.length}</span> of{" "}
                <span className="font-bold text-slate-900 dark:text-white">{products.length}</span> products
              </p>
              <div className="flex gap-2">
                <button className="px-4 py-2 text-sm font-medium text-slate-600 bg-white border border-primary/10 rounded-lg hover:bg-primary/5 transition-colors">
                  Previous
                </button>
                <button className="px-4 py-2 text-sm font-medium text-white bg-primary rounded-lg shadow-sm">1</button>
                <button className="px-4 py-2 text-sm font-medium text-slate-600 bg-white border border-primary/10 rounded-lg hover:bg-primary/5 transition-colors">
                  2
                </button>
                <button className="px-4 py-2 text-sm font-medium text-slate-600 bg-white border border-primary/10 rounded-lg hover:bg-primary/5 transition-colors">
                  Next
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
