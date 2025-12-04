import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl || '', supabaseKey || '');

export default async function Home({ searchParams }: { searchParams: { m?: string } }) {
  const machineId = (searchParams.m || '').trim().toUpperCase();

  if (!machineId) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-black to-gray-900 text-white">
        <h1 className="text-7xl font-black mb-8">PAY • POINT • PLAY</h1>
        <p className="text-3xl mt-8 text-red-500">No machine scanned</p>
      </main>
    );
  }

  // Debug lines
  const debug = supabaseUrl ? 'Keys loaded OK' : 'KEYS MISSING - Check env vars';
  const { data: machine, error } = await supabase
    .from('machines')
    .select('machine_code, vendor_name')
    .eq('machine_code', machineId)
    .single();

  if (error || !machine) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-black to-gray-900 text-white">
        <h1 className="text-7xl font-black mb-8">PAY • POINT • PLAY</h1>
        <p className="text-4xl mt-8 text-red-500">Invalid machine</p>
        <p className="text-xl opacity-70 mt-4">Error: {error?.message || 'Not found'}</p>
        <p className="text-sm opacity-70 mt-2">Debug: {debug}</p>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-black to-gray-900 text-white p-8 text-center">
      <h1 className="text-7xl font-black mb-8">PAY • POINT • PLAY</h1>
      <p className="text-3xl mb-4">{machine.vendor_name}</p>
      <p className="text-5xl font-bold text-green-400 mb-12">#{machineId}</p>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <button className="bg-green-600 hover:bg-green-500 text-3xl font-bold py-8 px-10 rounded-2xl">$1 → 1 play</button>
        <button className="bg-green-600 hover:bg-green-500 text-3xl font-bold py-8 px-10 rounded-2xl">$3 → 4 plays</button>
        <button className="bg-green-600 hover:bg-green-500 text-3xl font-bold py-8 px-10 rounded-2xl">$5 → 8 plays</button>
        <button className="bg-green-600 hover:bg-green-500 text-3xl font-bold py-8 px-10 rounded-2xl">$10 → 18 plays</button>
      </div>
      <p className="text-sm opacity-70 mt-4">Debug: {debug}</p>
    </main>
  );
}
