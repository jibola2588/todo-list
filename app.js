
let clear = document.querySelector('.clear');
let dateElement = document.getElementById('date');
let list = document.getElementById('list');
let input = document.getElementById('input');


let check = 'fa-check-circle';
let uncheck = 'fa-circle-thin';
let line_through = 'lineThrough';


let List,id;


let data = localStorage.getItem("Too");
if(data){
    List = JSON.parse(data);
    id = List.length;
    loadTodo(List);
}else{
List = [];
id = 0;
}

function loadTodo(array){
       array.forEach(function(item){
           addTodo(item.name,item.id,item.done,item.trash);
    });
};

clear.addEventListener('click',function(){
    localStorage.clear();
    location.reload();
})


let options = {
    weekday:'long',
    month:'short',
    day:'numeric'
}
let today = new Date();
dateElement.innerHTML = today.toLocaleDateString('en-us',options);


//1
function addTodo(todo,done,id,trash){
    if(trash) return;

    let Done = done ? check : uncheck;
    let line = done ? line_through : '';

    let item = `<li class="item">
             <i class="fa ${Done} co" job="complete" id="${id}"></i>
         <p class="text ${line}">${todo}</p>
             <i class="fa fa-trash-o de" job="delete" id="${id}"></i>
         </li>`;
let position = 'beforeend';
list.insertAdjacentHTML(position,item)
}

//2
input.addEventListener("keyup",function(event){
    if(event.keyCode == 13){
        let todo = input.value;

        if(todo){
            addTodo(todo,id,false,false);
            List.push({
                name:todo,
                id:id,
                done:false,
                trash:false
            });
            console.log(todo)
           localStorage.setItem("Todo",JSON.stringify(List));
               id++;
        }
     
        input.value ='';
    }
});


function completeTodo(element){
    element.classList.toggle(check);
    element.classList.toggle(uncheck);
    element.parentNode.querySelector('.text').classList.toggle(line_through);
     List[element.id].done = List[element.id].done ? false : true;
}

function removeTodo(element){
    element.parentNode.parentNode.removeChild(element.parentNode);
    List[element.id].trash = true;

}

list.addEventListener('click',function(event){
    let element = event.target;
    let elementJob = element.attributes.job.value;
    if(elementJob == 'complete'){
        completeTodo(element)
    }else if(elementJob == 'delete'){
        removeTodo(element)
    }
    localStorage.setItem('todo',JSON.stringify(List));
    sessionStorage.setItem('todo',JSON.stringify(List));
})