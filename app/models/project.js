import Ember from 'ember';
import { Model, byId, settings } from './-base';

const {
  inject: { service },
  computed,
  computed: { reads }
} = Ember;

const syncer = () => {
  return computed(function() {
    return this.get('platform').syncer(this);
  }).readOnly();
}

export default Model.extend({

  name: settings('name'),
  source: settings('source'),
  target: settings('target'),
  watch: settings('watch'),
  groupId: settings('groupId'),

  group: byId('groups', 'groupId'),

  platform: service(),
  syncer: syncer(),

  isSyncing: reads('syncer.isSyncing'),
  isWatching: reads('syncer.isWatching'),

  sync() {
    this.get('syncer').sync();
  },

  _start() {
    this.get('syncer').start();
  },

  didLoad() {
    return this._start();
  },

  didCreate() {
    return this._start();
  },

  didUpdate() {
    this.get('syncer').restart();
  },

  willDelete() {
    let syncer = this.cacheFor('syncer');
    if(syncer) {
      syncer.stop();
    }
  }

});
