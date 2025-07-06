"use client";
import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

export default function TestimonialsPage() {
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTestimonials() {
      const { data, error } = await supabase
        .from('testimonials')
        .select('*')
        .order('created_at', { ascending: false });
      if (!error && data) setTestimonials(data);
      setLoading(false);
    }
    fetchTestimonials();
  }, []);

  return (
    <main className="container mx-auto py-12 px-4">
      <h1 className="text-4xl font-bold mb-8 text-center">Testimonials</h1>
      {loading ? (
        <div className="text-center py-12">Loading...</div>
      ) : testimonials.length === 0 ? (
        <div className="text-center text-gray-500 py-12">No testimonials found.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <div key={t.id || i} className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center text-center transition-all duration-300 hover:scale-105 hover:shadow-lg">
              {t.avatar_url && (
                <img src={t.avatar_url} alt={`Avatar of ${t.name}`} className="w-16 h-16 rounded-full object-cover mb-3 border-2 border-gray-200" />
              )}
              <p className="text-gray-700 text-base mb-2 italic">"{t.message}"</p>
              <div className="font-semibold text-sm">{t.name}</div>
              <div className="text-xs text-gray-500">{t.role}</div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
} 