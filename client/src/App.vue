<template>
	<div id="app">
		<Snow id="snow" />
		<div id="wrapper">
			<Head />

			<router-view class="content section" />
			<div v-show="$store.state.loading">
				<img class="lds-heart frontColor" src="./assets/images/heart.png" />
			</div>
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
@import '@/scss/heartbeat.scss';

// prettier-ignore
:root {
	font-size: 50%;

	.mdi-18px.mdi-set, .mdi-18px.mdi:before { font-size: 9px; }
	.mdi-24px.mdi-set, .mdi-24px.mdi:before { font-size: 12px; }
	.mdi-36px.mdi-set, .mdi-36px.mdi:before { font-size: 18px; }
	.mdi-48px.mdi-set, .mdi-48px.mdi:before { font-size: 24px; }

	@media (min-width: 25rem) {
		font-size: 70%;

		.mdi-18px.mdi-set, .mdi-18px.mdi:before { font-size: 12px; }
		.mdi-24px.mdi-set, .mdi-24px.mdi:before { font-size: 17px; }
		.mdi-36px.mdi-set, .mdi-36px.mdi:before { font-size: 25px; }
		.mdi-48px.mdi-set, .mdi-48px.mdi:before { font-size: 34px; }
	}

	@media (min-width: 38rem) {
		font-size: 100%;

		.mdi-18px.mdi-set, .mdi-18px.mdi:before { font-size: 18px; }
		.mdi-24px.mdi-set, .mdi-24px.mdi:before { font-size: 24px; }
		.mdi-36px.mdi-set, .mdi-36px.mdi:before { font-size: 36px; }
		.mdi-48px.mdi-set, .mdi-48px.mdi:before { font-size: 48px; }
	}
}

#app {
	font-family: 'FunnyDuck', Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: $frontColor;

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
}

#snow {
	z-index: -1;
}
</style>
