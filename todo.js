const todoInput = document.querySelector('.txt');
const todoDisplay = document.querySelector('.task');
const inProgress = document.querySelector('.inprogress');
const container = document.querySelector('.container');
const enterSound = new Audio('./sounds/coin.wav');
enterSound.preload = 'auto';
const cancelSound = new Audio('./sounds/cancel.wav');
cancelSound.preload = 'auto';
const checkSound = new Audio('./sounds/objectiveComplete.wav');
checkSound.preload = 'auto';
const timerSound = new Audio('./sounds/select.wav');
timerSound.preload = 'auto';

//event listeners
document.addEventListener("DOMContentLoaded", getTodos)
todoInput.addEventListener('keypress', function(e) {
	if (e.key === 'Enter' && todoInput.value != '') {
		enterSound.play();
		addTodo(todoInput.value);
	}
});
inProgress.addEventListener('click', completeTodo);
container.addEventListener('click', changeTodo);
//Functions

function addTodo(value) {
	const todoDiv = document.querySelector('.notcomp');
	const newDiv = document.createElement('div');
	const newTodo = document.createElement('p');
	newTodo.innerText = value;
	newDiv.classList.add('task');
	newDiv.innerHTML += `<i class="fas fa-trash-alt"></i>
            <i class="fas fa-check"></i>
            <i class="fa-solid fa-stopwatch"></i>`;
	todoDiv.appendChild(newDiv);
	newDiv.appendChild(newTodo);
	saveLocalTodos(value);
	todoInput.value = '';
}

function changeTodo(e) {
	const item = e.target;
	const state = item.parentElement.parentElement.classList;
if (item.classList[0] === 'task'){
	if(item.innerHTML.includes('angles-up')){

			const a = item.querySelector('.fa-angles-up')
			a.remove()
				item.innerHTML +=`<i class="less-urgent fa-solid fa-angle-up"></i>`
}
else if(item.innerHTML.includes('angle-up')){

			const a = item.querySelector('.fa-angle-up')
			a.remove()
				item.innerHTML +=`<i class=" fa-solid fa-angles-down"></i>`
}
else if(item.innerHTML.includes('angles-down')){

			const a = item.querySelector('.fa-angles-down')
			a.remove()
				item.innerHTML +=`<i class=" fa-solid fa-angle-down"></i>`
}
else if(item.innerHTML.includes('angle-down')){

			const a = item.querySelector('.fa-angle-down')
			a.remove()
}

	else{
	item.innerHTML +=`<i class=" fa-solid fa-angles-up"></i>`
	}
}
	if (item.classList[1] === 'fa-trash-alt') {
		const todo = item.parentElement;
		todo.classList.add('fall');
		removeLocalTodos(todo);
		cancelSound.play();
		todo.addEventListener('transitionend', (e) => {
			todo.remove();
		});
	}
	if (item.classList[1] === 'fa-stopwatch' && state != 'completed' && state != 'inprogress') {
		timerSound.play();
		const todo = item.parentElement;
		document.querySelector('.inprogress').appendChild(todo);
		const timerVariable = setInterval(countUpTimer, 1000);
		


	}
	if (item.classList[1] === 'fa-check' && state == 'notcomp') {
		checkSound.play();
		const todo = item.parentElement;
		document.querySelector('.completed').appendChild(todo);
	}
	if (item.classList[1] === 'fa-check' && state == 'completed') {
		checkSound.play();
		const todo = item.parentElement;
		document.querySelector('.notcomp').appendChild(todo);
	}
	if (item.classList[1] === 'fa-check' && state == 'inprogress') {
		checkSound.play();
		const todo = item.parentElement;
		document.querySelector('.completed').appendChild(todo);
	}
}

function completeTodo(e) {}
function saveLocalTodos(todo) {
let todos;
if (localStorage.getItem("todos")=== null){
    todos = []
} else {
    todos = JSON.parse(localStorage.getItem("todos"))
}
todos.push(todo)
localStorage.setItem("todos", JSON.stringify(todos))
}
function removeLocalTodos(todo) {
    let todos;
    if (localStorage.getItem("todos")=== null){
    todos = []
} else {
    todos = JSON.parse(localStorage.getItem("todos"))
}
console.log(todo)
const todoIndex = todo.children[3].innerText
todos.splice(todos.indexOf(todoIndex),1)
localStorage.setItem("todos",JSON.stringify(todos))

}

function getTodos() {
     let todos;
    if (localStorage.getItem("todos")=== null){
    todos = []
} else {
    todos = JSON.parse(localStorage.getItem("todos"))
}
todos.forEach(function(todo){
    const todoDiv = document.querySelector('.notcomp');
	const newDiv = document.createElement('div');
	const newTodo = document.createElement('p');
	//const text = document.createTextNode(value)
	newTodo.innerText = todo;
	newDiv.classList.add('task');
	newDiv.innerHTML += `<i class="fas fa-trash-alt"></i>
            <i class="fas fa-check"></i>
            <i class="fa-solid fa-stopwatch"></i>`;
	todoDiv.appendChild(newDiv);
	newDiv.appendChild(newTodo);

})
}
let totalSeconds = 0;
function countUpTimer() {
  ++totalSeconds;
  let hour = Math.floor(totalSeconds / 3600);
  let minute = Math.floor((totalSeconds - hour * 3600) / 60);
  let seconds = totalSeconds - (hour * 3600 + minute * 60);
  document.getElementsByClassName("inprogress").innerHTML = hour + ":" + minute + ":" + seconds;
  console.log(totalSeconds)
}