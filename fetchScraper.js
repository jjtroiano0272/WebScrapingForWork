/* Following along with 
   https://www.scrapingbee.com/blog/node-fetch/
   STARTED: 07 MAY 2021 */

const fetch = require('node-fetch');
const cheerio = require('cheerio');
const puppeteer = require('puppeteer');
const { URL, URLSearchParams } = require('url');

var titleList = [];

/* When fetch is called, it returns a promise which will resolve to a Response object 
as soon as the server responds with the headers */ 
const getReddit = async () => {
    const response = await fetch('https://reddit.com/'); // html response
    const body = await response.text();

    // Parse html for selector
    const $ = cheerio.load(body);
    const titleList = [];
    // Post titles are under <h1 class="_eYtD2XCVieq6emjKBH3m">
    $('._eYtD2XCVieq6emjKBH3m').each((i, title) => {
        const titleNode = $(title);
        const titleText = titleNode.text();
        titleList.push(titleText);

    });

    console.log(titleList); // prints a chock full of HTML richness
}

const getGartner = async (url) => {
    const browser = await puppeteer.launch({
        headless: true,
        slowMo: 50,
    });
    const page = await browser.newPage();
    await page.goto(url);

    // CREDIT JOZOTT @ STACK: 
    // https://stackoverflow.com/questions/58087966/how-to-click-element-in-puppeteer-using-xpath
    // Locate 'View All' button by xpath, then click it.
    const elements = await page.$x('//*[@id="pagination-bottom"]/div[3]/a');
    await elements[0].click();
    
    // Removing this breaks it. Go figure?
    // debugger;
    const body = await page.content();
    
    // Pulls job titles and pushes them to a list
    const titleSelector = '#search-results-list > ul > li > a > h2';
    const titleList = [];
    const locationList = [];
    const $ = await cheerio.load(body);
    $(titleSelector).each(
        (i, title) => {
            const titleNode = $(title);
            const titleText = titleNode.text(); 
            titleList.push(titleText);
        }
    );

    // Pulls job locations and pushes them to a list
    const locationSelector = '#search-results-list > ul > li > a > .job-location';
    $(locationSelector).each(
        (i, location) => {
            const locationNode = $(location);
            const locationText = locationNode.text();
            locationList.push(locationText);
        }
    );
    
    // Print both lists together pairwise
    document.getElementById("gartnerJobs").innerHTML = titleList.length+" jobs found!\n\n";
    console.log(titleList.length+" jobs found!\n\n");
    for (var i = 0; i < titleList.length - 1; i++) {
        console.log(titleList[i], "\n  ", locationList[i], "\n");
    }
    console.log(titleList.length+" jobs found!\n\n");

    await browser.close();


}

// getReddit();
getGartner('https://jobs.gartner.com/category/technology-jobs/494/58617/1');

// var penisVar = ''
function passJsToHTML() {
    //              input to html goes here
    var penisVar = 'TAPPING A MF PENIS!';
    // document.getElementById("testDemo").innerHTML = penisVar;
    
    getGartner('https://jobs.gartner.com/category/technology-jobs/494/58617/1');

    // Testing the REAL data
    document.getElementById("testDemo").innerHTML = titleList.length;
}