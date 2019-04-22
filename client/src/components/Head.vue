<template>
	<header>
		<img id="main" alt="couple" src="../assets/images/couple.svg" />
		<!-- <img alt="duck" src="../assets/images/duck.svg"/> -->
		<h1>Joeri &amp; Elien</h1>
		<nav>
			<router-link to="/history">{{ $t('nav.history') }}</router-link>
			<router-link to="/">{{ $t('nav.home') }}</router-link>
			<router-link to="/response">
				{{ $t('nav.response') }}
				<img src="../assets/images/duck.svg" />
			</router-link>
		</nav>

		<img id="duckLeft01" src="../assets/images/duck.svg" />
		<img id="duckLeft02" src="../assets/images/duck.svg" />
		<img id="duckLeft03" src="../assets/images/duck.svg" />
		<img id="duckLeft04" src="../assets/images/duck.svg" />

		<img id="duckRight01" src="../assets/images/duck.svg" />
		<img id="duckRight02" src="../assets/images/duck.svg" />
		<img id="duckRight03" src="../assets/images/duck.svg" />

		<hr />
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

@mixin duck($size, $pos, $left: true) {
	@if $left {
		right: calc(#{$navLeft} + #{$pos} + 4rem);
		-webkit-transform: scaleX(-1);
		transform: scaleX(-1);
	} @else {
		left: calc(#{$navRight} + #{$navWidth} + #{$pos});
	}

	height: $size;
	position: absolute;
	bottom: $bottomBar;
	filter: $frontColorFilter;
}

header {
	position: relative;
	height: 14rem;
	overflow: hidden;

	img#main {
		position: absolute;
		height: 80%;
		right: $navLeft;
		bottom: $bottomBar;
		filter: $frontColorFilter;
	}

	#duckLeft01 {
		@include duck(1.5rem, 4.4rem);
	}
	#duckLeft02 {
		@include duck(1.7rem, 8rem);
	}
	#duckLeft03 {
		@include duck(1.4rem, 12rem);
	}
	#duckLeft04 {
		@include duck(1.2rem, 18rem);
	}

	#duckRight01 {
		@include duck(1.5rem, 2rem, false);
	}
	#duckRight02 {
		@include duck(1.2rem, 6rem, false);
	}
	#duckRight03 {
		@include duck(1.6em, 11rem, false);
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
				position: relative;
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

			// duck image on top
			img {
				filter: $frontColorFilter;
				position: absolute;
				height: 1.5rem;
				top: -1.5rem;
				right: 0;
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
