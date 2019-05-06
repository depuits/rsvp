<template>
	<div class="admin">
		<h1>This is the admin page</h1>

		<h2>Guests</h2>
		<div v-if="responses && responses.length">
			<ul>
				<EventEdit v-for="r in responses" :key="r.code" :response="r" />
			</ul>
		</div>
		<div v-else>No guests created</div>

		<button @click="createGuest">{{ $t('admin.guest.create') }}</button>
	</div>
</template>

<script>
import EventEdit from '@/components/EventEdit.vue';
import Api from '@/services/Api';

export default {
	name: 'Admin',
	components: {
		EventEdit,
	},
	props: {
		authData: { type: Object, required: true },
	},
	data() {
		return {
			responses: [],
		};
	},
	created() {
		Api()
			.get('response/all', { headers: { 'x-code':  this.authData.code }})
			.then(
				result => {
					this.responses = result.data;
				},
				error => {
					console.error(error);
				}
			);
	},
	methods: {
		createGuest: function() {
			let data = { };
			Api()
				.post('response/create', data, { headers: { 'x-code':  this.authData.code }})
				.then(
					result => {
						this.responses.push(result.data);
					},
					error => {
						alert(this.$t('admin.guest.createFailed'));
					}
				);
		},
	},
};
</script>
