<template>
	<div class="admin">
		<h1>This is the admin page</h1>

		<h2>Guests</h2>
		<div v-if="guests && guests.length">
			<ul>
				<Guest v-for="g in guests" :key="g._id" :guest="g" :auth-data="authData" @removed="guestRemoved" />
			</ul>
		</div>
		<div v-else>No guests created</div>

		<b-button @click="createGuest">{{ $t('admin.guest.create') }}</b-button>
	</div>
</template>

<script>
import Guest from '@/components/Guest.vue';
import Api from '@/services/Api';

export default {
	name: 'Admin',
	components: {
		Guest,
	},
	props: {
		authData: { type: Object, required: true },
	},
	data() {
		return {
			guests: [],
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
						this.guests = result.data;
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
						this.guests.push(result.data);
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

<style lang="scss" scoped>
.admin ul {
	list-style-type: none;
	margin: 0;
}
</style>
