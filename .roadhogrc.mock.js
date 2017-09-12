const fs = require('fs')
const path = require('path')

const mock = {}
fs.readdirSync(path.join(__dirname + '/mock')).forEach(function(file) {
	if(fs.statSync(`${__dirname}/mock/${file}`).isDirectory()) {
		fs.readdirSync(path.join(`${__dirname}/mock/${file}`)).forEach(function(name) {
			Object.assign(mock, require(`./mock/${file}/${name}`))
		})
	} else {
		Object.assign(mock, require(`./mock/${file}`))
	}
})
module.exports = mock
