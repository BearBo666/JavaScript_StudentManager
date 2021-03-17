let todo = [
    { id: 1, name: 'x', done: true },
    { id: 2, name: 'y', done: true },
    { id: 3, name: 'z', done: true },
]

let newTodos = []

let id = 1;
let done = false

for (let i = 0; i < todo.length; i++) {
    if (id === todo[i].id) {
        newTodos.push({ ...todo[i], done })
    } else {
        newTodos.push({ ...todo[i] })
    }
}

console.log(newTodos)