import Api from '@/services/Api';
import i18n from '@/i18n';
import { Snackbar } from 'buefy/dist/components/snackbar';

export default {
	namespaced: false,
	state: {
		shedule: null,
	},
	mutations: {
		SET_SHEDULE(state, shedule) {
			//parse dates
			shedule.date = new Date(shedule.date);
			shedule.events = shedule.events.map(e => {
				e.start = new Date(e.start);
				if (e.end) {
					e.end = new Date(e.end);
				}
				return e;
			});
			//order events by date
			shedule.events.sort((a, b) => {
				if (a.start < b.start) return -1;
				if (a.start > b.start) return 1;
				return 0;
			});

			//order events by start
			state.shedule = shedule;
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
						Snackbar.open({
							message: i18n.t('error.loadingData'),
							actionText: i18n.t('error.btn.retry'),
							position: 'is-bottom',
							type: 'is-danger',
							onAction: () => {
								context.dispatch('loadShedule');
							},
						});
					}
				)
				.then(() => {
					context.commit('SET_LOADING', false);
				});
		},
	},
};
