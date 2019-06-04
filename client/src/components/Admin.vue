<template>
	<div class="admin">
		<h1>This is the admin page</h1>

		<h2>Guests</h2>
		<div v-if="guests && guests.length">
			<ul>
				<Guest v-for="g in guests" :key="g._id" :guest="g" :auth-data="authData" />
			</ul>
		</div>
		<div v-else>No guests created</div>

		<b-button @click="createGuest">{{ $t('admin.guest.create') }}</b-button>
	</div>
</template>

<script>
import Guest from '@/components/Guest.vue';
import { mapMultiRowFields } from 'vuex-map-fields';

export default {
	name: 'Admin',
	components: {
		Guest,
	},
	props: {
		authData: { type: Object, required: true },
	},
	computed: {
		// map this to store.state
		...mapMultiRowFields(['guests']),
	},
	created() {
		this.$store.dispatch('loadGuests', { code: this.authData.code });
	},
	methods: {
		createGuest: function() {
			this.$store.dispatch('createGuest', { code: this.authData.code });
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
