const getDomNum = require("./utils");
const URL_LIST = require("./urls");
const fse = require('fs-extra')
const path = require('path')

async function start() {
  let data = await updateData()
  await updateMd(data)
}

async function updateData() {
  let data = {}
  for (let url of URL_LIST) {
    data[url] = await getDomNum(url)
    console.log(data)
  }

  let now = +new Date()
  let p = path.join(__dirname, 'data', `${now}.json`)
  fse.outputJsonSync(p, data)
  return data
}

async function updateMd(data) {

}


start()
