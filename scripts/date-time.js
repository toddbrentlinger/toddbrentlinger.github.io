
var dateTime = document.getElementById('date-time');
var miscDate = document.getElementById('misc-date');
var date = document.querySelector('#date-time .date');
var time = document.querySelector('#date-time .time');

// create currentDate initialized to current date/time
var currentDate = new Date(); // Date() object

// ceate new paragraph in miscDate and assign it currentDate
miscDate.appendChild(document.createElement('p')).textContent = currentDate;

// ceate new paragraph in miscDate and assign it milliseconds from 1970
miscDate.appendChild(document.createElement('p')).textContent = Date.now() + ' milliseconds since 1 January 1970 00:00:00 UTC, with leap seconds ignored';

/* --------------------------------------------------------------- */

// create new paragraph element for different format of current date and append to #misc-date
var currentDateFormat = miscDate.appendChild(document.createElement('p'));

// arrays of strings for names of date
var dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
var monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

// set currentDateFormat ( Weekday Month Day, Year )
currentDateFormat.textContent = dayNames[currentDate.getDay()] + ' '
    + monthNames[currentDate.getMonth()] + ' ' +  currentDate.getDate() + ', '
    + currentDate.getFullYear();

/* --------------------------------------------------------------- */

// create new paragraph element for different format of current time and append to #misc-date
var currentTimeElement = miscDate.appendChild(document.createElement('p'));

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
// create new paragraph element for different format of current date and append to #misc-date
var daysLeftElement = miscDate.appendChild(document.createElement('p'));
daysLeftElement.textContent = daysLeft + ' days left in current year'

/* --------------------------------------------------------------- */

// birthday selection
var monthSelect = document.getElementById('birthday-month');
var daySelect = document.getElementById('birthday-day');
var yearSelect = document.getElementById('birthday-year');

// set days select element depending on month chosen
function changeDaysInMonth() {

    // remove existing option elements in day select element
    if (daySelect.hasChildNodes()) {
        while (daySelect.firstChild) {
            daySelect.removeChild(daySelect.firstChild);
        }
    }

    // add text in first option for day with no value
    let firstDayOption = document.createElement('option');
    firstDayOption.text = '-- Day --';
    firstDayOption.value = 'top';
    daySelect.add(firstDayOption);

    // find number of days in month
    let daysInMonth = 31; // default value
    if (monthSelect.value === 'feb') {
        daysInMonth = 28;
    } else if (monthSelect.value === 'apr' || monthSelect.value === 'jun'
        || monthSelect.value === 'sep' || monthSelect.value === 'nov') {
        daysInMonth = 30;
    }

    // add option element for each day in month
    // NOTE: could add first text option in loop by starting from index 0
    for (let i = 1; i <= daysInMonth; i++) {
        let dayOption = document.createElement('option');
        dayOption.value = i.toString();
        dayOption.text = i.toString();
        daySelect.add(dayOption);
    }
}
// run function when script loads initially
changeDaysInMonth();
// add event listener to month select element
monthSelect.addEventListener('change', changeDaysInMonth);

// set years element depending on current year
var currentYear = new Date().getFullYear();

// add option element for each year going back 100 years
for (let i = currentYear; i > (currentYear - 100) ; i--) {
    let yearOption = document.createElement('option');
    yearOption.value = i.toString();
    yearOption.text = i.toString();
    yearSelect.add(yearOption);
}

function setBirthday() {

    // check if values of date are valid (not equal to top option)
    if (monthSelect.value != 'top' &&
        daySelect.value != 'top' &&
        yearSelect.value != 'top') {

        // assign birthday to new Date object
        var birthday = new Date(monthSelect.options[monthSelect.selectedIndex].textContent
            + ' ' + daySelect.value + ', ' + yearSelect.value);

        // assign reference to #birthday-facts container
        let birthdayFacts = document.getElementById('birthday-facts');

        // empty container of child elements
        if (birthdayFacts.hasChildNodes()) {
            while (birthdayFacts.firstChild) {
                birthdayFacts.removeChild(birthdayFacts.firstChild);
            }
        }

        // Days until next birthday

        // reference to next paragraph element in container
        let nextBirthdayPara = birthdayFacts.appendChild(document.createElement('p'));

        // assign new Date object to nextBirthday in current year by default
        let nextBirthday = new Date(currentDate.getFullYear(), birthday.getMonth(), birthday.getDate());

        // check if today is your birthday
        if (nextBirthday.getMonth() === currentDate.getMonth() && 
            nextBirthday.getDate() === currentDate.getDate()) {
            // update paragraph element
            nextBirthdayPara.textContent = 'Happy Birthday! You\'re '
                + (currentDate.getFullYear() - birthday.getFullYear()) + ' years old.';
        } else {
            // check if current year birthday has already happened
            if (currentDate.getTime() > nextBirthday.getTime()) {
                // increase nextBirthday full year by one
                nextBirthday.setFullYear(nextBirthday.getFullYear() + 1);
            }
            
            // days until next birthday, float
            let daysNextBirthday = (nextBirthday.getTime() - currentDate.getTime()) / msPerDay;

            // add textContent to paragraph element
            if (daysNextBirthday <= 1) {
                nextBirthdayPara.textContent = 'Tomorrow is your birthday! Enjoy your last day of being '
                    + (currentDate.getFullYear() - birthday.getFullYear() - 1)
                    + ' years old.';
            } else {
                // ceil days until next birthday to nearest integer greater than or equal to number
                daysNextBirthday = Math.ceil(daysNextBirthday);
                nextBirthdayPara.textContent += daysNextBirthday + ' days until your next birthday';
            }
            
        }   
    }
}

monthSelect.addEventListener('change', setBirthday);
daySelect.addEventListener('change', setBirthday);
yearSelect.addEventListener('change', setBirthday);