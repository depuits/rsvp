<template>
    <div id="code">
        <h1>Enter your code</h1>
        <input type="text" name="code" v-model="input.code" placeholder="Code" />
        <button type="button" v-on:click="login()">Login</button>
    </div>
</template>

<script>
export default {
	name: 'code',
	data() {
		return {
			input: {
				code: '',
			},
		};
	},
	methods: {
		login() {
			if (this.input.code != '') {
				//TODO replace with api call
				if (this.input.code == 'AAA') {
					this.$emit('authenticated', {});
				} else {
					console.log('The code is incorrect');
				}
			} else {
				console.log('A code must be present');
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
