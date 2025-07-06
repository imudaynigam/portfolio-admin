"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabaseClient";
import ProjectsTable from "@/components/admin/ProjectsTable";
import TestimonialsTable from "@/components/admin/TestimonialsTable";
import BlogsTable from "@/components/admin/BlogsTable";
import MessagesTable from "@/components/admin/MessagesTable";

const TABS = ["Overview", "Projects", "Testimonials", "Blogs", "Messages"];

export default function AdminPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [tab, setTab] = useState("Overview");
  const [stats, setStats] = useState({ projects: 0, testimonials: 0, blogs: 0, messages: 0 });

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) {
      setError(error.message);
    } else {
      setIsLoggedIn(true);
    }
  }

  async function handleLogout() {
    await supabase.auth.signOut();
    setIsLoggedIn(false);
  }

  // Check if already logged in (on mount)
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) setIsLoggedIn(true);
    });
  }, []);

  // Fetch stats for overview
  useEffect(() => {
    if (!isLoggedIn) return;
    async function fetchStats() {
      const [projects, testimonials, blogs, messages] = await Promise.all([
        supabase.from('projects').select('id', { count: 'exact', head: true }),
        supabase.from('testimonials').select('id', { count: 'exact', head: true }),
        supabase.from('blogs').select('id', { count: 'exact', head: true }),
        supabase.from('messages').select('id', { count: 'exact', head: true }),
      ]);
      setStats({
        projects: projects.count || 0,
        testimonials: testimonials.count || 0,
        blogs: blogs.count || 0,
        messages: messages.count || 0,
      });
    }
    fetchStats();
  }, [isLoggedIn]);

  if (!isLoggedIn) {
    return (
      <main className="flex flex-col items-center justify-center min-h-[70vh] px-4 py-16">
        <div className="w-full max-w-sm bg-white/80 rounded-xl shadow p-8">
          <h1 className="text-2xl font-bold mb-6 text-center">Admin Login</h1>
          <form className="flex flex-col gap-4" onSubmit={handleLogin}>
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              className="w-full px-4 py-2 rounded border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-300"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="w-full px-4 py-2 rounded border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-300"
              required
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
            <Button type="submit" className="w-full bg-gradient-to-r from-blue-600 to-purple-500 text-white" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </Button>
            {error && <div className="text-red-500 text-sm text-center mt-2">{error}</div>}
          </form>
        </div>
      </main>
    );
  }

  return (
    <main className="flex flex-col items-center min-h-[70vh] px-4 py-8">
      <div className="w-full max-w-4xl bg-white/80 rounded-xl shadow p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <Button onClick={handleLogout} className="bg-red-500 hover:bg-red-600 text-white">Logout</Button>
        </div>
        <div className="flex gap-2 mb-8">
          {TABS.map((t) => (
            <button
              key={t}
              className={`px-4 py-2 rounded font-medium border ${tab === t ? 'bg-purple-600 text-white' : 'bg-white text-purple-600 border-purple-200'} transition`}
              onClick={() => setTab(t)}
            >
              {t}
            </button>
          ))}
        </div>
        {tab === "Overview" && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="bg-blue-100 rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-blue-700">{stats.projects}</div>
              <div className="text-xs text-gray-500 mt-1">Projects</div>
            </div>
            <div className="bg-green-100 rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-green-700">{stats.testimonials}</div>
              <div className="text-xs text-gray-500 mt-1">Testimonials</div>
            </div>
            <div className="bg-purple-100 rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-purple-700">{stats.blogs}</div>
              <div className="text-xs text-gray-500 mt-1">Blogs</div>
            </div>
            <div className="bg-yellow-100 rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-yellow-700">{stats.messages}</div>
              <div className="text-xs text-gray-500 mt-1">Messages</div>
            </div>
          </div>
        )}
        {tab === "Projects" && <ProjectsTable />}
        {tab === "Testimonials" && <TestimonialsTable />}
        {tab === "Blogs" && <BlogsTable />}
        {tab === "Messages" && <MessagesTable />}
        {tab !== "Overview" && tab !== "Projects" && tab !== "Testimonials" && tab !== "Blogs" && (
          <div className="text-center text-gray-400 py-12">{tab} management coming soon...</div>
        )}
      </div>
    </main>
  );
} 