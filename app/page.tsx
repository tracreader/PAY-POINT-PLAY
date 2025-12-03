import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default async function Home({ searchParams }: { searchParams: { m?: string } }) {
  const machineId = (searchParams.m || '').trim().toUpperCase();

  if (!machineId) {
    return <main className="flex min-h-screen flex-col items-center justify-center bg-black text-white"><h1 className="text-8xl font-black">PAY • POINT • PLAY</h1><p className="text-3xl mt-8 text-red-500">No machine scanned</p></main>;
  }

  const { data: machine } = await supabase
    .from('machines')
    .select('machine_code, vendor_name')
    .eq('machine_code', machineId)
    .single();

  if (!machine) {
    return <main className="flex min-h-screen flex-col items-center justify-center bg-black text-white"><h1 className="text-8xl font-black">PAY • POINT • PLAY</h1><p className="text-4xl mt-8 text-red-500">Invalid machine</p></main>;
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-black text-white p-8 text-center">
      <h1 className="text-8xl font-black mb-8">PAY • POINT • PLAY</h1>
      <p className="text-4xl mb-4">{machine.vendor_name}</p>
      <p className="text-6xl font-bold text-green-400 mb-12">#{machineId}</p>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        <button className="bg-green-600 hover:bg-green-500 text-4xl font-bold py-12 px-16 rounded-3xl">$1</button>
        <button className="bg-green-600 hover:bg-green-500 text-4xl font-bold py-12 px-16 rounded-3xl">$3</button>
        <button className="bg-green-600 hover:bg-green-500 text-4xl font-bold py-12 px-16 rounded-3xl">$5</button>
        <button className="bg-green-600 hover:bg-green-500 text-4xl font-bold py-12 px-16 rounded-3xl">$10</button>
      </div>
    </main>
  );
}
