<template>
	<li>
		<img :src="event.image" :alt="$t(event.name)" />
		<h1>{{ $d(new Date(event.date), 'short') }}</h1>
		<h2>{{ $t(event.name) }}</h2>
		<p v-if="event.desc">{{ $t(event.desc) }}</p>
	</li>
</template>

<script>
export default {
	name: 'HistoricalEvent',
	props: {
		event: { type: Object, required: true },
	},
};
</script>
