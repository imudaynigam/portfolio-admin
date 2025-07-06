"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabaseClient';

export default function BlogsPage() {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBlogs() {
      const { data, error } = await supabase
        .from('blogs')
        .select('*')
        .order('created_at', { ascending: false });
      if (!error && data) setBlogs(data);
      setLoading(false);
    }
    fetchBlogs();
  }, []);

  return (
    <main className="container mx-auto py-12 px-4">
      <h1 className="text-4xl font-bold mb-8 text-center">Blogs</h1>
      {loading ? (
        <div className="text-center py-12">Loading...</div>
      ) : blogs.length === 0 ? (
        <div className="text-center text-gray-500 py-12">No blogs found.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {blogs.map((blog, i) => (
            <div key={blog.id || i} className="bg-white rounded-xl shadow-md p-4 flex flex-col transition-all duration-300 hover:scale-105 hover:shadow-lg">
              {blog.cover_url && (
                <div className="aspect-w-16 aspect-h-9 mb-3 overflow-hidden rounded-lg">
                  <img src={blog.cover_url} alt={`Cover image for blog: ${blog.title}`} className="object-cover w-full h-full" />
                </div>
              )}
              <h2 className="font-semibold text-lg mb-1">{blog.title}</h2>
              <p className="text-gray-600 text-sm mb-2 line-clamp-2">{blog.summary}</p>
              <div className="mt-auto flex gap-2">
                <Link href={`/blogs/${blog.id}`} className="underline text-blue-600">Read More</Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
} 