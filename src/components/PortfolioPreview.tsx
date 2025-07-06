"use client";
import React, { useEffect, useState } from "react";
import Link from 'next/link';
import { supabase } from "@/lib/supabaseClient";

export default function PortfolioPreview() {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProjects() {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(2);
      if (!error && data) setProjects(data);
      setLoading(false);
    }
    fetchProjects();
  }, []);

  return (
    <section className="w-full max-w-5xl mx-auto py-12 text-center">
      <h2 className="text-2xl md:text-3xl font-bold mb-8">My Portfolio</h2>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="flex flex-col md:flex-row gap-6 justify-center">
          {projects.map((project, i) => (
            <div key={project.id || i} className="flex-1 bg-white/80 rounded-xl shadow p-4 flex flex-col items-center">
              {project.image_url && (
                <img src={project.image_url} alt={project.title} className="rounded-lg w-full h-40 object-cover mb-3" />
              )}
              <h3 className="text-lg font-semibold mb-1">{project.title}</h3>
              <div className="flex flex-wrap gap-2 justify-center text-xs text-gray-500 mb-2">
                {project.tech_stack && project.tech_stack.map((tech: string, j: number) => (
                  <span key={j} className="bg-gray-100 rounded px-2 py-0.5">{tech}</span>
                ))}
              </div>
              {project.description && <p className="text-gray-500 text-sm mb-2">{project.description}</p>}
              {project.github_url && (
                <a href={project.github_url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline text-xs mr-2">GitHub</a>
              )}
              {project.live_url && (
                <a href={project.live_url} target="_blank" rel="noopener noreferrer" className="text-green-600 hover:underline text-xs">Live</a>
              )}
            </div>
          ))}
        </div>
      )}
      <Link href="/portfolio" className="inline-block mt-6 text-purple-600 font-medium hover:underline">View All Projects</Link>
    </section>
  );
} 