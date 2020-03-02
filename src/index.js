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
  let p = path.join(__dirname, '../', 'data', `${now}.json`)
  fse.outputJsonSync(p, data)
  return data
}

async function updateMd(data) {
  let rows = [
    ['url', 'dom nums'],
    [':-:', ':-:']
  ]

  for (let [k, v] of Object.entries(data)) {
    rows.push([k, v])
    console.log(k, v)
  }

  let table = rows
    .map(line => line.join(' | '))
    .join('\n')

  let p = path.join(__dirname, '../', 'README.md')
  let str = fse.readFileSync(p, 'utf8')
  str = str.replace(/\{\{TABLE\}\}/g, table)
  console.log(str)
  fse.writeFileSync(p, str)
}


start()
