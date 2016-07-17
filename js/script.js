// declare global variables and array with first quote already added
var timeoutID, pickedArr;
pickedArr = [];

// event listener to respond to "Show another quote" button clicks
// when user clicks anywhere on the button, the "printQuote" function is called
document.getElementById('loadQuote').addEventListener("click", printQuote, false);

// callback to update the quote every 30 seconds if button isn't pressed
timeoutID = window.setTimeout(function () {
    'use strict';
    printQuote();
}, 30000);

// the get random quote function
// No parameters
// returns the object with the quote data within
function getRandomQuote() {
    // invoke a stricter javascript coding practice
    "use strict";

    // declare some local variables
    var randomNumber;

    // generate a random value between 0 and the total number of quotes in the array
    randomNumber = Math.floor((Math.random() * quotes.length));
    //console.log("Quote ID generated: ", randomNumber);

    // has the number been picked already?
    while (pickedArr.length < quotes.length) {
        if (pickedArr.indexOf(randomNumber) === -1) {
            // Not been picked so let's add the number to the picked array
            pickedArr.push(randomNumber);
            // return the quote
            return quotes[randomNumber];
        }
        // generate a new random number while still inside the while loop
        randomNumber = Math.floor((Math.random() * quotes.length));
    }
    // We've already had all quotes displayed so just pick the random quote
    return quotes[randomNumber];
}

// a function to generate background colours using red, green and blue codes (0 - 255)
// No parameters
// returns the colour based on rgb( red, green, blue)
function getRandomBackgroundColour() {
    // invoke a stricter javascript coding practice
    "use strict";

    // declare some local variables
    var randomRed, randomGrn, randomBlu, rgbColor;

    // assign some random numbers between 0 and 255 to each of the colour variables
    randomRed = Math.floor((Math.random() * 255));
    randomGrn = Math.floor((Math.random() * 255));
    randomBlu = Math.floor((Math.random() * 255));
    // create a string with the random colours
    rgbColor = 'rgb(' + randomRed + ',' + randomGrn + ',' + randomBlu + ')';

    // return the colour string
    return rgbColor;
}

// =====================
//  printQuote function
// =====================
function printQuote() {
    // invoke a stricter javascript coding practice
    "use strict";

    // declare some local variables
    var quoteID, str_html, getBackground, str_html_temp, i;

    // clear the callback so we don't keep adding new timeouts each time the button is clicked.
    window.clearTimeout(timeoutID);

    // get the random quote object into the variable
    quoteID = getRandomQuote();

    // get a random colour for the page background
    getBackground = getRandomBackgroundColour();

    // construct the HTML string including the properties of the quote object
    str_html = '<p class="quote">' + quoteID.quote + '</p>';
    str_html += '<p class="source">' + quoteID.source;

    if (typeof quoteID.citation !== "undefined") {
        str_html += '<span class="citation">' + quoteID.citation + '</span>';
    }
    if (typeof quoteID.year !== "undefined") {
        str_html += '<span class="year">' + quoteID.year + '</span>';
    }

    str_html += '</p>';
    str_html_temp = "";

    if (typeof quoteID.tags !== "undefined") {
        for (i = 0; i < quoteID.tags.length; i += 1) {
            str_html_temp += '<span class="tags">' + quoteID.tags[i] + '</span>';
        }
    }

    str_html += str_html_temp;

    // Push the new background colour to the DOM
    document.body.style.backgroundColor = getBackground;
    // Push the new quote string to the DOM
    document.getElementById('quote-box').innerHTML = str_html;

    // Initiate the callback function to call the function again in 30 seconds
    timeoutID = window.setTimeout(function () {
        printQuote();
    }, 30000); // 30000ms = 30 seconds
}