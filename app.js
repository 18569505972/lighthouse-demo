const fs = require('fs');
const lighthouse = require('lighthouse');
const {URL} = require('url');
// const chromeLauncher = require('chrome-launcher');
const puppeteer = require('puppeteer');

(async () => {
  // const chrome = await chromeLauncher.launch({chromeFlags: ['--headless']});
  const browser = await puppeteer.launch({ product: 'chrome', headless: true });
  const options = {logLevel: 'info', locale:'zh-hans', output: 'json', onlyCategories: ['performance'], port: (new URL(browser.wsEndpoint())).port};
  const runnerResult = await lighthouse('https://www.baidu.com', options);

  // `.report` is the HTML report as a string
  const reportHtml = runnerResult.report;
  // fs.writeFileSync('lhreport.html', reportHtml);
  console.log(reportHtml);
  // `.lhr` is the Lighthouse Result as a JS object
  console.log('Report is done for', runnerResult.lhr.finalUrl);
  console.log('Performance score was', runnerResult.lhr.categories.performance.score * 100);

  // await chrome.kill();
  await browser.close();
})();