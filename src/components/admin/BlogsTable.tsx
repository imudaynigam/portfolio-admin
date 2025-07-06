"use client";
import React, { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Button } from "@/components/ui/button";

export default function BlogsTable() {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editBlog, setEditBlog] = useState<any | null>(null);
  const [form, setForm] = useState({
    title: "",
    content: "",
    cover_image_url: "",
    tags: "",
    published_at: ""
  });
  const [formLoading, setFormLoading] = useState(false);
  const [formError, setFormError] = useState("");
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  async function fetchBlogs() {
    setLoading(true);
    const { data, error } = await supabase
      .from('blogs')
      .select('*')
      .order('published_at', { ascending: false });
    if (!error && data) setBlogs(data);
    setLoading(false);
  }

  useEffect(() => {
    fetchBlogs();
  }, []);

  function openAddModal() {
    setEditBlog(null);
    setForm({ title: "", content: "", cover_image_url: "", tags: "", published_at: "" });
    setShowModal(true);
  }

  function openEditModal(blog: any) {
    setEditBlog(blog);
    setForm({
      title: blog.title || "",
      content: blog.content || "",
      cover_image_url: blog.cover_image_url || "",
      tags: (blog.tags || []).join(", "),
      published_at: blog.published_at ? blog.published_at.slice(0, 10) : ""
    });
    setShowModal(true);
  }

  async function handleAddOrEditBlog(e: React.FormEvent) {
    e.preventDefault();
    setFormLoading(true);
    setFormError("");
    const blogData = {
      title: form.title,
      content: form.content,
      cover_image_url: form.cover_image_url,
      tags: form.tags.split(',').map((t) => t.trim()),
      published_at: form.published_at ? new Date(form.published_at).toISOString() : null
    };
    if (editBlog) {
      // Edit
      const { error } = await supabase.from('blogs').update(blogData).eq('id', editBlog.id);
      setFormLoading(false);
      if (error) {
        setFormError(error.message);
      } else {
        setShowModal(false);
        setEditBlog(null);
        setForm({ title: "", content: "", cover_image_url: "", tags: "", published_at: "" });
        fetchBlogs();
      }
    } else {
      // Add
      const { error } = await supabase.from('blogs').insert(blogData);
      setFormLoading(false);
      if (error) {
        setFormError(error.message);
      } else {
        setShowModal(false);
        setForm({ title: "", content: "", cover_image_url: "", tags: "", published_at: "" });
        fetchBlogs();
      }
    }
  }

  async function handleDeleteBlog(id: string) {
    setDeleteLoading(true);
    await supabase.from('blogs').delete().eq('id', id);
    setDeleteLoading(false);
    setDeleteId(null);
    fetchBlogs();
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Blogs</h2>
        <Button onClick={openAddModal}>Add Blog</Button>
      </div>
      {loading ? (
        <div>Loading...</div>
      ) : blogs.length === 0 ? (
        <div className="text-gray-400 text-center">No blogs found.</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border text-sm">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2 border">Title</th>
                <th className="p-2 border">Published</th>
                <th className="p-2 border">Tags</th>
                <th className="p-2 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {blogs.map((blog) => (
                <tr key={blog.id}>
                  <td className="p-2 border font-medium">{blog.title}</td>
                  <td className="p-2 border">{blog.published_at ? new Date(blog.published_at).toLocaleDateString() : ''}</td>
                  <td className="p-2 border">{blog.tags?.join(", ")}</td>
                  <td className="p-2 border">
                    <Button size="sm" variant="outline" className="mr-2" onClick={() => openEditModal(blog)}>Edit</Button>
                    <Button size="sm" variant="destructive" onClick={() => setDeleteId(blog.id)}>Delete</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {/* Modal for Add/Edit Blog */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md relative">
            <button className="absolute top-2 right-3 text-xl" onClick={() => { setShowModal(false); setEditBlog(null); }}>&times;</button>
            <h3 className="text-lg font-bold mb-4">{editBlog ? "Edit Blog" : "Add Blog"}</h3>
            <form className="flex flex-col gap-3" onSubmit={handleAddOrEditBlog}>
              <input
                type="text"
                placeholder="Title"
                className="border rounded px-3 py-2"
                required
                value={form.title}
                onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
              />
              <textarea
                placeholder="Content"
                className="border rounded px-3 py-2"
                value={form.content}
                onChange={e => setForm(f => ({ ...f, content: e.target.value }))}
              />
              <input
                type="text"
                placeholder="Cover Image URL"
                className="border rounded px-3 py-2"
                value={form.cover_image_url}
                onChange={e => setForm(f => ({ ...f, cover_image_url: e.target.value }))}
              />
              <input
                type="text"
                placeholder="Tags (comma separated)"
                className="border rounded px-3 py-2"
                value={form.tags}
                onChange={e => setForm(f => ({ ...f, tags: e.target.value }))}
              />
              <input
                type="date"
                placeholder="Published At"
                className="border rounded px-3 py-2"
                value={form.published_at}
                onChange={e => setForm(f => ({ ...f, published_at: e.target.value }))}
              />
              <Button type="submit" className="w-full mt-2" disabled={formLoading}>
                {formLoading ? (editBlog ? "Saving..." : "Adding...") : (editBlog ? "Save Changes" : "Add Blog")}
              </Button>
              {formError && <div className="text-red-500 text-sm mt-2">{formError}</div>}
            </form>
          </div>
        </div>
      )}
      {/* Delete confirmation */}
      {deleteId && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-sm text-center">
            <h3 className="text-lg font-bold mb-4">Delete Blog?</h3>
            <p className="mb-6">Are you sure you want to delete this blog? This action cannot be undone.</p>
            <div className="flex gap-4 justify-center">
              <Button variant="outline" onClick={() => setDeleteId(null)}>Cancel</Button>
              <Button variant="destructive" onClick={() => handleDeleteBlog(deleteId!)} disabled={deleteLoading}>
                {deleteLoading ? "Deleting..." : "Delete"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 