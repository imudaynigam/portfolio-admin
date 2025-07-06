"use client";
import Link from 'next/link';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="w-full bg-white/80 border-t border-gray-200 py-4 mt-10">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between px-4">
        <span className="text-gray-500 text-sm">&copy; {year} Uday Nigam. All rights reserved.</span>
        <div className="flex gap-4 mt-2 md:mt-0">
          <Link href="/privacy" className="text-gray-500 hover:text-purple-600 text-sm">Privacy</Link>
          <Link href="/terms" className="text-gray-500 hover:text-purple-600 text-sm">Terms</Link>
        </div>
      </div>
    </footer>
  );
} 