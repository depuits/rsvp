import Api from '@/services/Api';
import i18n from '@/i18n';
import { Snackbar } from 'buefy/dist/components/snackbar';

export default {
	state: {
		guests: [],
	},
	mutations: {
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
};
