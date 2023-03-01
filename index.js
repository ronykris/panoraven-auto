import puppeteer from "puppeteer-extra";
import stealthmode from "puppeteer-extra-plugin-stealth";

puppeteer.use(stealthmode)

var value = ''
const getEmbedCode = async() => {
    // set some options (set headless to false so we can see 
    // this automated browsing experience)
    let launchOptions = { headless: false, defaultViewport: null, args: ['--start-maximized'] };

    const browser = await puppeteer.launch(launchOptions);
    const page = await browser.newPage();
    
    await page.setUserAgent('Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36');
    const cookie = {'panoraven_session': 'eyJpdiI6Im9JaElOb215eFd4Yi9Dc1B5TXBnMXc9PSIsInZhbHVlIjoidlRSUURLenNJSk41SnhoTURnOGVjUHdlM2kxOGJUQ21JeE4zUnVRbDhEYUVrMnR6WlVxY21WTDJRMksrOFFGUjNha2srWVBLTTdYWHJuTjIzVU5kdlNqWERHOXFHS1VIWEtJMkwwdXFydk92QUxtSzBLY0YxazhoeG1vOEliVWQiLCJtYWMiOiI0ZmI3MDg0YzViYjA2ZGU3YjUzYzIwMjc5ODQ0OTAzYjAwZDFkZWRmOThlOTI3NDU3OGZmYzU0ODFlNzVmNzEzIiwidGFnIjoiIn0%3D'}
    // go to the target web
    await page.goto('https://panoraven.com/')
        
    await page.setCookie({
        name : 'panoraven_session',
        value : 'eyJpdiI6IkNQMjRDTlRNdFZydDRkY0F6eThUZXc9PSIsInZhbHVlIjoiV0NBUlNkbGNXM1hDMGwwL3R0Zy9aQmNLSEdXWUZkWVN5cjd6dFdoRFR1am5kcERjc2tZdk9zSTdLVzJSbnVCVjY0NDZFNHpJZVFjcFIzeEpFVGMwUUtYZTJSNGJVRUUvQWVZUlNLemdhWUtENXExcXN1Q29CVFF3SEladlNGOXQiLCJtYWMiOiI2OTg2MzgwYTJlYzE0ZGEzYjgzYTk3ZDE0MDVkNTc3OTVjNGMyOTIyNGIwMjRiOWRiYTg3NTljMGRkOTQ5ZGUyIiwidGFnIjoiIn0%3D'
    })
    await page.goto('https://panoraven.com/en/share-360-photo')    

    // get the selector input type=file (for upload file)
    await page.waitForSelector('input[type=file]');    
    const inputUploadHandle = await page.$('input[type=file]');        
    let fileToUpload = './image.jpg';

    // Sets the value of the file input to fileToUpload
    await inputUploadHandle.uploadFile(fileToUpload);    
    await page.goto('https://panoraven.com/en/dashboard')
    
    value = await page.$eval('#vue-dashboard-wrapper > div:nth-child(2) > div:nth-child(1) > div:nth-child(4) > div:nth-child(3) > div:nth-child(1) > div > div > div:nth-child(1) > div > div.toggle-share__wrapper > div > div.toggle-share__btn.toggle-share__btn-code',
    element => element.getAttribute('data-clipboard-text'))    
    await browser.close();
    //console.log(`value : ${value}`)
    //return value
}

await getEmbedCode()
console.log(value)