<template>
	<li class="columns">
		<div class="column">
			<b-field horizontal label="Code"><b-input v-model="guest.info.code" readonly /></b-field>

			<b-field horizontal grouped :label="i ? '' : 'names'"  v-for="(n, i) in guest.info.names" :key="i">
				<div class="field has-addons is-expanded">
					<b-input v-model="guest.info.names[i]" @change="change" />
					<div class="control">
						<b-button @click="removeName(i)" type="is-danger"><b-icon icon="account-remove" /></b-button>
					</div>
				</div>
			</b-field>
			<b-field horizontal>
				<div class="control">
					<b-button @click="addName">Add name</b-button>
				</div>
			</b-field>
		</div>
		<div class="column">
			<b-button @click="remove">Delete</b-button>
		</div>
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
			change();
		},
		removeName: function(i) {
			this.guest.info.names.splice(i, 1);
			change();
		},
		remove: function() {
			Api()
				.delete(`response/${this.guest._id}`, { headers: { 'x-code': this.authData.code } })
				.then(
					result => {
						this.$emit('removed', this.guest);
					},
					error => {
						console.error(error);
					}
				);
		},
	},
};
</script>