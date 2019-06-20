<template>
	<div class="admin">
		<h1>This is the admin page</h1>

		<h2>Responses</h2>
		<GuestsChart :chart-data="chartData" />

		<div v-show="loaded">
			<h2>Guests</h2>
			<div v-if="guests.length">
				<!-- insert filters here (name, responded, comming) -->

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
import GuestsChart from '@/components/GuestsChart.js';
import Api from '@/services/Api';

export default {
	name: 'Admin',
	components: {
		Guest,
		GuestsChart,
	},
	props: {
		authData: { type: Object, required: true },
	},
	computed: {
		// map this to store.state
		...Vuex.mapState('rsvp', ['loaded']),
		...mapMultiRowFields('rsvp', ['guests']),
		guestStats() {
			let stats = {
				// stats for guests invited (number of codes)
				guests: {
					unknown: 0,
					total: 0,
					yes: 0,
					no: 0,
				},
				// stats for actual people
				people: {
					unknown: 0,
					total: 0,
					yes: 0,
					no: 0,
				},
				partners: {
					without: 0, // number of partners left behind (people who are coming and may take a partner but don't)
					unknown: 0,
					total: 0,
					yes: 0,
					no: 0,
				},
			};

			for (let g of this.guests) {
				let realNr = g.info.names.length;
				let partner = g.info.partner;
				if (partner) {
					++stats.partners.total;
					++realNr;
				}
				++stats.guests.total;
				stats.people.total += realNr;

				if (g.response) {
					if (g.response.coming == 'yes') {
						++stats.guests.yes;
						//when the answer is yes then the real number can still contain no anwsers
						let realYes = g.response.comingNames.length;
						let realNo = g.info.names.length - realYes;

						if (partner) {
							if (g.response.partnerName) {
								++stats.partners.yes;
								++realYes;
							} else {
								++stats.partners.no;
								++stats.partners.without;
								++realNo;
							}
						}

						stats.people.yes += realYes;
						stats.people.no += realNo;
					} else {
						++stats.guests.no;
						stats.people.no += realNr;
						if (partner) {
							++stats.partners.no;
						}
					}
				} else {
					++stats.guests.unknown;
					stats.people.unknown += realNr;
					if (partner) {
						++stats.partners.unknown;
					}
				}
			}
			return stats;
		},
		chartData() {
			let stat = this.guestStats;
			return {
				labels: ['Yes', 'No', 'Unknown'],
				datasets: [
					{
						label: 'Invites',
						data: [stat.guests.yes, stat.guests.no, stat.guests.unknown],
					},
					{
						label: 'People',
						data: [stat.people.yes, stat.people.no, stat.people.unknown],
					},
					{
						label: 'Partners',
						data: [stat.partners.yes, stat.partners.no, stat.partners.unknown],
					},
				],
			};
		},
	},
	created() {
		this.load({ code: this.authData.code, force: true });
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
