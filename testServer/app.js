import express from 'express'
import url from 'url'
import path from 'path'
const __dirname = path.dirname(url.fileURLToPath(import.meta.url))

const app = express()

app.use(express.static(path.resolve(__dirname, '../dist')))

app.listen(3000, () => console.log("listening on 3000"))