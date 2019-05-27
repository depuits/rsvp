<template>
	<div class="history">
		<h1>{{ $t('history.intro') }}</h1>

		<div class="timeline">
			<HistoricalYear v-for="(y, i) in $store.state.history" :key="y.year" :data="y" :first="i == 0" />
			<HistoricalYear :data="{ year: new Date().getFullYear(), events: [] }" :last="true" />
		</div>
	</div>
</template>

<script>
// @ is an alias to /src
import HistoricalYear from '@/components/HistoricalYear.vue';

export default {
	name: 'History',
	components: {
		HistoricalYear,
	},
	created() {
		this.$store.dispatch('loadHistory');
	},
};
</script>
