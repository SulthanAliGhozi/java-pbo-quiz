// src/utils/historyStorage.js
// Penyimpanan Riwayat Skor & Sesi Ujian (LocalStorage & Cookies Mirror)

const STORAGE_KEY = 'java_pbo_exam_history_v1';
const USER_KEY = 'java_pbo_user_profile_v1';

export function getUserProfile() {
  try {
    const raw = localStorage.getItem(USER_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch (e) {
    console.error('Gagal membaca profil pengguna:', e);
    return null;
  }
}

export function saveUserProfile(profile) {
  try {
    localStorage.setItem(USER_KEY, JSON.stringify(profile));
    // Mirror nama ke cookie
    document.cookie = `pbo_user_name=${encodeURIComponent(profile.name || '')}; path=/; max-age=2592000; SameSite=Lax`;
    return profile;
  } catch (e) {
    console.error('Gagal menyimpan profil pengguna:', e);
    return profile;
  }
}

export function getExamHistory() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch (e) {
    console.error('Gagal membaca riwayat ujian:', e);
    return [];
  }
}

export function saveExamAttempt(attemptData) {
  try {
    const current = getExamHistory();
    const newEntry = {
      id: 'attempt_' + Date.now(),
      timestamp: new Date().toISOString(),
      formattedDate: new Intl.DateTimeFormat('id-ID', {
        dateStyle: 'medium',
        timeStyle: 'short'
      }).format(new Date()),
      ...attemptData
    };

    const updated = [newEntry, ...current].slice(0, 30); // Simpan hingga 30 sesi terakhir
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));

    // Mirror ke cookie sederhana (ringkasan skor terakhir)
    document.cookie = `last_pbo_score=${attemptData.score}; path=/; max-age=2592000; SameSite=Lax`;

    return updated;
  } catch (e) {
    console.error('Gagal menyimpan hasil ujian:', e);
    return [];
  }
}

export function deleteExamAttempt(attemptId) {
  try {
    const current = getExamHistory();
    const filtered = current.filter(item => item.id !== attemptId);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
    return filtered;
  } catch (e) {
    console.error('Gagal menghapus sesi ujian:', e);
    return [];
  }
}

export function clearAllHistory() {
  try {
    localStorage.removeItem(STORAGE_KEY);
    document.cookie = 'last_pbo_score=; path=/; max-age=0';
    return [];
  } catch (e) {
    console.error('Gagal membersihkan riwayat:', e);
    return [];
  }
}
