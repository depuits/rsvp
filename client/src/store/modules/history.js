import Api from '@/services/Api';
import i18n from '@/i18n';
import { Snackbar } from 'buefy/dist/components/snackbar';

export default {
	namespaced: true,
	state: {
		loaded: false,
		events: [],
	},
	mutations: {
		SET(state, history) {
			//parse dates
			history = history.map(e => {
				if (e.date) {
					e.date = new Date(e.date);
				}
				return e;
			});

			// push history event in lists for each year
			let currentYear = null;
			state.events = []; // clear old data and initiate

			for (let e of history) {
				// when the current year is not yet set or the years don't match
				if (!currentYear || (e.date && e.date.getFullYear() !== currentYear.year)) {
					//start a new year
					currentYear = {
						year: e.date.getFullYear(),
						events: [],
					};

					state.events.push(currentYear);
				}

				//add event to current year
				currentYear.events.push(e);
			}

			state.loaded = true;
		},
	},
	actions: {
		load(context, force) {
			if (context.state.loaded && !force) {
				return; // data is already loaded
			}

			context.commit('SET_LOADING', true);
			Api()
				.get('history')
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
					context.commit('SET_LOADING', false);
				});
		},
	},
};
