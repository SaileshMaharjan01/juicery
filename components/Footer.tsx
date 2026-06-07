export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-16 border-t border-gray-800">
      <div className="container mx-auto px-6 lg:px-12 grid grid-cols-1 md:grid-cols-4 gap-12">
        {/* Brand */}
        <div className="col-span-1 md:col-span-1">
          <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-pink-500 tracking-wide mb-4 inline-block">
            Juicery
          </span>
          <p className="text-sm text-gray-400 leading-relaxed max-w-xs">
            The future of freshness. Cold-pressed, 100% pure fruit juices packed with nature's best ingredients.
          </p>
        </div>

        {/* Shop Links */}
        <div>
          <h4 className="text-white font-semibold mb-4 tracking-wider uppercase text-sm">Shop</h4>
          <ul className="space-y-3 text-sm">
            <li><a href="#" className="hover:text-white transition-colors">Cream Mango</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Dutch Chocolate</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Ruby Pomegranate</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Build a Box</a></li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h4 className="text-white font-semibold mb-4 tracking-wider uppercase text-sm">Support</h4>
          <ul className="space-y-3 text-sm">
            <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Shipping & Returns</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Track Order</a></li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h4 className="text-white font-semibold mb-4 tracking-wider uppercase text-sm">Stay Fresh</h4>
          <p className="text-sm text-gray-400 mb-4">
            Subscribe for exclusive drops, nutritional tips, and 10% off your first order.
          </p>
          <form className="flex">
            <input
              type="email"
              placeholder="Your email address"
              className="bg-gray-800 text-white px-4 py-2 rounded-l-md focus:outline-none focus:ring-1 focus:ring-orange-500 w-full text-sm border border-gray-700"
            />
            <button
              type="submit"
              className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-r-md transition-colors text-sm font-semibold"
            >
              Join
            </button>
          </form>
        </div>
      </div>
      <div className="container mx-auto px-6 lg:px-12 mt-12 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
        <p>&copy; {new Date().getFullYear()} Nano Banana Inc. All rights reserved.</p>
        <div className="space-x-4 mt-4 md:mt-0">
          <a href="#" className="hover:text-white">Privacy Policy</a>
          <a href="#" className="hover:text-white">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
}
