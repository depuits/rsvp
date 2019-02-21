<template>
	<div id="code">
		<h1>Enter your code</h1>
		<input v-model="code" type="text" name="code" placeholder="Code" />
		<button type="button" @click="login()">Login</button>
	</div>
</template>

<script>
import Api from '@/services/Api';

export default {
	name: 'Code',
	data() {
		return {
			code: '',
			proccesing: false,
			response: '',
		};
	},
	methods: {
		login() {
			if (this.code != '') {
				this.proccesing = true;
				Api()
					.get('auth')
					.then(
						result => {
							//TODO save response
							console.log(result);
							this.$emit('authenticated', {});
						},
						error => {
							this.response = 'The code is incorrect TODO translate';
							console.log(this.response);
							console.log(error);
						}
					)
					.then(() => {
						this.proccesing = false;
					});
			} else {
				this.response = 'A code must be present TODO translate';
				console.log(this.response);
			}
		},
	},
};
</script>

<style scoped>
#code {
	width: 500px;
	border: 1px solid #cccccc;
	background-color: #ffffff;
	margin: auto;
	margin-top: 200px;
	padding: 20px;
}
</style>
