import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const artisans = [
  {
    id: "art-1",
    name: "Elena Ceramics",
    specialty: "Master Potter",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDnWIeNh2y2x6DILcW_B63S1HKp9zNlSEfikn3LYbD_khejYdpbz1bzqU1IK12ht2j4h8Sg5DdpjGikRLa-8wOvbEtPAApT0ilgVSIe-bnjuFdjbedxJu7BORjFjI-Nl7S2Q0ehNG-dPrsuoNOWsQH9RlpJYbuPZk6zhvus2N20yANC6jyrwHbgDqtTQPHCzk-DPAzBLdEA2V9yMXaH5HZQHSdDGO-QYzMWgtMmrOaaRzp0W290plrbKVz6Pc5GJpOIG7IwRvVy2KY",
  },
  {
    id: "art-2",
    name: "Oak & Iron",
    specialty: "Wood Sculptor",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuB0lYvfGlS1SWWMXe4b2LjNqFYyJkBN92aLfA_XJ5ujFPX4mWNF1q0qfaPMDYsesYryYq91PHl8_myaqjHHPmVY9_LDuzj8US1C_Xlsr0U3IHm-6IDqmgvFhGm_MC_zXKwhHaleNRAex57iqgmh1oKrzwF3uEXaAc_NmPNcONCZB7yIc3K9STMbHX3bEndO1d5tpRO4RbsuJwIXJbuUvpYpFENjnqEyhIlcJP7Xo5OaetxYgFLgUDBCuSTXnb9U5H-khC8t76OUfU4",
  },
  {
    id: "art-3",
    name: "Luna Silver",
    specialty: "Silversmith",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBkuo2nTRAeLtbItJm2a7ahT8qRezwFjusibU19Z-JHMlh_9AGkUOonjLRNzOEvKzLSDpnDVGT48uRm_Q6vCnWIhM0VM-1St778bcyvrtUskrvrW8s42JmXozHS78cI1I-cgy0-pWSC1K4DpkZK0k9kQsPyuGMjU4G9iHttbKUzuho9XVpC1O8tHMtML_NQ6t27o2I_9PKPDPtvcOtLAknJjB-84QXsidaOpk5QnGKZfXeodxIt1Ek-rAdTfojA8As-iHi4H-Qbv7c",
  },
  {
    id: "art-4",
    name: "Saddle Co.",
    specialty: "Leather Craftsman",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBtP6CScouM5TFBq-RmDs7UI3-tjCIbK-2-reYbMnHG_uDI-bSUI_1jxwgm_EBgPEaV-k6ClJ3MCiSvIHBUo-ITjl5BfvZ3i3HJU5Ir3cadjwALFh6XCpHriHwJJlcSX9ZIrbLeAVdPezEiv7UVA0LOVbk9Zfsod7yh2wJ15JDE0avILKQtmFPwL-o2yCj_OrYA-jY7_4RARUYRzhWRBcRcgLnEetrNLyRT-G2bpObxYBSQWbjuCUf49HjRaXkjMfb9BbVVa1N_BGI",
  },
  {
    id: "art-5",
    name: "Woven Dreams",
    specialty: "Textile Weaver",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuA7wjeefORozMN3d4kHJBNiJekK9rsR_3Wv6k-L_ibydJ6lOok-DOIUc_klKo_XPU-ua7rPUkxRmZQX0ctJ9WH5uGmNe7uf3EnExamFMSX9HgKrX5fqtcbghDIgFJaEt1hLvhzfBLyZLPRum12C7rpM1Ji5Ulpgaaj0f_yU0sRkK62reWmBkcLlruELj7I4963JzJeigZT42eU7SODj9R8F5MDYSSh7Lcx0WTb0iOpxijzvJ6p4o-dFXoYT6aINY8zXfa3KjkEmzng",
  },
];

export default function Artisans() {
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
                    <path d="M24 4H42V17.3333V30.6667H24V44H6V30.6667V17.3333H24V4Z" fill="currentColor" />
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
                        My Shop
                      </Link>
                    )}
                    <button onClick={logout} className="flex items-center justify-center rounded-lg h-10 px-4 bg-primary/10 text-primary text-sm font-bold hover:bg-primary/20 transition-all">
                      <span className="material-symbols-outlined text-lg">logout</span>
                    </button>
                  </>
                ) : (
                  <>
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
            <div className="flex justify-between items-end mb-8">
              <div>
                <h2 className="text-slate-900 dark:text-slate-100 text-3xl font-bold tracking-tight">All Artisans</h2>
                <p className="text-slate-500 dark:text-slate-400 mt-2">Meet the hands behind your favorite pieces.</p>
              </div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8">
              {artisans.map((artisan) => (
                <div key={artisan.id} className="flex flex-col items-center gap-3 group cursor-pointer">
                  <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-white dark:border-slate-800 shadow-lg group-hover:border-primary transition-all">
                    <img alt="Artisan Portrait" className="w-full h-full object-cover" src={artisan.img} />
                  </div>
                  <div className="text-center">
                    <p className="font-bold text-lg">{artisan.name}</p>
                    <p className="text-primary text-sm font-medium italic">{artisan.specialty}</p>
                  </div>
                </div>
              ))}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
