<template>
	<li>
		<input v-model="response.name" @change="change" />
		<input v-model="response.code" readonly />

		<button @click="remove">Delete</button>
	</li>
</template>

<script>
import debounce from 'lodash.debounce';
import Api from '@/services/Api';

export default {
	name: 'GuestResponse',
	props: {
		response: { type: Object, required: true },
		authData: { type: Object, required: true },
	},
	data: function() {
		return {
			change: debounce(() => {
				Api()
					.put(`response/${this.response._id}`, this.response, { headers: { 'x-code': this.authData.code } })
					.then(
						result => {
							this.response = result.data;
							this.$emit('changed', this.response);
						},
						error => {
							console.error(error);
						}
					);
			}, 1000),
		};
	},
	methods: {
		remove: function() {
			Api()
				.delete(`response/${this.response._id}`, { headers: { 'x-code': this.authData.code } })
				.then(
					result => {
						this.$emit('removed', this.response);
					},
					error => {
						console.error(error);
					}
				);
		},
	},
};
</script>
