<template>
	<div v-if="shedule" class="home">
		<h1>{{ $t('home.title') }}</h1>
		<p>{{ $t('home.intro') }}</p>

		<div class="timeline">
			<div class="year year--start">
				<div class="inner">
					<span>{{ $d(shedule.date, 'short') }}</span>
				</div>
			</div>

			<ul class="days">
				<Event v-for="e in shedule.events" :key="e.name" :event="e" />
			</ul>
		</div>
	</div>
</template>

<script>
// @ is an alias to /src
import Event from '@/components/Event.vue';
import { mapState } from 'vuex';

export default {
	name: 'Home',
	components: {
		Event,
	},
	computed: mapState([
		// map this to store.state
		'shedule',
	]),
	created() {
		this.$store.dispatch('loadShedule');
	},
};
</script>
