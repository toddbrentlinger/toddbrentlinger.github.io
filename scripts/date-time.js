
var dateTime = document.getElementById('date-time');
var date = document.querySelector('#date-time .date');
var time = document.querySelector('#date-time .time');

// create currentDate initialized to current date/time
var currentDateString = Date(); // string representing date/time
var currentDate = new Date(); // Date() object

// assign currentDate to date element
date.textContent = currentDateString;
time.textContent = Date.now() + ' milliseconds since 1 January 1970 00:00:00 UTC, with leap seconds ignored';

/* --------------------------------------------------------------- */

// create new paragraph element for different format of current date and append to #date-time element
var currentDateFormat = dateTime.appendChild(document.createElement('p'));

// arrays of strings for names of date
var dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
var monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

// set currentDateFormat ( Weekday Month Day, Year )
currentDateFormat.textContent = dayNames[currentDate.getDay()] + ' '
    + monthNames[currentDate.getMonth()] + ' ' +  currentDate.getDate() + ', '
    + currentDate.getFullYear();

/* --------------------------------------------------------------- */

// create new paragraph element for different format of current time and append to #date-time element
var currentTimeElement = dateTime.appendChild(document.createElement('p'));

// variables for current hour and minute
var currHour = currentDate.getHours();
var currMin = currentDate.getMinutes();

// variable for AM/PM bool depending on value of currHour
var pmBool = (currHour >= 12) ? true : false;

// change hour format from 0-23 to 1-12
if (currHour > 12) {
    currHour -= 12;
} else if (currHour === 0) {
    currHour = 12;
}

// change minute format from 0-59 to 00-59
currMin = (currMin < 10) ? ('0' + currMin.toString()) : currMin;

// set time on currentTimeElement to digital clock format
currentTimeElement.textContent = currHour + ':' + currMin + ' ' 
    + ((pmBool) ? 'PM' : 'AM');

// splice time zone from currentDate
var timeZoneIndex = currentDate.toString().lastIndexOf(':');
var timeZone = currentDate.toString().slice([timeZoneIndex + 3]);
currentTimeElement.textContent += ' ' + timeZone;

/* --------------------------------------------------------------- */

// days left in the year
var endYear = new Date(currentDate.getFullYear(), 11, 31, 23, 59, 59, 999); // set date of end of year
var msPerDay = 24 * 60 * 60 * 1000; // number of milliseconds per day
var daysLeft = (endYear.getTime() - currentDate.getTime()) / msPerDay;
daysLeft = Math.round(daysLeft); // days left in year
// create new paragraph element for different format of current date and append to #date-time element
var daysLeftElement = dateTime.appendChild(document.createElement('p'));
daysLeftElement.textContent = daysLeft + ' days left in current year'

/* --------------------------------------------------------------- */