var fs = require('fs');
var path = require('path');

exports.onBeforeBuild = function (common, project, buildOpts, cb) {

	if (!buildOpts.debug && buildOpts.footerHTML) {
		buildOpts.footerHTML.push(
			'<script>',
			fs.readFileSync(path.join(__dirname, 'embedCode.js')),
			'</script>'
		);
	}

	cb && cb();
};
