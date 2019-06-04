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

		<b-button @click="createGuest({ code: authData.code })">{{ $t('admin.guest.create') }}</b-button>
	</div>
</template>

<script>
import Vuex from 'vuex';
import { mapMultiRowFields } from 'vuex-map-fields';
import Guest from '@/components/Guest.vue';

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
		this.loadGuests({ code: this.authData.code });
	},
	methods: {
		...Vuex.mapActions(['loadGuests', 'createGuest']),
	},
};
</script>

<style lang="scss" scoped>
.admin ul {
	list-style-type: none;
	margin: 0;
}
</style>
