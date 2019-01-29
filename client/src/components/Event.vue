<template>
	<div>
		<img :src="icon">
		<p v-if="dateTime">{{ $d(dateTime, 'time') }}</p>
		<p>{{ $t(name) }}</p>



		<iframe v-if="mapUrl" :src="mapUrl" width="280" height="280" frameborder="0" style="border:0" allowfullscreen />
	</div>
</template>

<script>
export default {
	name: 'Event',
	props: {
		name: { type: String, required: true },
		icon: { type: String, required: true },
		dateTime: { type: Object, required: true },
		durarion: { type: Object, required: true },
		location: { type: String, required: true },
		mapUrl: { type: String, default: undefined },
	},
};
</script>
