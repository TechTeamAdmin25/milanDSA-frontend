import Link from 'next/link'
import { Facebook, Twitter, Instagram, Youtube, Mail, MapPin, Phone } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-neutral-950 text-white border-t border-white/10 pt-20 pb-10">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 mb-16">
          {/* Brand & Slogan */}
          <div className="lg:col-span-4 space-y-6">
            <Link href="/" className="inline-block">
              <span className="text-4xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
                MILAN &apos;26
              </span>
            </Link>
            <p className="text-xl md:text-2xl font-light text-neutral-300 leading-relaxed max-w-sm">
              Live the moment. <br />
              <span className="text-white font-medium">Relive the memories.</span>
            </p>
            <div className="flex gap-4">
              <SocialLink href="#" icon={<Instagram size={20} />} />
              <SocialLink href="#" icon={<Twitter size={20} />} />
              <SocialLink href="#" icon={<Facebook size={20} />} />
              <SocialLink href="#" icon={<Youtube size={20} />} />
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2 space-y-6">
            <h4 className="text-lg font-semibold text-white">Explore</h4>
            <ul className="space-y-4 text-neutral-400">
              <FooterLink href="/events">Events</FooterLink>
              <FooterLink href="/gallery">Gallery</FooterLink>
              <FooterLink href="/sponsors">Sponsors</FooterLink>
              <FooterLink href="/team">Our Team</FooterLink>
            </ul>
          </div>

          {/* Legal */}
          <div className="lg:col-span-2 space-y-6">
            <h4 className="text-lg font-semibold text-white">Legal</h4>
            <ul className="space-y-4 text-neutral-400">
              <FooterLink href="#">Privacy Policy</FooterLink>
              <FooterLink href="#">Terms of Service</FooterLink>
              <FooterLink href="#">Code of Conduct</FooterLink>
            </ul>
          </div>

           {/* Contact */}
           <div className="lg:col-span-4 space-y-6">
            <h4 className="text-lg font-semibold text-white">Contact Us</h4>
            <ul className="space-y-6 text-neutral-400">
              <li className="flex items-start gap-4">
                <MapPin className="text-purple-400 shrink-0 mt-1" size={20} />
                <span>
                 SRM Institute of Science and Technology, <br />
                 Kattankulathur, Chennai, <br />
                 Tamil Nadu - 603203
                </span>
              </li>
              <li className="flex items-center gap-4">
                <Phone className="text-purple-400 shrink-0" size={20} />
                <span>+91 98765 43210</span>
              </li>
              <li className="flex items-center gap-4">
                <Mail className="text-purple-400 shrink-0" size={20} />
                <span>contact@milan2026.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4 text-neutral-500 text-sm">
          <p>© 2026 Directorate of Student Affairs, SRMIST. All rights reserved.</p>
          <p>Designed & Developed by Milan Tech Team</p>
        </div>
      </div>
    </footer>
  )
}

function SocialLink({ href, icon }: { href: string; icon: React.ReactNode }) {
  return (
    <a 
      href={href} 
      className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-neutral-400 hover:text-white hover:bg-purple-500/20 hover:border-purple-500/50 transition-all duration-300"
    >
      {icon}
    </a>
  )
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <Link href={href} className="hover:text-purple-400 transition-colors">
        {children}
      </Link>
    </li>
  )
}
