<template>
	<li :class="['day', sideClass]">
		<div class="events">
			<div v-if="event.image" class="day__img">
				<img :src="event.image" />
				<p v-if="event.desc" class="caption">{{ $t(event.desc) }}</p>
			</div>
			<p v-else>{{ $t(event.desc) }}</p>
			<div v-if="event.date" class="date">{{ $d(event.date, 'short') }}</div>
		</div>
	</li>
</template>

<script>
export default {
	name: 'HistoricalEvent',
	props: {
		event: { type: Object, required: true },
	},
	computed: {
		sideClass() {
			/* eslint-disable */
			switch (this.event.class) {
				case 'him':
					return '';
				case 'her':
					return 'day--right';
				default:
					return '';
			}
		},
	},
};
</script>
