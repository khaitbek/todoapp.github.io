window.addEventListener("DOMContentLoaded", () => {
    let addTodoBtn = document.querySelector(".addTodo"),
      todoInput = document.querySelector(".user_input"),
      todos = [],
      todosContainer = document.querySelector(".todo-container");
    
    todoInput.value = ""
    todoInput.value.trim()
    addTodoBtn.addEventListener("click", () => {
        if (todoInput.value !== '') {
            const todo = {
                id: Date.now(),
                todo: todoInput.value,
                completed:false
            }
            todos.push(todo)
            addToStorage(todos)
            todoInput.value = ""
        } else {
            alert("Enter your todo, bozo!")
        }
    })
    
    function renderTodos(todos) { 
        todosContainer.innerHTML = ""
        todos.forEach(todo => {
            let todo_div = document.createElement("div"),
              h3 = document.createElement("h3"),
              btns = document.createElement("div"),
              check = document.createElement("button"),
              trash = document.createElement("button");
            todo_div.classList.add("todo");
            todo_div.setAttribute("data-key", todo.id);
            if (todo.completed) {
                todo_div.classList.add("completed");
            }
            h3.textContent = todo.todo;
            btns.classList.add("btns");
            check.classList.add("checkBtn");
            trash.classList.add("trashBtn");
            check.innerHTML = `<i class="fas fa-check"></i>`
            trash.innerHTML = `<i class="fas fa-trash"></i>`
            btns.append(check,trash)
            todo_div.append(h3, btns)
            todosContainer.append(todo_div)
        })
    }
    function addToStorage(todos) {
        localStorage.setItem("todos", JSON.stringify(todos))
        renderTodos(todos)
     }
    function getFromStorage() { 
        let reference = localStorage.getItem("todos")
        if (reference) {
            todos = JSON.parse(reference)
            renderTodos(todos)
        }
    }
    function remove(id) { 
        todos = todos.filter(todo => todo.id != id);
        addToStorage(todos)
    }
    function complete(id) { 
        todos.forEach(todo => {
            if (todo.id == id) {
                todo.completed = !todo.completed
            }
        })
        addToStorage(todos)
    }
    getFromStorage();
    todosContainer.addEventListener("click", (e) => {
        let target = e.target
        
        if (
          target.classList.contains("checkBtn") ||
          target.classList.contains("fa-check")
        ) {
            console.log(e.target.parentElement.parentElement);
          complete(
            e.target.parentElement.parentElement.getAttribute(
              "data-key"
            )
          );
        } else if (
          target.classList.contains("trashBtn") ||
          target.classList.contains("fa-trash")
        ) {
          console.log(e.target.parentElement.parentElement);
          remove(
            e.target.parentElement.parentElement.getAttribute(
              "data-key"
            )
          );
        }

    })

    
})
