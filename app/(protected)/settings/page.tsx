// app/settings/page.tsx
'use client';

import React, { useEffect, useState } from 'react';
import { createClient } from '../../lib/supabase/Client';

const defaultValues = {
  applied: 7,
  interview: 4,
  offer: 2,
};

export default function SettingsPage() {
  const supabase = createClient();
  const [reminders, setReminders] = useState(defaultValues);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const fetchSettings = async () => {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) return;
      setUserId(user.id);

      const { data, error } = await supabase
        .from('custom_reminders')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (data) {
        setReminders({
          applied: data.applied || 7,
          interview: data.interview || 4,
          offer: data.offer || 2,
        });
      }
      setLoading(false);
    };

    fetchSettings();
  }, []);

  const handleChange = (key: keyof typeof defaultValues, value: number) => {
    setReminders((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = async () => {
    if (!userId) return;

    const { error } = await supabase
      .from('custom_reminders')
      .upsert({ user_id: userId, ...reminders });

    if (error) {
      alert('Failed to save');
    } else {
      alert('Settings saved');
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">⚙️ Settings</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="space-y-4">
          <div>
            <label className="block font-medium">Follow-up after Applied (days)</label>
            <input
              type="number"
              min={1}
              value={reminders.applied}
              onChange={(e) => handleChange('applied', +e.target.value)}
              className="w-full border rounded px-3 py-2"
            />
          </div>
          <div>
            <label className="block font-medium">Follow-up after Interview (days)</label>
            <input
              type="number"
              min={1}
              value={reminders.interview}
              onChange={(e) => handleChange('interview', +e.target.value)}
              className="w-full border rounded px-3 py-2"
            />
          </div>
          <div>
            <label className="block font-medium">Follow-up after Offer (days)</label>
            <input
              type="number"
              min={1}
              value={reminders.offer}
              onChange={(e) => handleChange('offer', +e.target.value)}
              className="w-full border rounded px-3 py-2"
            />
          </div>
          <button
            onClick={handleSave}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Save Settings
          </button>
        </div>
      )}
    </div>
  );
}
