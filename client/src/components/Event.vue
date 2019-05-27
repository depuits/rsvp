<template>
	<li>
		<img :src="icon" />
		<p>{{ $d(event.start, 'time') }}</p>
		<p>{{ $t(event.name) }}</p>

		<iframe v-if="event.mapUrl" :src="event.mapUrl" width="280" height="280" frameborder="0" style="border:0" allowfullscreen />
	</li>
</template>

<script>
export default {
	name: 'Event',
	props: {
		event: { type: Object, required: true },
	},
	computed: {
		icon() {
			return new URL(this.event.icon, process.env.VUE_APP_ROOT_ICO).href;
		},
	},
};
</script>
