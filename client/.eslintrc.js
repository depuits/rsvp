module.exports = {
	root: true,
	env: {
		node: true,
	},
	plugins: ['json'],
	extends: ['plugin:vue/recommended', '@vue/prettier'],
	rules: {
		'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
		'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',

		indent: ['error', 'tab'],
		'vue/html-indent': ['error', 'tab'],
		'no-unused-vars': ['error', { args: 'none' }],
	},
	parserOptions: {
		parser: 'babel-eslint',
	},
};
