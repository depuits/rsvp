<template>
	<li>
		<div class="columns">
			<div class="column is-four-fifths">
				<b-field horizontal label="Code"><b-input v-model="guest.info.code" readonly custom-class="upperCaseCode"/></b-field>

				<b-field v-for="(n, i) in guest.info.names" :key="i" :label="i ? '' : 'names'" grouped horizontal>
					<div class="field has-addons is-expanded">
						<b-input v-model="guest.info.names[i]" expanded @input="change" />
						<div class="control">
							<b-button type="is-danger" @click="removeName(i)"><b-icon icon="account-remove"/></b-button>
						</div>
					</div>
				</b-field>
				<b-field v-show="guest.info.names.length < 2" horizontal label="partner" style="text-align: left;">
					<b-switch v-model="guest.info.partner"></b-switch>
				</b-field>
				<b-field horizontal>
					<div class="control">
						<b-button @click="addName">Add name</b-button>
					</div>
				</b-field>
			</div>
			<div class="column buttons">
				<b-button type="is-danger" @click="remove">Delete</b-button>
				<b-button type="is-info" @click="viewResponse">View response</b-button>
			</div>
		</div>
		<hr />
	</li>
</template>

<script>
import debounce from 'lodash.debounce';
import Api from '@/services/Api';

export default {
	name: 'Guest',
	props: {
		guest: { type: Object, required: true },
		authData: { type: Object, required: true },
	},
	data: function() {
		return {
			change: debounce(() => {
				Api()
					.put(`response/${this.guest._id}`, this.guest.info, { headers: { 'x-code': this.authData.code } })
					.then(
						result => {
							this.guest = result.data;
							this.$emit('changed', this.guest);
						},
						error => {
							console.error(error);
						}
					);
			}, 1000),
		};
	},
	methods: {
		addName: function() {
			this.guest.info.names.push('');
			this.change();
		},
		removeName: function(i) {
			this.guest.info.names.splice(i, 1);
			this.change();
		},
		viewResponse: function() {
			alert('todo');
		},
		remove: function() {
			this.$dialog.confirm({
				message: 'Are you sure?',
				onConfirm: () => {
					Api()
						.delete(`response/${this.guest._id}`, { headers: { 'x-code': this.authData.code } })
						.then(
							result => {
								this.$emit('removed', this.guest);
							},
							error => {
								this.$toast.open('failed');
								console.error(error);
							}
						);
				}
			});
		},
	},
};
</script>
