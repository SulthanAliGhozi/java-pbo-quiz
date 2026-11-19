// src/components/StudentNameModal.jsx
import React, { useState, useEffect } from 'react';
import { User, GraduationCap, Sparkles, X, CheckCircle2, ArrowRight } from 'lucide-react';

const AVATAR_OPTIONS = ['👨‍💻', '👩‍💻', '☕', '⚡', '🎓', '🚀', '🧠', '💻'];

export function StudentNameModal({
  isOpen,
  onClose,
  initialName = '',
  initialNim = '',
  initialAvatar = '👨‍💻',
  onSave,
  isInitial = false
}) {
  const [name, setName] = useState(initialName);
  const [nim, setNim] = useState(initialNim);
  const [avatar, setAvatar] = useState(initialAvatar);
  const [error, setError] = useState('');

  useEffect(() => {
    setName(initialName);
    setNim(initialNim);
    setAvatar(initialAvatar || '👨‍💻');
  }, [initialName, initialNim, initialAvatar, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) {
      setError('Silakan masukkan nama Anda terlebih dahulu.');
      return;
    }
    setError('');
    onSave({
      name: trimmed,
      nim: nim.trim(),
      avatar: avatar
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-md w-full shadow-2xl overflow-hidden relative">
        {/* Glow accent */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl -z-10 pointer-events-none"></div>

        {/* Header */}
        <div className="p-6 sm:p-7 pb-4 flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-600 to-amber-400 flex items-center justify-center text-2xl shadow-lg shadow-amber-500/20 shrink-0">
              {avatar}
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
                <span>{isInitial ? 'Selamat Datang!' : 'Ubah Profil Peserta'}</span>
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                {isInitial
                  ? 'Masukkan nama Anda untuk mencatat skor dan hasil ujian'
                  : 'Perbarui nama atau identitas peserta ujian Anda'}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => {
              if (isInitial && !initialName) {
                onSave({ name: 'Peserta', nim: '', avatar: avatar || '👨‍💻' });
              }
              onClose();
            }}
            className="p-1.5 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition-colors cursor-pointer"
            title="Tutup dialog"
          >
            <X size={18} />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 sm:p-7 pt-2 space-y-4">
          {/* Avatar selector */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-2">
              Pilih Avatar Karakter:
            </label>
            <div className="flex items-center justify-between gap-1.5 p-2 bg-slate-950/60 border border-slate-800 rounded-xl">
              {AVATAR_OPTIONS.map((emoji) => (
                <button
                  type="button"
                  key={emoji}
                  onClick={() => setAvatar(emoji)}
                  className={`w-9 h-9 rounded-lg text-lg flex items-center justify-center transition-all cursor-pointer ${
                    avatar === emoji
                      ? 'bg-amber-500/25 border-2 border-amber-400 shadow-sm scale-110'
                      : 'hover:bg-slate-800 opacity-70 hover:opacity-100'
                  }`}
                >
                  {emoji}
                </button>
              ))}
            </div>
          </div>

          {/* Name input */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Nama Lengkap / Panggilan <span className="text-amber-400">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                <User size={16} />
              </div>
              <input
                type="text"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  if (error) setError('');
                }}
                placeholder="Contoh: Ali Imron"
                autoFocus
                className={`w-full pl-10 pr-4 py-3 bg-slate-950/80 border rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none transition-all ${
                  error
                    ? 'border-rose-500 ring-1 ring-rose-500'
                    : 'border-slate-800 focus:border-amber-400 focus:ring-1 focus:ring-amber-400'
                }`}
              />
            </div>
            {error && (
              <p className="text-xs text-rose-400 mt-1.5 font-medium flex items-center gap-1">
                <span>&bull;</span> {error}
              </p>
            )}
          </div>

          {/* NIM / Kelas input */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              NIM / Kelas / Instansi <span className="text-slate-500 font-normal">(Opsional)</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                <GraduationCap size={16} />
              </div>
              <input
                type="text"
                value={nim}
                onChange={(e) => setNim(e.target.value)}
                placeholder="Contoh: TI-2A / 230401001"
                className="w-full pl-10 pr-4 py-3 bg-slate-950/80 border border-slate-800 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-all"
              />
            </div>
          </div>

          {/* Info pill */}
          <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-xl text-xs text-amber-300/90 flex items-start gap-2">
            <Sparkles size={15} className="text-amber-400 shrink-0 mt-0.5" />
            <span>
              Nama ini akan dicantumkan di lembar hasil ujian, riwayat skor, dan cetak sertifikat evaluasi Anda.
            </span>
          </div>

          {/* Action Button */}
          <button
            type="submit"
            className="w-full py-3.5 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-400 hover:via-orange-400 hover:to-amber-500 text-slate-950 font-bold rounded-xl text-sm transition-all shadow-lg shadow-amber-950 flex items-center justify-center gap-2 cursor-pointer active:scale-95 mt-2"
          >
            <span>{isInitial ? 'Masuk & Mulai Latihan' : 'Simpan Perubahan'}</span>
            <ArrowRight size={16} />
          </button>

          {isInitial && (
            <button
              type="button"
              onClick={() => {
                onSave({ name: 'Peserta', nim: '', avatar: avatar || '👨‍💻' });
                onClose();
              }}
              className="w-full py-1.5 text-xs text-slate-400 hover:text-slate-200 transition-colors text-center cursor-pointer"
            >
              Lewati dulu, saya ingin belajar sebagai tamu &rarr;
            </button>
          )}
        </form>
      </div>
    </div>
  );
}
export default StudentNameModal;
