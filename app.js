// SELECTS
const form = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo");
const todoList = document.querySelector(".list-group")
const firstCardBody = document.querySelectorAll(".card-body")[0];
const secondCardBody = document.querySelectorAll(".card-body")[1];
const filter = document.querySelector("#filter");
const clearButton = document.querySelector("#cleartodos");

eventListeners();

function eventListeners() { // Tüm event listenerlar
    form.addEventListener("submit", addTodo);
    document.addEventListener("DOMContentLoaded", loadTodos);
    secondCardBody.addEventListener("click", deleteTodo);
    filter.addEventListener("keyup",filterTodos);
    clearButton.addEventListener("click",clearAllTodos);

}

function clearAllTodos(e){

    if (confirm("Are you sure to delete all the tasks? :/")) {
        while(todoList.firstElementChild != null){
            todoList.removeChild(todoList.firstElementChild);
        }
        localStorage.removeItem("todos")
        showAlert("success","All the tasks has been deleted.")
    }

    else {
        showAlert("info","Delete all the tasks process has been canceled.")
    }
    e.preventDefault();
}

function filterTodos(e) {
    const filterValue = e.target.value.toLowerCase();
    const listItems = document.querySelectorAll(".list-group-item");

    listItems.forEach(function(listItem){
        const text = listItem.textContent.toLowerCase();
        if (text.indexOf(filterValue) === -1) {
            // Bulamadı
            listItem.setAttribute("style","display: none!important");

        }
        else{
            listItem.setAttribute("style","display: block");
        }

    })

}


function deleteTodo(e) {
    if (e.target.className === "fa fa-remove") {
        e.target.parentElement.parentElement.remove();
        deleteTodoFromStorage(e.target.parentElement.parentElement.textContent);
        showAlert("success", "The task was deleted successfully.")
    }
}

function deleteTodoFromStorage(deletetodo) {

    let todosarray = getTodosFromStorage();
    console.log(todosarray);
    todosarray.forEach(function (todo, index) {
        if (todo === deletetodo) {
            todosarray.splice(index, 1); // o indexten itibaren 1 tane öğe sil

        }
    });

    localStorage.setItem("todos", JSON.stringify(todosarray));
}

function addTodo(e) {

    const newTodo = todoInput.value.trim();

    if (newTodo === "") {
        showAlert("danger", "Please enter a todo.");
    }
    else {
        addTodoToUI(newTodo);
        addTodoToStorage(newTodo);
        todoInput.value = "";
        showAlert("success", "The task was added successfully :)")

    }

    e.preventDefault();

}

function getTodosFromStorage() { // Storagemızdan tüm todoları almak
    let todos;

    if (localStorage.getItem("todos") === null) {
        todos = [];
    }
    else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    return todos;
}


function addTodoToStorage(newTodo) {

    let todos = getTodosFromStorage();

    todos.push(newTodo);
    localStorage.setItem("todos", JSON.stringify(todos));

}
function showAlert(type, message) {

    const alert = document.createElement("div");
    alert.className = `alert alert-${type}`
    alert.id = "dpinline"
    alert.textContent = message;
    firstCardBody.appendChild(alert);

    //setTimeout metodu.

    window.setTimeout(function () { alert.remove(); }, 2000)

}


function addTodoToUI(newTodo) { // Aldığı string değerini list item olarak UI' a ekleyecek.

    // List item oluşturma
    const listItem = document.createElement("li");
    listItem.className = "list-group-item d-flex justify-content-between align-items-center";
    const link = document.createElement("a");
    link.href = "#";
    link.className = "delete-item";
    link.innerHTML = "<i class='fa fa-remove'></i>";
    // Text Node
    listItem.appendChild(document.createTextNode(newTodo));
    listItem.appendChild(link);
    // Link oluşturma


    todoList.appendChild(listItem);
}

function loadTodos() {
    let todos = getTodosFromStorage();
    todos.forEach(function (todo) {
        addTodoToUI(todo);
    });

}


