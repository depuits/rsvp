import Api from '@/services/Api';
import i18n from '@/i18n';
import { Snackbar } from 'buefy/dist/components/snackbar';
import { getField, updateField } from 'vuex-map-fields';

export default {
	namespaced: true,
	state: {
		loaded: false,
		guests: [],
	},
	getters: {
		getField,
		getGuestsByFilter: state => f => {
			return state.guests.filter(g => g.info.names.find(n => n.toLowerCase().includes(f.toLowerCase())));
		},
	},
	mutations: {
		updateField,
		SET(state, guests) {
			for (let g of guests) {
				g.print = false;
			}
			state.guests = guests;
			state.loaded = true;
		},
		ADD_GUEST(state, guest) {
			guest.print = false;
			state.guests.push(guest);
		},
		UPDATE_GUEST(state, guest) {
			var index = state.guests.indexOf(guest.old);

			if (index !== -1) {
				guest.new.print = guest.old.print;
				state.guests[index] = guest.new;
			}
		},
		DESELECT_PRINT(state) {
			for (let g of state.guests) {
				g.print = false;
			}
		},
	},
	actions: {
		load(context, data) {
			if (context.state.loaded && !data.force) {
				return; // data is already loaded
			}

			context.commit('SET_LOADING', true, { root: true });
			Api()
				.get('response/all', { headers: { 'x-code': data.code } })
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
								context.dispatch('load', data.code);
							},
						});
					}
				)
				.then(() => {
					context.commit('SET_LOADING', false, { root: true });
				});
		},
		createGuest(context, data) {
			context.commit('SET_LOADING', true, { root: true });
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
					context.commit('SET_LOADING', false, { root: true });
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
			context.commit('SET_LOADING', true, { root: true });
			Api()
				.delete(`response/${data.guest._id}`, { headers: { 'x-code': data.code } })
				.then(
					result => {
						context.dispatch('load', { code: data.code, force: true });
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
					context.commit('SET_LOADING', false, { root: true });
				});
		},
		deselectPrint(context) {
			context.commit('DESELECT_PRINT');
		},
	},
};
