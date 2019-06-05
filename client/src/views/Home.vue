<template>
	<div class="home">
		<h1>{{ $t('home.title') }}</h1>
		<p>{{ $t('home.intro') }}</p>

		<div v-if="shedule.loaded" class="timeline">
			<div class="year year--start">
				<div class="inner">
					<span>{{ $d(shedule.date, 'short') }}</span>
				</div>
			</div>

			<ul class="days">
				<Event v-for="(e, i) in shedule.events" :key="e.name" :event="e" :index="i" />
			</ul>

			<div class="year year--end">
				<div class="inner">
					<span>{{ $d(dayPlusOne, 'short') }}</span>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
// @ is an alias to /src
import Event from '@/components/Event.vue';
import moment from 'moment';
import { mapState } from 'vuex';

export default {
	name: 'Home',
	components: {
		Event,
	},
	computed: {
		// map this to store.state
		...mapState(['shedule']),
		dayPlusOne() {
			return moment(this.shedule.date).add(1, 'days');
		},
	},
	created() {
		this.$store.dispatch('shedule/load');
	},
};
</script>
