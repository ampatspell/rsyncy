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
  rsync: null,

  _create(name) {
    let syncer = this;
    return getOwner(this).factoryFor(`platform:syncer/electron/${name}`).create({ syncer });
  },

  _createWatcher() {
    return this._create('watcher');
  },

  _createRsync() {
    return this._create('rsync');
  },

  _rsync() {
    let rsync = this.get('rsync');
    if(!rsync) {
      rsync = this._createRsync();
      this.set('rsync', rsync);
    }
    return rsync;
  },

  __watch() {
    let watcher = this._createWatcher();
    watcher.on('change', this, this._onChange);
    this.set('watcher', watcher);
    return watcher.start();
  },

  __unwatch() {
    let watcher = this.get('watcher');
    if(!watcher) {
      return;
    }
    watcher.off('change', this, this._onChange);
    this.set('watcher', null);
    return watcher.stop();
  },

  __syncAll() {
    return this._rsync().all();
  },

  __syncChanges(files) {
    for(let file of files) {
      let marker = '';
      if(!file.exists) {
        marker = ' (deleted)';
      }
      info(`× ${file.name}${marker}`);
    }
    this._rsync().changes(files.map(file => file.name));
  },

  __stopSync() {
    let rsync = this.get('rsync');
    if(!rsync) {
      return;
    }
    this.set('rsync', null);
    return rsync.stop();
  }

});
