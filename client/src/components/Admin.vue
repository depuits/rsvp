<template>
	<div v-if="events" class="admin">
		<h1>This is the admin page</h1>

		<ul>
			<EventEdit v-for="e in events" :key="e._id" :event="e" />
		</ul>

		<button @click="createEvent">Create event</button>
	</div>
</template>

<script>
import EventEdit from '@/components/EventEdit.vue';
import { mapState } from 'vuex';

export default {
	name: 'Admin',
	components: {
		EventEdit,
	},
	computed: mapState([
		// map this.count to store.state.count
		'events'
	]),
	created() {
		this.$store.dispatch('loadShedule');
	},
	methods: {
		createEvent: function() {
			let event = {
				name: 'events.new',
				icon: '',
				start: new Date(),
				end: new Date(),
			};
			this.$store.dispatch('createEvent', event);
		},
	},
};
</script>
