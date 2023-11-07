const addBtn = document.querySelector(".addBtn");
const todoUl = document.querySelector(".tasks ul");
const inputValue = document.getElementById("input");


/* ==================== date and time =================== */
// const dateTime = document.querySelector(".date-time");
// let year = new Date().getFullYear();
// let month = new Date().getMonth()+1;
// let day = new Date().getDate();
// let date = `${day}/${month}/${year}`;
// let spanDate = document.createElement("span");
// dateTime.appendChild(spanDate);
// spanDate.textContent = date;

// let hour = new Date().getHours();
// let minute = new Date().getMinutes();
// let time = `${hour} : ${minute}`;
// let spanTime = document.createElement("span");
// dateTime.appendChild(spanTime);
// spanTime.textContent = time;
/* ==================== date and time =================== */

addBtn.addEventListener("click",()=>{
    addItem()
})

const addItem = () => {
    if(!inputValue.value){
        Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "The input field cannot be empty.",
    });
    } else {
        let createLi = document.createElement("li");
        createLi.className = "createLi"
        todoUl.appendChild(createLi)
        createLi.innerHTML = `
        <div class="checkbox-wrapper-11">
        <input id="02-11" type="checkbox" name="r" value="2">
        <label for="02-11">${inputValue.value}</label>
        </div>  
        <i style="display:none" class="fa-solid fa-trash-can"></i> `;
        inputValue.value = "";
    }
}
