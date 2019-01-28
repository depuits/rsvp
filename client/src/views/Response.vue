<template>
  <div class="response">
    <div v-if="this.authData">
      <div v-if="this.authData.Admin">
        <Admin />
      </div>
      <div v-else>
        <Rsvp />
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
import Rsvp from '@/components/Rsvp.vue';

export default {
	name: 'response',
	components: {
		Code,
		Admin,
		Rsvp,
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
