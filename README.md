# chapter-04-todo-app-express-ejs
# Todo App
## Objectives
- Mengerti cara membuat web sederhana menggunakan express dan ejs
## Directions
Buatlah sebuah web sederhana menggunakan express sebagai framework dan ejs sebagai view engine dengan routingan sebagai berikut:

| Path          | Method   | Output                                                                                           |
| :---          |  :----:  |   :---                                                                                           |
| /todos        | GET      | list todo dan hanya menampilkan title dan completed                                              |
| /todos/:id    | GET      | detail todo dengan ID = id dan menampilkan title, description, due date, dan completed           |
| /todos        | POST     | menambahkan todo dengan data userId, id, title, description, due date, dan completed             |
| /todos/:id    | PUT      | mengubah status todo dengan ID = id yang memiliki status completed false menjadi true (jika sudah true tidak perlu diubah)   | 
| /todos/:id    | DELETE   | menghapus todo dengan ID = id                                                                    |


## Notes
- Tampilan dibebaskan
- Bisa memanfaatkan readFileSync dan writeFileSync untuk mengubah isi todos.json