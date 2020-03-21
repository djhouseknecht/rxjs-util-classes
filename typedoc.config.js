module.exports = {
	inputFiles: [
		'./src'
	],
	mode: 'modules',
	out: 'docs/api',
	plugin: 'typedoc-plugin-markdown',
	excludePrivate: true
}