import { Link } from "react-router-dom";

export default function OrderSuccess() {
  const orderId = Math.floor(100000 + Math.random() * 900000);
  return (
    <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 min-h-screen">
      <div className="layout-container flex flex-col min-h-screen">
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full grow">
          <div className="max-w-xl mx-auto bg-white dark:bg-slate-900 rounded-2xl p-10 border border-primary/10 shadow-lg text-center">
            <div className="mx-auto mb-4 size-12 rounded-full bg-primary/10 text-primary flex items-center justify-center">
              <span className="material-symbols-outlined">check_circle</span>
            </div>
            <h1 className="text-3xl font-black tracking-tight">Order Placed</h1>
            <p className="mt-2 text-slate-600 dark:text-slate-400">Thank you for supporting local artisans.</p>
            <p className="mt-4 text-sm text-slate-500">Order ID: <span className="font-bold text-primary">#{orderId}</span></p>
            <div className="mt-8 flex gap-3 justify-center">
              <Link to="/products" className="px-5 py-3 rounded-lg bg-primary text-white font-bold hover:bg-primary/90 transition-colors">Continue Shopping</Link>
              <Link to="/cart" className="px-5 py-3 rounded-lg border border-primary/20 text-primary font-bold hover:bg-primary/10 transition-colors">View Cart</Link>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
