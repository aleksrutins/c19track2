/* main.js
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

pkg.initGettext();
pkg.initFormat();
pkg.require({
  'Gio': '2.0',
  'Gtk': '3.0',
  'Soup': '2.4',
});

const { Gio, Gtk, Gdk } = imports.gi;

const { C19track2Window } = imports.window;

function main(argv) {
    const application = new Gtk.Application({
        application_id: 'com.munchkinhalfling.C19track2',
        flags: Gio.ApplicationFlags.FLAGS_NONE,
    });

    application.connect('activate', app => {
        let cssProv = Gtk.CssProvider.new();
        cssProv.load_from_resource('/com/munchkinhalfling/C19track2/style.css');
        Gtk.StyleContext.add_provider_for_screen(Gdk.Screen.get_default(), cssProv, Gtk.STYLE_PROVIDER_PRIORITY_USER);
        Gtk.Settings.get_default().gtk_application_prefer_dark_theme = true;
        let activeWindow = app.activeWindow;

        if (!activeWindow) {
            activeWindow = new C19track2Window(app);
        }

        activeWindow.present();
    });

    return application.run(argv);
}
