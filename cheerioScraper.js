// const request = require('request'); // npm NOW DEPRECATED!
const got = require('got');
const cheerio = require('cheerio'); // npm

// Anonmymous function
got('https://jobs.gartner.com/category/technology-jobs/494/58617/1', (error, 
response, html) => {
    // Program is not even reaching this line.
    console.log('in before if');
    if (!error && response.statusCode == 200) {
        const $ = cheerio.load(html); // $ is so you can use it like jQuery to select from DOM
        
        // Each job listing is is a <li>
        // <section id="search-results-list">
        //      div
        //          ul
        //              li
        // Or.... section > div > ul > li > a (job link) > h2 (TITLE); span (LOCATION)
        $('section > div > ul > li > a').each((i, el) => {
            const title = $(el)
                .find('h2')
                .text();

            console.log(title);
        })
        console.log("hello");
    }
});

let testFunction = (x) => {
    x = 5;
    console.log(x);;
};

// This also works for one-liners
let testFunction2 = (x) => console.log(x);

// Standard function
function foo(arg) { do_something(arg); }
// Arrow function