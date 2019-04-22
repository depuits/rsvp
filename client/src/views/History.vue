<template>
	<div class="history">
		<h1>Our history</h1>

		<ul>
			<HistoricalEvent v-for="e in $store.state.history" :key="e.name" :event="e" />
		</ul>
	</div>
</template>

<script>
// @ is an alias to /src
import HistoricalEvent from '@/components/HistoricalEvent.vue';

export default {
	name: 'History',
	components: {
		HistoricalEvent,
	},
	created() {
		this.$store.dispatch('loadHistory');
	},
};
</script>
