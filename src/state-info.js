const { GObject, Gtk } = imports.gi;
const { fetch } = imports.fetch;
const { number } = imports.labels;
const { InfoDialog } = imports['info-dialog'];

var StateInfo = GObject.registerClass({
	GTypeName: 'C19Track2StateInfo',
	Template: 'resource:///com/munchkinhalfling/C19track2/state-info.ui',
	Children: ['state_name', 'positive', 'negative', 'hosp', 'deaths', 'more_info']
}, class StateInfo extends Gtk.Box {
	_init(state, stateData) {
		super._init({orientation: Gtk.Orientation.VERTICAL, spacing: 6});
		this.state_name.label = state.state;
		this.state_name.set_tooltip_text(state.name);
		this.positive.label = number(stateData.positive, stateData.positiveIncrease, 'Positive');
		this.negative.label = number(stateData.negative, stateData.negativeIncrease, 'Negative');
		this.hosp.label = number(stateData.hospitalizedCumulative, stateData.hospitalizedIncrease);
		this.deaths.label = number(stateData.death, stateData.deathIncrease);
		this.more_info.connect('clicked', () => {
			(new InfoDialog(state, stateData)).present();
		});
	}
})
