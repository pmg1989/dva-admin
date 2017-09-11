const fs = require('fs')

const mock = {}
fs.readdirSync(require('path').join(__dirname + '/mock')).forEach(function(file) {
	if(fs.statSync(`${__dirname}/mock/${file}`).isDirectory()) {
		
	} else {
		Object.assign(mock, require('./mock/' + file))
	}
})
module.exports = mock
