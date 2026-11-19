// src/utils/dynamicQuestionGenerator.js
// Engine Generator Soal Dinamis & Prosedural Java PBO Tanpa Batas

const ENTITY_PAIRS = [
  { parent: 'Kendaraan', child1: 'MobilListrik', child2: 'TrukKontainer', method: 'isiDaya', attr: 'kapasitas' },
  { parent: 'PerangkatIoT', child1: 'SmartCCTV', child2: 'SmartDoorLock', method: 'kirimSinyal', attr: 'versiFirmware' },
  { parent: 'AkunBank', child1: 'TabunganHaji', child2: 'GiroBisnis', method: 'hitungBunga', attr: 'biayaAdmin' },
  { parent: 'Karyawan', child1: 'SeniorEngineer', child2: 'LeadDesigner', method: 'hitungBonus', attr: 'levelJabatan' },
  { parent: 'KarakterRPG', child1: 'Paladin', child2: 'ShadowAssassin', method: 'gunakanUltimate', attr: 'manaCost' },
  { parent: 'LayananKurir', child1: 'SameDayExpress', child2: 'CargoIntercity', method: 'hitungEstimasi', attr: 'ongkosDasar' },
  { parent: 'AlatElektronik', child1: 'LaptopGaming', child2: 'DroneKamera', method: 'nyalakan', attr: 'voltase' }
];

const STORY_THEMES = [
  { company: 'Fintech "CepatBayar"', item: 'transaksi pembayaran mikro', role: 'arsitek perangkat lunak' },
  { company: 'Startup Logistik "AntarKuy"', item: 'armada pengiriman otonom', role: 'backend engineer' },
  { company: 'Game Studio "PixelMaju"', item: 'sistem pertempuran multiplayer', role: 'game programmer' },
  { company: 'RS Sentosa Sehat', item: 'sistem resep dan antrean poli spesialis', role: 'developer sistem rumah sakit' },
  { company: 'E-Commerce "MegaBelanja"', item: 'modul checkout dan voucher diskon', role: 'software engineer' }
];

function getRandomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Generator 1: Variable Hiding vs Polymorphic Method (Kasus Jebakan Ujian)
 */
function generateVariableHidingQuestion(id) {
  const p = getRandomItem(ENTITY_PAIRS);
  const valParent = getRandomInt(10, 50);
  const valChild = valParent * 2 + getRandomInt(5, 15);
  const mult = getRandomInt(2, 5);

  const code = `class ${p.parent} {
    int ${p.attr} = ${valParent};
    void tampil() {
        System.out.print(${p.attr});
    }
}

class ${p.child1} extends ${p.parent} {
    int ${p.attr} = ${valChild}; // Variable Hiding
    @Override
    void tampil() {
        System.out.print(${p.attr});
    }
}

public class Main {
    public static void main(String[] args) {
        ${p.parent} obj = new ${p.child1}(); // Upcasting
        // Perhatikan pemanggilan atribut langsung vs pemanggilan method
        System.out.print(obj.${p.attr} + "-");
        obj.tampil();
    }
}`;

  const correctOutput = `${valParent}-${valChild}`;

  return {
    id: `dyn_${id}`,
    topic: 'Studi Kasus (Soal Cerita)',
    difficulty: 'Sulit',
    type: 'text_input',
    question: `[Generator Dinamis: Variable Hiding & Polimorfisme]\nSeorang programmer membuat class ${p.child1} yang mewarisi ${p.parent}. Perhatikan pemanggilan atribut langsung melalui referensi superclass (obj.${p.attr}) dibandingkan dengan pemanggilan method overridden (obj.tampil()).\n\nBerapakah output konsol yang dicetak persis?`,
    code: code,
    placeholder: `Ketik output konsol (contoh: ${valParent}-${valChild})...`,
    correctAnswer: [correctOutput],
    caseSensitive: false,
    explanation: `KONSEP KUNCI UJIAN: Di Java, FIELD/VARIABEL TIDAK BERSIFAT POLIMORFIK (Variable Hiding). Pemanggilan "obj.${p.attr}" ditentukan oleh tipe referensi pada saat kompilasi (tipe ${p.parent}), sehingga bernilai ${valParent}. Sedangkan method "obj.tampil()" bersifat polimorfik dinamis (Dynamic Method Dispatch), sehingga mengeksekusi method milik objek nyata (${p.child1}) yang bernilai ${valChild}. Hasil gabungan output adalah "${correctOutput}".`
  };
}

