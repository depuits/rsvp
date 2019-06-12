<template>
	<div class="admin">
		<h1>This is the admin page</h1>

		<div v-show="loaded">
			<h2>Guests</h2>
			<div v-if="guests.length">
				<div class="columns">
					<div class="column is-one-fifth is-offset-four-fifths">
						<b-button @click="selectAllPrint">{{ $t('admin.selectAll') }}</b-button>
					</div>
				</div>
				<ul>
					<Guest v-for="g in guests" :key="g._id" :guest="g" :auth-data="authData" />
				</ul>
			</div>
			<div v-else>No guests created</div>
		</div>

		<b-button @click="createGuest({ code: authData.code })">{{ $t('admin.guest.create') }}</b-button>
		<b-button @click="print">{{ $t('admin.print') }}</b-button>
	</div>
</template>

<script>
import Vuex from 'vuex';
import { mapMultiRowFields } from 'vuex-map-fields';
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
	computed: {
		// map this to store.state
		...Vuex.mapState('rsvp', ['loaded']),
		...mapMultiRowFields('rsvp', ['guests']),
	},
	created() {
		this.load({ code: this.authData.code });
	},
	methods: {
		...Vuex.mapActions('rsvp', ['load', 'createGuest', 'deselectPrint', 'selectAllPrint']),
		print: function() {
			let pg = this.guests.filter(g => g.print).map(g => g.info.code);

			if (!pg.length) {
				alert('select codes to print');
				return;
			}

			Api()
				.post('response/print', pg, {
					headers: { 'x-code': this.authData.code },
					responseType: 'blob', // important
				})
				.then(response => {
					const url = window.URL.createObjectURL(new Blob([response.data]));
					const link = document.createElement('a');
					link.href = url;
					link.setAttribute('download', 'file.pdf'); //or any other extension
					document.body.appendChild(link);
					link.click();
					this.deselectPrint();
				});
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
