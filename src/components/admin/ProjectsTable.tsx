"use client";
import React, { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Button } from "@/components/ui/button";

export default function ProjectsTable() {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({
    title: "",
    description: "",
    tech_stack: "",
    image_url: "",
    github_url: "",
    live_url: ""
  });
  const [formLoading, setFormLoading] = useState(false);
  const [formError, setFormError] = useState("");

  async function fetchProjects() {
    setLoading(true);
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false });
    if (!error && data) setProjects(data);
    setLoading(false);
  }

  useEffect(() => {
    fetchProjects();
  }, []);

  async function handleAddProject(e: React.FormEvent) {
    e.preventDefault();
    setFormLoading(true);
    setFormError("");
    const { error } = await supabase.from('projects').insert({
      title: form.title,
      description: form.description,
      tech_stack: form.tech_stack.split(',').map((t) => t.trim()),
      image_url: form.image_url,
      github_url: form.github_url,
      live_url: form.live_url
    });
    setFormLoading(false);
    if (error) {
      setFormError(error.message);
    } else {
      setShowModal(false);
      setForm({ title: "", description: "", tech_stack: "", image_url: "", github_url: "", live_url: "" });
      fetchProjects();
    }
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Projects</h2>
        <Button onClick={() => setShowModal(true)}>Add Project</Button>
      </div>
      {loading ? (
        <div>Loading...</div>
      ) : projects.length === 0 ? (
        <div className="text-gray-400 text-center">No projects found.</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border text-sm">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2 border">Title</th>
                <th className="p-2 border">Tech Stack</th>
                <th className="p-2 border">Created</th>
                <th className="p-2 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project) => (
                <tr key={project.id}>
                  <td className="p-2 border font-medium">{project.title}</td>
                  <td className="p-2 border">{project.tech_stack?.join(", ")}</td>
                  <td className="p-2 border">{project.created_at ? new Date(project.created_at).toLocaleDateString() : ''}</td>
                  <td className="p-2 border">
                    <Button size="sm" variant="outline" className="mr-2">Edit</Button>
                    <Button size="sm" variant="destructive">Delete</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {/* Modal for Add Project */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md relative">
            <button className="absolute top-2 right-3 text-xl" onClick={() => setShowModal(false)}>&times;</button>
            <h3 className="text-lg font-bold mb-4">Add Project</h3>
            <form className="flex flex-col gap-3" onSubmit={handleAddProject}>
              <input
                type="text"
                placeholder="Title"
                className="border rounded px-3 py-2"
                required
                value={form.title}
                onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
              />
              <textarea
                placeholder="Description"
                className="border rounded px-3 py-2"
                value={form.description}
                onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
              />
              <input
                type="text"
                placeholder="Tech Stack (comma separated)"
                className="border rounded px-3 py-2"
                value={form.tech_stack}
                onChange={e => setForm(f => ({ ...f, tech_stack: e.target.value }))}
              />
              <input
                type="text"
                placeholder="Image URL"
                className="border rounded px-3 py-2"
                value={form.image_url}
                onChange={e => setForm(f => ({ ...f, image_url: e.target.value }))}
              />
              <input
                type="text"
                placeholder="GitHub URL"
                className="border rounded px-3 py-2"
                value={form.github_url}
                onChange={e => setForm(f => ({ ...f, github_url: e.target.value }))}
              />
              <input
                type="text"
                placeholder="Live URL"
                className="border rounded px-3 py-2"
                value={form.live_url}
                onChange={e => setForm(f => ({ ...f, live_url: e.target.value }))}
              />
              <Button type="submit" className="w-full mt-2" disabled={formLoading}>
                {formLoading ? "Adding..." : "Add Project"}
              </Button>
              {formError && <div className="text-red-500 text-sm mt-2">{formError}</div>}
            </form>
          </div>
        </div>
      )}
    </div>
  );
} 