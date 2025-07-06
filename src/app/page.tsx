import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import AboutPreview from "../components/AboutPreview";
import ServicesPreview from "../components/ServicesPreview";
import PortfolioPreview from "../components/PortfolioPreview";
import TestimonialsPreview from "../components/TestimonialsPreview";
import BlogPreview from "../components/BlogPreview";
import ContactPreview from "../components/ContactPreview";

export default function Home() {
  return (
    <>
      <main className="flex flex-col items-center justify-center min-h-[80vh] px-4 py-16 text-center bg-gradient-to-br from-blue-50 via-purple-50 to-white">
        <span className="inline-block px-4 py-1 mb-4 rounded-full bg-blue-100 text-blue-700 text-xs font-semibold shadow-sm">
          Professional Freelancer & Full Stack Developer
        </span>
        <h1 className="text-5xl md:text-6xl font-extrabold mb-4 bg-gradient-to-r from-blue-700 to-purple-600 bg-clip-text text-transparent leading-[1.1] inline-block pb-2">
          Uday Nigam
        </h1>
        <h2 className="text-xl md:text-2xl font-medium text-gray-700 mb-6">
          Transforming Ideas into Powerful Digital Solutions
        </h2>
        <p className="max-w-2xl text-gray-500 mb-8">
          Specializing in MERN Stack development, creating scalable web applications, CRM solutions, and providing comprehensive technical expertise for businesses worldwide.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 mb-10 justify-center">
          <Button asChild size="lg" className="bg-gradient-to-r from-blue-600 to-purple-500 text-white shadow-md">
            <Link href="#contact">🚀 Hire Me Now</Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <a href="https://ipfcwnngxwyeqferqmpg.supabase.co/storage/v1/object/public/profile-picture//Resume_UdayNigam.pdf" download target="_blank" rel="noopener noreferrer">⬇️ Download Resume</a>
          </Button>
        </div>
        <div className="flex flex-wrap gap-6 justify-center mt-8">
          <div className="bg-white/80 rounded-xl shadow p-6 min-w-[120px]">
            <div className="text-2xl font-bold text-blue-700">5+</div>
            <div className="text-xs text-gray-500 mt-1">Projects Completed</div>
          </div>
          <div className="bg-white/80 rounded-xl shadow p-6 min-w-[120px]">
            <div className="text-2xl font-bold text-purple-700">2+</div>
            <div className="text-xs text-gray-500 mt-1">Years Experience</div>
          </div>
          <div className="bg-white/80 rounded-xl shadow p-6 min-w-[120px]">
            <div className="text-2xl font-bold text-green-700">100%</div>
            <div className="text-xs text-gray-500 mt-1">Client Satisfaction</div>
          </div>
        </div>
      </main>
      <AboutPreview />
      <ServicesPreview />
      <PortfolioPreview />
      <TestimonialsPreview />
      <BlogPreview />
      <ContactPreview />
    </>
  );
}
