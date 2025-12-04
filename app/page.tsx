'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://flgtxowtclkmizdpybnc.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZsZ3R4b3d0Y2xrbWl6ZHB5Ym5jIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ3NzA4NjgsImV4cCI6MjA4MDM0Njg2OH0.s5cRtYF2k3Gva4yuiMwxr_RWwoNYvBLQFhg0ceTbjU8';

const supabase = createClient(supabaseUrl, supabaseKey);

export default function Home() {
  const [searchParams, setSearchParams] = useState<{ m?: string }>({});
  const [machine, setMachine] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const m = urlParams.get('m') || '';
    setSearchParams({ m });

    if (!m) {
      setLoading(false);
      return;
    }

    const machineId = m.trim().toUpperCase();

    supabase
      .from('machines')
      .select('machine_code, vendor_name')
      .eq('machine_code', machineId)
      .single()
      .then(({ data, error }) => {
        setLoading(false);
        if (error || !data) {
          setError('Invalid machine');
        } else {
          setMachine(data);
        }
      });
  }, []);

  if (loading) {
    return <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-black to-gray-900 text-white">
      <h1 className="text-7xl font-black mb-8">PAY • POINT • PLAY</h1>
      <p className="text-3xl">Loading...</p>
    </main>;
  }

  if (!searchParams.m) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-black to-gray-900 text-white">
        <h1 className="text-7xl font-black mb-8">PAY • POINT • PLAY</h1>
        <p className="text-3xl mt-8 text-red-500">Scan a machine QR code</p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-black to-gray-900 text-white">
        <h1 className="text-7xl font-black mb-8">PAY • POINT • PLAY</h1>
        <p className="text-4xl mt-8 text-red-500">Invalid machine</p>
        <p className="text-xl opacity-70 mt-4">Contact support</p>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-black to-gray-900 text-white p-8 text-center">
      <h1 className="text-7xl font-black mb-8">PAY • POINT • PLAY</h1>
      <p className="text-3xl mb-2">{machine.vendor_name}</p>
      <p className="text-5xl font-bold text-green-400 mb-12">#{searchParams.m}</p>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl">
        <button className="bg-green-600 hover:bg-green-500 text-4xl font-bold py-12 px-16 rounded-3xl transition">$1 → 1 play</button>
        <button className="bg-green-600 hover:bg-green-500 text-4xl font-bold py-12 px-16 rounded-3xl transition">$3 → 4 plays</button>
        <button className="bg-green-600 hover:bg-green-500 text-4xl font-bold py-12 px-16 rounded-3xl transition">$5 → 8 plays</button>
        <button className="bg-green-600 hover:bg-green-500 text-4xl font-bold py-12 px-16 rounded-3xl transition">$10 → 18 plays</button>
      </div>
    </main>
  );
}
