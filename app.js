const dateTime = document.querySelector(".date-time");
const inputField = document.getElementById("input");
const addBtn = document.querySelector(".addBtn");
const unordered = document.querySelector(".tasks ul");
const done = document.querySelector(".done");
const checked = document.querySelector(".checked");
const total = document.querySelector(".total");

/* ==================== date and time =================== */
let year = new Date().getFullYear();
let month = new Date().getMonth();
let day = new Date().getDay();
let date = `${day}/${month}/${year}`;
let spanDate = document.createElement("span");
dateTime.appendChild(spanDate);
spanDate.textContent = date;

let hour = new Date().getHours();
let minute = new Date().getMinutes();
let time = `${hour} : ${minute}`;
let spanTime = document.createElement("span");
dateTime.appendChild(spanTime);
spanTime.textContent = time;
/* ==================== date and time =================== */

let checkedTask = 0;
let totalTask = 0;
addBtn.addEventListener("click", () => {
	if (!inputField.value) {
		alert("Please enter a task to do!");
	} else {
		++totalTask;
		/* ====================== variables ===================== */
		let listItem = document.createElement("li");
		let checkDiv = document.createElement("div");
		let checked = document.createElement("i");
		let spanTask = document.createElement("span");
		let spanExit = document.createElement("i");

		/* ===================== clas names ===================== */
		spanExit.className = "fa-regular fa-circle-xmark";
		listItem.className = "list-item";
		checked.className = "fa-regular fa-circle";
		checkDiv.className = "checkDiv";
		/* ===================== add childs ===================== */
		unordered.appendChild(listItem);
		listItem.appendChild(checkDiv);
		checkDiv.appendChild(checked); //circle
		checkDiv.appendChild(spanTask); //task
		listItem.appendChild(spanExit); // delete btn
		spanTask.textContent = inputField.value;
		inputField.value = "";
		checked.addEventListener("click", () => {
			if (spanTask.style.textDecoration === "line-through") {
				--checkedTask;
				spanTask.style.textDecoration = "none";
				checked.className = "fa-regular fa-circle";
			} else {			
				spanTask.style.textDecoration = "line-through";
				checked.className = "fa-regular fa-circle-check";
                ++checkedTask;
			}
		});
		spanExit.addEventListener("click", () => {
			listItem.classList.add("exit-animation");
			setTimeout(() => {
				listItem.remove();
			}, 1000);
			totalTask--;
		});
	}
	checked.innerHTML = checkedTask;
	total.innerHTML = totalTask;
});
