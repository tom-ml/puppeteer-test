const puppeteer = require('puppeteer')
const fs = require('fs');


function sleep (time) {
    return new Promise((resolve) => setTimeout(resolve, time));
}

async function run(page, webUrl, subUrl) {
    await page.goto(webUrl+subUrl);
    await autoScroll(page);
    await page.waitFor("div.xm-jiazai", {visible:true});
    await autoScroll(page);
    const items = await page.$$eval("ul.jieguo-jieguo>div", eles=>eles.map(ele=>ele.innerText));
    console.log("-------items", items.length);
    results = [];
    for (let item of items) {
        // console.log(item.length);
        subItems = item.split("\n");
        results.push({
            title: subItems[0],
            date: subItems[1],
            site: subItems[2],
            price: subItems[3]
        })
    }
    fs.writeFile(subUrl+'.json',JSON.stringify(results,null,'\t'), function(err, data) {
        if (err) {
            throw err;
        }
    });
}

function autoScroll(page) {
    return page.evaluate(() => {
        return new Promise((resolve, reject) => {
            var totalHeight = 0;
            var distance = 100;
            var timer = setInterval(() => {
                var scrollHeight = document.body.scrollHeight;
                window.scrollBy(0, distance);
                totalHeight += distance;
                if (totalHeight >= scrollHeight) {
                    clearInterval(timer);
                    resolve();
                }
            }, 200);
        })
    });
}

async function executeScripy() {
    webUrl = "https://www.ypiao.com/";
    subUrls = ["yanchanghui", "yinyuehui", "tiyusaishi", "wudaobalei", "quyuanzatan", "zhanhui"];
    const browser = await puppeteer.launch({headless:false, defaultViewport:{width:2048, height:768}});
    const page = await browser.newPage();
    for(let subUrl of subUrls) {
        await run(page, webUrl, subUrl);
    }
    page.close();
    browser.close();
}

executeScripy();
