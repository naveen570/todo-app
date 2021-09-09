const todoAdd=document.querySelector(".todo-add")
const todoInput=document.querySelector(".todo-input")
const todoList=document.querySelector(".todo-list")
const toggle=document.querySelector(".toggle")
const form=document.querySelector(".todo-enter")
const filter=document.querySelector(".filter")
const container=document.querySelector(".container")
if(todoList.childElementCount==0){
    filter.style.border="none"
}
else{
    filter.style.borderTop="1px solid var(--Dark-Grayish-Blue)"
    // border-top: 1px solid var(--Dark-Grayish-Blue);
}
//light to dark them, vice versa
toggle.addEventListener("click",e=>{ 
    container.classList.toggle("dark")
    if(container.classList.contains("dark")){
        toggle.setAttribute("src","./images/icon-sun.svg")
    }
    else{
        toggle.setAttribute("src","./images/icon-moon.svg")
    }   
})

//adding listItem
todoAdd.addEventListener('click',e=>{     
   e.preventDefault()
   if(!todoInput.value) return     
   filter.style.borderTop="1px solid var(--Dark-Grayish-Blue)"  
   let toggleStatus=toggle.dataset["status"]   
   creatingTodoItem(todoList,toggleStatus)
})

// check and delete
todoList.addEventListener('click',e=>{
    const targetItem=e.target
    // if(!targetItem.closest('button')) return      
    if(targetItem.classList.contains("check") || targetItem.classList.contains("todo-item-content")){
        targetItem.parentElement.classList.toggle("completed")
        targetItem.parentElement.dataset["status"]="completed"
    }  
    else if(targetItem.classList.contains("delete")){
        const p=targetItem.parentElement
        targetItem.parentElement.classList.add("remove")  
        targetItem.parentElement.addEventListener('animationend', () => {
            targetItem.parentElement.remove()
          });   
    }
    
})

//filtering
filter.addEventListener("click",e=>{   
    const targetBtn=e.target
    if(!targetBtn.closest(".btn-filter")) return
    // if(todoList.childElementCount==0) return
    activeFilter(targetBtn)    
    const items=todoList.querySelectorAll(".todo-item")
    // console.log(items.length)
    items.forEach(item=>{
        if(targetBtn.classList.contains("active")){            
            
            if(item.dataset.status!="active"){
                console.log("a"+item.textContent)
                item.style.display="none"
            }
            else{
                item.style.display="flex"
            }
        }
        else if(targetBtn.classList.contains("completed")){            
           
            if(item.dataset.status!="completed"){
                console.log("c"+item.textContent)
                item.style.display="none"
            }
            else{
                item.style.display="flex"
            }
        }
        else if(targetBtn.classList.contains("all")){ 
            
            item.style.display="flex"  
        }
    })  
})

function creatingTodoItem(todoList,toggleStatus){
    const itemContent=document.createTextNode(todoInput.value)
    const todoItem=document.createElement("div")
    todoItem.dataset["status"]="active"
    todoItem.classList.add("todo-item")
    const check=document.createElement("button")
    check.classList.add("check","circle")
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
function activeFilter(target){    
    const currentlyActive=filter.querySelector(".chosen")      
    currentlyActive.classList.remove("chosen")
    target.classList.add("chosen")
}