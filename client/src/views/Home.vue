<template>
	<div v-if="events" class="home">
		<h1>{{ $t("home.title") }}</h1>
		<p>{{ $t("home.intro") }}</p>

		<img alt="Vue logo" src="../assets/logo.png"/>

		<ul>
			<Event v-for="e in events" :key="e._id" :event="e" />
		</ul>
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
		'events'
	]),
	created() {
		this.$store.dispatch('loadShedule');
	},
};
</script>
