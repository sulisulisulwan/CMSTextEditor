import packageJson from  './package.json' assert { type: 'json' }
import fs from 'fs'

let [major, minor, patch] = packageJson.version.split('.')

const numToUpdate = process.argv[2]
const incOrDec = process.argv[3]

console.log(packageJson.version)

if (numToUpdate === 'major') {
  major = Number(major) 
  major = incOrDec === 'increment' ? major + 1 : major - 1
} else if (numToUpdate === 'minor') {
  minor = Number(minor)
  minor = incOrDec === 'increment' ? minor + 1 : minor - 1
} else if (numToUpdate === 'patch') {
  patch = Number(patch)
  patch = incOrDec === 'increment' ? patch + 1 : patch - 1
}

const newVersion = `${major}.${minor}.${patch}`

packageJson.version = newVersion

// console.log(packageJson.version)
fs.writeFileSync('./package.json', JSON.stringify(packageJson, null, 2))
