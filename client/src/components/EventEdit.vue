<template>
	<li>
		<input v-model="event.name" @change="change" />
		<img :src="event.icon" />
		<input v-model="event.start" @change="change" />
		<input v-model="event.end" @change="change" />
		<input v-model="event.mapUrl" @change="change" />
		<input v-model="event.location" @change="change" />

		<iframe v-if="event.mapUrl" :src="event.mapUrl" width="280" height="280" frameborder="0" style="border:0" />

		<button @click="remove">Delete</button>
	</li>
</template>

<script>
import debounce from 'lodash.debounce';

export default {
	name: 'EventEdit',
	props: {
		event: { type: Object, required: true },
	},
	data: function() {
		return {
			change: debounce(() => {
				this.$store.dispatch('updateEvent', this.event);
			}, 1000),
		};
	},
	methods: {
		remove: function() {
			this.$store.dispatch('deleteEvent', this.event);
		},
	},
};
</script>
