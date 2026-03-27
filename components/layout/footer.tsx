import Image from "next/image"
import Link from "next/link"
import { MapPin, Phone, Mail, Clock, Facebook, Instagram, Twitter } from "lucide-react"

export function Footer() {
  return (
    <footer className="w-full relative overflow-hidden">
      {/* Dark gradient background */}
      <div className="absolute inset-0 gradient-dark" />
      {/* Decorative top border */}
      <div className="absolute top-0 left-0 right-0 h-1 gradient-primary" />
      
      <div className="container relative z-10 py-12 md:py-16">
        <div className="grid md:grid-cols-4 gap-8 mb-10">
          {/* Brand column */}
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-4">
              <div className="relative w-16 h-12 overflow-hidden bg-white/5 rounded p-1">
                <Image src="/images/BalkanLogo.png" alt="Balkan Food Logo" width={64} height={48} className="object-contain" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-heading font-bold text-white leading-none">Balkan Food</span>
                <span className="text-[10px] text-white/50 tracking-widest uppercase">S.R.L</span>
              </div>
            </Link>
            <p className="text-sm text-white/60 leading-relaxed mb-6">
              Bringing the authentic taste of the Balkans to your table with premium quality ingredients and traditional products.
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-9 h-9 rounded-full bg-white/10 hover:bg-primary flex items-center justify-center text-white/70 hover:text-white transition-all duration-300">
                <Facebook className="h-4 w-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-white/10 hover:bg-primary flex items-center justify-center text-white/70 hover:text-white transition-all duration-300">
                <Instagram className="h-4 w-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-white/10 hover:bg-primary flex items-center justify-center text-white/70 hover:text-white transition-all duration-300">
                <Twitter className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Quick Links</h3>
            <ul className="space-y-2.5">
              <li><Link href="/" className="text-sm text-white/60 hover:text-amber-400 transition-colors duration-300">Home</Link></li>
              <li><Link href="/menu" className="text-sm text-white/60 hover:text-amber-400 transition-colors duration-300">Products</Link></li>
              <li><Link href="/contact" className="text-sm text-white/60 hover:text-amber-400 transition-colors duration-300">Contact Us</Link></li>
            </ul>
          </div>

          {/* Contact info */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Contact</h3>
            <ul className="space-y-2.5">
              <li className="flex items-center gap-2 text-sm text-white/60">
                <MapPin className="h-4 w-4 text-primary shrink-0" />
                123 Balkan Street, NY
              </li>
              <li className="flex items-center gap-2 text-sm text-white/60">
                <Phone className="h-4 w-4 text-primary shrink-0" />
                (123) 456-7890
              </li>
              <li className="flex items-center gap-2 text-sm text-white/60">
                <Mail className="h-4 w-4 text-primary shrink-0" />
                info@balkanfoods.com
              </li>
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Hours</h3>
            <ul className="space-y-2.5">
              <li className="flex items-center gap-2 text-sm text-white/60">
                <Clock className="h-4 w-4 text-amber-400 shrink-0" />
                Mon - Fri: 9AM - 8PM
              </li>
              <li className="flex items-center gap-2 text-sm text-white/60">
                <Clock className="h-4 w-4 text-amber-400 shrink-0" />
                Sat - Sun: 10AM - 6PM
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 pt-6 flex flex-col items-center justify-center gap-3 md:flex-row md:justify-between">
          <p className="text-center text-xs text-white/40 md:text-left">
            © {new Date().getFullYear()} Balkan Food S.R.L. All rights reserved.
          </p>
          <p className="text-center text-xs text-white/40 md:text-right">
            Developed by <span className="text-amber-400/80 font-medium">HY Consultants</span>
          </p>
        </div>
      </div>
    </footer>
  )
}
