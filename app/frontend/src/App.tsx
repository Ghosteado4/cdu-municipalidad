import React, { useState } from 'react';

const TRAMITES_DISPONIBLES = [
  { id: '1', nombre: 'Habilitación Comercial', cat: 'Rentas' },
  { id: '2', nombre: 'Permiso de Edificación (PREVIN)', cat: 'Obras Privadas' },
  { id: '3', nombre: 'Renovación de Licencia de Conducir', cat: 'Tránsito' },
  { id: '4', nombre: 'Reclamo de Alumbrado y Bacheo', cat: 'Servicios Públicos' },
];

export default function App() {
  const [busqueda, setBusqueda] = useState('');
  const [numExpediente, setNumExpediente] = useState('');
  const [expedienteEncontrado, setExpedienteEncontrado] = useState<any>(null);

  const buscarExpediente = (e: React.FormEvent) => {
    e.preventDefault();
    if (numExpediente === '12345') {
      setExpedienteEncontrado({
        id: '12345',
        tipo: 'Habilitación Comercial - Kiosco "La Histórica"',
        fecha: '15 de Mayo, 2024',
        estadoActual: 'EN_REVISION',
        pasos: [
          { titulo: 'Iniciado', desc: 'Documentación presentada correctamente.', completado: true },
          { titulo: 'En Revisión', desc: 'Analizando planos y normativas.', completado: true, activo: true },
          { titulo: 'Inspección Física', desc: 'Visita del inspector al local.', completado: false },
          { titulo: 'Aprobado/Finalizado', desc: 'Emisión de la firma de habilitación.', completado: false },
        ]
      });
    } else {
      alert('Expediente no encontrado. Prueba ingresando el número: 12345');
    }
  };

  const tramitesFiltrados = TRAMITES_DISPONIBLES.filter(t =>
    t.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-800 font-sans selection:bg-[#D4AF37] selection:text-slate-900">
      
      {/* HEADER INSTITUCIONAL */}
      <header className="bg-[#0F2C59] text-white border-b-4 border-[#D4AF37] px-6 py-4 shadow-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-[#0F2C59] font-extrabold text-lg shadow-inner">
              CdU
            </div>
            <div>
              <h1 className="text-xl font-extrabold tracking-wide">MUNICIPALIDAD</h1>
              <p className="text-xs text-[#1D5D9B] font-semibold tracking-widest">CONCEPCIÓN DEL URUGUAY</p>
            </div>
          </div>
          <nav className="flex gap-4 text-sm font-medium items-center">
            <a href="#tramites" className="hover:text-[#D4AF37] transition-colors">Trámites</a>
            <a href="#expediente" className="hover:text-[#D4AF37] transition-colors">Seguimiento</a>
            <span className="bg-[#1D5D9B] text-white px-4 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider shadow-sm">
              La Histórica
            </span>
          </nav>
        </div>
      </header>

      {/* HERO & BUSCADOR */}
      <section className="bg-gradient-to-b from-[#0F2C59] to-[#1D5D9B] text-white py-16 px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <span className="text-xs uppercase tracking-widest bg-[#D4AF37] text-slate-900 px-3 py-1 rounded-full font-bold shadow-sm">
            Portal de Autogestión Ciudadana
          </span>
          <h2 className="text-4xl font-extrabold mt-4 mb-2">¿Qué trámite necesitás realizar hoy?</h2>
          <p className="text-slate-200 mb-8 text-sm md:text-base">Resolvé tus consultas y gestiones de forma rápida y online sin salir de casa.</p>
          
          <div className="relative max-w-xl mx-auto">
            <input
              type="text"
              placeholder="Ej: Licencia de conducir, edificación..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              className="w-full pl-5 pr-12 py-3.5 rounded-full text-slate-900 shadow-lg focus:outline-none focus:ring-4 focus:ring-[#D4AF37]/50 text-sm"
            />
            <span className="absolute right-4 top-3.5 text-slate-400">🔍</span>

            {busqueda && (
              <div className="absolute left-0 right-0 mt-2 bg-white text-slate-900 rounded-xl shadow-2xl border border-slate-200 max-h-60 overflow-y-auto text-left z-20">
                {tramitesFiltrados.length > 0 ? (
                  tramitesFiltrados.map(t => (
                    <div key={t.id} className="p-4 hover:bg-slate-50 border-b border-slate-100 cursor-pointer transition-colors">
                      <p className="font-semibold text-[#0F2C59]">{t.nombre}</p>
                      <span className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full">{t.cat}</span>
                    </div>
                  ))
                ) : (
                  <p className="p-4 text-sm text-slate-500">No se encontraron trámites con ese nombre.</p>
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ACCESOS RÁPIDOS */}
      <main id="tramites" className="max-w-6xl mx-auto px-6 py-12">
        <h3 className="text-2xl font-bold text-[#0F2C59] mb-8 text-center md:text-left">Servicios Disponibles</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300">
            <div className="text-3xl mb-4">🚗</div>
            <h4 className="font-bold text-slate-900 mb-2">Licencia de Conducir</h4>
            <p className="text-xs text-slate-500 mb-4">Saca turno y paga tu boleta de CENAT online.</p>
            <span className="text-sm text-[#1D5D9B] font-bold cursor-pointer hover:text-[#0F2C59]">Iniciar Trámite →</span>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300">
            <div className="text-3xl mb-4">🏬</div>
            <h4 className="font-bold text-slate-900 mb-2">Habilitaciones</h4>
            <p className="text-xs text-slate-500 mb-4">Habilita tu comercio o industria con la ventanilla digital.</p>
            <span className="text-sm text-[#1D5D9B] font-bold cursor-pointer hover:text-[#0F2C59]">Iniciar Trámite →</span>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300">
            <div className="text-3xl mb-4">🏗️</div>
            <h4 className="font-bold text-slate-900 mb-2">Obras Privadas</h4>
            <p className="text-xs text-slate-500 mb-4">Aprobación de planos y permisos de construcción PREVIN.</p>
            <span className="text-sm text-[#1D5D9B] font-bold cursor-pointer hover:text-[#0F2C59]">Iniciar Trámite →</span>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300">
            <div className="text-3xl mb-4">📢</div>
            <h4 className="font-bold text-slate-900 mb-2">Reclamos y Servicios</h4>
            <p className="text-xs text-slate-500 mb-4">Informa sobre luminarias, baches u otros servicios.</p>
            <span className="text-sm text-[#1D5D9B] font-bold cursor-pointer hover:text-[#0F2C59]">Crear Reclamo →</span>
          </div>

        </div>
      </main>

      {/* SEGUIMIENTO DE EXPEDIENTE */}
      <section id="expediente" className="bg-white py-12 border-t border-slate-200 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-[#0F2C59]">Seguimiento de Expediente</h3>
            <p className="text-sm text-slate-500 mt-2">Consulta en tiempo real cómo avanza tu solicitud.</p>
          </div>

          <form onSubmit={buscarExpediente} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto mb-8">
            <input
              type="text"
              placeholder="Ingresa N° de expediente (Prueba: 12345)"
              value={numExpediente}
              onChange={(e) => setNumExpediente(e.target.value)}
              className="flex-1 px-4 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1D5D9B]"
              required
            />
            <button type="submit" className="bg-[#0F2C59] hover:bg-[#1D5D9B] text-white px-6 py-2 rounded-lg text-sm font-bold transition-colors shadow-sm">
              Buscar
            </button>
          </form>

          {expedienteEncontrado && (
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
              <div className="mb-6">
                <p className="text-xs text-slate-400">Expediente N° {expedienteEncontrado.id}</p>
                <h4 className="font-bold text-[#0F2C59]">{expedienteEncontrado.tipo}</h4>
                <p className="text-xs text-slate-500 mt-1">Última actualización: {expedienteEncontrado.fecha}</p>
              </div>

              <div className="relative pl-6 border-l-2 border-slate-200 flex flex-col gap-8">
                {expedienteEncontrado.pasos.map((paso: any, index: number) => (
                  <div key={index} className="relative">
                    <span className={`absolute -left-[31px] top-0 w-4 h-4 rounded-full border-2 ${
                      paso.completado ? 'bg-green-500 border-green-500' : 'bg-white border-slate-300'
                    } ${paso.activo ? 'ring-4 ring-[#1D5D9B]/30 border-[#1D5D9B]' : ''}`} />
                    
                    <div>
                      <h5 className={`font-bold text-sm ${paso.activo ? 'text-[#1D5D9B]' : 'text-slate-700'}`}>
                        {paso.titulo}
                      </h5>
                      <p className="text-xs text-slate-500 mt-1">{paso.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-slate-900 text-slate-400 py-8 text-center text-xs">
        <p>© 2024 Municipalidad de Concepción del Uruguay. Provincia de Entre Ríos, Argentina.</p>
        <p className="mt-2 text-slate-600">Portal protegido bajo estándares OWASP y arquitectura unificada.</p>
      </footer>
    </div>
  );
}