import Vue from 'vue';
import Vuex from 'vuex';
import Api from '@/services/Api';

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		loading: false,
		shedule: null,
		events: null,
		history: null,
	},
	mutations: {
		SET_LOADING(state, loading) {
			state.loading = loading;
		},
		SET_SHEDULE(state, shedule) {
			//parse dates
			shedule = shedule.map(e => {
				e.start = new Date(e.start);
				if (e.end) {
					e.end = new Date(e.end);
				}
				return e;
			});
			//order events by date
			shedule.sort((a, b) => {
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
		SET_EVENTS(state, events) {
			state.events = events;
		},
		UPSERT_EVENT(state, event) {
			const index = state.events.findIndex(e => e._id === event._id);
			console.log('upsert ' + index + ': ' + event);
			if (index === -1) {
				state.events.push(event);
			} else {
				Vue.set(state.events, index, event);
			}
		},
		REMOVE_EVENT(state, eventId) {
			state.events = state.events.filter(e => e._id !== eventId);
		},
	},
	actions: {
		loadShedule(context, force) {
			if (context.state.events && !force) {
				return; // data is already loaded
			}

			context.commit('SET_LOADING', true);
			Api()
				.get('shedule')
				.then(
					result => {
						context.commit('SET_EVENTS', result.data);
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

		createEvent(context, event) {
			Api()
				.post('shedule', event)
				.then(
					result => {
						context.commit('UPSERT_EVENT', result.data);
					},
					error => {
						console.error(error);
					}
				);
		},
		updateEvent(context, event) {
			Api()
				.put('shedule/' + event._id, event)
				.then(
					result => {
						context.commit('UPSERT_EVENT', result.data);
					},
					error => {
						console.error(error);
					}
				);
		},
		deleteEvent(context, event) {
			Api()
				.delete('shedule/' + event._id)
				.then(
					() => {
						context.commit('REMOVE_EVENT', event._id);
					},
					error => {
						console.error(error);
					}
				);
		},
	},
});
