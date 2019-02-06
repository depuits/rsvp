<template>
	<div class="history">
		<h1>Our history</h1>
		
		<div v-for="e in $store.state.history" :key="e.name">
			<HistoricalEvent :event="e" />
		</div>
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
