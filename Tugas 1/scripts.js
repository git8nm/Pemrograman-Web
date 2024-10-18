let display = document.getElementById('display'); // Mengambil elemen dengan id 'display'

function appendToDisplay(value) {
    display.value += value; // Menambahkan nilai ke display
}

function clearAll() { // Fungsi untuk menghapus semua nilai dari display
    display.value = ''; // Mengosongkan nilai display
}

function calculate() {
    try {
        // Menggunakan Function constructor untuk mengevaluasi ekspresi
        let result = new Function('return ' + display.value)(); // Menghitung ekspresi dan menampilkan hasil
        display.value = result; // Menampilkan hasil di display
    } catch (error) { // Menangkap dan menampilkan pesan error
        display.value = 'Error'; // Menampilkan pesan error jika terjadi kesalahan
    }
}

// Tambahkan fungsi baru untuk menangani input keyboard
function handleKeyPress(event) { // Fungsi untuk menangani input keyboard
    const key = event.key; // Mengambil karakter yang ditekan
    if (/[0-9+\-*/.%]/.test(key)) { // Memeriksa apakah karakter adalah angka, operator, atau tanda baca
        appendToDisplay(key); // Menambahkan karakter ke display
    } else if (key === 'Enter') { // Memeriksa apakah karakter adalah Enter
        calculate(); // Menghitung ekspresi
    } else if (key === 'Backspace') { // Memeriksa apakah karakter adalah Backspace
        display.value = display.value.slice(0, -1); // Menghapus karakter terakhir dari display
    } else if (key === 'Escape') { // Memeriksa apakah karakter adalah Escape
        clearAll(); // Mengosongkan display
    } else if (key === '^') { // Memeriksa apakah karakter adalah ^
        appendToDisplay('**'); // Menambahkan ** ke display
    }
    event.preventDefault(); // Mencegah perilaku default dari event
}

// Tambahkan event listener untuk keydown event
document.addEventListener('keydown', handleKeyPress); // Menambahkan event listener untuk keydown event
