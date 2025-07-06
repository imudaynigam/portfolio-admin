"use client";
import React, { useEffect, useState } from "react";
import Link from 'next/link';
import { supabase } from "@/lib/supabaseClient";

export default function TestimonialsPreview() {
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTestimonials() {
      const { data, error } = await supabase
        .from('testimonials')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(2);
      if (!error && data) setTestimonials(data);
      setLoading(false);
    }
    fetchTestimonials();
  }, []);

  return (
    <section className="w-full max-w-4xl mx-auto py-12 text-center">
      <h2 className="text-2xl md:text-3xl font-bold mb-8">Client Testimonials</h2>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="flex flex-col md:flex-row gap-6 justify-center">
          {testimonials.map((t, i) => (
            <div key={t.id || i} className="flex-1 bg-white/80 rounded-xl shadow p-6 flex flex-col items-center">
              {t.avatar_url && (
                <img src={t.avatar_url} alt={t.name} className="w-16 h-16 rounded-full mb-3 object-cover" />
              )}
              <p className="text-gray-600 italic mb-2">"{t.review}"</p>
              <div className="font-semibold text-purple-700">{t.client_name}</div>
              <div className="text-xs text-gray-500">{t.company}</div>
            </div>
          ))}
        </div>
      )}
      <Link href="/testimonials" className="inline-block mt-6 text-purple-600 font-medium hover:underline">Read More Testimonials</Link>
    </section>
  );
} 