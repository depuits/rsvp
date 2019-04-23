<template>
	<div id="code">
		<h1>{{ $t('login.prompt') }}</h1>

		<div class="ui action input">
			<input v-model="code" type="text" :placeholder="$t('login.code')" />
			<sui-button animated @click="login()">
				<sui-button-content visible>{{$t('login.btn.submit')}}</sui-button-content>
				<sui-button-content hidden>
					<sui-icon name="right arrow" />
				</sui-button-content>
			</sui-button>
		</div>

		<p v-if="!proccesing">{{ $t(response) }}</p>
		<!-- <button :class="['ld-over-inverse', proccesing ? 'running' : '']" type="button" @click="login()">
			<div v-if="proccesing" class="lds-heart"><div></div></div>
			<div v-else>Login</div>
		</button> -->
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
						//this.proccesing = false;
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
