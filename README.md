# Java OOP Master: Quiz & Ujian PBO Interaktif

Aplikasi web kuis & ujian interaktif Pemrograman Berorientasi Objek (PBO) Java modern dengan **45 Soal Komprehensif** berformat variatif: Pilihan Ganda, Multi-Jawaban (Checkbox), Isian Teks / Tebak Output Kode, dilengkapi cuplikan kode Java dan diagram grafis UML.

---

## 🎯 Cakupan Materi (45 Soal)

1. **Inheritance (Pewarisan) - 12 Soal**
   - Keyword `extends` & aturan single inheritance
   - Aturan `super()` pada baris pertama konstruktor & constructor chaining
   - Akses modifier (`private`, `protected`, `public`, `default`)
   - Method overriding vs method overloading & aturan visibilitas modifier
   - Keyword `final` pada class dan method
   - Inisialisasi static block, instance block, dan konstruktor
   - Diagram UML Generalization (solid line + hollow triangle)

2. **Polymorphism (Polimorfisme) - 11 Soal**
   - Konsep "Many Forms" dalam OOP
   - Static / Compile-time polymorphism (Overloading) vs Dynamic / Runtime polymorphism (Overriding)
   - Dynamic Method Dispatch & memori heap vs stack
   - Upcasting (implisit) & Downcasting (eksplisit)
   - Resiko `ClassCastException` saat downcasting ilegal
   - Operator `instanceof` & Pattern Matching Java 16+
   - Variable Hiding (mengapa field/atribut tidak bersifat polimorfik di Java)

3. **Abstract Class (Kelas Abstrak) - 11 Soal**
   - Konsep dasar abstract class & larangan instansiasi langsung (`cannot be instantiated`)
   - Keyword `abstract` pada class dan method tanpa body (`{}`)
   - Kewajiban subclass konkrit mengimplementasikan semua abstract method
   - Alasan mengapa abstract class tetap memiliki konstruktor (diakses via `super()`)
   - Campuran method konkrit dan method abstrak
   - Larangan kombinasi `abstract private` dan `abstract final`
   - Diagram UML Abstract Class (`<<abstract>>` / cetak miring italic)
   - Penerapan Template Method Design Pattern

4. **Interface (Antarmuka) - 11 Soal**
   - Keyword `implements` & konsep multiple interface implementation
   - Sifat mutlak field di interface: otomatis `public static final` (konstanta)
   - Sifat method biasa di interface: otomatis `public abstract`
   - Java 8+: `default method` dengan body & tujuan evolusi antarmuka
   - Java 8+: `static method` pada interface
   - Multiple interface conflict (Diamond Problem) & cara penyelesaiannya (`NamaInterface.super.method()`)
   - Pewarisan antar-interface via `extends` (bisa mewarisi banyak interface sekaligus)
   - Functional Interface & anotasi `@FunctionalInterface` (Single Abstract Method)
   - Perbedaan arsitektural Abstract Class vs Interface
   - Diagram UML Realization (dashed line + hollow triangle)

---

## 🚀 Fitur Aplikasi

- **Variasi Format Soal:**
  - **Pilihan Ganda (Single Choice)**: Navigasi cepat dengan shortcut kartu pilihan A, B, C, D.
  - **Multi-Jawaban (Multiple Select)**: Checkbox form untuk memilih 2 atau lebih jawaban yang valid.
  - **Isian Teks / Tebak Output Kode**: Kolom input form teks untuk menebak output konsol, angka, atau keyword yang hilang.
- **Dua Mode Belajar:**
  - **Mode Belajar (Study Mode)**: Umpan balik instan! Periksa jawaban dan baca pembahasan mendalam langsung pada setiap nomor.
  - **Mode Ujian (Exam Mode)**: Dilengkapi timer mundur 45 menit, fitur "Tandai Ragu-Ragu", dan penguncian kunci jawaban sampai ujian diselesaikan.
- **Diagram Grafis & Kode Cantik:**
  - Diagram visual UML & alokasi memori runtime menggunakan format SVG interaktif.
  - Penyorotan sintaks kode Java dengan tombol satu klik "Salin Kode".
- **Laporan Evaluasi & Skor:**
  - Nilai akhir (0 - 100) dan predikat huruf (A+, A, B, C, D).
  - Analisis persentase penguasaan per topik materi (Inheritance %, Polymorphism %, Abstract Class %, Interface %).
  - Tinjauan detail soal (Filter: Semua, Hanya yang Salah, Hanya yang Benar, Hanya yang Kosong).
  - Tombol Cetak / Simpan PDF hasil ujian.
- **Penyimpanan Otomatis:**
  - Progres jawaban tersimpan aman di `localStorage` peramban.

---

## 💻 Cara Menjalankan

### Cara 1: Akses Server Lokal (Sedang Berjalan)
Buka browser dan kunjungi:
👉 **[http://localhost:5173](http://localhost:5173)**

### Cara 2: Buka Berkas HTML Statis Langsung
Buka berkas di browser tanpa perlu server:
👉 **[dist/index.html](file:///home/ali/java-pbo-quiz/dist/index.html)**

### Cara 3: Jalankan Ulang Kapan Saja
Di terminal:
```bash
cd /home/ali/java-pbo-quiz
./run.sh
```
