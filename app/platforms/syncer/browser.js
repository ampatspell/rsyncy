import Ember from 'ember';
import Syncer from './-base';

const {
  on,
  Logger: { info }
} = Ember;

export default Syncer.extend({

  isSyncing: false,
  isWatching: false,

  _info: on('init', function() {
    info('init', this+'');
  }),

  _sync() {
    this.set('isSyncing', true);
    Ember.run.later(() => this.set('isSyncing', false), 3000);
  },

  start() {
    info('start', this+'');
    this._sync();
    let watch = this.get('project.watch');
    if(watch) {
      this.set('isWatching', true);
    }
  },

  sync() {
    info('sync', this+'');
    this._sync();
  },

  restart() {
    info('restart', this+'');
    this._sync();
    let watch = this.get('project.watch');
    if(watch) {
      this.set('isWatching', true);
    }
  },

  stop() {
    info('stop', this+'');
    this.destroy();
  },

  willDestroy() {
    this._super(...arguments);
    info('willDestroy', this+'');
  }

});
