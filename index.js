const puppeteer = require('puppeteer')

// puppeteer.launch({headless:false, defaultViewport:{width:2048, height:768}}).then((browser) => {
//     browser.newPage().then(page=> {
//         page.goto('http://www.baidu.com')
//     })
// })

async function run() {
    const browser = await puppeteer.launch({headless:false, defaultViewport:{width:2048, height:768}});
    const page = await browser.newPage();
    await page.goto("https://www.ypiao.com/yanchanghui/");
    const userNameInput = await page.$("body > div.all-xmu.w > div.xmu-l.l > div.l-leibie > ul:nth-child(1) > li > a:nth-child(3)");
    await userNameInput.click();

    // const inputBtn = await page.$("#app > div > div.login-form > div.login-email > form > div.el-form-item.submit_btn.el-form-item--medium > div > button");
    // await inputBtn.click();

    await page.waitFor(".jieguo-xm", {visible:true});
    let resultText = await page.$eval(".jieguo-xm", ele=> ele.innerText);
    await autoScroll(page);
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
        }, 100);
      })
    });
  }

run();