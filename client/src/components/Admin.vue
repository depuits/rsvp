<template>
	<div class="admin">
		<h1>This is the admin page</h1>

		<div v-show="loaded">
			<h2>Guests</h2>
			<div v-if="guests.length">
				<ul>
					<Guest v-for="g in guests" :key="g._id" :guest="g" :auth-data="authData" />
				</ul>
			</div>
			<div v-else>No guests created</div>
		</div>

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
		...Vuex.mapState('rsvp', ['loaded']),
		...mapMultiRowFields('rsvp', ['guests']),
	},
	created() {
		this.load({ code: this.authData.code });
	},
	methods: {
		...Vuex.mapActions('rsvp', ['load', 'createGuest']),
	},
};
</script>

<style lang="scss" scoped>
.admin ul {
	list-style-type: none;
	margin: 0;
}
</style>
