"use strict";

// event listener to respond to "Show another quote" button clicks
// when user clicks anywhere on the button, the "printQuote" function is called
document.getElementById('loadQuote').addEventListener("click", printQuote, false);
var timeoutID;
timeoutID = window.setTimeout(function () {
    printQuote();
}, 30000);

function getRandomQuote() {

    // generate a random value between 0 and the total number of quotes in the array
    var randomNumber = Math.floor((Math.random() * quotes.length));

    // return the quote based on the random number
    return quotes[randomNumber];

}

function getRandomBackgroundColour() {

    var randomRed, randomGrn, randomBlu, rgbColor;

    randomRed = Math.floor((Math.random() * 255));
    randomGrn = Math.floor((Math.random() * 255));
    randomBlu = Math.floor((Math.random() * 255));
    rgbColor = 'rgb(' + randomRed + ',' + randomGrn + ',' + randomBlu + ')';

    return rgbColor;
}

// printQuote function
function printQuote() {

    // declare some local variables
    var quoteID, str_html, getBackground, str_html_temp, i;

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