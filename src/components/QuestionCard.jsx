// src/components/QuestionCard.jsx
import React, { useState, useEffect } from 'react';
import {
  Bookmark,
  CheckCircle2,
  XCircle,
  HelpCircle,
  ChevronLeft,
  ChevronRight,
  Send,
  Sparkles,
  Info
} from 'lucide-react';
import { CodeBlock } from './CodeBlock';
import { DiagramView } from './Diagrams';

export function QuestionCard({
  question,
  currentIndex,
  totalQuestions,
  userAnswer,
  isFlagged,
  onAnswer,
  onToggleFlag,
  onPrev,
  onNext,
  mode,
  isFinished
}) {
  const [textInputValue, setTextInputValue] = useState('');
  const [showExplanation, setShowExplanation] = useState(false);

  // Sync text input with stored user answer
  useEffect(() => {
    if (question.type === 'text_input') {
      setTextInputValue(userAnswer || '');
    }
    // In study mode, keep explanation hidden until user submits/checks or when finished
    if (isFinished) {
      setShowExplanation(true);
    } else if (mode === 'study' && userAnswer !== undefined && userAnswer !== null && userAnswer !== '') {
      setShowExplanation(true);
    } else {
      setShowExplanation(false);
    }
  }, [question.id, userAnswer, mode, isFinished]);

  const handleTextSubmit = (e) => {
    e?.preventDefault();
    if (textInputValue.trim()) {
      onAnswer(question.id, textInputValue.trim());
      if (mode === 'study') {
        setShowExplanation(true);
      }
    }
  };

  const handleSingleSelect = (index) => {
    onAnswer(question.id, index);
    if (mode === 'study') {
      setShowExplanation(true);
    }
  };

  const handleMultiSelect = (index) => {
    const current = Array.isArray(userAnswer) ? [...userAnswer] : [];
    const foundIndex = current.indexOf(index);
    if (foundIndex > -1) {
      current.splice(foundIndex, 1);
    } else {
      current.push(index);
      current.sort();
    }
    onAnswer(question.id, current);
  };

  const handleMatchingSelect = (subIdx, value) => {
    const totalSubs = question.subQuestions?.length || 0;
    const current = Array.isArray(userAnswer)
      ? [...userAnswer]
      : new Array(totalSubs).fill('');
    while (current.length < totalSubs) current.push('');
    current[subIdx] = value === '' ? '' : Number(value);
    onAnswer(question.id, current);
    if (mode === 'study' && current.every(val => val !== '' && val !== undefined)) {
      setShowExplanation(true);
    }
  };

  // Helper to determine if answer is correct
  const checkIsCorrect = () => {
    if (userAnswer === undefined || userAnswer === null || userAnswer === '') return false;
    if (question.type === 'single_choice') {
      return userAnswer === question.correctAnswer;
    }
    if (question.type === 'multiple_choice') {
      if (!Array.isArray(userAnswer)) return false;
      const sortedUser = [...userAnswer].sort();
      const sortedCorrect = [...question.correctAnswer].sort();
      return JSON.stringify(sortedUser) === JSON.stringify(sortedCorrect);
    }
    if (question.type === 'text_input') {
      const cleanUser = String(userAnswer).trim().toLowerCase();
      return question.correctAnswer.some(ans => {
        const cleanAns = String(ans).trim().toLowerCase();
        return cleanUser === cleanAns;
      });
    }
    if (question.type === 'matching') {
      if (!Array.isArray(userAnswer) || userAnswer.length !== question.subQuestions.length) return false;
      return userAnswer.every((val, idx) => val !== '' && val !== null && val !== undefined && Number(val) === question.correctAnswer[idx]);
    }
    return false;
  };

  const isAnswered = userAnswer !== undefined && userAnswer !== null && (
    question.type === 'matching'
      ? Array.isArray(userAnswer) && userAnswer.length === question.subQuestions?.length && userAnswer.every(val => val !== '' && val !== undefined && val !== null)
      : Array.isArray(userAnswer)
      ? userAnswer.length > 0
      : userAnswer !== ''
  );
  const isCorrect = checkIsCorrect();

  // Topic Color Mapping
  const getTopicBadgeStyle = (topic) => {
    switch (topic) {
      case 'Inheritance':
        return 'bg-blue-500/10 text-blue-400 border-blue-500/30';
      case 'Polymorphism':
        return 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30';
      case 'Abstract Class':
        return 'bg-pink-500/10 text-pink-400 border-pink-500/30';
      case 'Interface':
        return 'bg-purple-500/10 text-purple-400 border-purple-500/30';
      case 'Studi Kasus (Soal Cerita)':
        return 'bg-gradient-to-r from-orange-500/20 to-amber-500/20 text-amber-300 border-amber-500/50 shadow-sm';
      default:
        return 'bg-amber-500/10 text-amber-400 border-amber-500/30';
    }
  };

  const getDifficultyBadge = (diff) => {
    switch (diff) {
      case 'Mudah':
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30';
      case 'Sedang':
        return 'bg-amber-500/10 text-amber-400 border-amber-500/30';
      case 'Sulit':
        return 'bg-rose-500/10 text-rose-400 border-rose-500/30';
      default:
        return 'bg-slate-500/10 text-slate-400 border-slate-500/30';
    }
  };

  const getTypeLabel = (type) => {
    switch (type) {
      case 'single_choice':
        return 'Pilihan Ganda';
      case 'multiple_choice':
        return 'Multi Jawaban (Checkbox)';
      case 'text_input':
        return 'Isian Teks / Tebak Output';
      case 'matching':
        return 'Menjodohkan (Dropdown Matching)';
      default:
        return type;
    }
  };

  return (
    <div className={`que ${question.type} bg-slate-900/70 border border-slate-800 rounded-2xl p-5 sm:p-8 shadow-2xl backdrop-blur-sm relative`}>
      {/* Top Meta Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-5 mb-5 border-b border-slate-800">
        <div className="flex flex-wrap items-center gap-2">
          <span className="px-3 py-1 rounded-lg bg-amber-500/20 text-amber-300 font-mono text-xs font-bold border border-amber-500/40">
            Soal {currentIndex + 1} / {totalQuestions}
          </span>
          <span className={`px-2.5 py-1 rounded-lg text-xs font-semibold border ${getTopicBadgeStyle(question.topic)}`}>
            {question.topic}
          </span>
          <span className={`px-2.5 py-1 rounded-lg text-xs font-medium border ${getDifficultyBadge(question.difficulty)}`}>
            {question.difficulty}
          </span>
          <span className="px-2.5 py-1 rounded-lg text-xs font-medium bg-slate-800 text-slate-300 border border-slate-700">
            {getTypeLabel(question.type)}
          </span>
        </div>

        {/* Flag Button */}
        <button
          onClick={() => onToggleFlag(question.id)}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
            isFlagged
              ? 'bg-amber-500/20 text-amber-300 border border-amber-500/50 shadow-sm'
              : 'bg-slate-800/80 hover:bg-slate-800 text-slate-400 border border-slate-700'
          }`}
        >
          <Bookmark size={14} className={isFlagged ? 'fill-amber-400 text-amber-400' : ''} />
          <span>{isFlagged ? 'Ragu-ragu' : 'Tandai Ragu'}</span>
        </button>
      </div>

      {/* Question Text & Media Container (qtext for LMS compatibility) */}
      <div className="qtext space-y-4">
        <div className="text-slate-100 text-base sm:text-lg font-medium leading-relaxed">
          {question.question}
        </div>

        {/* Image Diagram (if any) */}
        {question.image && (
          <div className="my-4 flex flex-col items-center">
            <img
              src={question.image}
              alt="Diagram Soal PBO"
              className="quiz-img max-w-full sm:max-w-md h-auto rounded-xl border border-slate-700 shadow-xl bg-slate-950 p-2"
            />
          </div>
        )}

        {/* Visual SVG Diagram (if any) */}
        {question.diagram && (
          <div className="quiz-img">
            <DiagramView type={question.diagram} />
          </div>
        )}

        {/* Code Snippet (if any) */}
        {question.code && (
          <CodeBlock code={question.code} title={`${question.topic} Code Snippet`} />
        )}
      </div>

      {/* Options / Form Controls */}
      <div className="mt-6 space-y-3">
        {/* Type 1: Single Choice (Radio) */}
        {question.type === 'single_choice' && (
          <div className="answer space-y-2.5">
            {question.options.map((option, idx) => {
              const isSelected = userAnswer === idx;
              const isTargetCorrect = (mode === 'study' || isFinished) && idx === question.correctAnswer;
              const isWrongSelection = (mode === 'study' || isFinished) && isSelected && !isCorrect;

              let cardStyle = 'bg-slate-800/50 hover:bg-slate-800 border-slate-700/80 text-slate-200';
              if (isSelected) {
                cardStyle = 'bg-amber-500/10 border-amber-500/60 text-amber-100 ring-1 ring-amber-500/30';
              }
              if (mode === 'study' || isFinished) {
                if (isTargetCorrect) {
                  cardStyle = 'bg-emerald-500/15 border-emerald-500/80 text-emerald-200 ring-1 ring-emerald-500/40';
                } else if (isWrongSelection) {
                  cardStyle = 'bg-rose-500/15 border-rose-500/80 text-rose-200 ring-1 ring-rose-500/40';
                }
              }

              const letters = ['A', 'B', 'C', 'D', 'E'];

              return (
                <div key={idx} className={idx % 2 === 0 ? 'r0' : 'r1'}>
                  <label
                    htmlFor={`q_${question.id}_opt_${idx}`}
                    onClick={() => handleSingleSelect(idx)}
                    className={`w-full text-left p-4 rounded-xl border transition-all flex items-start gap-3.5 group cursor-pointer ${cardStyle}`}
                  >
                    <input
                      type="radio"
                      id={`q_${question.id}_opt_${idx}`}
                      name={`q_${question.id}_choice`}
                      value={idx}
                      checked={isSelected}
                      onChange={() => handleSingleSelect(idx)}
                      className="w-4 h-4 text-amber-500 border-slate-600 bg-slate-800 focus:ring-amber-400 mt-1 cursor-pointer shrink-0"
                    />
                    <div
                      className={`w-7 h-7 shrink-0 rounded-lg flex items-center justify-center font-mono text-xs font-bold transition-all ${
                        isTargetCorrect
                          ? 'bg-emerald-500 text-slate-950'
                          : isWrongSelection
                          ? 'bg-rose-500 text-white'
                          : isSelected
                          ? 'bg-amber-500 text-slate-950 font-bold'
                          : 'bg-slate-700/80 text-slate-300 group-hover:bg-slate-600'
                      }`}
                    >
                      {letters[idx]}
                    </div>
                    <div className="text-sm sm:text-base pt-0.5 leading-snug flex-1">
                      {option}
                    </div>
                    {isTargetCorrect && (
                      <CheckCircle2 size={18} className="text-emerald-400 shrink-0 mt-0.5" />
                    )}
                    {isWrongSelection && (
                      <XCircle size={18} className="text-rose-400 shrink-0 mt-0.5" />
                    )}
                  </label>
                </div>
              );
            })}
          </div>
        )}

        {/* Type 2: Multiple Choice (Checkboxes) */}
        {question.type === 'multiple_choice' && (
          <div className="answer space-y-2.5">
            <div className="text-xs text-amber-300/80 flex items-center gap-1.5 mb-2 font-medium">
              <Sparkles size={13} className="text-amber-400" />
              <span>Pilih dua atau lebih pilihan jawaban yang benar di bawah ini:</span>
            </div>
            {question.options.map((option, idx) => {
              const isSelected = Array.isArray(userAnswer) && userAnswer.includes(idx);
              const isTargetCorrect = (mode === 'study' || isFinished) && question.correctAnswer.includes(idx);
              const isWrongSelection = (mode === 'study' || isFinished) && isSelected && !question.correctAnswer.includes(idx);

              let cardStyle = 'bg-slate-800/50 hover:bg-slate-800 border-slate-700/80 text-slate-200';
              if (isSelected) {
                cardStyle = 'bg-cyan-500/10 border-cyan-500/60 text-cyan-100 ring-1 ring-cyan-500/30';
              }
              if (mode === 'study' || isFinished) {
                if (isTargetCorrect) {
                  cardStyle = 'bg-emerald-500/15 border-emerald-500/80 text-emerald-200 ring-1 ring-emerald-500/40';
                } else if (isWrongSelection) {
                  cardStyle = 'bg-rose-500/15 border-rose-500/80 text-rose-200 ring-1 ring-rose-500/40';
                }
              }

              return (
                <div key={idx} className={idx % 2 === 0 ? 'r0' : 'r1'}>
                  <label
                    htmlFor={`q_${question.id}_cb_${idx}`}
                    onClick={() => handleMultiSelect(idx)}
                    className={`w-full text-left p-4 rounded-xl border transition-all flex items-start gap-3.5 group cursor-pointer ${cardStyle}`}
                  >
                    <input
                      type="checkbox"
                      id={`q_${question.id}_cb_${idx}`}
                      name={`q_${question.id}_cb_${idx}`}
                      value={idx}
                      checked={isSelected}
                      onChange={() => handleMultiSelect(idx)}
                      className="w-4 h-4 text-cyan-500 border-slate-600 rounded bg-slate-800 focus:ring-cyan-400 mt-1 cursor-pointer shrink-0"
                    />
                    <div
                      className={`w-6 h-6 shrink-0 rounded-md flex items-center justify-center transition-all border ${
                        isTargetCorrect
                          ? 'bg-emerald-500 border-emerald-400 text-slate-950'
                          : isWrongSelection
                          ? 'bg-rose-500 border-rose-400 text-white'
                          : isSelected
                          ? 'bg-cyan-500 border-cyan-400 text-slate-950'
                          : 'bg-slate-800 border-slate-600 group-hover:border-slate-500'
                      }`}
                    >
                      {isSelected && <span className="text-xs font-bold">&check;</span>}
                    </div>
                    <div className="text-sm sm:text-base pt-0.5 leading-snug flex-1">
                      {option}
                    </div>
                    {isTargetCorrect && (
                      <CheckCircle2 size={18} className="text-emerald-400 shrink-0 mt-0.5" />
                    )}
                    {isWrongSelection && (
                      <XCircle size={18} className="text-rose-400 shrink-0 mt-0.5" />
                    )}
                  </label>
                </div>
              );
            })}
          </div>
        )}

        {/* Type 3: Matching Table with Dropdowns */}
        {question.type === 'matching' && (
          <div className="answer mt-4 overflow-x-auto">
            <div className="text-xs text-amber-300/90 flex items-center gap-1.5 mb-3 font-medium">
              <Sparkles size={13} className="text-amber-400" />
              <span>Pilihlah pasangan yang sesuai pada masing-masing dropdown di bawah ini:</span>
            </div>
            <table className="answer w-full text-left border-collapse border border-slate-800 rounded-xl overflow-hidden">
              <thead>
                <tr className="bg-slate-800/80 border-b border-slate-700 text-xs font-semibold text-slate-300">
                  <th className="py-3 px-4 w-1/2">Pernyataan / Konsep</th>
                  <th className="py-3 px-4 w-1/2">Pilihan Jawaban (Dropdown)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 bg-slate-900/40">
                {question.subQuestions?.map((subQ, sIdx) => {
                  const val = userAnswer && Array.isArray(userAnswer) && userAnswer[sIdx] !== undefined ? userAnswer[sIdx] : '';
                  const isTargetCorrect = (mode === 'study' || isFinished) && Number(val) === question.correctAnswer[sIdx];
                  const isWrong = (mode === 'study' || isFinished) && val !== '' && !isTargetCorrect;

                  return (
                    <tr key={sIdx} className={`${sIdx % 2 === 0 ? 'r0 bg-slate-900/60' : 'r1 bg-slate-900/30'} hover:bg-slate-800/50 transition-colors`}>
                      <td className="text py-3.5 px-4 text-sm text-slate-200 font-medium">
                        <span className="font-mono text-xs text-amber-400 mr-2 font-bold">{sIdx + 1}.</span>
                        {subQ}
                      </td>
                      <td className="control py-3.5 px-4">
                        <select
                          id={`q_${question.id}_sel_${sIdx}`}
                          name={`q_${question.id}_sel_${sIdx}`}
                          value={val}
                          onChange={(e) => handleMatchingSelect(sIdx, e.target.value)}
                          className={`w-full py-2.5 px-3 rounded-lg text-sm bg-slate-950 border transition-all focus:outline-none focus:ring-2 ${
                            isTargetCorrect
                              ? 'border-emerald-500 text-emerald-200 ring-emerald-500/30'
                              : isWrong
                              ? 'border-rose-500 text-rose-200 ring-rose-500/30'
                              : 'border-slate-700 text-slate-200 focus:border-amber-500 focus:ring-amber-500/20'
                          }`}
                        >
                          <option value="">Pilih...</option>
                          {question.options.map((opt, oIdx) => (
                            <option key={oIdx} value={oIdx}>
                              {opt}
                            </option>
                          ))}
                        </select>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {/* Type 4: Text Input / Code Output */}
        {question.type === 'text_input' && (
          <div className="answer">
            <form onSubmit={handleTextSubmit} className="space-y-3">
              <div className="relative">
                <input
                  type="text"
                  id={`q_${question.id}_text`}
                  name={`q_${question.id}_text`}
                  value={textInputValue}
                  onChange={(e) => setTextInputValue(e.target.value)}
                  placeholder={question.placeholder || 'Ketik jawaban Anda di sini...'}
                  className="w-full px-4 py-3.5 bg-slate-950 border border-slate-700 rounded-xl text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 font-mono text-sm sm:text-base transition-all"
                />
                <button
                  type="submit"
                  className="absolute right-2.5 top-2.5 px-3.5 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold text-xs sm:text-sm rounded-lg transition-all flex items-center gap-1.5 active:scale-95 shadow-md shadow-amber-950"
                >
                  <span>Simpan</span>
                  <Send size={13} />
                </button>
              </div>
              <div className="text-xs text-slate-400 flex items-center gap-1.5">
                <Info size={13} className="text-slate-400" />
                <span>Tekan tombol Simpan atau Enter untuk menyimpan isian teks/output.</span>
              </div>
            </form>
          </div>
        )}
      </div>

      {/* Mode Belajar: Periksa Jawaban Button */}
      {mode === 'study' && isAnswered && !showExplanation && (
        <div className="mt-5 pt-4 border-t border-slate-800">
          <button
            onClick={() => setShowExplanation(true)}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white rounded-xl text-sm font-semibold transition-all shadow-md active:scale-95"
          >
            <HelpCircle size={16} />
            <span>Periksa Jawaban & Lihat Pembahasan</span>
          </button>
        </div>
      )}

      {/* Detailed Explanation Card */}
      {showExplanation && (
        <div className={`mt-6 p-5 rounded-xl border transition-all ${
          isCorrect
            ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-100'
            : 'bg-rose-950/20 border-rose-500/40 text-rose-100'
        }`}>
          <div className="flex items-center gap-2 font-semibold text-sm mb-2">
            {isCorrect ? (
              <>
                <CheckCircle2 size={18} className="text-emerald-400" />
                <span className="text-emerald-400 font-bold">Jawaban Anda Tepat!</span>
              </>
            ) : (
              <>
                <XCircle size={18} className="text-rose-400" />
                <span className="text-rose-400 font-bold">Jawaban Kurang Tepat</span>
              </>
            )}
          </div>

          {/* Correct answer display for text_input or when incorrect */}
          {!isCorrect && (
            <div className="mb-3 text-xs bg-slate-900/80 p-3 rounded-lg border border-slate-800 text-slate-300">
              <span className="font-semibold text-amber-400">Kunci Jawaban yang Benar: </span>
              {question.type === 'single_choice' && (
                <span className="font-mono text-emerald-300 font-bold ml-1">
                  [{['A','B','C','D','E'][question.correctAnswer]}] {question.options[question.correctAnswer]}
                </span>
              )}
              {question.type === 'multiple_choice' && (
                <span className="font-mono text-emerald-300 font-bold ml-1">
                  {question.correctAnswer.map(i => `[${['A','B','C','D','E'][i]}] ${question.options[i]}`).join(' ; ')}
                </span>
              )}
              {question.type === 'text_input' && (
                <span className="font-mono text-emerald-300 font-bold ml-1">
                  {question.correctAnswer.join(' atau ')}
                </span>
              )}
              {question.type === 'matching' && (
                <div className="mt-2 space-y-1 font-mono text-emerald-300">
                  {question.subQuestions?.map((subQ, sIdx) => (
                    <div key={sIdx}>
                      &bull; {subQ} &rarr; <span className="font-bold underline">{question.options[question.correctAnswer[sIdx]]}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          <div className="text-xs sm:text-sm leading-relaxed text-slate-300">
            <span className="font-semibold text-amber-300 block mb-1">💡 Pembahasan Mendalam:</span>
            {question.explanation}
          </div>
        </div>
      )}

      {/* Navigation Footer */}
      <div className="flex items-center justify-between gap-3 mt-8 pt-5 border-t border-slate-800">
        <button
          onClick={onPrev}
          disabled={currentIndex === 0}
          className="flex items-center gap-1.5 px-4 py-2.5 bg-slate-800 hover:bg-slate-700 disabled:opacity-40 disabled:hover:bg-slate-800 text-slate-200 rounded-xl text-xs sm:text-sm font-medium transition-all border border-slate-700"
        >
          <ChevronLeft size={16} />
          <span>Sebelumnya</span>
        </button>

        <div className="text-xs text-slate-400 hidden sm:block">
          Gunakan tombol di atas atau klik nomor soal di panel samping untuk berpindah
        </div>

        <button
          onClick={onNext}
          disabled={currentIndex === totalQuestions - 1}
          className="flex items-center gap-1.5 px-4 py-2.5 bg-amber-500 hover:bg-amber-400 disabled:opacity-40 disabled:hover:bg-amber-500 text-slate-950 font-semibold rounded-xl text-xs sm:text-sm transition-all shadow-md shadow-amber-950"
        >
          <span>Selanjutnya</span>
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}
