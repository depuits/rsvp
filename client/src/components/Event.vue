<template>
	<li :class="['day', sideClass]">
		<div class="events">
			<div class="day__img">
				<img :src="icon" />
			</div>
			<div class="date">
				<p>{{ $d(event.start, 'time') }}</p>
				<p>{{ $t(event.name) }}</p>
				<p class="address">{{ $t(event.location) }}</p>
			</div>
		</div>
		<!-- <iframe v-if="event.mapUrl" :src="event.mapUrl" width="280" height="280" frameborder="0" style="border:0" allowfullscreen /> -->
	</li>
</template>

<script>
export default {
	name: 'Event',
	props: {
		event: { type: Object, required: true },
		index: { type: Number, required: true },
	},
	computed: {
		sideClass() {
			return this.index % 2 ? 'day--left' : 'day--right';
		},
		icon() {
			return new URL(this.event.icon, process.env.VUE_APP_ROOT_ICO).href;
		},
	},
};
</script>
