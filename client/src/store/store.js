import Vue from 'vue';
import Vuex from 'vuex';
import i18n from '@/i18n';
import { Snackbar } from 'buefy/dist/components/snackbar';

import shedule from '@/store/modules/shedule';
import history from '@/store/modules/history';
import rsvp from '@/store/modules/rsvp';

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		loading: false,
	},
	modules: {
		shedule,
		history,
		rsvp,
	},
	mutations: {
		SET_LOADING(state, loading) {
			state.loading = loading;
		},
	},
	actions: {
		dummyLoad(context) {
			context.commit('SET_LOADING', true);
			setTimeout(() => {
				context.commit('SET_LOADING', false);

				Snackbar.open({
					message: i18n.t('error.loadingData'),
					actionText: i18n.t('error.btn.retry'),
					position: 'is-bottom',
					type: 'is-danger',
					onAction: () => {
						context.dispatch('dummyLoad');
					},
				});
			}, 5000);
		},
	},
});
