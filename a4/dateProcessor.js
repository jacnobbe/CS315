function processDates() {

    //get inputs from form
    input1 = document.getElementById("date1").value;
    input2 = document.getElementById("date2").value;

    //process input 1
    date1 = verifyInputFormat(input1);
    validatedInput1 = formatDateArray(date1);

    date2 = verifyInputFormat(input2);
    validatedInput2 = formatDateArray(date2);

    dateDiff = calcDateDistance(validatedInput1, validatedInput2);

    place = document.getElementById("result");

    if(dateDiff > 1) {
      place.innerHTML = "There are " + dateDiff + " days between " + makeDate(validatedInput1) + " and " + makeDate(validatedInput2);
    }
    else {
      place.innerHTML = "There is " + dateDiff + " day between " + makeDate(validatedInput1) + " and " + makeDate(validatedInput2);
    }
}

function verifyInputFormat(inputDateString) {
  try {
    //check format of input MM/DD/(YY)YY
    dateForm = /^([0]|[1])?[0-9]\/[0-3]?[0-9]\/([1]|[2])?([9]|[0])?[0-9][0-9]$/;
    if(dateForm.test(inputDateString)) {
      //parse into separate vars
      return inputDateString.split("/");
    }

    // check if empty
    if(inputDateString == "" || inputDateString == null) {
      throw "Please input some dates.";
    }
    else throw "Hmm... try again, using at least 1 digit for the month and day, and 2 or 4 for the year. EX: MM/DD/YY";
  }
  catch(err) {
    document.getElementById("errors").innerHTML =  err;
  }
}

function formatDateArray(date) {
  try {
    //get elements from date array
    month = date[0];
    day = date[1];
    year = date[2];

    //format the year
    year = processYear(year);
    day = processDay(day);

    // check if month and days in range
    if((month <= 12 && month >= 1)){
      if (day >= 1 && day <= getMonthLength(month, year)) {
          return [month, day, year];
      }
      else {
        throw "Oops! There are " + getMonthLength(month) + " days in " +
          getMonthName(month) + " in " + year + ", you should choose one of those.";

      }
    }
    else {
      throw "Oye, there are 12 months in the Gregorian calendar. Perhaps " +
      "pick on of those, or a different calendar :/ ";
    }
  }
  catch(err) {
    document.getElementById("errors").innerHTML =  err;
  }
}

//calcuate and return number of days in month
function getMonthLength(month, year) {
  if (month == 2)
  {
    if (year % 4 == 0) {
      return monthLength = 29;
    }
    return monthLength = 28;
  }
  if ((month <= 7 && month % 2 != 0 ) || (month >= 8 && month % 2 == 0))
  {
    return monthLength = 31;
  }
  else return monthLength = 30;
}

// translates number in to nominal month
function getMonthName(month) {
    if(month == 1) {
      return monthName = "January";
    }
    if(month == 2) {
      return monthName = "February";
    }
    if(month == 3) {
      return monthName = "March";
    }
    if(month == 4) {
      return monthName = "April";
    }
    if(month == 5) {
      return monthName = "May";
    }
    if(month == 6) {
      return monthName = "June";
    }
    if(month == 7) {
      return monthName = "July";
    }
    if(month == 8) {
      return monthName = "August";
    }
    if(month == 9) {
      return monthName = "September";
    }
    if(month == 10) {
      return monthName = "October";
    }
    if(month == 11) {
      return monthName = "November";
    }
    if(month == 12) {
      return monthName = "December";
    }
}

// formats the day to 1 digit, if applicable
function processDay(day) {
  dayFormat = /^0\d/;
  if(dayFormat.test(day)) {
    day = day.charAt(1);
    return day;
  }
  else return day;
}

// checks if year in range, and translates to 4 digit format
function processYear(year){
    try {
      if(year < 100 && (year >= 0 && year <= 49)) {
        return "20" + year;
      }
      if(year < 100 && (year >= 50 && year <= 99)) {
        return "19" + year;
      }
      if(year < 1950 || year > 2049) {
        throw "Enter a year between 1950 and 2049, please.";
      }
      else {
        return year;
      }
    }
    catch(err) {
      document.getElementById("errors").innerHTML =  err;
    }
}
function makeDate(date) {
  return getMonthName(date[0]) + " " + date[1] + ", " + date[2];
}

function getDaysSince1950(date) {
  month = date[0];
  day = date[1];
  year = date[2];

  baseYear = 1950;
  daysSinceBaseDate = 0;
  daysInYearToDate = 0;
  daysSinceJan1 = 0;

  // sum days of wholes years (excludes the partial year)
  for(var j = year - 1 ; j >= baseYear; j--) {
    for(var i = 12; i > 0; i--) {
      daysInYearToDate = daysInYearToDate + getMonthLength(i, year);
    }
    daysSinceBaseDate += daysInYearToDate;
    daysInYearToDate = 0;
  }
  // sum days in partial year
  for(var k = month - 1; k > 0; k--) {
    daysSinceJan1 += getMonthLength(k, year);
  }

  // add all together
  return daysSinceBaseDate = daysSinceBaseDate + daysSinceJan1 + day;
}

function calcDateDistance(date1, date2) {
  dateDiff = getDaysSince1950(date1) - getDaysSince1950(date2);
  return Math.abs(dateDiff);
}

window.onload = function() {
    thebutton = document.getElementById("process");
    thebutton.onclick = processDates;
}
