<template>
	<div id="app">
		<div id="nav">
			<router-link to="/history">
				{{ $t("nav.history") }}
			</router-link> |
			<router-link to="/">
				{{ $t("nav.home") }}
			</router-link> |
			<router-link to="/response">
				{{ $t("nav.response") }}
			</router-link> |
			<select v-model="$i18n.locale">
				<option
					v-for="(lang, i) in langs"
					:key="`Lang${i}`"
					:value="lang"
				>
					{{ lang }}
				</option>
			</select>
		</div>

		<router-view />
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
#app {
	font-family: 'Avenir', Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
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
