import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";

export default function Cart() {
  const { items, removeItem, updateQty, totals } = useCart();
  return (
    <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 min-h-screen">
      <div className="layout-container flex flex-col min-h-screen">
        <header className="border-b border-primary/10 bg-white/80 dark:bg-background-dark/80 backdrop-blur-md sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-20">
              <div className="flex items-center gap-8">
                <div className="flex items-center gap-3">
                  <div className="bg-primary text-white p-2 rounded-lg">
                    <span className="material-symbols-outlined block">storefront</span>
                  </div>
                  <h1 className="text-xl font-bold tracking-tight text-primary">Artisan Marketplace</h1>
                </div>
              </div>
              <div className="flex items-center gap-4 lg:gap-6 flex-1 justify-end">
                <div className="max-w-xs w-full hidden sm:block">
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="material-symbols-outlined text-slate-400 text-lg">search</span>
                    </div>
                    <input className="block w-full pl-10 pr-3 py-2 border border-primary/10 rounded-lg leading-5 bg-primary/5 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-primary sm:text-sm" placeholder="Search unique crafts" type="search" />
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Link to="/cart" className="p-2 rounded-lg hover:bg-primary/10 transition-colors relative">
                    <span className="material-symbols-outlined">shopping_bag</span>
                    <span className="absolute top-1.5 right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-white leading-none">{items.length}</span>
                  </Link>
                  <Link to="/login" className="p-2 rounded-lg hover:bg-primary/10 transition-colors">
                    <span className="material-symbols-outlined">person</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </header>
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full grow">
          <nav className="flex items-center gap-2 mb-8 text-sm text-slate-500 dark:text-slate-400">
            <Link className="hover:text-primary transition-colors" to="/">Home</Link>
            <span className="material-symbols-outlined text-base">chevron_right</span>
            <span className="text-slate-900 dark:text-slate-100 font-medium">Shopping Cart</span>
          </nav>
          <div className="flex flex-col lg:flex-row gap-12">
            <div className="flex-1 space-y-8">
              <div className="flex items-end justify-between border-b border-primary/10 pb-6">
                <h2 className="text-4xl font-black tracking-tight">Your Cart</h2>
                <span className="text-slate-500 mb-1">{items.reduce((a, b) => a + b.qty, 0)} items in your cart</span>
              </div>
              <div className="space-y-6">
                {items.map((item) => (
                  <div key={item.id} className="flex flex-col sm:flex-row gap-6 p-6 rounded-xl bg-white dark:bg-slate-900 border border-primary/5 shadow-sm">
                    <div className="w-full sm:w-32 h-32 rounded-lg bg-cover bg-center shrink-0" style={{ backgroundImage: `url('${item.img}')` }}></div>
                    <div className="flex-1 flex flex-col sm:flex-row justify-between gap-4">
                      <div className="space-y-1">
                        <h3 className="text-lg font-bold">{item.title}</h3>
                        <p className="text-sm text-primary font-medium flex items-center gap-1">
                          <span className="material-symbols-outlined text-sm">auto_awesome</span>
                          Artisan Crafted
                        </p>
                        <p className="text-slate-500 text-sm mt-2">Handmade with care</p>
                        <button onClick={() => removeItem(item.id)} className="text-primary/60 hover:text-primary text-sm font-medium flex items-center gap-1 mt-4">
                          <span className="material-symbols-outlined text-lg">delete</span>
                          Remove
                        </button>
                      </div>
                      <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-start gap-4">
                        <p className="text-xl font-bold">&#8377;{(item.price * item.qty).toFixed(2)}</p>
                        <div className="flex items-center gap-1 bg-primary/5 p-1 rounded-lg">
                          <button onClick={() => updateQty(item.id, item.qty - 1)} className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-primary/10 transition-colors">
                            <span className="material-symbols-outlined text-lg">remove</span>
                          </button>
                          <input className="w-10 text-center bg-transparent border-none focus:ring-0 font-medium" min="1" type="number" value={item.qty} onChange={(e) => updateQty(item.id, parseInt(e.target.value || "1", 10))} />
                          <button onClick={() => updateQty(item.id, item.qty + 1)} className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-primary/10 transition-colors">
                            <span className="material-symbols-outlined text-lg">add</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                {!items.length && (
                  <div className="p-6 rounded-xl bg-white dark:bg-slate-900 border border-primary/5">
                    <p className="text-slate-600">Your cart is empty.</p>
                  </div>
                )}
              </div>
              <div className="flex items-center gap-4 p-4 rounded-lg bg-primary/5 border border-primary/10 mt-8">
                <span className="material-symbols-outlined text-primary">local_shipping</span>
                <p className="text-sm">You are <strong>&#8377;{Math.max(0, 150 - totals.subtotal).toFixed(2)}</strong> away from <strong>free shipping</strong> on artisan goods!</p>
              </div>
            </div>
            <aside className="w-full lg:w-96">
              <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 border border-primary/10 shadow-lg sticky top-28">
                <h3 className="text-xl font-bold mb-6">Order Summary</h3>
                <div className="space-y-4 border-b border-primary/10 pb-6 mb-6">
                  <div className="flex justify-between text-slate-600 dark:text-slate-400">
                    <span>Subtotal</span>
                    <span className="text-slate-900 dark:text-slate-100 font-medium">&#8377;{totals.subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-slate-600 dark:text-slate-400">
                    <span>Shipping Estimate</span>
                    <span className="text-slate-900 dark:text-slate-100 font-medium">&#8377;{totals.shipping.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-slate-600 dark:text-slate-400">
                    <span>Tax Estimate</span>
                    <span className="text-slate-900 dark:text-slate-100 font-medium">&#8377;{totals.tax.toFixed(2)}</span>
                  </div>
                </div>
                <div className="flex justify-between items-baseline mb-8">
                  <span className="text-lg font-bold">Total</span>
                  <span className="text-3xl font-black text-primary">&#8377;{totals.total.toFixed(2)}</span>
                </div>
                <Link to="/checkout" className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-4 px-6 rounded-xl transition-all shadow-md flex items-center justify-center gap-2 group">
                  Proceed to Checkout
                  <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
                </Link>
                <div className="mt-8 space-y-4">
                  <div className="flex gap-3 text-sm text-slate-500">
                    <span className="material-symbols-outlined text-primary text-xl">shield</span>
                    <span>Secure payments with artisan-first platform</span>
                  </div>
                  <div className="flex gap-3 text-sm text-slate-500">
                    <span className="material-symbols-outlined text-primary text-xl">package_2</span>
                    <span>Hand-packed and shipped directly from artisans</span>
                  </div>
                </div>
                <div className="mt-8 pt-8 border-t border-primary/10">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2" htmlFor="promo">Promo Code</label>
                  <div className="flex gap-2">
                    <input className="flex-1 bg-primary/5 border-primary/10 rounded-lg text-sm focus:ring-primary focus:border-primary" id="promo" placeholder="Enter code" type="text" />
                    <button onClick={() => console.log('Promo code applied!')} className="px-4 py-2 border border-primary text-primary hover:bg-primary/5 rounded-lg text-sm font-bold transition-colors">Apply</button>
                  </div>
                </div>
              </div>
              <Link to="/products" className="w-full mt-6 py-3 px-4 flex items-center justify-center gap-2 text-primary font-medium hover:underline">
                <span className="material-symbols-outlined">arrow_back</span>
                Continue Shopping
              </Link>
            </aside>
          </div>
        </main>
        <footer className="bg-primary/5 border-t border-primary/10 mt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
              <div className="col-span-1 md:col-span-2 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="bg-primary text-white p-1.5 rounded-md">
                    <span className="material-symbols-outlined block text-sm">storefront</span>
                  </div>
                  <h2 className="text-lg font-bold tracking-tight text-primary">Artisan Marketplace</h2>
                </div>
                <p className="max-w-xs text-sm text-slate-600 dark:text-slate-400 leading-relaxed">Connecting conscious collectors with independent artisans from around the world. Every piece tells a unique story of heritage and craftsmanship.</p>
              </div>
              <div>
                <h4 className="font-bold mb-4">Support</h4>
                <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                  <li><Link className="hover:text-primary" to="/">Shipping Policy</Link></li>
                  <li><Link className="hover:text-primary" to="/">Returns &amp; Exchanges</Link></li>
                  <li><Link className="hover:text-primary" to="/">Track Your Order</Link></li>
                  <li><Link className="hover:text-primary" to="/">Contact Us</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold mb-4">About</h4>
                <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                  <li><Link className="hover:text-primary" to="/">Our Story</Link></li>
                  <li><Link className="hover:text-primary" to="/">Meet the Artisans</Link></li>
                  <li><Link className="hover:text-primary" to="/">Sustainability</Link></li>
                  <li><Link className="hover:text-primary" to="/">Journal</Link></li>
                </ul>
              </div>
            </div>
            <div className="mt-12 pt-8 border-t border-primary/10 flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-xs text-slate-500">&copy; 2024 Local Artisan Marketplace. Hand-crafted with care.</p>
              <div className="flex gap-6">
                <Link className="text-slate-400 hover:text-primary transition-colors" to="/"><span className="material-symbols-outlined">public</span></Link>
                <Link className="text-slate-400 hover:text-primary transition-colors" to="/"><span className="material-symbols-outlined">mail</span></Link>
                <Link className="text-slate-400 hover:text-primary transition-colors" to="/"><span className="material-symbols-outlined">share</span></Link>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
