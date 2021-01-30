const { Gtk, GObject } = imports.gi;

var InfoDialog = GObject.registerClass({
	GTypeName: 'InfoDialog',
	Template: 'resource:///com/munchkinhalfling/C19track2/info-dialog.ui',
	Children: ['state_name', 'website', 'total_tests', 'percent_positive', 'percent_negative', 'notes']
}, class InfoDialog extends Gtk.Window {
	_init(state, stateData) {
		super._init({ title: state.name });
		this.state_name.label = state.state;
		this.website.uri = state.covid19Site;
		this.total_tests.label = '' + stateData.totalTestResults;
		this.percent_positive.label = stateData.positive? ((stateData.positive / stateData.totalTestResults) * 100) + '%' : 'Unknown';
		this.percent_negative.label = stateData.negative? ((stateData.negative / stateData.totalTestResults) * 100) + '%' : 'Unknown';
		this.notes.buffer.text = state.notes;
	}
})
