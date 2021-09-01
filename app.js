const todoAdd=document.querySelector(".todo-add")
const todoInput=document.querySelector(".todo-input")
const todoList=document.querySelector(".todo-list")
const toggle=document.querySelector(".toggle")
const form=document.querySelector(".todo-enter")
const filter=document.querySelector(".filter")
// const close=document.querySelector(".close")

toggle.addEventListener("click",e=>{
    const check=document.querySelectorAll('.check')    
    if(toggle.dataset["status"]=="light"){
        toggle.dataset["status"]="dark"
        document.body.style.backgroundImage='url("./images/bg-desktop-dark.jpg")'
        document.body.style.backgroundColor="var(--Very-Dark-Blue)"
        toggle.setAttribute("src","./images/icon-sun.svg")
        form.style.backgroundColor="var(--Very-Dark-Desaturated-Blue)"
        todoInput.style.color="var(--Very-Light-Gray)"
        todoList.classList.add("dark")
        todoList.classList.remove("light")
        check.forEach(c=>{
           c.classList.add("dark")
           c.classList.remove("light")  
        })
        filter.classList.add("dark")
        filter.classList.remove("light")
             
    }
    else if(toggle.dataset["status"]=="dark"){
        const check=document.querySelectorAll('.check')  
        toggle.dataset["status"]="light"
        document.body.style.backgroundImage='url("./images/bg-desktop-light.jpg")'
        document.body.style.backgroundColor="var(--Very-Light-Gray)"
        toggle.setAttribute("src","./images/icon-moon.svg")
        form.style.backgroundColor="var(--Very-Light-Gray)"
        todoInput.style.color="var(--Very-Dark-Desaturated-Blue)"
        todoList.classList.add("light")
        todoList.classList.remove("darkx")
        check.forEach(c=>{
            c.classList.remove("dark")
            c.classList.add("light")  
         })
        filter.classList.remove("dark")
        filter.classList.add("light")
    }
    
})
todoAdd.addEventListener('click',e=>{    
   e.preventDefault()
   if(!todoInput.value) return    
   let toggleStatus=toggle.dataset["status"]   
   creatingTodoItem(todoList,toggleStatus)
})
todoList.addEventListener('click',e=>{
    if(!e.target.closest('button')) return
    if(e.target.closest('button.check')){
        let checkBtn=e.target.closest('button.check')
        checkBtn.parentElement.classList.add('completed')        
    }else if(e.target.closest('button.delete')){
        let closeBtn=e.target.closest('button.delete')
        closeBtn.parentElement.classList.add('remove')         
    }     
})
function creatingTodoItem(todoList,toggleStatus){
    const itemContent=document.createTextNode(todoInput.value)
    const todoItem=document.createElement("div")
    todoItem.classList.add("todo-item")
    const check=document.createElement("button")
    check.classList.add("check","circle",toggleStatus)
    check.innerHTML='<img src="./images/icon-check.svg" class="check-icon" alt="">'
    todoItem.appendChild(check)
    const listItem=document.createElement("li")
    listItem.classList.add('todo-item-content')
    listItem.appendChild(itemContent)
    todoItem.appendChild(listItem)
    const close=document.createElement("button")
    close.innerHTML='<img src="./images/icon-cross.svg" alt="">'
    close.classList.add('delete')
    todoItem.appendChild(close)       
    todoList.appendChild(todoItem)
    todoInput.value=""
}