var TodoApp = (function() {
	let listitems = JSON.parse(localStorage.getItem('todoitem')) || [];
	document.getElementById('count').innerHTML = parseInt(
		localStorage.getItem('count')
	)
		? parseInt(localStorage.getItem('count'))
		: 0;
	var formExecution = function() {
		let element = document.querySelector('form');
		element.addEventListener('submit', event => {
			event.preventDefault();
			addNewTodoitem();
		});
	};
	//BEFORE STARTING ADDING YOUR TODOS, LET CHECK IF THERE IS ANY EXISTING TODO
	var fetchExistingtodoList = function() {
		let todoul = document.getElementById('todoul');
		var storedTodoItems = JSON.parse(localStorage.getItem('todoitem'));
		if (!!storedTodoItems && typeof storedTodoItems == 'object') {
			storedTodoItems.forEach(element => {
				let li = document.createElement('li');
				let deletetod = document.createElement('span');
				deletetod.setAttribute('class', 'deleteicon');
				li.innerHTML = element.data;
				deletetod.setAttribute('data-id', element.id);
				li.appendChild(deletetod);
				todoul.appendChild(li);
			});
		}
		removeTodoitem();
		formExecution();
	};
	//ADD NEW TODO ITEM
	var addNewTodoitem = function() {
		let count = parseInt(localStorage.getItem('count')) + 1 || 1;
		let todoul = document.getElementById('todoul');
		let litag = document.createElement('li');
		let deletetodo = document.createElement('span');
		deletetodo.setAttribute('class', 'deleteicon');
		let inputtext = document.getElementById('todoinput').value;
		if (inputtext !== '') {
			litag.innerHTML += inputtext;
			deletetodo.setAttribute('data-id', count);
			listitems.push({ data: inputtext, id: count });
			localStorage.setItem('todoitem', JSON.stringify(listitems));
			localStorage.setItem('count', count++);
			litag.appendChild(deletetodo);
			todoul.appendChild(litag);
			document.getElementById('count').innerHTML = parseInt(
				localStorage.getItem('count')
			);
			document.querySelector('#todoinput').value = '';
		} else {
			return false;
		}
		removeTodoitem();
	};
	//REMOVE TODO
	var removeTodoitem = function() {
		let todolist = JSON.parse(localStorage.getItem('todoitem'));
		let ultodo = document.querySelector('#todoul');
		var allListitems = Array.from(
			document.querySelectorAll('#todoul>li>span')
		);
		allListitems.forEach((element, index) => {
			element.addEventListener('click', function(e) {
				ultodo.removeChild(this.parentNode);
				updateLocalStorage(parseInt(element.getAttribute('data-id')));
			});
		});
	};
	//UPDATE THE LOCAL STORAGE
	var updateLocalStorage = function(num) {
		let count = parseInt(localStorage.getItem('count'));
		let todolist = JSON.parse(localStorage.getItem('todoitem'));
		todolist.forEach((element, index) => {
			if (element.id == num) {
				listitems.splice(index, 1);
				localStorage.setItem('todoitem', JSON.stringify(listitems));
				count = count - 1;
				localStorage.setItem('count', count);
				document.getElementById('count').innerHTML = parseInt(
					localStorage.getItem('count')
				);
			}
		});
	};
	return {
		initialize: fetchExistingtodoList
	};
})();

TodoApp.initialize();
TodoApp.fetchExistingtodoList;
