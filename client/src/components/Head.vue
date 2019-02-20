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

<style scoped lang="scss">
$bottomBar: 1rem;

$navLeft: calc(50% + 4rem);
$navRight: calc(50% - 3rem);

$navWidth: 20rem;
$borderRad: 0.5rem;

$navTrans: all 0.2s linear;

header {
	position: relative;
	height: 14rem;
	overflow: visible;

	img#main {
		position: absolute;
		height: 80%;
		right: $navLeft;
		bottom: $bottomBar;
	}

	h1 {
		width: $navWidth;
		position: absolute;
		top: 1rem;
		left: $navRight;
		font-size: 3.5rem;
	}

	nav {
		width: $navWidth;
		position: absolute;
		bottom: $bottomBar;
		left: $navRight;
		font-size: 1.5rem;

		display: -webkit-flex;
		-webkit-justify-content: center;

		display: flex;
		justify-content: center;

		a {
			--max-height: 2.5rem;
			-webkit-flex: 1;
			flex: 1;

			padding: 1rem;
			border: 0.2rem solid $frontColor;
			border-bottom: 0;
			font-weight: bold;
			text-decoration: none;
			color: $frontColor;

			&:first-child {
				border-top-left-radius: $borderRad;
			}

			&:last-child {
				border-top-right-radius: $borderRad;
			}

			&.router-link-exact-active {
				color: #42b983;
				border-top-left-radius: $borderRad;
				border-top-right-radius: $borderRad;

				-webkit-transition: $navTrans;
				-moz-transition: $navTrans;
				-o-transition: $navTrans;
				transition: $navTrans;

				height: var(--max-height);
			}

			&:not(.router-link-exact-active) {
				position: relative;
				--height: 1.5rem;
				bottom: calc(var(--height) - var(--max-height));

				height: var(--heigth);

				-webkit-transition: $navTrans;
				-moz-transition: $navTrans;
				-o-transition: $navTrans;
				transition: $navTrans;

				&:hover {
					position: relative;
					--height: var(--max-height);
					bottom: calc(var(--height) - var(--max-height));

					height: var(--heigth);

					color: #2a664b;
					border-top-left-radius: $borderRad;
					border-top-right-radius: $borderRad;

					-webkit-transition: $navTrans;
					-moz-transition: $navTrans;
					-o-transition: $navTrans;
					transition: $navTrans;
				}
			}
		}
	}

	hr {
		border: none;
		margin: 0;
		height: $bottomBar;
		/* Set the hr color */
		color: $frontColor; /* old IE */
		background-color: $frontColor; /* Modern Browsers */
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
	}
}
</style>
