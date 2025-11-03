const datePicker = document.getElementById("date-picker");
const dateInput = document.getElementById("date-input");
const cancelBtn = document.querySelector(".cancel")
const applyBtn = document.querySelector(".apply")
const dates = document.querySelector(".dates")

let selectedDate = new Date()
let year = selectedDate.getFullYear()
let month = selectedDate.getMonth()

dateInput.addEventListener("click", () => {
    datePicker.hidden = false
})

cancelBtn.addEventListener("click", () => {
    datePicker.hidden = true
})

applyBtn.addEventListener("click", () => {
    datePicker.hidden = true
})


function displayDates() {
    // clear the dates
    dates.innerHTML = ""

    // display the last week of previous month
    // day and months are zero indexed
    // by passing 0 as the last argument of the Date() we are targeting the last day of the prev month
    const lastDayOfPrevMonth = new Date(year, month, 0)


    for (let i = 0; i <= lastDayOfPrevMonth.getDay(); i++) {
        // i = 0 => Sunday
        // (last day of prev month - what day of the week it was) + i to populate the empty days of the calendar
        const text = (lastDayOfPrevMonth.getDate() - lastDayOfPrevMonth.getDay() + i);
        const button = createDatesButton(text, true);
        dates.appendChild(button);
    }

    // display the current month
    const lastDayOfMonth = new Date(year, month + 1, 0)
    for (let i = 1; i <= lastDayOfMonth.getDate(); i++) {
        // i = 1 => cause of days being zero indexed
        const button = createDatesButton(i)
        dates.appendChild(button)
    }


    // display the first week of next month
    const firstDateOfNextMonth = new Date(year, month + 1, 1)
    for (let i = firstDateOfNextMonth.getDay(); i < 7; i++) {
        const text = (firstDateOfNextMonth.getDate() - firstDateOfNextMonth.getDay() + i);
        const button = createDatesButton(text, true)
        dates.appendChild(button)
    }

}

function createDatesButton(text, isDisabled = false, isToday = false) {
    const li = document.createElement("li");
    const button = document.createElement("button");
    button.textContent = text;
    button.disabled = isDisabled;
    button.classList.toggle(".today", isToday);
    li.appendChild(button);
    return li;
}


displayDates()