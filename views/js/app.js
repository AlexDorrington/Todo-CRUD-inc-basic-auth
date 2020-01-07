const todoContainer = document.getElementById('todoContainer')
const titleInput = document.getElementById('input1')
const descriptionInput = document.getElementById('input2')
const dateInput = document.getElementById('input3')
const newTitleInput = document.getElementById('input4')
const newDescriptionInput = document.getElementById('input5')
const applyEditBtn = document.getElementById('applyEditBtn')
const editContainer = document.getElementById('editContainer')
const filter = document.getElementById('filterInput')
const sortByDateBtn = document.getElementById('sortDateBtn')

//GET ALL TODOS
const getTodos = () => {
    fetch('http://localhost:3000/todo', {
        method: 'get',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then((response) => {
        todoContainer.innerHTML = ''
        return response.json()
    }).then((data) => {
        renderTodos(data)
    }).catch((err) => {
        console.log(err)
    })
}
getTodos()

//RENDER ALL TODOS TO PAGE
const renderTodos = data => {
    data.forEach(({date, _id, title, description}) => {
        const year = date.slice(0, 4)
        const month = date.slice(5, 7)
        const day = date.slice(8, 10)
        const newListItem = document.createElement('li')
        newListItem.setAttribute('class', 'todoItem')
        newListItem.innerHTML = `
            <div id="${_id}">
                <h3 style="display: block">${title}</h3>
                <p>${description}</p>
                <p>Date Due - <span>${day} / ${month} / ${year}</span></p>
                <button class="editBtn" id="${_id}">Edit</button>
                <button class="deleteBtn" id="${_id}">Delete</button>
            </div>
        `
        todoContainer.appendChild(newListItem)
    })
    deleteTodo()
    editTodo()
}

//RENDER LATEST ADDED TODO
document.getElementById('AddTodoBtn').addEventListener('click', (e) => {
    e.preventDefault()
    fetch('http://localhost:3000/todo', {
        method: "post",
        body: JSON.stringify({
                title: titleInput.value,
                description: descriptionInput.value,
                date: dateInput.value
            }),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then((res) => {
        return res.json()
    }).then((data) => {
        renderTodos([data])
        resetInputs()
    })
})

//DELETE TODO
const deleteTodo = () => {
    let allDeleteBtns = document.querySelectorAll('.deleteBtn')
    allDeleteBtns.forEach((btn) => {
        btn.addEventListener('click', ({target}) => {
            fetch(`http://localhost:3000/todo/${target.id}`, {
                method: "delete"
            }).then((res) => {
                return res.json()
            }).then(() => {
                const todoElement = target.parentElement.parentElement
                todoElement.style.display = 'none'
            }).catch((err) => {
                console.log(err)
            })
        })
    })
}

//EDIT TODO
let todoToUpdate
const editTodo = () => {
    todoContainer.addEventListener('click', ({target}) => {
        if (target.className === 'editBtn') {
            editContainer.style.display = 'flex'
            newTitleInput.value = target.parentElement.children[0].innerHTML
            newDescriptionInput.value = target.parentElement.children[1].innerHTML
            todoToUpdate = target
            applyEditBtn.addEventListener('click', updateTodo)
        }
    })
}

const updateTodo = () => {
        fetch(`http://localhost:3000/todo/${todoToUpdate.id}`, {
            method: 'PATCH',
            body: JSON.stringify({
                title: newTitleInput.value,
                description: newDescriptionInput.value
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((data) => {
            editContainer.style.display = 'none'
            return data.json()
        }).then(() => {
            getTodos()
        }).catch((err) => {
            console.log(err)
        })
    }


//RESET INPUTS
const resetInputs = () => {
    titleInput.value = ''
    descriptionInput.value = ''
    dateInput.value = ''
}

//Filter
filter.addEventListener('keyup', ({target}) => {
    const filterInput = target.value.toLowerCase();
    let todos = document.querySelectorAll('.todoItem')
    todos = Array.from(todos)
    todos.filter((todo) => {
        if (filterInput == '') {
            return todo.classList.remove('filterMatch')
        }
        if (todo.children[0].children[0].innerHTML.toLowerCase().includes(filterInput)) {
            return todo.classList.add('filterMatch')
        }
        todo.classList.remove('filterMatch')
    })
})

//SORT BY DUE DATE
sortByDateBtn.addEventListener('click', () => {
    fetch('http://localhost:3000/todo', {
        method: 'get',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then((response) => {
        return response.json()
    }).then((data) => {
        todoContainer.innerHTML = ''
        const dateOrder = data.sort((a, b) => {
            const date1 = a.date.slice(0, 10).replace(/\-/g, '')
            const date2 = b.date.slice(0, 10).replace(/\-/g, '')
            return date1 - date2
        })
        renderTodos(dateOrder)
    }).catch((err) => {
        console.log(err)
    })
})
