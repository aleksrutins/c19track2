/* window.js
 *
 * Copyright 2021 munchkinhalfling
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */
const { GObject, Gtk } = imports.gi;
const { fetch } = imports.fetch;
const { number } = imports.labels;
const { StateInfo } = imports['state-info'];

var C19track2Window = GObject.registerClass({
    GTypeName: 'C19track2Window',
    Template: 'resource:///com/munchkinhalfling/C19track2/window.ui',
    Children: ['us_positive', 'us_negative', 'us_hosp', 'us_death', 'states']
}, class C19track2Window extends Gtk.ApplicationWindow {
    _init(application) {
        super._init({ application });
        this.load();
    }
    async load() {
    	const usData = JSON.parse(fetch('https://api.covidtracking.com/v1/us/current.json'))[0];

        this.us_positive.label = number(usData.positive, usData.positiveIncrease, 'Positive');
        this.us_negative.label = number(usData.negative, usData.negativeIncrease, 'Negative');
        this.us_hosp.label = usData.hospitalizedCumulative + '';
        this.us_death.label = number(usData.death, usData.deathIncrease);
		const statesInfo = JSON.parse(fetch('https://api.covidtracking.com/v1/states/info.json'));
		const statesData = JSON.parse(fetch('https://api.covidtracking.com/v1/states/current.json'));
		statesInfo.forEach(state => {
			log("Adding state: " + state.state);

			this.states.add(new StateInfo(state, statesData.find(stateData => stateData.state == state.state)));
		});
		this.states.show_all();
    }
});

