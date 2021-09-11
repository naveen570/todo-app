const todoAdd = document.querySelector(".todo-add")
const todoInput = document.querySelector(".todo-input")
const todoList = document.querySelector(".todo-list")
const toggle = document.querySelector(".toggle")
const form = document.querySelector(".todo-enter")
const filter = document.querySelector(".filter")
const container = document.querySelector(".container")
const count = document.querySelector(".todo-item-count")
const clearAll = document.querySelector(".todo-clear-all")
const todoFooter = document.querySelector(".todo-footer")
document.addEventListener("DOMContentLoaded", getLocalTodoItems)
//light to dark them, vice versa
toggle.addEventListener("click", (e) => {
  container.classList.toggle("dark")
  if (container.classList.contains("dark")) {
    toggle.setAttribute("src", "./images/icon-sun.svg")
  } else {
    toggle.setAttribute("src", "./images/icon-moon.svg")
  }
})

//adding listItem
todoAdd.addEventListener("click", (e) => {
  e.preventDefault()
  if (!todoInput.value) return
  let toggleStatus = toggle.dataset["status"]
  creatingTodoItem(todoList, toggleStatus)
  ItemCount(".todo-item")
})

// check and delete
todoList.addEventListener("click", (e) => {
  const targetItem = e.target
  if (
    targetItem.classList.contains("check") ||
    targetItem.classList.contains("todo-item-content")
  ) {
    if (targetItem.parentElement.classList.contains("active")) {
      targetItem.parentElement.classList.add("completed")
      targetItem.parentElement.classList.remove("active")
    } else {
      targetItem.parentElement.classList.add("active")
      targetItem.parentElement.classList.remove("completed")
    }
  } else if (targetItem.classList.contains("delete")) {
    const item = targetItem.parentElement
    removeItem(item, ".todo-item")
  }
})

//filtering & deleting
todoFooter.addEventListener("click", (e) => {
  const targetBtn = e.target
  if (!targetBtn.closest(".btn")) return
  if (targetBtn.classList.contains("btn-filter")) activeFilter(targetBtn)
  const items = todoList.querySelectorAll(".todo-item")
  // console.log(items.length)
  items.forEach((item) => {
    if (targetBtn.classList.contains("active")) {
      if (!item.classList.contains("active")) {
        item.style.display = "none"
        ItemCount(".active")
      } else {
        item.style.display = "flex"
        ItemCount(".active")
      }
    } else if (targetBtn.classList.contains("completed")) {
      if (!item.classList.contains("completed")) {
        // console.log("c"+item.textContent)
        item.style.display = "none"
        ItemCount(".completed")
      } else {
        item.style.display = "flex"
        ItemCount(".completed")
      }
    } else if (targetBtn.classList.contains("all")) {
      item.style.display = "flex"
      ItemCount(".todo-item")
    } else if (targetBtn.classList.contains("todo-clear-all")) {
      const chosenFilter = filter.querySelector(".chosen")
      if (chosenFilter.classList.contains("all")) {
        removeItem(item, ".todo-item")
      } else if (chosenFilter.classList.contains("active")) {
        if (item.classList.contains("active")) {
          removeItem(item, ".active")
        }
      } else if (chosenFilter.classList.contains("completed")) {
        if (item.classList.contains("completed")) {
          removeItem(item, ".completed")
        }
      }
    }
  })
})

function creatingTodoItem(todoList) {
  const itemContent = document.createTextNode(todoInput.value)
  saveInLocal(todoInput.value)
  const todoItem = document.createElement("div")
  todoItem.classList.add("active")
  // todoItem.dataset["status"]="active"
  todoItem.classList.add("todo-item")
  const check = document.createElement("button")
  check.classList.add("check", "circle")
  check.innerHTML =
    '<img src="./images/icon-check.svg" class="check-icon" alt="">'
  todoItem.appendChild(check)
  const listItem = document.createElement("li")
  listItem.classList.add("todo-item-content")
  listItem.appendChild(itemContent)
  todoItem.appendChild(listItem)
  const close = document.createElement("button")
  close.innerHTML = '<img src="./images/icon-cross.svg" alt="">'
  close.classList.add("delete")
  todoItem.appendChild(close)
  todoList.appendChild(todoItem)
  todoInput.value = ""
}
function activeFilter(target) {
  const currentlyActive = filter.querySelector(".chosen")
  currentlyActive.classList.remove("chosen")
  target.classList.add("chosen")
}
function ItemCount(select) {
  const Targetitems = todoList.querySelectorAll(select)
  count.textContent = Targetitems.length + " items left"
}
function removeItem(targetItem, selector) {
  targetItem.classList.add("remove")
  removeLocalTodoItems(targetItem)
  targetItem.addEventListener("animationend", () => {
    targetItem.remove()
    ItemCount(selector)
  })
}
function saveInLocal(todoItem) {
  let todos
  if (localStorage.getItem("todos") === null) {
    todos = []
  } else {
    todos = JSON.parse(localStorage.getItem("todos"))
  }
  todos.push(todoItem)
  console.log(todos)
  localStorage.setItem("todos", JSON.stringify(todos))
}
function getLocalTodoItems() {
  let todos
  if (localStorage.getItem("todos") === null) {
    todos = []
  } else {
    todos = JSON.parse(localStorage.getItem("todos"))
  }
  todos.forEach((todo) => {
    const itemContent = document.createTextNode(todo)
    const todoItem = document.createElement("div")
    todoItem.classList.add("active")
    // todoItem.dataset["status"]="active"
    todoItem.classList.add("todo-item")
    const check = document.createElement("button")
    check.classList.add("check", "circle")
    check.innerHTML =
      '<img src="./images/icon-check.svg" class="check-icon" alt="">'
    todoItem.appendChild(check)
    const listItem = document.createElement("li")
    listItem.classList.add("todo-item-content")
    listItem.appendChild(itemContent)
    todoItem.appendChild(listItem)
    const close = document.createElement("button")
    close.innerHTML = '<img src="./images/icon-cross.svg" alt="">'
    close.classList.add("delete")
    todoItem.appendChild(close)
    todoList.appendChild(todoItem)
    todoInput.value = ""
    ItemCount(".todo-item")
  })
}
function removeLocalTodoItems(todoItem) {
  let todos
  if (localStorage.getItem("todos") === null) {
    todos = []
  } else {
    todos = JSON.parse(localStorage.getItem("todos"))
  }
  let todoIndex = todoItem.children[1].innerHTML
  todos.splice(todos.indexOf(todoIndex), 1)
  localStorage.setItem("todos", JSON.stringify(todos))
}
