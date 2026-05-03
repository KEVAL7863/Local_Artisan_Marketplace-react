import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";
import ArtisanSidebar from "../../components/ArtisanSidebar.jsx";
import { api } from "../../utils/api";

export default function ArtisanAddProduct() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Woodwork");
  const [stock, setStock] = useState(0);
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [imageData, setImageData] = useState("");
  const [uploadError, setUploadError] = useState("");

  const handleFile = async (file) => {
    if (!file) return;
    const validTypes = ["image/png", "image/jpeg"];
    const maxSize = 10 * 1024 * 1024;
    if (!validTypes.includes(file.type)) {
      setUploadError("Please upload a PNG or JPG image.");
      return;
    }
    if (file.size > maxSize) {
      setUploadError("File too large. Max size is 10MB.");
      return;
    }
    setUploadError("");
    const reader = new FileReader();
    reader.onload = () => {
      setImageData(reader.result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 font-display">
      <div className="flex min-h-screen">
        <ArtisanSidebar />

        <main className="flex-1 ml-72 flex flex-col min-w-0 overflow-hidden">
          {/* Header */}
          <header className="h-16 border-b border-primary/10 bg-white dark:bg-background-dark/80 flex items-center justify-between px-8">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">add_circle</span>
              <h2 className="text-lg font-bold tracking-tight">Add New Product</h2>
            </div>
            <div className="flex items-center gap-4">
              <button className="size-10 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:bg-primary/10 hover:text-primary transition-all">
                <span className="material-symbols-outlined text-[20px]">notifications</span>
              </button>
              <button
                className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-semibold hover:bg-primary/90 transition-colors"
                onClick={async () => {
                  if (!title || (!imageData && !imageUrl)) {
                    alert("Please fill in the title and provide an image.");
                    return;
                  }
                  try {
                    await api.post("/products", {
                      title, category,
                      stock: Number(stock) || 0,
                      price: Number(price) || 0,
                      description,
                      image_url: imageData || imageUrl || "https://images.unsplash.com/photo-1515825838458-f2a94b20105a?q=80&w=1000&auto=format&fit=crop",
                    });
                    navigate("/artisan/my-products");
                  } catch (err) {
                    alert(err.message || "Failed to add product");
                  }
                }}
              >
                Publish Product
              </button>
            </div>
          </header>

          {/* Scrollable Form Area */}
          <div className="flex-1 overflow-y-auto p-8 max-w-5xl mx-auto w-full">
            <div className="mb-8">
              <h1 className="text-3xl font-bold mb-2">Create New Listing</h1>
              <p className="text-slate-500">Fill in the details to showcase your craft to the world.</p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
              {/* Left Column: Image Upload */}
              <div className="lg:col-span-1 space-y-6">
                <section>
                  <h3 className="text-sm font-bold uppercase tracking-wider text-primary mb-4">Product Media</h3>
                  <label
                    htmlFor="product-image-input"
                    className="aspect-square rounded-xl border-2 border-dashed border-primary/20 bg-primary/5 flex flex-col items-center justify-center p-6 text-center group cursor-pointer hover:border-primary/50 transition-all"
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={(e) => { e.preventDefault(); handleFile(e.dataTransfer.files?.[0]); }}
                  >
                    {imageData ? (
                      <div className="relative w-full h-full">
                        <img alt="Preview" src={imageData} className="w-full h-full object-cover rounded-xl" />
                        <div className="absolute bottom-3 left-3 right-3 flex justify-between">
                          <button type="button" className="px-3 py-1 rounded-lg bg-white/80 text-sm font-semibold hover:bg-white text-slate-900" onClick={() => setImageData("")}>Remove</button>
                        </div>
                      </div>
                    ) : (
                      <>
                        <div className="size-16 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4 group-hover:scale-110 transition-transform">
                          <span className="material-symbols-outlined text-3xl">cloud_upload</span>
                        </div>
                        <p className="text-sm font-semibold">Upload Image</p>
                        <p className="text-xs text-slate-500 mt-1">PNG, JPG up to 10MB</p>
                      </>
                    )}
                  </label>
                  <input id="product-image-input" type="file" accept="image/png,image/jpeg" className="hidden" onChange={(e) => handleFile(e.target.files?.[0])} />
                  {uploadError && <p className="text-red-600 text-xs mt-2">{uploadError}</p>}
                  <div className="grid grid-cols-3 gap-2 mt-4">
                    <div className="aspect-square rounded-lg bg-slate-100 dark:bg-slate-800 border border-primary/10 flex items-center justify-center text-slate-400">
                      <span className="material-symbols-outlined">add</span>
                    </div>
                    <div className="aspect-square rounded-lg bg-slate-100 dark:bg-slate-800 border border-primary/10 flex items-center justify-center text-slate-400">
                      <span className="material-symbols-outlined">add</span>
                    </div>
                    <div className="aspect-square rounded-lg bg-slate-100 dark:bg-slate-800 border border-primary/10 flex items-center justify-center text-slate-400">
                      <span className="material-symbols-outlined">add</span>
                    </div>
                  </div>

                  <div className="mt-6">
                    <label className="text-sm font-semibold block mb-2">Or Image URL</label>
                    <input className="w-full rounded-lg border-primary/10 bg-white dark:bg-slate-900 focus:border-primary focus:ring-primary h-12 px-4 text-sm transition-all" placeholder="https://example.com/image.jpg" type="text" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} />
                  </div>
                </section>
              </div>

              {/* Right Column: Form Details */}
              <div className="lg:col-span-2">
                <form className="space-y-6" onSubmit={async (e) => {
                  e.preventDefault();
                  if (!title || (!imageData && !imageUrl)) {
                    alert("Please fill in the title and provide an image.");
                    return;
                  }
                  try {
                    await api.post("/products", {
                      title, category,
                      stock: Number(stock) || 0,
                      price: Number(price) || 0,
                      description,
                      image_url: imageData || imageUrl || "https://images.unsplash.com/photo-1515825838458-f2a94b20105a?q=80&w=1000&auto=format&fit=crop",
                    });
                    navigate("/artisan/my-products");
                  } catch (err) {
                    alert(err.message || "Failed to add product");
                  }
                }}>
                  <section className="space-y-4">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-primary mb-2">Basic Information</h3>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Product Title</label>
                      <input required className="w-full rounded-lg border-primary/10 bg-white dark:bg-slate-900 focus:border-primary focus:ring-primary h-12 px-4 text-base transition-all" placeholder="e.g. Hand-carved Teak Wood Bowl" type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex flex-col gap-1.5">
                        <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Category</label>
                        <select className="w-full rounded-lg border-primary/10 bg-white dark:bg-slate-900 focus:border-primary focus:ring-primary h-12 px-4 text-base appearance-none transition-all" value={category} onChange={(e) => setCategory(e.target.value)}>
                          <option value="Woodwork">Woodwork</option>
                          <option value="Pottery">Pottery</option>
                          <option value="Textiles">Textiles</option>
                          <option value="Jewelry">Jewelry</option>
                          <option value="Paintings">Paintings</option>
                          <option value="Home Decor">Home Decor</option>
                        </select>
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Stock Availability</label>
                        <input required className="w-full rounded-lg border-primary/10 bg-white dark:bg-slate-900 focus:border-primary focus:ring-primary h-12 px-4 text-base transition-all" placeholder="0" type="number" value={stock} onChange={(e) => setStock(e.target.value)} />
                      </div>
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Price (₹)</label>
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-medium">₹</span>
                        <input required className="w-full rounded-lg border-primary/10 bg-white dark:bg-slate-900 focus:border-primary focus:ring-primary h-12 pl-8 pr-4 text-base transition-all" placeholder="0.00" type="number" step="0.01" value={price} onChange={(e) => setPrice(e.target.value)} />
                      </div>
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Description</label>
                      <textarea className="w-full rounded-lg border-primary/10 bg-white dark:bg-slate-900 focus:border-primary focus:ring-primary p-4 text-base transition-all resize-none" placeholder="Tell the story of your craft, materials used, and care instructions..." rows="5" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
                    </div>
                  </section>
                  <section className="pt-6 border-t border-primary/10 flex items-center justify-end gap-4">
                    <button onClick={() => navigate("/artisan/my-products")} className="px-6 py-2.5 rounded-lg border border-primary/20 text-slate-600 dark:text-slate-400 font-semibold hover:bg-slate-50 dark:hover:bg-slate-800 transition-all" type="button">
                      Save as Draft
                    </button>
                    <button className="px-8 py-2.5 rounded-lg bg-primary text-white font-semibold shadow-lg shadow-primary/20 hover:bg-primary/90 hover:scale-[1.02] active:scale-[0.98] transition-all" type="submit">
                      List Product
                    </button>
                  </section>
                </form>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
