"use client";
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { usePathname } from 'next/navigation';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/services', label: 'Services' },
  { href: '/portfolio', label: 'Portfolio' },
  { href: '/testimonials', label: 'Testimonials' },
  { href: '/blogs', label: 'Blogs' },
  { href: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const pathname = usePathname();
  return (
    <nav className="w-full bg-white/80 backdrop-blur border-b border-gray-200 shadow-sm sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between py-3 px-4">
        <Link href="/" className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-500 bg-clip-text text-transparent">
          Uday Nigam
        </Link>
        <div className="hidden md:flex gap-6">
          {navLinks.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className={`font-medium hover:text-purple-600 transition-colors ${pathname === link.href ? 'text-purple-600' : 'text-gray-700'}`}
            >
              {link.label}
            </Link>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <Link href="/admin">
            <Avatar>
              <AvatarImage src="https://ipfcwnngxwyeqferqmpg.supabase.co/storage/v1/object/public/profile-picture//UdayNigam.jpeg" alt="Uday Nigam" />
              <AvatarFallback>UN</AvatarFallback>
            </Avatar>
          </Link>
        </div>
      </div>
    </nav>
  );
} 