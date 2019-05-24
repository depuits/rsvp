<template>
	<div>
		<div :class="['year', first ? 'year--start' : '', last ? 'year--end' : '']">
			<div class="inner">
				<span>{{ data.year }}</span>
			</div>
		</div>

		<ul class="days">
			<HistoricalEvent v-for="e in data.events" :key="e.desc" :event="e" />
		</ul>
	</div>
</template>

<script>
import HistoricalEvent from '@/components/HistoricalEvent.vue';

export default {
	name: 'HistoricalYear',
	components: {
		HistoricalEvent,
	},
	props: {
		data: { type: Object, required: true },
		first: { type: Boolean, default: false },
		last: { type: Boolean, default: false },
	},
};
</script>
