module.exports = {
	root: true,
	parser: 'babel-eslint',
	parserOptions: {
		sourceType: 'module'
	},
	env: {
		browser: true,
	},
	// https://github.com/feross/standard/blob/master/RULES.md#javascript-standard-style
	extends: 'standard',
	// required to lint *.vue files
	plugins: [
	    'html'
	],
	"rules": {
		"semi": "off",
		"space-before-function-paren": "off",
		"indent": [2, "tab"],
		"no-tabs": 0,
		"no-console": 0,
		"no-unused-vars": [
			"error", { "args": "none" }
		],
		"comma-dangle": ["error", "never"],
		"arrow-body-style": 0,
		"import/no-dynamic-require": "off",
		"import/prefer-default-export": "off",
		"no-plusplus": "off",
		"global-require": "off",
		"arrow-parens": "off",
		"no-underscore-dangle": "off",
		"keyword-spacing": "off",
		"no-param-reassign": "off",
		"key-spacing": [
			"error", { "mode": "minimum" }
		],
		"max-len": ["error", 120, { "ignoreStrings": true, "ignoreComments": true, "ignoreTemplateLiterals": true }],
		"func-names": "off",
		"quote-props": ["error", "consistent"]
	}
}
