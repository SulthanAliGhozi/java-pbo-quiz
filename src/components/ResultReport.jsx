// src/components/ResultReport.jsx
import React, { useState, useEffect } from 'react';
import {
  Trophy,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  RotateCcw,
  Printer,
  ChevronDown,
  ChevronUp,
  Filter,
  Code
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { TOPICS } from '../data/questions';

export function ResultReport({ questions, answers, flagged, onReset, userProfile }) {
  const [filterMode, setFilterMode] = useState('all'); // all, wrong, correct, flagged
  const [expandedId, setExpandedId] = useState(null);

  // Calculate statistics
  let correctCount = 0;
  let wrongCount = 0;
  let unansweredCount = 0;

  const categoryStats = {
    [TOPICS.STORY]: { total: 0, correct: 0 },
    [TOPICS.INHERITANCE]: { total: 0, correct: 0 },
    [TOPICS.POLYMORPHISM]: { total: 0, correct: 0 },
    [TOPICS.ABSTRACT_CLASS]: { total: 0, correct: 0 },
    [TOPICS.INTERFACE]: { total: 0, correct: 0 },
  };

  const results = questions.map(q => {
    const userAns = answers[q.id];
    let isCorrect = false;
    let isAnswered = false;

    if (userAns !== undefined && userAns !== null && userAns !== '') {
      if (q.type === 'matching') {
        isAnswered = Array.isArray(userAns) && userAns.length === q.subQuestions?.length && userAns.every(v => v !== '' && v !== undefined && v !== null);
      } else if (Array.isArray(userAns)) {
        isAnswered = userAns.length > 0;
      } else {
        isAnswered = true;
      }

      if (q.type === 'single_choice') {
        isCorrect = userAns === q.correctAnswer;
      } else if (q.type === 'multiple_choice') {
        if (Array.isArray(userAns)) {
          const sortedUser = [...userAns].sort();
          const sortedCorrect = [...q.correctAnswer].sort();
          isCorrect = JSON.stringify(sortedUser) === JSON.stringify(sortedCorrect);
        }
      } else if (q.type === 'text_input') {
        const cleanUser = String(userAns).trim().toLowerCase();
        isCorrect = q.correctAnswer.some(ans => cleanUser === String(ans).trim().toLowerCase());
      } else if (q.type === 'matching') {
        if (Array.isArray(userAns) && userAns.length === q.subQuestions?.length) {
          isCorrect = userAns.every((val, idx) => val !== '' && val !== null && val !== undefined && Number(val) === q.correctAnswer[idx]);
        }
      }
    }

    if (!isAnswered) unansweredCount++;
    else if (isCorrect) correctCount++;
    else wrongCount++;

    if (categoryStats[q.topic]) {
      categoryStats[q.topic].total++;
      if (isCorrect) categoryStats[q.topic].correct++;
    }

    return {
      ...q,
      userAnswer: userAns,
      isCorrect,
      isAnswered,
      isFlagged: !!flagged[q.id]
    };
  });

  const totalScore = Math.round((correctCount / questions.length) * 100);

  useEffect(() => {
    if (totalScore >= 70) {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 }
      });
    }
  }, [totalScore]);

  const filteredResults = results.filter(r => {
    if (filterMode === 'correct') return r.isCorrect;
    if (filterMode === 'wrong') return !r.isCorrect && r.isAnswered;
    if (filterMode === 'unanswered') return !r.isAnswered;
    if (filterMode === 'flagged') return r.isFlagged;
    return true;
  });

  const getGradeInfo = (score) => {
    if (score >= 90) return { grade: 'A+', text: 'Istimewa! Penguasaan PBO Sangat Matang', color: 'text-emerald-400' };
    if (score >= 80) return { grade: 'A', text: 'Bagus Sekali! Konsep OOP Sudah Dikuasai', color: 'text-teal-400' };
    if (score >= 70) return { grade: 'B', text: 'Cukup Baik! Sedikit pemantapan lagi', color: 'text-cyan-400' };
    if (score >= 60) return { grade: 'C', text: 'Perlu Latihan Ulang pada Konsep Abstrak & Interface', color: 'text-amber-400' };
    return { grade: 'D', text: 'Pelajari Kembali Materi Dasar PBO Java', color: 'text-rose-400' };
  };

  const gradeInfo = getGradeInfo(totalScore);

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Score Hero Card */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl -z-10 pointer-events-none"></div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Left Hero */}
          <div className="space-y-3 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-bold uppercase tracking-wider">
              <Trophy size={14} className="text-amber-400" />
              <span>Hasil Evaluasi PBO Java</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
              Nilai Akhir: <span className={gradeInfo.color}>{totalScore} / 100</span>
            </h2>
            <p className="text-sm sm:text-base text-slate-300">
              Predikat: <span className="font-bold text-white">{gradeInfo.grade}</span> &bull; {gradeInfo.text}
            </p>

            {/* Student Info Card */}
            {userProfile?.name && (
              <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-xl bg-slate-950/70 border border-slate-800 text-xs text-slate-300 shadow-inner">
                <span className="text-base">{userProfile.avatar || '👨‍💻'}</span>
                <div>
                  <span className="text-slate-400">Peserta: </span>
                  <span className="font-bold text-amber-300">{userProfile.name}</span>
                  {userProfile.nim && (
                    <span className="text-slate-400 font-mono ml-1.5">({userProfile.nim})</span>
                  )}
                </div>
              </div>
            )}

            {/* Action buttons */}
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 pt-3">
              <button
                onClick={onReset}
                className="flex items-center gap-2 px-4 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl text-sm transition-all shadow-lg shadow-amber-950 active:scale-95"
              >
                <RotateCcw size={16} />
                <span>Ulangi Ujian</span>
              </button>
              <button
                onClick={() => window.print()}
                className="flex items-center gap-2 px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold rounded-xl text-sm transition-all border border-slate-700 active:scale-95"
              >
                <Printer size={16} />
                <span>Cetak / Simpan PDF</span>
              </button>
            </div>
          </div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-3 gap-3 w-full md:w-auto">
            <div className="bg-slate-950/80 border border-emerald-500/30 p-4 rounded-2xl text-center">
              <div className="flex justify-center text-emerald-400 mb-1">
                <CheckCircle2 size={24} />
              </div>
              <div className="text-2xl font-bold font-mono text-emerald-300">{correctCount}</div>
              <div className="text-[11px] text-slate-400">Jawaban Benar</div>
            </div>

            <div className="bg-slate-950/80 border border-rose-500/30 p-4 rounded-2xl text-center">
              <div className="flex justify-center text-rose-400 mb-1">
                <XCircle size={24} />
              </div>
              <div className="text-2xl font-bold font-mono text-rose-300">{wrongCount}</div>
              <div className="text-[11px] text-slate-400">Jawaban Salah</div>
            </div>

            <div className="bg-slate-950/80 border border-slate-700 p-4 rounded-2xl text-center">
              <div className="flex justify-center text-slate-400 mb-1">
                <AlertTriangle size={24} />
              </div>
              <div className="text-2xl font-bold font-mono text-slate-300">{unansweredCount}</div>
              <div className="text-[11px] text-slate-400">Tidak Dijawab</div>
            </div>
          </div>
        </div>

        {/* Category Breakdown Progress */}
        <div className="mt-8 pt-6 border-t border-slate-800">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">
            Analisis Penguasaan Per Kategori Materi
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {Object.entries(categoryStats).map(([topic, stat]) => {
              const percent = stat.total > 0 ? Math.round((stat.correct / stat.total) * 100) : 0;
              return (
                <div key={topic} className="bg-slate-950/60 p-4 rounded-xl border border-slate-800">
                  <div className="flex justify-between items-center mb-1.5 text-xs">
                    <span className="font-semibold text-slate-200">{topic}</span>
                    <span className="font-mono text-amber-300">{percent}%</span>
                  </div>
                  <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-amber-500 h-full transition-all duration-500"
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                  <div className="mt-2 text-[11px] text-slate-400 flex justify-between">
                    <span>Benar: {stat.correct}</span>
                    <span>Total: {stat.total}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Question Review Section */}
      <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
              <span>Tinjauan Lengkap Soal & Pembahasan</span>
            </h3>
            <p className="text-xs text-slate-400">
              Periksa kunci jawaban resmi dan pelajari pembahasan konsep PBO di setiap nomor
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5 bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
            <button
              onClick={() => setFilterMode('all')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                filterMode === 'all' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Semua ({results.length})
            </button>
            <button
              onClick={() => setFilterMode('correct')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                filterMode === 'correct' ? 'bg-emerald-600 text-white font-bold' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Benar ({correctCount})
            </button>
            <button
              onClick={() => setFilterMode('wrong')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                filterMode === 'wrong' ? 'bg-rose-600 text-white font-bold' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Salah ({wrongCount})
            </button>
            <button
              onClick={() => setFilterMode('unanswered')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                filterMode === 'unanswered' ? 'bg-slate-700 text-white font-bold' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Kosong ({unansweredCount})
            </button>
          </div>
        </div>

        {/* Question Cards List */}
        <div className="space-y-4">
          {filteredResults.map((q, idx) => {
            const isExpanded = expandedId === q.id;

            return (
              <div
                key={q.id}
                className={`border rounded-xl transition-all overflow-hidden ${
                  q.isCorrect
                    ? 'border-emerald-500/30 bg-emerald-950/10'
                    : !q.isAnswered
                    ? 'border-slate-800 bg-slate-950/30'
                    : 'border-rose-500/30 bg-rose-950/10'
                }`}
              >
                {/* Header Row */}
                <button
                  onClick={() => setExpandedId(isExpanded ? null : q.id)}
                  className="w-full text-left p-4 sm:p-5 flex items-start sm:items-center justify-between gap-3 hover:bg-slate-800/40 transition-colors"
                >
                  <div className="flex items-start sm:items-center gap-3 flex-1">
                    <span className="w-8 h-8 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center font-mono text-xs font-bold text-slate-300 shrink-0">
                      #{q.id}
                    </span>

                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <span className="text-xs font-semibold text-amber-400">{q.topic}</span>
                        <span className="text-[10px] text-slate-500">&bull;</span>
                        <span className="text-[11px] text-slate-400">{q.difficulty}</span>
                      </div>
                      <div className="text-sm font-medium text-slate-200 line-clamp-1">
                        {q.question}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    {q.isCorrect ? (
                      <span className="flex items-center gap-1 text-emerald-400 text-xs font-semibold px-2.5 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/30">
                        <CheckCircle2 size={13} /> Benar
                      </span>
                    ) : !q.isAnswered ? (
                      <span className="text-slate-400 text-xs font-medium px-2 py-1 rounded-md bg-slate-800">
                        Kosong
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-rose-400 text-xs font-semibold px-2.5 py-1 rounded-md bg-rose-500/10 border border-rose-500/30">
                        <XCircle size={13} /> Salah
                      </span>
                    )}

                    {isExpanded ? <ChevronUp size={18} className="text-slate-400" /> : <ChevronDown size={18} className="text-slate-400" />}
                  </div>
                </button>

                {/* Expanded Details */}
                {isExpanded && (
                  <div className="p-5 border-t border-slate-800/80 bg-slate-950/70 space-y-4">
                    <div className="text-sm text-slate-100 font-medium">
                      {q.question}
                    </div>

                    {q.code && (
                      <div className="bg-[#0d1117] p-3 rounded-lg border border-slate-800 text-xs font-mono text-slate-200 overflow-x-auto">
                        <pre><code>{q.code}</code></pre>
                      </div>
                    )}

                    {/* Answers Comparison */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                      <div className="bg-slate-900 p-3 rounded-lg border border-slate-800">
                        <div className="text-slate-400 font-semibold mb-1">Jawaban Anda:</div>
                        <div className="font-mono text-slate-200">
                          {q.userAnswer === undefined || q.userAnswer === null || q.userAnswer === ''
                            ? '(Tidak dijawab)'
                            : q.type === 'single_choice'
                            ? `[${['A','B','C','D','E'][q.userAnswer]}] ${q.options[q.userAnswer]}`
                            : q.type === 'multiple_choice'
                            ? (Array.isArray(q.userAnswer) ? q.userAnswer.map(i => `[${['A','B','C','D','E'][i]}] ${q.options[i]}`).join(', ') : String(q.userAnswer))
                            : q.type === 'matching'
                            ? (Array.isArray(q.userAnswer) ? q.subQuestions?.map((sq, i) => `${i+1}. ${q.userAnswer[i] !== '' && q.userAnswer[i] !== undefined ? q.options[q.userAnswer[i]] : '-'}`).join(' | ') : '-')
                            : String(q.userAnswer)}
                        </div>
                      </div>

                      <div className="bg-emerald-950/30 p-3 rounded-lg border border-emerald-500/30">
                        <div className="text-emerald-400 font-semibold mb-1">Kunci Jawaban Resmi:</div>
                        <div className="font-mono text-emerald-200 font-medium">
                          {q.type === 'single_choice'
                            ? `[${['A','B','C','D','E'][q.correctAnswer]}] ${q.options[q.correctAnswer]}`
                            : q.type === 'multiple_choice'
                            ? q.correctAnswer.map(i => `[${['A','B','C','D','E'][i]}] ${q.options[i]}`).join(', ')
                            : q.type === 'matching'
                            ? q.subQuestions?.map((sq, i) => `${i+1}. ${q.options[q.correctAnswer[i]]}`).join(' | ')
                            : q.correctAnswer.join(' atau ')}
                        </div>
                      </div>
                    </div>

                    {/* Explanation */}
                    <div className="bg-slate-900/90 p-3.5 rounded-lg border border-slate-800 text-xs text-slate-300 leading-relaxed">
                      <span className="font-bold text-amber-400 block mb-1">💡 Penjelasan / Konsep Teori:</span>
                      {q.explanation}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
