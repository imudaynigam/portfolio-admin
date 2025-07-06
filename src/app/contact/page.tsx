"use client";
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { supabase } from '@/lib/supabaseClient';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);
    const { name, email, message } = form;
    if (!name || !email || !message) {
      setError('Please fill in all fields.');
      setLoading(false);
      return;
    }
    const { error } = await supabase.from('messages').insert([{ name, email, message }]);
    if (error) {
      setError('Something went wrong. Please try again.');
    } else {
      setSuccess(true);
      setForm({ name: '', email: '', message: '' });
    }
    setLoading(false);
  }

  return (
    <main className="container mx-auto py-12 px-4 max-w-lg">
      <h1 className="text-4xl font-bold mb-8 text-center">Contact</h1>
      <form className="flex flex-col gap-4 bg-white rounded-xl shadow-lg p-6" onSubmit={handleSubmit}>
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          type="text"
          placeholder="Your Name"
          required
          value={form.name}
          onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
          autoFocus
        />
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="you@example.com"
          required
          value={form.email}
          onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
        />
        <Label htmlFor="message">Message</Label>
        <Textarea
          id="message"
          placeholder="Your message..."
          required
          value={form.message}
          onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
          rows={5}
        />
        <Button type="submit" className="w-full mt-2" disabled={loading}>
          {loading ? 'Sending...' : 'Send Message'}
        </Button>
        {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
        {success && <div className="text-green-600 text-sm mt-2">Message sent! Thank you.</div>}
      </form>
    </main>
  );
} 