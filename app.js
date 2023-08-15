require('dotenv').config()

const fs = require('fs')
const md5 = require('md5')
const path = require('path')
const Extractor = require('figma-extractor')

const DATA_FILE = 'data.json'
const IMAGE_PATH = 'data'

const FIGMA_TOKEN = process.env.FIGMA_TOKEN
const FIGMA_FILE = process.env.FIGMA_FILE

const OPTIONS = {
  format: 'svg',
  use_pages_as_folders: true,
  get_comments: true
}

fs.rmSync(IMAGE_PATH, { recursive: true, force: true })

const extractor = new Extractor(FIGMA_TOKEN, FIGMA_FILE, OPTIONS)

extractor.extract(IMAGE_PATH).then((files) => {
  const data = JSON.stringify({ md5: md5(files), path: IMAGE_PATH, files })

  console.log(data)

  fs.writeFile(DATA_FILE, data, (error, content) => {
    if (error) {
      console.error(e)
    }
  })
}).catch((e) => {
  console.error(e)
})
