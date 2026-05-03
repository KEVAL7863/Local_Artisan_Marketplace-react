import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

export default function Home() {
  const { addItem: addToCart } = useCart();
  const { user, logout } = useAuth();
  return (
    <div className="bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-slate-100">
      <div className="relative flex h-auto min-h-screen w-full flex-col overflow-x-hidden">
        <div className="layout-container flex h-full grow flex-col">
          <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-primary/10 px-6 py-4 md:px-20 lg:px-40 bg-background-light dark:bg-background-dark sticky top-0 z-50">
            <div className="flex items-center gap-8">
              <div className="flex items-center gap-4">
                <div className="text-primary size-8">
                  <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                    <path clipRule="evenodd" d="M24 4H42V17.3333V30.6667H24V44H6V30.6667V17.3333H24V4Z" fill="currentColor" fillRule="evenodd" />
                  </svg>
                </div>
                <h2 className="text-slate-900 dark:text-slate-100 text-xl font-bold leading-tight tracking-tight">Artisan Market</h2>
              </div>
              <div className="hidden md:flex items-center gap-9">
                <Link className="text-slate-700 dark:text-slate-300 text-sm font-medium hover:text-primary transition-colors" to="/products">Categories</Link>
                <div className="flex items-center gap-1 group cursor-pointer">
                  <span className="material-symbols-outlined text-xl text-slate-700 dark:text-slate-300 group-hover:text-primary">shopping_cart</span>
                  <Link className="text-slate-700 dark:text-slate-300 text-sm font-medium group-hover:text-primary" to="/cart">Cart</Link>
                </div>
              </div>
            </div>
            <div className="flex flex-1 justify-end gap-4 md:gap-8 items-center">
              <label className="hidden lg:flex flex-col min-w-40 !h-10 max-w-64">
                <div className="flex w-full flex-1 items-stretch rounded-lg h-full overflow-hidden">
                  <div className="text-primary/60 flex bg-primary/5 items-center justify-center pl-4 border-r-0">
                    <span className="material-symbols-outlined">search</span>
                  </div>
                  <input className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden text-slate-900 dark:text-slate-100 focus:outline-0 focus:ring-0 border-none bg-primary/5 h-full placeholder:text-primary/40 px-4 pl-2 text-sm font-normal" placeholder="Search crafts..." defaultValue="" />
                </div>
              </label>
              <div className="flex gap-2 items-center">
                {user ? (
                  <>
                    <span className="hidden sm:block text-sm font-medium text-slate-600 dark:text-slate-300">Hi, {user.name?.split(" ")[0]}</span>
                    {user.role === "artist" && (
                      <Link className="hidden sm:flex items-center justify-center rounded-lg h-10 px-4 bg-primary/10 text-primary text-sm font-bold hover:bg-primary/20 transition-all border border-primary/20" to="/artisan">
                        <span className="material-symbols-outlined text-lg mr-1">dashboard</span>
                        My Shop
                      </Link>
                    )}
                    {user.role === "user" && (
                      <Link className="hidden sm:flex items-center justify-center rounded-lg h-10 px-4 bg-primary/10 text-primary text-sm font-bold hover:bg-primary/20 transition-all border border-primary/20" to="/products">
                        <span className="material-symbols-outlined text-lg mr-1">shopping_bag</span>
                        Shop
                      </Link>
                    )}
                    <button onClick={logout} className="flex items-center justify-center rounded-lg h-10 px-4 bg-primary/10 text-primary text-sm font-bold hover:bg-primary/20 transition-all">
                      <span className="material-symbols-outlined text-lg">logout</span>
                    </button>
                  </>
                ) : (
                  <>
                    <Link className="hidden sm:flex min-w-[100px] cursor-pointer items-center justify-center rounded-lg h-10 px-4 bg-primary/10 text-primary text-sm font-bold hover:bg-primary/20 transition-all border border-primary/20" to="/admin">
                      <span>Admin Panel</span>
                    </Link>
                    <Link className="flex min-w-[84px] cursor-pointer items-center justify-center rounded-lg h-10 px-4 bg-primary text-white text-sm font-bold hover:bg-primary/90 transition-all" to="/register">
                      <span>Sign Up</span>
                    </Link>
                    <Link className="hidden sm:flex min-w-[84px] cursor-pointer items-center justify-center rounded-lg h-10 px-4 bg-primary/10 text-primary text-sm font-bold hover:bg-primary/20 transition-all" to="/login">
                      <span>Login</span>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </header>
          <main className="flex flex-col flex-1 px-4 md:px-20 lg:px-40 py-8">
            <section className="w-full mb-12">
              <div className="relative min-h-[520px] flex flex-col items-center justify-center rounded-xl overflow-hidden shadow-2xl">
                <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 hover:scale-105" style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.6) 100%), url("https://lh3.googleusercontent.com/aida-public/AB6AXuDB4d9iV4kzfwXvJbQQKEPdb9hVqI7BOfUO_EGNnFRuZp47iMmI5mL0pBdMrHEWOE2iQNrksxTUfUcIWEaVufOAXlpz60XY49Efy58Ex7dcQcKd0MPXFBPw2wUaqn0hkU0N-eg4NfyerKLwIWNOaVXD3eXWbj-2SweTuXudnpWcOsTNBgXfzRCij0QXJ0Q5nBFMzwtYEjxSPVLMGmf1CnDLt4wjpedj79bbWzgANr05COkGv9oyvppWH8b9d1OxRk6OsRVjB8qln0A")` }} />
                <div className="relative z-10 flex flex-col gap-6 text-center max-w-2xl px-6">
                  <h1 className="text-white text-5xl md:text-6xl font-black leading-tight tracking-tight">Handcrafted with Passion</h1>
                  <p className="text-white/90 text-lg md:text-xl font-medium leading-relaxed">Discover unique treasures from local artisans in your community. Every piece tells a story.</p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center items-stretch mt-4">
                    <div className="relative flex-1 max-w-md">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <span className="material-symbols-outlined text-slate-400">search</span>
                      </div>
                      <input className="block w-full pl-10 pr-3 py-4 border-none rounded-lg text-slate-900 bg-white shadow-lg focus:ring-2 focus:ring-primary text-base" placeholder="What are you looking for today?" type="text" />
                    </div>
                    <Link className="flex items-center justify-center rounded-lg h-14 px-8 bg-primary text-white text-lg font-bold shadow-lg hover:bg-primary/90 transition-all transform hover:-translate-y-1" to="/products">
                      Shop Now
                    </Link>
                  </div>
                </div>
              </div>
            </section>
            <section className="mb-16">
              <div className="flex justify-between items-end mb-8">
                <div>
                  <h2 className="text-slate-900 dark:text-slate-100 text-3xl font-bold tracking-tight">Featured Artisans</h2>
                  <p className="text-slate-500 dark:text-slate-400 mt-2">Meet the hands behind your favorite pieces.</p>
                </div>
                <Link className="text-primary font-bold flex items-center gap-1 hover:underline" to="/artisans">
                  View All <span className="material-symbols-outlined">chevron_right</span>
                </Link>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8">
                <div className="flex flex-col items-center gap-3 group cursor-pointer">
                  <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-white dark:border-slate-800 shadow-lg group-hover:border-primary transition-all">
                    <img alt="Artisan Portrait" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDnWIeNh2y2x6DILcW_B63S1HKp9zNlSEfikn3LYbD_khejYdpbz1bzqU1IK12ht2j4h8Sg5DdpjGikRLa-8wOvbEtPAApT0ilgVSIe-bnjuFdjbedxJu7BORjFjI-Nl7S2Q0ehNG-dPrsuoNOWsQH9RlpJYbuPZk6zhvus2N20yANC6jyrwHbgDqtTQPHCzk-DPAzBLdEA2V9yMXaH5HZQHSdDGO-QYzMWgtMmrOaaRzp0W290plrbKVz6Pc5GJpOIG7IwRvVy2KY" />
                  </div>
                  <div className="text-center">
                    <p className="text-slate-900 dark:text-slate-100 font-bold text-lg">Parth</p>
                    <p className="text-primary text-sm font-medium italic">Master Potter</p>
                  </div>
                </div>
                <div className="flex flex-col items-center gap-3 group cursor-pointer">
                  <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-white dark:border-slate-800 shadow-lg group-hover:border-primary transition-all">
                    <img alt="Artisan Portrait" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB0lYvfGlS1SWWMXe4b2LjNqFYyJkBN92aLfA_XJ5ujFPX4mWNF1q0qfaPMDYsesYryYq91PHl8_myaqjHHPmVY9_LDuzj8US1C_Xlsr0U3IHm-6IDqmgvFhGm_MC_zXKwhHaleNRAex57iqgmh1oKrzwF3uEXaAc_NmPNcONCZB7yIc3K9STMbHX3bEndO1d5tpRO4RbsuJwIXJbuUvpYpFENjnqEyhIlcJP7Xo5OaetxYgFLgUDBCuSTXnb9U5H-khC8t76OUfU4" />
                  </div>
                  <div className="text-center">
                    <p className="text-slate-900 dark:text-slate-100 font-bold text-lg">Raj</p>
                    <p className="text-primary text-sm font-medium italic">Wood Sculptor</p>
                  </div>
                </div>
                <div className="flex flex-col items-center gap-3 group cursor-pointer">
                  <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-white dark:border-slate-800 shadow-lg group-hover:border-primary transition-all">
                    <img alt="Artisan Portrait" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBkuo2nTRAeLtbItJm2a7ahT8qRezwFjusibU19Z-JHMlh_9AGkUOonjLRNzOEvKzLSDpnDVGT48uRm_Q6vCnWIhM0VM-1St778bcyvrtUskrvrW8s42JmXozHS78cI1I-cgy0-pWSC1K4DpkZK0k9kQsPyuGMjU4G9iHttbKUzuho9XVpC1O8tHMtML_NQ6t27o2I_9PKPDPtvcOtLAknJjB-84QXsidaOpk5QnGKZfXeodxIt1Ek-rAdTfojA8As-iHi4H-Qbv7c" />
                  </div>
                  <div className="text-center">
                    <p className="text-slate-900 dark:text-slate-100 font-bold text-lg">Keval</p>
                    <p className="text-primary text-sm font-medium italic">Silversmith</p>
                  </div>
                </div>
                <div className="flex flex-col items-center gap-3 group cursor-pointer">
                  <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-white dark:border-slate-800 shadow-lg group-hover:border-primary transition-all">
                    <img alt="Artisan Portrait" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBtP6CScouM5TFBq-RmDs7UI3-tjCIbK-2-reYbMnHG_uDI-bSUI_1jxwgm_EBgPEaV-k6ClJ3MCiSvIHBUo-ITjl5BfvZ3i3HJU5Ir3cadjwALFh6XCpHriHwJJlcSX9ZIrbLeAVdPezEiv7UVA0LOVbk9Zfsod7yh2wJ15JDE0avILKQtmFPwL-o2yCj_OrYA-jY7_4RARUYRzhWRBcRcgLnEetrNLyRT-G2bpObxYBSQWbjuCUf49HjRaXkjMfb9BbVVa1N_BGI" />
                  </div>
                  <div className="text-center">
                    <p className="text-slate-900 dark:text-slate-100 font-bold text-lg">Hardik</p>
                    <p className="text-primary text-sm font-medium italic">Leather Craftsman</p>
                  </div>
                </div>
                <div className="flex flex-col items-center gap-3 group cursor-pointer">
                  <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-white dark:border-slate-800 shadow-lg group-hover:border-primary transition-all">
                    <img alt="Artisan Portrait" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA7wjeefORozMN3d4kHJBNiJekK9rsR_3Wv6k-L_ibydJ6lOok-DOIUc_klKo_XPU-ua7rPUkxRmZQX0ctJ9WH5uGmNe7uf3EnExamFMSX9HgKrX5fqtcbghDIgFJaEt1hLvhzfBLyZLPRum12C7rpM1Ji5Ulpgaaj0f_yU0sRkK62reWmBkcLlruELj7I4963JzJeigZT42eU7SODj9R8F5MDYSSh7Lcx0WTb0iOpxijzvJ6p4o-dFXoYT6aINY8zXfa3KjkEmzng" />
                  </div>
                  <div className="text-center">
                    <p className="text-slate-900 dark:text-slate-100 font-bold text-lg">Meet</p>
                    <p className="text-primary text-sm font-medium italic">Textile Weaver</p>
                  </div>
                </div>
              </div>
            </section>
            <section className="mb-16">
              <div className="flex justify-between items-end mb-8">
                <div>
                  <h2 className="text-slate-900 dark:text-slate-100 text-3xl font-bold tracking-tight">Trending Products</h2>
                  <p className="text-slate-500 dark:text-slate-400 mt-2">The most loved items this week.</p>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {[
                  { id: "p1", title: "Spotted Earth Bowl", brand: "Parth", price: 399, img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBHjoCRQb8WVNAhuYRWmU-FLZDhzPPVGfWvxShwfO6kJAoXX2jwegmOo0AGabWI82B5MnojQHY1n8gJDEGejP8E8gWSsdR48krUYDZbH8lBd3YDXrhUK6LZXT0LBJgL16fJ6LykMtfdipSa-s9lUKK-lc_9GJjLidffJbxL3bk6tyoMoPxT8bD_CGF_QtLBnF7TJQjNPlXsdwot3QtoZXmQzlHqE-I3k_6ZP9ZugqemuUnePqCPzD8MSo94OPEHYHnOtawNl2kh5Uo" },
                  { id: "p2", title: "Moonstone Silver Ring", brand: "Keval", price: 899, img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBPiX_uSulpoFIVH6z7PPdiXxRrLEQlphDe3BfGMW6R7og4BZbH3zTpWt27ohdiLNUexvVe15uzhpbfy2KsohA21OKJ6uTj60Tw6QHmNLcBLK2fYMr-cqNxyNx37B7ZZZ6y7Wei35o_myVIxd7hoHekDVCIA75xweoRtucBMNw03ug0SazpvsKz4uyu06XI80-NgkZdvQljhYNuGOKktYIny5CeWMaLemX6Vts5i3L4rqLP7S32lEJmJtNtk5XEuxpOKYcgPlP6ga8" },
                  { id: "p3", title: "Artisan Messenger Bag", brand: "Hardik", price: 1999, img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBnoztqAG2S3K3P3sNAbIS6tPxxQb7kTf9gRxYw3_WjxpVJX6dgLHp7jMuNE3wkOGjvKyRMavvRJA5PSId20ms_QtkCYAArGWeWbq2BFbsP1fX9u-EEO7cIDA6xoW1ow7DvpHXH5Se7C5jszOZMeBtvXkWb4xGysbh2XdbYrvdXiA9v4eVMx71L7f1uVxayodfwAH7jTSS2aJDkg9hVvsYEIpqRNeuZCUXmoO15vp04IYudOg-iWLBYg3jIVZql6KVCgBHTiQ6gMpE" },
                  { id: "p4", title: "Geometric Throw Blanket", brand: "Meet", price: 1299, img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBUEjNRicLLZ1jaBcDyECKTwwLqlOWVO4iEpYV0LZ0n2Z2A0EFR4wQI6OKjEWzJEKeg_YJIToJwkDlrn2b2ksxo3onVtYMRdTMRJnTcYRMDbtJvM9Ky9aQUVAQ5J40F4avzD72QCf3Q2eXvxo8OmDuEDl5Q86gPEuHRRRCSIl10cRvRgNTPlW5sMcENi0El_CqXE2Ilv93YdHl95sVl_3IRhu1yVcRO8xuD8tzVTsvS7Ger2xn9IKaz2_sg4YYrWjuDu13rbHHe0r8" }
                ].map((p) => (
                  <div className="group" key={p.id}>
                    <div className="relative aspect-[4/5] rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-800 mb-4">
                      <img alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src={p.img} />
                    </div>
                    <div className="flex flex-col gap-1">
                      <p className="text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-widest">{p.brand}</p>
                      <h3 className="text-slate-900 dark:text-slate-100 font-bold text-lg group-hover:text-primary transition-colors">{p.title}</h3>
                      <p className="text-primary font-black text-xl">&#8377;{p.price}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
            <section className="mb-16 bg-primary/10 rounded-2xl p-8 md:p-12">
              <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="max-w-md">
                  <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-4">Join the Artisan Community</h2>
                  <p className="text-slate-600 dark:text-slate-400">Get early access to limited edition drops and stories from our local makers delivered to your inbox.</p>
                </div>
                <div className="flex w-full md:w-auto gap-2">
                  <input className="flex-1 md:min-w-[300px] rounded-lg border-primary/20 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-primary h-12 px-4" placeholder="Your email address" type="email" />
                  <button onClick={() => console.log('Subscribed!')} className="bg-primary text-white font-bold px-6 py-3 rounded-lg hover:bg-primary/90 transition-all">Subscribe</button>
                </div>
              </div>
            </section>
          </main>
          <footer className="mt-24 border-t border-primary/10 bg-white dark:bg-background-dark py-12">
            <div className="mx-auto max-w-7xl px-6 md:px-20 lg:px-40">
              <div className="grid grid-cols-1 gap-12 lg:grid-cols-4">
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-primary">
                    <span className="material-symbols-outlined">storefront</span>
                    <span className="text-lg font-bold">Artisan Market</span>
                  </div>
                  <p className="text-sm text-slate-500 leading-relaxed">Supporting independent makers and preserving traditional crafts since 2018. Every purchase makes a difference in an artisan's life.</p>
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-slate-100">Marketplace</h4>
                  <ul className="mt-4 space-y-2 text-sm text-slate-500">
                    <li><Link className="hover:text-primary transition-colors" to="/">Browse All</Link></li>
                    <li><Link className="hover:text-primary transition-colors" to="/">New Arrivals</Link></li>
                    <li><Link className="hover:text-primary transition-colors" to="/">Featured Artisans</Link></li>
                    <li><Link className="hover:text-primary transition-colors" to="/">Gift Cards</Link></li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-slate-100">Support</h4>
                  <ul className="mt-4 space-y-2 text-sm text-slate-500">
                    <li><Link className="hover:text-primary transition-colors" to="/">Shipping Info</Link></li>
                    <li><Link className="hover:text-primary transition-colors" to="/">Returns &amp; Exchanges</Link></li>
                    <li><Link className="hover:text-primary transition-colors" to="/">Contact Us</Link></li>
                    <li><Link className="hover:text-primary transition-colors" to="/">FAQs</Link></li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-slate-100">Join Our Journey</h4>
                  <p className="mt-4 text-sm text-slate-500">Get the latest stories from our artisans directly in your inbox.</p>
                  <div className="mt-4 flex gap-2">
                    <input className="w-full rounded-lg border-primary/10 bg-primary/5 p-2 text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none" placeholder="Email address" type="email" />
                    <button onClick={() => console.log('Joined!')} className="rounded-lg bg-primary px-4 py-2 text-sm font-bold text-white hover:bg-primary/90 transition-colors">Join</button>
                  </div>
                </div>
              </div>
              <div className="mt-12 border-t border-primary/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                <p className="text-xs text-slate-400">&copy; 2024 Local Artisan Marketplace. All rights reserved.</p>
                <div className="flex gap-6 text-xs text-slate-400">
                  <Link className="hover:text-primary transition-colors" to="/">Privacy Policy</Link>
                  <Link className="hover:text-primary transition-colors" to="/">Terms of Service</Link>
                  <Link className="hover:text-primary transition-colors" to="/">Cookie Settings</Link>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
}