/**
 * Generator 2: Constructor Chaining & Super Calculation
 */
function generateConstructorCalculationQuestion(id) {
  const p = getRandomItem(ENTITY_PAIRS);
  const baseNum = getRandomInt(10, 40);
  const addNum = getRandomInt(5, 25);
  const childMultiplier = getRandomInt(2, 4);

  const code = `class ${p.parent} {
    int nilai;
    ${p.parent}(int n) {
        this.nilai = n + ${baseNum};
    }
}

class ${p.child1} extends ${p.parent} {
    int pengali;
    ${p.child1}(int n, int m) {
        super(n);
        this.pengali = m;
    }

    int hitungTotal() {
        return this.nilai * this.pengali;
    }
}

public class Main {
    public static void main(String[] args) {
        ${p.child1} c = new ${p.child1}(${addNum}, ${childMultiplier});
        System.out.print(c.hitungTotal());
    }
}`;

  const expectedTotal = (addNum + baseNum) * childMultiplier;

  return {
    id: `dyn_${id}`,
    topic: 'Inheritance',
    difficulty: 'Sedang',
    type: 'text_input',
    question: `[Generator Dinamis: Constructor Chaining & Super]\nPerhatikan hierarki konstruktor berantai antara ${p.parent} dan ${p.child1}. Nilai argumen konstruktor dioper ke superclass melalui keyword super(n).\n\nBerapakah angka hasil perhitungan "c.hitungTotal()" yang dicetak?`,
    code: code,
    placeholder: `Ketik angka (misal: ${expectedTotal})...`,
    correctAnswer: [String(expectedTotal)],
    caseSensitive: false,
    explanation: `Alur eksekusi: 1. Konstruktor ${p.child1} menerima n=${addNum} dan m=${childMultiplier}. 2. Baris "super(${addNum})" memanggil konstruktor ${p.parent}, sehingga atribut nilai diinisialisasi menjadi ${addNum} + ${baseNum} = ${addNum + baseNum}. 3. Method hitungTotal() mengalikan nilai * pengali = ${addNum + baseNum} * ${childMultiplier} = ${expectedTotal}.`
  };
}

/**
 * Generator 3: Dynamic Method Dispatch Polymorphic Loop
 */
function generatePolymorphicLoopQuestion(id) {
  const p = getRandomItem(ENTITY_PAIRS);
  const v1 = getRandomInt(10, 50);
  const v2 = getRandomInt(60, 100);

  const code = `abstract class ${p.parent} {
    abstract int getNilai();
}

class TipeA extends ${p.parent} {
    int getNilai() { return ${v1}; }
}

class TipeB extends ${p.parent} {
    int getNilai() { return ${v2}; }
}

public class Main {
    public static void main(String[] args) {
        ${p.parent}[] daftar = { new TipeA(), new TipeB(), new TipeA() };
        int total = 0;
        for (${p.parent} item : daftar) {
            total += item.getNilai();
        }
        System.out.print(total);
    }
}`;

  const total = v1 + v2 + v1;

  return {
    id: `dyn_${id}`,
    topic: 'Polymorphism',
    difficulty: 'Sedang',
    type: 'text_input',
    question: `[Generator Dinamis: Koleksi Polimorfik & Dynamic Dispatch]\nArray polimorfik bertipe superclass menampung kombinasi objek TipeA dan TipeB secara dinamis.\n\nBerapakah total akumulasi nilai yang dicetak ke konsol?`,
    code: code,
    placeholder: `Ketik angka (misal: ${total})...`,
    correctAnswer: [String(total)],
    caseSensitive: false,
    explanation: `Array menampung objek: [TipeA (${v1}), TipeB (${v2}), TipeA (${v1})]. Loop menjumlahkan seluruh return value dari method getNilai() melalui Dynamic Method Dispatch: ${v1} + ${v2} + ${v1} = ${total}.`
  };
}

