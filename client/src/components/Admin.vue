<template>
	<div class="admin">
		<h1>This is the admin page</h1>

		<h2>Guests</h2>
		<div v-if="responses && responses.length">
			<ul>
				<GuestResponse v-for="r in responses" :key="r.code" :response="r" :auth-data="authData" @removed="guestRemoved" />
			</ul>
		</div>
		<div v-else>No guests created</div>

		<button @click="createGuest">{{ $t('admin.guest.create') }}</button>
	</div>
</template>

<script>
import GuestResponse from '@/components/GuestResponse.vue';
import Api from '@/services/Api';

export default {
	name: 'Admin',
	components: {
		GuestResponse,
	},
	props: {
		authData: { type: Object, required: true },
	},
	data() {
		return {
			responses: [],
		};
	},
	created() {
		this.loadGuests();
	},
	methods: {
		loadGuests: function() {
		Api()
			.get('response/all', { headers: { 'x-code': this.authData.code } })
			.then(
				result => {
					this.responses = result.data;
				},
				error => {
					console.error(error);
				}
			);
		},
		createGuest: function() {
			let data = {};
			Api()
				.post('response/create', data, { headers: { 'x-code': this.authData.code } })
				.then(
					result => {
						this.responses.push(result.data);
					},
					error => {
						alert(this.$t('admin.guest.createFailed'));
					}
				);
		},
		guestRemoved(resp) {
			this.loadGuests();
		},
	},
};
</script>
