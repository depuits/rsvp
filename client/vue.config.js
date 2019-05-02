module.exports = {
	publicPath: '/rsvp/',
	pluginOptions: {
		i18n: {
			locale: 'en',
			fallbackLocale: 'en',
			localeDir: 'locales',
			enableInSFC: true,
		},
	},
	css: {
		loaderOptions: {
			sass: {
				data: `
					@import "@/scss/_variables.scss";
					`,
			},
		},
	},
};
