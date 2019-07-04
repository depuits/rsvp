<template>
	<div class="history">
		<h1>{{ $t('history.intro') }}</h1>

		<back-to-top>
			<div class="fab">
				<span class="fab-action-button">
					<b-icon icon="arrow-up-thick" size="is-large" />
				</span>
			</div>
		</back-to-top>

		<div class="timeline">
			<HistoricalYear v-for="(y, i) in $store.state.history.events" :key="y.year" :data="y" :first="i == 0" />
			<HistoricalYear :data="{ year: new Date().getFullYear(), events: [] }" :last="true" />
		</div>
	</div>
</template>

<script>
// @ is an alias to /src
import HistoricalYear from '@/components/HistoricalYear.vue';
import BackToTop from 'vue-backtotop';

export default {
	name: 'History',
	components: {
		HistoricalYear,
		BackToTop,
	},
	created() {
		this.$store.dispatch('history/load');
	},
};
</script>
