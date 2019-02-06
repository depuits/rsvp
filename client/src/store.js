import Vue from 'vue';
import Vuex from 'vuex';
import Api from '@/services/Api';

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		loading: false,
		shedule: null,
		history: null,
	},
	mutations: {
		SET_LOADING(state, loading) {
			state.loading = loading;
		},
		SET_SHEDULE(state, shedule) {
			state.shedule = shedule;
		},
		SET_HISTORY(state, history) {
			state.history = history;
		},
	},
	actions: {
		loadShedule(context, force) {
			if (context.state.shedule && !force) {
				return; // data is already loaded
			}

			context.commit('SET_LOADING', true);
			Api()
				.get('shedule')
				.then(
					result => {
						context.commit('SET_SHEDULE', result.data);
					},
					error => {
						console.error(error);
					}
				)
				.then(() => {
					context.commit('SET_LOADING', false);
				});
		},
		loadHistory(context, force) {
			if (context.state.history && !force) {
				return; // data is already loaded
			}

			context.commit('SET_LOADING', true);
			Api()
				.get('history')
				.then(
					result => {
						context.commit('SET_HISTORY', result.data);
					},
					error => {
						console.error(error);
					}
				)
				.then(() => {
					context.commit('SET_LOADING', false);
				});
		},
	},
});
