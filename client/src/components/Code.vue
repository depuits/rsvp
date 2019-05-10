<template>
	<div id="code">
		<h1>{{ $t('login.prompt') }}</h1>

		<form @submit.prevent="login">
			<b-field position="is-centered" :type="response ? 'is-danger' : 'is-primary'">
				<b-input
					v-model="code"
					type="password"
					:placeholder="$t('login.code')"
					:disabled="proccesing"
					password-reveal
					maxlength="8"
					size="is-large"
				/>

				<div class="control">
					<b-button type="is-primary" :disabled="proccesing" size="is-large" native-type="submit">
						{{ $t('login.btn.submit') }}
						<div v-if="proccesing" class="overlay tint">
							<img class="lds-heart backColor" src="../assets/images/heart.png" />
						</div>
					</b-button>
				</div>
			</b-field>

			<p v-if="!proccesing" class="has-text-danger">{{ $t(response) }}</p>
		</form>
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

			this.response = '';

			if (this.code) {
				this.proccesing = true;
				Api()
					.post('response/retrieve', {}, { headers: { 'x-code': this.code } })
					.then(
						result => {
							this.$emit('authenticated', result.data);
						},
						error => {
							this.response = 'login.error.incorrect';
						}
					)
					.then(() => {
						this.proccesing = false;
					});
			} else {
				this.response = 'login.error.empty';
			}
		},
	},
};
</script>

<style lang="scss">
#code input.input {
	text-transform: uppercase;
}
</style>
