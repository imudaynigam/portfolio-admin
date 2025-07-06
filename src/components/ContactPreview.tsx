"use client";
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabaseClient";

export default function ContactPreview() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setSuccess("");
    setError("");
    const { error } = await supabase.from("messages").insert({ name, email, message });
    setLoading(false);
    if (error) {
      setError("Failed to send message. Please try again.");
    } else {
      setSuccess("Message sent successfully!");
      setName("");
      setEmail("");
      setMessage("");
    }
  }

  return (
    <section className="w-full max-w-xl mx-auto py-12 text-center" id="contact">
      <h2 className="text-2xl md:text-3xl font-bold mb-6">Contact Me</h2>
      <form className="bg-white/80 rounded-xl shadow p-6 flex flex-col gap-4 items-center" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          className="w-full px-4 py-2 rounded border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-300"
          required
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          className="w-full px-4 py-2 rounded border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-300"
          required
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <textarea
          name="message"
          placeholder="Your Message"
          rows={4}
          className="w-full px-4 py-2 rounded border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-300"
          required
          value={message}
          onChange={e => setMessage(e.target.value)}
        />
        <Button type="submit" className="w-full bg-gradient-to-r from-blue-600 to-purple-500 text-white" disabled={loading}>
          {loading ? "Sending..." : "Send Message"}
        </Button>
        {success && <div className="text-green-600 text-sm mt-2">{success}</div>}
        {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
      </form>
    </section>
  );
} 