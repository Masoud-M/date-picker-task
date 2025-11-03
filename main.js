const datePicker = document.getElementById("date-picker");
const dateInput = document.getElementById("date-input");
const cancelBtn = document.querySelector(".cancel")
const applyBtn = document.querySelector(".apply")

dateInput.addEventListener("click", () => {
    datePicker.hidden = false
})

cancelBtn.addEventListener("click", () => {
    datePicker.hidden = true
})

applyBtn.addEventListener("click", () => {
    datePicker.hidden = true
})