import Ember from 'ember';
import Platform from './-base';

/* global requireNode */

const {
  on,
  computed: { filterBy, gt },
  computed,
  observer
} = Ember;

export default Platform.extend({

  syncing: filterBy('syncers', 'isSyncing', true),
  isSyncing: gt('syncing.length', 0),

  path: computed(function() {
    let path = process.env.PATH;
    let home = process.env.HOME;
    return path.split(':').map(item => {
      if(item.startsWith(home)) {
        let relative = item.substring(home.length, item.length);
        return `~${relative}`;
      }
      return  item;
    });
  }).readOnly(),

  _send(e, arg) {
    let ipcRenderer = requireNode('electron').ipcRenderer;
    ipcRenderer.send(e, arg);
  },

  _updateSyncing() {
    let syncing = this.get('isSyncing');
    this._send('status-changed', { syncing });
  },

  _observeSyncing: on('init', observer('isSyncing', function() {
    this._updateSyncing();
  })),

});
