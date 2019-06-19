import { Bar, mixins } from 'vue-chartjs';
const { reactiveProp } = mixins;

import 'chartjs-plugin-colorschemes/src/plugins/plugin.colorschemes';
import { Atlas6 } from 'chartjs-plugin-colorschemes/src/colorschemes/colorschemes.office';

export default {
	extends: Bar,
	mixins: [reactiveProp],
	//overide default width and height props
	props: {
		widht: null,
		height: null,
	},
	mounted() {
		this.renderChart(this.chartData, this.options);
	},
	computed: {
		options() {
			return {
				plugins: {
					colorschemes: {
						scheme: Atlas6,
					},
				},
				scales: {
					yAxes: [
						{
							ticks: {
								beginAtZero: true,
							},
						},
					],
				},
			};
		},
	},
};
