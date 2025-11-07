class DatePicker {
    constructor(container) {
        this.container = container;
        this.dateInput = container.querySelector(".date-input");
        this.datePicker = container.querySelector(".date-picker");
        this.selectedDate = new Date();
        this.year = this.selectedDate.getFullYear();
        this.month = this.selectedDate.getMonth();
        this.dates = container.querySelector(".dates");
        this.monthInput = container.querySelector(".month-input");
        this.yearInput = container.querySelector(".year-input");
        this.cancelBtn = container.querySelector(".cancel");
        this.applyBtn = container.querySelector(".apply");
        this.nextBtn = container.querySelector("#next-btn");
        this.prevBtn = container.querySelector("#prev-btn");
        this.init();
    }


    init() {
        this.displayDates();
        this.addListeners();
    }


    displayDates() {
        // update year and month with each rerender caused by user input
        this.updateYearMonth();

        // clear the dates
        this.dates.innerHTML = "";

        // display the last week of previous month
        // day and months are zero indexed
        // by passing 0 as the last argument of the Date() we are targeting the last day of the prev month
        const lastDayOfPrevMonth = new Date(this.year, this.month, 0);


        for (let i = 0; i <= lastDayOfPrevMonth.getDay(); i++) {
            // i = 0 => Sunday
            // (last day of prev month - what day of the week it was) + i to populate the empty days of the calendar
            const text = lastDayOfPrevMonth.getDate() - lastDayOfPrevMonth.getDay() + i;
            const button = this.createDatesButton(text, true);
            this.dates.appendChild(button)
        }

        // display the current month
        const lastDayOfMonth = new Date(this.year, this.month + 1, 0);
        for (let i = 1; i <= lastDayOfMonth.getDate(); i++) {
            // i = 1 => cause of days being zero indexed
            const button = this.createDatesButton(i, false)
            button.addEventListener("click", this.handleDateClick)
            this.dates.appendChild(button);
        }

        // display the first week of next month
        const firstDateOfNextMonth = new Date(this.year, this.month + 1, 1);
        for (let i = firstDateOfNextMonth.getDay(); i < 7; i++) {
            const text = firstDateOfNextMonth.getDate() - firstDateOfNextMonth.getDay() + i;
            const button = this.createDatesButton(text, true)
            this.dates.appendChild(button);
        }
    }

    addListeners() {
        this.dateInput.addEventListener("click", () => this.datePicker.hidden = false);
        this.cancelBtn.addEventListener("click", () => this.datePicker.hidden = true);
        this.applyBtn.addEventListener("click", () => this.applyDate());
        this.nextBtn.addEventListener("click", () => this.nextMonth());
        this.prevBtn.addEventListener("click", () => this.prevMonth());
        this.monthInput.addEventListener("change", () => {
            this.month = this.monthInput.selectedIndex;
            this.displayDates();
        });
        this.yearInput.addEventListener("change", () => {
            this.year = this.yearInput.value;
            this.displayDates();
        });

        document.addEventListener("keydown", (e) => {
            if (e.key === "Escape" && !this.datePicker.hidden) {
                this.datePicker.hidden = true;
            }
        });
    }


    applyDate() {
        // the output is an object and needs to be formatted
        this.dateInput.value = this.selectedDate.toLocaleDateString("en-US", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
        });

        this.datePicker.hidden = true;
    }

    nextMonth() {
        if (this.month === 11) this.year++;
        this.month = (this.month + 1) % 12;
        this.displayDates();
    }

    prevMonth() {
        if (this.month === 0) this.year--;
        this.month = (this.month - 1 + 12) % 12;
        this.displayDates();
    }

    updateYearMonth() {
        // it's a select input and we can change the index of the option
        this.monthInput.selectedIndex = this.month;

        this.yearInput.value = this.year;
    }

    // HAS TO BE AN ARROW FUNCTION TO INHERIT "THIS" SCOPE FROM IT'S PARENT. OTHERWISE WE WOULD GET UNDEFINED ERROR FOR RETRIEVING "SELECTED" ELEMENT.
    // WE CAN KEEP THIS LIKE NORMAL METHOD AND USE IT LIKE button.addEventListener("click", (e) => this.handleDateClick(e)); WHEN ADDING EVENTLISTENER TO THE BUTTON ELEMENT
    handleDateClick = (e) => {
        const button = e.target;
        const selected = this.dates.querySelector(".selected");

        selected && selected.classList.remove("selected");
        button.classList.add("selected");
        this.selectedDate = new Date(this.year, this.month, parseInt(button.textContent));
    }

    createDatesButton(text, isDisabled = false) {
        const currentDate = new Date();
        const isToday =
            currentDate.getDate() === text &&
            currentDate.getFullYear() === this.year &&
            currentDate.getMonth() === this.month;

        const li = document.createElement("li");
        const button = document.createElement("button");
        button.textContent = text;
        button.disabled = isDisabled;
        button.classList.toggle("today", isToday);

        li.appendChild(button);
        return li;
    }
}

document.querySelectorAll('.date-picker-container')
    .forEach(container => new DatePicker(container));
