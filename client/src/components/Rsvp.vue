<template>
	<div class="rsvp">
		<h1>Here you should respond</h1>

		<h2>
			<div>Hello</div>
			<div v-for="n in authData.info.names" :key="n">{{ n }}</div>
		</h2>

		<div>Komen jullie?</div>
		<b-switch></b-switch>

		<b-field>
            <b-input type="textarea" placeholder="Opmerkingen." />
        </b-field>

		<b-field v-for="q in authData.defaultQuestions" :key="q" :label="q">
            <b-input type="textarea" placeholder="answer." />
        </b-field>

		<p>Extra questions:</p>
		<b-field v-for="q in authData.info.questions" :key="q" :label="q">
            <b-input type="textarea" placeholder="answer." />
        </b-field>

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
