import Api from '@/services/Api';
import i18n from '@/i18n';
import { Snackbar } from 'buefy/dist/components/snackbar';

export default {
	state: {
		history: null,
	},
	mutations: {
		SET_HISTORY(state, history) {
			//parse dates
			history = history.map(e => {
				if (e.date) {
					e.date = new Date(e.date);
				}
				return e;
			});

			// push history event in lists for each year
			let currentYear = null;
			let hist = [];

			for (let e of history) {
				// when the current year is not yet set or the years don't match
				if (!currentYear || (e.date && e.date.getFullYear() !== currentYear.year)) {
					//start a new year
					currentYear = {
						year: e.date.getFullYear(),
						events: [],
					};

					hist.push(currentYear);
				}

				//add event to current year
				currentYear.events.push(e);
			}

			state.history = hist;
		},
	},
	actions: {
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
						Snackbar.open({
							message: i18n.t('error.loadingData'),
							actionText: i18n.t('error.btn.retry'),
							position: 'is-bottom',
							type: 'is-danger',
							onAction: () => {
								context.dispatch('loadHistory');
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
