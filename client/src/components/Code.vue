<template>
	<div id="code">
		<h1>{{ $t('login.prompt') }}</h1>

		<div class="group">
			<input v-model="code" type="text" :placeholder="$t('login.code')" :disabled="proccesing" />

			<button type="button" :disabled="proccesing" @click="login()">
				{{ $t('login.btn.submit') }}
				<div v-if="proccesing" class="overlay tint">
					<img class="lds-heart backColor" src="../assets/images/heart.png" />
				</div>
			</button>
		</div>

		<p v-if="!proccesing">{{ $t(response) }}</p>
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
			if (this.proccesing) {
				return;
			}

			if (this.code) {
				this.proccesing = true;
				Api()
					.post('response/retrieve', { code: this.code })
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
