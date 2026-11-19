// src/components/NavigationPalette.jsx
import React from 'react';
import { Filter, CheckCircle2, Bookmark, Layers, Shuffle, Sparkles } from 'lucide-react';
import { TOPICS } from '../data/questions';

export function NavigationPalette({
  questions,
  currentIndex,
  onSelectQuestion,
  answers,
  flagged,
  selectedTopic,
  onSelectTopic,
  onFinishExam,
  onShuffle,
  isFinished
}) {
  const isQuestionAnswered = (q) => {
    const ans = answers[q.id];
    if (ans === undefined || ans === null) return false;
    if (q.type === 'matching') {
      return Array.isArray(ans) && ans.length === q.subQuestions?.length && ans.every(v => v !== '' && v !== undefined && v !== null);
    }
    if (Array.isArray(ans)) return ans.length > 0;
    return ans !== '';
  };

  const answeredCount = questions.filter(isQuestionAnswered).length;
  const flaggedCount = Object.keys(flagged).filter(id => flagged[id]).length;
  const remainingCount = questions.length - answeredCount;

  return (
    <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-2xl backdrop-blur-sm space-y-5">
      {/* Category Filter */}
      <div>
        <div className="flex items-center justify-between text-xs font-bold text-slate-300 uppercase tracking-wider mb-2.5">
          <div className="flex items-center gap-1.5">
            <Filter size={14} className="text-amber-400" />
            <span>Kategori Materi</span>
          </div>
          <button
            onClick={onShuffle}
            className="flex items-center gap-1 text-[11px] text-amber-400 hover:text-amber-300 transition-colors font-mono cursor-pointer"
            title="Acak urutan soal"
          >
            <Shuffle size={12} />
            <span>Acak Soal</span>
          </button>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {Object.values(TOPICS).map((topic) => {
            const isStory = topic === TOPICS.STORY;
            return (
              <button
                key={topic}
                onClick={() => onSelectTopic(topic)}
                className={`px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
                  selectedTopic === topic
                    ? isStory
                      ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-slate-950 font-bold shadow-md shadow-orange-950'
                      : 'bg-amber-500 text-slate-950 font-bold shadow-sm'
                    : isStory
                    ? 'bg-orange-950/40 text-orange-300 border border-orange-500/40 hover:bg-orange-900/40'
                    : 'bg-slate-800 text-slate-400 hover:text-slate-200 border border-slate-700/60 hover:bg-slate-750'
                }`}
              >
                {isStory && <Sparkles size={12} className={selectedTopic === topic ? 'text-slate-950' : 'text-orange-400'} />}
                <span>{topic}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Status Legend */}
      <div className="pt-3 border-t border-slate-800 grid grid-cols-3 gap-2 text-[11px] text-slate-300">
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded bg-emerald-500 shadow-sm shadow-emerald-500/30 shrink-0"></span>
          <span>Terjawab ({answeredCount})</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded bg-amber-500 shadow-sm shadow-amber-500/30 shrink-0"></span>
          <span>Ragu ({flaggedCount})</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded bg-slate-800 border border-slate-700 shrink-0"></span>
          <span>Belum ({remainingCount})</span>
        </div>
      </div>

      {/* Grid of Questions */}
      <div>
        <div className="flex items-center justify-between text-xs font-bold text-slate-300 uppercase tracking-wider mb-2.5">
          <div className="flex items-center gap-1.5">
            <Layers size={14} className="text-cyan-400" />
            <span>Daftar Nomor Soal</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded-md bg-cyan-500/15 text-cyan-300 border border-cyan-500/40 text-[10px] font-mono font-semibold">
              Aktif: #{currentIndex + 1}
            </span>
            <span className="text-slate-500 font-mono text-[11px]">Total: {questions.length}</span>
          </div>
        </div>
        
        {/* Scrollable Container with interior padding to prevent clipping */}
        <div className="p-2 rounded-xl bg-slate-950/60 border border-slate-800/80 max-h-[340px] overflow-y-auto">
          <div className="grid grid-cols-5 gap-2">
            {questions.map((q, idx) => {
              const answered = isQuestionAnswered(q);
              const isFlag = !!flagged[q.id];
              const isCurrent = currentIndex === idx;

              let btnStyle = '';

              if (isCurrent) {
                if (answered) {
                  btnStyle = 'bg-emerald-600 text-white font-bold border-2 border-cyan-300 shadow-[0_0_10px_rgba(34,211,238,0.4)]';
                } else if (isFlag) {
                  btnStyle = 'bg-amber-500 text-slate-950 font-bold border-2 border-cyan-300 shadow-[0_0_10px_rgba(34,211,238,0.4)]';
                } else {
                  btnStyle = 'bg-slate-800 text-cyan-300 font-bold border-2 border-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.35)]';
                }
              } else {
                if (answered) {
                  btnStyle = 'bg-emerald-600/90 text-white font-semibold border border-emerald-500/80 hover:bg-emerald-500 shadow-sm';
                } else if (isFlag) {
                  btnStyle = 'bg-amber-500 text-slate-950 font-bold border border-amber-400 hover:bg-amber-400 shadow-sm';
                } else {
                  btnStyle = 'bg-slate-800/80 text-slate-300 font-medium border border-slate-700/80 hover:bg-slate-700 hover:text-white hover:border-slate-600';
                }
              }

              return (
                <button
                  key={q.id}
                  onClick={() => onSelectQuestion(idx)}
                  className={`h-9 rounded-lg text-xs font-mono flex flex-col items-center justify-center transition-all cursor-pointer relative ${btnStyle}`}
                  title={`Soal ${idx + 1} (${q.topic} - ${q.difficulty})`}
                >
                  <span className={isCurrent ? 'font-bold' : ''}>{idx + 1}</span>
                  {/* Subtle, crisp active indicator dot */}
                  {isCurrent && (
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-300 absolute bottom-1 shadow-[0_0_4px_#67e8f9]"></span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Finish / Submit CTA */}
      {!isFinished && (
        <div className="pt-3 border-t border-slate-800">
          <button
            onClick={onFinishExam}
            className="w-full py-3 bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 hover:from-emerald-500 hover:via-teal-500 hover:to-cyan-500 text-white font-bold rounded-xl text-sm transition-all shadow-lg shadow-emerald-950 flex items-center justify-center gap-2 active:scale-95 cursor-pointer"
          >
            <CheckCircle2 size={16} />
            <span>Kirim & Selesaikan Ujian</span>
          </button>
          <p className="text-[11px] text-slate-500 text-center mt-2">
            Hasil skor & pembahasan lengkap akan langsung ditampilkan
          </p>
        </div>
      )}
    </div>
  );
}
