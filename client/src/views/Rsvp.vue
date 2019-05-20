<template>
	<div class="rsvp">
		<div v-if="authData">
			<div v-if="authData.admin">
				<Admin :auth-data="authData" />
			</div>
			<div v-else>
				<Response :auth-data="authData" />
			</div>
		</div>
		<div v-else>
			<Code @authenticated="setAuthenticated" />
		</div>
	</div>
</template>

<script>
// @ is an alias to /src
import Code from '@/components/Code.vue';
import Admin from '@/components/Admin.vue';
import Response from '@/components/Response.vue';

export default {
	name: 'Rsvp',
	components: {
		Code,
		Admin,
		Response,
	},
	data() {
		return {
			authData: null,
		};
	},
	methods: {
		setAuthenticated(auth) {
			this.authData = auth;
		},
	},
};
</script>
