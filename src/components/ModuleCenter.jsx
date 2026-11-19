// src/components/ModuleCenter.jsx
import React, { useState, useRef, useEffect } from 'react';
import {
  BookOpen,
  Video,
  FileText,
  Download,
  ExternalLink,
  RotateCcw,
  RotateCw,
  Gauge,
  Layers,
  Zap,
  ShieldCheck,
  PenTool,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  SplitSquareVertical,
  Tv,
  GraduationCap
} from 'lucide-react';

export const MODULES_DATA = [
  {
    id: 'inheritance',
    title: 'Modul 1: Inheritance (Pewarisan)',
    subtitle: 'Konsep IS-A, Constructor Chaining, Keyword super & this, Variable Hiding & JVM Heap',
    pdfUrl: '/modul/Modul_1_Inheritance_Java_PBO.pdf',
    videoUrl: '/videos/inheritance.mp4',
    pageCount: '13 Halaman',
    videoSize: '35 MB',
    badgeColor: 'from-amber-500 to-orange-500',
    borderColor: 'border-amber-500/40',
    accentText: 'text-amber-400',
    accentBg: 'bg-amber-500/10',
    icon: Layers,
    description: 'Membahas tuntas filosofi pewarisan, mengapa Java menolak multiple class inheritance (Diamond Problem), urutan konstruktor top-down, dan analisis jebakan variable hiding.',
    keyPoints: [
      'Hubungan IS-A & prinsip DRY (Don\'t Repeat Yourself)',
      'Perbedaan mendasar keyword super vs this (konstruktor & method)',
      'Hierarki eksekusi konstruktor Top-Down & error konstruktor induk',
      'Variable Hiding vs Method Overriding & alokasi Heap Memory JVM'
    ]
  },
  {
    id: 'polymorphism',
    title: 'Modul 2: Polymorphism (Polimorfisme)',
    subtitle: 'Overloading vs Overriding, Dynamic Method Dispatch, VTABLE, Casting & Pattern Matching',
    pdfUrl: '/modul/Modul_2_Polymorphism_Java_PBO.pdf',
    videoUrl: '/videos/polymorphism.mp4',
    pageCount: '12 Halaman',
    videoSize: '39 MB',
    badgeColor: 'from-cyan-500 to-blue-500',
    borderColor: 'border-cyan-500/40',
    accentText: 'text-cyan-400',
    accentBg: 'bg-cyan-500/10',
    icon: Zap,
    description: 'Membahas dua pilar polimorfisme, algoritma pencocokan overload, covariant return type, dynamic dispatch via tabel virtual VTABLE, serta keamanan downcasting.',
    keyPoints: [
      'Compile-time (Overloading) vs Runtime Polymorphism (Overriding)',
      'Dynamic Method Dispatch & VTABLE (Virtual Method Table) di JVM Metaspace',
      'Upcasting, Downcasting, dan pencegahan ClassCastException',
      'Pattern Matching for instanceof (Java 16+) & The Strategy Pattern'
    ]
  },
  {
    id: 'abstract-interface',
    title: 'Modul 3: Abstract Class & Interface',
    subtitle: 'Partial vs Pure Abstraction, Java 8+ Default & Static Methods, Resolusi Diamond Problem & Studi Kasus IoT',
    pdfUrl: '/modul/Modul_3_Abstract_Class_dan_Interface_Java_PBO.pdf',
    videoUrl: '/videos/abstract-interface.mp4',
    pageCount: '11 Halaman',
    videoSize: '47 MB (9:41)',
    badgeColor: 'from-purple-500 to-indigo-500',
    borderColor: 'border-purple-500/40',
    accentText: 'text-purple-400',
    accentBg: 'bg-purple-500/10',
    icon: ShieldCheck,
    description: 'Bedah materi komprehensif 9 menit 41 detik: Menaklukkan kompleksitas abstraksi, 4 jebakan modifier terlarang, evolusi interface Java 8/9+, resolusi Diamond Problem, filosofi IS-A vs CAN-DO, dan arsitektur nyata IoT Smart Home.',
    keyPoints: [
      'Abstraksi Parsial (Abstract Class) vs Kontrak Fungsional Murni (Interface)',
      '4 Jebakan Modifier Terlarang: private, final, static, dan synchronized',
      'Aturan Interface: Variabel otomatis (public static final) & method (public abstract)',
      'Evolusi Java 8 & 9+: Default method, static method, dan private helper method',
      'Resolusi Konflik Diamond Problem (NamaInterface.super.namaMethod())',
      'Filosofi IS-A vs CAN-DO & Arsitektur Kelas IoT Smart Home (ACInverterPintar)'
    ]
  },
  {
    id: 'uml-diagram',
    title: 'Panduan: UML Class Diagram Soal Cerita',
    subtitle: 'Metodologi 5 Langkah Ekstraksi Soal Cerita, Simbol Panah di Kertas & Contoh Ujian Kampus',
    pdfUrl: '/modul/Panduan_Lengkap_Class_Diagram_UML_PBO.pdf',
    videoUrl: '/videos/uml-class-diagram.mp4',
    pageCount: '10 Halaman',
    videoSize: '34 MB',
    badgeColor: 'from-emerald-500 to-teal-500',
    borderColor: 'border-emerald-500/40',
    accentText: 'text-emerald-400',
    accentBg: 'bg-emerald-500/10',
    icon: PenTool,
    description: 'Panduan praktis menggambar Class Diagram dengan benar di lembar kertas ujian: notasi kotak 3 kompartemen, visibilitas (+, -, #, ~), jenis panah relasi, dan 3 studi kasus nyata.',
    keyPoints: [
      'Standar kotak kelas 3 kompartemen & simbol visibilitas (+, -, #, ~)',
      'Bentuk panah di kertas: Inheritance (───▷), Realization (- - -▷), Komposisi (◆), Agregasi (◇)',
      'Metodologi 5 langkah ekstraksi studi kasus naratif ke class diagram',
      '3 Studi kasus lengkap standar ujian kampus & skeleton code Java'
    ]
  }
];

