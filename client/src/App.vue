<template>
	<div id="app">
		<Snow id="snow"/>
		<div id="wrapper">
			<Head />

			<div v-if="$store.state.loading">Loading...</div>
			<router-view v-else />

			<footer>
				<select v-model="$i18n.locale">
					<option
						v-for="(lang, i) in langs"
						:key="`Lang${i}`"
						:value="lang">
						{{ lang }}
					</option>
				</select>
			</footer>
		</div>
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

#app {
	font-family: 'FunnyDuck', Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #333;
}
#wrapper {
	background-color: white;
	margin: auto;

	// Small devices (landscape phones, 576px and up)
	@media (min-width: 576px) {
		width: 100%;
		border-bottom: 2px solid #333;
	}

	// Large devices (desktops, 992px and up)
	@media (min-width: 992px) {
		width: 80%;
		border: 2px solid #333;
		border-top: 0;
	}
}

#snow {
	z-index: -1;
}
</style>
