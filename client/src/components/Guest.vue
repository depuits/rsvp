<template>
	<li class="guest">
		<div class="columns">
			<div class="column is-four-fifths">
				<b-field horizontal label="Code"><b-input v-model="guest.info.code" readonly custom-class="is-uppercase"/></b-field>

				<b-field v-for="(n, i) in guest.info.names" :key="i" :label="i ? '' : 'names'" grouped horizontal>
					<div class="field has-addons is-expanded">
						<b-input v-model="guest.info.names[i]" expanded @input="change" />
						<div class="control">
							<b-button type="is-danger" @click="removeName(i)"><b-icon icon="account-remove"/></b-button>
						</div>
					</div>
				</b-field>
				<b-field v-show="guest.info.names.length < 2" horizontal label="partner" style="text-align: left;">
					<b-switch v-model="guest.info.partner" @input="change"></b-switch>
				</b-field>
				<b-field horizontal>
					<div class="control">
						<b-button @click="addName">Add name</b-button>
					</div>
				</b-field>
			</div>
			<div class="column buttons">
				<b-button type="is-danger" @click="remove">Delete</b-button>
				<b-button type="is-info" :disabled="!guest.response" @click="viewResponse">View response</b-button>
				<b-field horizontal label="print" style="text-align: left;">
					<b-switch v-model="guest.print"></b-switch>
				</b-field>
				<b-icon :icon="visual.icon" size="is-large" :type="visual.color" />
			</div>
		</div>
		<hr />

		<b-modal v-if="guest.response" :active.sync="modalActive" scroll="keep" :width="640">
			<div class="card">
				<div class="card-header">
					<div class="card-header-icon">
						<b-icon :icon="visual.icon" size="is-large" :type="visual.color" />
					</div>
					<div class="card-header-title">
						<div class="media">
							<div class="media-content">
								<p class="title is-5">{{ comingNames }}</p>
								<p class="subtitle is-6">{{ notComingNames }}</p>
							</div>
						</div>
					</div>
				</div>

				<div class="card-content">
					<b-field
						v-for="(q, key) in guest.response.questions"
						:key="key"
						:label="$t(key.replace('_', '.'))"
						custom-class="is-size-5"
					>
						<b-input :value="q" type="textarea" readonly />
					</b-field>
				</div>

				<div class="card-footer">
					<p class="card-footer-item">
						<small>{{ $d(new Date(guest.lastUpdate), 'long') }}</small>
					</p>
				</div>
			</div>
		</b-modal>
	</li>
</template>

<script>
import Vuex from 'vuex';
import debounce from 'lodash.debounce';

export default {
	name: 'Guest',
	props: {
		guest: { type: Object, required: true },
		authData: { type: Object, required: true },
	},
	data: function() {
		return {
			modalActive: false,
			change: debounce(() => {
				this.updateGuest({ code: this.authData.code, guest: this.guest });
			}, 1000),
		};
	},
	computed: {
		visual() {
			let resp = this.guest.response;
			let info = this.guest.info;
			if (resp) {
				if (resp.coming === 'yes') {
					if (info.partner && info.names.length == 1) {
						if (resp.partnerName) {
							// comming with partner
							return { icon: 'account-plus', color: 'is-success' };
						} else {
							// comming without partner
							return { icon: 'account-minus', color: 'is-success' };
						}
					} else {
						if (info.names.length === resp.comingNames.length) {
							// everyone invited is comming
							return { icon: 'account-multiple-check', color: 'is-success' };
						} else {
							// comming but not all invited
							return { icon: 'account-check', color: 'is-warning' };
						}
					}
				} else {
					// not comming
					return { icon: 'account-remove', color: 'is-danger' };
				}
			}
			// response not filled in yet
			return { icon: 'account-question', color: 'is-grey' };
		},
		comingNames() {
			let names = this.guest.response.comingNames.slice(); // clone the array
			if (this.guest.info.names.length == 1 && this.guest.info.partner && this.guest.response.partnerName) {
				names.push(this.guest.response.partnerName + ' (partner)');
			}
			return names.join(', ');
		},
		notComingNames() {
			let allNames = this.guest.info.names;
			if (!this.guest.response) {
				return allNames.join(', ');
			}

			if (this.guest.info.partner && !this.guest.response.partnerName) {
				return 'No partner';
			}

			let comingNames = this.guest.response.comingNames;
			return allNames.filter(n => !comingNames.includes(n)).join(', ');
		},
	},
	methods: {
		...Vuex.mapActions('rsvp', ['updateGuest', 'deleteGuest']),
		addName: function() {
			this.guest.info.names.push('');
			this.change();
		},
		removeName: function(i) {
			this.guest.info.names.splice(i, 1);
			this.change();
		},
		viewResponse: function() {
			this.modalActive = !!this.guest.response;
		},
		remove: function() {
			this.$dialog.confirm({
				message: this.$t('admin.guest.deleteConfirm'),
				onConfirm: () => {
					this.deleteGuest({ code: this.authData.code, guest: this.guest });
				},
			});
		},
	},
};
</script>
