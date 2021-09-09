const todoAdd=document.querySelector(".todo-add")
const todoInput=document.querySelector(".todo-input")
const todoList=document.querySelector(".todo-list")
const toggle=document.querySelector(".toggle")
const form=document.querySelector(".todo-enter")
const filter=document.querySelector(".filter")
const imgChange=window.matchMedia("(min-width:376px)")


//light to dark them, vice versa
toggle.addEventListener("click",e=>{ 
    const checks=document.querySelectorAll('.check')    
    if(toggle.dataset["status"]=="light"){
        toggle.dataset["status"]="dark"
        // document.body.style.backgroundImage='url("./images/bg-mobile-dark.jpg")'
        handleImgChange(imgChange)
        document.body.style.backgroundColor="var(--Very-Dark-Blue)"
        toggle.setAttribute("src","./images/icon-sun.svg")
        form.style.backgroundColor="var(--Very-Dark-Desaturated-Blue)"
        todoInput.style.color="var(--Very-Light-Gray)"      
        classToggle(todoList,"dark","light")
        checks.forEach(check=>{         
           classToggle(check,"dark","light")
        })        
        classToggle(filter,"dark","light")
        document.querySelector(".btn-filter.chosen").style.color="var(--Bright-Blue)"
             
    }
    else if(toggle.dataset["status"]=="dark"){
        const checks=document.querySelectorAll('.check')  
        toggle.dataset["status"]="light"
        // document.body.style.backgroundImage='url("./images/bg-mobile-light.jpg")'
        handleImgChange(imgChange)
        document.body.style.backgroundColor="var(--Light-Grayish-Blue-hover)"
        toggle.setAttribute("src","./images/icon-moon.svg")
        form.style.backgroundColor="var(--Very-Light-Gray)"
        todoInput.style.color="var(--Very-Dark-Desaturated-Blue)"   
        classToggle(todoList,"light","dark")
        checks.forEach(check=>{           
            classToggle(check,"light","dark")
         })      
        classToggle(filter,"light","dark")
    }
    
})


//changing image according to the theme
imgChange.addListener(handleImgChange)
function handleImgChange(e){   
    if(e.matches) {
        if(toggle.dataset["status"]=="light"){
            document.body.style.backgroundImage='url("./images/bg-desktop-light.jpg")'
            console.log("light-desktop")
        }
        else if(toggle.dataset["status"]=="dark"){
            document.body.style.backgroundImage='url("./images/bg-desktop-dark.jpg")'
            console.log("dark-desktop")
        }
    }
    else {
        if(toggle.dataset["status"]=="light"){
            document.body.style.backgroundImage='url("./images/bg-mobile-light.jpg")'
            console.log("light-mobile")
        }
        else if(toggle.dataset["status"]=="dark"){
            document.body.style.backgroundImage='url("./images/bg-mobile-dark.jpg")'
            console.log("dark-mobile")
        }
    }
}


//adding listItem
todoAdd.addEventListener('click',e=>{    
   e.preventDefault()
   if(!todoInput.value) return    
   let toggleStatus=toggle.dataset["status"]   
   creatingTodoItem(todoList,toggleStatus)
})


// check and delete
todoList.addEventListener('click',e=>{
    if(!e.target.closest('button')) return
    if(e.target.closest('button.check')){
        let checkBtn=e.target.closest('button.check')
        checkBtn.parentElement.dataset["status"]="completed"
        // checkBtn.parentElement.classList.add('completed')        
    }else if(e.target.closest('button.delete')){        
        let closeBtn=e.target.closest('button.delete')
        // closeBtn.parentElement.classList.add('remove')
        let items=Array.from(todoList.children)
        const targetItem= closeBtn.parentElement
        items.indexOf(targetItem)
        items=items.filter(item=>item!=targetItem)
        
    }     
})


//filtering
filter.addEventListener("click",e=>{   
    if(!e.target.closest(".btn-filter")) return
    if(todoList.childElementCount==0) return    
    const items=todoList.querySelectorAll(".todo-item")  
    if(e.target==filter.querySelector(".btn-filter.active")){  
        activeFilter(e.target)        
        displayAllItems(items)   
        items.forEach((item,i)=>{
            if(item.dataset.status!="active"){
                item.style.display="none"
            }
        })      
    }
    if(e.target==filter.querySelector(".btn-filter.all")){ 
        activeFilter(e.target)         
        displayAllItems(items)
    }
    if(e.target==filter.querySelector(".btn-filter.completed")){     
        activeFilter(e.target)
        displayAllItems(items)
        items.forEach((item,i)=>{
            if(item.dataset.status!="completed"){
                item.style.display="none"
            }
        })
}
})


function creatingTodoItem(todoList,toggleStatus){
    const itemContent=document.createTextNode(todoInput.value)
    const todoItem=document.createElement("div")
    todoItem.dataset["status"]="active"
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
function classToggle(target,newClass,oldClass){
    target.classList.add(newClass)
    target.classList.remove(oldClass)
}
function activeFilter(target){    
    const currentlyActive=filter.querySelector(".chosen")      
    currentlyActive.classList.remove("chosen")
    target.classList.add("chosen")
}
function displayAllItems(items){
    items.forEach((item,i)=>{            
        item.style.display="flex"         
})
}