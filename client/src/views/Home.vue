<template>
  <div class="home">
		<h1>{{ $t("home.title") }}</h1>
		<p>{{ $t("home.intro") }}</p>

    <img alt="Vue logo" src="../assets/logo.png">

    <Event name="events.law" mapUrl="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d627.0449197124369!2d3.7043862009425705!3d51.04977001097552!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c3716f0844a715%3A0xe5065b582571067!2zNTHCsDAyJzU4LjQiTiAzwrA0MicxOC4xIkU!5e0!3m2!1sen!2sbe!4v1548686687811" />
    <Event name="events.church" v-bind:dateTime="new Date()"/>
    <Event name="events.reception"/>
    <Event name="events.diner"/>
    <Event name="events.party"/>

  </div>
</template>

<script>
// @ is an alias to /src
import Event from '@/components/Event.vue';

export default {
	name: 'home',
	components: {
    Event,
	},
};
</script>
