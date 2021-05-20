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
const getGartner = async (url) => {
    const browser = await puppeteer.launch({
        headless: true,
        slowMo: 000,
    });
    const page = await browser.newPage();
    await page.goto(url);

    
    // Click shit on page
    // CREDIT JOZOTT @ STACK: 
    // https://stackoverflow.com/questions/58087966/how-to-click-element-in-puppeteer-using-xpath
    // Get the element. Returns an array of elements.
    await page.$x('//*[@id="pagination-bottom"]/div[3]/a'); // View all button
    const elements = await page.$x('//*[@id="pagination-bottom"]/div[3]/a');
    await elements[0].click(); // Click 'View All'

    // Print updated vesion of page ater clicking. After clicking View All, DOM changes
    // (number of ul > li items increases)
    // OLD METHOD: const response = await fetch(url);
    debugger;
    const response_pupp = await page.evaluate(() => {
        
    }); // returns Promise
    debugger;
    // OLD METHOD: const body = await response.text();
    const body_pupp = await page.content(); // HERES YOUR ERROR!
    debugger;

    // Parse html for selector
    const $ = await cheerio.load(body_pupp);
    const titleList = [];
    const locationList = [];

    // Pulls job titles and pushes them to a list
    const titleSelector = '#search-results-list > ul > li > a > h2';
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
    console.log(titleList.length+" jobs found!\n\n");
    for (var i = 0; i < titleList.length - 1; i++) {
        console.log(titleList[i], "\n  ", locationList[i], "\n");
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
getGartner('https://jobs.gartner.com/category/technology-jobs/494/58617/1');