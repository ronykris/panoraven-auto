import puppeteer from "puppeteer-extra";
import stealthmode from "puppeteer-extra-plugin-stealth";
import dotenv from 'dotenv'

dotenv.config()
puppeteer.use(stealthmode)


export var value = ''
export const getEmbedCode = async(file) => {
    try {
        let launchOptions = { headless: false, defaultViewport: null, args: ['--start-maximized'] };
        const browser = await puppeteer.launch(launchOptions);
        const page = await browser.newPage();

        await page.setUserAgent('Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36');

        // go to the target web
        await page.goto('https://panoraven.com/')

        await page.setCookie({
            name: 'panoraven_session',
            value: process.env.KEY
        })
        await page.goto('https://panoraven.com/en/share-360-photo')

        // get the selector input type=file (for upload file)
        await page.waitForSelector('input[type=file]');
        const inputUploadHandle = await page.$('input[type=file]');
        let fileToUpload = file;

        // Sets the value of the file input to fileToUpload
        await inputUploadHandle.uploadFile(fileToUpload);
        await page.goto('https://panoraven.com/en/dashboard')

        value = await page.$eval('#vue-dashboard-wrapper > div:nth-child(2) > div:nth-child(1) > div:nth-child(4) > div:nth-child(3) > div:nth-child(1) > div > div > div:nth-child(1) > div > div.toggle-share__wrapper > div > div.toggle-share__btn.toggle-share__btn-code',
            element => element.getAttribute('data-clipboard-text'))
        await browser.close();
        //console.log(`value : ${value}`)
        //return value
    } catch (error) {
        console.error(error)
    }

}

//await getEmbedCode()
//console.log(value)