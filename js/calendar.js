/*
***********************************
***********************************

FUNCTIONS DEFINITIONs

***********************************
***********************************
*/



//function to get an array of dates between two given days
//the function return an array where each elements is a full Date type
//WARNING!!! The function changes the start jsDate
let getDaysArray = function(start, end) {
    for(var arr=[],dt=start; dt<=end; dt.setDate(dt.getDate()+1)){
        arr.push(new Date(dt));
    }
    return arr;
};

//function to get the number of Week Day for current practice days {Tue, Thu, Fri} (e.g. index of Tue is 0 converted to 2)
let practiceIndex = (index) => {
    switch(index) {
        case 0:
          return 2;
        case 1:
            return 4;
        case 2:
            return 5;
      }
};

//function to check if the year is leap or not
let leapyear = year => {
    return (year % 100 === 0) ? (year % 400 === 0) : (year % 4 === 0);
}

//function to calculate the day "value".
//the function takes in NUMBERS
let dayValue = (year, month, day) => {
    let yearDays = 365;
    let monthDays = 30;
    month = month - 1;
    if(leapyear(year)){
        yearDays = 366;
    }
    if(leapyear(year) && month == 2){
        monthDays = 29;
    } else if(month == 2){
        monthDays = 28;
    }
    if(month == 1 || month == 3 || month == 5 || month == 7 || month == 8 || month == 10 || month == 12){
        monthDays = 31;
    }
    return year * yearDays + month * monthDays + day;
};

//function to find out the day of the week
let dayOfWeek = (year, month, day) =>{
    let date = new Date(year, month - 1, day);
    date = date.getDay();
    let week = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];
    return week[date - 1];
};

//function to create a day object in proper format based on given date (year, month, day) all values given in pure number format
let dayObject = (yearIN, monthIN, dayIN) => {
    let day = {
        year: yearIN,
        month: monthIN,
        day: dayIN
    };
    day = {
        year: day.year,
        month: day.month,
        day: day.day,
        value: dayValue(day.year, day.month, day.day),
        dayOfTheWeek: dayOfWeek(day.year, day.month, day.day),
        jsDate: new Date(day.year, day.month - 1, day.day)
    };
    return day;
};

//function to create a day object in proper format based on javascript Date object
let dayObjectJs = (date) => {
    let day = {
        year: date.getUTCFullYear(),
        month: date.getUTCMonth() + 1,
        day: date.getUTCDate()
    };
    day.value = dayValue(day.year, day.month, day.day);
    day.dayOfTheWeek = dayOfWeek(day.year, day.month, day.day);
    day.jsDate = new Date(day.year, day.month - 1, day.day);
    return day;
};

//function to find all specific days of the week between two dates (e.g. all Tuesdays between two dates)
//start and end are javascript dates; weekDay is the number of day in the week 1-7 (where 1 = Monday, 7 = Sunday)
let allSpecificDays = (start, end, weekDay) => {
    let arrayIN = getDaysArray(start, end);
    let arrayOUT = [];
    arrayIN.forEach( (day) => {
        if(day.getDay() == weekDay){
            day = dayObjectJs(day);
            arrayOUT.push(day);
        }
    });
    return arrayOUT;
};

//function to add new days to practiceDays array
let addPracticeDays = (day) => {
    let repeated = false;
    practiceDays.forEach( (practiceDay) => {
        if(day.value == practiceDay.value){repeated = true}
    });
    if (!repeated){
        practiceDays = practiceDays.concat(day);
        practiceDays = practiceDays.sort(function(a, b){return a.value - b.value});
    }
};

//function to delete a specific practice day from practiceDays array by its value
let deletePracticeDay = (dayIN) => {
    let index;
    practiceDays.forEach( (day, indexCallBack) => {
        if(day.value == dayIN.value){
            index = indexCallBack;
        }
    });
    practiceDays.splice(index, 1);
};

//function to print the skipCertainDays array to the ul list
let printSkipDays = () => {
    let ul = document.querySelector("div.genPracticeDays form.genPracticeDays ul");
    ul.innerHTML = "";
    skipCertainDays.forEach( (day) => {
        //ul.innerHTML += `<li data-value="${day.value}">${day.month}-${day.day}-${day.year}<span class="removeSkip">&times</span></li>`;
        ul.innerHTML += `<li data-value="${day.value}">${day.jsDate.toLocaleDateString("en-US")}<span class="removeSkip">&times</span></li>`;
    });
};

