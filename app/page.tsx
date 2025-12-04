'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://flgtxowtclkmizdpybnc.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZsZ3R4b3d0Y2xrbWl6ZHB5Ym5jIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ3NzA4NjgsImV4cCI6MjA4MDM0Njg2OH0.s5cRtYF2k3Gva4yuiMwxr_RWwoNYvBLQFhg0ceTbjU8'
);

export default function Home() {
  const [machineId, setMachineId] = useState('');
  const [machine, setMachine] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const m = params.get('m')?.trim() || '';
    setMachineId(m);

    if (!m) {
      setLoading(false);
      return;
    }

    supabase
      .from('machines')
      .select('machine_code, vendor_name')
      .eq('machine_code', m.trim())  // Extra trim for safety
      .single()
      .then(({ data, error }) => {
        setLoading(false);
        console.log('Query result:', data, error); // Check console for debug
        if (data && !error) setMachine(data);
      });
  }, []);

  if (loading) return <div className="flex min-h-screen items-center justify-center bg-black text-white text-5xl">Loading...</div>;
  if (!machineId) return <main className="flex min-h-screen flex-col items-center justify-center bg-black text-white"><h1 className="text-8xl font-black">PAY • POINT • PLAY</h1><p className="text-4xl mt-8 text-red-500">Scan a machine QR code</p></main>;
  if (!machine) return <main className="flex min-h-screen flex-col items-center justify-center bg-black text-white"><h1 className="text-8xl font-black">PAY • POINT • PLAY</h1><p className="text-5xl mt-8 text-red-500">Invalid machine</p><p className="text-xl mt-4 opacity-70">Contact support</p></main>;

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-black text-white p-8 text-center">
      <h1 className="text-8xl font-black mb-8">PAY • POINT • PLAY</h1>
      <p className="text-4xl mb-2">{machine.vendor_name}</p>
      <p className="text-6xl font-bold text-green-400 mb-12">#{machine.machine_code}</p>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        <button className="bg-green-600 hover:bg-green-500 text-4xl font-bold py-12 px-16 rounded-3xl">$1 → 1 play</button>
        <button className="bg-green-600 hover:bg-green-500 text-4xl font-bold py-12 px-16 rounded-3xl">$3 → 4 plays</button>
        <button className="bg-green-600 hover:bg-green-500 text-4xl font-bold py-12 px-16 rounded-3xl">$5 → 8 plays</button>
        <button className="bg-green-600 hover:bg-green-500 text-4xl font-bold py-12 px-16 rounded-3xl">$10 → 18 plays</button>
      </div>
    </main>
  );
}
