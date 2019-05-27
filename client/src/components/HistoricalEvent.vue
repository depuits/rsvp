<template>
	<li :class="['day', sideClass]">
		<div class="events">
			<div v-if="image" class="day__img">
				<img :src="image" />
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
					return 'day--left';
				case 'her':
					return 'day--right';
				default:
					return '';
			}
		},
		image() {
			if (this.event.image) {
				return new URL(this.event.image, process.env.VUE_APP_ROOT_IMG).href;
			}

			return '';
		},
	},
};
</script>
