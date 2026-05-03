# Local Artisan Marketplace — Complete Project Detail

● Collector Panel — Detailed Explanation

  This is a Local Artisan Marketplace React app with three roles: Collector (buyer), Artisan (seller), and Admin. Here's everything about the  
  Collector Panel:

  ---
  What is a "Collector"?

  A Collector is the customer/buyer in this marketplace. The term "Collector" emphasizes that buyers are collecting handmade artisan pieces.   
  Internally, the role is stored as role: "user".

  Default test account: collector@artisan.com / collector123

  ---
  Key Point: No Dedicated Dashboard

  Unlike Artisans (/artisan) and Admins (/admin), Collectors do NOT have a separate dashboard panel. They use the public-facing marketplace    
  pages as their interface.

  ---
  Pages & Features Available to Collectors

  ┌────────────────┬───────────────┬──────────────────────────────────────────────────────────────────────────────────────────────────────┐    
  │     Route      │     Page      │                                             What It Does                                             │    
  ├────────────────┼───────────────┼──────────────────────────────────────────────────────────────────────────────────────────────────────┤    
  │ /              │ Home          │ Landing page with hero banner, featured artisans, trending products                                  │    
  ├────────────────┼───────────────┼──────────────────────────────────────────────────────────────────────────────────────────────────────┤    
  │ /products      │ Products      │ Browse catalog with filters (Ceramics, Jewelry, Woodwork, Textiles, Home Decor), sorting, pagination │    
  ├────────────────┼───────────────┼──────────────────────────────────────────────────────────────────────────────────────────────────────┤    
  │ /artisans      │ Artisans      │ Directory of all artisan profiles                                                                    │    
  ├────────────────┼───────────────┼──────────────────────────────────────────────────────────────────────────────────────────────────────┤    
  │ /cart          │ Cart          │ View items, adjust quantities, see subtotal/shipping/tax/total                                       │    
  ├────────────────┼───────────────┼──────────────────────────────────────────────────────────────────────────────────────────────────────┤    
  │ /checkout      │ Checkout      │ Fill shipping details, choose payment (Credit Card/PayPal), place order                              │    
  ├────────────────┼───────────────┼──────────────────────────────────────────────────────────────────────────────────────────────────────┤    
  │ /order-success │ Order Success │ Confirmation page with order ID                                                                      │    
  ├────────────────┼───────────────┼──────────────────────────────────────────────────────────────────────────────────────────────────────┤    
  │ /register      │ Register      │ Sign up with "Collector" or "Artisan" role selection                                                 │    
  ├────────────────┼───────────────┼──────────────────────────────────────────────────────────────────────────────────────────────────────┤    
  │ /login         │ Login         │ Login with role-based redirect (collectors → home page)                                              │    
  └────────────────┴───────────────┴──────────────────────────────────────────────────────────────────────────────────────────────────────┘    

  ---
  Collector Shopping Flow

  1. Browse → Products page with 6 category filters and sorting options
  2. Wishlist → Heart icon to save favorite products
  3. Add to Cart → Add products with quantity selection
  4. Cart → Review items, adjust quantities, see order summary (subtotal + shipping ₹12.50, free above ₹150 + 8% tax)
  5. Checkout → Enter shipping address + payment method
  6. Order Placed → Order saved to localStorage, stock decremented, cart cleared
  7. Confirmation → Order success page with random order ID

  ---
  State Management (Contexts Used by Collectors)

  - AuthContext — Login, logout, register, profile management
  - CartContext — Cart items, add/remove/update quantities, auto-calculated totals
  - WishlistContext — Save/remove favorite products

  ---
  What Collectors CANNOT Do

  - Sell products or upload inventory
  - Access the Artisan Dashboard (/artisan/*)
  - Access the Admin Dashboard (/admin/*)
  - View order history after placing (no order tracking page exists)
  - Receive notifications (notifications are for admin/artisans only)

  ---
  How Role Detection Works

  - Registration: Radio button toggle — "Collector" saves role: "user", "Artisan" saves role: "artist"
  - Login redirect: user → / (home), artist → /artisan, admin → /admin
  - All data is stored in localStorage — there is no backend server

  ---
  In summary, the "Collector Panel" is the main marketplace shopping interface itself — Home, Products, Cart, Checkout, and Order Success      
  pages. It's designed for a simple buying experience without a dedicated management dashboard.


Yeh ek **Local Artisan Marketplace** hai jo **React.js** me bana hai. Isme customers handmade products kharid sakte hain, artisans apne products bech sakte hain, aur admin poora platform manage kar sakta hai.

---

## Project Structure (Folder Tree)

```
artisan-react/
├── index.html              ← Entry HTML file (Tailwind CDN + Google Fonts load hota hai)
├── package.json            ← Dependencies & scripts
├── vite.config.js          ← Vite bundler config
├── public/                 ← Static assets
├── dist/                   ← Production build output
├── src/
│   ├── main.jsx            ← React app ka entry point (BrowserRouter wrap)
│   ├── App.jsx             ← All Routes + Context Providers define
│   ├── context/            ← Global State Management (4 Context files)
│   │   ├── AuthContext.jsx
│   │   ├── CartContext.jsx
│   │   ├── WishlistContext.jsx
│   │   └── NotificationContext.jsx
│   ├── components/         ← Reusable UI Components (3 files)
│   │   ├── AdminSidebar.jsx
│   │   ├── ArtisanSidebar.jsx
│   │   └── NotificationBell.jsx
│   └── pages/              ← All Pages (18 pages)
│       ├── Home.jsx
│       ├── Products.jsx
│       ├── Cart.jsx
│       ├── Checkout.jsx
│       ├── OrderSuccess.jsx
│       ├── Login.jsx
│       ├── Register.jsx
│       ├── Artisans.jsx
│       ├── ArtisanDashboard.jsx
│       ├── artisan/
│       │   ├── ArtisanAddProduct.jsx
│       │   ├── ArtisanMyProducts.jsx
│       │   ├── ArtisanProfile.jsx
│       │   └── ArtisanOrders.jsx
│       └── admin/
│           ├── AdminDashboard.jsx
│           ├── AdminUsers.jsx
│           ├── AdminArtisanApprovals.jsx
│           ├── AdminOrders.jsx
│           ├── AdminReports.jsx
│           └── AdminSettings.jsx
```

---

## Technologies / Libraries Used

| Technology | Purpose |
|---|---|
| **React 18** | UI library (components, hooks, JSX) |
| **React Router DOM v6** | Page routing (`<Routes>`, `<Route>`, `useNavigate`) |
| **Vite** | Dev server & build tool (fast HMR) |
| **Tailwind CSS (CDN)** | Styling — utility-first CSS framework |
| **Google Material Symbols** | Icons (search, cart, delete, etc.) |
| **Google Fonts (Work Sans)** | Custom font family |
| **localStorage** | Data persistence (users, products, orders, settings) |
| **React Context API** | Global state management (Auth, Cart, Wishlist, Notifications) |

> **Note:** Koi backend/database nahi hai — saara data **localStorage** me store hota hai.

---

## 3 User Roles & Default Accounts

| Role | Email | Password |
|---|---|---|
| **Customer** | collector@artisan.com | collector123 |
| **Artisan** (Seller) | artisan@artisan.com | artisan123 |
| **Admin** | admin@artisan.com | admin123 |

Login ke baad role ke hisaab se redirect hota hai:
- `user` → `/` (Home)
- `artist` → `/artisan` (Artisan Dashboard)
- `admin` → `/admin` (Admin Dashboard)

---

## All Routes (18 Pages)

### Customer Pages (Public)

| Route | Page | Kya karta hai |
|---|---|---|
| `/` | **Home** | Landing page — hero banner, featured artisans, trending products, newsletter |
| `/products` | **Products** | Product catalog — category filter, sort, pagination, add to cart/wishlist |
| `/artisans` | **Artisans** | Sabhi artisans ki list with profile cards |
| `/cart` | **Cart** | Shopping cart — qty update, remove items, order summary |
| `/checkout` | **Checkout** | Shipping form + payment (Credit Card / PayPal) |
| `/order-success` | **OrderSuccess** | Order confirmation with order ID |
| `/login` | **Login** | Email/password login form |
| `/register` | **Register** | Registration — role choose (Collector/Artisan), conditional fields |

### Artisan Pages (Seller Dashboard)

| Route | Page | Kya karta hai |
|---|---|---|
| `/artisan` | **ArtisanDashboard** | Stats overview — earnings, products, recent orders |
| `/artisan/add-product` | **ArtisanAddProduct** | Naya product add karo — image upload (drag-drop/URL), title, price, stock |
| `/artisan/my-products` | **ArtisanMyProducts** | Products list — stock status, edit/delete, low stock alerts |
| `/artisan/orders` | **ArtisanOrders** | Customer orders manage — status update (Processing → Shipped → Delivered) |
| `/artisan/profile` | **ArtisanProfile** | Profile edit — name, studio, craft type, bio, website, instagram |

### Admin Pages

| Route | Page | Kya karta hai |
|---|---|---|
| `/admin` | **AdminDashboard** | Marketplace metrics — total users, artisans, revenue, recent activity |
| `/admin/users` | **AdminUsers** | Users manage — search, filter, suspend/activate |
| `/admin/approvals` | **AdminArtisanApprovals** | Artisan applications approve/reject karo |
| `/admin/orders` | **AdminOrders** | Sabhi orders track karo, status update |
| `/admin/settings` | **AdminSettings** | Platform settings — commission, currency, notifications, data management |

---

## Context API (Global State) — Kaise kaam karta hai

### 1. AuthContext.jsx — Authentication

```
Provides: user, login(), logout(), register(), updateProfile()
```

- localStorage me users aur currentUser store karta hai
- Registration me duplicate email check hota hai
- Login case-insensitive hai (email trim + lowercase)
- 3 default accounts pre-configured hain (Customer, Artisan, Admin)

### 2. CartContext.jsx — Shopping Cart

```
Provides: items, addItem(), removeItem(), updateQty(), clear(), totals
```

- `addItem()` — agar item already hai to qty increment hota hai
- `removeItem()` — item remove by ID
- `updateQty()` — minimum qty 1 enforce karta hai
- `clear()` — poora cart empty
- `totals` auto-calculate hota hai via `useMemo`:
  - **Subtotal** = sum of (price x qty)
  - **Shipping** = $12.50 (free at 150+)
  - **Tax** = 8% of subtotal
  - **Total** = subtotal + shipping + tax

### 3. WishlistContext.jsx — Favorites

```
Provides: items, addItem(), removeItem()
```

- Products page pe heart icon se wishlist me add/remove hota hai
- Duplicate prevention built-in (same ID dobara add nahi hoga)

### 4. NotificationContext.jsx — Admin Notifications

```
Provides: notifications, addNotification(), markAsRead(), markAllAsRead(), clearAll(), unreadCount
```

- **Har 2 second** localStorage poll karta hai changes ke liye
- Auto-detect karta hai: new orders, new users, new products, new artisan applications
- Max 50 notifications store hoti hain
- Har notification me: id, type, title, message, icon, color, link hota hai

---

## App Flow — Kaise kaam karta hai

```
index.html
  └── loads Tailwind CSS + Google Fonts
  └── <div id="root">

main.jsx
  └── createRoot(container)
  └── <BrowserRouter>
        └── <App />

App.jsx
  └── <AuthProvider>          ← Auth state wrap
      └── <WishlistProvider>  ← Wishlist state wrap
          └── <CartProvider>  ← Cart state wrap
              └── <NotificationProvider>  ← Notifications wrap
                  └── <Routes>
                        └── 18 <Route> definitions
                        └── /* → redirect to /
```

### Data Flow:

1. **Customer** browses `/products` → adds to cart → goes to `/cart` → `/checkout` → places order
2. Order save hota hai localStorage me (`artisanOrders_[email]`)
3. **Artisan** ka dashboard har 1 second poll karta hai → new order dikhta hai
4. Artisan order status update karta hai (Processing → Shipped → Delivered)
5. **Admin** ka NotificationContext har 2 second poll karta hai → new order/user/product ki notification aati hai
6. Admin users manage karta hai, artisan approvals karta hai, orders track karta hai

---

## 3 Reusable Components

| Component | Use | Features |
|---|---|---|
| **AdminSidebar.jsx** | Admin pages me left sidebar | Navigation links (Dashboard, Users, Artisans, Orders, Settings), active highlighting, logout |
| **ArtisanSidebar.jsx** | Artisan pages me left sidebar | Dashboard/Products/Orders/Profile links, user info display, logout |
| **NotificationBell.jsx** | Admin header me bell icon | Unread badge with animation, dropdown list, mark read, color-coded notifications, click outside to close |

---

## Page-wise Detail

### Home.jsx

- Header with logo, search bar, cart link, auth buttons
- Hero banner with background image and CTA button
- Featured Artisans section (5 artisan cards with images)
- Trending Products section (4 product cards with wishlist heart buttons)
- Newsletter subscription section
- Footer with links
- Uses: `useAuth()`, `useWishlist()`, `useCart()`

### Login.jsx

- Split layout (image left, form right)
- Email + password fields with show/hide toggle
- Remember me checkbox
- Error messages display
- Role-based redirect after login
- Auto-redirect if already logged in
- Uses: `useAuth()`, `useState()`

### Register.jsx

- Role selector (Collector vs Artisan radio buttons)
- Common fields: Full Name, Email, Password
- Artisan-specific fields: Studio Name, Craft Type (conditional)
- Craft type dropdown: Ceramics, Woodworking, Jewelry, Textiles, Painting
- Password min 6 characters validation
- Terms agreement required
- Auto-login after registration
- Uses: `useAuth()`, `useState()`

### Products.jsx

- Header with search + cart button
- Left sidebar with 6 category filters (All Crafts, Ceramics, Jewelry, Woodwork, Textiles, Home Decor)
- Product grid (responsive 1-3 columns)
- Product cards with images, prices, add to cart, wishlist heart
- Sorting: Newest, Price Low-High, Price High-Low, Top Rated
- Pagination (6 items per page)
- Real-time sync from localStorage (polls every 1 second)
- 6+ base products + dynamic artisan-added products
- Uses: `useAuth()`, `useCart()`, `useWishlist()`

### Artisans.jsx

- Grid of artisan cards (2-5 columns responsive)
- Each card: circular profile image, name, specialty
- 5 hardcoded artisans
- Hover effects on cards
- Uses: `useAuth()`

### Cart.jsx

- Cart items list with: image, title, price, quantity controls (+/-), remove button
- Order summary sidebar: subtotal, shipping, tax, total
- Free shipping threshold indicator (150+)
- Checkout button
- Promo code input (UI only)
- Continue shopping link
- Uses: `useCart()`

### Checkout.jsx

- Progress breadcrumb
- Shipping form: name, address, city, state, zip
- Payment method: Credit Card / PayPal radio
- Card details form (conditional on Credit Card)
- PayPal notice (conditional)
- Order summary sidebar
- On place order: order saved to localStorage, stock updated, cart cleared
- Redirects to `/order-success`
- Uses: `useCart()`, `useState()`

### OrderSuccess.jsx

- Success checkmark icon
- Random order ID display
- "Continue Shopping" and "View Cart" buttons

### ArtisanDashboard.jsx

- 3 stat cards: Total Earnings, Total Products, Recent Orders
- Recent Orders table: Order ID, Customer, Date, Amount, Status
- Status badges: Shipped (blue), Delivered (emerald), Processing (amber)
- Low stock alerts
- Polls data every 1 second
- Uses: `useAuth()`, ArtisanSidebar

### ArtisanAddProduct.jsx

- Image upload: drag-drop, file input, or URL
- Image validation: PNG/JPG only, max 10MB
- Form: Title, Category (6 options), Stock, Price, Description
- 3 additional image upload placeholders
- Publish / Save as Draft buttons
- Base64 image encoding for localStorage storage
- Automatic product ID generation
- Uses: `useAuth()`, `useState()`, `useNavigate()`

### ArtisanMyProducts.jsx

- 3 dashboard cards: Total Products, Low Stock Alert, Active Listings
- Products table: Thumbnail, Name, Category, Price, Stock Status, Actions
- Stock badges: Out of Stock (gray), Low Stock (amber), In Stock (green)
- Edit and delete buttons per product
- Pagination controls
- Polls products every 1 second
- Uses: `useAuth()`

### ArtisanOrders.jsx

- Tabs: All Orders, Processing, Shipped, Delivered
- Orders table: Order ID, Customer, Date, Amount, Status, Actions
- Status dropdown for updating
- Quick action buttons (Ship, Deliver)
- Summary cards: Total Revenue, Active Orders, Order Rating
- Pagination
- Seed orders for demo account
- Uses: `useAuth()`

### ArtisanProfile.jsx

- Profile form: Full Name, Email (readonly), Studio Name, Craft Type, Bio, Website, Instagram
- Success/error messages on save
- Uses: `useAuth()` (user + updateProfile)

### AdminDashboard.jsx

- 4 stat cards: Total Users, Total Artisans, Pending Approvals, Total Revenue
- Recent Activity feed (8 items): icon, title, subtitle, amount, time
- Market Insights: product category breakdown with progress bars
- Live indicator badges
- Polls every 1 second
- Uses: AdminSidebar, NotificationBell

### AdminUsers.jsx

- Search bar + role filter dropdown
- 3 stat cards: Total Users, Artisans count, Customers count
- Users table: Avatar, Name, Email, Role, Joined Date, Activity, Status, Actions
- Suspend/Activate toggle button
- User avatars with initials or images
- Deduplication by email
- Status overrides persist in localStorage
- Uses: AdminSidebar

### AdminArtisanApprovals.jsx

- Search bar
- 3 stat cards: Pending, Approved, Rejected counts
- Approvals table: Shop logo, Name, Specialty, Date, Actions
- Approve / Reject buttons with confirmation
- 4 seed applications on first load
- Pagination (4 per page)
- Uses: AdminSidebar

### AdminOrders.jsx

- Search bar
- 3 stat cards: Processing, In Transit, Delivered counts
- Orders table: Order ID, Customer, Date, Amount, Status
- Status dropdown (Processing/Shipped/Delivered)
- 5 seed orders on first load
- Search by Order ID, Customer, or Status
- Pagination (5 per page)
- Uses: AdminSidebar

### AdminReports.jsx

- 4 metric cards: Total Revenue, Total Orders, Products Listed, Avg Order Value
- Order Fulfillment progress bars (Processing, Shipped, Delivered with percentages)
- User Breakdown cards (Artisans, Customers, Total Registered)
- Polls every 2 seconds
- Uses: AdminSidebar

### AdminSettings.jsx

- 4 Tabs: General, Notifications, Policies, Data Management
- General: Site name, Commission rate, Currency, Auto-approve, Maintenance mode
- Notifications: Toggle switches for email/push notifications
- Policies: Min order amount, Commission percentage
- Data Management: Storage overview, clear data buttons per type, factory reset
- Save Settings button
- localStorage persistence (`adminSettings`)
- Uses: AdminSidebar

---

## Key Features Summary

- **Dark Mode** support (Tailwind `dark:` classes throughout)
- **Responsive Design** (mobile to desktop grid layouts)
- **Real-time updates** via localStorage polling (1-2 sec intervals)
- **Role-based access** (Customer / Artisan / Admin)
- **Image upload** with drag-drop + URL support + Base64 encoding
- **Order lifecycle** management (Processing → Shipped → Delivered)
- **No backend** — pure frontend app with localStorage as database
- **Google Material Symbols** icons used everywhere
- **Work Sans** custom font family
- **Tailwind CSS** for all styling with custom color theme (primary: #8b5e3c)

---

## How to Run

```bash
npm install       # Install dependencies
npm run dev       # Start dev server (Vite)
npm run build     # Production build
npm run preview   # Preview production build
```
