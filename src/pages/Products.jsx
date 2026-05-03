import { useCart } from "../context/CartContext.jsx";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext.jsx";
import { api } from "../utils/api";

export default function Products() {
  const { items, addItem: addToCart } = useCart();
  const { user, logout } = useAuth();
  const [category, setCategory] = useState("All Crafts");
  const [page, setPage] = useState(1);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const params = category !== "All Crafts" ? `?category=${category}` : "";
    api.get(`/products${params}`)
      .then((data) => {
        setProducts(data.map((p) => ({
          id: p.id,
          title: p.title,
          brand: p.category,
          author: p.artisan_name || "Local Artisan",
          price: Number(p.price),
          img: p.image_url || "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=400",
        })));
      })
      .catch(() => setProducts([]));
    setPage(1);
  }, [category]);
  return (
    <div className="bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-slate-100">
      <div className="relative flex h-auto min-h-screen w-full flex-col overflow-x-hidden">
        <div className="layout-container flex h-full grow flex-col">
          <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-primary/10 px-6 md:px-10 py-3 bg-background-light dark:bg-background-dark sticky top-0 z-50">
            <div className="flex items-center gap-8">
              <div className="flex items-center gap-4 text-slate-900 dark:text-slate-100">
                <div className="size-6 text-primary">
                  <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                    <path clipRule="evenodd" d="M24 4H42V17.3333V30.6667H24V44H6V30.6667V17.3333H24V4Z" fill="currentColor" fillRule="evenodd"></path>
                  </svg>
                </div>
                <h2 className="text-slate-900 dark:text-slate-100 text-lg font-bold leading-tight tracking-[-0.015em]">Artisan Market</h2>
              </div>
              <label className="hidden md:flex flex-col min-w-40 h-10 max-w-64">
                <div className="flex w-full flex-1 items-stretch rounded-lg h-full">
                  <div className="text-primary/60 flex border-none bg-primary/10 items-center justify-center pl-4 rounded-l-lg">
                    <span className="material-symbols-outlined">search</span>
                  </div>
                  <input className="form-input flex w-full min-w-0 flex-1 border-none bg-primary/10 focus:ring-0 h-full placeholder:text-primary/60 px-4 rounded-r-lg text-base font-normal" placeholder="Search crafts..." defaultValue="" />
                </div>
              </label>
            </div>
            <div className="flex flex-1 justify-end gap-8">
              <div className="flex gap-2">
                <Link to="/cart" className="relative flex items-center justify-center rounded-lg h-10 w-10 bg-primary/10 text-slate-900 dark:text-slate-100 hover:bg-primary/20 transition-colors">
                  <span className="material-symbols-outlined text-[20px]">shopping_cart</span>
                  {items.length > 0 && (
                    <div className="absolute -top-1 -right-1 bg-primary text-white text-[10px] font-bold rounded-full size-4 flex items-center justify-center">
                      {items.length}
                    </div>
                  )}
                </Link>
                {user ? (
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">Hi, {user.name}</span>
                    <button onClick={logout} className="flex items-center justify-center rounded-lg h-10 w-10 bg-primary/10 text-slate-900 dark:text-slate-100 hover:bg-primary/20 transition-colors">
                      <span className="material-symbols-outlined text-[20px]">logout</span>
                    </button>
                  </div>
                ) : (
                  <Link to="/login" className="flex items-center justify-center rounded-lg h-10 w-10 bg-primary/10 text-slate-900 dark:text-slate-100 hover:bg-primary/20 transition-colors">
                    <span className="material-symbols-outlined text-[20px]">person</span>
                  </Link>
                )}
              </div>
            </div>
          </header>
          <main className="flex flex-1 px-4 md:px-10 py-8 gap-8 max-w-[1440px] mx-auto w-full">
            <aside className="hidden md:flex flex-col w-64 shrink-0 gap-8">
              <div>
                <h3 className="text-slate-900 dark:text-slate-100 text-lg font-bold mb-4">Categories</h3>
                <div className="flex flex-col gap-2">
                  <button onClick={() => setCategory("All Crafts")} className={`flex items-center gap-3 px-3 py-2 rounded-lg ${category === 'All Crafts' ? 'bg-primary text-white' : 'hover:bg-primary/10 text-slate-700 dark:text-slate-300'}`}>
                    <span className="material-symbols-outlined">category</span>
                    <span className="text-sm font-medium">All Crafts</span>
                  </button>
                  <button onClick={() => setCategory("Ceramics")} className={`flex items-center gap-3 px-3 py-2 rounded-lg ${category === 'Ceramics' ? 'bg-primary text-white' : 'hover:bg-primary/10 text-slate-700 dark:text-slate-300'}`}>
                    <span className="material-symbols-outlined">repeat</span>
                    <span className="text-sm font-medium">Ceramics</span>
                  </button>
                  <button onClick={() => setCategory("Jewelry")} className={`flex items-center gap-3 px-3 py-2 rounded-lg ${category === 'Jewelry' ? 'bg-primary text-white' : 'hover:bg-primary/10 text-slate-700 dark:text-slate-300'}`}>
                    <span className="material-symbols-outlined">diamond</span>
                    <span className="text-sm font-medium">Jewelry</span>
                  </button>
                  <button onClick={() => setCategory("Woodwork")} className={`flex items-center gap-3 px-3 py-2 rounded-lg ${category === 'Woodwork' ? 'bg-primary text-white' : 'hover:bg-primary/10 text-slate-700 dark:text-slate-300'}`}>
                    <span className="material-symbols-outlined">forest</span>
                    <span className="text-sm font-medium">Woodwork</span>
                  </button>
                  <button onClick={() => setCategory("Textiles")} className={`flex items-center gap-3 px-3 py-2 rounded-lg ${category === 'Textiles' ? 'bg-primary text-white' : 'hover:bg-primary/10 text-slate-700 dark:text-slate-300'}`}>
                    <span className="material-symbols-outlined">texture</span>
                    <span className="text-sm font-medium">Textiles</span>
                  </button>
                  <button onClick={() => setCategory("Home Decor")} className={`flex items-center gap-3 px-3 py-2 rounded-lg ${category === 'Home Decor' ? 'bg-primary text-white' : 'hover:bg-primary/10 text-slate-700 dark:text-slate-300'}`}>
                    <span className="material-symbols-outlined">chair</span>
                    <span className="text-sm font-medium">Home Decor</span>
                  </button>
                </div>
              </div>
            </aside>
            <div className="flex-1">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                <div>
                  <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">Handcrafted Goods</h1>
                  <p className="text-slate-600 dark:text-slate-400">Discover unique pieces from local creators</p>
                </div>
                <div className="flex items-center gap-4 w-full md:w-auto">
                  <span className="text-sm font-medium text-slate-500 whitespace-nowrap">Sort by:</span>
                  <select className="form-select rounded-lg border-primary/20 bg-background-light dark:bg-background-dark text-sm focus:border-primary focus:ring-primary w-full md:w-48">
                    <option>Newest Arrivals</option>
                    <option>Price: Low to High</option>
                    <option>Price: High to Low</option>
                    <option>Top Rated</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {products.filter(p => category === "All Crafts" || p.brand === category).slice((page - 1) * 6, page * 6).map((p) => (
                  <div className="group flex flex-col bg-white dark:bg-slate-800/50 rounded-xl overflow-hidden border border-primary/5 hover:shadow-xl transition-shadow" key={p.id}>
                    <div className="relative aspect-square overflow-hidden">
                      <img alt={p.title} className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500" src={p.img} />
                    </div>
                    <div className="p-4 flex flex-col gap-1">
                      <div className="flex justify-between items-start">
                        <h3 className="font-bold text-slate-900 dark:text-slate-100 group-hover:text-primary transition-colors">{p.title}</h3>
                        <span className="font-bold text-primary text-lg">&#8377;{p.price}</span>
                      </div>
                      <p className="text-xs font-medium text-primary/70 uppercase tracking-wide">{p.brand}</p>
                      <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">by {p.author}</p>
                      <button onClick={() => addToCart({ id: p.id, title: p.title, price: p.price, img: p.img })} className="mt-auto w-full py-2.5 bg-primary text-white rounded-lg font-bold text-sm flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors">
                        <span className="material-symbols-outlined text-[18px]">add_shopping_cart</span>
                        Add to Cart
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex justify-center mt-12 gap-2">
                <button onClick={() => setPage(p => Math.max(1, p - 1))} className="w-10 h-10 flex items-center justify-center rounded-lg border border-primary/20 text-primary hover:bg-primary/10">
                  <span className="material-symbols-outlined">chevron_left</span>
                </button>
                {[...Array(Math.ceil(products.filter(p => category === "All Crafts" || p.brand === category).length / 6))].map((_, i) => (
                  <button key={i} onClick={() => setPage(i + 1)} className={`w-10 h-10 flex items-center justify-center rounded-lg ${page === i + 1 ? 'bg-primary text-white font-bold' : 'border border-primary/20 text-slate-600 hover:bg-primary/10'}`}>{i + 1}</button>
                ))}
                <button onClick={() => setPage(prev => Math.min(Math.ceil(products.filter(item => category === "All Crafts" || item.brand === category).length / 6), prev + 1))} className="w-10 h-10 flex items-center justify-center rounded-lg border border-primary/20 text-primary hover:bg-primary/10">
                  <span className="material-symbols-outlined">chevron_right</span>
                </button>
              </div>
            </div>
          </main>
          <footer className="bg-primary/5 border-t border-primary/10 py-12 px-6 md:px-10 mt-20">
            <div className="max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-2 text-primary">
                  <span className="material-symbols-outlined">storefront</span>
                  <span className="text-lg font-bold">Artisan Market</span>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">Connecting you with the finest local artisans and their unique handcrafted creations. Every piece tells a story of craftsmanship.</p>
              </div>
              <div>
                <h4 className="font-bold text-slate-900 dark:text-slate-100 mb-4">Marketplace</h4>
                <ul className="flex flex-col gap-2 text-sm text-slate-600 dark:text-slate-400">
                  <li><Link className="hover:text-primary" to="/">Browse All</Link></li>
                  <li><Link className="hover:text-primary" to="/">New Arrivals</Link></li>
                  <li><Link className="hover:text-primary" to="/">Featured Artisans</Link></li>
                  <li><Link className="hover:text-primary" to="/">Gift Cards</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-slate-900 dark:text-slate-100 mb-4">Support</h4>
                <ul className="flex flex-col gap-2 text-sm text-slate-600 dark:text-slate-400">
                  <li><Link className="hover:text-primary" to="/">Shipping Info</Link></li>
                  <li><Link className="hover:text-primary" to="/">Returns &amp; Exchanges</Link></li>
                  <li><Link className="hover:text-primary" to="/">Contact Us</Link></li>
                  <li><Link className="hover:text-primary" to="/">FAQs</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-slate-900 dark:text-slate-100 mb-4">Join Our Journey</h4>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">Get the latest stories from our artisans directly in your inbox.</p>
                <div className="flex gap-2">
                  <input className="form-input flex-1 rounded-lg border-primary/20 bg-white/50 dark:bg-slate-800 focus:ring-primary focus:border-primary text-sm" placeholder="Email address" type="email" />
                  <button onClick={() => console.log('Joined!')} className="bg-primary text-white px-4 py-2 rounded-lg font-bold text-sm">Join</button>
                </div>
              </div>
            </div>
            <div className="max-w-[1440px] mx-auto mt-12 pt-8 border-t border-primary/10 flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-xs text-slate-500">&copy; 2024 Local Artisan Marketplace. All rights reserved.</p>
              <div className="flex gap-6 text-xs text-slate-500">
                <Link className="hover:text-primary" to="/">Privacy Policy</Link>
                <Link className="hover:text-primary" to="/">Terms of Service</Link>
                <Link className="hover:text-primary" to="/">Cookie Settings</Link>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
}
