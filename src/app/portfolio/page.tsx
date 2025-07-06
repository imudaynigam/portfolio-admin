"use client";
import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

export default function PortfolioPage() {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProjects() {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false });
      if (!error && data) setProjects(data);
      setLoading(false);
    }
    fetchProjects();
  }, []);

  return (
    <main className="container mx-auto py-12 px-4">
      <h1 className="text-4xl font-bold mb-8 text-center">Portfolio</h1>
      {loading ? (
        <div className="text-center py-12">Loading...</div>
      ) : projects.length === 0 ? (
        <div className="text-center text-gray-500 py-12">No projects found.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {projects.map((project, i) => (
            <div key={project.id || i} className="bg-white rounded-xl shadow-md p-4 flex flex-col transition-all duration-300 hover:scale-105 hover:shadow-lg">
              {project.image_url && (
                <div className="aspect-w-16 aspect-h-9 mb-3 overflow-hidden rounded-lg">
                  <img src={project.image_url} alt={project.title} className="object-cover w-full h-full" />
                </div>
              )}
              <h2 className="font-semibold text-lg mb-1">{project.title}</h2>
              <p className="text-gray-600 text-sm mb-2 line-clamp-2">{project.description}</p>
              <div className="flex gap-2 flex-wrap text-xs text-gray-500 mb-2">
                {project.tech_stack && Array.isArray(project.tech_stack)
                  ? project.tech_stack.map((t: string, j: number) => (
                      <span key={j} className="bg-blue-100 px-2 py-0.5 rounded-full">{t}</span>
                    ))
                  : null}
              </div>
              <div className="mt-auto flex gap-2">
                {project.github_url && (
                  <a href={project.github_url} target="_blank" rel="noopener" className="underline text-blue-600">GitHub</a>
                )}
                {project.live_url && (
                  <a href={project.live_url} target="_blank" rel="noopener" className="underline text-green-600">Live Demo</a>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
} 