/* Following along with 
   https://www.scrapingbee.com/blog/node-fetch/
   STARTED: 07 MAY 2021 */

const fetch = require('node-fetch');
const cheerio = require('cheerio');
const puppeteer = require('puppeteer');
const { URL, URLSearchParams } = require('url');


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

// TODO: Needs clicking script to view all
const getGartner = async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://jobs.gartner.com/category/technology-jobs/494/58617/1');
    
    
    // Click shit on page
    // CREDIT JOZOTT @ STACK: 
    // https://stackoverflow.com/questions/58087966/how-to-click-element-in-puppeteer-using-xpath
    // Get the element. Returns an array of elements.
    await page.$x('//*[@id="pagination-bottom"]/div[3]/a')
    const elements = await page.$x('//*[@id="pagination-bottom"]/div[3]/a')
    await elements[0].click() 

    const response = await fetch(
        'https://jobs.gartner.com/category/technology-jobs/494/58617/1'
    ); // html response
    const body = await response.text();

    // Parse html for selector
    const $ = cheerio.load(body);
    const titleList = [];
    const locationList = [];

    // Pulls job titles and pushes them to a list
    $('#search-results-list > ul > li > a > h2')
        .each(
            (i, title) => {
                const titleNode = $(title);
                const titleText = titleNode.text();
                titleList.push(titleText);
            }
        );
        // console.log(titleList); // prints a chock full of HTML richness

    // Pulls job locations and pushes them to a list
    $('#search-results-list > ul > li > a > .job-location')
        .each(
            (i, location) => {
                const locationNode = $(location);
                const locationText = locationNode.text();
                locationList.push(locationText);
            }
        );
        // console.log(locationList); // prints a chock full of HTML richness
    
    // Print both lists together pairwise
    console.log(titleList.length+" jobs found!");
    for (var i = 0; i < titleList.length - 1; i++) {
        console.log(titleList[i], locationList[i]);
    }

    await browser.close();
}
        
{
/* (async () => {
	const url = new URL('https://some-url.com');
	const params = { param: 'test'};
	const queryParams = new URLSearchParams(params).toString();
	url.search = queryParams;
	
	const fetchOptions = {
		method: 'POST',
		headers: { 'cookie': '<cookie>', },
		body: JSON.string({ hello: 'world' }),
	};

	await fetch(url, fetchOptions);
})();


const newProductsPagePromise = fetch('https://some-website.com/new-products');
const recommendedProductsPagePromise = fetch('https://some-website.com/recommended-products');

// Returns a promise that resolves to a list of the results
Promise.all([
    newProductsPagePromise, 
    recommendedProductsPagePromise
]);  */ }

// getReddit();
getGartner();