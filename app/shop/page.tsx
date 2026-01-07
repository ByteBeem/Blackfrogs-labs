"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { 
  ShoppingBag, 
  X, 
  CheckCircle2, 
  CreditCard, 
  Truck, 
  ChevronRight, 
  Star,
  Zap,
  ShieldCheck,
  Loader2,
  MapPin,
  Map,
  Navigation,
  ChevronDown,
  AlertCircle
} from "lucide-react";
import Header from "../../components/Header";

// API CONFIG
const API_URL = "https://api.blackfroglabs.co.za/api";
const CATEGORIES = ["All", "Chargers", "Cables", "Protection", "Audio"];

// TYPE DEFINITION
interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  badge: string | null;
  description: string;
  image: string; // Changed from images[] to single image string
}

export default function Shop() {
  // --- STATE ---
  
  // Product Data
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoadingProducts, setIsLoadingProducts] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All");
  const [visibleCount, setVisibleCount] = useState(8);
  
  // Checkout Interaction
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [checkoutStep, setCheckoutStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [submissionError, setSubmissionError] = useState("");
  
  // Location
  const [isLocating, setIsLocating] = useState(false);
  const [locationError, setLocationError] = useState("");

  // Form Data
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    deliveryMethod: "collection", 
    address: "",
    coordinates: null as { latitude: number; longitude: number } | null,
    paymentMethod: "cod" // Default changed to 'cod' since EFT is disabled
  });

  const DELIVERY_FEE = 15;

  // --- EFFECTS ---

  // 1. Fetch Products on Mount
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`${API_URL}/products`);
        if (!res.ok) throw new Error("Failed to load products");
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setIsLoadingProducts(false);
      }
    };

    fetchProducts();
  }, []);

  // --- LOGIC ---

  // Filter Logic
  const filteredProducts = activeCategory === "All" 
    ? products 
    : products.filter(p => p.category === activeCategory);
  
  const visibleProducts = filteredProducts.slice(0, visibleCount);
  
  // Calculate Total
  const totalAmount = selectedProduct 
    ? selectedProduct.price + (formData.deliveryMethod === 'delivery' ? DELIVERY_FEE : 0)
    : 0;

  // --- HANDLERS ---

  const handleLoadMore = () => {
    setVisibleCount(prev => prev + 4);
  };

  const handleBuyClick = (product: Product) => {
    setSelectedProduct(product);
    setCheckoutStep(1);
    setSubmissionError("");
    // Ensure payment method is reset to allowed types
    setFormData(prev => ({ ...prev, paymentMethod: 'cod' }));
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
    setCheckoutStep(1);
    setSubmissionError("");
    setFormData(prev => ({ ...prev, address: "", coordinates: null }));
  };

  // Geolocation Logic
  const handleDetectLocation = () => {
    setIsLocating(true);
    setLocationError("");

    if (!navigator.geolocation) {
        setLocationError("Geolocation is not supported by your browser");
        setIsLocating(false);
        return;
    }

    navigator.geolocation.getCurrentPosition(
        (position) => {
            const coords = {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
            };

            setFormData(prev => ({
                ...prev,
                coordinates: coords,
                address: `Detected Location (Lat: ${coords.latitude.toFixed(4)}, Long: ${coords.longitude.toFixed(4)})` 
            }));
            setIsLocating(false);
        },
        (error) => {
            console.error(error);
            setLocationError("Unable to retrieve location. Please type manually.");
            setIsLocating(false);
        }
    );
  };

  // Submit Order to Backend
  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setSubmissionError("");

    try {
        if (!selectedProduct) return;

        const payload = {
            ...formData,
            productId: selectedProduct.id,
        };

        const response = await fetch(`${API_URL}/orders`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        });

        const result = await response.json();
        if (!response.ok) throw new Error(result.error || "Failed to place order");

        setCheckoutStep(3);
    } catch (error: any) {
        console.error("Order failed:", error);
        setSubmissionError(error.message || "Something went wrong. Please try again.");
    } finally {
        setIsProcessing(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white transition-colors duration-500">
      <Header />

      {/* --- HERO SECTION --- */}
      <section className="relative pt-32 pb-12 px-4 md:px-6 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[100px]" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[100px]" />
        </div>

        <div className="max-w-7xl mx-auto text-center relative z-10">
          <span className="inline-block py-1 px-3 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 text-xs font-bold uppercase tracking-wider mb-4 animate-fadeIn">
            Official Store
          </span>
          <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tight">
            Premium Gear for <br />
            <span className="bg-gradient-to-r from-emerald-500 to-cyan-500 bg-clip-text text-transparent">
              Your Devices
            </span>
          </h1>

          <div className="flex flex-wrap justify-center gap-2 md:gap-4 animate-fadeIn">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => { setActiveCategory(cat); setVisibleCount(8); }}
                className={`px-5 py-2 rounded-full text-sm font-bold transition-all duration-300 ${
                  activeCategory === cat
                    ? "bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-lg scale-105"
                    : "bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* --- PRODUCT GRID --- */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 pb-24">
        
        {isLoadingProducts ? (
            <div className="flex flex-col items-center justify-center py-20">
                <Loader2 className="w-10 h-10 animate-spin text-emerald-500 mb-4" />
                <p className="text-slate-500 font-medium">Loading products...</p>
            </div>
        ) : products.length === 0 ? (
            <div className="text-center py-20 text-slate-500">
                No products found in the database.
            </div>
        ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {visibleProducts.map((product) => (
                <div 
                  key={product.id} 
                  onClick={() => handleBuyClick(product)}
                  className="group cursor-pointer bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden hover:shadow-xl hover:shadow-emerald-500/10 hover:-translate-y-1 transition-all duration-300 flex flex-col h-full"
                >
                {/* --- IMAGE AREA (Simple, Single Image) --- */}
                <div className="relative h-64 w-full bg-slate-100 dark:bg-slate-800/50 overflow-hidden p-6 flex items-center justify-center">
                    {product.badge && (
                      <span className="absolute top-4 left-4 bg-emerald-500 text-white text-[10px] font-bold px-2 py-1 rounded shadow-sm z-10">
                          {product.badge}
                      </span>
                    )}
                    
                    {product.image ? (
                      <Image 
                        src={product.image} 
                        alt={product.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    ) : (
                      <div className="text-slate-300 dark:text-slate-600">No Image</div>
                    )}
                </div>

                {/* Content */}
                <div className="p-5 flex-1 flex flex-col">
                    <div className="flex justify-between items-start mb-2">
                        <span className="text-[10px] font-bold text-cyan-600 dark:text-cyan-400 uppercase tracking-wide">
                            {product.category}
                        </span>
                        <div className="flex text-yellow-400">
                            {[...Array(5)].map((_, i) => (
                                <Star key={i} size={12} fill="currentColor" />
                            ))}
                        </div>
                    </div>
                    
                    <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-2 leading-tight">
                        {product.name}
                    </h3>
                    
                    <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 mb-4 flex-1">
                        {product.description}
                    </p>

                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-100 dark:border-slate-800">
                    <span className="text-xl font-black text-slate-900 dark:text-white">
                        R{product.price}
                    </span>
                    <button 
                        className="flex items-center gap-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider hover:bg-emerald-600 dark:hover:bg-cyan-400 hover:text-white transition-all active:scale-95"
                    >
                        Buy <ChevronRight size={14} />
                    </button>
                    </div>
                </div>
                </div>
            ))}
            </div>
        )}

        {/* --- LOAD MORE BUTTON --- */}
        {!isLoadingProducts && visibleCount < filteredProducts.length && (
          <div className="mt-12 flex justify-center">
            <button 
              onClick={handleLoadMore}
              className="flex items-center gap-2 px-8 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-bold rounded-full shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all"
            >
              Show More Products <ChevronDown size={16} />
            </button>
          </div>
        )}
      </section>

      {/* --- CHECKOUT MODAL --- */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white dark:bg-slate-900 w-full max-w-2xl rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 overflow-hidden flex flex-col max-h-[90vh]">
            
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 z-10">
                <div className="flex items-center gap-2 text-sm font-bold text-slate-500">
                    <ShoppingBag size={16} />
                    <span>Quick Checkout</span>
                </div>
                <button onClick={handleCloseModal} className="p-2 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-full transition-colors">
                    <X size={20} className="text-slate-500" />
                </button>
            </div>

            {/* Body */}
            <div className="overflow-y-auto custom-scrollbar p-6 md:p-8">
                
                  {/* Product Summary Text (Replaces Gallery) */}
                  {checkoutStep < 3 && (
                      <div className="flex items-start gap-4 mb-8 pb-8 border-b border-slate-100 dark:border-slate-800">
                          {/* Small Thumbnail instead of gallery */}
                          <div className="h-20 w-20 relative rounded-lg overflow-hidden border border-slate-200 dark:border-slate-700 flex-shrink-0">
                             <Image src={selectedProduct.image} alt={selectedProduct.name} fill className="object-cover" />
                          </div>

                          <div className="flex-1">
                              <h4 className="text-xl font-black text-slate-900 dark:text-white leading-tight mb-1">{selectedProduct.name}</h4>
                              <p className="text-sm text-slate-500">{selectedProduct.category}</p>
                              <div className="flex items-center gap-1 mt-2 text-emerald-600 dark:text-emerald-400 text-xs font-bold">
                                <CheckCircle2 size={12} /> In Stock & Ready to Ship
                              </div>
                          </div>
                          <div className="text-right">
                              <p className="font-black text-emerald-600 dark:text-emerald-400 text-2xl">R{totalAmount}</p>
                              {formData.deliveryMethod === 'delivery' && (
                                  <span className="text-[10px] text-slate-500 block">Includes R{DELIVERY_FEE} Delivery</span>
                              )}
                          </div>
                      </div>
                  )}
                  
                  {/* Error Display */}
                  {submissionError && (
                      <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl flex items-center gap-3 text-red-600 dark:text-red-400 animate-fadeIn">
                          <AlertCircle size={20} />
                          <span className="text-sm font-bold">{submissionError}</span>
                      </div>
                  )}

                  {/* --- FORM --- */}
                  {checkoutStep === 1 && (
                      <form onSubmit={handlePlaceOrder} className="space-y-6">
                          
                          {/* 1. Details */}
                          <div className="space-y-4">
                              <h3 className="text-sm font-black uppercase text-slate-400 tracking-wider">Contact Details</h3>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                  <input 
                                      required placeholder="Full Name"
                                      className="w-full px-4 py-3 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                                      value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})}
                                  />
                                  <input 
                                      required type="tel" placeholder="Phone Number"
                                      className="w-full px-4 py-3 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                                      value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})}
                                  />
                                  <input 
                                      required type="email" placeholder="Email Address"
                                      className="w-full px-4 py-3 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-emerald-500 outline-none transition-all md:col-span-2"
                                      value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})}
                                  />
                              </div>
                          </div>

                          {/* 2. Delivery Method */}
                          <div className="space-y-4">
                              <h3 className="text-sm font-black uppercase text-slate-400 tracking-wider">Delivery Method</h3>
                              <div className="grid grid-cols-2 gap-3">
                                  <button
                                      type="button"
                                      onClick={() => setFormData({...formData, deliveryMethod: 'collection'})}
                                      className={`p-4 rounded-xl border text-left transition-all ${formData.deliveryMethod === 'collection' ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20 ring-1 ring-emerald-500' : 'border-slate-200 dark:border-slate-700'}`}
                                  >
                                      <div className="font-bold text-sm mb-1">Store Collection</div>
                                      <div className="text-xs text-slate-500">Collect at our store</div>
                                      <div className="text-xs font-bold text-emerald-600 mt-1">Free</div>
                                  </button>
                                  <button
                                      type="button"
                                      onClick={() => setFormData({...formData, deliveryMethod: 'delivery'})}
                                      className={`p-4 rounded-xl border text-left transition-all ${formData.deliveryMethod === 'delivery' ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20 ring-1 ring-emerald-500' : 'border-slate-200 dark:border-slate-700'}`}
                                  >
                                      <div className="font-bold text-sm mb-1">Local Delivery</div>
                                      <div className="text-xs text-slate-500">We bring it to you</div>
                                      <div className="text-xs font-bold text-emerald-600 mt-1">+ R{DELIVERY_FEE}.00</div>
                                  </button>
                              </div>

                              {/* LOCATION DETECTOR (Only shows if Delivery is selected) */}
                              {formData.deliveryMethod === 'delivery' && (
                                  <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 animate-fadeIn">
                                      <label className="text-xs font-bold text-slate-500 uppercase mb-2 block">Delivery Address</label>
                                      
                                      {!formData.address ? (
                                          <div className="space-y-3">
                                              <button 
                                                  type="button"
                                                  onClick={handleDetectLocation}
                                                  disabled={isLocating}
                                                  className="w-full py-4 border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-lg text-slate-500 hover:border-emerald-500 hover:text-emerald-500 hover:bg-emerald-50 dark:hover:bg-emerald-900/10 transition-all flex flex-col items-center justify-center gap-2"
                                              >
                                                  {isLocating ? (
                                                      <Loader2 className="animate-spin w-6 h-6" />
                                                  ) : (
                                                      <>
                                                          <MapPin className="w-6 h-6 mb-1" />
                                                          <span className="font-bold">Tap to Detect Current Location</span>
                                                          <span className="text-xs font-normal">Uses GPS for accuracy</span>
                                                      </>
                                                  )}
                                              </button>
                                              {locationError && <p className="text-xs text-red-500 text-center">{locationError}</p>}
                                          </div>
                                      ) : (
                                          <div className="flex items-start gap-3">
                                              <div className="p-2 bg-emerald-100 dark:bg-emerald-900/30 rounded-full text-emerald-600">
                                                  <Map size={18} />
                                              </div>
                                              <div className="flex-1">
                                                  <p className="text-sm font-medium text-slate-900 dark:text-white line-clamp-2">
                                                      {formData.address}
                                                  </p>
                                                  <button 
                                                      type="button" 
                                                      onClick={() => setFormData({...formData, address: "", coordinates: null})}
                                                      className="text-xs text-red-500 hover:underline mt-1"
                                                  >
                                                      Change Location
                                                  </button>
                                              </div>
                                              <CheckCircle2 size={18} className="text-emerald-500" />
                                          </div>
                                      )}
                                  </div>
                              )}
                          </div>

                          {/* 3. Payment Method */}
                          <div className="space-y-4">
                              <h3 className="text-sm font-black uppercase text-slate-400 tracking-wider">Payment</h3>
                              <div className="grid grid-cols-1 gap-3">
                                  
                                  {/* Option A: EFT (DISABLED) */}
                                  <label className="flex items-center gap-3 p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-900 opacity-50 cursor-not-allowed">
                                      <input 
                                          type="radio" disabled
                                          className="text-slate-400"
                                      />
                                      <div className="flex-1">
                                          <div className="flex items-center gap-2 font-bold text-slate-500">
                                              <CreditCard size={16} /> EFT / Card
                                          </div>
                                          <div className="text-[10px] text-red-500 font-bold uppercase tracking-wide mt-1">Under Construction</div>
                                      </div>
                                  </label>

                                  {/* Option B: COD (Active) */}
                                  <label className={`flex items-center gap-3 p-4 rounded-xl border cursor-pointer transition-all ${formData.paymentMethod === 'cod' ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20' : 'border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800'}`}>
                                      <input 
                                          type="radio" name="payment" value="cod" 
                                          checked={formData.paymentMethod === 'cod'}
                                          onChange={() => setFormData({...formData, paymentMethod: 'cod'})}
                                          className="text-emerald-500 focus:ring-emerald-500"
                                      />
                                      <div className="flex-1">
                                          <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-white">
                                              {formData.deliveryMethod === 'delivery' ? <Navigation size={16} /> : <Truck size={16} />} 
                                              {formData.deliveryMethod === 'delivery' ? 'Cash on Delivery (COD)' : 'Pay on Collection'}
                                          </div>
                                      </div>
                                  </label>
                              </div>
                          </div>

                          {/* Submit Button */}
                          <button 
                              type="submit" 
                              disabled={isProcessing || (formData.deliveryMethod === 'delivery' && !formData.address)}
                              className="w-full py-4 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-bold rounded-xl shadow-lg shadow-emerald-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                          >
                              {isProcessing ? <Loader2 className="animate-spin" /> : <ShieldCheck />}
                              {isProcessing ? "Processing..." : `Confirm Order (R${totalAmount})`}
                          </button>
                      </form>
                  )}

                  {/* --- SUCCESS --- */}
                  {checkoutStep === 3 && (
                      <div className="text-center py-8 animate-fadeIn">
                          <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                              <CheckCircle2 size={40} />
                          </div>
                          <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-2">Order Confirmed!</h3>
                          <p className="text-slate-600 dark:text-slate-400 mb-8 max-w-sm mx-auto">
                              Thank you, {formData.name}. We have sent the details to <b>{formData.email}</b>.
                          </p>
                          
                          <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-xl text-left text-sm space-y-2 mb-8 border border-slate-200 dark:border-slate-700">
                              <div className="flex justify-between">
                                  <span className="text-slate-500">Total:</span>
                                  <span className="font-mono font-bold text-lg">R{totalAmount}</span>
                              </div>
                              <div className="flex justify-between">
                                  <span className="text-slate-500">Method:</span>
                                  <span className="font-bold capitalize">{formData.deliveryMethod}</span>
                              </div>
                               {formData.deliveryMethod === 'delivery' && (
                                  <div className="pt-2 mt-2 border-t border-slate-200 dark:border-slate-700">
                                      <p className="text-xs text-slate-400">Location:</p>
                                      <p className="text-xs font-mono">{formData.address}</p>
                                  </div>
                              )}
                          </div>

                          <button 
                              onClick={handleCloseModal}
                              className="px-8 py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold rounded-full hover:opacity-90 transition-opacity"
                          >
                              Continue Shopping
                          </button>
                      </div>
                  )}
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="relative z-10 mt-20 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-10 md:py-12 text-center space-y-4">
          <div className="flex flex-col items-center gap-4 md:gap-6">
            <div className="relative w-16 h-16">
              <Image src="/logo.jpg" alt="BlackFrogs Labs" fill className="object-contain rounded-xl" />
            </div>
            <h4 className="text-xl font-bold bg-gradient-to-r from-emerald-500 to-cyan-500 bg-clip-text text-transparent">
              BlackFrogs Labs
            </h4>
            <p className="text-slate-500 dark:text-slate-400 text-sm md:text-base">
              © 2025 Black Frog Labs. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn { animation: fadeIn 0.4s ease-out forwards; }
      `}</style>
    </main>
  );
}
