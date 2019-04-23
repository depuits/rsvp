import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import i18n from './i18n';
import LetItSnow from 'vue-let-it-snow';
import SuiVue from 'semantic-ui-vue';

import './scss/loading.css';
import './scss/loading-btn.css';
import 'semantic-ui-css/semantic.min.css';

Vue.config.productionTip = false;

Vue.use(LetItSnow);
Vue.use(SuiVue);

new Vue({
	router,
	store,
	i18n,
	render: h => h(App),
}).$mount('#app');
