import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Products from "./pages/Products.jsx";
import Cart from "./pages/Cart.jsx";
import Checkout from "./pages/Checkout.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import ArtisanDashboard from "./pages/ArtisanDashboard.jsx";
import AdminDashboard from "./pages/admin/AdminDashboard.jsx";
import AdminArtisanApprovals from "./pages/admin/AdminArtisanApprovals.jsx";
import AdminOrders from "./pages/admin/AdminOrders.jsx";
import AdminUsers from "./pages/admin/AdminUsers.jsx";
import AdminSettings from "./pages/admin/AdminSettings.jsx";
import OrderSuccess from "./pages/OrderSuccess.jsx";
import Artisans from "./pages/Artisans.jsx";
import ArtisanAddProduct from "./pages/artisan/ArtisanAddProduct.jsx";
import ArtisanMyProducts from "./pages/artisan/ArtisanMyProducts.jsx";
import ArtisanProfile from "./pages/artisan/ArtisanProfile.jsx";
import ArtisanOrders from "./pages/artisan/ArtisanOrders.jsx";
import { CartProvider } from "./context/CartContext.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import { NotificationProvider } from "./context/NotificationContext.jsx";

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
      <NotificationProvider>
        <div className="min-h-screen text-slate-900 dark:text-slate-100 font-[Work_Sans]">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/order-success" element={<OrderSuccess />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/artisans" element={<Artisans />} />
            <Route path="/artisan" element={<ArtisanDashboard />} />
            <Route path="/artisan/add-product" element={<ArtisanAddProduct />} />
            <Route path="/artisan/my-products" element={<ArtisanMyProducts />} />
            <Route path="/artisan/profile" element={<ArtisanProfile />} />
            <Route path="/artisan/orders" element={<ArtisanOrders />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/approvals" element={<AdminArtisanApprovals />} />
            <Route path="/admin/orders" element={<AdminOrders />} />
            <Route path="/admin/users" element={<AdminUsers />} />
            <Route path="/admin/settings" element={<AdminSettings />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
      </NotificationProvider>
      </CartProvider>
    </AuthProvider>
  );
}