export function ModuleCenter({
  viewMode = 'modul',
  onNavigate,
  onBackToQuiz
}) {
  const [selectedModuleId, setSelectedModuleId] = useState('inheritance');
  // Initial layout based on viewMode: if 'video' -> video-focus, if 'modul' -> pdf-focus, or split
  const [layoutMode, setLayoutMode] = useState(() => {
    if (viewMode === 'video') return 'video-focus';
    if (viewMode === 'modul') return 'pdf-focus';
    return 'split';
  });
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef(null);

  // Sync layout mode when viewMode changes externally from header
  useEffect(() => {
    if (viewMode === 'video') {
      setLayoutMode('video-focus');
    } else if (viewMode === 'modul') {
      setLayoutMode('pdf-focus');
    }
  }, [viewMode]);

  const activeModule = MODULES_DATA.find(m => m.id === selectedModuleId) || MODULES_DATA[0];

  const handleSpeedChange = (speed) => {
    setPlaybackSpeed(speed);
    if (videoRef.current) {
      videoRef.current.playbackRate = speed;
    }
  };

  const handleSkip = (seconds) => {
    if (videoRef.current) {
      videoRef.current.currentTime += seconds;
    }
  };

  const handleSelectModule = (id) => {
    setSelectedModuleId(id);
    setIsPlaying(false);
  };

  const handleSwitchLayout = (mode) => {
    setLayoutMode(mode);
    if (mode === 'video-focus') {
      onNavigate?.('video');
    } else if (mode === 'pdf-focus') {
      onNavigate?.('modul');
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn pb-16">
      {/* Top Banner / Heading */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-slate-950 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl -z-10 pointer-events-none"></div>

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-bold uppercase tracking-wider">
              <Sparkles size={14} className="text-cyan-400" />
              <span>
                {viewMode === 'video'
                  ? 'Pemutar Video Pembahasan Materi PBO'
                  : 'Pusat Belajar Modul PDF & Video Materi PBO'}
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
              {viewMode === 'video'
                ? 'Video Pembahasan Materi & Studi Kasus'
                : 'Modul Lengkap Teori & Studi Kasus Java OOP'}
            </h1>
            <p className="text-sm text-slate-400 max-w-2xl">
              {viewMode === 'video'
                ? 'Tonton video materi interaktif dengan kontrol playback kecepatan untuk memantapkan konsep sebelum ujian besok.'
                : 'Pelajari materi mendalam melalui PDF bacaan (10-13 halaman) dan video penjelasan interaktif.'}
            </p>
          </div>

          {/* Prominent Back to Quiz Button */}
          <div className="flex items-center gap-3">
            <button
              onClick={onBackToQuiz}
              className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-bold rounded-xl text-xs sm:text-sm transition-all shadow-lg shadow-amber-950 active:scale-95 cursor-pointer"
              title="Kembali ke kuis ujian untuk mulai mengerjakan soal"
            >
              <ArrowLeft size={16} />
              <span>Kembali ke Kuis Ujian (80 Soal)</span>
            </button>
          </div>
        </div>

        {/* 4 Module Cards Selector */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 mt-6">
          {MODULES_DATA.map((modul) => {
            const Icon = modul.icon;
            const isSelected = modul.id === selectedModuleId;
            return (
              <button
                key={modul.id}
                onClick={() => handleSelectModule(modul.id)}
                className={`text-left p-4 rounded-2xl border transition-all cursor-pointer relative flex flex-col justify-between ${
                  isSelected
                    ? `bg-slate-800/90 ${modul.borderColor} shadow-lg ring-1 ring-cyan-500/40`
                    : 'bg-slate-950/70 border-slate-800 hover:border-slate-700 hover:bg-slate-900/60'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className={`w-8 h-8 rounded-xl ${modul.accentBg} flex items-center justify-center ${modul.accentText}`}>
                      <Icon size={16} />
                    </div>
                    {isSelected && (
                      <span className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_#22d3ee]"></span>
                    )}
                  </div>
                  <h3 className={`text-sm font-bold leading-tight ${isSelected ? 'text-white' : 'text-slate-200'}`}>
                    {modul.title}
                  </h3>
                  <p className="text-[11px] text-slate-400 line-clamp-2 mt-1">
                    {modul.subtitle}
                  </p>
                </div>

                <div className="flex items-center gap-2 mt-3 pt-2.5 border-t border-slate-800/80 text-[10px] text-slate-400 font-mono">
                  <span className="flex items-center gap-1 text-emerald-400">
                    <FileText size={11} />
                    {modul.pageCount}
                  </span>
                  <span>&bull;</span>
                  <span className="flex items-center gap-1 text-cyan-400">
                    <Video size={11} />
                    {modul.videoSize}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Interactive Studio (Video Player & PDF Viewer) */}
      <div className="space-y-4">
        {/* Control Bar: Layout View Switcher, Back Button & Quick Actions */}
        <div className="bg-slate-900/90 border border-slate-800 p-3.5 rounded-2xl flex flex-wrap items-center justify-between gap-3 shadow-md">
          {/* Left: View Mode Toggles */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-300">Tampilan:</span>
            <div className="flex items-center p-1 bg-slate-950/80 border border-slate-800 rounded-xl text-xs">
              <button
                onClick={() => handleSwitchLayout('pdf-focus')}
                className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 font-medium transition-all cursor-pointer ${
                  layoutMode === 'pdf-focus'
                    ? 'bg-cyan-500 text-slate-950 font-bold shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
                title="Fokus ke pembaca PDF modul"
              >
                <FileText size={13} />
                <span>Modul PDF</span>
              </button>
              <button
                onClick={() => handleSwitchLayout('video-focus')}
                className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 font-medium transition-all cursor-pointer ${
                  layoutMode === 'video-focus'
                    ? 'bg-purple-500 text-white font-bold shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
                title="Fokus ke pemutar video materi"
              >
                <Tv size={13} />
                <span>Video Materi</span>
              </button>
              <button
                onClick={() => handleSwitchLayout('split')}
                className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 font-medium transition-all cursor-pointer ${
                  layoutMode === 'split'
                    ? 'bg-amber-500 text-slate-950 font-bold shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
                title="Tampilkan Video dan PDF secara berdampingan"
              >
                <SplitSquareVertical size={13} />
                <span className="hidden sm:inline">Split Screen (Berdampingan)</span>
                <span className="sm:hidden">Split</span>
              </button>
            </div>
          </div>

          {/* Right: PDF Quick actions & Back to Quiz */}
          <div className="flex items-center gap-2">
            <button
              onClick={onBackToQuiz}
              className="px-3 py-1.5 bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer active:scale-95"
              title="Kembali ke halaman kuis"
            >
              <ArrowLeft size={13} />
              <span>Kembali ke Kuis</span>
            </button>

            <a
              href={activeModule.pdfUrl}
              download
              className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer"
              title="Unduh file PDF ini ke komputer"
            >
              <Download size={13} className="text-emerald-400" />
              <span>Unduh PDF</span>
            </a>
            <a
              href={activeModule.pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer"
              title="Buka PDF di tab baru browser"
            >
              <ExternalLink size={13} className="text-cyan-400" />
              <span className="hidden sm:inline">Tab Baru</span>
            </a>
          </div>
        </div>

        {/* Studio Content Grid */}
        <div className={`grid gap-6 ${
          layoutMode === 'split'
            ? 'grid-cols-1 lg:grid-cols-12'
            : 'grid-cols-1'
        }`}>
          {/* Video Player Column */}
          {(layoutMode === 'split' || layoutMode === 'video-focus') && (
            <div className={`${layoutMode === 'split' ? 'lg:col-span-6' : 'w-full'} space-y-4`}>
              <div className="bg-slate-900 border border-slate-800 rounded-3xl p-4 sm:p-5 shadow-2xl flex flex-col justify-between">
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800 text-xs">
                  <div className="flex items-center gap-2">
                    <Video size={16} className="text-purple-400" />
                    <span className="font-bold text-white">Video: {activeModule.title}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleSwitchLayout('pdf-focus')}
                      className="px-2.5 py-1 rounded-lg bg-cyan-950/60 text-cyan-300 border border-cyan-500/30 text-[11px] hover:bg-cyan-900/60 transition-all flex items-center gap-1"
                      title="Lihat modul PDF materi ini"
                    >
                      <FileText size={12} />
                      <span>Buka Modul PDF</span>
                    </button>
                    <span className="text-slate-400 font-mono text-[11px]">{activeModule.videoSize}</span>
                  </div>
                </div>

                {/* HTML5 Video Element */}
                <div className="relative rounded-2xl overflow-hidden bg-black aspect-video flex items-center justify-center border border-slate-800/80 shadow-inner group">
                  <video
                    ref={videoRef}
                    key={activeModule.videoUrl}
                    src={activeModule.videoUrl}
                    controls
                    className="w-full h-full object-contain"
                    onPlay={() => setIsPlaying(true)}
                    onPause={() => setIsPlaying(false)}
                  >
                    Browser Anda tidak mendukung pemutar video HTML5.
                  </video>
                </div>

                {/* Video Quick Controls & Speed Switcher */}
                <div className="pt-4 flex flex-wrap items-center justify-between gap-3 text-xs">
                  {/* Skip Buttons */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleSkip(-10)}
                      className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center gap-1 transition-all cursor-pointer active:scale-95"
                      title="Mundur 10 detik"
                    >
                      <RotateCcw size={13} />
                      <span>-10s</span>
                    </button>
                    <button
                      onClick={() => handleSkip(10)}
                      className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center gap-1 transition-all cursor-pointer active:scale-95"
                      title="Maju 10 detik"
                    >
                      <span>+10s</span>
                      <RotateCw size={13} />
                    </button>
                  </div>

                  {/* Playback Speed Controls */}
                  <div className="flex items-center gap-1.5 bg-slate-950/80 p-1 rounded-xl border border-slate-800">
                    <span className="text-[11px] text-slate-400 px-1.5 flex items-center gap-1">
                      <Gauge size={12} />
                      <span className="hidden sm:inline">Kecepatan:</span>
                    </span>
                    {[0.75, 1, 1.25, 1.5, 2].map((speed) => (
                      <button
                        key={speed}
                        onClick={() => handleSpeedChange(speed)}
                        className={`px-2 py-1 rounded-lg text-[11px] font-mono font-semibold transition-all cursor-pointer ${
                          playbackSpeed === speed
                            ? 'bg-purple-500 text-white shadow-sm font-bold'
                            : 'text-slate-400 hover:text-white'
                        }`}
                      >
                        {speed}x
                      </button>
                    ))}
                  </div>
                </div>

                {/* Key Points Summary Card */}
                <div className="mt-4 p-4 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-2.5">
                  <div className="text-xs font-bold text-white flex items-center gap-2">
                    <CheckCircle2 size={14} className="text-emerald-400" />
                    <span>Poin Kunci yang Dibahas pada Video Ini:</span>
                  </div>
                  <ul className="space-y-1.5 text-xs text-slate-300">
                    {activeModule.keyPoints.map((point, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-purple-400 mt-1.5 shrink-0"></span>
                        <span className="leading-relaxed">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* In-Card Navigation Controls (Guarantees user is NEVER stuck!) */}
                <div className="mt-4 pt-3 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-2">
                  <button
                    onClick={onBackToQuiz}
                    className="flex items-center gap-1.5 px-3.5 py-2 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-bold rounded-xl text-xs transition-all shadow-md shadow-amber-950 active:scale-95 cursor-pointer"
                  >
                    <ArrowLeft size={14} />
                    <span>Kembali ke Kuis Ujian</span>
                  </button>

                  <button
                    onClick={() => handleSwitchLayout('pdf-focus')}
                    className="flex items-center gap-1.5 px-3 py-2 bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-slate-700 rounded-xl text-xs font-semibold transition-all cursor-pointer"
                  >
                    <BookOpen size={14} className="text-cyan-400" />
                    <span>Baca Modul PDF Materi Ini</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* PDF Reader Column */}
          {(layoutMode === 'split' || layoutMode === 'pdf-focus') && (
            <div className={`${layoutMode === 'split' ? 'lg:col-span-6' : 'w-full'} space-y-4`}>
              <div className="bg-slate-900 border border-slate-800 rounded-3xl p-4 sm:p-5 shadow-2xl flex flex-col h-full min-h-[550px] lg:min-h-[720px]">
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800 text-xs">
                  <div className="flex items-center gap-2">
                    <BookOpen size={16} className="text-amber-400" />
                    <span className="font-bold text-white">{activeModule.title}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleSwitchLayout('video-focus')}
                      className="px-2.5 py-1 rounded-lg bg-purple-950/60 text-purple-300 border border-purple-500/30 text-[11px] hover:bg-purple-900/60 transition-all flex items-center gap-1"
                      title="Putar video penjelasan materi ini"
                    >
                      <Video size={12} />
                      <span>Putar Video</span>
                    </button>
                    <span className="px-2 py-0.5 rounded-md bg-amber-500/10 text-amber-300 border border-amber-500/30 text-[10px] font-mono">
                      {activeModule.pageCount}
                    </span>
                  </div>
                </div>

                {/* Interactive Embedded PDF Viewer */}
                <div className="flex-1 w-full rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 relative shadow-inner">
                  <iframe
                    key={activeModule.pdfUrl}
                    src={`${activeModule.pdfUrl}#toolbar=1&navpanes=1&zoom=page-width`}
                    title={activeModule.title}
                    className="w-full h-full min-h-[500px] lg:min-h-[640px] border-0"
                  />
                </div>

                {/* PDF Card Footer */}
                <div className="pt-3 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-400">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={onBackToQuiz}
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-bold rounded-xl text-xs transition-all shadow-md shadow-amber-950 active:scale-95 cursor-pointer"
                    >
                      <ArrowLeft size={13} />
                      <span>Kembali ke Kuis Ujian</span>
                    </button>
                    <button
                      onClick={() => handleSwitchLayout('video-focus')}
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-purple-300 border border-slate-700 rounded-xl text-xs font-semibold cursor-pointer"
                    >
                      <Tv size={13} />
                      <span>Nonton Video Materi</span>
                    </button>
                  </div>

                  <a
                    href={activeModule.pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-amber-400 hover:underline flex items-center gap-1 font-semibold"
                  >
                    <span>Buka Layar Penuh</span>
                    <ExternalLink size={12} />
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Persistent Bottom Action Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-850 to-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-400 shrink-0">
            <GraduationCap size={20} />
          </div>
          <div>
            <h4 className="text-sm font-bold text-white">Sudah Siap Menguji Pemahaman Anda?</h4>
            <p className="text-xs text-slate-400">
              Latihan dengan 80 soal ujian lengkap & generator soal dinamis tanpa batas untuk persiapan ujian besok.
            </p>
          </div>
        </div>

        <button
          onClick={onBackToQuiz}
          className="w-full sm:w-auto px-5 py-2.5 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-400 hover:from-amber-400 hover:to-orange-300 text-slate-950 font-extrabold rounded-xl text-xs sm:text-sm transition-all shadow-lg shadow-amber-950 active:scale-95 flex items-center justify-center gap-2 cursor-pointer shrink-0"
        >
          <span>Mulai Kerjakan Kuis Ujian</span>
          <ArrowRight size={16} />
        </button>
      </div>

      {/* Floating Instant Back-to-Quiz Button (Fixed at bottom right) */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={onBackToQuiz}
          className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-bold rounded-full shadow-2xl shadow-amber-500/30 border border-amber-300/40 text-xs sm:text-sm transition-all active:scale-95 cursor-pointer hover:scale-105"
          title="Klik kapan saja untuk kembali ke Kuis Ujian"
        >
          <ArrowLeft size={16} />
          <span>Kembali ke Kuis</span>
        </button>
      </div>
    </div>
  );
}

export default ModuleCenter;
