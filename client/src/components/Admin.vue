<template>
	<div v-if="$store.state.shedule" class="admin">
		<h1>This is the admin page</h1>

		<ul>
			<EventEdit v-for="e in $store.state.shedule.events" :key="e.name" :event="e" />
		</ul>

		<button @click="createEvent">Create event</button>
	</div>
</template>

<script>
import EventEdit from '@/components/EventEdit.vue';

export default {
	name: 'Admin',
	components: {
		EventEdit,
	},
	created() {
		this.$store.dispatch('loadShedule');
	},
	methods: {
		createEvent: function() {
			let event = {
				name: 'test54',
				icon: '',
				start: new Date(2019, 8, 23, 15, 15),
				end: new Date(2019, 8, 23, 15, 30),
				location: 'address comes here',
			};
			this.$store.dispatch('createEvent', event);
		},
	},
};
</script>
