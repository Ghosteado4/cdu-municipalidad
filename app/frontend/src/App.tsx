import React from 'react';

export default function App() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-800 font-sans">
      <header className="bg-[#0F2C59] text-white border-b-4 border-[#D4AF37] px-6 py-4 shadow-md">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-[#0F2C59] font-bold">CdU</div>
            <div>
              <h1 className="text-xl font-bold">MUNICIPALIDAD</h1>
              <p className="text-xs text-[#1D5D9B] tracking-widest font-semibold">CONCEPCIÓN DEL URUGUAY</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-12">
        <section className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
          <h2 className="text-3xl font-bold text-[#0F2C59] mb-4">Portal Ciudadano</h2>
          <p className="text-slate-600">Bienvenido al sistema de autogestión de La Histórica.</p>
          <div className="mt-8 grid gap-4">
            <a href="/api/tramites" className="p-4 bg-[#1D5D9B] text-white rounded-lg hover:bg-[#0F2C59] transition-colors">
              Iniciar Trámite
            </a>
          </div>
        </section>
      </main>
    </div>
  );
}