//function to display all practice days in the calendar by making .practice class active
let togglePracticeDays = () => {
    let calendar = document.querySelectorAll("div.responsive-calendar div.day a");
    calendar.forEach( (element) => {
        let day = element.getAttribute("data-day");
        let month = element.getAttribute("data-month");
        let year = element.getAttribute("data-year");
        let present = false;
        practiceDays.forEach( (dayIN) => {
            if(day == dayIN.day && month == dayIN.month && year == dayIN.year){
                element.classList.add("practice");
                present = true;
            }
        });
        if(!present){
            element.classList.remove("practice");
        }
    });
};


/*
***********************************
***********************************

END OF FUNCTIONS DEFINITIONS

***********************************
***********************************
*/



//array of objects to store days
let practiceDays = [];

//variable for the first and last practice days
//TODO: let admin be able to modify these days
let firstPracticeDay = dayObject(2020, 01, 07);

const lastPracticeDay = dayObject(2020, 04, 30);


/*
***********************************
***********************************

THE PROGRAM

***********************************
***********************************
*/

//array of allowed practice days (e.g. Tuesday, Thursday, Friday)
let allowedDays = ["tue", "thu", "fri"];



//listen to checkboxes for regular practice days and add these days to general practice array
document.querySelectorAll("form.genPracticeDays input[name='days']").forEach((day, index) => {
    day.addEventListener("change", (event) => {
        event.stopPropagation();
        if(day.checked){
            let dayChecked = event.target.parentElement.innerText;
            dayChecked = dayChecked.toLowerCase();
            let weekDays = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];
            dayChecked = weekDays.indexOf(dayChecked) + 1;
            let firstDay = new Date(firstPracticeDay.year, firstPracticeDay.month - 1, firstPracticeDay.day);
            let lastDay = new Date(lastPracticeDay.year, lastPracticeDay.month - 1, lastPracticeDay.day);
            let array = allSpecificDays(firstDay, lastDay, dayChecked);
            array.forEach(addPracticeDays);
            togglePracticeDays();
        }else{
            let firstDay = new Date(firstPracticeDay.year, firstPracticeDay.month - 1, firstPracticeDay.day);
            let lastDay = new Date(lastPracticeDay.year, lastPracticeDay.month - 1, lastPracticeDay.day);
            let array = allSpecificDays(firstDay, lastDay, practiceIndex(index));
            array.forEach(deletePracticeDay);
            togglePracticeDays();
        }
    });
});

//variable to store specific days user wants to skip
let skipCertainDays = [];

//Skip certain practice days (e.g. exam, etc.) - from the options menu
document.getElementById("addSkipDays").addEventListener("click", (event) => {
    event.stopPropagation();
    const input = document.querySelector("form.genPracticeDays input[type=date]");
    let dayToSkip = dayObjectJs(input.valueAsDate);
    let repeated = false;
    skipCertainDays.forEach(day => {
        if(day.value == dayToSkip.value){
            repeated = true;
        }
    });
    if(!repeated && input.value !="" && dayObjectJs(new Date()).value <= dayToSkip.value){
        let i = -1;
        practiceDays.forEach( (day, index) => {
            if(day.value == dayToSkip.value){
                skipCertainDays.push(dayToSkip);
                skipCertainDays = skipCertainDays.sort(function(a, b){return a.value - b.value});
                printSkipDays();
                input.value = "";
                i = index;
                practiceDays.splice(index, 1);
                togglePracticeDays();
            }
        });
        if(i == -1){
            alert("This day is not a part of your practice schedule");
        }
    }
});

//listen to clicking on the red cross to delete an element of skipCertainDays
document.querySelector("form.genPracticeDays").addEventListener("click", (event) => {
    event.stopPropagation();
    if(event.target.tagName == "SPAN" && event.target.className == "removeSkip"){
        skipCertainDays.forEach((day, index) => {
            if(day.value == event.target.parentElement.getAttribute("data-value")){
                addPracticeDays(dayObjectJs(day.jsDate));
                skipCertainDays.splice(index, 1);
                printSkipDays();
                togglePracticeDays();
            }
        });
        event.target.parentElement.remove();
    }
});

//listen to clicking on a day in calendar and add/drop practice day
document.querySelector("div.responsive-calendar").addEventListener("click", (event) => {
    event.stopPropagation();
    console.log(event.target.parentElement.classList);
    if(event.target.tagName == "A" && event.target.parentElement.classList.contains("day") && (event.target.parentElement.classList.contains(""))){
        console.log("sun");
        event.target.classList.toggle("practice");
        let day = dayObject(Number(event.target.getAttribute("data-year")), Number(event.target.getAttribute("data-month")), Number(event.target.getAttribute("data-day")));
        if(event.target.classList.contains("practice")){
            addPracticeDays(day);
        }else{
            deletePracticeDay(day);
        }
    }
});
