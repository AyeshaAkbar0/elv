import { MapPinPlus, Mail, PhoneCall } from "lucide-react"
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa"
export default function Footer() {
    return(
       <div className="w-full bg-black text-white">
  {/* Footer Container */}
  <footer className="max-w-7xl mx-auto flex flex-col md:flex-row items-start justify-between gap-8 px-4 sm:px-6 lg:px-12 py-10">
    
    {/* Brand / Logo Section */}
    <div className="flex flex-col items-start space-y-2 md:w-60">
      <a href="."><img src="/afra-logo-transparent.webp" alt="Logo" className="h-auto w-30 brightness-0 invert hover:opacity-90" /></a>
      <p className="text-sm text-gray-400 wrap-break-word">Afra Technical Solutions is a regional leader in Security, IT Infrastructure, and Low Voltage Systems. With  industry excellence, we deliver end-to-end ELV services across the Middle East.
</p>
      {/* <h2 className="text-lg font-bold">Follow us</h2>
      <div className="flex justify-center items-center">
        <a href="" className="mx-2 text-gray-400 hover:text-white"><FaFacebook size={20}/></a>
        <a href="" className="mx-2 text-gray-400 hover:text-white"><FaInstagram size={20}/></a>
        <a href="" className="mx-2 text-gray-400 hover:text-white"><FaLinkedin size={20}/></a>
      </div> */}
    </div>

    {/* Quick Links */}
    <div className="flex flex-col space-y-3">
      <h2 className="text-lg font-bold">Quick links</h2>
      <ul className="space-y-1">
        <li><a href="/shop/product-category/gate-barrier-and-accesories" className="block py-1 text-sm text-gray-400 hover:text-white transition-colors">Gate barrier & Accessories</a></li>
        <li><a href="/shop/product-category/access-control-time-attendance" className="block py-1 text-sm text-gray-400 hover:text-white transition-colors">Access control & time attendance</a></li>
        <li><a href="/shop/product-category/fiber-optic-solutions" className="block py-1 text-sm text-gray-400 hover:text-white transition-colors">Fibre optic solutions</a></li>
        <li><a href="/shop/product-category/intercom" className="block py-1 text-sm text-gray-400 hover:text-white transition-colors">Intercom</a></li>
        <li><a href="/shop/product-category/ip-and-tz-cameras" className="block py-1 text-sm text-gray-400 hover:text-white transition-colors">Ip & ptz Camera</a></li>
         <li><a href="/shop/product-category/poe-switches" className="block py-1 text-sm text-gray-400 hover:text-white transition-colors">Poe Switches</a></li>
          <li><a href="/shop/product-category/wifi-cctv" className="block py-1 text-sm text-gray-400 hover:text-white transition-colors">Wifi cctv</a></li>
           <li><a href="/shop/product-category/network-video-recorders" className="block py-1 text-sm text-gray-400 hover:text-white transition-colors">Network Video Recorder</a></li>
            <li><a href="/shop/product-category/racks-and-cabinet" className="block py-1 text-sm text-gray-400 hover:text-white transition-colors">Racks and Cabinets</a></li>
      </ul>
    </div>

    {/* About Section */}
    <div className="flex flex-col space-y-3">
      <h2 className="text-lg font-bold">About</h2>
      <ul className="space-y-1">
        <li><a href="." className="block py-1 text-sm text-gray-400 hover:text-white transition-colors">Afra</a></li>
        <li><a href="/about" className="block py-1 text-sm text-gray-400 hover:text-white transition-colors">About Company</a></li>
        <li><a href="/shop" className="block py-1 text-sm text-gray-400 hover:text-white transition-colors">Our Products</a></li>
        <li><a href="contact-us" className="block py-1 text-sm text-gray-400 hover:text-white transition-colors">Contact</a></li>
      </ul>
    </div>

    {/* Customer Care Section */}
    <div className="flex flex-col space-y-3">
      <h2 className="text-lg font-bold">Customer Care</h2>
      <ul className="space-y-1">
        <li><a href="/privacy-policy" className="block py-1 text-sm text-gray-400 hover:text-white transition-colors">Privacy Policy</a></li>
        <li><a href="/FAQ" className="block py-1 text-sm text-gray-400 hover:text-white transition-colors">FAQ</a></li>
        <li><a href="/terms-conditions" className="block py-1 text-sm text-gray-400 hover:text-white transition-colors">Terms and Conditions</a></li>
      </ul>
    </div>

    {/* Contact Us Section */}
    <div className="flex flex-col space-y-3">
      <h2 className="text-lg font-bold">Contact us</h2>
      <ul className="space-y-2">
        <li>
          <a href="#" className="flex items-start space-x-2 text-sm text-gray-400 hover:text-white transition-colors">
            <MapPinPlus size={16} className="shrink-0 mt-0.5" />
            <span>Bin Shabib Mail, Baghdad Street<br />Al Qusais, Dubai, UAE</span>
          </a>
        </li>
        <li>
          <a href="mailto:marketplace@afraeurope.com" className="flex items-center space-x-2 text-sm text-gray-400 hover:text-white transition-colors">
            <Mail size={16} className="shrink-0" />
            <span>marketplace@afraeurope.com</span>
          </a>
        </li>
        <li>
          <a href="tel:+971 58 501 5393" className="flex items-center space-x-2 text-sm text-gray-400 hover:text-white transition-colors">
            <PhoneCall size={16} className="shrink-0" />
            <span>+971 58 501 5393</span>
          </a>
        </li>
      </ul>
    </div>

  </footer>

  {/* Divider & Copyright */}
  <hr className="border-gray-800" />
  <div className="py-4">
    <p className="text-center text-gray-400 text-sm">© 2026 Afra. All rights reserved.</p>
  </div>
</div>
    )
}