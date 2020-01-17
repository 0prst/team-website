window.onload = () => {
//portion of code for the settings panel

//add certain days for skipping
document.getElementById("addSkipDays").addEventListener("click", () => {
    let x = document.querySelector("form.genPracticeDays input[type='date']");
    if(x.value){
        let yearx = x.value.slice(0, x.value.indexOf("-"));
        x = x.value.slice(x.value.indexOf("-") + 1, x.value.length);
        let monthx = x.slice(0, x.indexOf("-"));
        x = x.slice(x.indexOf("-") + 1, x.length);
        let dayx = x.slice(0, x.length);
        let yearLeap = 365;
        let yearxx = yearx;
        yearx = Number(yearx);
        let monthLeap = 28;
        if(yearx % 400 == 0){yearLeap = 366; monthLeap = 29}else{if(yearx % 100 == 0){yearLeap = 365}else if(yearx % 4 == 0){yearLeap = 366; monthLeap = 29}}
        monthDays = 30;
        if(Number(monthx) == 2){monthDays = monthLeap}
        if(Number(monthx) == 1 || Number(monthx) == 3 || Number(monthx) == 5 || Number(monthx) == 7 || Number(monthx) == 8 || Number(monthx) == 10 || Number(monthx) == 12){monthDays = 31}
        let comparison = yearx * yearLeap + Number(monthx) * monthDays + Number(dayx);
        let repeated = false;
        for(i = 0; i < skipCertainDays.length; i++){
            if (skipCertainDays[i].comparison == comparison){repeated = true}
        }
        if(!repeated){
            skipCertainDays.push(
                {
                    year: yearxx,
                    month: monthx,
                    day: dayx,
                    comparison: yearx * yearLeap + Number(monthx) * monthDays + Number(dayx)
                }
            )
            skipCertainDays.sort(function(a, b){return a.comparison - b.comparison});
        }
        //print the array of dates to the html
        printSkipDays();
    }else{
        alert("Input the date");
    }
});

//toggle class for regular practice days
document.querySelectorAll("form.genPracticeDays input[name='days']")[0].addEventListener("change", () =>{
    let x = document.querySelectorAll(".tue a");
    if(document.querySelectorAll("form.genPracticeDays input[name='days']")[0].checked){
        for(i = 0; i < x.length; i++){
            if(x[i]==document.querySelector(".today a")){
                x[i].classList.add("practiceToday");
            }else{
                x[i].classList.add("practice");
            }
        }
    }else{
        for(i = 0; i < x.length; i++){
            if(x[i]==document.querySelector(".today a")){
                x[i].classList.remove("practiceToday");
            }else{
                x[i].classList.remove("practice");
            }
        }
    }
});

document.querySelectorAll("form.genPracticeDays input[name='days']")[1].addEventListener("change", () =>{
    let x = document.querySelectorAll(".thu a");
    if(document.querySelectorAll("form.genPracticeDays input[name='days']")[1].checked){
        for(i = 0; i < x.length; i++){
            if(x[i]==document.querySelector(".today a")){
                x[i].classList.add("practiceToday");
            }else{
                x[i].classList.add("practice");
            }
        }
    }else{
        for(i = 0; i < x.length; i++){
            if(x[i]==document.querySelector(".today a")){
                x[i].classList.remove("practiceToday");
            }else{
                x[i].classList.remove("practice");
            }
        }
    }
});

document.querySelectorAll("form.genPracticeDays input[name='days']")[2].addEventListener("change", () =>{
    let x = document.querySelectorAll(".fri a");
    if(document.querySelectorAll("form.genPracticeDays input[name='days']")[2].checked){
        for(i = 0; i < x.length; i++){
            if(x[i]==document.querySelector(".today a")){
                x[i].classList.add("practiceToday");
            }else{
                x[i].classList.add("practice");
            }
        }
    }else{
        for(i = 0; i < x.length; i++){
            if(x[i]==document.querySelector(".today a")){
                x[i].classList.remove("practiceToday");
            }else{
                x[i].classList.remove("practice");
            }
        }
    }
});

//add toggle practice by clicking on day in calendar
for(i = 0; i < document.querySelectorAll("div.days div.day a").length; i++){
    document.querySelectorAll("div.days div.day a")[i].addEventListener("click", togglePractice(i));
}


//closing bracket for window.onload
};



var skipCertainDays = [];

function printSkipDays(){
    let list = document.querySelector("form.genPracticeDays ul");
    list.innerHTML = "";
    for(i = 0; i < skipCertainDays.length; i++){
        list.innerHTML = list.innerHTML + "<li>"+ skipCertainDays[i].month + "-" + skipCertainDays[i].day + "-" + skipCertainDays[i].year +"<button class='removeSkip' onclick='removeSkipDay(this)'>&nbsp;&times;<span style='display: none;'>"+ i +"</span></button></li>";
        document.querySelector("a[data-year='"+ Number(skipCertainDays[i].year) +"'][data-month='" + Number(skipCertainDays[i].month) + "'][data-day='" + Number(skipCertainDays[i].day) + "']").classList.remove("practice");
    }
    if(skipCertainDays.length == 0){document.querySelector("form.genPracticeDays ul").style.display = "none"}
}

function removeSkipDay(element){
    let span = element.innerHTML.slice(element.innerHTML.indexOf("<span style="), element.innerHTML.length);
    span = span.slice(span.indexOf(">") + 1, span.length);
    span = span.slice(0, span.indexOf("<"));
    span = Number(span);
    document.querySelector("a[data-year='"+ Number(skipCertainDays[span].year) +"'][data-month='" + Number(skipCertainDays[span].month) + "'][data-day='" + Number(skipCertainDays[span].day) + "']").classList.add("practice");
    skipCertainDays.splice(span,1);
    printSkipDays();
}

function togglePractice(i){
    document.querySelectorAll("div.days div.day a")[i].classList.toggle("practice");
}

var practiceDays = [];