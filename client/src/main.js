import Vue from 'vue';
import App from '@/App.vue';
import router from '@/router';
import store from '@/store/store';
import i18n from '@/i18n';
import Buefy from 'buefy';
import LetItSnow from 'vue-let-it-snow';

import '@mdi/font/css/materialdesignicons.min.css';

Vue.config.productionTip = false;

Vue.use(Buefy);
Vue.use(LetItSnow);

new Vue({
	router,
	store,
	i18n,
	render: h => h(App),
}).$mount('#app');
