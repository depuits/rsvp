<template>
	<div class="admin">
		<h1>This is the admin page</h1>

		<h2>Responses</h2>
		<GuestsChart :chart-data="chartData" />

		<div v-show="loaded">
			<h2>Guests</h2>
			<div v-if="guests.length">
				<!-- insert filters here (name, responded, comming) -->
				<b-field label="Filter">
					<b-field position="is-centered">
						<b-input v-model="filters.name" placeholder="Name" icon="filter"></b-input>

						<div class="control">
							<b-select v-model="filters.reply" icon="account-search">
								<option value="all">All</option>
								<option value="yes">Yes</option>
								<option value="no">No</option>
								<option value="unknown">Unknown</option>
							</b-select>
						</div>
					</b-field>
				</b-field>

				<div class="columns">
					<div class="column is-one-fifth is-offset-four-fifths">
						<b-button @click="selectAllPrint">{{ $t('admin.selectAll') }}</b-button>
					</div>
				</div>

				<transition-group tag="ul" name="guestList">
					<Guest v-for="g in filteredGuests" :key="g._id" :guest="g" :auth-data="authData" />
				</transition-group>
			</div>
			<div v-else>No guests created</div>
		</div>

		<b-button @click="createGuest({ code: authData.code })">{{ $t('admin.guest.create') }}</b-button>
		<b-button @click="printCodes">{{ $t('admin.print') }}</b-button>
		<b-button @click="exportData">{{ $t('admin.export') }}</b-button>
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
	data: function() {
		return {
			filters: {
				name: '',
				reply: 'all', //yes, no, unknown
			},
		};
	},
	computed: {
		// map this to store.state
		...Vuex.mapState('rsvp', ['loaded']),
		...mapMultiRowFields('rsvp', ['guests']),
		filteredGuests() {
			return this.guests
				.filter(g => {
					if (!this.filters.name) {
						return true;
					}

					let f = this.filters.name.toLowerCase();
					return g.info.names.find(n => n.toLowerCase().includes(f)) !== undefined;
				})
				.filter(g => {
					switch (this.filters.reply) {
						case 'yes':
							return g.response && g.response.coming == 'yes';
						case 'no':
							return g.response && g.response.coming != 'yes';
						case 'unknown':
							return !g.response;
						default:
							return true;
					}
				});
		},
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
				let partner = g.info.partner && g.info.names.length == 1;
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
		printCodes: function() {
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
		exportData: function() {

			let csvContent =
				'data:text/csv;charset=utf-8,' +
				'id,code,name,coming,date,from,music,food,other,debug\n' + //TODO remove hard coded stuff
				this.guests.map(g => {
					let no = !g.response || g.response.coming !== 'yes';
					let debug = JSON.stringify(g);
					let date = g.responded;
					// console.log (debug);
					// console.log (g);

					let ndata = g.info.names.map(n => [
						g._id,
						g.info.code,
						n,
						no ? 'no': (g.response.comingNames.map(nn => nn.trim()).includes(n.trim()) ? 'yes' : 'no'),
						date,
						no ? '': g.response.questions['question_from'],
						no ? '': g.response.questions['question_music'],
						no ? '': g.response.questions['question_food'],
						no ? '': g.response.questions['question_remarks'],
						debug,
					].map(v => '"' + v + '"').join(',')).join('\n');

					// don't forget the partners
					if (!no && g.info.partner && g.response.partnerName) {
						ndata += '\n' + [
							g._id,
							g.info.code,
							g.response.partnerName + ' (partner)',
							'yes',
							date,
							g.response.questions['question_from'],
							g.response.questions['question_music'],
							g.response.questions['question_food'],
							g.response.questions['question_remarks'],
							debug,
						].map(v => '"' + v + '"').join(',');
					}

					return ndata;
				}).join('\n');

			var encodedUri = encodeURI(csvContent);
			window.open(encodedUri);
		},
	},
};
</script>

<style lang="scss" scoped>
.admin ul {
	list-style-type: none;
	margin: 0;
}

.guestList-enter-active,
.guestList-leave-active,
.guestList-move {
	transition: 500ms cubic-bezier(0.59, 0.12, 0.34, 0.95);
	transition-property: opacity, transform;
}

.guestList-enter {
	opacity: 0;
	transform: translateX(50px) scaleY(0.5);
}

.guestList-enter-to {
	opacity: 1;
	transform: translateX(0) scaleY(1);
}

.guestList-leave-active {
	position: absolute;
}

.guestList-leave-to {
	opacity: 0;
	transform: scaleY(0);
	transform-origin: center top;
}
</style>
