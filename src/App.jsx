// src/App.jsx
import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { QuestionCard } from './components/QuestionCard';
import { NavigationPalette } from './components/NavigationPalette';
import { ResultReport } from './components/ResultReport';
import { HistoryModal } from './components/HistoryModal';
import { StudentNameModal } from './components/StudentNameModal';
import { ModuleCenter } from './components/ModuleCenter';
import { QUESTIONS, TOPICS } from './data/questions';
import { generateRandomQuestionSet } from './utils/dynamicQuestionGenerator';
import {
  getUserProfile,
  saveUserProfile,
  getExamHistory,
  saveExamAttempt,
  deleteExamAttempt,
  clearAllHistory
} from './utils/historyStorage';
import {
  AlertCircle,
  Sparkles,
  Shuffle,
  BookOpen,
  Flame,
  Zap,
  CheckCircle2,
  PlusCircle,
  History,
  RotateCcw,
  Video
} from 'lucide-react';

// Fisher-Yates shuffle with options rearrangement
function shuffleQuestionsData(sourceList, shuffleChoices = true) {
  const cloned = sourceList.map(q => {
    if (!shuffleChoices || !q.options || q.type === 'text_input' || q.type === 'matching') {
      return { ...q };
    }
    // Create index mapping for options
    const indices = q.options.map((_, i) => i);
    for (let i = indices.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [indices[i], indices[j]] = [indices[j], indices[i]];
    }
    const newOptions = indices.map(i => q.options[i]);
    let newCorrectAnswer;
    if (q.type === 'single_choice') {
      newCorrectAnswer = indices.indexOf(q.correctAnswer);
    } else if (q.type === 'multiple_choice') {
      newCorrectAnswer = q.correctAnswer.map(ansIdx => indices.indexOf(ansIdx)).sort();
    }
    return {
      ...q,
      options: newOptions,
      correctAnswer: newCorrectAnswer,
    };
  });

  // Shuffle question list
  for (let i = cloned.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [cloned[i], cloned[j]] = [cloned[j], cloned[i]];
  }
  return cloned;
}

