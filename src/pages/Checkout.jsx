import { useState } from "react";
import { useCart } from "../context/CartContext.jsx";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../utils/api";
export default function Checkout() {

  const { items, totals, clear } = useCart();
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState("card");
  return (
    <div className="bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-slate-100 min-h-screen">
      <div className="relative flex h-auto min-h-screen w-full flex-col overflow-x-hidden">
        <div className="layout-container flex h-full grow flex-col">
          <header className="flex items-center justify-between border-b border-primary/10 bg-background-light dark:bg-background-dark px-6 md:px-20 py-4 sticky top-0 z-50">
            <div className="flex items-center gap-3">
              <div className="size-8 text-primary">
                <span className="material-symbols-outlined text-3xl">storefront</span>
              </div>
              <h2 className="text-primary text-xl font-bold leading-tight tracking-tight">Local Artisan Marketplace</h2>
            </div>
            <div className="flex flex-1 justify-end gap-8 items-center">
              <div className="bg-primary/10 rounded-full p-2 flex items-center justify-center">
                <span className="material-symbols-outlined text-primary">person</span>
              </div>
            </div>
          </header>
          <main className="flex-1 flex justify-center py-8 px-4 md:px-20">
            <div className="max-w-6xl w-full flex flex-col lg:flex-row gap-12">
              <div className="flex-1 flex flex-col gap-8">
                <div className="flex flex-wrap items-center gap-2 text-sm font-medium">
                  <Link className="text-primary/60 hover:text-primary" to="/cart">Cart</Link>
                  <span className="material-symbols-outlined text-xs text-primary/40">chevron_right</span>
                  <span className="text-primary">Shipping &amp; Payment</span>
                  <span className="material-symbols-outlined text-xs text-primary/40">chevron_right</span>
                  <span className="text-slate-400">Review</span>
                </div>
                <div>
                  <h1 className="text-3xl font-bold tracking-tight mb-2">Checkout</h1>
                  <p className="text-slate-500 dark:text-slate-400">Step 1 of 2: Shipping &amp; Payment</p>
                </div>
                <section className="bg-white dark:bg-white/5 p-6 rounded-xl border border-primary/10 shadow-sm">
                  <div className="flex items-center gap-2 mb-6">
                    <span className="material-symbols-outlined text-primary">local_shipping</span>
                    <h2 className="text-xl font-bold">Shipping Information</h2>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <label className="flex flex-col gap-1.5">
                      <span className="text-sm font-semibold">First Name</span>
                      <input className="rounded-lg border-primary/20 bg-background-light dark:bg-white/5 focus:ring-primary focus:border-primary h-12 px-4" placeholder="First Name" type="text" />
                    </label>
                    <label className="flex flex-col gap-1.5">
                      <span className="text-sm font-semibold">Last Name</span>
                      <input className="rounded-lg border-primary/20 bg-background-light dark:bg-white/5 focus:ring-primary focus:border-primary h-12 px-4" placeholder="Last Name" type="text" />
                    </label>
                    <label className="flex flex-col gap-1.5 md:col-span-2">
                      <span className="text-sm font-semibold">Address</span>
                      <input className="rounded-lg border-primary/20 bg-background-light dark:bg-white/5 focus:ring-primary focus:border-primary h-12 px-4" placeholder="Street Address" type="text" />
                    </label>
                    <label className="flex flex-col gap-1.5">
                      <span className="text-sm font-semibold">City</span>
                      <input className="rounded-lg border-primary/20 bg-background-light dark:bg-white/5 focus:ring-primary focus:border-primary h-12 px-4" placeholder="City" type="text" />
                    </label>
                    <div className="grid grid-cols-2 gap-4">
                      <label className="flex flex-col gap-1.5">
                        <span className="text-sm font-semibold">State</span>
                        <input className="rounded-lg border-primary/20 bg-background-light dark:bg-white/5 focus:ring-primary focus:border-primary h-12 px-4" placeholder="State" type="text" />
                      </label>
                      <label className="flex flex-col gap-1.5">
                        <span className="text-sm font-semibold">ZIP</span>
                        <input className="rounded-lg border-primary/20 bg-background-light dark:bg-white/5 focus:ring-primary focus:border-primary h-12 px-4" placeholder="ZIP Code" type="text" />
                      </label>
                    </div>
                  </div>
                </section>
                <section className="bg-white dark:bg-white/5 p-6 rounded-xl border border-primary/10 shadow-sm">
                  <div className="flex items-center gap-2 mb-6">
                    <span className="material-symbols-outlined text-primary">payments</span>
                    <h2 className="text-xl font-bold">Payment Method</h2>
                  </div>
                  <div className="flex flex-col gap-4">
                    <div className="flex gap-4 mb-4">
                      <label className="flex-1 cursor-pointer group">
                        <input checked={paymentMethod === "card"} onChange={() => setPaymentMethod("card")} className="hidden peer" name="payment" type="radio" />
                        <div className="flex flex-col items-center justify-center p-4 rounded-lg border-2 border-primary/10 peer-checked:border-primary peer-checked:bg-primary/5 transition-all">
                          <span className="material-symbols-outlined text-3xl mb-1">credit_card</span>
                          <span className="text-xs font-bold">Credit Card</span>
                        </div>
                      </label>
                      <label className="flex-1 cursor-pointer group">
                        <input checked={paymentMethod === "paypal"} onChange={() => setPaymentMethod("paypal")} className="hidden peer" name="payment" type="radio" />
                        <div className="flex flex-col items-center justify-center p-4 rounded-lg border-2 border-primary/10 peer-checked:border-primary peer-checked:bg-primary/5 transition-all">
                          <span className="material-symbols-outlined text-3xl mb-1">account_balance_wallet</span>
                          <span className="text-xs font-bold">PayPal</span>
                        </div>
                      </label>
                    </div>
                    {paymentMethod === "card" && (
                      <>
                        <label className="flex flex-col gap-1.5">
                          <span className="text-sm font-semibold">Card Number</span>
                          <div className="relative">
                            <input className="w-full rounded-lg border-primary/20 bg-background-light dark:bg-white/5 focus:ring-primary focus:border-primary h-12 px-4 pl-12" placeholder="Card Number" type="text" />
                            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">credit_card</span>
                          </div>
                        </label>
                        <div className="grid grid-cols-2 gap-4">
                          <label className="flex flex-col gap-1.5">
                            <span className="text-sm font-semibold">Expiry Date</span>
                            <input className="rounded-lg border-primary/20 bg-background-light dark:bg-white/5 focus:ring-primary focus:border-primary h-12 px-4" placeholder="Expiry" type="text" />
                          </label>
                          <label className="flex flex-col gap-1.5">
                            <span className="text-sm font-semibold">CVC</span>
                            <input className="rounded-lg border-primary/20 bg-background-light dark:bg-white/5 focus:ring-primary focus:border-primary h-12 px-4" placeholder="CVC" type="text" />
                          </label>
                        </div>
                      </>
                    )}
                    {paymentMethod === "paypal" && (
                      <div className="flex flex-col items-center gap-4 py-6 px-4 bg-primary/5 rounded-xl border border-primary/10">
                        <div className="flex items-center gap-2">
                          <span className="material-symbols-outlined text-4xl text-primary">account_balance_wallet</span>
                          <span className="text-2xl font-black tracking-tight text-primary">PayPal</span>
                        </div>
                        <p className="text-sm text-slate-500 dark:text-slate-400 text-center">You will be redirected to PayPal to complete your payment of <strong className="text-primary">&#8377;{totals.total.toFixed(2)}</strong> securely.</p>
                        <div className="flex items-center gap-2 text-xs text-slate-400">
                          <span className="material-symbols-outlined text-sm">lock</span>
                          <span>Secure PayPal checkout</span>
                        </div>
                      </div>
                    )}
                  </div>
                </section>
              </div>
              <aside className="w-full lg:w-[380px] flex flex-col gap-6">
                <div className="bg-white dark:bg-white/5 p-6 rounded-xl border border-primary/10 shadow-sm sticky top-28">
                  <h2 className="text-xl font-bold mb-6">Order Summary</h2>
                  <div className="flex flex-col gap-4 mb-6">
                    {items.map((it) => (
                      <div key={it.id} className="flex gap-4">
                        <div className="w-16 h-16 bg-slate-200 dark:bg-slate-700 rounded-lg overflow-hidden shrink-0">
                          <img alt={it.title} className="w-full h-full object-cover" src={it.img} />
                        </div>
                        <div className="flex-1 flex flex-col justify-center">
                          <p className="text-sm font-bold truncate">{it.title}</p>
                          <p className="text-xs text-slate-500">Qty: {it.qty}</p>
                          <p className="text-sm font-semibold mt-1">&#8377;{(it.price * it.qty).toFixed(2)}</p>
                        </div>
                      </div>
                    ))}
                    {!items.length && <p className="text-sm text-slate-500">No items in cart.</p>}
                  </div>
                  <hr className="border-primary/10 mb-6" />
                  <div className="flex flex-col gap-3 mb-8">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-500">Subtotal</span>
                      <span className="font-medium">&#8377;{totals.subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-500">Shipping</span>
                      <span className="font-medium">&#8377;{totals.shipping.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-500">Tax</span>
                      <span className="font-medium">&#8377;{totals.tax.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-lg font-bold mt-2 pt-4 border-t border-primary/10">
                      <span>Total</span>
                      <span className="text-primary">&#8377;{totals.total.toFixed(2)}</span>
                    </div>
                  </div>
                  <button
                    disabled={!items.length}
                    onClick={async () => {
                      try {
                        await api.post("/orders", {
                          amount: totals.total,
                          items: items.map(it => ({ product_id: it.id, name: it.title, qty: it.qty, price: it.price })),
                        });
                        clear();
                        navigate("/order-success");
                      } catch (err) {
                        alert(err.message || "Order failed");
                      }
                    }}
                    className={`w-full ${items.length ? 'bg-primary hover:bg-primary/90' : 'bg-primary/40 cursor-not-allowed'} text-white font-bold py-4 rounded-xl shadow-lg shadow-primary/20 transition-all flex items-center justify-center gap-2`}
                  >
                    <span>Place Order</span>
                    <span className="material-symbols-outlined">lock</span>
                  </button>
                  <p className="text-[10px] text-center text-slate-400 mt-4 leading-relaxed">
                    By placing your order, you agree to our Terms of Service and Privacy Policy. All items are handmade by local artisans.
                  </p>
                </div>
                <div className="bg-primary/5 p-4 rounded-lg flex gap-3 items-center">
                  <span className="material-symbols-outlined text-primary">verified_user</span>
                  <div>
                    <p className="text-xs font-bold">Safe &amp; Secure</p>
                    <p className="text-[10px] text-slate-600 dark:text-slate-400">SSL Encrypted Payment Processing</p>
                  </div>
                </div>
              </aside>
            </div>
          </main>
          <footer className="mt-auto py-10 border-t border-primary/10 text-center">
            <p className="text-sm text-slate-500">&copy; 2024 Local Artisan Marketplace. Support your local makers.</p>
          </footer>
        </div>
      </div>
    </div>
  );
}
