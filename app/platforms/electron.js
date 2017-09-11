import Ember from 'ember';
import Platform from './-base';

/* global requireNode */

const {
  on,
  computed: { filterBy, gt },
  observer
} = Ember;

export default Platform.extend({

  syncing: filterBy('syncers', 'isSyncing', true),
  isSyncing: gt('syncing.length', 0),

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
