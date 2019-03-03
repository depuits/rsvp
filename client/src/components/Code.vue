<template>
	<div id="code">
		<h1>{{ $t('login.prompt') }}</h1>
		<input v-model="code" type="text" name="code" :placeholder="$t('login.code')" />
		<p>{{ $t(response) }}</p>
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
					.post('auth', { code: this.code })
					.then(
						result => {
							this.$emit('authenticated', result.data);
						},
						error => {
							this.response = 'login.error.incorrect';
							console.log(this.response);
							console.log(error);
						}
					)
					.then(() => {
						this.proccesing = false;
					});
			} else {
				this.response = 'login.error.empty';
				console.log(this.response);
			}
		},
	},
};
</script>

<style scoped lang="scss">
#code {
	margin: auto;
	margin: 2rem;
}
</style>
