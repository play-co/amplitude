var fs = require('fs');
var path = require('path');

exports.onBeforeBuild = function (api, app, config, cb) {

	if (!config.debug && config.browser) {
		config.browser.footerHTML.push(
			'<script>',
			fs.readFileSync(path.join(__dirname, 'embedCode.js')),
			'</script>'
		);
	}

	cb && cb();
};
