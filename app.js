const addBtn = document.querySelector(".addBtn");
const todoListul = document.querySelector(".tasks ul");
const inputValue = document.getElementById("input");
//
const checked = document.querySelector(".checked");
const total = document.querySelector(".total");

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

addBtn.addEventListener("click", () => {
	addItem();
});

const addItem = () => {
	if (!inputValue.value) {
		swal();
	} else {
		let createLi = document.createElement("li");
		createLi.className = "createLi";
		todoListul.appendChild(createLi);
		createLi.innerHTML = `
        <div class="checkbox-wrapper-39">
        <label>
         <input type="checkbox"/>
         <span class="checkbox"></span>
         </label>
        </div>
        <span class="todoText">${inputValue.value}</span> <i style="display:none" class="fa-solid fa-trash-can"></i> `;
		inputValue.value = "";
	}
};

todoListul.addEventListener("change", (e) => {
	let li = e.target.closest("li").querySelector(".todoText");
	const removeBtn = e.target.closest("li").querySelector(".fa-trash-can");
	if (e.target.checked) {
		li.style.textDecoration = "line-through";
		removeBtn.style.display = "flex";
	} else if ((e.target = "checkbox-wrapper-39")) {
		li.style.textDecoration = "none";
		removeBtn.style.display = "none";
	}
});

todoListul.addEventListener("click", (e) => {
	let delBtn = e.target.closest("li").querySelector(".fa-trash-can");
	if (e.target == delBtn) {
		let li = e.target.closest("li");
		li.classList.add("exit-animation");
		setTimeout(() => {
			li.remove();
			todoListul.removeChild(li);
		}, 2000);
	}
});

document.querySelector("body").addEventListener("keyup", (e) => {
	if (e.key === "Enter") {
		if (!inputValue.value && !inputValue.classList.contains("empty")) {
			inputValue.focus();
			inputValue.classList.add("empty");
		} else if (
			!inputValue.value &&
			inputValue.classList.contains("empty")
		) {
			swal();
			inputValue.classList.remove("empty");
		} else if (inputValue.value) {
			addItem();
		}
	} else if (e.key === "Delete") {
		del();
	}

});

const swal = () => {
	Swal.fire({
		icon: "error",
		title: "Oops...",
		text: "The input field cannot be empty.",
	});
};

const del = () => {
	let li = document.querySelector(".createLi");
	if (li && !inputValue.value) {
		todoListul.lastElementChild.remove();
	} else {
		Swal.fire({
			position: "center",
			icon: "question",
			title: "There is no task to delete!",
			showConfirmButton: false,
			timer: 500,
		});
	}
}