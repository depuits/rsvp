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
			</div>
		</div>
		<hr />

		<b-modal :active.sync="modalActive" :width="640" scroll="keep">
			<div class="card">
				<div class="card-image">
					<figure class="image is-4by3">
						<img src="/static/img/placeholder-1280x960.png" alt="Image" />
					</figure>
				</div>
				<div class="card-content">
					<div class="media">
						<div class="media-left">
							<figure class="image is-48x48">
								<img src="/static/img/placeholder-1280x960.png" alt="Image" />
							</figure>
						</div>
						<div class="media-content">
							<p class="title is-4">John Smith</p>
							<p class="subtitle is-6">@johnsmith</p>
						</div>
					</div>

					<div class="content">
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nec iaculis mauris.
						<a>@bulmaio</a>.
						<a>#css</a>
						<a>#responsive</a>
						<br />
						<small>11:09 PM - 1 Jan 2016</small>
					</div>
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
			this.modalActive = true;
			alert('response info:' + this.guest.response);
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
