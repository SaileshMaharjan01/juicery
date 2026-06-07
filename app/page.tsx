"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { products } from "@/data/products";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductBottleScroll from "@/components/ProductBottleScroll";
import { ChevronLeft, ChevronRight, ShoppingCart, Info, Leaf } from "lucide-react";

export default function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
    // Update global css variable for background
    document.documentElement.style.setProperty(
      "--product-gradient",
      products[currentIndex].gradient
    );
  }, [currentIndex]);

  const product = products[currentIndex];

  const handleNext = () => setCurrentIndex((prev) => (prev + 1) % products.length);
  const handlePrev = () => setCurrentIndex((prev) => (prev - 1 + products.length) % products.length);

  return (
    <main className="relative min-h-screen text-white">
      <Navbar />

      <AnimatePresence mode="wait">
        <motion.div
          key={product.id}
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          <ProductBottleScroll product={product} />

          {/* ProductDetails Section */}
          <section className="py-32 px-6 lg:px-12 bg-black/20 backdrop-blur-3xl border-t border-white/10">
            <div className="container mx-auto max-w-6xl">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
                className="grid md:grid-cols-2 gap-16 items-center"
              >
                <div>
                  <div className="flex items-center space-x-3 text-orange-400 mb-4">
                    <Info size={24} />
                    <span className="font-semibold tracking-widest uppercase text-sm">The Details</span>
                  </div>
                  <h3 className="text-4xl md:text-5xl font-bold mb-6">{product.detailsSection.title}</h3>
                  <p className="text-lg text-white/80 leading-relaxed mb-8">
                    {product.detailsSection.description}
                  </p>
                  
                  <div className="flex items-center space-x-3 text-green-400 mb-4 mt-12">
                    <Leaf size={24} />
                    <span className="font-semibold tracking-widest uppercase text-sm">Freshness Guaranteed</span>
                  </div>
                  <h3 className="text-3xl md:text-4xl font-bold mb-6">{product.freshnessSection.title}</h3>
                  <p className="text-lg text-white/80 leading-relaxed">
                    {product.freshnessSection.description}
                  </p>
                </div>
                
                <div className="grid grid-cols-1 gap-6">
                  {product.stats.map((stat, i) => (
                    <motion.div 
                      key={i}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 + 0.3 }}
                      className="bg-white/5 rounded-2xl p-6 border border-white/10 flex justify-between items-center"
                    >
                      <span className="text-xl text-white/60">{stat.label}</span>
                      <span className="text-3xl font-black">{stat.val}</span>
                    </motion.div>
                  ))}
                  
                  <div className="flex flex-wrap gap-3 mt-4">
                    {product.features.map((feat, i) => (
                      <span key={i} className="px-4 py-2 bg-white/10 rounded-full text-sm font-medium border border-white/20">
                        {feat}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </section>

          {/* BuyNow Section */}
          <section className="py-32 px-6 lg:px-12 bg-black/40 border-t border-white/10 relative overflow-hidden">
            <div className="container mx-auto max-w-4xl text-center relative z-10">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-5xl md:text-7xl font-black mb-6">Experience {product.name}</h2>
                <div className="flex justify-center items-end space-x-3 mb-10">
                  <span className="text-6xl font-bold">{product.buyNowSection.price}</span>
                  <span className="text-xl text-white/60 pb-2">{product.buyNowSection.unit}</span>
                </div>
                
                <button className="group relative inline-flex items-center justify-center px-12 py-5 text-xl font-bold text-white bg-orange-500 rounded-full overflow-hidden transition-transform hover:scale-105 active:scale-95 shadow-[0_0_40px_rgba(249,115,22,0.4)]">
                  <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-orange-400 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-out"></span>
                  <ShoppingCart className="mr-3 relative z-10" />
                  <span className="relative z-10">Add to Cart</span>
                </button>
                
                <div className="mt-16 grid md:grid-cols-3 gap-8 text-left border-t border-white/10 pt-12">
                  <div>
                    <h4 className="font-bold text-lg mb-2">Processing</h4>
                    <ul className="text-white/60 space-y-1">
                      {product.buyNowSection.processingParams.map((p, i) => <li key={i}>{p}</li>)}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-2">Delivery</h4>
                    <p className="text-white/60 text-sm">{product.buyNowSection.deliveryPromise}</p>
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-2">Guarantee</h4>
                    <p className="text-white/60 text-sm">{product.buyNowSection.returnPolicy}</p>
                  </div>
                </div>
              </motion.div>
            </div>
            
            {/* Background elements */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full blur-[120px] opacity-20 pointer-events-none" style={{ backgroundColor: product.themeColor }}></div>
          </section>

          {/* Next Flavor Button */}
          <section className="bg-black/60 border-t border-white/10 relative z-20">
             <button 
                onClick={handleNext}
                className="w-full py-24 flex flex-col items-center justify-center group transition-colors hover:bg-white/5"
             >
                <span className="text-sm font-bold tracking-widest uppercase text-white/50 mb-4 group-hover:text-white/80 transition-colors">Continue the Journey</span>
                <div className="flex items-center space-x-6">
                  <span className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white/80 to-white group-hover:from-orange-400 group-hover:to-pink-500 transition-all">
                    Next Flavor
                  </span>
                  <ChevronRight size={48} className="text-white/50 group-hover:text-orange-400 transition-colors transform group-hover:translate-x-4" />
                </div>
             </button>
          </section>
          
          <Footer />
        </motion.div>
      </AnimatePresence>

      {/* Fixed Navigation Arrows */}
      <div className="fixed top-1/2 left-4 md:left-8 -translate-y-1/2 z-40 hidden md:block">
        <button 
          onClick={handlePrev}
          className="p-4 rounded-full bg-black/20 backdrop-blur-md border border-white/10 text-white/70 hover:text-white hover:bg-white/10 hover:border-white/30 transition-all hover:-translate-x-1"
        >
          <ChevronLeft size={24} />
        </button>
      </div>
      <div className="fixed top-1/2 right-4 md:right-8 -translate-y-1/2 z-40 hidden md:block">
        <button 
          onClick={handleNext}
          className="p-4 rounded-full bg-black/20 backdrop-blur-md border border-white/10 text-white/70 hover:text-white hover:bg-white/10 hover:border-white/30 transition-all hover:translate-x-1"
        >
          <ChevronRight size={24} />
        </button>
      </div>

      {/* Fixed Bottom Menu */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50">
        <div className="flex items-center space-x-2 bg-black/40 backdrop-blur-xl border border-white/10 p-2 rounded-full shadow-2xl">
          {products.map((p, idx) => (
            <button
              key={p.id}
              onClick={() => setCurrentIndex(idx)}
              className={`px-6 py-2 rounded-full text-sm font-semibold transition-all ${
                idx === currentIndex 
                  ? "bg-white text-black shadow-md" 
                  : "text-white/70 hover:text-white hover:bg-white/10"
              }`}
            >
              {p.name.split(" ")[1] || p.name}
            </button>
          ))}
        </div>
      </div>
    </main>
  );
}