/**
 * Generator 4: Interface vs Abstract Architecture Decision
 */
function generateArchitectureScenarioQuestion(id) {
  const story = getRandomItem(STORY_THEMES);
  const featureA = 'sinkronisasiDataCloud';
  const featureB = 'enkripsiTingkatTinggi';

  return {
    id: `dyn_${id}`,
    topic: 'Studi Kasus (Soal Cerita)',
    difficulty: 'Sedang',
    type: 'single_choice',
    question: `[Studi Kasus: ${story.company}]\nAnda bertindak sebagai ${story.role} yang sedang memodernisasi arsitektur ${story.item}. Anda memiliki beberapa class yang TIDAK MEMILIKI hubungan pewarisan sedarah (misal: class ModulKamera, class LogAudit, dan class PengaturSuhu).\n\nKetiga class tersebut sama-sama membutuhkan kemampuan "${featureA}()" dan "${featureB}()". Keputusan desain OOP manakah yang PALING BENAR?`,
    options: [
      `Membuat Interface "DapatSinkronisasiCloud" yang berisi method ${featureA}() dan ${featureB}(), lalu di-implements oleh ketiga class tersebut`,
      `Memaksa ketiga class mewarisi (extends) satu Superclass abstrak raksasa "IndukSemuaModul"`,
      `Membuat method ${featureA}() berstatus private static di dalam package java.lang`,
      `Menulis ulang kode method yang sama secara manual di masing-masing class tanpa menggunakan interface`
    ],
    correctAnswer: 0,
    explanation: `Ketika beberapa class yang tidak satu famili/hierarki butuh kemampuan (behavior/capability) yang sama, solusi terbaik adalah INTERFACE ("can-do relationship"). Menggunakan superclass raksasa akan menimbulkan masalah pewarisan semu yang kaku (melanggar Liskov Substitution Principle dan Interface Segregation Principle).`
  };
}

/**
 * Generator 5: Downcasting Safety & instanceof
 */
function generateDowncastingScenarioQuestion(id) {
  const p = getRandomItem(ENTITY_PAIRS);

  const code = `class ${p.parent} {}
class ${p.child1} extends ${p.parent} {
    void fiturKhusus() { System.out.print("FITUR_OK"); }
}
class ${p.child2} extends ${p.parent} {}

public class TestCast {
    public static void main(String[] args) {
        ${p.parent} ref = new ${p.child2}();
        
        // Pengecekan aman vs Downcasting langsung
        if (ref instanceof ${p.child1} c) {
            c.fiturKhusus();
        } else {
            System.out.print("TIDAK_KOMPATIBEL");
        }
    }
}`;

  return {
    id: `dyn_${id}`,
    topic: 'Polymorphism',
    difficulty: 'Sedang',
    type: 'text_input',
    question: `[Generator Dinamis: Pattern Matching instanceof & Downcasting]\nPerhatikan proses validasi tipe sebelum downcasting pada potongan kode berikut.\n\nApakah teks yang dicetak ke layar saat program dijalankan?`,
    code: code,
    placeholder: 'Ketik output teks persis...',
    correctAnswer: ['TIDAK_KOMPATIBEL'],
    caseSensitive: false,
    explanation: `Objek nyata yang diinstansiasi di memori heap adalah new ${p.child2}(). Ekspresi "ref instanceof ${p.child1}" mengevaluasi false karena ${p.child2} bukan merupakan instansi dari ${p.child1}. Oleh karena itu, blok else dieksekusi dan mencetak "TIDAK_KOMPATIBEL" tanpa memicu ClassCastException.`
  };
}

/**
 * Main Function: Generate N Dynamic Random Questions
 */
export function generateRandomQuestionSet(count = 10) {
  const generators = [
    generateVariableHidingQuestion,
    generateConstructorCalculationQuestion,
    generatePolymorphicLoopQuestion,
    generateArchitectureScenarioQuestion,
    generateDowncastingScenarioQuestion
  ];

  const result = [];
  for (let i = 0; i < count; i++) {
    const gen = generators[i % generators.length];
    result.push(gen(Date.now() + i));
  }
  return result;
}
