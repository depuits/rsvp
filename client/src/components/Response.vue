<template>
	<div class="response">
		<h1>{{ $t('rsvp.welcome') }}</h1>

		<h2>{{ namesString }}</h2>

		<div class="field">
			<label class="label">{{ $t('rsvp.attending') }}</label>

			<div class="field has-addons has-addons-centered">
				<b-radio-button v-model="coming" native-value="no" type="is-danger">
					<b-icon icon="close"></b-icon>
					<span>{{ $t('rsvp.no') }}</span>
				</b-radio-button>
				<b-radio-button v-model="coming" native-value="yes" type="is-success">
					<b-icon icon="check"></b-icon>
					<span>{{ $t('rsvp.yes') }}</span>
				</b-radio-button>
			</div>
		</div>

		<div v-show="coming === 'yes'">
			<div v-if="names.length > 1">
				<label class="label">{{ $t('rsvp.attendingSelect') }}</label>
				<b-field>
					<b-select v-model="comingNames" multiple :native-size="names.length" expanded>
						<option v-for="n in names" :key="n" :value="n">{{ n }}</option>
					</b-select>
				</b-field>
			</div>
			<div v-else-if="authData.info.partner">
				<b-switch v-model="partner">{{ $t('rsvp.partner.attending') }}</b-switch>
				<div v-if="partner">
					<b-field :label="$t('rsvp.partner.name')">
						<b-input v-model="partnerName" :placeholder="$t('rsvp.partner.name')" icon="account"></b-input>
					</b-field>
				</div>
			</div>

			<hr />

			<b-field v-for="q in authData.defaultQuestions" :key="q" :label="$t(q)">
				<b-input v-model="questions[q]" type="textarea" />
			</b-field>

			<b-field v-for="q in authData.info.questions" :key="q" :label="$t(q)">
				<b-input v-model="questions[q]" type="textarea" />
			</b-field>
		</div>

		<hr />
		<p>{{ $t('rsvp.deadline', { date: $d(new Date(authData.deadLine), 'short') }) }}.</p>

		<b-button type="is-primary" @click="send">
			<span>{{ $t('rsvp.save') }}</span> <b-icon icon="send"></b-icon>
			<div v-if="proccesing" class="overlay tint">
				<img class="lds-heart backColor" src="../assets/images/heart.png" />
			</div>
		</b-button>
	</div>
</template>

<script>
import Api from '@/services/Api';
import router from '@/router';

export default {
	name: 'Response',
	props: {
		authData: { type: Object, required: true },
	},
	data() {
		return {
			coming: 'no',
			comingNames: [],
			partner: false,
			partnerName: '',
			proccesing: false,
			questions: {},
		};
	},
	computed: {
		names: function() {
			return this.authData.info.names;
		},
		namesString: function() {
			if (this.names.length === 1) {
				return this.names[0];
			}

			let and = this.$t('rsvp.and');
			let nameList = this.names.join(', ');
			let lastComma = nameList.lastIndexOf(',');
			return nameList.substring(0, lastComma) + ` ${and}` + nameList.substring(lastComma + 1);
		},
	},
	created() {
		let resp = this.authData.response;
		if (this.authData.response) {
			//fill in data from response
			this.coming = resp.coming;
			this.comingNames = resp.comingNames;
			this.partner = resp.partnerName !== '';
			this.partnerName = resp.partnerName;
			this.questions = resp.questions;
		}
	},
	methods: {
		send() {
			if (this.proccesing) {
				return;
			}

			this.proccesing = true;

			//assemble data
			let data = {
				coming: this.coming,
				comingNames: this.comingNames,
				partnerName: this.partner ? this.partnerName : '',
				questions: this.questions,
			};

			Api()
				.post('response/update', data, { headers: { 'x-code': this.authData.info.code } })
				.then(
					result => {
						console.log(this.$t('rsvp.successText'));
						this.$dialog.alert({
							message: this.$t('rsvp.successText'),
							confirmText: this.$t('rsvp.successConfirm'),
							onConfirm: () => {
								router.replace('/');
							},
						});
					},
					error => {
						this.response = 'login.error.incorrect';
					}
				)
				.then(() => {
					this.proccesing = false;
				});
		},
	},
};
</script>
