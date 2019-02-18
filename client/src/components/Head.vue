<template>
	<header>
		<img id="main" alt="couple" src="../assets/images/couple.svg"/>
		<!-- <img alt="duck" src="../assets/images/duck.svg"/> -->
		<h1>Joeri &amp; Elien</h1>
		<nav>
			<router-link to="/history">{{ $t("nav.history") }}</router-link>
			<router-link to="/">{{ $t("nav.home") }}</router-link>
			<router-link to="/response">{{ $t("nav.response") }}</router-link>
		</nav>

		<hr/>
	</header>
</template>

<script>
export default {
	name: 'Head',
};
</script>

<style lang="scss">
header {
	position: relative;
	height: 200px;
	overflow: auto;
}

img#main {
	position: absolute;
	height: 80%;
	left: 10%;
	bottom: 0;
}

nav {
	a {
		padding: 10px;
		border: 2px solid #333;
		font-weight: bold;
		text-decoration: none;
		color: #2c3e50;
		&.router-link-exact-active {
			color: #42b983;
		}
	}
}

hr {
	border: none;
	height: 16px;
	/* Set the hr color */
	color: #333; /* old IE */
	background-color: #333; /* Modern Browsers */
}
</style>
