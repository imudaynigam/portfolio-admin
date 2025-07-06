"use client";
import React, { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Button } from "@/components/ui/button";

export default function MessagesTable() {
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  async function fetchMessages() {
    setLoading(true);
    const { data, error } = await supabase
      .from('messages')
      .select('*')
      .order('created_at', { ascending: false });
    if (!error && data) setMessages(data);
    setLoading(false);
  }

  useEffect(() => {
    fetchMessages();
  }, []);

  async function handleDeleteMessage(id: string) {
    setDeleteLoading(true);
    await supabase.from('messages').delete().eq('id', id);
    setDeleteLoading(false);
    setDeleteId(null);
    fetchMessages();
  }

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Messages</h2>
      {loading ? (
        <div>Loading...</div>
      ) : messages.length === 0 ? (
        <div className="text-gray-400 text-center">No messages found.</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border text-sm">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2 border">Name</th>
                <th className="p-2 border">Email</th>
                <th className="p-2 border">Message</th>
                <th className="p-2 border">Date</th>
                <th className="p-2 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {messages.map((msg) => (
                <tr key={msg.id}>
                  <td className="p-2 border font-medium">{msg.name}</td>
                  <td className="p-2 border">{msg.email}</td>
                  <td className="p-2 border max-w-xs truncate">{msg.message}</td>
                  <td className="p-2 border">{msg.created_at ? new Date(msg.created_at).toLocaleDateString() : ''}</td>
                  <td className="p-2 border">
                    <Button size="sm" variant="destructive" onClick={() => setDeleteId(msg.id)}>Delete</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {/* Delete confirmation */}
      {deleteId && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-sm text-center">
            <h3 className="text-lg font-bold mb-4">Delete Message?</h3>
            <p className="mb-6">Are you sure you want to delete this message? This action cannot be undone.</p>
            <div className="flex gap-4 justify-center">
              <Button variant="outline" onClick={() => setDeleteId(null)}>Cancel</Button>
              <Button variant="destructive" onClick={() => handleDeleteMessage(deleteId!)} disabled={deleteLoading}>
                {deleteLoading ? "Deleting..." : "Delete"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 