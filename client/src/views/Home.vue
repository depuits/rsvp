<template>
	<div v-if="$store.state.shedule" class="home">
		<h1>{{ $t("home.title") }}</h1>
		<p>{{ $t("home.intro") }}</p>

		<img alt="Vue logo" src="../assets/logo.png"/>

		<div v-for="e in $store.state.shedule.events" :key="e.name">
			<Event :event="e" />
		</div>
	</div>
</template>

<script>
// @ is an alias to /src
import Event from '@/components/Event.vue';

export default {
	name: 'Home',
	components: {
		Event,
	},
	created() {
		this.$store.dispatch('loadShedule');
	},
};
</script>