export function App() {
  const [mode, setMode] = useState('study'); // 'study' or 'exam'
  const [selectedTopic, setSelectedTopic] = useState(TOPICS.ALL);
  const [questionBank, setQuestionBank] = useState(() => QUESTIONS);
  const [currentFilteredIndex, setCurrentFilteredIndex] = useState(0);
  const [answers, setAnswers] = useState(() => {
    try {
      const saved = localStorage.getItem('java_pbo_answers');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });
  const [flagged, setFlagged] = useState(() => {
    try {
      const saved = localStorage.getItem('java_pbo_flagged');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });
  const [isFinished, setIsFinished] = useState(false);
  const [timeLeft, setTimeLeft] = useState(50 * 60); // 50 menit
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [shuffleToast, setShuffleToast] = useState(null);

  // Initial view mode from URL pathname or hash
  const getInitialViewMode = () => {
    if (typeof window !== 'undefined') {
      const path = window.location.pathname.toLowerCase();
      const hash = window.location.hash.toLowerCase();
      if (path.startsWith('/video') || hash.includes('video')) return 'video';
      if (path.startsWith('/modul') || hash.includes('modul')) return 'modul';
    }
    return 'quiz';
  };

  // View Mode: 'quiz', 'modul', or 'video'
  const [viewMode, setViewMode] = useState(getInitialViewMode);

  // Student Identity State
  const [userProfile, setUserProfile] = useState(() => getUserProfile());
  const [isNameModalOpen, setIsNameModalOpen] = useState(() => !getUserProfile()?.name);

  // History Modal & Persistence State
  const [history, setHistory] = useState(() => getExamHistory());
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);

  // Handle URL change for view mode
  const handleSetViewMode = (vMode) => {
    setViewMode(vMode);
    if (typeof window !== 'undefined') {
      if (vMode === 'video') {
        window.history.pushState(null, '', '/video');
      } else if (vMode === 'modul') {
        window.history.pushState(null, '', '/modul');
      } else {
        window.history.pushState(null, '', '/');
      }
    }
  };

  // Sync with browser back/forward buttons
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname.toLowerCase();
      const hash = window.location.hash.toLowerCase();
      if (path.startsWith('/video') || hash.includes('video')) {
        setViewMode('video');
      } else if (path.startsWith('/modul') || hash.includes('modul')) {
        setViewMode('modul');
      } else {
        setViewMode('quiz');
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Filter questions based on selected topic
  const filteredQuestions = questionBank.filter(q => {
    if (selectedTopic === TOPICS.ALL) return true;
    return q.topic === selectedTopic;
  });

  const activeQuestion = filteredQuestions[currentFilteredIndex] || filteredQuestions[0];

  // Save answers & flagged to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('java_pbo_answers', JSON.stringify(answers));
      localStorage.setItem('java_pbo_flagged', JSON.stringify(flagged));
    } catch (e) {
      console.error(e);
    }
  }, [answers, flagged]);

  // Exam Countdown Timer
  useEffect(() => {
    if (mode === 'exam' && !isFinished && timeLeft > 0 && viewMode === 'quiz') {
      const timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            finishAndSave();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [mode, isFinished, timeLeft, viewMode]);

  // Student Profile Save Handler
  const handleSaveProfile = (profile) => {
    const saved = saveUserProfile(profile);
    setUserProfile(saved);
    setShuffleToast(`👋 Selamat datang, ${saved.name}! Selamat belajar dan sukses ujian PBO!`);
    setTimeout(() => setShuffleToast(null), 4000);
  };

  // Answer handler
  const handleAnswer = (questionId, answer) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };

  // Flag toggle handler
  const handleToggleFlag = (questionId) => {
    setFlagged(prev => ({
      ...prev,
      [questionId]: !prev[questionId]
    }));
  };

  // Navigation handlers
  const handlePrev = () => {
    if (currentFilteredIndex > 0) {
      setCurrentFilteredIndex(prev => prev - 1);
    }
  };

  const handleNext = () => {
    if (currentFilteredIndex < filteredQuestions.length - 1) {
      setCurrentFilteredIndex(prev => prev + 1);
    }
  };

  const handleSelectQuestion = (indexInFiltered) => {
    setCurrentFilteredIndex(indexInFiltered);
  };

  const handleSelectTopic = (topic) => {
    setSelectedTopic(topic);
    setCurrentFilteredIndex(0);
  };

  // Shuffle Handler
  const handleShuffle = () => {
    const shuffled = shuffleQuestionsData(questionBank, true);
    setQuestionBank(shuffled);
    setCurrentFilteredIndex(0);
    setShuffleToast('🎲 Soal & susunan pilihan jawaban (A, B, C, D) berhasil diacak!');
    setTimeout(() => setShuffleToast(null), 3500);
  };

  // Preset: Hanya Soal Cerita
  const handlePresetStory = () => {
    setSelectedTopic(TOPICS.STORY);
    setCurrentFilteredIndex(0);
  };

  // Preset: Simulasi Kilat (25 soal acak campuran)
  const handlePresetSimulation = () => {
    const shuffled = shuffleQuestionsData(QUESTIONS, true).slice(0, 25);
    setQuestionBank(shuffled);
    setSelectedTopic(TOPICS.ALL);
    setCurrentFilteredIndex(0);
    setShuffleToast('⚡ Paket Simulasi Ujian Kilat: 25 Soal Acak Campuran Siap Dikerjakan!');
    setTimeout(() => setShuffleToast(null), 3500);
  };

  // Feature: Generate 10 New Algorithmic Dynamic Questions (Tanpa Batas / Infinite)
  const handleAddDynamicQuestions = () => {
    const newQuestions = generateRandomQuestionSet(10);
    setQuestionBank(prev => [...prev, ...newQuestions]);
    setShuffleToast(`♾️ Berhasil men-generate 10 soal dinamis baru! Total bank soal kini menjadi ${questionBank.length + 10} soal.`);
    setTimeout(() => setShuffleToast(null), 4000);
  };

  // Feature: Generate Fresh 20-Question Dynamic Exam Set
  const handleGenerateFreshDynamicExam = () => {
    const freshSet = generateRandomQuestionSet(20);
    setQuestionBank(freshSet);
    setSelectedTopic(TOPICS.ALL);
    setAnswers({});
    setFlagged({});
    setIsFinished(false);
    setTimeLeft(40 * 60);
    setCurrentFilteredIndex(0);
    setShuffleToast('⚡ Paket Baru Dibuat: 20 Soal Prosedural Unik (Variabel Hiding, Polimorfisme, Konstruktor, Downcasting). Selamat Mengerjakan!');
    setTimeout(() => setShuffleToast(null), 4000);
  };

  // Reset to original questions
  const handleResetToDefault = () => {
    setQuestionBank(QUESTIONS);
    setSelectedTopic(TOPICS.ALL);
    setAnswers({});
    setFlagged({});
    setIsFinished(false);
    setTimeLeft(50 * 60);
    setCurrentFilteredIndex(0);
    localStorage.removeItem('java_pbo_answers');
    localStorage.removeItem('java_pbo_flagged');
    setShuffleToast(`🔄 Bank soal dikembalikan ke ${QUESTIONS.length} Soal Lengkap Standar Ujian PBO.`);
    setTimeout(() => setShuffleToast(null), 3500);
  };

  // Reset all
  const handleReset = () => {
    if (window.confirm('Apakah Anda yakin ingin mengulang dari awal dan mereset semua jawaban?')) {
      setAnswers({});
      setFlagged({});
      setIsFinished(false);
      setTimeLeft(50 * 60);
      setCurrentFilteredIndex(0);
      localStorage.removeItem('java_pbo_answers');
      localStorage.removeItem('java_pbo_flagged');
    }
  };

  // Finish and compute score with history storage
  const finishAndSave = () => {
    setShowConfirmModal(false);
    setIsFinished(true);

    // Calculate score
    let correctCount = 0;
    let wrongCount = 0;
    filteredQuestions.forEach(q => {
      const userAns = answers[q.id];
      let isCorrect = false;
      if (userAns !== undefined && userAns !== null && userAns !== '') {
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
      if (isCorrect) correctCount++;
      else wrongCount++;
    });

    const score = Math.round((correctCount / filteredQuestions.length) * 100);
    let grade = 'D';
    if (score >= 90) grade = 'A+';
    else if (score >= 80) grade = 'A';
    else if (score >= 70) grade = 'B';
    else if (score >= 60) grade = 'C';

    const saved = saveExamAttempt({
      score,
      grade,
      correctCount,
      wrongCount,
      totalQuestions: filteredQuestions.length,
      mode,
      sessionTitle: `Ujian ${selectedTopic === TOPICS.ALL ? 'Campuran PBO' : selectedTopic} (${filteredQuestions.length} Soal)`,
      studentName: userProfile?.name || 'Peserta Ujian',
      studentNim: userProfile?.nim || '',
      studentAvatar: userProfile?.avatar || '👨‍💻',
      questionsSnapshot: filteredQuestions,
      answersSnapshot: { ...answers },
      flaggedSnapshot: { ...flagged }
    });
    setHistory(saved);
  };

  const handleFinishExam = () => {
    const answeredCount = Object.keys(answers).filter(
      k => answers[k] !== undefined && answers[k] !== '' && (Array.isArray(answers[k]) ? answers[k].length > 0 : true)
    ).length;
    const unansweredCount = filteredQuestions.length - answeredCount;

    if (unansweredCount > 0 && !isFinished) {
      setShowConfirmModal(true);
    } else {
      finishAndSave();
    }
  };

  // Review past attempt
  const handleReviewAttempt = (attempt) => {
    if (attempt.questionsSnapshot && attempt.questionsSnapshot.length > 0) {
      setQuestionBank(attempt.questionsSnapshot);
    }
    setAnswers(attempt.answersSnapshot || {});
    setFlagged(attempt.flaggedSnapshot || {});
    setSelectedTopic(TOPICS.ALL);
    setCurrentFilteredIndex(0);
    setIsFinished(true);
    setViewMode('quiz');
    setShuffleToast(`📖 Menampilkan hasil & ulasan kunci jawaban sesi "${attempt.sessionTitle}" (Skor: ${attempt.score})`);
    setTimeout(() => setShuffleToast(null), 4000);
  };

  // Retake past attempt (Remedial)
  const handleRetakeAttempt = (attempt) => {
    if (attempt.questionsSnapshot && attempt.questionsSnapshot.length > 0) {
      setQuestionBank(attempt.questionsSnapshot);
    }
    setAnswers({});
    setFlagged({});
    setSelectedTopic(TOPICS.ALL);
    setCurrentFilteredIndex(0);
    setIsFinished(false);
    setTimeLeft(50 * 60);
    setViewMode('quiz');
    setShuffleToast(`🔄 Mode Remedial Aktif: Silakan kerjakan ulang ${attempt.totalQuestions} soal ini untuk memperbaiki nilai!`);
    setTimeout(() => setShuffleToast(null), 4000);
  };

  const handleDeleteAttempt = (attemptId) => {
    const updated = deleteExamAttempt(attemptId);
    setHistory(updated);
  };

  const handleClearHistory = () => {
    const updated = clearAllHistory();
    setHistory(updated);
  };

  const totalAnswered = Object.keys(answers).filter(
    k => answers[k] !== undefined && answers[k] !== '' && (Array.isArray(answers[k]) ? answers[k].length > 0 : true)
  ).length;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-['Inter',sans-serif]">
      {/* Top Header */}
      <Header
        mode={mode}
        setMode={(m) => {
          setMode(m);
          if (m === 'exam') {
            setTimeLeft(50 * 60);
          }
        }}
        timeLeft={timeLeft}
        totalQuestions={questionBank.length}
        answeredCount={totalAnswered}
        onReset={handleReset}
        onFinish={handleFinishExam}
        onShuffle={handleShuffle}
        onOpenHistory={() => setIsHistoryOpen(true)}
        historyCount={history.length}
        userProfile={userProfile}
        onEditProfile={() => setIsNameModalOpen(true)}
        viewMode={viewMode}
        setViewMode={handleSetViewMode}
        isFinished={isFinished}
      />

      {/* Main Content Layout */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Toast Banner */}
        {shuffleToast && (
          <div className="mb-4 p-3.5 bg-gradient-to-r from-amber-500/20 via-orange-500/20 to-cyan-500/20 border border-amber-500/40 rounded-xl text-xs sm:text-sm font-semibold text-amber-200 flex items-center justify-between shadow-lg animate-fadeIn">
            <div className="flex items-center gap-2">
              <Sparkles size={16} className="text-amber-400 shrink-0" />
              <span>{shuffleToast}</span>
            </div>
            <button
              onClick={() => setShuffleToast(null)}
              className="text-amber-400 hover:text-white px-2 cursor-pointer"
            >
              &times;
            </button>
          </div>
        )}

        {/* View Mode Switching: If in 'modul' or 'video', show ModuleCenter */}
        {(viewMode === 'modul' || viewMode === 'video') ? (
          <ModuleCenter
            viewMode={viewMode}
            onNavigate={handleSetViewMode}
            onBackToQuiz={() => handleSetViewMode('quiz')}
          />
        ) : (
          /* Quiz View */
          <>
            {/* Action & Presets Control Banner */}
            <div className="mb-6 p-4 sm:p-5 bg-slate-900/70 border border-slate-800 rounded-2xl flex flex-col xl:flex-row items-start xl:items-center justify-between gap-4">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-400 shrink-0 mt-0.5">
                  <Flame size={18} />
                </div>
                <div>
                  <div className="text-sm font-bold text-white flex items-center gap-2">
                    <span>Persiapan Ujian PBO Besok</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-orange-500/20 text-orange-300 border border-orange-500/40 font-mono uppercase">
                      {questionBank.length} Soal Aktif
                    </span>
                    {userProfile?.name && (
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-300 border border-amber-500/30 flex items-center gap-1">
                        <span>{userProfile.avatar || '👨‍💻'}</span>
                        <span className="font-semibold">{userProfile.name}</span>
                      </span>
                    )}
                    {history.length > 0 && (
                      <button
                        onClick={() => setIsHistoryOpen(true)}
                        className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 hover:bg-cyan-500/25 transition-all flex items-center gap-1 cursor-pointer"
                      >
                        <History size={10} />
                        <span>{history.length} Riwayat Sesi</span>
                      </button>
                    )}
                  </div>
                  <div className="text-xs text-slate-400 mt-0.5">
                    {mode === 'study'
                      ? 'Mode Belajar: Periksa kunci jawaban dan baca pembahasan teori mendalam di setiap nomor.'
                      : 'Mode Ujian: Timer aktif. Kunci jawaban dan evaluasi terbuka setelah ujian dikirim.'}
                  </div>
                </div>
              </div>

              {/* Action Chips */}
              <div className="flex flex-wrap items-center gap-2 w-full xl:w-auto">
                <button
                  onClick={() => handleSetViewMode('modul')}
                  className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-cyan-950/50 border border-cyan-500/40 text-cyan-300 hover:bg-cyan-900/50 flex items-center gap-1.5 transition-all cursor-pointer shadow-sm active:scale-95"
                  title="Buka Pusat Modul PDF Lengkap"
                >
                  <BookOpen size={13} className="text-cyan-400" />
                  <span>Modul PDF</span>
                </button>

                <button
                  onClick={() => handleSetViewMode('video')}
                  className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-purple-950/50 border border-purple-500/40 text-purple-300 hover:bg-purple-900/50 flex items-center gap-1.5 transition-all cursor-pointer shadow-sm active:scale-95"
                  title="Tonton Video Pembahasan Materi"
                >
                  <Video size={13} className="text-purple-400" />
                  <span>Video Materi</span>
                </button>

                <button
                  onClick={handleAddDynamicQuestions}
                  className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-emerald-950/50 border border-emerald-500/40 text-emerald-300 hover:bg-emerald-900/50 flex items-center gap-1.5 transition-all cursor-pointer shadow-sm active:scale-95"
                  title="Generate 10 variasi soal baru secara prosedural (tanpa batas)"
                >
                  <PlusCircle size={13} className="text-emerald-400" />
                  <span>+10 Soal Baru (Generator Dinamis)</span>
                </button>

                <button
                  onClick={handleGenerateFreshDynamicExam}
                  className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-purple-950/50 border border-purple-500/40 text-purple-300 hover:bg-purple-900/50 flex items-center gap-1.5 transition-all cursor-pointer shadow-sm active:scale-95"
                  title="Buat paket ujian baru berisi 20 soal unik hasil generator algoritmik"
                >
                  <Zap size={13} className="text-purple-400" />
                  <span>Paket 20 Soal Dinamis</span>
                </button>

                <button
                  onClick={handlePresetStory}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                    selectedTopic === TOPICS.STORY
                      ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-slate-950 font-bold shadow-md shadow-orange-950'
                      : 'bg-orange-950/40 border border-orange-500/40 text-orange-300 hover:bg-orange-900/40'
                  }`}
                >
                  <Flame size={13} className="text-orange-400" />
                  <span>Fokus Soal Cerita</span>
                </button>

                <button
                  onClick={handlePresetSimulation}
                  className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-cyan-950/40 border border-cyan-500/40 text-cyan-300 hover:bg-cyan-900/40 flex items-center gap-1.5 transition-all cursor-pointer"
                >
                  <Zap size={13} className="text-cyan-400" />
                  <span>Simulasi 25 Soal</span>
                </button>

                {questionBank.length !== QUESTIONS.length && (
                  <button
                    onClick={handleResetToDefault}
                    className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-800 border border-slate-700 text-slate-300 hover:bg-slate-700 flex items-center gap-1.5 transition-all cursor-pointer"
                    title="Kembalikan ke soal bawaan standar"
                  >
                    <RotateCcw size={13} className="text-slate-400" />
                    <span>Reset Soal Bawaan</span>
                  </button>
                )}

                <button
                  onClick={handleShuffle}
                  className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-800 border border-slate-700 text-slate-200 hover:bg-slate-700 flex items-center gap-1.5 transition-all cursor-pointer"
                  title="Acak ulang semua soal dan posisi pilihan A,B,C,D"
                >
                  <Shuffle size={13} className="text-amber-400" />
                  <span>Acak Ulang</span>
                </button>
              </div>
            </div>

            {isFinished ? (
              /* Result & Evaluation Report View */
              <div className="space-y-6">
                <div className="flex items-center justify-between bg-slate-900/60 border border-slate-800 p-4 rounded-2xl">
                  <div className="text-xs text-slate-300 flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-emerald-400" />
                    <span>
                      Hasil ujian telah otomatis tersimpan atas nama{' '}
                      <strong className="text-amber-300">{userProfile?.name || 'Peserta'}</strong> ke Riwayat & Cookie browser Anda.
                    </span>
                  </div>
                  <button
                    onClick={() => setIsHistoryOpen(true)}
                    className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs text-cyan-300 border border-slate-700 flex items-center gap-1.5 cursor-pointer"
                  >
                    <History size={14} className="text-cyan-400" />
                    <span>Lihat Semua Riwayat Nilai ({history.length})</span>
                  </button>
                </div>

                <ResultReport
                  questions={filteredQuestions}
                  answers={answers}
                  flagged={flagged}
                  onReset={handleReset}
                  userProfile={userProfile}
                />
              </div>
            ) : (
              /* Active Question & Palette Grid View */
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Left Column: Question Card (8 cols on lg) */}
                <div className="lg:col-span-8">
                  {activeQuestion ? (
                    <QuestionCard
                      question={activeQuestion}
                      currentIndex={currentFilteredIndex}
                      totalQuestions={filteredQuestions.length}
                      userAnswer={answers[activeQuestion.id]}
                      isFlagged={!!flagged[activeQuestion.id]}
                      onAnswer={handleAnswer}
                      onToggleFlag={handleToggleFlag}
                      onPrev={handlePrev}
                      onNext={handleNext}
                      mode={mode}
                      isFinished={isFinished}
                    />
                  ) : (
                    <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-8 text-center text-slate-400">
                      Tidak ada soal pada kategori ini.
                    </div>
                  )}
                </div>

                {/* Right Column: Navigation Palette (4 cols on lg) */}
                <div className="lg:col-span-4 sticky top-28">
                  <NavigationPalette
                    questions={filteredQuestions}
                    currentIndex={currentFilteredIndex}
                    onSelectQuestion={handleSelectQuestion}
                    answers={answers}
                    flagged={flagged}
                    selectedTopic={selectedTopic}
                    onSelectTopic={handleSelectTopic}
                    onFinishExam={handleFinishExam}
                    onShuffle={handleShuffle}
                    isFinished={isFinished}
                  />
                </div>
              </div>
            )}
          </>
        )}
      </main>

      {/* Confirmation Modal when submitting with unanswered questions */}
      {showConfirmModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center gap-3 text-amber-400">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center">
                <AlertCircle size={22} />
              </div>
              <h3 className="text-lg font-bold text-white">Konfirmasi Pengiriman Ujian</h3>
            </div>

            <p className="text-sm text-slate-300 leading-relaxed">
              Masih terdapat <span className="text-amber-400 font-bold">{filteredQuestions.length - totalAnswered} soal</span> yang belum Anda jawab. Apakah Anda yakin ingin menyelesaikan ujian sekarang?
            </p>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
              <button
                onClick={() => setShowConfirmModal(false)}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-sm font-medium transition-all cursor-pointer"
              >
                Lanjutkan Mengerjakan
              </button>
              <button
                onClick={finishAndSave}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-sm font-bold transition-all shadow-md shadow-emerald-950 cursor-pointer"
              >
                Ya, Selesaikan Ujian
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Student Identity Modal (Pops up automatically in Quiz mode if user has not set their name yet) */}
      <StudentNameModal
        isOpen={isNameModalOpen && viewMode === 'quiz'}
        onClose={() => setIsNameModalOpen(false)}
        initialName={userProfile?.name || ''}
        initialNim={userProfile?.nim || ''}
        initialAvatar={userProfile?.avatar || '👨‍💻'}
        onSave={handleSaveProfile}
        isInitial={!userProfile?.name}
      />

      {/* History Modal */}
      <HistoryModal
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
        history={history}
        onReviewAttempt={handleReviewAttempt}
        onRetakeAttempt={handleRetakeAttempt}
        onDeleteAttempt={handleDeleteAttempt}
        onClearHistory={handleClearHistory}
      />

      {/* Footer */}
      <footer className="mt-12 py-6 border-t border-slate-900 bg-slate-950/80 text-center text-xs text-slate-400">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span>Java OOP Master Quiz System</span>
            <span>&bull;</span>
            <span className="text-slate-400">{questionBank.length} Soal Dinamis & Komprehensif</span>
          </div>
          <div>
            Inheritance &bull; Polymorphism &bull; Abstract Class &bull; Interface &bull; Soal Cerita
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
