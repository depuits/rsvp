<template>
  <div class="manage">
    <img alt="Vue logo" src="../assets/logo.png">

    <div v-if="this.authData">
      <div v-if="this.authData.Admin">
        <Admin />
      </div>
      <div v-else>
        <Response />
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
	name: 'manage',
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
