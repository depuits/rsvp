<template>
	<div id="app">
		<div id="wrapper"></div>
		<img alt="couple" src="./assets/images/couple.png"/>
		<!-- <img alt="duck" src="./assets/images/duck.png"/> -->
		<h1>Joeri &amp; Elien</h1>
		<div id="nav">
			<router-link to="/history">
				{{ $t("nav.history") }}
			</router-link>
			<router-link to="/">
				{{ $t("nav.home") }}
			</router-link>
			<router-link to="/response">
				{{ $t("nav.response") }}
			</router-link>
		</div>

		<hr/>

		<div v-if="$store.state.loading">Loading...</div>
		<router-view v-else />

		<select v-model="$i18n.locale">
			<option
				v-for="(lang, i) in langs"
				:key="`Lang${i}`"
				:value="lang">
				{{ lang }}
			</option>
		</select>
	</div>
</template>

<script>
export default {
	name: 'App',
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
}
#nav {
	padding: 30px;
	a {
		font-weight: bold;
		color: #2c3e50;
		&.router-link-exact-active {
			color: #42b983;
		}
	}
}
</style>
