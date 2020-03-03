const getDomNum = require("./utils");
const URL_LIST = require("./urls");
const fse = require('fs-extra')
const path = require('path')

async function start() {
  await updateMd(await updateData())
}

async function updateData() {
  let data = {}
  for (let url of URL_LIST) {
    try {
      data[url] = await getDomNum(url)
      console.log(data)
    } catch (e) {
      console.log('e===>', e)
    }

  }

  let time = +new Date()
  let p = path.join(__dirname, '../', 'data', `${time}.json`)
  fse.outputJsonSync(p, data)
  return {time, data}
}

async function updateMd({time, data}) {
  let rows = [
    ['url', 'dom nums'],
    [':-:', ':-:']
  ]

  for (let [k, v] of Object.entries(data)) {
    rows.push([k, v])
    console.log(k, v)
  }

  rows.sort(
    (a, b) => b[1] - a[1]
  )

  let table = rows
    .map(line => line.join(' | '))
    .join('\n')

  let p = path.join(__dirname, '../', 'README-TEMPLATE.md')
  let str = fse.readFileSync(p, 'utf8')
  str = str.replace(/\{\{TABLE\}\}/g, table)
    .replace(/\{\{TIME\}\}/g, new Date(time).toLocaleString())
  let out = path.join(__dirname, '../', 'README.md')
  fse.writeFileSync(out, str)
}


start()
