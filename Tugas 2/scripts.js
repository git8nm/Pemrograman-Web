document.addEventListener('DOMContentLoaded', () => { //Event listener ini memastikan bahwa kode hanya akan dijalankan setelah DOM selesai dimuat, sehingga semua elemen HTML siap digunakan.
    const form = document.getElementById('todo-form'); //Mengambil elemen form dengan id 'todo-form' dan menyimpannya dalam konstanta form.
    const input = document.getElementById('todo-input'); //Mengambil elemen input dengan id 'todo-input' dan menyimpannya dalam konstanta input.
    const todoList = document.getElementById('todo-list'); //Mengambil elemen list dengan id 'todo-list' dan menyimpannya dalam konstanta todoList.
    let todos = JSON.parse(localStorage.getItem('todos')) || []; //Mengambil data dari localStorage dengan key 'todos' dan mengonversi menjadi array. Jika tidak ada data, maka akan diinisialisasi sebagai array kosong.

    function saveTodos() { //Fungsi ini digunakan untuk menyimpan data todos ke localStorage setiap kali terjadi perubahan.
        localStorage.setItem('todos', JSON.stringify(todos)); //Menyimpan data todos ke localStorage setiap kali terjadi perubahan.
    }

    function renderTodos() { //Fungsi ini digunakan untuk menggambar ulang list tugas setiap kali terjadi perubahan.
        todoList.innerHTML = ''; //Mengosongkan isi dari elemen todoList.
        todos.forEach((todo, index) => {//Memanggil fungsi renderTodos setiap kali terjadi perubahan.
            const li = document.createElement('li'); //Membuat elemen list baru.
            li.innerHTML = `
                <span>${todo}</span>
                <div>
                    <button class="edit-btn" data-index="${index}">edit</button>
                    <button class="delete-btn" data-index="${index}">X</button>
                </div>
            `;
            todoList.appendChild(li); //Menambahkan elemen list baru ke dalam elemen todoList.
        });
    }

    function addTodo(todo) { //Fungsi ini digunakan untuk menambahkan tugas baru ke dalam array todos.
        todos.push(todo); //Menambahkan tugas baru ke dalam array todos.
        saveTodos(); //Menyimpan data todos ke localStorage setiap kali terjadi perubahan.
        renderTodos(); //Memanggil fungsi renderTodos untuk memperbarui tampilan.
    }

    function deleteTodo(index) { //Fungsi ini digunakan untuk menghapus tugas berdasarkan index.
        todos.splice(index, 1); //Menghapus tugas berdasarkan index.
        saveTodos(); //Menyimpan data todos ke localStorage setiap kali terjadi perubahan.
        renderTodos(); //Memanggil fungsi renderTodos untuk memperbarui tampilan.
    }

    function editTodo(index, newTodo) { //Fungsi ini digunakan untuk mengedit tugas berdasarkan index.
        todos[index] = newTodo; //Mengganti tugas berdasarkan index.
        saveTodos(); //Menyimpan data todos ke localStorage setiap kali terjadi perubahan.
        renderTodos(); //Memanggil fungsi renderTodos untuk memperbarui tampilan.
    }

    form.addEventListener('submit', (e) => { //Event listener ini memanggil fungsi addTodo setiap kali form dikirim.
        e.preventDefault(); //Menghentikan perilaku default dari form.
        const todo = input.value.trim(); //Mengambil nilai dari input dan menghapus spasi di awal dan akhir.
        if (todo) {
            addTodo(todo); //Memanggil fungsi addTodo untuk menambahkan tugas baru.
            input.value = ''; //Mengosongkan nilai input setelah tugas berhasil ditambahkan.
        }
    });

    todoList.addEventListener('click', (e) => { //Event listener ini memanggil fungsi deleteTodo atau editTodo setiap kali elemen list diklik.
        if (e.target.classList.contains('delete-btn')) { //Memeriksa apakah elemen yang diklik memiliki class 'delete-btn'.
            const index = e.target.dataset.index; //Mengambil nilai data-index dari elemen yang diklik.
            deleteTodo(index); //Memanggil fungsi deleteTodo untuk menghapus tugas berdasarkan index.
        } else if (e.target.classList.contains('edit-btn')) { //Memeriksa apakah elemen yang diklik memiliki class 'edit-btn'.
            const index = e.target.dataset.index; //Mengambil nilai data-index dari elemen yang diklik.
            const newTodo = prompt('Edit tugas:', todos[index]); //Membuka dialog prompt untuk mengedit tugas berdasarkan index.
            if (newTodo !== null) { //Memeriksa apakah nilai yang dikembalikan dari prompt tidak null.
                editTodo(index, newTodo.trim()); //Memanggil fungsi editTodo untuk mengedit tugas berdasarkan index.
            }
        }
    });

    // Tambahkan ini setelah event listener 'click' yang sudah ada

    todoList.addEventListener('touchstart', (e) => {//Event listener ini memanggil fungsi editTodo setiap kali elemen list diklik.
      if (e.target.classList.contains('delete-btn') || e.target.classList.contains('edit-btn')) {//Memeriksa apakah elemen yang diklik memiliki class 'delete-btn' atau 'edit-btn'.
        e.target.style.opacity = '0.7';//Mengubah opacity elemen yang diklik menjadi 0.7.
      }
    });

    todoList.addEventListener('touchend', (e) => {//Event listener ini memanggil fungsi editTodo setiap kali elemen list diklik.
      if (e.target.classList.contains('delete-btn') || e.target.classList.contains('edit-btn')) {//Memeriksa apakah elemen yang diklik memiliki class 'delete-btn' atau 'edit-btn'.
        e.target.style.opacity = '1';//Mengubah opacity elemen yang diklik menjadi 1.
      }
    });

    renderTodos(); //Memanggil fungsi renderTodos untuk memperbarui tampilan awal.
});
