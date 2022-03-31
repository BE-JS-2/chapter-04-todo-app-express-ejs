const fs = require('fs');

class TodoController {
  static getAll(req, res) {
    let data = fs.readFileSync('todos.json', 'utf-8');
    data = JSON.parse(data);

    return res.render('../view/index', { data })
  }

  static getDetails(req, res) {
    const { id } = req.params;
    let data = fs.readFileSync('todos.json', 'utf-8');

    data = JSON.parse(data);
    data = data.filter(d => d.id == id)
    console.log(data);
    return res.render('../view/details', { data })
  }

  static deleteTodo(req, res) {
    const { id } = req.params;
    let data = fs.readFileSync('todos.json', 'utf-8');

    data = JSON.parse(data);
    data = data.filter(d => d.id != id)

    fs.writeFile('todos.json', JSON.stringify(data), 'utf8', err => {
      if (err) {
        console.log(err);
      } else {
        return res.redirect('/todos');
      }
    });
  }

  static addTodo(req, res) {
    const { title, description, due_date } = req.body;
    let data = fs.readFileSync('todos.json', 'utf-8');
    data = JSON.parse(data);

    data.push({ userId: 1, id: data[data.length - 1].id + 1, title, description, due_date, completed: false });
    fs.writeFile('todos.json', JSON.stringify(data), 'utf-8', err => {
      if (err) {
        console.log(err);
      } else {
        return res.redirect('/todos');
      }
    })
  }

  static editTodoView(req, res) {
    const { id } = req.params;
    let data = fs.readFileSync('todos.json', 'utf-8');
    data = JSON.parse(data);
    data = data.filter(d => d.id == id);

    return res.render('../view/edit', { data }) 
  }

  static editTodo(req, res) {
    const { id, title, description, completed } = req.body;
    let data = fs.readFileSync('todos.json', 'utf-8');
    data = JSON.parse(data)

    data = data.map(d => {
      console.log(d);
      if (d.id == id) {
        return {
          id,
          userId: d.userId,
          title, description, completed: (completed == 'true')
        }
      } else {
        return {
          id: d.id,
          userId: d.userId,
          title: d.title,
          description: d.description,
          completed: d.completed
        }
      }
    });

    fs.writeFile('todos.json', JSON.stringify(data), 'utf-8', err => {
      if (err) {
        console.log(err);
      } else {
        return res.redirect('/todos');
      }
    })

  }
}

module.exports = TodoController;