// src/components/QuestionManager.jsx
// Dashboard Manajemen Bank Soal PBO (Tambah, Edit, Hapus, Filter, Export/Import)
import React, { useState, useMemo, useRef } from 'react';
import {
  Search,
  Plus,
  Edit3,
  Trash2,
  Copy,
  ExternalLink,
  Download,
  Upload,
  RotateCcw,
  CheckCircle2,
  XCircle,
  ChevronDown,
  ChevronUp,
  Layers,
  Sparkles,
  Code,
  Image as ImageIcon,
  Check,
  X,
  AlertTriangle,
  ArrowRight,
  Filter,
  FileQuestion,
  HelpCircle,
  Eye
} from 'lucide-react';
import { TOPICS } from '../data/questions';
import { DiagramView } from './Diagrams';
import { CodeBlock } from './CodeBlock';

export function QuestionManager({
  questions,
  onUpdateQuestions,
  onResetQuestions,
  onSelectQuestion,
  onBackToQuiz
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedTopic, setSelectedTopic] = useState('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [expandedId, setExpandedId] = useState(null);

  // Modal States
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState(null); // null = add new, obj = edit
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);

  // Hidden File Input for JSON Import
  const fileInputRef = useRef(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Statistics calculation
  const stats = useMemo(() => {
    const total = questions.length;
    const single = questions.filter(q => q.type === 'single_choice').length;
    const multi = questions.filter(q => q.type === 'multiple_choice').length;
    const matching = questions.filter(q => q.type === 'matching').length;
    const textInput = questions.filter(q => q.type === 'text_input').length;
    const withImages = questions.filter(q => q.diagram || q.image).length;
    return { total, single, multi, matching, textInput, withImages };
  }, [questions]);

  // Filtered questions
  const filteredQuestions = useMemo(() => {
    return questions.filter(q => {
      // Type Filter
      if (selectedType === 'with_images') {
        if (!q.diagram && !q.image) return false;
      } else if (selectedType !== 'all' && q.type !== selectedType) {
        return false;
      }

      // Topic Filter
      if (selectedTopic !== 'all' && q.topic !== selectedTopic) {
        return false;
      }

      // Difficulty Filter
      if (selectedDifficulty !== 'all' && q.difficulty !== selectedDifficulty) {
        return false;
      }

      // Search Query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const idMatch = String(q.id) === query || `#${q.id}` === query;
        const textMatch = (q.question || '').toLowerCase().includes(query);
        const codeMatch = (q.code || '').toLowerCase().includes(query);
        const explanationMatch = (q.explanation || '').toLowerCase().includes(query);
        const optionsMatch = Array.isArray(q.options) && q.options.some(opt => String(opt).toLowerCase().includes(query));
        const subQuestionsMatch = Array.isArray(q.subQuestions) && q.subQuestions.some(sq => String(sq).toLowerCase().includes(query));

        if (!idMatch && !textMatch && !codeMatch && !explanationMatch && !optionsMatch && !subQuestionsMatch) {
          return false;
        }
      }

      return true;
    });
  }, [questions, selectedType, selectedTopic, selectedDifficulty, searchQuery]);

  // Handlers for Add / Edit
  const handleOpenAddModal = () => {
    setEditingQuestion({
      id: Math.max(0, ...questions.map(q => q.id || 0)) + 1,
      topic: TOPICS.INHERITANCE,
      difficulty: 'Sedang',
      type: 'single_choice',
      question: '',
      code: '',
      diagram: '',
      options: ['', '', '', ''],
      correctAnswer: 0,
      subQuestions: ['', '', '', ''],
      explanation: ''
    });
    setIsFormModalOpen(true);
  };

  const handleOpenEditModal = (q) => {
    // Clone deeply to prevent accidental state mutation
    const cloned = JSON.parse(JSON.stringify(q));
    if (cloned.type === 'matching' && !Array.isArray(cloned.subQuestions)) {
      cloned.subQuestions = ['', '', '', ''];
    }
    if (cloned.type === 'text_input' && !Array.isArray(cloned.correctAnswer)) {
      cloned.correctAnswer = [String(cloned.correctAnswer || '')];
    }
    setEditingQuestion(cloned);
    setIsFormModalOpen(true);
  };

  const handleDuplicateQuestion = (q) => {
    const newId = Math.max(0, ...questions.map(x => x.id || 0)) + 1;
    const duplicated = {
      ...JSON.parse(JSON.stringify(q)),
      id: newId,
      question: `[Salinan] ${q.question}`
    };
    const updated = [duplicated, ...questions];
    onUpdateQuestions(updated);
    showToast(`✓ Soal #${q.id} berhasil diduplikasi menjadi Soal #${newId}!`);
  };

  const handleDeleteQuestion = (id) => {
    const updated = questions.filter(q => q.id !== id);
    onUpdateQuestions(updated);
    setDeleteConfirmId(null);
    showToast(`🗑️ Soal #${id} telah berhasil dihapus dari bank soal.`);
  };

  const handleSaveForm = (formData) => {
    const isEditing = questions.some(q => q.id === formData.id);
    let updated;
    if (isEditing) {
      updated = questions.map(q => q.id === formData.id ? formData : q);
      showToast(`✓ Soal #${formData.id} berhasil diperbarui!`);
    } else {
      updated = [formData, ...questions];
      showToast(`✓ Soal baru #${formData.id} berhasil ditambahkan!`);
    }
    onUpdateQuestions(updated);
    setIsFormModalOpen(false);
    setEditingQuestion(null);
  };

  // Export JSON
  const handleExportJSON = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(questions, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `bank-soal-java-pbo-${questions.length}-soal.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showToast('📥 Berkas bank soal berhasil diunduh dalam format JSON!');
  };

  // Import JSON
  const handleImportJSON = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const imported = JSON.parse(event.target?.result);
        if (Array.isArray(imported) && imported.length > 0 && imported[0].question) {
          onUpdateQuestions(imported);
          showToast(`✓ Berhasil mengimpor ${imported.length} soal ke dalam bank soal!`);
        } else {
          alert('Format JSON tidak sesuai dengan skema bank soal.');
        }
      } catch (err) {
        alert('Gagal membaca berkas JSON: ' + err.message);
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  // Helpers badge styles
  const getTypeBadgeStyle = (type, hasDiagram) => {
    switch (type) {
      case 'matching':
        return 'bg-amber-500/15 text-amber-300 border-amber-500/40';
      case 'multiple_choice':
        return 'bg-cyan-500/15 text-cyan-300 border-cyan-500/40';
      case 'text_input':
        return 'bg-purple-500/15 text-purple-300 border-purple-500/40';
      case 'single_choice':
      default:
        return hasDiagram
          ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/40'
          : 'bg-blue-500/15 text-blue-300 border-blue-500/40';
    }
  };

  const getTypeLabel = (type, hasDiagram) => {
    if (hasDiagram) return '🖼️ Soal Bergambar / Diagram';
    switch (type) {
      case 'matching':
        return '📑 Dropdown Matching';
      case 'multiple_choice':
        return '☑️ Multi Jawaban';
      case 'text_input':
        return '✍️ Isian Form / Tebak Output';
      case 'single_choice':
      default:
        return '🔘 Pilihan Ganda';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 px-4 py-3 bg-emerald-950 border border-emerald-500/60 text-emerald-200 rounded-xl shadow-2xl flex items-center gap-2.5 text-sm font-semibold animate-bounce">
          <CheckCircle2 size={18} className="text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Banner & Quick Controls */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-amber-950/40 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl backdrop-blur-md relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-5 relative z-10">
          <div>
            <div className="flex items-center gap-2.5 mb-2">
              <span className="p-2 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
                <Layers size={22} />
              </span>
              <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
                Pusat Pengelolaan Bank Soal
              </h2>
              <span className="px-2.5 py-1 bg-amber-500/20 text-amber-300 border border-amber-500/40 font-mono text-xs font-bold rounded-lg">
                {questions.length} Total Soal
              </span>
            </div>
            <p className="text-sm text-slate-400 max-w-2xl leading-relaxed">
              Cari, edit teks soal, ubah opsi jawaban, tambahkan soal baru, atau jodohkan tabel dropdown tanpa pusing. Semua perubahan tersimpan secara otomatis.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={handleOpenAddModal}
              className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-bold rounded-xl text-sm transition-all shadow-lg shadow-amber-950 cursor-pointer active:scale-95"
            >
              <Plus size={16} />
              <span>Tambah Soal Baru</span>
            </button>

            <button
              onClick={handleExportJSON}
              className="flex items-center gap-1.5 px-3 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer"
              title="Download seluruh bank soal ke format file JSON"
            >
              <Download size={14} className="text-cyan-400" />
              <span>Export JSON</span>
            </button>

            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImportJSON}
              accept=".json"
              className="hidden"
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center gap-1.5 px-3 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer"
              title="Upload file JSON untuk memperbarui bank soal"
            >
              <Upload size={14} className="text-purple-400" />
              <span>Import JSON</span>
            </button>

            <button
              onClick={() => {
                if (confirm('Yakin ingin mereset seluruh bank soal kembali ke 94 soal bawaan resmi?')) {
                  onResetQuestions();
                  showToast('✓ Bank soal berhasil di-reset kembali ke 94 soal bawaan.');
                }
              }}
              className="flex items-center gap-1.5 px-3 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-rose-300 border border-slate-700 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer"
              title="Reset ke bank soal awal"
            >
              <RotateCcw size={14} className="text-slate-400" />
              <span>Reset Default</span>
            </button>
          </div>
        </div>
      </div>

      {/* Stats Chips (Clickable filters) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <button
          onClick={() => setSelectedType('all')}
          className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
            selectedType === 'all'
              ? 'bg-amber-500/15 border-amber-500/60 ring-1 ring-amber-500/30'
              : 'bg-slate-900/60 border-slate-800 hover:bg-slate-800/60 text-slate-400'
          }`}
        >
          <div className="text-[11px] font-medium text-slate-400">Semua Soal</div>
          <div className="text-xl font-bold font-mono text-white mt-1">{stats.total}</div>
        </button>

        <button
          onClick={() => setSelectedType('single_choice')}
          className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
            selectedType === 'single_choice'
              ? 'bg-blue-500/15 border-blue-500/60 ring-1 ring-blue-500/30'
              : 'bg-slate-900/60 border-slate-800 hover:bg-slate-800/60 text-slate-400'
          }`}
        >
          <div className="text-[11px] font-medium text-blue-400">Pilihan Ganda</div>
          <div className="text-xl font-bold font-mono text-white mt-1">{stats.single}</div>
        </button>

        <button
          onClick={() => setSelectedType('matching')}
          className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
            selectedType === 'matching'
              ? 'bg-amber-500/15 border-amber-500/60 ring-1 ring-amber-500/30'
              : 'bg-slate-900/60 border-slate-800 hover:bg-slate-800/60 text-slate-400'
          }`}
        >
          <div className="text-[11px] font-medium text-amber-400">Dropdown Matching</div>
          <div className="text-xl font-bold font-mono text-white mt-1">{stats.matching}</div>
        </button>

        <button
          onClick={() => setSelectedType('with_images')}
          className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
            selectedType === 'with_images'
              ? 'bg-emerald-500/15 border-emerald-500/60 ring-1 ring-emerald-500/30'
              : 'bg-slate-900/60 border-slate-800 hover:bg-slate-800/60 text-slate-400'
          }`}
        >
          <div className="text-[11px] font-medium text-emerald-400">Soal Bergambar</div>
          <div className="text-xl font-bold font-mono text-white mt-1">{stats.withImages}</div>
        </button>

        <button
          onClick={() => setSelectedType('multiple_choice')}
          className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
            selectedType === 'multiple_choice'
              ? 'bg-cyan-500/15 border-cyan-500/60 ring-1 ring-cyan-500/30'
              : 'bg-slate-900/60 border-slate-800 hover:bg-slate-800/60 text-slate-400'
          }`}
        >
          <div className="text-[11px] font-medium text-cyan-400">Multi Jawaban</div>
          <div className="text-xl font-bold font-mono text-white mt-1">{stats.multi}</div>
        </button>

        <button
          onClick={() => setSelectedType('text_input')}
          className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
            selectedType === 'text_input'
              ? 'bg-purple-500/15 border-purple-500/60 ring-1 ring-purple-500/30'
              : 'bg-slate-900/60 border-slate-800 hover:bg-slate-800/60 text-slate-400'
          }`}
        >
          <div className="text-[11px] font-medium text-purple-400">Isian Form / Teks</div>
          <div className="text-xl font-bold font-mono text-white mt-1">{stats.textInput}</div>
        </button>
      </div>

      {/* Search & Filter Toolbar */}
      <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-4 sm:p-5 shadow-xl backdrop-blur-sm space-y-4">
        <div className="flex flex-col md:flex-row gap-3">
          {/* Search Bar */}
          <div className="relative flex-1">
            <Search size={18} className="absolute left-3.5 top-3.5 text-slate-500 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari teks soal, kata kunci (extends, super, overriding), atau nomor ID #81..."
              className="w-full pl-10 pr-10 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 text-sm transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-3 text-slate-400 hover:text-white p-0.5 rounded-md"
              >
                <X size={15} />
              </button>
            )}
          </div>

          {/* Topic Dropdown */}
          <div className="w-full md:w-56">
            <select
              value={selectedTopic}
              onChange={(e) => setSelectedTopic(e.target.value)}
              className="w-full py-2.5 px-3 bg-slate-950 border border-slate-700 rounded-xl text-slate-200 text-sm focus:outline-none focus:border-amber-500"
            >
              <option value="all">Semua Kategori Materi</option>
              {Object.values(TOPICS).map(t => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>

          {/* Difficulty Dropdown */}
          <div className="w-full md:w-44">
            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="w-full py-2.5 px-3 bg-slate-950 border border-slate-700 rounded-xl text-slate-200 text-sm focus:outline-none focus:border-amber-500"
            >
              <option value="all">Semua Kesulitan</option>
              <option value="Mudah">Mudah</option>
              <option value="Sedang">Sedang</option>
              <option value="Sulit">Sulit</option>
            </select>
          </div>
        </div>

        {/* Results summary & Active Filter Chips */}
        <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-400 pt-2 border-t border-slate-800/80">
          <div>
            Menampilkan <span className="font-bold text-amber-400 font-mono">{filteredQuestions.length}</span> dari {questions.length} soal
            {searchQuery && <span> untuk pencarian "<span className="text-white font-medium">{searchQuery}</span>"</span>}
          </div>

          {(selectedType !== 'all' || selectedTopic !== 'all' || selectedDifficulty !== 'all' || searchQuery) && (
            <button
              onClick={() => {
                setSelectedType('all');
                setSelectedTopic('all');
                setSelectedDifficulty('all');
                setSearchQuery('');
              }}
              className="text-amber-400 hover:text-amber-300 font-medium underline cursor-pointer"
            >
              Reset Semua Filter
            </button>
          )}
        </div>
      </div>

      {/* Question Cards List */}
      <div className="space-y-4">
        {filteredQuestions.length === 0 ? (
          <div className="bg-slate-900/40 border border-dashed border-slate-800 rounded-2xl p-12 text-center space-y-3">
            <FileQuestion size={42} className="mx-auto text-slate-600" />
            <div className="text-base font-semibold text-slate-300">Tidak ada soal yang cocok dengan filter</div>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Coba gunakan kata kunci pencarian lain atau klik reset filter di atas.
            </p>
          </div>
        ) : (
          filteredQuestions.map((q) => {
            const isExpanded = expandedId === q.id;
            const hasDiagram = !!(q.diagram || q.image);

            return (
              <div
                key={q.id}
                className="bg-slate-900/60 border border-slate-800 hover:border-slate-700/80 rounded-2xl p-5 sm:p-6 transition-all shadow-md group"
              >
                {/* Header Row */}
                <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-800/70">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="w-8 h-8 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center font-mono text-xs font-extrabold text-amber-400">
                      #{q.id}
                    </span>
                    <span className={`px-2.5 py-1 rounded-lg text-xs font-semibold border ${getTypeBadgeStyle(q.type, hasDiagram)}`}>
                      {getTypeLabel(q.type, hasDiagram)}
                    </span>
                    <span className="px-2.5 py-1 rounded-lg text-xs font-medium bg-slate-800/90 text-slate-300 border border-slate-700">
                      {q.topic}
                    </span>
                    <span className="px-2 py-0.5 rounded-md text-[11px] font-medium bg-slate-800/50 text-slate-400 border border-slate-700/60">
                      {q.difficulty}
                    </span>
                    {q.code && (
                      <span className="px-2 py-0.5 rounded-md text-[11px] font-mono bg-cyan-950/40 text-cyan-400 border border-cyan-800/40 flex items-center gap-1">
                        <Code size={11} /> Code
                      </span>
                    )}
                  </div>

                  {/* Actions Bar per Question */}
                  <div className="flex items-center gap-1.5">
                    {/* Jump to Quiz */}
                    <button
                      onClick={() => onSelectQuestion(q.id)}
                      className="flex items-center gap-1 px-3 py-1.5 bg-emerald-600/15 hover:bg-emerald-600/25 text-emerald-300 border border-emerald-500/40 rounded-xl text-xs font-semibold transition-all cursor-pointer"
                      title="Uji langsung soal ini di tampilan Kuis Ujian"
                    >
                      <Eye size={13} />
                      <span className="hidden sm:inline">Kerjakan Soal</span>
                    </button>

                    {/* Edit */}
                    <button
                      onClick={() => handleOpenEditModal(q)}
                      className="flex items-center gap-1 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-xl text-xs font-semibold transition-all cursor-pointer"
                      title="Edit teks, opsi, dan kunci jawaban soal ini"
                    >
                      <Edit3 size={13} className="text-amber-400" />
                      <span>Edit</span>
                    </button>

                    {/* Duplicate */}
                    <button
                      onClick={() => handleDuplicateQuestion(q)}
                      className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-slate-200 border border-slate-700 rounded-xl transition-all cursor-pointer"
                      title="Duplikasi soal ini menjadi soal baru"
                    >
                      <Copy size={14} />
                    </button>

                    {/* Delete */}
                    <button
                      onClick={() => setDeleteConfirmId(q.id)}
                      className="p-1.5 bg-slate-800 hover:bg-rose-900/50 text-slate-400 hover:text-rose-300 border border-slate-700 hover:border-rose-700/50 rounded-xl transition-all cursor-pointer"
                      title="Hapus soal ini dari bank soal"
                    >
                      <Trash2 size={14} />
                    </button>

                    {/* Toggle Expand */}
                    <button
                      onClick={() => setExpandedId(isExpanded ? null : q.id)}
                      className="p-1.5 bg-slate-800/60 hover:bg-slate-700 text-slate-400 rounded-xl transition-all"
                      title={isExpanded ? "Tutup detail" : "Buka detail lengkap"}
                    >
                      {isExpanded ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
                    </button>
                  </div>
                </div>

                {/* Question Stem */}
                <div className="mt-3.5 text-sm sm:text-base font-medium text-slate-100 leading-relaxed">
                  {q.question}
                </div>

                {/* Collapsible Full Details (Code, Diagram, Options, and Explanation) */}
                {isExpanded && (
                  <div className="mt-4 pt-4 border-t border-slate-800/80 space-y-4 bg-slate-950/40 p-4 rounded-xl border">
                    {/* Visual Diagram */}
                    {q.diagram && (
                      <div className="max-w-md mx-auto">
                        <DiagramView type={q.diagram} />
                      </div>
                    )}
                    {q.image && (
                      <div className="my-2 text-center">
                        <img src={q.image} alt="Diagram" className="max-w-sm mx-auto rounded-lg border border-slate-700" />
                      </div>
                    )}

                    {/* Code Snippet */}
                    {q.code && (
                      <CodeBlock code={q.code} title={`${q.topic} Code Snippet`} />
                    )}

                    {/* Options / Answer Keys Breakdown */}
                    <div className="space-y-2">
                      <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                        Pilihan Jawaban & Kunci:
                      </div>

                      {/* Single Choice Options */}
                      {q.type === 'single_choice' && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {q.options?.map((opt, idx) => {
                            const isCorrect = idx === q.correctAnswer;
                            return (
                              <div
                                key={idx}
                                className={`p-2.5 rounded-lg text-xs flex items-start gap-2 border ${
                                  isCorrect
                                    ? 'bg-emerald-950/40 border-emerald-500/50 text-emerald-200 font-semibold'
                                    : 'bg-slate-900 border-slate-800 text-slate-300'
                                }`}
                              >
                                <span className={`w-5 h-5 rounded flex items-center justify-center font-mono font-bold shrink-0 ${
                                  isCorrect ? 'bg-emerald-500 text-slate-950' : 'bg-slate-800 text-slate-400'
                                }`}>
                                  {['A','B','C','D','E'][idx]}
                                </span>
                                <span className="flex-1">{opt}</span>
                                {isCorrect && <Check size={14} className="text-emerald-400 shrink-0" />}
                              </div>
                            );
                          })}
                        </div>
                      )}

                      {/* Multiple Choice Options */}
                      {q.type === 'multiple_choice' && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {q.options?.map((opt, idx) => {
                            const isCorrect = Array.isArray(q.correctAnswer) && q.correctAnswer.includes(idx);
                            return (
                              <div
                                key={idx}
                                className={`p-2.5 rounded-lg text-xs flex items-start gap-2 border ${
                                  isCorrect
                                    ? 'bg-cyan-950/40 border-cyan-500/50 text-cyan-200 font-semibold'
                                    : 'bg-slate-900 border-slate-800 text-slate-300'
                                }`}
                              >
                                <span className={`w-5 h-5 rounded flex items-center justify-center font-mono font-bold shrink-0 ${
                                  isCorrect ? 'bg-cyan-500 text-slate-950' : 'bg-slate-800 text-slate-400'
                                }`}>
                                  &check;
                                </span>
                                <span className="flex-1">{opt}</span>
                                {isCorrect && <span className="text-[10px] bg-cyan-500/20 px-1.5 py-0.5 rounded text-cyan-300 font-bold">KUNCI</span>}
                              </div>
                            );
                          })}
                        </div>
                      )}

                      {/* Matching Table */}
                      {q.type === 'matching' && (
                        <div className="overflow-x-auto border border-slate-800 rounded-lg">
                          <table className="w-full text-xs text-left">
                            <thead className="bg-slate-900 text-slate-400 border-b border-slate-800">
                              <tr>
                                <th className="p-2.5 w-1/2">Pernyataan Sub-Soal</th>
                                <th className="p-2.5 w-1/2">Pasangan Kunci Resmi</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-800/80">
                              {q.subQuestions?.map((sq, idx) => (
                                <tr key={idx} className="bg-slate-950/40">
                                  <td className="p-2.5 text-slate-300">
                                    <span className="font-mono text-amber-400 font-bold mr-1.5">{idx + 1}.</span>
                                    {sq}
                                  </td>
                                  <td className="p-2.5 font-medium text-emerald-300">
                                    &rarr; <span className="font-bold underline">{q.options?.[q.correctAnswer?.[idx]] || '-'}</span>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      )}

                      {/* Text Input */}
                      {q.type === 'text_input' && (
                        <div className="p-3 bg-purple-950/30 border border-purple-500/40 rounded-lg text-xs text-purple-200 flex items-center gap-2">
                          <span className="font-bold text-amber-400">Kata Kunci Diterima:</span>
                          <span className="font-mono font-bold text-emerald-300">
                            {Array.isArray(q.correctAnswer) ? q.correctAnswer.join(' atau ') : String(q.correctAnswer)}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Explanation */}
                    {q.explanation && (
                      <div className="bg-slate-900/90 p-3 rounded-lg border border-slate-800 text-xs text-slate-300 leading-relaxed">
                        <span className="font-semibold text-amber-400 block mb-1">💡 Pembahasan Resmi:</span>
                        {q.explanation}
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-rose-500/40 rounded-2xl p-6 max-w-md w-full shadow-2xl space-y-4">
            <div className="flex items-center gap-3 text-rose-400">
              <AlertTriangle size={24} />
              <h3 className="text-lg font-bold text-white">Konfirmasi Hapus Soal</h3>
            </div>
            <p className="text-sm text-slate-300 leading-relaxed">
              Apakah Anda yakin ingin menghapus <b>Soal #{deleteConfirmId}</b> dari bank soal? Tindakan ini dapat dibatalkan dengan me-reset bank soal.
            </p>
            <div className="flex items-center justify-end gap-2.5 pt-2">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-sm font-semibold transition-all cursor-pointer"
              >
                Batal
              </button>
              <button
                onClick={() => handleDeleteQuestion(deleteConfirmId)}
                className="px-4 py-2 bg-rose-600 hover:bg-rose-500 text-white rounded-xl text-sm font-bold transition-all shadow-md active:scale-95 cursor-pointer"
              >
                Ya, Hapus
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Form Modal: Add / Edit Question */}
      {isFormModalOpen && editingQuestion && (
        <QuestionEditModal
          initialData={editingQuestion}
          onSave={handleSaveForm}
          onClose={() => {
            setIsFormModalOpen(false);
            setEditingQuestion(null);
          }}
        />
      )}
    </div>
  );
}

// Sub-component: Edit / Add Question Modal Form
function QuestionEditModal({ initialData, onSave, onClose }) {
  const [formData, setFormData] = useState(() => ({
    ...initialData,
    options: initialData.options ? [...initialData.options] : ['', '', '', ''],
    subQuestions: initialData.subQuestions ? [...initialData.subQuestions] : ['', '', '', ''],
    correctAnswer: initialData.correctAnswer ?? (initialData.type === 'matching' ? [0, 1, 2, 3] : initialData.type === 'multiple_choice' ? [0] : 0)
  }));

  const handleTypeChange = (newType) => {
    let newCorrect = 0;
    if (newType === 'multiple_choice') newCorrect = [0];
    else if (newType === 'matching') newCorrect = [0, 1, 2, 3];
    else if (newType === 'text_input') newCorrect = [''];

    setFormData(prev => ({
      ...prev,
      type: newType,
      correctAnswer: newCorrect
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.question.trim()) {
      alert('Teks pertanyaan tidak boleh kosong!');
      return;
    }
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-3xl w-full max-h-[90vh] flex flex-col shadow-2xl my-auto">
        {/* Modal Header */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 border border-amber-500/40 flex items-center justify-center font-bold text-sm">
              #{formData.id}
            </span>
            <h3 className="text-lg font-bold text-white">
              {initialData.id ? `Edit Soal #${formData.id}` : 'Tambah Soal Baru'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <form onSubmit={handleSubmit} className="p-5 sm:p-6 overflow-y-auto space-y-5 text-sm flex-1">
          {/* Top Meta: Type, Topic, Difficulty */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Tipe Soal</label>
              <select
                value={formData.type}
                onChange={(e) => handleTypeChange(e.target.value)}
                className="w-full py-2.5 px-3 bg-slate-950 border border-slate-700 rounded-xl text-slate-100 text-sm focus:border-amber-500"
              >
                <option value="single_choice">Pilihan Ganda (Single Choice)</option>
                <option value="matching">Dropdown Matching (Menjodohkan)</option>
                <option value="multiple_choice">Multi Jawaban (Checkbox)</option>
                <option value="text_input">Isian Teks / Tebak Output</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Kategori Materi</label>
              <select
                value={formData.topic}
                onChange={(e) => setFormData(prev => ({ ...prev, topic: e.target.value }))}
                className="w-full py-2.5 px-3 bg-slate-950 border border-slate-700 rounded-xl text-slate-100 text-sm focus:border-amber-500"
              >
                {Object.values(TOPICS).filter(t => t !== TOPICS.ALL).map(t => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Tingkat Kesulitan</label>
              <select
                value={formData.difficulty}
                onChange={(e) => setFormData(prev => ({ ...prev, difficulty: e.target.value }))}
                className="w-full py-2.5 px-3 bg-slate-950 border border-slate-700 rounded-xl text-slate-100 text-sm focus:border-amber-500"
              >
                <option value="Mudah">Mudah</option>
                <option value="Sedang">Sedang</option>
                <option value="Sulit">Sulit</option>
              </select>
            </div>
          </div>

          {/* Question Text */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Teks Pertanyaan <span className="text-amber-400">*</span>
            </label>
            <textarea
              rows={3}
              value={formData.question}
              onChange={(e) => setFormData(prev => ({ ...prev, question: e.target.value }))}
              placeholder="Ketik pertanyaan atau deskripsi soal di sini..."
              className="w-full p-3 bg-slate-950 border border-slate-700 rounded-xl text-slate-100 text-sm focus:border-amber-500 focus:outline-none"
              required
            />
          </div>

          {/* Code Snippet (Optional) */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
              <Code size={14} className="text-cyan-400" />
              <span>Cuplikan Kode Java (Opsional)</span>
            </label>
            <textarea
              rows={3}
              value={formData.code || ''}
              onChange={(e) => setFormData(prev => ({ ...prev, code: e.target.value }))}
              placeholder={`public class Demo {\n    // Tulis kode cuplikan jika ada\n}`}
              className="w-full p-3 bg-slate-950 border border-slate-700 rounded-xl text-cyan-200 font-mono text-xs focus:border-amber-500 focus:outline-none"
            />
          </div>

          {/* Diagram Selector (Optional) */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
              <ImageIcon size={14} className="text-emerald-400" />
              <span>Visual Diagram UML (Opsional)</span>
            </label>
            <select
              value={formData.diagram || ''}
              onChange={(e) => setFormData(prev => ({ ...prev, diagram: e.target.value }))}
              className="w-full py-2 px-3 bg-slate-950 border border-slate-700 rounded-xl text-slate-100 text-sm focus:border-amber-500"
            >
              <option value="">(Tanpa Diagram)</option>
              <option value="uml_polymorphism_hierarchy">Diagram UML Hierarki Polimorfisme (Hewan - Kucing/Anjing)</option>
              <option value="uml_interface_realization">Diagram UML Interface & Realization (Pembayaran)</option>
              <option value="uml_composition_aggregation">Diagram UML Komposisi vs Agregasi</option>
              <option value="uml_single_inheritance">Diagram UML Single Inheritance (Kendaraan - Mobil)</option>
              <option value="uml_generalization_arrow">Simbol Panah Generalization (extends)</option>
              <option value="uml_realization_arrow">Simbol Panah Realization (implements)</option>
              <option value="uml_abstract_class">Diagram UML Abstract Class</option>
              <option value="uml_diamond_problem">Diagram Diamond Problem Interface</option>
              <option value="polymorphism_memory">Diagram Alokasi Memori Stack vs Heap</option>
            </select>
          </div>

          {/* ============================================================== */}
          {/* OPTIONS & ANSWER KEYS SECTION ACCORDING TO QUESTION TYPE */}
          {/* ============================================================== */}

          {/* CASE 1: Single Choice Options */}
          {formData.type === 'single_choice' && (
            <div className="space-y-3 pt-2 border-t border-slate-800">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-200">
                  Pilihan Jawaban (Pilih bulatan radio untuk kunci jawaban yang benar):
                </label>
                <button
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, options: [...prev.options, ''] }))}
                  className="text-xs text-amber-400 hover:text-amber-300 font-semibold"
                >
                  + Tambah Opsi
                </button>
              </div>

              {formData.options.map((opt, idx) => (
                <div key={idx} className="flex items-center gap-2.5">
                  <input
                    type="radio"
                    name="correctSingle"
                    checked={formData.correctAnswer === idx}
                    onChange={() => setFormData(prev => ({ ...prev, correctAnswer: idx }))}
                    className="w-4 h-4 text-amber-500 border-slate-600 bg-slate-800 focus:ring-amber-400 cursor-pointer"
                    title="Jadikan ini sebagai kunci jawaban benar"
                  />
                  <span className="font-mono text-xs font-bold text-slate-400 w-5">
                    {['A','B','C','D','E','F'][idx] || idx + 1}.
                  </span>
                  <input
                    type="text"
                    value={opt}
                    onChange={(e) => {
                      const updated = [...formData.options];
                      updated[idx] = e.target.value;
                      setFormData(prev => ({ ...prev, options: updated }));
                    }}
                    placeholder={`Teks opsi ${idx + 1}...`}
                    className="flex-1 py-2 px-3 bg-slate-950 border border-slate-700 rounded-lg text-slate-100 text-sm focus:border-amber-500"
                    required
                  />
                  {formData.options.length > 2 && (
                    <button
                      type="button"
                      onClick={() => {
                        const updated = formData.options.filter((_, i) => i !== idx);
                        setFormData(prev => ({
                          ...prev,
                          options: updated,
                          correctAnswer: prev.correctAnswer >= updated.length ? 0 : prev.correctAnswer
                        }));
                      }}
                      className="p-1.5 text-slate-500 hover:text-rose-400"
                    >
                      <X size={15} />
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* CASE 2: Multiple Choice (Checkbox) */}
          {formData.type === 'multiple_choice' && (
            <div className="space-y-3 pt-2 border-t border-slate-800">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-200">
                  Pilihan Jawaban (Centang checkbox untuk semua jawaban yang benar):
                </label>
                <button
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, options: [...prev.options, ''] }))}
                  className="text-xs text-cyan-400 hover:text-cyan-300 font-semibold"
                >
                  + Tambah Opsi
                </button>
              </div>

              {formData.options.map((opt, idx) => {
                const isChecked = Array.isArray(formData.correctAnswer) && formData.correctAnswer.includes(idx);
                return (
                  <div key={idx} className="flex items-center gap-2.5">
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => {
                        const current = Array.isArray(formData.correctAnswer) ? [...formData.correctAnswer] : [];
                        const fIdx = current.indexOf(idx);
                        if (fIdx > -1) current.splice(fIdx, 1);
                        else current.push(idx);
                        current.sort();
                        setFormData(prev => ({ ...prev, correctAnswer: current }));
                      }}
                      className="w-4 h-4 text-cyan-500 border-slate-600 rounded bg-slate-800 focus:ring-cyan-400 cursor-pointer"
                      title="Tandai sebagai salah satu jawaban benar"
                    />
                    <span className="font-mono text-xs font-bold text-slate-400 w-5">
                      {['A','B','C','D','E','F'][idx] || idx + 1}.
                    </span>
                    <input
                      type="text"
                      value={opt}
                      onChange={(e) => {
                        const updated = [...formData.options];
                        updated[idx] = e.target.value;
                        setFormData(prev => ({ ...prev, options: updated }));
                      }}
                      placeholder={`Teks pilihan ${idx + 1}...`}
                      className="flex-1 py-2 px-3 bg-slate-950 border border-slate-700 rounded-lg text-slate-100 text-sm focus:border-cyan-500"
                      required
                    />
                    {formData.options.length > 2 && (
                      <button
                        type="button"
                        onClick={() => {
                          const updated = formData.options.filter((_, i) => i !== idx);
                          setFormData(prev => ({
                            ...prev,
                            options: updated,
                            correctAnswer: Array.isArray(prev.correctAnswer) ? prev.correctAnswer.filter(ci => ci !== idx).map(ci => ci > idx ? ci - 1 : ci) : [0]
                          }));
                        }}
                        className="p-1.5 text-slate-500 hover:text-rose-400"
                      >
                        <X size={15} />
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {/* CASE 3: Dropdown Matching Table */}
          {formData.type === 'matching' && (
            <div className="space-y-4 pt-2 border-t border-slate-800">
              <div className="text-xs font-bold text-amber-300">
                Konfigurasi Dropdown Matching (Menjodohkan):
              </div>

              {/* Master Options list */}
              <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl space-y-2">
                <div className="text-xs font-semibold text-slate-300 flex items-center justify-between">
                  <span>Daftar Pilihan di Menu Dropdown:</span>
                  <button
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, options: [...prev.options, ''] }))}
                    className="text-xs text-amber-400 hover:text-amber-300"
                  >
                    + Tambah Item Dropdown
                  </button>
                </div>
                {formData.options.map((opt, oIdx) => (
                  <div key={oIdx} className="flex items-center gap-2">
                    <span className="font-mono text-xs text-slate-400 w-4">{oIdx + 1}.</span>
                    <input
                      type="text"
                      value={opt}
                      onChange={(e) => {
                        const updated = [...formData.options];
                        updated[oIdx] = e.target.value;
                        setFormData(prev => ({ ...prev, options: updated }));
                      }}
                      placeholder={`Pilihan dropdown ${oIdx + 1}...`}
                      className="flex-1 py-1.5 px-2.5 bg-slate-900 border border-slate-700 rounded-lg text-slate-100 text-xs"
                      required
                    />
                    {formData.options.length > 2 && (
                      <button
                        type="button"
                        onClick={() => {
                          const updated = formData.options.filter((_, i) => i !== oIdx);
                          setFormData(prev => ({ ...prev, options: updated }));
                        }}
                        className="text-slate-500 hover:text-rose-400 p-1"
                      >
                        <X size={13} />
                      </button>
                    )}
                  </div>
                ))}
              </div>

              {/* Sub-questions pairing */}
              <div className="space-y-2">
                <div className="text-xs font-semibold text-slate-300">
                  Pasangkan Baris Sub-Soal dengan Pilihan Dropdown yang Benar:
                </div>
                {formData.subQuestions.map((sq, sIdx) => (
                  <div key={sIdx} className="p-3 bg-slate-950/70 border border-slate-800 rounded-xl flex flex-col sm:flex-row gap-2.5 items-start sm:items-center">
                    <span className="font-mono text-xs font-bold text-amber-400 shrink-0">
                      Baris {sIdx + 1}:
                    </span>
                    <input
                      type="text"
                      value={sq}
                      onChange={(e) => {
                        const updated = [...formData.subQuestions];
                        updated[sIdx] = e.target.value;
                        setFormData(prev => ({ ...prev, subQuestions: updated }));
                      }}
                      placeholder={`Teks pernyataan baris ${sIdx + 1}...`}
                      className="flex-1 py-1.5 px-3 bg-slate-900 border border-slate-700 rounded-lg text-slate-100 text-xs w-full"
                      required
                    />
                    <span className="text-slate-500 text-xs shrink-0">&rarr; Kunci:</span>
                    <select
                      value={formData.correctAnswer?.[sIdx] ?? 0}
                      onChange={(e) => {
                        const updated = Array.isArray(formData.correctAnswer) ? [...formData.correctAnswer] : [];
                        updated[sIdx] = Number(e.target.value);
                        setFormData(prev => ({ ...prev, correctAnswer: updated }));
                      }}
                      className="py-1.5 px-2 bg-slate-900 border border-slate-700 rounded-lg text-emerald-300 font-bold text-xs shrink-0"
                    >
                      {formData.options.map((opt, oIdx) => (
                        <option key={oIdx} value={oIdx}>
                          {oIdx + 1}. {opt || `(Opsi ${oIdx + 1})`}
                        </option>
                      ))}
                    </select>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* CASE 4: Text Input Key */}
          {formData.type === 'text_input' && (
            <div className="space-y-2 pt-2 border-t border-slate-800">
              <label className="block text-xs font-bold text-slate-200">
                Kunci Jawaban yang Diterima (Pisahkan dengan tanda koma jika ada variasi jawaban benar)
              </label>
              <input
                type="text"
                value={Array.isArray(formData.correctAnswer) ? formData.correctAnswer.join(', ') : String(formData.correctAnswer)}
                onChange={(e) => {
                  const items = e.target.value.split(',').map(s => s.trim()).filter(Boolean);
                  setFormData(prev => ({ ...prev, correctAnswer: items.length ? items : [e.target.value.trim()] }));
                }}
                placeholder="Contoh: super, super(), super();"
                className="w-full py-2 px-3 bg-slate-950 border border-slate-700 rounded-xl text-emerald-300 font-mono text-sm focus:border-amber-500"
                required
              />
              <p className="text-[11px] text-slate-500">
                Pencocokan bersifat tidak case-sensitive saat siswa menjawab.
              </p>
            </div>
          )}

          {/* Explanation */}
          <div className="pt-2 border-t border-slate-800">
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Pembahasan / Penjelasan Teori
            </label>
            <textarea
              rows={3}
              value={formData.explanation || ''}
              onChange={(e) => setFormData(prev => ({ ...prev, explanation: e.target.value }))}
              placeholder="Tuliskan pembahasan atau konsep teori yang mendasari jawaban benar ini..."
              className="w-full p-3 bg-slate-950 border border-slate-700 rounded-xl text-slate-200 text-xs focus:border-amber-500 focus:outline-none"
            />
          </div>

          {/* Modal Footer Controls */}
          <div className="pt-4 border-t border-slate-800 flex items-center justify-end gap-3 sticky bottom-0 bg-slate-900 pb-1">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-sm font-semibold transition-all cursor-pointer"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-bold rounded-xl text-sm transition-all shadow-lg shadow-amber-950 active:scale-95 cursor-pointer"
            >
              Simpan Perubahan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
