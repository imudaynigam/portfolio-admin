"use client";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Toaster } from "@/components/ui/sonner";

export default function ClientLayoutWrapper({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Toaster />
      <Navbar />
      <div className="min-h-[80vh]">{children}</div>
      <Footer />
    </>
  );
} 