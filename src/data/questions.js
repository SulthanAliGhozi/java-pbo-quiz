// src/data/questions.js
// 45 Soal Komprehensif Pemrograman Berorientasi Objek (PBO) Java
// Topik: Inheritance, Polymorphism, Abstract Class, dan Interface

export const TOPICS = {
  ALL: 'Semua Materi',
  STORY: 'Studi Kasus (Soal Cerita)',
  INHERITANCE: 'Inheritance',
  POLYMORPHISM: 'Polymorphism',
  ABSTRACT_CLASS: 'Abstract Class',
  INTERFACE: 'Interface',
};

export const QUESTIONS = [
  // ==========================================
  // TOPIC 1: INHERITANCE (SOAL 1 - 12)
  // ==========================================
  {
    id: 1,
    topic: TOPICS.INHERITANCE,
    difficulty: 'Mudah',
    type: 'single_choice',
    question: 'Di dalam bahasa Java, kata kunci (keyword) manakah yang digunakan oleh sebuah subclass untuk mewarisi atribut dan method dari sebuah superclass?',
    options: [
      'implements',
      'extends',
      'inherits',
      'subclass'
    ],
    correctAnswer: 1,
    explanation: 'Dalam Java, keyword "extends" digunakan untuk mewarisi sebuah class (baik class konkrit maupun class abstrak). Sedangkan "implements" digunakan khusus untuk mengimplementasikan sebuah interface.'
  },
  {
    id: 2,
    topic: TOPICS.INHERITANCE,
    difficulty: 'Mudah',
    type: 'single_choice',
    question: 'Perhatikan diagram hierarki pewarisan (UML Generalization) di bawah ini:',
    diagram: 'uml_single_inheritance',
    code: `class Kendaraan {
    protected String merk = "Toyota";
}

class Mobil extends Kendaraan {
    public void klakson() {
        System.out.println("Tiiin!");
    }
}`,
    options: [
      'Java mendukung Multiple Inheritance antar-class (sebuah class bisa mewarisi lebih dari 1 class sekaligus via extends)',
      'Class Mobil mewarisi atribut merk dari Kendaraan karena modifier-nya protected',
      'Class Kendaraan secara otomatis dapat memanggil method klakson() dari Mobil',
      'Objek Kendaraan k = new Kendaraan() dapat memanggil k.klakson()'
    ],
    correctAnswer: 1,
    explanation: 'Modifier "protected" memungkinkan akses oleh class dalam package yang sama serta seluruh subclass-nya. Java TIDAK mendukung multiple inheritance antar-class (hanya single class inheritance). Superclass tidak mewarisi method yang spesifik ada di subclass.'
  },
  {
    id: 3,
    topic: TOPICS.INHERITANCE,
    difficulty: 'Sedang',
    type: 'text_input',
    question: 'Tebak output dari potongan kode Java berikut saat dijalankan:',
    code: `class Induk {
    Induk() {
        System.out.print("A");
    }
}

class Anak extends Induk {
    Anak() {
        System.out.print("B");
    }
}

public class Main {
    public static void main(String[] args) {
        Anak obj = new Anak();
    }
}`,
    placeholder: 'Ketik output konsol (misal: AB)...',
    correctAnswer: ['AB'],
    caseSensitive: false,
    explanation: 'Ketika objek dari subclass diciptakan, Java secara implisit memanggil super() (konstruktor superclass tanpa argumen) pada baris pertama konstruktor subclass. Sehingga konstruktor Induk dijalankan terlebih dahulu (mencetak "A"), kemudian konstruktor Anak (mencetak "B"). Hasil output adalah "AB".'
  },
  {
    id: 4,
    topic: TOPICS.INHERITANCE,
    difficulty: 'Sedang',
    type: 'single_choice',
    question: 'Apa aturan paling mendasar mengenai penulisan pemanggilan konstruktor superclass dengan kata kunci "super()" di dalam konstruktor subclass?',
    options: [
      'Boleh diletakkan di baris mana saja selama masih dalam blok konstruktor',
      'Harus menjadi pernyataan pertama (first statement) di dalam konstruktor subclass',
      'Harus diletakkan di baris paling terakhir sebelum penutupan kurung kurawal',
      'Hanya boleh dipanggil jika method tersebut dideklarasikan sebagai static'
    ],
    correctAnswer: 1,
    explanation: 'Pemanggilan super(...) maupun this(...) harus selalu berada pada pernyataan pertama (statement ke-1) di dalam body konstruktor. Jika diletakkan di baris setelah pernyataan lain, compiler Java akan memunculkan error: "call to super must be first statement in constructor".'
  },
  {
    id: 5,
    topic: TOPICS.INHERITANCE,
    difficulty: 'Sedang',
    type: 'multiple_choice',
    question: 'Manakah dari pernyataan berikut yang BENAR mengenai aksesibilitas modifier anggota kelas dalam konsep Pewarisan (Inheritance)? (Pilih 2 jawaban yang benar)',
    options: [
      'Anggota ber-modifier private pada superclass TIDAK diwariskan secara langsung ke subclass',
      'Anggota ber-modifier protected dapat diakses oleh subclass meskipun berada di package berbeda',
      'Anggota ber-modifier public pada superclass otomatis berubah menjadi private di subclass',
      'Anggota tanpa modifier (default/package-private) selalu dapat diakses oleh subclass di sembarang package'
    ],
    correctAnswer: [0, 1],
    explanation: '1. Anggota "private" hanya bisa diakses dalam kelas asalnya sendiri, tidak diakses langsung oleh subclass (harus via getter/setter). 2. Modifier "protected" memberikan hak akses kepada subclass di package mana pun. Pernyataan 3 salah karena modifier tidak otomatis berubah. Pernyataan 4 salah karena default modifier hanya dapat diakses dalam package yang sama.'
  },
  {
    id: 6,
    topic: TOPICS.INHERITANCE,
    difficulty: 'Sulit',
    type: 'text_input',
    question: 'Berapakah nilai angka yang dicetak ke konsol dari program Java berikut?',
    code: `class SuperClass {
    int x = 10;
}

class SubClass extends SuperClass {
    int x = 20;

    void tampilkan() {
        System.out.print(super.x + this.x);
    }
}

public class Main {
    public static void main(String[] args) {
        new SubClass().tampilkan();
    }
}`,
    placeholder: 'Ketik hasil angka (misal: 30)...',
    correctAnswer: ['30'],
    caseSensitive: false,
    explanation: 'Kata kunci "super.x" mengakses atribut x milik SuperClass yang bernilai 10. Sedangkan "this.x" mengakses atribut x milik SubClass yang bernilai 20. Penjumlahan super.x + this.x menghasilkan 10 + 20 = 30.'
  },
  {
    id: 7,
    topic: TOPICS.INHERITANCE,
    difficulty: 'Sedang',
    type: 'single_choice',
    question: 'Apa akibatnya jika sebuah class dideklarasikan dengan kata kunci "final" di Java? Contoh: "final class Utilitas { ... }"',
    options: [
      'Class tersebut tidak bisa memiliki method konkrit',
      'Class tersebut tidak dapat diwarisi (tidak bisa dijadikan superclass oleh class manapun)',
      'Semua method di dalam class tersebut otomatis menjadi method abstract',
      'Objek dari class tersebut tidak dapat dibuat menggunakan operator new'
    ],
    correctAnswer: 1,
    explanation: 'Kata kunci "final" pada deklarasi class mencegah class tersebut untuk diwarisi (extends) oleh class lain (contoh nyata di Java adalah kelas java.lang.String dan java.lang.Math yang final demi keamanan dan optimasi).'
  },
  {
    id: 8,
    topic: TOPICS.INHERITANCE,
    difficulty: 'Mudah',
    type: 'text_input',
    question: 'Sebutkan kata kunci Java yang digunakan subclass untuk merujuk secara eksplisit ke atribut, method, atau konstruktor milik superclass langsungnya!',
    placeholder: 'Ketik keyword (huruf kecil)...',
    correctAnswer: ['super'],
    caseSensitive: false,
    explanation: 'Keyword "super" digunakan dalam Java untuk merujuk pada immediate parent class (superclass), baik untuk memanggil konstruktor parent "super()", method parent "super.namaMethod()", atau field parent "super.namaField".'
  },
  {
    id: 9,
    topic: TOPICS.INHERITANCE,
    difficulty: 'Sulit',
    type: 'text_input',
    question: 'Perhatikan urutan inisialisasi class berikut. Apakah output teks dari program ini?',
    code: `class Kakek {
    static { System.out.print("1"); }
    Kakek() { System.out.print("2"); }
}

class Bapak extends Kakek {
    static { System.out.print("3"); }
    Bapak() { System.out.print("4"); }
}

public class Main {
    public static void main(String[] args) {
        new Bapak();
    }
}`,
    placeholder: 'Ketik urutan angka tanpa spasi (misal: 1234)...',
    correctAnswer: ['1324'],
    caseSensitive: false,
    explanation: 'Urutan eksekusi Java: 1. Static initializer superclass ("1"), 2. Static initializer subclass ("3"), 3. Instance initializer & konstruktor superclass ("2"), 4. Instance initializer & konstruktor subclass ("4"). Sehingga output yang dihasilkan tepat adalah "1324".'
  },
  {
    id: 10,
    topic: TOPICS.INHERITANCE,
    difficulty: 'Sedang',
    type: 'multiple_choice',
    question: 'Manakah dari manfaat berikut yang merupakan keuntungan utama dari penerapan prinsip Pewarisan (Inheritance)? (Pilih 3 jawaban yang benar)',
    options: [
      'Reusabilitas kode (Code Reusability) tanpa menduplikasi kode yang sama',
      'Membangun hierarki konsep "is-a" yang terstruktur dan mudah dipelihara',
      'Memungkinkan kelas anak mewarisi method private secara bebas tanpa setter/getter',
      'Menjadi fondasi utama terciptanya mekanisme Polimorfisme dinamis (Overriding)'
    ],
    correctAnswer: [0, 1, 3],
    explanation: 'Manfaat utama Inheritance adalah: 1. Menghindari duplikasi kode (reusability), 2. Membentuk relasi is-a (misal Dog is-a Animal), dan 3. Memungkinkan Polimorfisme runtime. Pilihan ke-3 salah karena anggota private tidak dapat diakses langsung oleh kelas anak.'
  },
  {
    id: 11,
    topic: TOPICS.INHERITANCE,
    difficulty: 'Sulit',
    type: 'single_choice',
    question: 'Perhatikan kode method overriding berikut. Manakah aturan yang DILANGGAR pada kode ini sehingga menyebabkan compiler error?',
    code: `class Pegawai {
    public void kerja() {
        System.out.println("Pegawai bekerja");
    }
}

class Manajer extends Pegawai {
    @Override
    protected void kerja() { // Perhatikan modifier akses di sini
        System.out.println("Manajer memimpin rapat");
    }
}`,
    options: [
      'Subclass tidak boleh mengganti teks output dari method superclass',
      'Method yang di-override di subclass tidak boleh memiliki hak akses yang LEBIH KETAT daripada method di superclass',
      'Anotasi @Override hanya boleh digunakan untuk method ber-return type int',
      'Subclass harus menambahkan parameter baru saat melakukan override'
    ],
    correctAnswer: 1,
    explanation: 'Aturan akses pada Method Overriding: visibilitas method pada subclass tidak boleh dipersempit/diperketat (cannot assign weaker access privileges). Karena di Pegawai method "kerja()" adalah public, maka di Manajer tidak boleh diturunkan menjadi protected atau default/private.'
  },
  {
    id: 12,
    topic: TOPICS.INHERITANCE,
    difficulty: 'Mudah',
    type: 'single_choice',
    question: 'Dalam class diagram UML, relasi Inheritance (Pewarisan / Generalisasi) dilambangkan dengan simbol grafis apa?',
    diagram: 'uml_generalization_arrow',
    options: [
      'Garis putus-putus dengan panah terbuka',
      'Garis solid (lurus tanpa putus) dengan panah segitiga berongga (hollow triangle) mengarah ke Superclass',
      'Garis solid dengan simbol belah ketupat (diamond) berwarna hitam pekat di sisi Superclass',
      'Garis putus-putus dengan panah segitiga berongga mengarah ke Subclass'
    ],
    correctAnswer: 1,
    explanation: 'Dalam standar UML, Generalization (Inheritance) digambarkan dengan garis solid berujung segitiga berongga (hollow arrowhead) yang menunjuk ke arah Superclass. Sedangkan garis putus-putus dengan segitiga berongga adalah lambang Realization (Interface).'
  },

  // ==========================================
  // TOPIC 2: POLYMORPHISM (SOAL 13 - 23)
  // ==========================================
  {
    id: 13,
    topic: TOPICS.POLYMORPHISM,
    difficulty: 'Mudah',
    type: 'single_choice',
    question: 'Apa arti harfiah dari kata "Polymorphism" dalam konteks pemrograman berorientasi objek?',
    options: [
      'Banyak bentuk (Many forms), yaitu kemampuan objek untuk merespons pesan yang sama dengan perilaku berbeda',
      'Banyak pewarisan (Multiple inheritance) dari beberapa kelas secara serentak',
      'Kemampuan menyembunyikan data internal agar tidak dapat dimodifikasi',
      'Proses mengubah nama variabel saat kompilasi berjalan'
    ],
    correctAnswer: 0,
    explanation: 'Polymorphism berasal dari bahasa Yunani "poly" (banyak) dan "morph" (bentuk). Dalam OOP, polimorfisme adalah kemampuan satu antarmuka/referensi untuk mewakili berbagai jenis bentuk objek nyata saat runtime.'
  },
  {
    id: 14,
    topic: TOPICS.POLYMORPHISM,
    difficulty: 'Sedang',
    type: 'text_input',
    question: 'Apakah hasil teks yang dicetak ke layar oleh program Java polimorfisme berikut?',
    diagram: 'polymorphism_memory',
    code: `class Hewan {
    void bersuara() {
        System.out.print("Suara hewan ");
    }
}

class Kucing extends Hewan {
    @Override
    void bersuara() {
        System.out.print("Meong ");
    }
}

public class Main {
    public static void main(String[] args) {
        Hewan h = new Kucing(); // Upcasting
        h.bersuara();
    }
}`,
    placeholder: 'Ketik output persis...',
    correctAnswer: ['Meong', 'Meong '],
    caseSensitive: false,
    explanation: 'Ini adalah contoh klasik "Dynamic Method Dispatch" (Runtime Polymorphism). Variabel referensi bertipe superclass (Hewan), namun objek nyata di memori heap adalah Kucing. Saat method bersuara() dipanggil, JVM memanggil implementasi milik objek nyata (Kucing), sehingga tercetak "Meong".'
  },
  {
    id: 15,
    topic: TOPICS.POLYMORPHISM,
    difficulty: 'Sedang',
    type: 'single_choice',
    question: 'Perhatikan konsep tipe polimorfisme di bawah ini. Manakah pasangan yang TEPAT antara jenis polimorfisme dengan contoh penerapannya di Java?',
    options: [
      'Compile-time Polymorphism = Method Overriding ; Runtime Polymorphism = Method Overloading',
      'Compile-time Polymorphism = Method Overloading ; Runtime Polymorphism = Method Overriding (Dynamic Binding)',
      'Static Polymorphism = Downcasting ; Dynamic Polymorphism = Encapsulation',
      'Compile-time Polymorphism = Interface ; Runtime Polymorphism = Constructor'
    ],
    correctAnswer: 1,
    explanation: 'Method Overloading adalah contoh Compile-time (Static) Polymorphism karena pemilihan method diselesaikan saat kompilasi berdasarkan signature parameter. Method Overriding adalah Runtime (Dynamic) Polymorphism karena ditentukan saat runtime via Dynamic Method Dispatch.'
  },
  {
    id: 16,
    topic: TOPICS.POLYMORPHISM,
    difficulty: 'Sulit',
    type: 'text_input',
    question: 'Perhatikan kode "Variable Hiding" berikut. Apakah output teks dari pemanggilan program ini?',
    code: `class Parent {
    String nama = "Ayah";
}

class Child extends Parent {
    String nama = "Anak";
}

public class Main {
    public static void main(String[] args) {
        Parent p = new Child();
        System.out.print(p.nama);
    }
}`,
    placeholder: 'Ketik output teks...',
    correctAnswer: ['Ayah'],
    caseSensitive: false,
    explanation: 'PENTING: Di Java, atribut/variabel TIDAK bersifat polimorfik! Ketika terjadi "Variable Hiding", atribut mana yang diakses ditentukan oleh TIPE REFERENSI pada saat kompilasi (tipe referensi "Parent"), bukan tipe objek nyata di heap. Oleh karena itu, p.nama akan mengambil nilai dari kelas Parent ("Ayah").'
  },
  {
    id: 17,
    topic: TOPICS.POLYMORPHISM,
    difficulty: 'Sedang',
    type: 'single_choice',
    question: 'Perhatikan proses Upcasting dan Downcasting berikut. Baris manakah yang akan memicu terjadinya runtime error "ClassCastException"?',
    code: `class Bentuk {}
class Lingkaran extends Bentuk {}
class Persegi extends Bentuk {}

public class Test {
    public static void main(String[] args) {
        Bentuk b1 = new Lingkaran(); // Baris 1
        Lingkaran L = (Lingkaran) b1; // Baris 2
        Persegi p = (Persegi) b1;    // Baris 3
    }
}`,
    options: [
      'Baris 1',
      'Baris 2',
      'Baris 3',
      'Tidak ada error, kode berjalan mulus'
    ],
    correctAnswer: 2,
    explanation: 'Objek nyata yang dibuat di heap adalah Lingkaran. Pada Baris 3, program mencoba melakukan downcasting b1 menjadi Persegi. Karena objek Lingkaran tidak bisa dikonversi menjadi Persegi, JVM akan melempar exception "java.lang.ClassCastException" saat runtime.'
  },
  {
    id: 18,
    topic: TOPICS.POLYMORPHISM,
    difficulty: 'Mudah',
    type: 'text_input',
    question: 'Operator apa dalam Java yang digunakan untuk memeriksa apakah suatu objek merupakan instansi dari suatu class tertentu sebelum melakukan downcasting secara aman?',
    placeholder: 'Ketik nama operator (huruf kecil)...',
    correctAnswer: ['instanceof'],
    caseSensitive: false,
    explanation: 'Operator "instanceof" digunakan untuk menguji apakah suatu objek adalah instansi dari class, subclass, atau interface tertentu (misal: if (b1 instanceof Persegi)).'
  },
  {
    id: 19,
    topic: TOPICS.POLYMORPHISM,
    difficulty: 'Sulit',
    type: 'multiple_choice',
    question: 'Manakah dari syarat-syarat berikut yang WAJIB dipenuhi agar mekanisme Runtime Polymorphism (Dynamic Binding) dapat terjadi di Java? (Pilih 2 jawaban yang benar)',
    options: [
      'Harus ada relasi Pewarisan (Inheritance) atau Implementasi Interface antar class',
      'Method pada superclass harus dideklarasikan sebagai static atau final',
      'Terjadi Method Overriding pada subclass dengan nama dan signature parameter yang sama',
      'Semua variabel anggota harus bertipe private static'
    ],
    correctAnswer: [0, 2],
    explanation: 'Agar runtime polymorphism dapat bekerja: 1. Harus ada hierarki inheritance/interface, 2. Method di subclass harus meng-override method superclass, dan 3. Pemanggilan dilakukan melalui referensi superclass. Method static atau final TIDAK BISA di-override, sehingga pilihan ke-2 justru menggagalkan polimorfisme dinamis.'
  },
  {
    id: 20,
    topic: TOPICS.POLYMORPHISM,
    difficulty: 'Sulit',
    type: 'text_input',
    question: 'Tebak output konsol dari program polimorfisme bertingkat berikut:',
    code: `class A {
    void info() { System.out.print("A"); }
}
class B extends A {
    void info() { System.out.print("B"); }
}
class C extends B {
    void info() { System.out.print("C"); }
}

public class Main {
    public static void main(String[] args) {
        A ref = new C();
        ref.info();
    }
}`,
    placeholder: 'Ketik output konsol...',
    correctAnswer: ['C'],
    caseSensitive: false,
    explanation: 'Meskipun tipe referensinya adalah class A, objek nyata yang diinstansiasi di memori heap adalah class C (new C()). Java menggunakan dynamic method lookup dari level terbawah objek nyata, sehingga method info() pada class C yang dijalankan ("C").'
  },
  {
    id: 21,
    topic: TOPICS.POLYMORPHISM,
    difficulty: 'Sedang',
    type: 'single_choice',
    question: 'Fitur apa yang diperkenalkan pada Java 16 untuk mempermudah pengecekan tipe dan casting sekaligus (Pattern Matching)?',
    code: `// Kode lama:
if (obj instanceof String) {
    String s = (String) obj;
    System.out.println(s.length());
}

// Kode baru:
if (obj instanceof String s) {
    System.out.println(s.length());
}`,
    options: [
      'Type Erasure',
      'Pattern Matching for instanceof',
      'Autoboxing & Unboxing',
      'Dynamic Proxy Invocation'
    ],
    correctAnswer: 1,
    explanation: 'Fitur "Pattern Matching for instanceof" (distandarisasi di Java 16) memungkinkan kita mendeklarasikan variabel pola (s) langsung di dalam ekspresi instanceof, sehingga tidak perlu lagi menulis baris casting eksplisit manual.'
  },
  {
    id: 22,
    topic: TOPICS.POLYMORPHISM,
    difficulty: 'Mudah',
    type: 'single_choice',
    question: 'Diberikan array polimorfik: "Hewan[] zoo = { new Kucing(), new Anjing(), new Burung() };". Mengapa array bertipe superclass dapat menampung objek dari berbagai subclass?',
    options: [
      'Karena compiler Java otomatis menghapus semua subclass menjadi Object biasa',
      'Karena setiap subclass "is-a" superclass (Kucing adalah Hewan), sehingga terjadi Upcasting secara implisit',
      'Karena array di Java tidak memiliki sistem pengecekan tipe data (untyped)',
      'Karena keyword extends menonaktifkan type-safety pada memori stack'
    ],
    correctAnswer: 1,
    explanation: 'Karena adanya relasi pewarisan ("is-a"), objek subclass kompatibel dengan referensi superclass. Upcasting terjadi secara otomatis dan aman (implicit upcasting), memungkinkan collection atau array bertipe parent menampung aneka ragam objek turunannya.'
  },
  {
    id: 23,
    topic: TOPICS.POLYMORPHISM,
    difficulty: 'Sulit',
    type: 'text_input',
    question: 'Sebutkan nama Runtime Exception di Java yang dilempar saat kode mencoba mengonversi tipe objek ke subclass yang tidak valid!',
    placeholder: 'Ketik nama exception...',
    correctAnswer: ['ClassCastException'],
    caseSensitive: false,
    explanation: 'java.lang.ClassCastException adalah unchecked exception yang dilempar saat program mencoba melakukan cast sebuah objek ke class yang bukan merupakan instansi aslinya dalam hierarki tipe data.'
  },

  // ==========================================
  // TOPIC 3: ABSTRACT CLASS (SOAL 24 - 34)
  // ==========================================
  {
    id: 24,
    topic: TOPICS.ABSTRACT_CLASS,
    difficulty: 'Mudah',
    type: 'single_choice',
    question: 'Pernyataan manakah yang PALING TEPAT mendeskripsikan sifat mendasar dari sebuah "Abstract Class" di Java?',
    options: [
      'Abstract class dapat diinstansiasi langsung menggunakan operator new',
      'Abstract class TIDAK DAPAT diinstansiasi secara langsung; ia dirancang sebagai cetak biru (blueprint) bagi subclass-nya',
      'Abstract class tidak boleh memiliki atribut (field) maupun konstruktor sama sekali',
      'Semua method di dalam abstract class wajib tidak memiliki implementasi (body)'
    ],
    correctAnswer: 1,
    explanation: 'Sebuah abstract class tidak dapat dibuat objeknya secara langsung dengan operator new. Tujuannya adalah menyediakan kerangka dasar, kode bersama, dan kontrak method yang wajib diselesaikan oleh subclass konkritnya.'
  },
  {
    id: 25,
    topic: TOPICS.ABSTRACT_CLASS,
    difficulty: 'Mudah',
    type: 'text_input',
    question: 'Kata kunci apa yang digunakan untuk mendeklarasikan kelas atau method yang belum memiliki implementasi body di Java?',
    placeholder: 'Ketik keyword (huruf kecil)...',
    correctAnswer: ['abstract'],
    caseSensitive: false,
    explanation: 'Keyword "abstract" digunakan pada level class ("abstract class NamaClass") dan pada level method ("abstract void namaMethod();") untuk menandakan bahwa kelas tersebut tidak dapat diinstansiasi langsung atau method tersebut belum memiliki body ({}) implementasi.'
  },
  {
    id: 26,
    topic: TOPICS.ABSTRACT_CLASS,
    difficulty: 'Sedang',
    type: 'single_choice',
    question: 'Perhatikan potongan kode abstract class berikut. Apakah baris yang diberi tanda panah (-->) akan berhasil dikompilasi?',
    code: `abstract class Senjata {
    abstract void serang();
}

public class Main {
    public static void main(String[] args) {
        Senjata s = new Senjata(); // --> Baris ini
    }
}`,
    options: [
      'Berhasil, karena setiap class di Java otomatis memiliki default constructor yang dapat diinstansiasi',
      'Gagal kompilasi (Compile Error): "Senjata is abstract; cannot be instantiated"',
      'Berhasil saat kompilasi, namun melempar NullPointerException saat dijalankan',
      'Berhasil hanya jika method serang() diubah menjadi static'
    ],
    correctAnswer: 1,
    explanation: 'Compiler Java melarang pembuatan objek secara langsung dari sebuah abstract class (new Senjata()). Jika dipaksakan, compiler akan memunculkan error: "cannot be instantiated". Instansiasi hanya bisa dilakukan terhadap subclass konkrit yang telah meng-override semua abstract method.'
  },
  {
    id: 27,
    topic: TOPICS.ABSTRACT_CLASS,
    difficulty: 'Sedang',
    type: 'multiple_choice',
    question: 'Manakah dari pernyataan berikut yang BENAR mengenai method dan konstruktor pada Abstract Class? (Pilih 2 jawaban yang benar)',
    options: [
      'Abstract class DAPAT memiliki konstruktor, yang akan dipanggil saat subclass-nya diinstansiasi (via super())',
      'Abstract class BISA memiliki campuran antara method abstrak (tanpa body) dan method konkrit (dengan body)',
      'Method abstrak boleh dideklarasikan dengan modifier "private"',
      'Method abstrak boleh dideklarasikan dengan modifier "final"'
    ],
    correctAnswer: [0, 1],
    explanation: '1. Abstract class tetap memiliki konstruktor guna menginisialisasi atribut miliknya saat subclass memanggil super(). 2. Abstract class sangat fleksibel karena bisa memiliki method konkrit dan method abstrak sekaligus. Pilihan 3 & 4 salah karena abstract method WAJIB di-override oleh subclass, sedangkan "private" dan "final" melarang overriding, sehingga illegal jika digabungkan.'
  },
  {
    id: 28,
    topic: TOPICS.ABSTRACT_CLASS,
    difficulty: 'Sulit',
    type: 'text_input',
    question: 'Tebak output konsol dari pola "Template Method" menggunakan abstract class berikut:',
    code: `abstract class Game {
    abstract void mainkan();

    void jalankan() {
        System.out.print("Mulai-");
        mainkan();
        System.out.print("-Selesai");
    }
}

class Catur extends Game {
    @Override
    void mainkan() {
        System.out.print("SkakMat");
    }
}

public class Main {
    public static void main(String[] args) {
        Game g = new Catur();
        g.jalankan();
    }
}`,
    placeholder: 'Ketik output lengkap...',
    correctAnswer: ['Mulai-SkakMat-Selesai'],
    caseSensitive: false,
    explanation: 'Method jalankan() adalah method konkrit di abstract class Game yang memanggil abstract method mainkan(). Saat g.jalankan() dipanggil pada objek Catur, jalankan() mencetak "Mulai-", lalu memanggil mainkan() milik Catur ("SkakMat"), lalu mencetak "-Selesai". Hasil akhir: "Mulai-SkakMat-Selesai".'
  },
  {
    id: 29,
    topic: TOPICS.ABSTRACT_CLASS,
    difficulty: 'Sedang',
    type: 'single_choice',
    question: 'Jika sebuah class konkrit mewarisi (extends) sebuah abstract class yang memiliki 3 abstract method, apa kewajiban class konkrit tersebut?',
    options: [
      'Cukup mengimplementasikan salah satu method saja',
      'Wajib meng-override dan mengimplementasikan KETIGA abstract method tersebut (kecuali jika class tersebut juga dideklarasikan sebagai abstract)',
      'Tidak wajib mengimplementasikan method apapun selama ada konstruktor kosong',
      'Hanya perlu mendeklarasikan ulang method dengan keyword static'
    ],
    correctAnswer: 1,
    explanation: 'Sebuah class konkrit (non-abstrak) memiliki kontrak mutlak untuk mengimplementasikan seluruh abstract method yang diwarisinya. Jika ada satu saja yang tidak diimplementasikan, class tersebut wajib dideklarasikan sebagai "abstract class" juga.'
  },
  {
    id: 30,
    topic: TOPICS.ABSTRACT_CLASS,
    difficulty: 'Sulit',
    type: 'single_choice',
    question: 'Mengapa kombinasi keyword "abstract final void proses();" atau "abstract private void hitung();" menghasilkan Compile-Time Error di Java?',
    options: [
      'Karena Java tidak mendukung penulisan lebih dari satu keyword sebelum return type',
      'Karena abstract mewajibkan method untuk di-override oleh subclass, sedangkan final dan private secara tegas melarang method untuk di-override',
      'Karena kata kunci final hanya boleh disematkan pada variabel konstanta',
      'Karena abstract method hanya boleh memiliki hak akses default (package-private)'
    ],
    correctAnswer: 1,
    explanation: 'Terjadi kontradiksi logika: tujuan utama membuat method "abstract" adalah agar diimplementasikan (di-override) oleh subclass di masa depan. Sedangkan "final" melarang overriding, dan "private" menyembunyikan method dari subclass. Kontradiksi ini dicegah oleh compiler Java.'
  },
  {
    id: 31,
    topic: TOPICS.ABSTRACT_CLASS,
    difficulty: 'Mudah',
    type: 'single_choice',
    question: 'Dalam penulisan standar diagram kelas UML, bagaimana cara membedakan nama Abstract Class dengan class biasa konkrit?',
    diagram: 'uml_abstract_class',
    options: [
      'Nama abstract class ditulis dengan huruf miring (Italic) atau diberi stereotype <<abstract>>',
      'Kotak abstract class diberi garis tepi putus-putus ganda',
      'Nama abstract class wajib diawali dengan huruf kecil',
      'Abstract class tidak memiliki bagian kompartemen method di diagram'
    ],
    correctAnswer: 0,
    explanation: 'Menurut konvensi UML resmi, nama Abstract Class (dan abstract method) ditulis dengan font cetak miring (Italic), atau secara eksplisit disematkan teks penanda <<abstract>> di atas nama kelasnya.'
  },
  {
    id: 32,
    topic: TOPICS.ABSTRACT_CLASS,
    difficulty: 'Sulit',
    type: 'text_input',
    question: 'Perhatikan pemanggilan konstruktor abstract class berikut. Berapakah hasil penjumlahan angka yang dicetak?',
    code: `abstract class BangunDatar {
    int jumlahSisi;
    BangunDatar(int sisi) {
        this.jumlahSisi = sisi;
    }
}

class Segitiga extends BangunDatar {
    Segitiga() {
        super(3);
    }
}

public class Main {
    public static void main(String[] args) {
        Segitiga s = new Segitiga();
        System.out.print(s.jumlahSisi * 10);
    }
}`,
    placeholder: 'Ketik hasil angka (misal: 30)...',
    correctAnswer: ['30'],
    caseSensitive: false,
    explanation: 'Meskipun BangunDatar adalah abstract class, konstruktornya dieksekusi saat Segitiga memanggil super(3). Nilai atribut jumlahSisi diinisialisasi menjadi 3. Pada baris utama: 3 * 10 = 30.'
  },
  {
    id: 33,
    topic: TOPICS.ABSTRACT_CLASS,
    difficulty: 'Sedang',
    type: 'multiple_choice',
    question: 'Manakah skenario di bawah ini yang PALING COCOK menggunakan Abstract Class dibandingkan Interface? (Pilih 2 jawaban yang benar)',
    options: [
      'Ketika beberapa class yang berkerabat dekat (is-a) membutuhkan berbagi kode implementasi dasar (code sharing) dan atribut non-static',
      'Ketika ingin mendefinisikan konstanta global dan hanya membutuhkan kontrak aksi tanpa hierarki keluarga yang sama',
      'Ketika membutuhkan konstruktor dengan parameter untuk menginisialisasi state dasar superclass',
      'Ketika sebuah class turunan ingin mewarisi dari 5 sumber berbeda sekaligus menggunakan kata kunci extends'
    ],
    correctAnswer: [0, 2],
    explanation: 'Abstract class sangat ideal jika: 1. Ada hubungan kekeluargaan erat (is-a) dan butuh state/field non-static bersama, 2. Butuh konstruktor untuk inisialisasi state dasar. Pilihan 2 lebih cocok untuk Interface. Pilihan 4 mustahil karena Java hanya mendukung single class inheritance.'
  },
  {
    id: 34,
    topic: TOPICS.ABSTRACT_CLASS,
    difficulty: 'Sedang',
    type: 'single_choice',
    question: 'Apakah sebuah abstract class BOLEH sama sekali TIDAK MEMILIKI satu pun abstract method di dalamnya?',
    options: [
      'Tidak boleh, minimal harus ada 1 abstract method agar sah sebagai abstract class',
      'Boleh. Class tersebut tetap tidak bisa diinstansiasi langsung menggunakan new',
      'Hanya boleh jika class tersebut berada di dalam package java.lang',
      'Boleh, tetapi compiler akan otomatis mengonversi class tersebut menjadi Interface'
    ],
    correctAnswer: 1,
    explanation: 'Boleh! Sebuah class dapat dideklarasikan dengan keyword "abstract" meskipun tidak memiliki satupun abstract method di dalamnya. Hal ini umum dilakukan pengembang saat ingin mencegah kelas tersebut diinstansiasi secara langsung demi alasan rancangan arsitektur.'
  },

  // ==========================================
  // TOPIC 4: INTERFACE (SOAL 35 - 45)
  // ==========================================
  {
    id: 35,
    topic: TOPICS.INTERFACE,
    difficulty: 'Mudah',
    type: 'single_choice',
    question: 'Kata kunci (keyword) apa yang digunakan oleh sebuah class di Java untuk mengimplementasikan satu atau lebih Interface?',
    options: [
      'extends',
      'implements',
      'uses',
      'includes'
    ],
    correctAnswer: 1,
    explanation: 'Keyword "implements" digunakan oleh sebuah class untuk mengadopsi kontrak yang ditentukan oleh satu atau lebih interface (contoh: class Pesawat implements Terbang, Navigasi).'
  },
  {
    id: 36,
    topic: TOPICS.INTERFACE,
    difficulty: 'Sedang',
    type: 'multiple_choice',
    question: 'Secara default (implisit), apakah modifier yang disematkan oleh compiler Java pada setiap VARIABEL / ATRIBUT yang dideklarasikan di dalam Interface? (Pilih 3 modifier)',
    code: `interface Konfigurasi {
    int TIMEOUT = 5000; // Modifier apa saja yang otomatis ada di sini?
}`,
    options: [
      'public',
      'static',
      'final',
      'volatile'
    ],
    correctAnswer: [0, 1, 2],
    explanation: 'Di dalam interface, seluruh variabel otomatis berstatus "public static final" (merupakan nilai konstanta yang tidak dapat diubah dan dapat diakses langsung via NamaInterface.NAMA_KONSTANTA).'
  },
  {
    id: 37,
    topic: TOPICS.INTERFACE,
    difficulty: 'Sedang',
    type: 'single_choice',
    question: 'Mulai dari Java versi 8, fitur apa yang memungkinkan sebuah method di dalam Interface memiliki implementasi konkrit (memiliki body {}) sehingga tidak merusak class-class yang telah mengimplementasikannya?',
    options: [
      'Native methods',
      'Default methods (menggunakan keyword "default")',
      'Abstract final methods',
      'Synchronized instance methods'
    ],
    correctAnswer: 1,
    explanation: 'Java 8 memperkenalkan "default method" dengan kata kunci default. Tujuannya adalah memfasilitasi evolusi antarmuka (misalnya penambahan method stream() pada Collection API) tanpa mematahkan kompatibilitas class lama yang mengimplementasikan interface tersebut.'
  },
  {
    id: 38,
    topic: TOPICS.INTERFACE,
    difficulty: 'Sulit',
    type: 'text_input',
    question: 'Tebak output konsol dari pemanggilan static method pada interface di Java 8+ berikut:',
    code: `interface Hitung {
    static int tambah(int a, int b) {
        return a + b;
    }
}

public class Main {
    public static void main(String[] args) {
        System.out.print(Hitung.tambah(15, 25));
    }
}`,
    placeholder: 'Ketik hasil output...',
    correctAnswer: ['40'],
    caseSensitive: false,
    explanation: 'Mulai Java 8, interface dapat memiliki static method dengan implementasi body. Static method ini dipanggil langsung menggunakan nama interface-nya (Hitung.tambah(15, 25)). Perhitungan 15 + 25 menghasilkan nilai 40.'
  },
  {
    id: 39,
    topic: TOPICS.INTERFACE,
    difficulty: 'Sulit',
    type: 'single_choice',
    question: 'Perhatikan kasus "Diamond Problem" pada dua Interface dengan default method yang memiliki nama sama persis berikut:',
    diagram: 'uml_diamond_problem',
    code: `interface A {
    default void halo() { System.out.print("A"); }
}
interface B {
    default void halo() { System.out.print("B"); }
}

class C implements A, B {
    // Bagaimanakah cara class C menyelesaikan konflik method halo()?
}`,
    options: [
      'Class C otomatis memilih method dari interface A karena A ditulis lebih dulu pada klausa implements',
      'Class C wajib meng-override method halo() secara eksplisit; jika ingin memanggil milik A, gunakan sintaks "A.super.halo();"',
      'JVM akan melempar exception saat aplikasi dijalankan (runtime ambiguity error)',
      'Class C akan memanggil kedua method secara berurutan dan mencetak "AB"'
    ],
    correctAnswer: 1,
    explanation: 'Jika sebuah class mengimplementasikan dua interface yang memiliki signature default method yang identik, terjadi konflik ambigu. Compiler Java mewajibkan class C meng-override method tersebut secara eksplisit. Untuk memanggil salah satu implementasi spesifik interface, gunakan sintaks: NamaInterface.super.namaMethod() (contoh: A.super.halo();).'
  },
  {
    id: 40,
    topic: TOPICS.INTERFACE,
    difficulty: 'Mudah',
    type: 'single_choice',
    question: 'Dapatkah sebuah Interface mewarisi (extends) interface lainnya di Java?',
    options: [
      'Tidak bisa sama sekali, interface hanya bisa diimplementasikan oleh class',
      'Bisa, sebuah interface dapat menggunakan keyword "extends" bahkan dapat mewarisi LEBIH DARI SATU interface sekaligus (Multiple Interface Inheritance)',
      'Hanya bisa jika interface induk tidak memiliki default method',
      'Bisa, tetapi harus menggunakan keyword "implements"'
    ],
    correctAnswer: 1,
    explanation: 'Antar-interface menggunakan keyword "extends", BUKAN implements. Yang istimewa, Java mengizinkan interface mewarisi beberapa interface sekaligus! Contoh: "interface MultimediaPlayer extends AudioPlayer, VideoPlayer { ... }".'
  },
  {
    id: 41,
    topic: TOPICS.INTERFACE,
    difficulty: 'Sedang',
    type: 'text_input',
    question: 'Disebut apakah istilah untuk interface di Java yang HANYA MEMILIKI TEPAT SATU abstract method (Single Abstract Method / SAM), sehingga dapat digunakan sebagai target ekspresi Lambda?',
    placeholder: 'Ketik nama istilah (Bahasa Inggris)...',
    correctAnswer: ['Functional Interface', 'FunctionalInterface'],
    caseSensitive: false,
    explanation: 'Interface yang hanya memiliki tepat satu abstract method disebut "Functional Interface" (contoh: Runnable, Callable, Comparator). Anotasi opsional @FunctionalInterface dapat disematkan untuk memastikan compiler memvalidasi aturan Single Abstract Method ini.'
  },
  {
    id: 42,
    topic: TOPICS.INTERFACE,
    difficulty: 'Sedang',
    type: 'multiple_choice',
    question: 'Perhatikan perbandingan mendasar antara Abstract Class dan Interface di Java modern (Java 8+). Manakah pernyataan yang BENAR? (Pilih 2 jawaban yang benar)',
    options: [
      'Sebuah class konkrit hanya bisa meng-extends 1 class (single inheritance), tetapi dapat meng-implements BANYAK interface sekaligus',
      'Abstract class dapat memiliki state internal berupa variabel instance (non-static & non-final), sedangkan interface tidak bisa memiliki instance variable',
      'Interface memiliki konstruktor berparameter, sedangkan abstract class dilarang memiliki konstruktor',
      'Abstract class tidak boleh memiliki method konkrit, sedangkan interface wajib seluruhnya konkrit'
    ],
    correctAnswer: [0, 1],
    explanation: 'Pernyataan 1 benar (Java menerapkan single class inheritance & multiple interface implementation). Pernyataan 2 benar (interface hanya memiliki public static final konstanta, tidak bisa menyimpan state objek dinamis). Pernyataan 3 salah (interface sama sekali TIDAK BISA memiliki konstruktor). Pernyataan 4 salah (abstract class bebas memiliki method konkrit).'
  },
  {
    id: 43,
    topic: TOPICS.INTERFACE,
    difficulty: 'Sulit',
    type: 'text_input',
    question: 'Tebak output konsol dari implementasi multiple interface dan default method berikut:',
    code: `interface Pencetak {
    default void cetak() {
        System.out.print("Kertas ");
    }
}

interface Pengirim {
    default void cetak() {
        System.out.print("Email ");
    }
}

class Kantor implements Pencetak, Pengirim {
    @Override
    public void cetak() {
        Pencetak.super.cetak();
        System.out.print("& Digital");
    }
}

public class Main {
    public static void main(String[] args) {
        new Kantor().cetak();
    }
}`,
    placeholder: 'Ketik output konsol persis...',
    correctAnswer: ['Kertas & Digital'],
    caseSensitive: false,
    explanation: 'Class Kantor menyelesaikan konflik cetak() dengan meng-override method tersebut. Di dalamnya, ia memanggil implementasi milik Pencetak via Pencetak.super.cetak() yang mencetak "Kertas ", lalu dilanjutkan mencetak "& Digital". Output akhirnya adalah "Kertas & Digital".'
  },
  {
    id: 44,
    topic: TOPICS.INTERFACE,
    difficulty: 'Mudah',
    type: 'single_choice',
    question: 'Bagaimanakah lambang relasi "Realization" (sebuah class yang mengimplementasikan sebuah Interface) dalam standar Diagram Kelas UML?',
    diagram: 'uml_realization_arrow',
    options: [
      'Garis putus-putus (dashed line) dengan ujung panah segitiga berongga (hollow triangle) menunjuk ke Interface',
      'Garis solid lurus tebal dengan belah ketupat putih',
      'Garis spiral dengan lingkaran hitam di tengah',
      'Garis panah dua arah dengan huruf "I" di ujungnya'
    ],
    correctAnswer: 0,
    explanation: 'Dalam standar UML, relasi Realization/Implementation (class implements interface) digambarkan dengan garis putus-putus (dashed line) yang memiliki ujung segitiga berongga tertutup menunjuk ke arah Interface. Bandingkan dengan Generalization (extends) yang menggunakan garis lurus padat (solid line).'
  },
  {
    id: 45,
    topic: TOPICS.INTERFACE,
    difficulty: 'Sedang',
    type: 'text_input',
    question: 'Ketik keyword Java yang digunakan oleh sebuah class untuk mengadopsi kontrak method dari sebuah Interface!',
    placeholder: 'Ketik keyword (huruf kecil)...',
    correctAnswer: ['implements'],
    caseSensitive: false,
    explanation: 'Keyword "implements" adalah kata kunci wajib yang ditulis setelah nama class dan nama-nama interface yang ingin diterapkan (contoh: class UserServiceImpl implements UserService).'
  },

  // ==========================================
  // TOPIC 5: STUDI KASUS & SOAL CERITA (SOAL 46 - 65)
  // ==========================================
  {
    id: 46,
    topic: TOPICS.STORY,
    difficulty: 'Sedang',
    type: 'single_choice',
    question: '[Studi Kasus E-Commerce] Tim pengembang toko online sedang merancang sistem pembayaran. Terdapat abstract class "Pembayaran" yang memiliki method konkrit "hitungDiskon()" dan abstract method "prosesBayar()". Selain itu, dibuat interface "BisaRefund" yang memiliki method "kembalikanDana()".\n\nJika toko ingin menambahkan metode pembayaran baru yaitu "COD (Cash On Delivery)" yang mana metode ini TIDAK MENDUKUNG fitur pengembalian dana online (refund), bagaimanakah perancangan class "COD" yang paling tepat?',
    options: [
      'class COD extends Pembayaran implements BisaRefund',
      'class COD extends Pembayaran (tanpa mengimplementasikan interface BisaRefund)',
      'class COD implements Pembayaran, BisaRefund',
      'class COD extends BisaRefund implements Pembayaran'
    ],
    correctAnswer: 1,
    explanation: 'Dalam prinsip OOP (terutama Interface Segregation Principle), class COD merupakan turunan dari jenis Pembayaran (is-a Pembayaran) sehingga wajib meng-extends class Pembayaran. Namun karena COD tidak mendukung pengembalian dana, class COD TIDAK BOLEH mengimplementasikan interface BisaRefund.'
  },
  {
    id: 47,
    topic: TOPICS.STORY,
    difficulty: 'Sedang',
    type: 'text_input',
    question: '[Studi Kasus Game RPG] Sebuah tim game membuat sistem aksi serangan party petualang. Perhatikan kode polimorfisme berikut:\n\nTebak output konsol yang dicetak saat party melakukan serangan beruntun!',
    code: `abstract class Pahlawan {
    abstract void serang();
}

class Ksatria extends Pahlawan {
    void serang() { System.out.print("Tebasan Pedang 50 "); }
}

class Penyihir extends Pahlawan {
    void serang() { System.out.print("Bola Api 80 "); }
}

public class GameMain {
    public static void main(String[] args) {
        Pahlawan[] party = { new Ksatria(), new Penyihir() };
        for (Pahlawan p : party) {
            p.serang();
        }
    }
}`,
    placeholder: 'Ketik output konsol persis...',
    correctAnswer: ['Tebasan Pedang 50 Bola Api 80 ', 'Tebasan Pedang 50 Bola Api 80'],
    caseSensitive: false,
    explanation: 'Pada loop for-each polimorfik, variabel referensi p (tipe Pahlawan) pertama-tama merujuk ke objek nyata Ksatria (mencetak "Tebasan Pedang 50 "), kemudian pada iterasi kedua merujuk ke objek Penyihir (mencetak "Bola Api 80 "). Dynamic Method Dispatch mengeksekusi method serang() sesuai objek nyata di heap.'
  },
  {
    id: 48,
    topic: TOPICS.STORY,
    difficulty: 'Sedang',
    type: 'multiple_choice',
    question: '[Studi Kasus Perbankan] Bank "Amanah" memiliki class RekeningBank dengan method tarik(double jumlah). Pada jenis RekeningTabungan, setiap penarikan dikenakan biaya administrasi otomatis sebesar Rp 2.500. Pengembang menulis kode berikut:\n\nManakah 2 alasan mengapa pemanggilan "super.tarik(jumlah + 2500);" adalah praktik terbaik (best practice)? (Pilih 2 jawaban)',
    code: `class RekeningBank {
    protected double saldo;
    public void tarik(double jumlah) {
        if (saldo >= jumlah) saldo -= jumlah;
    }
}

class RekeningTabungan extends RekeningBank {
    @Override
    public void tarik(double jumlah) {
        super.tarik(jumlah + 2500); // Perhatikan baris ini
    }
}`,
    options: [
      'Memanfaatkan kembali (reuse) logika validasi saldo dan pengurangan saldo yang sudah teruji di superclass tanpa menduplikasi kode',
      'Memungkinkan class RekeningTabungan mengakses atribut private superclass secara ilegal',
      'Menjaga konsistensi data saldo di superclass jika kelak aturan dasar penarikan di RekeningBank diubah',
      'Wajib ditulis karena Java melarang penulisan operator aritmatika di dalam method subclass'
    ],
    correctAnswer: [0, 2],
    explanation: 'Menggunakan super.tarik(...) memanfaatkan logika validasi pengurangan saldo yang sudah ada di superclass (Code Reusability) dan mempermudah pemeliharaan (Maintainability) jika di masa depan ada perubahan logika dasar di RekeningBank.'
  },
  {
    id: 49,
    topic: TOPICS.STORY,
    difficulty: 'Sedang',
    type: 'single_choice',
    question: '[Studi Kasus IGD Rumah Sakit] Sebuah aplikasi IGD mengelola antrean pasien yang heterogen. Terdapat class dasar "Pasien", serta subclass "PasienDarurat" dan "PasienRawatJalan". Dokter ingin mendeteksi dan langsung memprioritaskan pasien darurat:\n\nKonsep PBO apa yang sedang diterapkan pada kode di bawah ini?',
    code: `List<Pasien> antrean = getDaftarPasien();
for (Pasien p : antrean) {
    if (p instanceof PasienDarurat pd) {
        pd.lakukanTindakanResusitasi();
    } else {
        p.panggilKePoli();
    }
}`,
    options: [
      'Encapsulation dengan hak akses package-private',
      'Upcasting implisit dalam koleksi yang dikombinasikan dengan Type Checking & Downcasting aman (Pattern Matching instanceof)',
      'Multiple Inheritance of Implementation',
      'Static Method Overloading Compile-Time'
    ],
    correctAnswer: 1,
    explanation: 'Daftar antrean menampung objek beragam melalui Upcasting (List<Pasien>). Di dalam perulangan, dilakukan pengecekan tipe menggunakan operator "instanceof" dan Downcasting yang aman ke tipe spesifik "PasienDarurat pd" (Pattern Matching Java 16+) untuk memanggil method khusus pasien darurat.'
  },
  {
    id: 50,
    topic: TOPICS.STORY,
    difficulty: 'Sulit',
    type: 'single_choice',
    question: '[Studi Kasus Smart Home] Anda diminta merancang sistem otomatisasi rumah dengan perangkat seperti: SmartLamp, SmartAC, SmartDoorLock, dan SmartTV. Sebagian perangkat bisa diatur suhunya (AC), sebagian bisa diatur kecerahannya (Lampu), sebagian bisa diatur volumenya (TV, Speaker), dan semuanya bisa tersambung WiFi.\n\nMengapa fitur-fitur seperti "BisaAturSuhu", "BisaAturVolume", dan "BisaAturKecerahan" lebih tepat dijadikan INTERFACE daripada method di superclass tunggal "SmartDevice"?',
    options: [
      'Karena interface otomatis membuat eksekusi program menjadi 10x lebih cepat dibanding class',
      'Untuk mencegah timbulnya "Fat Interface" / pelanggaran Interface Segregation Principle, di mana class seperti SmartDoorLock terpaksa memiliki method aturSuhu() atau aturVolume() yang tidak masuk akal baginya',
      'Karena di Java sebuah class tidak boleh memiliki lebih dari dua method',
      'Karena abstract class tidak mendukung tipe data numerik double dan int'
    ],
    correctAnswer: 1,
    explanation: 'Jika semua kemampuan ditaruh di superclass SmartDevice, maka SmartDoorLock akan mewarisi aturSuhu() dan aturVolume(), yang mana itu tidak masuk akal dan melanggar prinsip desain OOP (Interface Segregation Principle). Dengan membuat interface terpisah (DapatDiaturSuhu, DapatDiaturVolume), perangkat hanya mengimplementasikan kontrak yang memang menjadi kapabilitasnya.'
  },
  {
    id: 51,
    topic: TOPICS.STORY,
    difficulty: 'Sulit',
    type: 'single_choice',
    question: '[Studi Kasus Penggajian HRD] Perusahaan memiliki sistem penggajian. Dibuat abstract class "Karyawan" dengan method abstract "hitungGaji()". Subclass "KaryawanTetap" menghitung gaji dari (gajiPokok + bonus), sedangkan "KaryawanKontrak" dari (jamKerja * upahPerJam).\n\nPada class LayananPayroll, dibuat method:\n"public void bayarGaji(Karyawan k) { double total = k.hitungGaji(); transfer(total); }"\n\nMengapa arsitektur ini mematuhi Open-Closed Principle (OCP)?',
    options: [
      'Karena jika kelak ada jenis karyawan baru (misal: KaryawanFreelance), class LayananPayroll tidak perlu diubah sama sekali; cukup buat class baru yang mewarisi Karyawan',
      'Karena method bayarGaji() dideklarasikan dengan kata kunci final',
      'Karena KaryawanTetap tidak dapat mengakses atribut milik KaryawanKontrak',
      'Karena class Karyawan menggunakan modifier private pada semua method-nya'
    ],
    correctAnswer: 0,
    explanation: 'Open-Closed Principle (OCP) menyatakan: "Software entities should be open for extension, but closed for modification". Melalui Polimorfisme, method bayarGaji(Karyawan k) siap menerima subclass baru apa pun di masa depan (open for extension) tanpa perlu mengubah kode sumber class LayananPayroll yang sudah stabil (closed for modification).'
  },
  {
    id: 52,
    topic: TOPICS.STORY,
    difficulty: 'Sedang',
    type: 'single_choice',
    question: '[Studi Kasus Ekspedisi Logistik] Perusahaan logistik "CepatKirim" memiliki class hierarki: Superclass "KendaraanKirim" dan dua subclass yaitu "MotorKurir" serta "TrukKontainer". Seorang programmer junior menulis kode berikut:\n\nApakah yang terjadi saat program dijalankan pada Baris X?',
    code: `KendaraanKirim armada = new MotorKurir(); // Upcasting
TrukKontainer truk = (TrukKontainer) armada; // Baris X: Downcasting
truk.angkutKontainer();`,
    options: [
      'Program berjalan sukses dan mencetak informasi muatan kontainer',
      'Kompiler menolak dengan pesan "Incompatible types error"',
      'Program melempar "java.lang.ClassCastException" saat runtime karena objek aktual di memori heap adalah MotorKurir, bukan TrukKontainer',
      'Objek MotorKurir otomatis bermutasi menjadi TrukKontainer secara dinamis'
    ],
    correctAnswer: 2,
    explanation: 'Meskipun tipe referensi variabel armada adalah KendaraanKirim (sehingga lolos pemeriksaan tipe saat kompilasi), namun objek nyata di memori heap dibuat dengan new MotorKurir(). Objek MotorKurir tidak memiliki relasi turunan dengan TrukKontainer, sehingga saat runtime JVM melempar ClassCastException.'
  },
  {
    id: 53,
    topic: TOPICS.STORY,
    difficulty: 'Sedang',
    type: 'multiple_choice',
    question: '[Studi Kasus Toko Buku Digital] Toko buku online menjual 3 varian produk: "BukuCetak", "EBookPDF", dan "AudioBookMP3". Seluruh produk memiliki kesamaan (judul, harga, pengarang). Namun hanya EBookPDF dan AudioBookMP3 yang dapat di-download lewat link ("DapatDiunduh"), sedangkan BukuCetak membutuhkan berat paket dan kurir ("DapatDikirim").\n\nManakah 2 keputusan arsitektur OOP yang PALING TEPAT untuk kasus ini? (Pilih 2 jawaban)',
    options: [
      'Membuat superclass (atau abstract class) "ProdukBuku" untuk menampung field bersama (judul, harga, pengarang)',
      'Membuat interface "DapatDiunduh" dan "DapatDikirim" untuk memisahkan perilaku download dan pengiriman logistik',
      'Menjadikan DapatDiunduh sebagai final class konkrit agar tidak bisa diubah',
      'Memaksa BukuCetak mengimplementasikan DapatDiunduh dengan method kosong tanpa isi'
    ],
    correctAnswer: [0, 1],
    explanation: 'Desain OOP yang bersih: 1. Gunakan superclass (ProdukBuku) untuk mewariskan identitas state dasar (judul, harga, pengarang), dan 2. Gunakan Interface untuk memisahkan kapabilitas fungsional yang berbeda (DapatDiunduh vs DapatDikirim). Memaksa BukuCetak mengimplementasikan DapatDiunduh adalah pelanggaran fatal Interface Segregation Principle.'
  },
  {
    id: 54,
    topic: TOPICS.STORY,
    difficulty: 'Sedang',
    type: 'text_input',
    question: '[Studi Kasus Game RPG] Perhatikan pendefinisian konstruktor berantai (Constructor Chaining) di bawah ini:\n\nKetik kode satu baris yang WAJIB diisikan pada baris komentar "// Baris kosong" agar class Warrior dapat dikompilasi!',
    code: `class KarakterGame {
    String nama;
    int darah;

    KarakterGame(String nama, int darah) {
        this.nama = nama;
        this.darah = darah;
    }
}

class Warrior extends KarakterGame {
    int perisai;

    Warrior(String nama, int darah, int perisai) {
        // Baris kosong
        this.perisai = perisai;
    }
}`,
    placeholder: 'Ketik sintaks pemanggilan superclass...',
    correctAnswer: ['super(nama, darah);', 'super(nama,darah);', 'super(nama, darah)'],
    caseSensitive: false,
    explanation: 'Karena KarakterGame tidak memiliki default constructor (konstruktor tanpa parameter), maka konstruktor Warrior WAJIB memanggil konstruktor berparameter milik superclass-nya secara eksplisit pada baris pertama menggunakan "super(nama, darah);".'
  },
  {
    id: 55,
    topic: TOPICS.STORY,
    difficulty: 'Sulit',
    type: 'single_choice',
    question: '[Studi Kasus Streaming Musik] Aplikasi pemutar musik memiliki dua interface dengan default method: "PemutarAudio" dan "PengunduhMedia", yang keduanya memiliki method "default void sinkronisasi() { ... }". Class "SpotifyPlayer" mengimplementasikan kedua interface tersebut.\n\nBagaimanakah cara pengembang di class SpotifyPlayer menyelesaikan bentrokan nama (Diamond Problem) jika ia ingin menjalankan implementasi milik PemutarAudio?',
    options: [
      'SpotifyPlayer otomatis menjalankan milik PemutarAudio karena ditulis pertama pada klausa implements',
      'Di dalam method override sinkronisasi(), tulis sintaks: "PemutarAudio.super.sinkronisasi();"',
      'Gunakan kata kunci "super.PemutarAudio.sinkronisasi();"',
      'Tidak bisa diselesaikan; Java akan menolak kompilasi dan mewajibkan salah satu interface dihapus'
    ],
    correctAnswer: 1,
    explanation: 'Di Java 8+, jika terjadi konflik nama antar default method dari beberapa interface, subclass WAJIB meng-override method tersebut secara eksplisit. Untuk memanggil implementasi dari interface tertentu, sintaks resminya adalah: NamaInterface.super.namaMethod(); (contoh: PemutarAudio.super.sinkronisasi();).'
  },
  {
    id: 56,
    topic: TOPICS.STORY,
    difficulty: 'Sulit',
    type: 'text_input',
    question: '[Studi Kasus Minimarket VIP] Pada sistem kasir minimarket, programmer membuat diskon bertingkat. Berapakah angka diskon yang tercetak di layar monitor kasir?',
    code: `class KasirReguler {
    int diskon = 5; // 5 persen
}

class KasirVIP extends KasirReguler {
    int diskon = 25; // 25 persen
}

public class TransaksiKasir {
    public static void main(String[] args) {
        KasirReguler k = new KasirVIP(); // Upcasting
        System.out.print(k.diskon);
    }
}`,
    placeholder: 'Ketik hasil angka persis...',
    correctAnswer: ['5'],
    caseSensitive: false,
    explanation: 'PENTING UNTUK UJIAN: Di Java, FIELD/VARIABEL TIDAK BERSIFAT POLIMORFIK (Variable Hiding). Akses variabel ditentukan oleh TIPE REFERENSI pada waktu kompilasi (tipe KasirReguler), bukan objek nyata di heap. Karena referensi k bertipe KasirReguler, maka k.diskon mencetak nilai 5 (bukan 25)!'
  },
  {
    id: 57,
    topic: TOPICS.STORY,
    difficulty: 'Sedang',
    type: 'text_input',
    question: '[Studi Kasus Ojek Online] Layanan transportasi online "GowesKilat" memiliki abstract class Layanan dengan method abstract hitungTarif(int km). Pada subclass OjekMotor, perhitungannya adalah tarif dasar Rp 7.000 ditambah Rp 3.000 per km.\n\nBerapakah angka tarif yang dihasilkan jika seorang penumpang memesan perjalanan sejauh 4 km?',
    code: `abstract class Layanan {
    abstract int hitungTarif(int km);
}

class OjekMotor extends Layanan {
    int hitungTarif(int km) {
        return 7000 + (km * 3000);
    }
}

public class Main {
    public static void main(String[] args) {
        Layanan o = new OjekMotor();
        System.out.print(o.hitungTarif(4));
    }
}`,
    placeholder: 'Ketik nominal angka...',
    correctAnswer: ['19000'],
    caseSensitive: false,
    explanation: 'Perhitungan tarif: 7000 + (4 * 3000) = 7000 + 12000 = 19000. Program mencetak 19000.'
  },
  {
    id: 58,
    topic: TOPICS.STORY,
    difficulty: 'Mudah',
    type: 'text_input',
    question: '[Studi Kasus Keamanan Finansial] Bank Central membuat class "GeneratorTokenOTP" yang berisi algoritma enkripsi rahasia pembuatan PIN 6 digit. Arsitek sistem ingin memastikan bahwa TIDAK ADA programmer mana pun yang dapat membuat subclass (mewarisi) dari kelas ini demi mencegah pembajakan kode.\n\nKata kunci (keyword) Java apa yang harus disematkan pada deklarasi class GeneratorTokenOTP?',
    placeholder: 'Ketik kata kunci...',
    correctAnswer: ['final'],
    caseSensitive: false,
    explanation: 'Keyword "final" pada class (contoh: public final class GeneratorTokenOTP) secara mutlak melarang class tersebut untuk dijadikan superclass oleh kelas manapun (cannot be extended).'
  },
  {
    id: 59,
    topic: TOPICS.STORY,
    difficulty: 'Mudah',
    type: 'single_choice',
    question: '[Studi Kasus Fitur Media Sosial] Pada aplikasi sosial media, sebuah postingan bertipe "VideoReels" dapat diberi suka oleh pengguna (Likeable), dapat diberi komentar teks (Commentable), dan dapat diteruskan ke obrolan teman (Shareable).\n\nManakah penulisan baris deklarasi class yang BENAR dan valid di Java?',
    options: [
      'public class VideoReels extends Likeable, Commentable, Shareable',
      'public class VideoReels implements Likeable, Commentable, Shareable',
      'public class VideoReels inherits Likeable & Commentable & Shareable',
      'public class VideoReels implements Likeable implements Commentable implements Shareable'
    ],
    correctAnswer: 1,
    explanation: 'Di Java, implementasi multi-interface dituliskan dengan keyword tunggal "implements" diikuti daftar antarmuka yang dipisahkan oleh tanda koma: "public class VideoReels implements Likeable, Commentable, Shareable".'
  },
  {
    id: 60,
    topic: TOPICS.STORY,
    difficulty: 'Sedang',
    type: 'multiple_choice',
    question: '[Studi Kasus Sistem Akademik Kampus] Di universitas, terdapat class Mahasiswa, Dosen, dan TenagaKependidikan yang semuanya meng-extends superclass "CivitasAkademika". Dalam sistem cetak kartu tanda pengenal kampus (KTM/Kapeg), tim IT menyimpan seluruh anggota dalam satu koleksi "List<CivitasAkademika> dataCivitas".\n\nManakah 2 keuntungan utama penggunaan koleksi polimorfik ini dibanding membuat 3 list terpisah? (Pilih 2 jawaban)',
    options: [
      'Sistem dapat memproses iterasi cetak kartu secara seragam melalui satu perulangan loop for (CivitasAkademika c : dataCivitas)',
      'Memudahkan penambahan civitas baru di masa depan (misal: PenelitiTamu) tanpa perlu merombak struktur data antrean cetak',
      'Otomatis menghapus kebutuhan database relasional karena Java langsung menyimpan objek di RAM secara permanen',
      'Memungkinkan Mahasiswa memanggil method rahasia gaji milik Dosen tanpa izin'
    ],
    correctAnswer: [0, 1],
    explanation: 'Koleksi Polimorfik (Polymorphic Collections) memberikan keuntungan: 1. Kode pemrosesan seragam dan ringkas (cukup satu loop untuk semua objek turunan), dan 2. Skalabilitas tinggi (Extensibility) saat entitas baru ditambahkan ke sistem kampus.'
  },
  {
    id: 61,
    topic: TOPICS.STORY,
    difficulty: 'Sulit',
    type: 'single_choice',
    question: '[Studi Kasus Restoran Cepat Saji] Sebuah dapur restoran waralaba menstandardisasi cara membuat burger. Dibuat abstract class "PembuatBurger":\n\nDesign Pattern (Pola Desain Berorientasi Objek) apakah yang diterapkan pada arsitektur pembuatan burger ini?',
    code: `abstract class PembuatBurger {
    // Template method mendikte alur algoritma:
    public final void buatBurger() {
        panggangRoti();
        tambahDaging(); // Bervariasi di subclass
        tambahSaus();
        bungkusKemasan();
    }

    void panggangRoti() { System.out.println("Panggang roti wijen"); }
    abstract void tambahDaging(); // Wajib diisi subclass
    void tambahSaus() { System.out.println("Beri saus tomat & mayones"); }
    void bungkusKemasan() { System.out.println("Bungkus kertas foil"); }
}`,
    options: [
      'Singleton Pattern',
      'Template Method Pattern',
      'Observer Pattern',
      'Decorator Pattern'
    ],
    correctAnswer: 1,
    explanation: 'Ini adalah pola desain "Template Method Pattern". Sebuah method konkrit (seringkali final) di abstract class menentukan kerangka algoritma langkah demi langkah, sementara langkah spesifik tertentu didelegasikan sebagai abstract method (tambahDaging()) untuk diimplementasikan oleh subclass konkrit (misal: BurgerSapi, BurgerAyam).'
  },
  {
    id: 62,
    topic: TOPICS.STORY,
    difficulty: 'Sedang',
    type: 'single_choice',
    question: '[Studi Kasus Evolusi API Perpustakaan] Perpustakaan Daerah memiliki sistem lama dengan interface "LayananKatalog" yang sudah diimplementasikan oleh 50 class cabang perpustakaan berbeda di seluruh kota. Di versi terbaru, tim pusat ingin menambahkan method baru "void unduhBukuDigital(String idBuku)".\n\nBagaimana cara terbaik agar penambahan method ini TIDAK MERUSAK (tidak menyebabkan compiler error) pada 50 class cabang lama yang belum siap mengimplementasikan method tersebut?',
    options: [
      'Mendeklarasikan method tersebut sebagai abstract method biasa',
      'Mendeklarasikan method tersebut sebagai "default method" dengan implementasi default pada interface LayananKatalog',
      'Menghapus interface LayananKatalog dan menggantinya dengan class biasa',
      'Mengubah hak akses method menjadi private abstract'
    ],
    correctAnswer: 1,
    explanation: 'Default Method (diperkenalkan pada Java 8) diciptakan khusus untuk menjawab tantangan "Interface Evolution" (pengembangan antarmuka tanpa merusak kode lama). Dengan menyematkan keyword default dan body default, seluruh class yang telah mengimplementasikan interface tersebut tetap valid tanpa wajib meng-override method baru tersebut.'
  },
  {
    id: 63,
    topic: TOPICS.STORY,
    difficulty: 'Sedang',
    type: 'single_choice',
    question: '[Studi Kasus Sensor Lingkungan IoT] Laboratorium cuaca merancang class dasar "SensorCuaca". Setiap sensor memiliki: idSensor (String), nilaiSuhu (double yang selalu berubah saat pembacaan), dan konstruktor untuk mencatat tanggal kalibrasi awal.\n\nMengapa perancang sistem memilih "Abstract Class" dan BUKAN "Interface" sebagai basis dari SensorCuaca?',
    options: [
      'Karena interface di Java tidak mendukung pembacaan perangkat keras (hardware)',
      'Karena SensorCuaca membutuhkan atribut instansi non-static & non-final (nilaiSuhu yang dapat berubah) serta konstruktor berparameter, di mana Interface di Java tidak dapat memiliki konstruktor maupun instance variables non-final',
      'Karena abstract class lebih cepat di-compile oleh JVM dibanding interface',
      'Karena interface hanya boleh digunakan pada aplikasi berbasis web'
    ],
    correctAnswer: 1,
    explanation: 'Alasan teknis mendasar: Interface di Java HANYA mengizinkan konstanta (public static final) dan TIDAK BISA memiliki konstruktor maupun variabel instansi (non-static non-final state). Karena Sensor membutuhkan penyimpanan status nyata (state) dan inisialisasi konstruktor kalibrasi, maka Abstract Class adalah satu-satunya pilihan yang tepat.'
  },
  {
    id: 64,
    topic: TOPICS.STORY,
    difficulty: 'Sedang',
    type: 'text_input',
    question: '[Studi Kasus Suara Hewan Peternakan] Di sebuah game simulasi peternakan, peternak membunyikan lonceng pagi hari. Tebak output suara yang dihasilkan secara berurutan sesuai susunan array!',
    code: `class Ternak {
    void panggil() { System.out.print("Suara "); }
}
class Sapi extends Ternak {
    void panggil() { System.out.print("Mooo "); }
}
class Ayam extends Ternak {
    void panggil() { System.out.print("Kukuruyuk "); }
}
class Kambing extends Ternak {
    void panggil() { System.out.print("Mbee "); }
}

public class PeternakanGame {
    public static void main(String[] args) {
        Ternak[] kandang = { new Sapi(), new Ayam(), new Kambing() };
        for (Ternak t : kandang) {
            t.panggil();
        }
    }
}`,
    placeholder: 'Ketik output konsol persis...',
    correctAnswer: ['Mooo Kukuruyuk Mbee ', 'Mooo Kukuruyuk Mbee'],
    caseSensitive: false,
    explanation: 'Urutan eksekusi objek nyata pada array: 1. new Sapi() -> "Mooo ", 2. new Ayam() -> "Kukuruyuk ", 3. new Kambing() -> "Mbee ". Output akhir: "Mooo Kukuruyuk Mbee ".'
  },
  {
    id: 65,
    topic: TOPICS.STORY,
    difficulty: 'Sulit',
    type: 'single_choice',
    question: '[Studi Kasus Ujian Praktikum Dosen] Dalam ujian PBO, dosen memberikan class dasar:\n"public class Kendaraan { protected void nyalakanMesin() { ... } }"\n\nSeorang mahasiswa membuat subclass Mobil dan menulis:\n"public class Mobil extends Kendaraan { @Override public void nyalakanMesin() { ... } }"\n\nDosen menguji apakah kode mahasiswa tersebut sah (valid) menurut aturan Method Overriding Java. Manakah evaluasi yang BENAR?',
    options: [
      'Error kompilasi, karena modifier visibilitas method overriding harus sama persis tidak boleh diganti',
      'Valid (Legal), karena di Java diperbolehkan MEMPERLUAS hak akses saat meng-override method (dari protected menjadi public); yang dilarang adalah mempersempit/memperketat visibilitas',
      'Error saat runtime, karena method public tidak dapat mengakses superclass protected',
      'Hanya valid jika ditambahkan kata kunci abstract di depan class Mobil'
    ],
    correctAnswer: 1,
    explanation: 'Aturan resmi Method Overriding di Java: visibilitas method pada subclass TIDAK BOLEH lebih ketat daripada superclass, tetapi DIPERBOLEHKAN lebih longgar (memperluas hak akses). Urutan dari paling ketat ke longgar: private -> default -> protected -> public. Dari protected diperluas menjadi public adalah 100% LEGAL dan sering diuji dosen dalam ujian!'
  },
  // ==========================================
  // TOPIC: LMS TELKOM UNIVERSITY EXAM SPECIAL (SOAL 66 - 80)
  // Diambil dari Pola Soal Kuis LMS, Pra-Assessment & Tes Awal Praktikum
  // ==========================================
  {
    id: 66,
    topic: TOPICS.INHERITANCE,
    difficulty: 'Sedang',
    type: 'single_choice',
    question: '[Soal LMS: Multiple Inheritance] Dalam bahasa pemrograman Java, dimungkinkan terjadinya multiple inheritance pada saat pewarisan (extends), sementara pada saat implements dari interface tidak dimungkinkan terjadinya multiple inherit. Apakah pernyataan tersebut Benar (True) atau Salah (False)?',
    options: [
      'True (Benar)',
      'False (Salah)'
    ],
    correctAnswer: 1,
    explanation: 'SALAH (False)! Di Java justru sebaliknya: pada pewarisan kelas (extends) TIDAK DIMUNGKINKAN multiple inheritance (hanya single class inheritance untuk mencegah Diamond Problem). Sedangkan pada implements dari interface, DIMUNGKINKAN mengimplementasikan banyak interface sekaligus (multiple implementation).'
  },
  {
    id: 67,
    topic: TOPICS.INTERFACE,
    difficulty: 'Mudah',
    type: 'single_choice',
    question: '[Soal LMS: Hierarki Interface] Dikarenakan interfaces tidak termasuk dalam hierarki pewarisan kelas tunggal (single inheritance), sebuah atau beberapa class yang tidak terkait secara hierarki memungkinkan untuk sama-sama meng-implements interface tersebut. Apakah pernyataan ini Benar (True) atau Salah (False)?',
    options: [
      'True (Benar)',
      'False (Salah)'
    ],
    correctAnswer: 0,
    explanation: 'BENAR (True). Interface mewakili kemampuan/protokol (CAN-DO). Kelas yang sama sekali tidak berkerabat (misal Robot, Burung, dan Pesawat) dapat sama-sama mengimplementasikan interface yang sama, misalnya interface BisaTerbang.'
  },
  {
    id: 68,
    topic: TOPICS.INTERFACE,
    difficulty: 'Sedang',
    type: 'single_choice',
    question: '[Soal LMS: Dynamic Resolution] Interfaces di-design untuk men-support dynamic method resolution saat run time. Apakah pernyataan ini Benar (True) atau Salah (False)?',
    options: [
      'True (Benar)',
      'False (Salah)'
    ],
    correctAnswer: 0,
    explanation: 'BENAR (True). Melalui referensi tipe interface, JVM dapat melakukan resolusi metode secara dinamis saat runtime (Late Binding / Dynamic Method Dispatch) sesuai dengan objek aktual yang mengimplementasikannya.'
  },
  {
    id: 69,
    topic: TOPICS.POLYMORPHISM,
    difficulty: 'Mudah',
    type: 'single_choice',
    question: '[Soal LMS: Konsep Overloading] Overloading memungkinkan tujuan method yang sama (diwakili oleh nama method yang sama), walaupun memiliki body method (algoritma internal) dan parameter yang berbeda. Apakah pernyataan ini Benar (True) atau Salah (False)?',
    options: [
      'True (Benar)',
      'False (Salah)'
    ],
    correctAnswer: 0,
    explanation: 'BENAR (True). Method overloading memungkinkan fungsi-fungsi yang tujuannya serupa menggunakan satu nama yang sama (misal: hitungLuas untuk persegi vs lingkaran), dengan variasi parameter dan algoritma tubuh method yang berbeda.'
  },
  {
    id: 70,
    topic: TOPICS.INTERFACE,
    difficulty: 'Mudah',
    type: 'single_choice',
    question: '[Soal LMS: Notasi UML Interface] Bagaimanakah penulisan simbol interface pada UML Class Diagram?',
    options: [
      'Digambarkan sama seperti class biasa, namun wajib diberi stereotip <<interface>> di atas nama antarmuka',
      'Digambarkan berbentuk lingkaran penuh tanpa nama',
      'Hanya boleh dituliskan dalam bentuk panah tebal tanpa kotak',
      'Digambarkan dengan kotak segitiga terbalik'
    ],
    correctAnswer: 0,
    explanation: 'BENAR. Standar UML menyatakan bahwa interface digambarkan dalam kotak persegi panjang seperti class biasa, namun di atas nama interface dicantumkan keyword atau stereotip <<interface>>.'
  },
  {
    id: 71,
    topic: TOPICS.ABSTRACT_CLASS,
    difficulty: 'Mudah',
    type: 'single_choice',
    question: '[Soal LMS: Notasi UML Abstract Class] Bagaimana cara penulisan nama abstract class pada sebuah UML Class Diagram?',
    options: [
      'Nama kelas dituliskan dengan gaya huruf miring (italic) atau diberi stereotip <<abstract>>',
      'Nama kelas wajib ditulis menggunakan huruf kecil semua',
      'Nama kelas ditulis dengan garis coret horizontal di tengahnya',
      'Nama kelas diarsir menggunakan warna merah'
    ],
    correctAnswer: 0,
    explanation: 'BENAR. Sesuai standar notasi UML 2.5, nama Abstract Class (dan abstract method) ditulis menggunakan gaya huruf miring (italic), atau jika ditulis tangan dapat ditambahkan stereotip <<abstract>> di atas namanya.'
  },
  {
    id: 72,
    topic: TOPICS.INTERFACE,
    difficulty: 'Sedang',
    type: 'single_choice',
    question: '[Soal LMS: Simbol Relasi Interface] Apakah simbol relasi antarmuka (Realization) pada UML Class Diagram saat sebuah class meng-implements interface?',
    options: [
      'Garis putus-putus dengan ujung panah segitiga hampa (putih) yang menunjuk ke interface (- - -▷)',
      'Garis lurus padat dengan segitiga hampa (───▷)',
      'Garis dengan belah ketupat hitam pekat (◆───)',
      'Garis gelombang tanpa tanda panah'
    ],
    correctAnswer: 0,
    explanation: 'BENAR. Simbol relasi Realization (implements interface) digambarkan dengan garis putus-putus berujung segitiga hampa (- - -▷) mengarah ke Interface. Sedangkan garis padat (───▷) digunakan untuk pewarisan class (Inheritance/Generalization).'
  },
  {
    id: 73,
    topic: TOPICS.ABSTRACT_CLASS,
    difficulty: 'Sedang',
    type: 'single_choice',
    question: '[Soal LMS: Konstruktor Abstract Class] Apakah sebuah Abstract Class diperbolehkan memiliki konstruktor?',
    options: [
      'Boleh, konstruktor pada abstract class dapat dituliskan untuk inisialisasi atribut saat dipanggil oleh subclass via super(), meskipun abstract class tidak dapat diinstansiasi langsung',
      'Tidak boleh sama sekali, karena abstract class tidak dapat dibentuk objeknya maka dilarang membuat konstruktor',
      'Hanya boleh jika semua method di dalamnya sudah berupa method konkret',
      'Hanya boleh konstruktor private tanpa parameter'
    ],
    correctAnswer: 0,
    explanation: 'BENAR. Ini salah satu soal jebakan paling sering di LMS! Meskipun abstract class tidak bisa diinstansiasi dengan new AbstractClass(), ia TETAP BISA dan BIASA memiliki konstruktor untuk menginisialisasi atribut induk saat dipanggil oleh konstruktor subclass melalui perintah super().'
  },
  {
    id: 74,
    topic: TOPICS.INTERFACE,
    difficulty: 'Mudah',
    type: 'single_choice',
    question: '[Soal LMS: Karakteristik Atribut Interface] Bagaimanakah status modifier seluruh atribut variabel yang dideklarasikan di dalam sebuah Interface?',
    options: [
      'Semua atribut secara implisit berstatus public, static, dan final (bertindak sebagai konstanta)',
      'Semua atribut secara implisit berstatus private dan non-static',
      'Semua atribut berstatus protected agar bisa diubah subclass',
      'Atribut di interface bebas diubah nilainya kapan saja'
    ],
    correctAnswer: 0,
    explanation: 'BENAR. Di dalam interface, setiap variabel secara otomatis berstatus public static final (konstanta murni). Nilainya wajib diisi saat deklarasi dan bersifat immutable (tidak bisa diubah nilainya).'
  },
  {
    id: 75,
    topic: TOPICS.POLYMORPHISM,
    difficulty: 'Mudah',
    type: 'single_choice',
    question: '[Soal LMS Praktikum 8: Karakteristik Overloading] Pernyataan berikut mengenai method overloading adalah tepat, KECUALI...',
    options: [
      'Method overloading berada dalam kelas yang berbeda (antar superclass dan subclass tanpa hierarki)',
      'Method overloading berada dalam kelas yang sama',
      'Method overloading dapat terjadi pada constructor (Constructor Overloading)',
      'Tipe data pada parameter masukan method overloading haruslah berbeda'
    ],
    correctAnswer: 0,
    explanation: 'BENAR. Pilihan (A) adalah pernyataan yang SALAH/KECUALI, karena hakikat utama method overloading adalah mendefinisikan beberapa method dengan nama yang sama di dalam KELAS YANG SAMA. Jika di kelas yang berbeda dengan signature sama persis, itu adalah Overriding, bukan Overloading.'
  },
  {
    id: 76,
    topic: TOPICS.ABSTRACT_CLASS,
    difficulty: 'Mudah',
    type: 'single_choice',
    question: '[Soal LMS: Karakteristik Method Abstract] Manakah pernyataan yang BENAR mengenai method abstract di Java?',
    options: [
      'Method abstract tidak memiliki tubuh method (body) dan wajib di-override oleh subclass pertama yang konkret',
      'Method abstract harus selalu memiliki kurung kurawal buka tutup { } meskipun kosong',
      'Method abstract boleh berstatus private dan final secara bersamaan',
      'Method abstract otomatis menghasilkan nilai null saat dipanggil'
    ],
    correctAnswer: 0,
    explanation: 'BENAR. Method abstract hanya berisi deklarasi signature diakhiri titik koma (;) tanpa tubuh method {}. Subclass konkret pertama yang mewarisinya wajib meng-override method tersebut.'
  },
  {
    id: 77,
    topic: TOPICS.INHERITANCE,
    difficulty: 'Sedang',
    type: 'single_choice',
    question: '[Soal LMS: Istilah Pewarisan] Class yang sudah ada dan menjadi sumber pewarisan disebut dengan istilah class turunan/sub class, dan class yang mewarisi disebut dengan super class. Apakah pernyataan ini Benar (True) atau Salah (False)?',
    options: [
      'True (Benar)',
      'False (Salah)'
    ],
    correctAnswer: 1,
    explanation: 'SALAH (False)! Definisi tersebut terbalik. Class yang sudah ada dan diwarisi disebut Superclass (Kelas Induk/Parent/Base class). Sedangkan class yang mewarisi disebut Subclass (Kelas Anak/Turunan/Derived class).'
  },
  {
    id: 78,
    topic: TOPICS.POLYMORPHISM,
    difficulty: 'Sedang',
    type: 'single_choice',
    question: `[Soal LMS: Resolusi Tipe Overloading] Perhatikan potongan kode berikut:
class Operasi {
    void hitung(int a) { System.out.print("int "); }
    void hitung(double a) { System.out.print("double "); }
}
Jika dipanggil: new Operasi().hitung(10.5); maka method dengan tipe parameter apakah yang dieksekusi?`,
    options: [
      'double',
      'int',
      'float',
      'Error kompilasi'
    ],
    correctAnswer: 0,
    explanation: 'BENAR (double). Nilai literal 10.5 bertipe dasar double, sehingga kompiler Java langsung mencocokkannya ke method hitung(double a).'
  },
  {
    id: 79,
    topic: TOPICS.INTERFACE,
    difficulty: 'Sedang',
    type: 'single_choice',
    question: '[Soal LMS: Konstruktor Interface] Pada interface, apakah deklarasi konstruktor diperbolehkan?',
    options: [
      'Tidak diperbolehkan, deklarasi konstruktor di dalam interface akan menyebabkan Compile Error',
      'Boleh, selama berstatus public dan tanpa argumen',
      'Boleh, jika interface memiliki default method',
      'Wajib dibuatkan konstruktor default oleh programmer'
    ],
    correctAnswer: 0,
    explanation: 'BENAR. Di dalam interface, deklarasi konstruktor dilarang keras 100% dan akan memicu error kompilasi: "Interfaces cannot have constructors". Karena interface murni tidak memiliki state instansi yang perlu diinisialisasi.'
  },
  {
    id: 80,
    topic: TOPICS.STORY,
    difficulty: 'Sedang',
    type: 'single_choice',
    question: `[Soal LMS: Multiplicity Relasi] Berdasarkan soal cerita:
"Sebuah Jurusan memiliki banyak Mahasiswa (1..*). Jika Jurusan dibubarkan, mahasiswa tetap ada dan dapat dipindahkan ke jurusan lain."
Manakah jenis relasi UML dan bentuk simbol yang TEPAT?`,
    options: [
      'Relasi Agregasi (Aggregation) dengan simbol belah ketupat putih hampa (◇) menempel pada kelas Jurusan',
      'Relasi Komposisi (Composition) dengan simbol belah ketupat hitam penuh (◆) menempel pada Mahasiswa',
      'Relasi Pewarisan (Generalization) dengan segitiga putih hampa (▷) menempel pada Jurusan',
      'Relasi Realization dengan panah putus-putus'
    ],
    correctAnswer: 0,
    explanation: 'BENAR! Karena objek Mahasiswa tetap dapat berdiri sendiri meskipun Jurusan dibubarkan (kepemilikan longgar), maka relasi yang tepat adalah Agregasi (Aggregation) dengan simbol belah ketupat putih hampa (◇) yang menempel pada kelas pemilik (Jurusan).'
  },

  // ==========================================
  // TOPIC: LMS MATCHING DROPDOWN QUESTIONS (81 - 85)
  // ==========================================
  {
    id: 81,
    topic: TOPICS.INHERITANCE,
    difficulty: 'Sedang',
    type: 'matching',
    question: '[Soal LMS Dropdown] Pasangkan konsep dan mekanisme pewarisan (Inheritance) pada Java berikut dengan kata kunci atau definisinya yang tepat:',
    subQuestions: [
      'Kata kunci yang digunakan oleh subclass untuk mewarisi superclass non-final',
      'Kata kunci untuk memanggil konstruktor atau method milik superclass langsung',
      'Kata kunci pada class agar class tersebut tidak dapat diwariskan ke subclass lain',
      'Modifier hak akses yang mengizinkan akses ke anggota class hanya bagi subclass dan package yang sama'
    ],
    options: [
      'extends',
      'super',
      'final',
      'protected'
    ],
    correctAnswer: [0, 1, 2, 3],
    explanation: 'extends digunakan untuk inheritance class. super merujuk ke superclass. final mencegah class diwariskan. protected memberikan akses kepada package yang sama dan seluruh subclass.'
  },
  {
    id: 82,
    topic: TOPICS.POLYMORPHISM,
    difficulty: 'Sedang',
    type: 'matching',
    question: '[Soal LMS Dropdown] Pasangkan konsep Polimorfisme pada Java berikut dengan karakteristik atau istilah teknis yang sesuai:',
    subQuestions: [
      'Method Overriding yang perilakunya ditentukan saat aplikasi berjalan',
      'Method Overloading dengan nama method sama tetapi beda parameter di satu class',
      'Konversi tipe objek secara eksplisit dari tipe superclass ke tipe subclass',
      'Operator untuk mengecek apakah suatu objek merupakan instance dari class tertentu'
    ],
    options: [
      'Runtime Polymorphism (Dynamic Method Dispatch)',
      'Compile-time Polymorphism (Static Binding)',
      'Downcasting',
      'instanceof'
    ],
    correctAnswer: [0, 1, 2, 3],
    explanation: 'Method Overriding diselesaikan saat runtime (Dynamic Dispatch). Method Overloading diselesaikan saat compile-time. Downcasting mengonversi superclass ke subclass. Operator instanceof mengecek tipe objek saat runtime.'
  },
  {
    id: 83,
    topic: TOPICS.ABSTRACT_CLASS,
    difficulty: 'Sedang',
    type: 'matching',
    question: '[Soal LMS Dropdown] Pasangkan aturan dan fitur Abstract Class pada Java berikut ini:',
    subQuestions: [
      'Method yang hanya berupa signature tanpa body kurung kurawal dan wajib di-override',
      'Apakah abstract class di Java boleh memiliki konstruktor?',
      'Apakah abstract class dapat diinstansiasi langsung menggunakan keyword new?',
      'Kombinasi keyword method yang dilarang karena bertentangan dengan konsep overriding'
    ],
    options: [
      'abstract method',
      'Ya, memiliki konstruktor untuk dipanggil subclass via super()',
      'Tidak bisa, akan menghasilkan Compile Error',
      'abstract final atau abstract static'
    ],
    correctAnswer: [0, 1, 2, 3],
    explanation: 'Abstract method tidak memiliki implementasi (body). Abstract class boleh memiliki konstruktor untuk inisialisasi superclass. Abstract class tidak bisa diinstansiasi langsung via new. Kombinasi abstract final atau abstract static ilegal di Java.'
  },
  {
    id: 84,
    topic: TOPICS.INTERFACE,
    difficulty: 'Sedang',
    type: 'matching',
    question: '[Soal LMS Dropdown] Pasangkan elemen dan fitur Interface Java 8+ berikut dengan karakteristiknya:',
    subQuestions: [
      'Semua atribut/variabel yang dideklarasikan di dalam Interface',
      'Method ber-body di interface yang menyediakan implementasi bawaan sejak Java 8',
      'Method ber-body di interface yang dipanggil langsung lewat nama interface',
      'Kata kunci yang digunakan sebuah concrete class untuk menerapkan kontrak interface'
    ],
    options: [
      'Secara implisit bernilai public static final',
      'default method',
      'static method',
      'implements'
    ],
    correctAnswer: [0, 1, 2, 3],
    explanation: 'Atribut interface otomatis public static final. default method di Java 8 mengizinkan body implementasi default. static method dipanggil melalui NamaInterface.method(). implements menghubungkan class konkrit ke interface.'
  },
  {
    id: 85,
    topic: TOPICS.STORY,
    difficulty: 'Sulit',
    type: 'matching',
    question: '[Soal LMS Dropdown] Dalam sistem perbankan OOP, pasangkan perancangan arsitektur berikut dengan konsep PBO yang tepat:',
    subQuestions: [
      'Class dasar Rekening tidak boleh diinstansiasi, hanya RekeningTabungan atau RekeningGiro yang bisa',
      'Method hitungBunga() berperilaku berbeda sesuai jenis rekening aktual saat dipanggil',
      'Atribut saldo berstatus private dan hanya dapat dimutasi melalui method setor() dan tarik()',
      'Standar kontrak PembayaranTagihan yang dapat diimplementasikan oleh beragam vendor fintech'
    ],
    options: [
      'Abstract Class',
      'Polymorphism (Dynamic Dispatch)',
      'Encapsulation (Enkapsulasi)',
      'Interface'
    ],
    correctAnswer: [0, 1, 2, 3],
    explanation: 'Rekening adalah Abstract Class. Perbedaan hitungBunga() saat runtime adalah Polimorfisme. Proteksi saldo via getter/setter/method transaksi adalah Enkapsulasi. Standarisasi kemampuan transaksi adalah Interface.'
  },

  // ==========================================
  // TOPIC: SOAL BERGAMBAR (VISUAL DIAGRAM & OCR) (86 - 90)
  // ==========================================
  {
    id: 86,
    topic: TOPICS.POLYMORPHISM,
    difficulty: 'Sedang',
    type: 'single_choice',
    question: '[Soal Gambar LMS] Perhatikan diagram hierarki class Hewan pada gambar di bawah ini. Jika sebuah program Java mengeksekusi kode: Hewan h = new Kucing(); h.bersuara(); apa output yang akan dicetak pada layar?',
    diagram: 'uml_polymorphism_hierarchy',
    options: [
      'Meong!',
      'Guk guk!',
      'Suara Hewan',
      'Compile Error: Hewan tidak memiliki method bersuara()'
    ],
    correctAnswer: 0,
    explanation: 'Berdasarkan prinsip Runtime Polymorphism (Dynamic Method Dispatch), meskipun tipe referensinya adalah superclass Hewan, method yang dieksekusi adalah implementasi dari objek aktual saat runtime yaitu Kucing, sehingga mencetak "Meong!".'
  },
  {
    id: 87,
    topic: TOPICS.INTERFACE,
    difficulty: 'Mudah',
    type: 'single_choice',
    question: '[Soal Gambar LMS] Perhatikan diagram relasi UML pada gambar. Garis putus-putus dengan kepala panah segitiga berongga yang menghubungkan class TransferBank ke interface Pembayaran melambangkan relasi...',
    diagram: 'uml_interface_realization',
    options: [
      'Realization (Class mengimplementasikan Interface menggunakan keyword implements)',
      'Generalization (Pewarisan antar-class menggunakan keyword extends)',
      'Komposisi kuat (Part-of)',
      'Agregasi lemah (Has-a)'
    ],
    correctAnswer: 0,
    explanation: 'Dalam standar UML, garis putus-putus dengan segitiga tertutup berongga (dashed line with hollow triangle) merepresentasikan relasi Realization / Implementation (keyword "implements" di Java).'
  },
  {
    id: 88,
    topic: TOPICS.INHERITANCE,
    difficulty: 'Sedang',
    type: 'single_choice',
    question: '[Soal Gambar LMS] Perhatikan perbandingan diagram relasi UML Komposisi vs Agregasi pada gambar. Manakah pernyataan yang BENAR mengenai perbedaan siklus hidup (lifecycle) kedua relasi tersebut?',
    diagram: 'uml_composition_aggregation',
    options: [
      'Pada Komposisi (Mobil-Mesin), siklus hidup Mesin terikat erat dengan Mobil; sedangkan pada Agregasi (Jurusan-Mahasiswa), Mahasiswa tetap eksis meskipun Jurusan dibubarkan.',
      'Pada Komposisi, objek bagian dapat berdiri sendiri tanpa pemiliknya.',
      'Simbol belah ketupat hitam penuh (filled diamond) melambangkan Agregasi.',
      'Simbol belah ketupat putih berongga (hollow diamond) melambangkan pewarisan extends.'
    ],
    correctAnswer: 0,
    explanation: 'Komposisi ditandai dengan filled diamond (◆) yang menunjukkan keterikatan siklus hidup yang kuat (part-of). Agregasi ditandai dengan hollow diamond (◇) yang menunjukkan hubungan has-a yang lebih longgar di mana objek anggota tetap eksis mandiri.'
  },
  {
    id: 89,
    topic: TOPICS.POLYMORPHISM,
    difficulty: 'Sedang',
    type: 'single_choice',
    question: '[Soal Gambar LMS] Perhatikan diagram representasi alokasi memori Stack dan Heap pada gambar. Ketika baris kode "Hewan h = new Kucing();" dijalankan, di manakah objek aktual Kucing beserta tabel method-nya dialokasikan?',
    diagram: 'polymorphism_memory',
    options: [
      'Di memori Heap (Actual Object dialokasikan di Heap, sedangkan referensi pointer h berada di Stack)',
      'Seluruh objek Kucing dan variabelnya disimpan di memori Stack',
      'Objek dialokasikan di Permanent Generation / Metaspace secara permanen',
      'Di memori register CPU'
    ],
    correctAnswer: 0,
    explanation: 'Di dalam arsitektur JVM, semua objek hasil instansiasi dengan operator "new" dialokasikan di memori Heap. Variabel lokal "h" yang bertipe referensi Hewan hanya menyimpan alamat memori (pointer) di dalam frame Stack.'
  },
  {
    id: 90,
    topic: TOPICS.INTERFACE,
    difficulty: 'Sedang',
    type: 'single_choice',
    question: '[Soal Gambar LMS] Perhatikan diagram konflik interface (Diamond Problem) pada gambar. Jika Class C mengimplementasikan interface A dan B yang keduanya memiliki default method yang sama "default void halo()", bagaimana cara menyelesaikan error kompilasi di Java?',
    diagram: 'uml_diamond_problem',
    options: [
      'Class C WAJIB meng-override method halo() dan dapat memilih implementasi spesifik dengan memanggil A.super.halo() atau B.super.halo()',
      'Java secara otomatis memilih implementasi dari interface A karena ditulis pertama',
      'Class C cukup menghapus keyword implements B',
      'Konflik tersebut tidak bisa diselesaikan dan Java akan crash saat runtime'
    ],
    correctAnswer: 0,
    explanation: 'Ketika sebuah class mengimplementasikan dua interface yang memiliki default method dengan signature yang identik, compiler Java akan mendeteksi ambiguitas (Diamond Problem). Class C diwajibkan meng-override method halo() secara eksplisit.'
  },

  // ==========================================
  // TOPIC: MULTI JAWABAN (CHECKBOX) (91 - 92)
  // ==========================================
  {
    id: 91,
    topic: TOPICS.ABSTRACT_CLASS,
    difficulty: 'Sedang',
    type: 'multiple_choice',
    question: '[Soal Multi-Jawaban LMS] Manakah pernyataan-pernyataan di bawah ini yang BENAR mengenai perbedaan antara Abstract Class dan Interface pada Java modern (Java 8+)? (Pilih semua yang benar)',
    options: [
      'Sebuah class hanya dapat meng-extends satu Abstract Class, tetapi dapat meng-implements banyak Interface sekaligus',
      'Abstract Class dapat memiliki state/variabel instansi (non-static non-final), sedangkan semua variabel di Interface otomatis berstatus public static final',
      'Abstract Class boleh memiliki konstruktor, sedangkan Interface tidak boleh memiliki konstruktor sama sekali',
      'Interface tidak boleh memiliki method yang memiliki body sama sekali di versi Java mana pun'
    ],
    correctAnswer: [0, 1, 2],
    explanation: 'Pilihan 1, 2, dan 3 benar. Pilihan 4 salah karena sejak Java 8, Interface boleh memiliki method ber-body melalui default method dan static method.'
  },
  {
    id: 92,
    topic: TOPICS.INHERITANCE,
    difficulty: 'Mudah',
    type: 'multiple_choice',
    question: '[Soal Multi-Jawaban LMS] Di antara pilihan kata kunci (keywords) berikut, manakah yang VALID digunakan sebagai modifier hak akses (access modifier) pada member class di Java? (Pilih semua yang benar)',
    options: [
      'public',
      'protected',
      'private',
      'friend'
    ],
    correctAnswer: [0, 1, 2],
    explanation: 'Java memiliki 4 tingkat akses: public, protected, private, dan default (package-private tanpa keyword). Keyword "friend" merupakan fitur C++, bukan Java.'
  },

  // ==========================================
  // TOPIC: ISIAN FORM / SHORT ANSWER (93 - 94)
  // ==========================================
  {
    id: 93,
    topic: TOPICS.INHERITANCE,
    difficulty: 'Mudah',
    type: 'text_input',
    placeholder: 'Ketik nama keyword pemanggil...',
    question: '[Soal Isian Form LMS] Kata kunci (keyword) apakah yang digunakan oleh konstruktor subclass untuk memanggil konstruktor milik superclass secara eksplisit?',
    correctAnswer: ['super', 'super()', 'super();'],
    explanation: 'Keyword "super" (atau panggilan "super()") digunakan di baris pertama konstruktor subclass untuk mendelegasikan inisialisasi ke superclass.'
  },
  {
    id: 94,
    topic: TOPICS.ABSTRACT_CLASS,
    difficulty: 'Mudah',
    type: 'text_input',
    placeholder: 'Ketik keyword Java...',
    question: '[Soal Isian Form LMS] Kata kunci apakah yang wajib dicantumkan pada deklarasi method jika method tersebut tidak memiliki implementasi (body) kurung kurawal di dalam class abstrak?',
    correctAnswer: ['abstract'],
    explanation: 'Keyword "abstract" diletakkan pada deklarasi method (misal: "public abstract void jalan();") untuk menandakan bahwa method tersebut tidak memiliki body dan wajib diimplementasikan oleh subclass konkrit.'
  }
];
