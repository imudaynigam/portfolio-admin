"use client";
import React, { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Button } from "@/components/ui/button";

export default function TestimonialsTable() {
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editTestimonial, setEditTestimonial] = useState<any | null>(null);
  const [form, setForm] = useState({
    client_name: "",
    client_role: "",
    company: "",
    review: "",
    rating: "",
    avatar_url: ""
  });
  const [formLoading, setFormLoading] = useState(false);
  const [formError, setFormError] = useState("");
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  async function fetchTestimonials() {
    setLoading(true);
    const { data, error } = await supabase
      .from('testimonials')
      .select('*')
      .order('created_at', { ascending: false });
    if (!error && data) setTestimonials(data);
    setLoading(false);
  }

  useEffect(() => {
    fetchTestimonials();
  }, []);

  function openAddModal() {
    setEditTestimonial(null);
    setForm({ client_name: "", client_role: "", company: "", review: "", rating: "", avatar_url: "" });
    setShowModal(true);
  }

  function openEditModal(testimonial: any) {
    setEditTestimonial(testimonial);
    setForm({
      client_name: testimonial.client_name || "",
      client_role: testimonial.client_role || "",
      company: testimonial.company || "",
      review: testimonial.review || "",
      rating: testimonial.rating ? String(testimonial.rating) : "",
      avatar_url: testimonial.avatar_url || ""
    });
    setShowModal(true);
  }

  async function handleAddOrEditTestimonial(e: React.FormEvent) {
    e.preventDefault();
    setFormLoading(true);
    setFormError("");
    if (editTestimonial) {
      // Edit
      const { error } = await supabase.from('testimonials').update({
        client_name: form.client_name,
        client_role: form.client_role,
        company: form.company,
        review: form.review,
        rating: form.rating ? parseInt(form.rating) : null,
        avatar_url: form.avatar_url
      }).eq('id', editTestimonial.id);
      setFormLoading(false);
      if (error) {
        setFormError(error.message);
      } else {
        setShowModal(false);
        setEditTestimonial(null);
        setForm({ client_name: "", client_role: "", company: "", review: "", rating: "", avatar_url: "" });
        fetchTestimonials();
      }
    } else {
      // Add
      const { error } = await supabase.from('testimonials').insert({
        client_name: form.client_name,
        client_role: form.client_role,
        company: form.company,
        review: form.review,
        rating: form.rating ? parseInt(form.rating) : null,
        avatar_url: form.avatar_url
      });
      setFormLoading(false);
      if (error) {
        setFormError(error.message);
      } else {
        setShowModal(false);
        setForm({ client_name: "", client_role: "", company: "", review: "", rating: "", avatar_url: "" });
        fetchTestimonials();
      }
    }
  }

  async function handleDeleteTestimonial(id: string) {
    setDeleteLoading(true);
    await supabase.from('testimonials').delete().eq('id', id);
    setDeleteLoading(false);
    setDeleteId(null);
    fetchTestimonials();
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Testimonials</h2>
        <Button onClick={openAddModal}>Add Testimonial</Button>
      </div>
      {loading ? (
        <div>Loading...</div>
      ) : testimonials.length === 0 ? (
        <div className="text-gray-400 text-center">No testimonials found.</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border text-sm">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2 border">Name</th>
                <th className="p-2 border">Company</th>
                <th className="p-2 border">Review</th>
                <th className="p-2 border">Rating</th>
                <th className="p-2 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {testimonials.map((t) => (
                <tr key={t.id}>
                  <td className="p-2 border font-medium">{t.client_name}</td>
                  <td className="p-2 border">{t.company}</td>
                  <td className="p-2 border max-w-xs truncate">{t.review}</td>
                  <td className="p-2 border">{t.rating}</td>
                  <td className="p-2 border">
                    <Button size="sm" variant="outline" className="mr-2" onClick={() => openEditModal(t)}>Edit</Button>
                    <Button size="sm" variant="destructive" onClick={() => setDeleteId(t.id)}>Delete</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {/* Modal for Add/Edit Testimonial */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md relative">
            <button className="absolute top-2 right-3 text-xl" onClick={() => { setShowModal(false); setEditTestimonial(null); }}>&times;</button>
            <h3 className="text-lg font-bold mb-4">{editTestimonial ? "Edit Testimonial" : "Add Testimonial"}</h3>
            <form className="flex flex-col gap-3" onSubmit={handleAddOrEditTestimonial}>
              <input
                type="text"
                placeholder="Client Name"
                className="border rounded px-3 py-2"
                required
                value={form.client_name}
                onChange={e => setForm(f => ({ ...f, client_name: e.target.value }))}
              />
              <input
                type="text"
                placeholder="Client Role"
                className="border rounded px-3 py-2"
                value={form.client_role}
                onChange={e => setForm(f => ({ ...f, client_role: e.target.value }))}
              />
              <input
                type="text"
                placeholder="Company"
                className="border rounded px-3 py-2"
                value={form.company}
                onChange={e => setForm(f => ({ ...f, company: e.target.value }))}
              />
              <textarea
                placeholder="Review"
                className="border rounded px-3 py-2"
                value={form.review}
                onChange={e => setForm(f => ({ ...f, review: e.target.value }))}
              />
              <input
                type="number"
                placeholder="Rating (1-5)"
                className="border rounded px-3 py-2"
                min={1}
                max={5}
                value={form.rating}
                onChange={e => setForm(f => ({ ...f, rating: e.target.value }))}
              />
              <input
                type="text"
                placeholder="Avatar URL"
                className="border rounded px-3 py-2"
                value={form.avatar_url}
                onChange={e => setForm(f => ({ ...f, avatar_url: e.target.value }))}
              />
              <Button type="submit" className="w-full mt-2" disabled={formLoading}>
                {formLoading ? (editTestimonial ? "Saving..." : "Adding...") : (editTestimonial ? "Save Changes" : "Add Testimonial")}
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
            <h3 className="text-lg font-bold mb-4">Delete Testimonial?</h3>
            <p className="mb-6">Are you sure you want to delete this testimonial? This action cannot be undone.</p>
            <div className="flex gap-4 justify-center">
              <Button variant="outline" onClick={() => setDeleteId(null)}>Cancel</Button>
              <Button variant="destructive" onClick={() => handleDeleteTestimonial(deleteId!)} disabled={deleteLoading}>
                {deleteLoading ? "Deleting..." : "Delete"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 