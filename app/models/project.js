import Ember from 'ember';
import { Model, byId, settings } from './-base';

export default Model.extend({

  name:    settings('name'),
  source:   settings('source'),
  target:  settings('target'),
  watch:   settings('watch'),
  groupId: settings('groupId'),

  group:   byId('groups', 'groupId'),

  isSyncing: false,

  sync() {
    this.set('isSyncing', true);
    Ember.run.later(() => this.set('isSyncing', false), 3000);
  },

  didUpdate() {
    console.log('didUpdate', this+'');
  },

  willDelete() {
    console.log('willDelete', this+'');
  }

});
