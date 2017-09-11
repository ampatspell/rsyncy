import Ember from 'ember';
import Syncer from './-base';

const {
  getOwner,
  on,
  Logger: { info },
  RSVP: { resolve, reject }
} = Ember;

export default Syncer.extend({

  watcher: null,

  _createWatcher() {
    let syncer = this;
    return getOwner(this).factoryFor('platform:syncer/electron/watcher').create({ syncer });
  },

  __watch() {
    let watcher = this._createWatcher();
    watcher.on('change', this, this._onChange);
    this.set('watcher', watcher);
    return watcher.start();
  },

  __unwatch() {
    let watcher = this.get('watcher');
    watcher.off('change', this, this._onChange);
    this.set('watcher', null);
    return watcher.stop();
  },

  __syncAll() {
    return new Promise(resolve => {
      Ember.run.later(() => resolve(), 1000);
    });
  },

  __syncChanges(changes) {
    console.log('__syncChanges', changes);
    return new Promise(resolve => {
      Ember.run.later(() => resolve(), 1000);
    });
  }

});
