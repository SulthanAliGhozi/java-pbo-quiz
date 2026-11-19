// src/components/Header.jsx
import React from 'react';
import { BookOpen, GraduationCap, Clock, RotateCcw, Award, Shuffle, History, User, Video, CheckCircle2, Sliders } from 'lucide-react';

export function Header({
  mode,
  setMode,
  timeLeft,
  totalQuestions,
  answeredCount,
  onReset,
  onFinish,
  onShuffle,
  onOpenHistory,
  historyCount = 0,
  userProfile,
  onEditProfile,
  viewMode = 'quiz',
  setViewMode,
  isFinished
}) {
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const progressPercent = Math.round((answeredCount / totalQuestions) * 100);

  return (
    <header className="sticky top-0 z-30 bg-slate-950/90 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo & Title */}
          <div 
            onClick={() => setViewMode('quiz')}
            className="flex items-center gap-3 cursor-pointer group"
            title="Kembali ke Halaman Utama Kuis Ujian"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-600 to-amber-400 flex items-center justify-center shadow-lg shadow-amber-500/20 shrink-0 group-hover:scale-105 transition-transform">
              <span className="text-xl">☕</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg sm:text-xl font-bold bg-gradient-to-r from-amber-400 via-orange-300 to-amber-200 bg-clip-text text-transparent group-hover:from-amber-300 group-hover:to-white transition-colors">
                  Java OOP Master
                </h1>
                <span className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-semibold tracking-wider uppercase bg-amber-500/10 text-amber-300 border border-amber-500/30 rounded-full">
                  {totalQuestions} Soal &bull; Ujian PBO
                </span>
              </div>
              <p className="text-xs text-slate-400 hidden sm:block">
                Inheritance &bull; Polymorphism &bull; Abstract Class &bull; Interface &bull; Soal Cerita
              </p>
            </div>
          </div>

          {/* Navigation & Controls */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* View Mode Switcher: 3 Dedicated Nav Menus */}
            <div className="flex items-center p-1 bg-slate-900 border border-slate-800 rounded-xl text-xs shadow-inner">
              {/* Menu 1: Kuis Ujian */}
              <button
                onClick={() => setViewMode('quiz')}
                className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg font-medium transition-all cursor-pointer ${
                  viewMode === 'quiz'
                    ? 'bg-amber-500 text-slate-950 shadow-md font-bold'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
                title="Buka Halaman Soal Kuis & Ujian PBO"
              >
                <GraduationCap size={14} className={viewMode === 'quiz' ? 'text-slate-950' : 'text-amber-400'} />
                <span className="hidden sm:inline">Kuis Ujian</span>
                <span className="sm:hidden">Kuis</span>
              </button>

              {/* Menu 2: Modul Belajar PDF */}
              <button
                onClick={() => setViewMode('modul')}
                className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg font-medium transition-all cursor-pointer ${
                  viewMode === 'modul'
                    ? 'bg-cyan-500 text-slate-950 shadow-md font-bold'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
                title="Buka Pusat Modul Teori PDF Lengkap (4 Modul)"
              >
                <BookOpen size={14} className={viewMode === 'modul' ? 'text-slate-950' : 'text-cyan-400'} />
                <span className="hidden sm:inline">Modul</span>
                <span className="sm:hidden">Modul</span>
                <span className="px-1.5 py-0.2 rounded-full bg-cyan-400/20 text-cyan-300 text-[10px] font-mono hidden md:inline">4</span>
              </button>

              {/* Menu 3: Video Materi Pembahasan */}
              <button
                onClick={() => setViewMode('video')}
                className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg font-medium transition-all cursor-pointer ${
                  viewMode === 'video'
                    ? 'bg-purple-500 text-white shadow-md font-bold'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
                title="Buka Pemutar Video Pembahasan Materi Interaktif"
              >
                <Video size={14} className={viewMode === 'video' ? 'text-white' : 'text-purple-400'} />
                <span className="hidden sm:inline">Video</span>
                <span className="sm:hidden">Video</span>
                <span className="px-1.5 py-0.2 rounded-full bg-purple-400/20 text-purple-200 text-[10px] font-mono hidden md:inline">4</span>
              </button>

              {/* Menu 4: Kelola Bank Soal */}
              <button
                onClick={() => setViewMode('manage')}
                className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg font-medium transition-all cursor-pointer ${
                  viewMode === 'manage'
                    ? 'bg-emerald-500 text-slate-950 shadow-md font-bold'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
                title="Buka Pusat Pengelolaan & Bank Soal PBO"
              >
                <Sliders size={14} className={viewMode === 'manage' ? 'text-slate-950' : 'text-emerald-400'} />
                <span className="hidden sm:inline">Kelola Soal</span>
                <span className="sm:hidden">Kelola</span>
              </button>
            </div>

            {/* Quick Back to Quiz Button when in Modul or Video view */}
            {viewMode !== 'quiz' && (
              <button
                onClick={() => setViewMode('quiz')}
                className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-bold rounded-xl text-xs transition-all shadow-md shadow-amber-950 active:scale-95 cursor-pointer"
                title="Kembali ke kuis ujian sekarang"
              >
                <RotateCcw size={13} />
                <span className="hidden md:inline">Kembali ke Kuis</span>
                <span className="md:hidden">Kuis</span>
              </button>
            )}

            {/* User Profile Chip */}
            <button
              onClick={onEditProfile}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-slate-900 border border-slate-700/80 hover:border-amber-400 text-slate-300 hover:text-white text-xs font-semibold transition-all hover:bg-slate-800 shadow-sm active:scale-95 cursor-pointer group"
              title="Klik untuk mengubah nama peserta ujian"
            >
              <span className="text-sm">{userProfile?.avatar || '👨‍💻'}</span>
              <span className="max-w-[70px] sm:max-w-[120px] truncate text-amber-300/90 group-hover:text-amber-300">
                {userProfile?.name || 'Peserta'}
              </span>
            </button>

            {/* History Button */}
            <button
              onClick={onOpenHistory}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700 hover:border-slate-600 text-slate-300 hover:text-white text-xs font-semibold transition-all hover:bg-slate-800 shadow-sm active:scale-95 cursor-pointer"
              title="Lihat riwayat skor & evaluasi ujian Anda"
            >
              <History size={14} className="text-cyan-400" />
              <span className="hidden sm:inline">Riwayat</span>
              {historyCount > 0 && (
                <span className="px-1.5 py-0.2 rounded-full bg-cyan-500/20 text-cyan-300 text-[10px] font-mono">
                  {historyCount}
                </span>
              )}
            </button>

            {/* Quiz-specific controls */}
            {viewMode === 'quiz' && (
              <>
                {/* Shuffle Button */}
                {!isFinished && (
                  <button
                    onClick={onShuffle}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 border border-amber-500/30 hover:border-amber-400 text-amber-300 text-xs font-semibold transition-all hover:bg-slate-800 shadow-sm active:scale-95 cursor-pointer"
                    title="Acak urutan soal dan pilihan jawaban"
                  >
                    <Shuffle size={14} className="text-amber-400" />
                    <span className="hidden md:inline">Acak Soal</span>
                  </button>
                )}

                {/* Mode Selector */}
                <div className="hidden md:flex items-center p-1 bg-slate-900 border border-slate-800 rounded-xl text-xs">
                  <button
                    onClick={() => setMode('study')}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium transition-all cursor-pointer ${
                      mode === 'study'
                        ? 'bg-amber-500 text-slate-950 shadow-md font-semibold'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <span>Mode Belajar</span>
                  </button>
                  <button
                    onClick={() => setMode('exam')}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium transition-all cursor-pointer ${
                      mode === 'exam'
                        ? 'bg-cyan-500 text-slate-950 shadow-md font-semibold'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <span>Mode Ujian</span>
                  </button>
                </div>

                {/* Timer for Exam Mode */}
                {mode === 'exam' && !isFinished && (
                  <div className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 border border-cyan-500/30 text-cyan-400 rounded-xl font-mono text-sm shadow-sm">
                    <Clock size={15} className="animate-pulse text-cyan-400" />
                    <span>{formatTime(timeLeft)}</span>
                  </div>
                )}

                {/* Finish Button */}
                {!isFinished ? (
                  <button
                    onClick={onFinish}
                    className="flex items-center gap-1.5 px-3.5 py-1.5 bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white rounded-xl text-xs sm:text-sm font-semibold transition-all shadow-lg shadow-emerald-950 active:scale-95 cursor-pointer"
                  >
                    <Award size={15} />
                    <span>Selesai</span>
                  </button>
                ) : (
                  <button
                    onClick={onReset}
                    className="flex items-center gap-1.5 px-3.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs sm:text-sm font-semibold transition-all border border-slate-700 cursor-pointer"
                  >
                    <RotateCcw size={14} />
                    <span>Ulangi</span>
                  </button>
                )}
              </>
            )}
          </div>
        </div>

        {/* Global Progress Bar (shown in quiz mode) */}
        {viewMode === 'quiz' && (
          <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden mb-1 border border-slate-800/60">
            <div
              className="h-full bg-gradient-to-r from-amber-500 via-orange-500 to-emerald-500 transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        )}
      </div>
    </header>
  );
}
export default Header;
