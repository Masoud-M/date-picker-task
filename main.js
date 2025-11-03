const datePicker = document.getElementById("date-picker");
const dateInput = document.getElementById("date-input");
const yearInput = document.getElementById("year-input")
const monthInput = document.getElementById("month-input")
const cancelBtn = document.querySelector(".cancel")
const applyBtn = document.querySelector(".apply")
const dates = document.querySelector(".dates")
const nextBtn = document.getElementById("next-btn")
const prevBtn = document.getElementById("prev-btn")

let selectedDate = new Date()
let year = selectedDate.getFullYear()
let month = selectedDate.getMonth()

dateInput.addEventListener("click", () => {
    datePicker.hidden = false;
})

cancelBtn.addEventListener("click", () => {
    datePicker.hidden = true;
})

applyBtn.addEventListener("click", () => {
    // the output is an object and needs to be formatted
    dateInput.value = selectedDate.toLocaleDateString("en-US", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
    });

    datePicker.hidden = true;
})


nextBtn.addEventListener("click", () => {
    if (month === 11) year++;
    month = (month + 1) % 12;
    displayDates();
})

prevBtn.addEventListener("click", () => {
    if (month === 0) year--;
    month = (month + 1 + 12) % 12;
    displayDates();
})

monthInput.addEventListener("change", () => {
    month = monthInput.selectedIndex;
    displayDates();
})

yearInput.addEventListener("change", () => {
    year = yearInput.value;
    displayDates();
})

function updateYearMonth() {
    // it's a select input and we can change the index of the option
    monthInput.selectedIndex = month;

    yearInput.value = year;
}


function handleDateClick(e) {
    const button = e.target

    const selected = dates.querySelector(".selected")
    selected && selected.classList.remove("selected")

    button.classList.add("selected")

    selectedDate = new Date(year, month, parseInt(button.textContent))
}


function displayDates() {
    // update year and month with each rerender caused by user input
    updateYearMonth()

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

        const button = createDatesButton(i, false)
        button.addEventListener("click", handleDateClick)
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

function createDatesButton(text, isDisabled = false) {
    const currentDate = new Date();

    const isToday = currentDate.getDate() === text && currentDate.getFullYear() === year && currentDate.getMonth() === month;

    const li = document.createElement("li");
    const button = document.createElement("button");
    button.textContent = text;
    button.disabled = isDisabled;
    button.classList.toggle("today", isToday);

    li.appendChild(button);
    return li;
}


displayDates()