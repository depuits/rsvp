import Api from '@/services/Api';
import i18n from '@/i18n';
import { Snackbar } from 'buefy/dist/components/snackbar';

export default {
	namespaced: true,
	state: {
		loaded: false,
		events: [],
		date: null,
	},
	mutations: {
		SET(state, shedule) {
			//parse dates
			state.date = new Date(shedule.date);
			state.events = shedule.events.map(e => {
				e.start = new Date(e.start);
				if (e.end) {
					e.end = new Date(e.end);
				}
				return e;
			});
			//order events by date
			state.events.sort((a, b) => {
				if (a.start < b.start) return -1;
				if (a.start > b.start) return 1;
				return 0;
			});

			state.loaded = true;
		},
	},
	actions: {
		load(context, force) {
			if (context.state.loaded && !force) {
				return; // data is already loaded
			}

			context.commit('SET_LOADING', true, { root: true });
			Api()
				.get('shedule')
				.then(
					result => {
						context.commit('SET', result.data);
					},
					error => {
						Snackbar.open({
							message: i18n.t('error.loadingData'),
							actionText: i18n.t('error.btn.retry'),
							position: 'is-bottom',
							type: 'is-danger',
							onAction: () => {
								context.dispatch('load');
							},
						});
					}
				)
				.then(() => {
					context.commit('SET_LOADING', false, { root: true });
				});
		},
	},
};
