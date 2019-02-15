<template>
	<let-it-snow v-bind="snowConf" :show="show"></let-it-snow>
</template>    

<script>
import LetItSnow from 'vue-let-it-snow';
import imgHeart from '../assets/images/heart.png';

export default {
	name: 'Snow',
	components: {
		LetItSnow,
	},
	data() {
		return {
			snowConf: {
				show: true,
				windPower: 0,
				speed: 0.5,
				count: 32,
				size: 3,
				opacity: 1,
				interaction: true,
				images: [imgHeart],
			},
			show: false,
		};
	},
	mounted() {
		this.show = true;
	},
};
</script>
