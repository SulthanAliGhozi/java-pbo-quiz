// src/components/Diagrams.jsx
// Visual SVG Diagrams for Java OOP Questions
import React from 'react';

export function DiagramView({ type }) {
  switch (type) {
    case 'uml_single_inheritance':
      return (
        <div className="my-4 p-4 bg-slate-900/90 rounded-xl border border-slate-800 flex flex-col items-center">
          <div className="text-xs font-semibold text-slate-400 mb-2 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-amber-400"></span>
            Diagram UML Generalization (Single Inheritance)
          </div>
          <svg viewBox="0 0 400 210" className="w-full max-w-sm h-auto">
            {/* Superclass Kendaraan */}
            <g transform="translate(130, 10)">
              <rect width="140" height="60" rx="6" fill="#1e293b" stroke="#3b82f6" strokeWidth="2" />
              <rect width="140" height="24" rx="6" fill="#1d4ed8" />
              <text x="70" y="16" textAnchor="middle" fill="#ffffff" fontSize="12" fontWeight="bold">Kendaraan</text>
              <line x1="0" y1="24" x2="140" y2="24" stroke="#3b82f6" strokeWidth="1" />
              <text x="10" y="42" fill="#cbd5e1" fontSize="11" fontFamily="monospace"># merk: String</text>
            </g>

            {/* Generalization Arrow (Solid line with hollow triangle) */}
            <path d="M 200 130 L 200 90" stroke="#94a3b8" strokeWidth="2" />
            <polygon points="200,70 190,90 210,90" fill="#0f172a" stroke="#94a3b8" strokeWidth="2" />

            {/* Subclass Mobil */}
            <g transform="translate(130, 130)">
              <rect width="140" height="70" rx="6" fill="#1e293b" stroke="#10b981" strokeWidth="2" />
              <rect width="140" height="24" rx="6" fill="#047857" />
              <text x="70" y="16" textAnchor="middle" fill="#ffffff" fontSize="12" fontWeight="bold">Mobil</text>
              <line x1="0" y1="24" x2="140" y2="24" stroke="#10b981" strokeWidth="1" />
              <text x="10" y="42" fill="#94a3b8" fontSize="10" fontFamily="monospace">// extends Kendaraan</text>
              <text x="10" y="58" fill="#a7f3d0" fontSize="11" fontFamily="monospace">+ klakson(): void</text>
            </g>
          </svg>
        </div>
      );

    case 'uml_generalization_arrow':
      return (
        <div className="my-4 p-4 bg-slate-900/90 rounded-xl border border-slate-800 flex flex-col items-center">
          <div className="text-xs font-semibold text-slate-400 mb-2">Simbol Relasi Standar UML</div>
          <svg viewBox="0 0 460 120" className="w-full max-w-md h-auto">
            {/* Generalization (Solid line, hollow triangle) */}
            <g transform="translate(30, 20)">
              <text x="0" y="14" fill="#38bdf8" fontSize="12" fontWeight="600">Generalization (extends):</text>
              <line x1="10" y1="50" x2="140" y2="50" stroke="#38bdf8" strokeWidth="2" />
              <polygon points="160,50 140,40 140,60" fill="#0f172a" stroke="#38bdf8" strokeWidth="2" />
              <text x="10" y="80" fill="#94a3b8" fontSize="10">Subclass ───▷ Superclass</text>
            </g>

            {/* Realization (Dashed line, hollow triangle) */}
            <g transform="translate(260, 20)">
              <text x="0" y="14" fill="#a855f7" fontSize="12" fontWeight="600">Realization (implements):</text>
              <line x1="10" y1="50" x2="140" y2="50" stroke="#a855f7" strokeWidth="2" strokeDasharray="6,4" />
              <polygon points="160,50 140,40 140,60" fill="#0f172a" stroke="#a855f7" strokeWidth="2" />
              <text x="10" y="80" fill="#94a3b8" fontSize="10">Class - - -▷ Interface</text>
            </g>
          </svg>
        </div>
      );

    case 'polymorphism_memory':
      return (
        <div className="my-4 p-4 bg-slate-900/90 rounded-xl border border-slate-800 flex flex-col items-center">
          <div className="text-xs font-semibold text-slate-400 mb-2 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
            Ilustrasi Memori Runtime: Hewan h = new Kucing();
          </div>
          <svg viewBox="0 0 460 180" className="w-full max-w-md h-auto">
            {/* Stack Memory */}
            <g transform="translate(30, 20)">
              <rect width="140" height="130" rx="8" fill="#1e293b" stroke="#64748b" strokeWidth="1" />
              <rect width="140" height="26" rx="8" fill="#334155" />
              <text x="70" y="18" textAnchor="middle" fill="#e2e8f0" fontSize="11" fontWeight="bold">Stack Memory</text>
              <rect x="15" y="45" width="110" height="65" rx="4" fill="#0f172a" stroke="#38bdf8" />
              <text x="70" y="65" textAnchor="middle" fill="#38bdf8" fontSize="11" fontWeight="bold">Referensi: h</text>
              <text x="70" y="82" textAnchor="middle" fill="#94a3b8" fontSize="9">Tipe: Hewan</text>
              <text x="70" y="98" textAnchor="middle" fill="#fbbf24" fontSize="10" fontFamily="monospace">@0x7A9B</text>
            </g>

            {/* Pointer arrow */}
            <path d="M 170 85 C 220 85, 220 85, 270 85" stroke="#f59e0b" strokeWidth="2" fill="none" markerEnd="url(#arrow)" />
            <polygon points="275,85 265,80 265,90" fill="#f59e0b" />

            {/* Heap Memory */}
            <g transform="translate(280, 20)">
              <rect width="150" height="130" rx="8" fill="#1e293b" stroke="#10b981" strokeWidth="1.5" />
              <rect width="150" height="26" rx="8" fill="#065f46" />
              <text x="75" y="18" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="bold">Heap Memory (Actual Object)</text>
              <text x="15" y="48" fill="#a7f3d0" fontSize="11" fontWeight="bold">Objek: Kucing</text>
              <text x="15" y="65" fill="#cbd5e1" fontSize="10" fontFamily="monospace">Alamat: @0x7A9B</text>
              <line x1="15" y1="75" x2="135" y2="75" stroke="#334155" />
              <text x="15" y="95" fill="#facc15" fontSize="10" fontWeight="bold">Method Table:</text>
              <text x="15" y="112" fill="#e2e8f0" fontSize="10" fontFamily="monospace">bersuara() &rarr; "Meong"</text>
            </g>
          </svg>
        </div>
      );

    case 'uml_abstract_class':
      return (
        <div className="my-4 p-4 bg-slate-900/90 rounded-xl border border-slate-800 flex flex-col items-center">
          <div className="text-xs font-semibold text-slate-400 mb-2">Diagram UML Abstract Class</div>
          <svg viewBox="0 0 380 200" className="w-full max-w-sm h-auto">
            {/* Abstract Class BangunDatar */}
            <g transform="translate(100, 10)">
              <rect width="180" height="75" rx="6" fill="#1e293b" stroke="#ec4899" strokeWidth="2" />
              <rect width="180" height="30" rx="6" fill="#831843" />
              <text x="90" y="15" textAnchor="middle" fill="#fbcfe8" fontSize="10">&lt;&lt;abstract&gt;&gt;</text>
              <text x="90" y="27" textAnchor="middle" fill="#ffffff" fontSize="12" fontWeight="bold" fontStyle="italic">BangunDatar</text>
              <line x1="0" y1="30" x2="180" y2="30" stroke="#ec4899" strokeWidth="1" />
              <text x="10" y="48" fill="#cbd5e1" fontSize="10" fontFamily="monospace">+ jumlahSisi: int</text>
              <line x1="0" y1="54" x2="180" y2="54" stroke="#334155" strokeWidth="1" />
              <text x="10" y="68" fill="#f472b6" fontSize="10" fontStyle="italic" fontFamily="monospace">+ hitungLuas(): double</text>
            </g>

            {/* Generalization Arrow */}
            <path d="M 190 130 L 190 105" stroke="#94a3b8" strokeWidth="2" />
            <polygon points="190,85 180,105 200,105" fill="#0f172a" stroke="#94a3b8" strokeWidth="2" />

            {/* Concrete Class Segitiga */}
            <g transform="translate(100, 130)">
              <rect width="180" height="60" rx="6" fill="#1e293b" stroke="#10b981" strokeWidth="2" />
              <rect width="180" height="24" rx="6" fill="#047857" />
              <text x="90" y="16" textAnchor="middle" fill="#ffffff" fontSize="12" fontWeight="bold">Segitiga</text>
              <line x1="0" y1="24" x2="180" y2="24" stroke="#10b981" strokeWidth="1" />
              <text x="10" y="45" fill="#a7f3d0" fontSize="10" fontFamily="monospace">+ hitungLuas(): double</text>
            </g>
          </svg>
        </div>
      );

    case 'uml_diamond_problem':
      return (
        <div className="my-4 p-4 bg-slate-900/90 rounded-xl border border-slate-800 flex flex-col items-center">
          <div className="text-xs font-semibold text-slate-400 mb-2 text-rose-400">Multiple Interface Default Method Conflict (Diamond Problem)</div>
          <svg viewBox="0 0 420 190" className="w-full max-w-md h-auto">
            {/* Interface A */}
            <g transform="translate(40, 10)">
              <rect width="140" height="60" rx="6" fill="#1e293b" stroke="#8b5cf6" strokeWidth="1.5" />
              <text x="70" y="16" textAnchor="middle" fill="#c4b5fd" fontSize="9">&lt;&lt;interface&gt;&gt;</text>
              <text x="70" y="28" textAnchor="middle" fill="#ffffff" fontSize="12" fontWeight="bold">A</text>
              <line x1="0" y1="32" x2="140" y2="32" stroke="#8b5cf6" strokeWidth="1" />
              <text x="8" y="48" fill="#e2e8f0" fontSize="10" fontFamily="monospace">+ default halo(): void</text>
            </g>

            {/* Interface B */}
            <g transform="translate(240, 10)">
              <rect width="140" height="60" rx="6" fill="#1e293b" stroke="#8b5cf6" strokeWidth="1.5" />
              <text x="70" y="16" textAnchor="middle" fill="#c4b5fd" fontSize="9">&lt;&lt;interface&gt;&gt;</text>
              <text x="70" y="28" textAnchor="middle" fill="#ffffff" fontSize="12" fontWeight="bold">B</text>
              <line x1="0" y1="32" x2="140" y2="32" stroke="#8b5cf6" strokeWidth="1" />
              <text x="8" y="48" fill="#e2e8f0" fontSize="10" fontFamily="monospace">+ default halo(): void</text>
            </g>

            {/* Arrows to Class C */}
            <path d="M 160 120 L 115 85" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="5,3" />
            <polygon points="110,80 112,92 124,84" fill="#0f172a" stroke="#94a3b8" strokeWidth="1.5" />

            <path d="M 260 120 L 305 85" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="5,3" />
            <polygon points="310,80 296,84 308,92" fill="#0f172a" stroke="#94a3b8" strokeWidth="1.5" />

            {/* Class C */}
            <g transform="translate(130, 120)">
              <rect width="160" height="60" rx="6" fill="#1e293b" stroke="#f43f5e" strokeWidth="2" />
              <text x="80" y="18" textAnchor="middle" fill="#ffffff" fontSize="12" fontWeight="bold">Class C</text>
              <line x1="0" y1="26" x2="160" y2="26" stroke="#f43f5e" strokeWidth="1" />
              <text x="8" y="42" fill="#fda4af" fontSize="9" fontWeight="bold">Wajib Override halo()!</text>
              <text x="8" y="54" fill="#94a3b8" fontSize="8" fontFamily="monospace">A.super.halo(); / B.super...</text>
            </g>
          </svg>
        </div>
      );

    case 'uml_realization_arrow':
      return (
        <div className="my-4 p-4 bg-slate-900/90 rounded-xl border border-slate-800 flex flex-col items-center">
          <div className="text-xs font-semibold text-slate-400 mb-2">Simbol Relasi Realization (Class implements Interface)</div>
          <svg viewBox="0 0 360 90" className="w-full max-w-sm h-auto">
            <g transform="translate(20, 20)">
              <rect width="100" height="40" rx="4" fill="#1e293b" stroke="#10b981" />
              <text x="50" y="24" textAnchor="middle" fill="#a7f3d0" fontSize="11" fontWeight="bold">Class</text>
            </g>
            <line x1="120" y1="40" x2="215" y2="40" stroke="#a855f7" strokeWidth="2" strokeDasharray="6,4" />
            <polygon points="235,40 215,32 215,48" fill="#0f172a" stroke="#a855f7" strokeWidth="2" />
            <g transform="translate(240, 20)">
              <rect width="100" height="40" rx="4" fill="#1e293b" stroke="#a855f7" />
              <text x="50" y="16" textAnchor="middle" fill="#c4b5fd" fontSize="8">&lt;&lt;interface&gt;&gt;</text>
              <text x="50" y="30" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="bold">Interface</text>
            </g>
          </svg>
        </div>
      );

    case 'uml_polymorphism_hierarchy':
      return (
        <div className="my-4 p-4 bg-slate-900/90 rounded-xl border border-slate-800 flex flex-col items-center">
          <div className="text-xs font-semibold text-amber-400 mb-2 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-amber-400"></span>
            Diagram UML Polimorfisme: Hierarki Class Hewan
          </div>
          <svg viewBox="0 0 440 230" className="w-full max-w-md h-auto">
            {/* Superclass Hewan */}
            <g transform="translate(145, 10)">
              <rect width="150" height="65" rx="6" fill="#1e293b" stroke="#3b82f6" strokeWidth="2" />
              <rect width="150" height="24" rx="6" fill="#1d4ed8" />
              <text x="75" y="16" textAnchor="middle" fill="#ffffff" fontSize="12" fontWeight="bold">Hewan</text>
              <line x1="0" y1="24" x2="150" y2="24" stroke="#3b82f6" strokeWidth="1" />
              <text x="10" y="42" fill="#cbd5e1" fontSize="10" fontFamily="monospace"># nama: String</text>
              <text x="10" y="56" fill="#93c5fd" fontSize="10" fontFamily="monospace">+ bersuara(): void</text>
            </g>

            {/* Generalization lines */}
            <path d="M 100 135 L 100 100 L 220 100 L 220 75" stroke="#94a3b8" strokeWidth="2" fill="none" />
            <path d="M 340 135 L 340 100 L 220 100" stroke="#94a3b8" strokeWidth="2" fill="none" />
            <polygon points="220,75 210,95 230,95" fill="#0f172a" stroke="#94a3b8" strokeWidth="2" />

            {/* Subclass Kucing */}
            <g transform="translate(25, 135)">
              <rect width="150" height="75" rx="6" fill="#1e293b" stroke="#10b981" strokeWidth="2" />
              <rect width="150" height="24" rx="6" fill="#047857" />
              <text x="75" y="16" textAnchor="middle" fill="#ffffff" fontSize="12" fontWeight="bold">Kucing</text>
              <line x1="0" y1="24" x2="150" y2="24" stroke="#10b981" strokeWidth="1" />
              <text x="8" y="44" fill="#a7f3d0" fontSize="10" fontFamily="monospace">+ bersuara(): void</text>
              <text x="8" y="60" fill="#6ee7b7" fontSize="9" fontFamily="monospace">// println("Meong!")</text>
            </g>

            {/* Subclass Anjing */}
            <g transform="translate(265, 135)">
              <rect width="150" height="75" rx="6" fill="#1e293b" stroke="#f59e0b" strokeWidth="2" />
              <rect width="150" height="24" rx="6" fill="#b45309" />
              <text x="75" y="16" textAnchor="middle" fill="#ffffff" fontSize="12" fontWeight="bold">Anjing</text>
              <line x1="0" y1="24" x2="150" y2="24" stroke="#f59e0b" strokeWidth="1" />
              <text x="8" y="44" fill="#fde68a" fontSize="10" fontFamily="monospace">+ bersuara(): void</text>
              <text x="8" y="60" fill="#fcd34d" fontSize="9" fontFamily="monospace">// println("Guk guk!")</text>
            </g>
          </svg>
        </div>
      );

    case 'uml_interface_realization':
      return (
        <div className="my-4 p-4 bg-slate-900/90 rounded-xl border border-slate-800 flex flex-col items-center">
          <div className="text-xs font-semibold text-purple-400 mb-2 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-purple-400"></span>
            Diagram UML Interface & Realization (Multiple Implementations)
          </div>
          <svg viewBox="0 0 450 220" className="w-full max-w-md h-auto">
            {/* Interface Pembayaran */}
            <g transform="translate(135, 10)">
              <rect width="180" height="65" rx="6" fill="#1e293b" stroke="#a855f7" strokeWidth="2" />
              <text x="90" y="16" textAnchor="middle" fill="#c4b5fd" fontSize="9">&lt;&lt;interface&gt;&gt;</text>
              <text x="90" y="30" textAnchor="middle" fill="#ffffff" fontSize="12" fontWeight="bold">Pembayaran</text>
              <line x1="0" y1="36" x2="180" y2="36" stroke="#a855f7" strokeWidth="1" />
              <text x="8" y="52" fill="#e9d5ff" fontSize="10" fontFamily="monospace">+ prosesBayar(double): void</text>
            </g>

            {/* Realization lines (dashed with hollow triangle) */}
            <path d="M 105 130 L 105 100 L 225 100 L 225 75" stroke="#a855f7" strokeWidth="1.8" strokeDasharray="5,4" fill="none" />
            <path d="M 345 130 L 345 100 L 225 100" stroke="#a855f7" strokeWidth="1.8" strokeDasharray="5,4" fill="none" />
            <polygon points="225,75 215,95 235,95" fill="#0f172a" stroke="#a855f7" strokeWidth="2" />

            {/* Class TransferBank */}
            <g transform="translate(25, 130)">
              <rect width="160" height="65" rx="6" fill="#1e293b" stroke="#3b82f6" strokeWidth="2" />
              <rect width="160" height="24" rx="6" fill="#1d4ed8" />
              <text x="80" y="16" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="bold">TransferBank</text>
              <line x1="0" y1="24" x2="160" y2="24" stroke="#3b82f6" strokeWidth="1" />
              <text x="6" y="44" fill="#93c5fd" fontSize="9.5" fontFamily="monospace">+ prosesBayar(double): void</text>
            </g>

            {/* Class EWallet */}
            <g transform="translate(265, 130)">
              <rect width="160" height="65" rx="6" fill="#1e293b" stroke="#10b981" strokeWidth="2" />
              <rect width="160" height="24" rx="6" fill="#047857" />
              <text x="80" y="16" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="bold">EWallet</text>
              <line x1="0" y1="24" x2="160" y2="24" stroke="#10b981" strokeWidth="1" />
              <text x="6" y="44" fill="#a7f3d0" fontSize="9.5" fontFamily="monospace">+ prosesBayar(double): void</text>
            </g>
          </svg>
        </div>
      );

    case 'uml_composition_aggregation':
      return (
        <div className="my-4 p-4 bg-slate-900/90 rounded-xl border border-slate-800 flex flex-col items-center">
          <div className="text-xs font-semibold text-sky-400 mb-2 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-sky-400"></span>
            Perbandingan Komposisi (Composition) vs Agregasi (Aggregation)
          </div>
          <svg viewBox="0 0 460 170" className="w-full max-w-md h-auto">
            {/* Composition Section */}
            <g transform="translate(10, 15)">
              <text x="0" y="12" fill="#38bdf8" fontSize="11" fontWeight="bold">1. Komposisi (Filled Diamond - Part-of Kuat):</text>
              <g transform="translate(10, 25)">
                <rect width="80" height="36" rx="4" fill="#1e293b" stroke="#38bdf8" />
                <text x="40" y="22" textAnchor="middle" fill="#e0f2fe" fontSize="11" fontWeight="bold">Mobil</text>
                {/* Diamond at Mobil */}
                <polygon points="80,18 90,12 100,18 90,24" fill="#38bdf8" stroke="#38bdf8" />
                <line x1="100" y1="18" x2="150" y2="18" stroke="#38bdf8" strokeWidth="2" />
                <g transform="translate(150, 0)">
                  <rect width="80" height="36" rx="4" fill="#1e293b" stroke="#38bdf8" />
                  <text x="40" y="22" textAnchor="middle" fill="#e0f2fe" fontSize="11" fontWeight="bold">Mesin</text>
                </g>
              </g>
              <text x="10" y="80" fill="#94a3b8" fontSize="9.5">Jika Mobil dihancurkan, Mesin ikut musnah (lifecycle terikat erat)</text>
            </g>

            {/* Aggregation Section */}
            <g transform="translate(10, 95)">
              <text x="0" y="12" fill="#a78bfa" fontSize="11" fontWeight="bold">2. Agregasi (Hollow Diamond - Has-a Lemah):</text>
              <g transform="translate(10, 25)">
                <rect width="80" height="36" rx="4" fill="#1e293b" stroke="#a78bfa" />
                <text x="40" y="22" textAnchor="middle" fill="#ede9fe" fontSize="11" fontWeight="bold">Jurusan</text>
                {/* Hollow Diamond at Jurusan */}
                <polygon points="80,18 90,12 100,18 90,24" fill="#0f172a" stroke="#a78bfa" strokeWidth="2" />
                <line x1="100" y1="18" x2="150" y2="18" stroke="#a78bfa" strokeWidth="2" />
                <g transform="translate(150, 0)">
                  <rect width="80" height="36" rx="4" fill="#1e293b" stroke="#a78bfa" />
                  <text x="40" y="22" textAnchor="middle" fill="#ede9fe" fontSize="11" fontWeight="bold">Mahasiswa</text>
                </g>
              </g>
              <text x="10" y="80" fill="#94a3b8" fontSize="9.5">Mahasiswa tetap eksis meskipun Jurusan dibubarkan (lifecycle independen)</text>
            </g>
          </svg>
        </div>
      );

    default:
      return null;
  }
}
