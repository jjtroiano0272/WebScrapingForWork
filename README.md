# WebScrapingForWork

## Provide the URL of a company job board, get back a list of current postings.

![Large GIF (1278x720)](https://user-images.githubusercontent.com/33912011/115772833-96badc00-a37d-11eb-91bb-36850e95e94a.gif)

# Possible additions:
* [x] Port to JS
* [ ] Support Pyperclip (or a JS analogue)
* [ ] Accept a list of URLs
* [x] Iterate over the list of positions with the current scraper(url) function
* [x] Adapt to be able to click through prompts from the company's home page
* [ ] Integrate into a web app hosted on my page

### Finding the ```xpath``` 
Inspect > Copy > Xpath

### NOTE: If copying the ```xpath``` doesn't work, try 'Copy Full Xpath'

```[el]``` pulls the first found item and putting it into a variable. This is called 'destructuring'

```page``` is our open page

```.$x``` allows us to select an item on page by ```xpath``` (in puppeteer). this syntax works very well with web scrapers and is usually prefixed with one or two ```/```

The less verbose code is

```const jobTitle = await page.evaluate(name => name.innerText, el_1);```
