<template>
	<div id="app">
		<Snow id="snow" />
		<div id="wrapper">
			<Head />

			<div v-if="$store.state.loading" class="loading">Loading...</div>
			<router-view />
		</div>
		<footer>
			<select v-model="$i18n.locale">
				<option v-for="(lang, i) in langs" :key="`Lang${i}`" :value="lang">
					{{ lang }}
				</option>
			</select>
		</footer>
	</div>
</template>

<script>
import Snow from '@/components/Snow.vue';
import Head from '@/components/Head.vue';

export default {
	name: 'App',
	components: {
		Snow,
		Head,
	},
	data() {
		return { langs: ['nl', 'en'] };
	},
};
</script>

<style lang="scss">
@font-face {
	font-family: FunnyDuck;
	src: url('./assets/fonts/FunnyDuck.ttf');
}
:root {
	font-size: 50%;
	@media (min-width: 30rem) {
		font-size: 70%;
	}

	@media (min-width: 48rem) {
		font-size: 100%;
	}
}

#app {
	font-family: 'FunnyDuck', Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: $frontColor;
}

#wrapper,
footer {
	background-color: $backColor;
	margin: auto;

	// Small devices
	width: 100%;

	// Large devices
	@media (min-width: 48rem) {
		width: 80%;
	}

	// Largest devices
	@media (min-width: 80rem) {
		width: 62rem;
	}
}
#wrapper {
	border: 0;
	border-bottom: 0.2rem solid $frontColor;

	// Large devices
	@media (min-width: 48rem) {
		border: 0.2rem solid $frontColor;
		border-top: 0;
	}
}

#snow {
	z-index: -1;
}
</style>
