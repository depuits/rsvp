import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import i18n from './i18n';
import LetItSnow from 'vue-let-it-snow';

require('./scss/loading.css');
require('./scss/loading-btn.css');

Vue.config.productionTip = false;

Vue.use(LetItSnow);

new Vue({
	router,
	store,
	i18n,
	render: h => h(App),
}).$mount('#app');
