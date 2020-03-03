const {Builder} = require('selenium-webdriver');
const firefox = require('selenium-webdriver/firefox');

const WAIT_TIME = 3000

function waitTime(n) {
  return new Promise(resolve => setTimeout(
    () => resolve()
    , n
  ))
}

const script = `
let sum = 0
function dfs(dom) {
  if (dom.children.length) {
      [...dom.children].forEach(dfs)
  }
  sum++
};
dfs(document)
return sum
`

async function getDomNum(url) {
  let options = new firefox.Options()
  options.headless()
  let driver = await new Builder().forBrowser('firefox')
    .setFirefoxOptions(options)
    .build(options);
  try {
    await driver.get(url);
    await waitTime(WAIT_TIME)
    return await driver.executeScript(script)
  } catch (e) {
    console.log('==>', e)
    return -1
  } finally {
    await driver.quit();
  }
}

module.exports = getDomNum
