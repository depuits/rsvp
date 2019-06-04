import Vue from 'vue';
import Vuex from 'vuex';
import Api from '@/services/Api';
import i18n from './i18n';
import { Snackbar } from 'buefy/dist/components/snackbar';
import { getField, updateField } from 'vuex-map-fields';

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		loading: false,
		shedule: null,
		history: null,
		guests: [],
	},
	getters: {
		getField,
	},
	mutations: {
		updateField,
		SET_LOADING(state, loading) {
			state.loading = loading;
		},
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
		SET_GUESTS(state, guests) {
			state.guests = guests;
		},
		ADD_GUEST(state, guest) {
			state.guests.push(guest);
		},
		UPDATE_GUEST(state, guest) {
			var index = state.guests.indexOf(guest.old);

			if (index !== -1) {
				state.guests[index] = guest.new;
			}
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
		loadGuests(context, data) {
			if (context.state.guests && context.state.guests.length && !data.force) {
				return; // data is already loaded
			}

			context.commit('SET_LOADING', true);
			Api()
				.get('response/all', { headers: { 'x-code': data.code } })
				.then(
					result => {
						context.commit('SET_GUESTS', result.data);
					},
					error => {
						Snackbar.open({
							message: i18n.t('error.loadingData'),
							actionText: i18n.t('error.btn.retry'),
							position: 'is-bottom',
							type: 'is-danger',
							onAction: () => {
								context.dispatch('loadGuests', data.code);
							},
						});
					}
				)
				.then(() => {
					//context.commit('SET_LOADING', false);
				});
		},
		createGuest(context, data) {
			context.commit('SET_LOADING', true);
			Api()
				.post('response/create', data.guest || {}, { headers: { 'x-code': data.code } })
				.then(
					result => {
						context.commit('ADD_GUEST', result.data);
					},
					error => {
						Snackbar.open({
							message: i18n.t('error.guest.create'),
							actionText: i18n.t('error.btn.retry'),
							position: 'is-bottom',
							type: 'is-danger',
							onAction: () => {
								context.dispatch('createGuest', data);
							},
						});
					}
				)
				.then(() => {
					context.commit('SET_LOADING', false);
				});
		},
		updateGuest(context, data) {
			Api()
				.put(`response/${data.guest._id}`, data.guest.info, { headers: { 'x-code': data.code } })
				.then(
					result => {
						context.commit('UPDATE_GUEST', { old: data.guest, new: result.data });
					},
					error => {
						Snackbar.open({
							message: i18n.t('error.guest.update'),
							actionText: i18n.t('error.btn.retry'),
							position: 'is-bottom',
							type: 'is-danger',
							onAction: () => {
								context.dispatch('updateGuest', data);
							},
						});
					}
				);
		},
		deleteGuest(context, data) {
			context.commit('SET_LOADING', true);
			Api()
				.delete(`response/${data.guest._id}`, { headers: { 'x-code': data.code } })
				.then(
					result => {
						context.dispatch('loadGuests', { code: data.code, force: true });
					},
					error => {
						Snackbar.open({
							message: i18n.t('error.guest.delete'),
							actionText: i18n.t('error.btn.retry'),
							position: 'is-bottom',
							type: 'is-danger',
							onAction: () => {
								context.dispatch('deleteGuest', data);
							},
						});
					}
				)
				.then(() => {
					context.commit('SET_LOADING', false);
				});
		},
	},
});
