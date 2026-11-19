// src/components/HistoryModal.jsx
import React from 'react';
import {
  Trophy,
  History,
  Clock,
  CheckCircle2,
  XCircle,
  Eye,
  RotateCcw,
  Trash2,
  X,
  Calendar,
  Sparkles
} from 'lucide-react';

export function HistoryModal({
  isOpen,
  onClose,
  history,
  onReviewAttempt,
  onRetakeAttempt,
  onClearHistory,
  onDeleteAttempt
}) {
  if (!isOpen) return null;

  // Calculate summary metrics
  const totalAttempts = history.length;
  const bestScore = totalAttempts > 0 ? Math.max(...history.map(h => h.score || 0)) : 0;
  const avgScore = totalAttempts > 0 ? Math.round(history.reduce((acc, h) => acc + (h.score || 0), 0) / totalAttempts) : 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-3xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-400">
              <History size={20} />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
                <span>Riwayat Nilai & Evaluasi Ujian</span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 font-mono">
                  {totalAttempts} Sesi
                </span>
              </h2>
              <p className="text-xs text-slate-400">
                Semua hasil ujian dan jawaban Anda tersimpan otomatis di browser
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X size={20} />
          </button>
        </div>

        {/* Summary Metric Cards */}
        {totalAttempts > 0 && (
          <div className="grid grid-cols-3 gap-3 p-5 sm:p-6 pb-2 border-b border-slate-800/60 bg-slate-950/30">
            <div className="p-3.5 bg-slate-900/90 rounded-2xl border border-slate-800 text-center">
              <div className="text-[11px] text-slate-400 font-medium mb-1">Nilai Tertinggi</div>
              <div className="text-xl sm:text-2xl font-extrabold font-mono text-emerald-400">
                {bestScore} <span className="text-xs text-slate-500">/ 100</span>
              </div>
            </div>

            <div className="p-3.5 bg-slate-900/90 rounded-2xl border border-slate-800 text-center">
              <div className="text-[11px] text-slate-400 font-medium mb-1">Rata-rata Skor</div>
              <div className="text-xl sm:text-2xl font-extrabold font-mono text-cyan-400">
                {avgScore} <span className="text-xs text-slate-500">/ 100</span>
              </div>
            </div>

            <div className="p-3.5 bg-slate-900/90 rounded-2xl border border-slate-800 text-center">
              <div className="text-[11px] text-slate-400 font-medium mb-1">Total Latihan</div>
              <div className="text-xl sm:text-2xl font-extrabold font-mono text-amber-400">
                {totalAttempts} <span className="text-xs text-slate-500">kali</span>
              </div>
            </div>
          </div>
        )}

        {/* Attempts List */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-3.5">
          {totalAttempts === 0 ? (
            <div className="text-center py-12 space-y-3">
              <div className="w-14 h-14 mx-auto rounded-2xl bg-slate-800/50 flex items-center justify-center text-slate-500">
                <Trophy size={28} />
              </div>
              <div className="text-slate-300 font-medium">Belum ada riwayat ujian yang diselesaikan</div>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Kerjakan latihan atau ujian dan tekan tombol "Selesai" untuk menyimpan skor dan rekap jawaban Anda di sini.
              </p>
            </div>
          ) : (
            history.map((attempt) => (
              <div
                key={attempt.id}
                className="p-4 sm:p-5 bg-slate-950/70 border border-slate-800 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:border-slate-700 transition-all"
              >
                {/* Score & Info */}
                <div className="flex items-center gap-4">
                  <div className={`w-14 h-14 rounded-2xl flex flex-col items-center justify-center shrink-0 border ${
                    attempt.score >= 80
                      ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-400'
                      : attempt.score >= 65
                      ? 'bg-amber-500/10 border-amber-500/40 text-amber-400'
                      : 'bg-rose-500/10 border-rose-500/40 text-rose-400'
                  }`}>
                    <span className="text-lg font-extrabold font-mono leading-none">{attempt.score}</span>
                    <span className="text-[10px] font-bold mt-0.5">{attempt.grade}</span>
                  </div>

                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <span className="text-xs font-bold text-white">
                        {attempt.sessionTitle || 'Ujian PBO'}
                      </span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-800 text-slate-300 border border-slate-700">
                        {attempt.mode === 'study' ? 'Mode Belajar' : 'Mode Ujian'}
                      </span>
                      {attempt.studentName && (
                        <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-amber-500/15 text-amber-300 border border-amber-500/30">
                          {attempt.studentAvatar || '👨‍💻'} {attempt.studentName}
                        </span>
                      )}
                    </div>

                    <div className="flex flex-wrap items-center gap-3 text-[11px] text-slate-400">
                      <span className="flex items-center gap-1">
                        <Calendar size={12} />
                        {attempt.formattedDate}
                      </span>
                      <span>&bull;</span>
                      <span className="text-emerald-400 font-medium">
                        {attempt.correctCount} Benar
                      </span>
                      <span>&bull;</span>
                      <span className="text-rose-400 font-medium">
                        {attempt.wrongCount} Salah
                      </span>
                      <span>&bull;</span>
                      <span>Total {attempt.totalQuestions} Soal</span>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-2 w-full sm:w-auto justify-end pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-800/80">
                  <button
                    onClick={() => {
                      onReviewAttempt(attempt);
                      onClose();
                    }}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-all cursor-pointer"
                    title="Lihat rincian soal dan jawaban Anda"
                  >
                    <Eye size={13} className="text-cyan-400" />
                    <span>Tinjau Jawaban</span>
                  </button>

                  <button
                    onClick={() => {
                      onRetakeAttempt(attempt);
                      onClose();
                    }}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 text-amber-300 text-xs font-semibold border border-amber-500/30 transition-all cursor-pointer"
                    title="Kerjakan ulang soal-soal sesi ini (Remedial)"
                  >
                    <RotateCcw size={13} className="text-amber-400" />
                    <span>Ulangi (Remedial)</span>
                  </button>

                  <button
                    onClick={() => onDeleteAttempt(attempt.id)}
                    className="p-1.5 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 transition-colors cursor-pointer"
                    title="Hapus riwayat sesi ini"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-4 sm:p-5 border-t border-slate-800 flex items-center justify-between bg-slate-950/60">
          {totalAttempts > 0 ? (
            <button
              onClick={() => {
                if (window.confirm('Bersihkan semua riwayat nilai?')) {
                  onClearHistory();
                }
              }}
              className="text-xs text-rose-400 hover:text-rose-300 transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Trash2 size={13} />
              <span>Bersihkan Semua Riwayat</span>
            </button>
          ) : <div />}

          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs sm:text-sm font-semibold rounded-xl transition-all cursor-pointer"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
}
