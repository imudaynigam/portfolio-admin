"use client";
import React, { useEffect, useState } from "react";
import Link from 'next/link';
import { supabase } from "@/lib/supabaseClient";

export default function BlogPreview() {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBlogs() {
      const { data, error } = await supabase
        .from('blogs')
        .select('*')
        .order('published_at', { ascending: false })
        .limit(2);
      if (!error && data) setBlogs(data);
      setLoading(false);
    }
    fetchBlogs();
  }, []);

  return (
    <section className="w-full max-w-3xl mx-auto py-12 text-center">
      <h2 className="text-2xl md:text-3xl font-bold mb-8">Latest Blogs</h2>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="flex flex-col md:flex-row gap-6 justify-center">
          {blogs.map((blog, i) => (
            <div key={blog.id || i} className="flex-1 bg-white/80 rounded-xl shadow p-6 flex flex-col items-center">
              <div className="text-lg font-semibold mb-1">{blog.title}</div>
              <div className="text-xs text-gray-500 mb-2">{blog.published_at ? new Date(blog.published_at).toLocaleDateString() : ''}</div>
            </div>
          ))}
        </div>
      )}
      <Link href="/blogs" className="inline-block mt-6 text-purple-600 font-medium hover:underline">Read All Blogs</Link>
    </section>
  );
} 