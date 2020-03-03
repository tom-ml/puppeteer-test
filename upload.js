const puppeteer = require('puppeteer')

async function upload() {
    const browser = await puppeteer.launch({headless:false, defaultViewport:{width:2048, height:768}});
    const page = await browser.newPage();
    await page.goto("https://www.baidu.com/");
    const uploadBtn = await page.waitForSelector("span.soutu-btn");
    await uploadBtn.click();
    const uploadPicBtn = await page.waitForSelector("input.upload-pic");
    await uploadPicBtn.uploadFile("/Users/oyo/tom/practise/spider/puppeteer-test/imgs/1.png");

    // const inputBtn = await page.$("#app > div > div.login-form > div.login-email > form > div.el-form-item.submit_btn.el-form-item--medium > div > button");
    // await inputBtn.click();
}

upload();