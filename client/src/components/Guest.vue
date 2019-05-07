<template>
	<li>
		<input v-model="guest.info.code" readonly />
		<input v-for="(n, i) in guest.info.names" :key="i" v-model="guest.info.names[i]" @change="change" />
		<button @click="addName">Add name</button>

		<button @click="remove">Delete</button>
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
