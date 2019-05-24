<template>
	<li>
		<img :src="event.icon" />
		<p v-if="event.start">{{ $d(event.start, 'time') }}</p>
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
};
</script>
