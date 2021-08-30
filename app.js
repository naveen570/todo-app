const todoAdd=document.querySelector(".todo-add")
const todoInput=document.querySelector(".todo-input")
const todoList=document.querySelector(".todo-list")
// const check=document.querySelector('.check')
// const close=document.querySelector(".close")
todoAdd.addEventListener('click',e=>{    
   e.preventDefault()
   if(!todoInput.value) return
   if(!document.querySelector('.todo-item'))todoList.textContent=""   
   let itemContent=document.createTextNode(todoInput.value)
   const todoItem=document.createElement("div")
   todoItem.classList.add("todo-item")
   const check=document.createElement("button")
   check.classList.add("check","circle")
   check.innerHTML='<img src="./images/icon-check.svg" alt="">'
   todoItem.appendChild(check)
   const listItem=document.createElement("li")
   listItem.classList.add('todo-item-content')
   listItem.appendChild(itemContent)
   todoItem.appendChild(listItem)
   const close=document.createElement("button")
   close.innerHTML='<img src="./images/icon-cross.svg" alt="">'
   close.classList.add('delete')
   todoItem.appendChild(close)   
   console.log(todoItem)
   todoList.appendChild(todoItem)
   todoInput.value=""
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
