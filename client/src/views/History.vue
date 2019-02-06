<template>
	<div class="history">
		<h1>Our history</h1>
		
		<HistoricalEvent :event="{ name: 'history.birth', date:new Date(1991, 11, 25), image:'placeholder' }" />
	</div>
</template>

<script>
// @ is an alias to /src
import HistoricalEvent from '@/components/HistoricalEvent.vue';

export default {
	name: 'History',
	components: {
		HistoricalEvent,
	},
};
</script>
