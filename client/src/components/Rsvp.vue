<template>
	<div class="rsvp">
		<h1>Here you should respond</h1>

		<h2>
			<div>Hello</div>
			<div v-for="n in authData.info.names" :key="n">{{ n }}</div>
		</h2>

		<div>Komen jullie?</div>
		<b-switch></b-switch>

		<p>U kan de response aanpassen tot {{ $d(new Date(authData.deadLine), 'short') }}.</p>
	</div>
</template>

<script>
export default {
	name: 'Rsvp',
	props: {
		authData: { type: Object, required: true },
	},
};
</script>
