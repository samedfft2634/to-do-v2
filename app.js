const addBtn = document.querySelector(".addBtn");
const todoListul = document.querySelector(".tasks ul");
const inputValue = document.getElementById("input");
//
const createLi = document.querySelectorAll(".createLi");

let todos = [];

/* ==================== date and time =================== */
const dateTime = document.querySelector(".date-time");
let year = new Date().getFullYear();
let month = new Date().getMonth() + 1;
let day = new Date().getDate();
let date = `${day}/${month}/${year}`;
let spanDate = document.createElement("span");
dateTime.appendChild(spanDate);
spanDate.textContent = date;

// let hour = new Date().getHours();
// let minute = new Date().getMinutes();
// let time = `${hour} : ${minute}`;
// let spanTime = document.createElement("span");
// dateTime.appendChild(spanTime);
// spanTime.textContent = time;
/* ==================== date and time =================== */

const addItem = (e) => {
	if (!inputValue.value.trim()) {
		swal();
	} else if (
		todos.some(
			(todo) => todo.text === inputValue.value.trim().toLowerCase()
		)
	) {
		Swal.fire({
			icon: "warning",
			title: "Duplicate Task",
			text: "This task already exists!",
		});
	} else {
		let createLi = document.createElement("li");
		createLi.className = "createLi";
		todoListul.appendChild(createLi);
		createLi.innerHTML = `
		<div class="checkbox-wrapper-39">
	  <label>
		<input type="checkbox"  class ="checkbx" />
		<span class="checkbox"></span>
	  </label>
	</div>
	   <span class="todoText">${inputValue.value}</span> <i id="remove" style="display:none" class="fa-solid fa-trash-can"></i>  `;
		if ((e.target = "fa-plus")) {
			todos.push({
				text: inputValue.value,
				cheq: false,
				line: false,
				trash: false,
			});
			localStorage.setItem("todos", JSON.stringify(todos));
			inputValue.value = "";
		}
	}
};
addBtn.addEventListener("click", addItem);

//
todoListul.addEventListener("change", (e) => {
	if (e.target.classList.contains("checkbx")) {
		const liElement = e.target.closest("li");
		const liText = liElement.querySelector(".todoText");
		const removeBtn = liElement.querySelector(".fa-trash-can");

		const index = Array.from(todoListul.children).indexOf(liElement);

		todos[index].line = e.target.checked;
		todos[index].trash = e.target.checked;

		if (e.target.checked) {
			liText.style.textDecoration = todos[index].line
				? "line-through"
				: "none";
			liText.style.color = "gray";
			removeBtn.style.display = todos[index].trash ? "flex" : "none";
			removeBtn.style.cursor = "pointer";
			todos[index].cheq = true;
		} else {
			liText.style.color = "rgb(247, 226, 223)";
			liText.style.textDecoration = todos[index].line
				? "none"
				: "line-through";
			liText.style.textDecoration = "none";
			removeBtn.style.display = todos[index].trash ? "flex" : "none";
			todos[index].cheq = false;
		}
	}
	localStorage.setItem("todos", JSON.stringify(todos));
});

todoListul.addEventListener("click", (e) => {
	const removeLi = e.target.closest("li");
	if (e.target.id === "remove") {
		const index = Array.from(todoListul.children).indexOf(removeLi);
		todos.splice(index, 1);
		removeLi.remove();
	}
	localStorage.setItem("todos", JSON.stringify(todos));
});

document.querySelector("body").addEventListener("keyup", (e) => {
	inputValue.focus()
	if (e.key === "Enter") {
		addItem(e);
	} 
});

const swal = () => {
	Swal.fire({
		position: "center",
		icon: "warning",
		title: "The input field cannot be empty!",
		showConfirmButton: false,
		timer: 1100
	  });
};


// const del = () => {
// 	let li = document.querySelector(".createLi");
// 	if (li && !inputValue.value) {
// 		todoListul.lastElementChild.remove();
// 	} else {
// 		Swal.fire({
// 			position: "center",
// 			icon: "question",
// 			title: "There is no task to delete!",
// 			showConfirmButton: false,
// 			timer: 500,
// 		});
// 	}
// };

function showList() {
	const savedTodos = localStorage.getItem("todos", todos);
	if (savedTodos) {
		todos = JSON.parse(savedTodos);
		todos.forEach((todoItem) => {
			const li = document.createElement("li");
			li.className = "createLi";
			li.innerHTML = `
		<div class="checkbox-wrapper-39">
		<label>
		  <input type="checkbox" class ="checkbx" ${todoItem.cheq ? "checked" : ""} />
		  <span class="checkbox" "></span>
		</label>
	  </div>
		 <span class="todoText" style="text-decoration:${
				todoItem.line ? "line-through" : "none"
			} ">
		 ${todoItem.text}</span> <i id="remove" style="display: ${
				todoItem.trash ? "flex" : "none"
			}" class="fa-solid fa-trash-can"></i>`;
			todoListul.appendChild(li);
		});
	}
}
showList();